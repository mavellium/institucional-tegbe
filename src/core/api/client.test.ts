/**
 * Cliente de API para o CMS
 * Foco em: Performance, tratamento de erros e normalização.
 */

const BASE_URL = "https://api.example.com/tegbe";

interface FetchOptions {
  revalidate?: number;
}

interface FetchResponse<T> {
  data: T | null;
  error: string | null;
}

/**
 * Constrói a URL final baseada no slug fornecido.
 */
export function buildUrl(slug: string, baseUrl: string): string {
  if (!slug) return "";

  // Se o slug já for uma URL absoluta (http/https) ou começar com /, retorna como está
  if (/^https?:\/\//.test(slug) || slug.startsWith("/")) {
    return slug;
  }

  // Remove barras extras para evitar // na concatenação
  const cleanBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  return `${cleanBase}/${slug}`;
}

/**
 * Realiza o fetch dos dados do CMS com tratamento de erro robusto.
 */
export async function fetchCms<T>(
  slug: string,
  options: FetchOptions = {}
): Promise<FetchResponse<T>> {
  // Validação de slug vazio
  if (!slug) {
    return { data: null, error: "empty slug" };
  }

  // Define revalidate como 0 por padrão para remover o cache,
  // a menos que seja explicitamente passado outro valor.
  const revalidate = options.revalidate !== undefined ? options.revalidate : 0;

  try {
    const url = buildUrl(slug, BASE_URL);

    const response = await fetch(url, {
      next: { revalidate },
      // Opcional: Se quiser ser ainda mais agressivo na remoção do cache
      cache: revalidate === 0 ? "no-store" : "force-cache",
    });

    if (!response.ok) {
      return { data: null, error: `HTTP ${response.status}` };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (err: unknown) {
    // Tratamento de erro de rede ou falhas no fetch
    if (err instanceof Error) {
      return { data: null, error: err.message };
    }

    // Fallback para tipos de erro desconhecidos (ex: string thrown)
    return { data: null, error: "unknown error" };
  }
}
