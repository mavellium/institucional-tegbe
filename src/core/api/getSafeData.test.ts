/**
 * Testes TDD para src/core/api/getSafeData.ts
 *
 * Documenta o contrato: getSafeData nunca lança, retorna null em qualquer falha.
 * Substitui os helpers locais duplicados nas páginas (ex.: ecommerce/page.tsx).
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { getSafeData } from "./getSafeData";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("getSafeData", () => {
  it("retorna o dado tipado em caso de sucesso", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ title: "Headline" }),
      })
    );
    const result = await getSafeData<{ title: string }>("headline");
    expect(result).toEqual({ title: "Headline" });
  });

  it("retorna null em resposta HTTP não-ok", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    const result = await getSafeData("headline");
    expect(result).toBeNull();
  });

  it("retorna null em erro de rede", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("timeout")));
    const result = await getSafeData("headline");
    expect(result).toBeNull();
  });

  it("retorna null para slug vazio (sem fazer fetch)", async () => {
    const mockFetch = vi.fn();
    vi.stubGlobal("fetch", mockFetch);
    const result = await getSafeData("");
    expect(result).toBeNull();
    expect(mockFetch).not.toHaveBeenCalled();
  });
});
