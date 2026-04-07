import { describe, it, expect, vi, beforeEach } from "vitest";
import { buildUrl, fetchCms } from "./client";

describe("API Client Utility", () => {
  const BASE_URL = "https://api.example.com/tegbe";

  it("deve construir a URL corretamente com cache busting", () => {
    const url = buildUrl("vendas", BASE_URL);
    // Verifica se a base e o slug estão lá, e se o t= do cache busting foi anexado
    expect(url).toContain("/vendas");
    expect(url).toContain("t=");
  });

  it("deve lidar com URLs absolutas ignorando a base", () => {
    const externalUrl = "https://outro-site.com/api";
    const url = buildUrl(externalUrl, BASE_URL);
    expect(url).toContain(externalUrl);
  });

  it("deve adicionar parâmetros de busca extras corretamente", () => {
    const params = { lead: "true", source: "instagram" };
    const url = buildUrl("contato", BASE_URL, params);
    expect(url).toContain("lead=true");
    expect(url).toContain("source=instagram");
    expect(url).toContain("t=");
  });
});

describe("fetchCms", () => {
  beforeEach(() => {
    // Limpa o mock do fetch antes de cada teste
    vi.stubGlobal("fetch", vi.fn());
  });

  it("deve retornar erro se o slug estiver vazio", async () => {
    const result = await fetchCms("");
    expect(result.data).toBeNull();
    expect(result.error).toBe("Slug is required");
  });

  it("deve retornar dados quando o fetch for bem sucedido", async () => {
    const mockData = { success: true };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    } as Response);

    const result = await fetchCms("test-slug");
    expect(result.data).toEqual(mockData);
    expect(result.error).toBeNull();
  });
});
