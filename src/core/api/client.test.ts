/**
 * Testes TDD para src/core/api/client.ts
 *
 * Cobrem: buildUrl (montagem de URL), fetchCms (success, HTTP error, network error, empty slug).
 * Derivados dos critérios da Fase 3: contrato de dados, branches de erro e normalização.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { buildUrl, fetchCms } from "./client";

const BASE = "https://api.example.com/tegbe";

// ---------------------------------------------------------------------------
// buildUrl
// ---------------------------------------------------------------------------
describe("buildUrl", () => {
  it("retorna string vazia para slug vazio", () => {
    expect(buildUrl("", BASE)).toBe("");
  });

  it("retorna URL https absoluta sem modificação", () => {
    expect(buildUrl("https://other.com/x", BASE)).toBe("https://other.com/x");
  });

  it("retorna URL http absoluta sem modificação", () => {
    expect(buildUrl("http://other.com/x", BASE)).toBe("http://other.com/x");
  });

  it("retorna slug iniciado com '/' sem modificação", () => {
    expect(buildUrl("/api/foo", BASE)).toBe("/api/foo");
  });

  it("concatena slug relativo à baseUrl", () => {
    expect(buildUrl("hero-carrossel-home", BASE)).toBe(
      "https://api.example.com/tegbe/hero-carrossel-home"
    );
  });
});

// ---------------------------------------------------------------------------
// fetchCms
// ---------------------------------------------------------------------------
describe("fetchCms", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("retorna { data: null, error: 'empty slug' } para slug vazio", async () => {
    const result = await fetchCms("");
    expect(result).toEqual({ data: null, error: "empty slug" });
  });

  it("retorna { data, error: null } em resposta ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ title: "Hero" }),
      })
    );
    const result = await fetchCms<{ title: string }>("hero-carrossel-home");
    expect(result).toEqual({ data: { title: "Hero" }, error: null });
  });

  it("retorna { data: null, error: 'HTTP 404' } em resposta não-ok", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 404 }));
    const result = await fetchCms("not-found");
    expect(result).toEqual({ data: null, error: "HTTP 404" });
  });

  it("retorna { data: null, error: 'HTTP 500' } em erro de servidor", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    const result = await fetchCms("broken-endpoint");
    expect(result).toEqual({ data: null, error: "HTTP 500" });
  });

  it("captura erro de rede e retorna { data: null, error: mensagem }", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network error")));
    const result = await fetchCms("hero-carrossel-home");
    expect(result).toEqual({ data: null, error: "Network error" });
  });

  it("captura erro desconhecido e retorna 'unknown error'", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue("not an Error object"));
    const result = await fetchCms("hero-carrossel-home");
    expect(result).toEqual({ data: null, error: "unknown error" });
  });

  it("usa revalidate customizado quando fornecido", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });
    vi.stubGlobal("fetch", mockFetch);
    await fetchCms("slug", { revalidate: 10 });
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ next: { revalidate: 10 } })
    );
  });
});
