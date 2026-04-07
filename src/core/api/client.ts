import { API_BASE_URL, REVALIDATE_SECONDS } from "@/core/config";

/**
 * Monta a URL completa a partir de um slug ou URL absoluta.
 *
 * - URL absoluta (http/https) ou path iniciado com "/" → retorna sem alteração.
 * - Slug relativo → concatena à baseUrl.
 *
 * O parâmetro `baseUrl` existe para facilitar testes sem depender de env vars.
 */
export function buildUrl(
  slug: string,
  baseUrl: string = API_BASE_URL,
  params?: { lead: string; source: string }
): string {
  if (!slug) return "";
  if (slug.startsWith("http://") || slug.startsWith("https://") || slug.startsWith("/")) {
    return slug;
  }
  return `${baseUrl}/${slug}`;
}

export interface CmsResult<T> {
  data: T | null;
  error: string | null;
}

/**
 * Cliente HTTP centralizado para o CMS.
 *
 * - Nunca lança exceção: captura erros de rede e de parsing, retorna `{ data: null, error }`.
 * - Usa ISR com `revalidate` configurável (padrão: REVALIDATE_SECONDS).
 * - Tipagem genérica: o caller define o shape esperado `T`.
 *
 * @example
 * const { data, error } = await fetchCms<HeroSlide[]>("hero-carrossel-home");
 */
export async function fetchCms<T>(
  slug: string,
  options?: { revalidate?: number }
): Promise<CmsResult<T>> {
  const url = buildUrl(slug);
  if (!url) return { data: null, error: "empty slug" };

  try {
    const res = await fetch(url, {
      next: { revalidate: options?.revalidate ?? REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      return { data: null, error: `HTTP ${res.status}` };
    }

    const data: T = await res.json();
    return { data, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown error";
    return { data: null, error: message };
  }
}
