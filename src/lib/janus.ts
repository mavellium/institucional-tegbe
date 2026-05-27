import { JanusClient } from "janus-sdk";

export const janus = new JanusClient({
  baseUrl: process.env.JANUS_BASE_URL ?? "https://januscms.com.br",
  tenantId: process.env.JANUS_TENANT_ID ?? "tegbe",
  projectId: process.env.JANUS_PROJECT_ID ?? "",
  defaultInit: { next: { revalidate: 60 } } as RequestInit,
});

export type JanusContent = Record<string, unknown>;

export function getBlock<T>(content: JanusContent, key: string): T | undefined {
  return content[key] as T | undefined;
}
