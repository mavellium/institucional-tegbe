/**
 * Testes de `resolveApiUrl` — prova de conceito TDD (Fase 2).
 * Derivados dos acceptance_criteria da SPEC: docs/specs/home-hero-carousel.spec.yaml
 *
 * Ciclo aplicado: testes escritos antes de qualquer refatoração da função.
 * A função já existia; os testes documentam e fixam o contrato público.
 */
import { describe, it, expect, beforeEach, vi } from "vitest";
import { resolveApiUrl } from "./useApi";

describe("resolveApiUrl", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  it("retorna string vazia para slug vazio", () => {
    expect(resolveApiUrl("")).toBe("");
  });

  it("retorna URL https absoluta sem modificação", () => {
    expect(resolveApiUrl("https://example.com/api")).toBe("https://example.com/api");
  });

  it("retorna URL http absoluta sem modificação", () => {
    expect(resolveApiUrl("http://example.com/api")).toBe("http://example.com/api");
  });

  it("retorna slug iniciado com '/' sem modificação", () => {
    expect(resolveApiUrl("/api/foo")).toBe("/api/foo");
  });

  it("monta URL com NEXT_PUBLIC_API_URL quando definido", () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "https://my-api.com/api/tegbe");
    expect(resolveApiUrl("hero-carrossel-home")).toBe(
      "https://my-api.com/api/tegbe/hero-carrossel-home"
    );
  });

  it("remove barra final de NEXT_PUBLIC_API_URL antes de concatenar", () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "https://my-api.com/api/tegbe/");
    expect(resolveApiUrl("hero-carrossel-home")).toBe(
      "https://my-api.com/api/tegbe/hero-carrossel-home"
    );
  });

  it("usa URL de fallback do dashboard quando NEXT_PUBLIC_API_URL está vazio", () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "");
    expect(resolveApiUrl("hero-carrossel-home")).toBe(
      "https://janus.mavellium.com.br/api/tegbe-institucional/hero-carrossel-home"
    );
  });
});
