/**
 * Valida payloads vindos do CMS na borda da data layer.
 *
 * - Rejeita null, undefined, tipos primitivos (string, number, boolean).
 * - Aceita objetos e arrays.
 * - Opcionalmente aplica um type guard customizado para slugs críticos.
 *
 * @returns O payload tipado ou null (fallback seguro).
 */
export function validatePayload<T = unknown>(
  payload: unknown,
  validator?: (data: unknown) => data is T
): T | null {
  if (payload === null || payload === undefined) return null;
  if (typeof payload !== "object") return null;

  if (validator) {
    return validator(payload) ? payload : null;
  }

  return payload as T;
}

/**
 * Verifica se o valor é uma string não vazia (após trim).
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

const ALLOWED_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);

/**
 * Verifica se a string é uma URL válida com protocolo seguro.
 * Rejeita javascript:, data:, vbscript:, etc.
 */
export function isValidUrl(value: unknown): boolean {
  if (!value || typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return ALLOWED_PROTOCOLS.has(url.protocol);
  } catch {
    return false;
  }
}
