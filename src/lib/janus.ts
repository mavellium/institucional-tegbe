import { JanusClient } from "janus-sdk";

export const janus = new JanusClient({
  baseUrl: process.env.JANUS_BASE_URL ?? "https://januscms.com.br",
  tenantId: process.env.JANUS_TENANT_ID ?? "tegbe",
  projectId: process.env.JANUS_PROJECT_ID ?? "d173e24c-ceca-49a1-868a-f53bb31e2791",
  defaultInit: { next: { revalidate: 3600 } } as RequestInit,
});

export type PageContent = Record<string, unknown>;

export function getSection<T>(content: unknown, key: string): T | null {
  if (!content || typeof content !== "object") return null;
  return ((content as PageContent)[key] as T) ?? null;
}

// Suporta Advanced mode (schema.content) e Legacy mode (content)
export function getPageContent(page: unknown): unknown {
  const p = page as any;
  return p?.schema?.content ?? p?.content ?? null;
}
