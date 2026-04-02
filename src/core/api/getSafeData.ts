import { fetchCms } from "@/core/api/client";

/**
 * Wrapper seguro sobre `fetchCms`: extrai apenas o dado, retornando `null` em qualquer falha.
 *
 * Substitui os helpers `getSafeData` locais duplicados nas páginas (ex.: ecommerce/page.tsx).
 * Migração incremental: páginas podem importar este módulo conforme SPEC de cada feature.
 *
 * @example
 * const headline = await getSafeData<HeadlineData>("headline");
 */
export async function getSafeData<T>(slug: string): Promise<T | null> {
  const { data } = await fetchCms<T>(slug);
  return data;
}
