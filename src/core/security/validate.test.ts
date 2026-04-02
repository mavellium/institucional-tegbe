import { describe, it, expect } from "vitest";
import { validatePayload, isNonEmptyString, isValidUrl } from "./validate";

// ─── validatePayload ────────────────────────────────────────────────────────

describe("validatePayload", () => {
  it("retorna data quando o payload é um objeto válido", () => {
    const payload = { title: "Hello", items: [1, 2] };
    const result = validatePayload(payload);
    expect(result).toEqual(payload);
  });

  it("retorna null para payload null", () => {
    expect(validatePayload(null)).toBeNull();
  });

  it("retorna null para payload undefined", () => {
    expect(validatePayload(undefined)).toBeNull();
  });

  it("retorna null para string (não é objeto)", () => {
    expect(validatePayload("string" as unknown)).toBeNull();
  });

  it("retorna null para número", () => {
    expect(validatePayload(42 as unknown)).toBeNull();
  });

  it("aceita arrays como payload válido", () => {
    const payload = [{ id: 1 }, { id: 2 }];
    const result = validatePayload(payload);
    expect(result).toEqual(payload);
  });

  it("retorna null para string HTML injetada como objeto", () => {
    expect(validatePayload('<script>alert("xss")</script>' as unknown)).toBeNull();
  });

  it("com validator customizado, rejeita payload inválido", () => {
    const validator = (data: unknown): data is { title: string } =>
      typeof data === "object" && data !== null && "title" in data;
    expect(validatePayload({ name: "no title" }, validator)).toBeNull();
  });

  it("com validator customizado, aceita payload válido", () => {
    const validator = (data: unknown): data is { title: string } =>
      typeof data === "object" && data !== null && "title" in data;
    expect(validatePayload({ title: "ok" }, validator)).toEqual({ title: "ok" });
  });
});

// ─── isNonEmptyString ───────────────────────────────────────────────────────

describe("isNonEmptyString", () => {
  it("retorna true para string não vazia", () => {
    expect(isNonEmptyString("hello")).toBe(true);
  });

  it("retorna false para string vazia", () => {
    expect(isNonEmptyString("")).toBe(false);
  });

  it("retorna false para string só com espaços", () => {
    expect(isNonEmptyString("   ")).toBe(false);
  });

  it("retorna false para null", () => {
    expect(isNonEmptyString(null)).toBe(false);
  });

  it("retorna false para undefined", () => {
    expect(isNonEmptyString(undefined)).toBe(false);
  });

  it("retorna false para número", () => {
    expect(isNonEmptyString(42 as unknown)).toBe(false);
  });
});

// ─── isValidUrl ─────────────────────────────────────────────────────────────

describe("isValidUrl", () => {
  it("aceita URL https válida", () => {
    expect(isValidUrl("https://tegbe.com.br")).toBe(true);
  });

  it("aceita URL http válida", () => {
    expect(isValidUrl("http://localhost:3000")).toBe(true);
  });

  it("rejeita javascript: protocol", () => {
    expect(isValidUrl("javascript:alert(1)")).toBe(false);
  });

  it("rejeita data: protocol", () => {
    expect(isValidUrl("data:text/html,<script>alert(1)</script>")).toBe(false);
  });

  it("rejeita string vazia", () => {
    expect(isValidUrl("")).toBe(false);
  });

  it("rejeita string aleatória", () => {
    expect(isValidUrl("not a url")).toBe(false);
  });

  it("rejeita null/undefined", () => {
    expect(isValidUrl(null as unknown as string)).toBe(false);
    expect(isValidUrl(undefined as unknown as string)).toBe(false);
  });
});
