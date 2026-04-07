/**
 * Cliente de API para o CMS
 * Configurado para NUNCA manter cache, garantindo dados frescos do CMS.
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
 * Constrói a URL e evita que o cache de rede (browser/CDN) segure os dados
 */
export function buildUrl(slug: string, baseUrl: string): string {
  if (!slug) return "";

  let finalUrl = "";

  if (/^https?:\/\//.test(slug) || slug.startsWith("/")) {
    finalUrl = slug;
  } else {
    const cleanBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    finalUrl = `${cleanBase}/${slug}`;
  }

  // Adiciona um timestamp para "quebrar" o cache de CDNs e Proxies
  const separator = finalUrl.includes("?") ? "&" : "?";
  return `${finalUrl}${separator}nocache=${Date.now()}`;
}

/**
 * Busca dados do CMS forçando a atualização total (No-Cache)
 */
export async function fetchCms<T>(
  slug: string,
  options: FetchOptions = {}
): Promise<FetchResponse<T>> {
  if (!slug) {
    return { data: null, error: "empty slug" };
  }

  // Se não for passado revalidate, forçamos 0 (sem cache)
  const revalidate = options.revalidate !== undefined ? options.revalidate : 0;

  try {
    const url = buildUrl(slug, BASE_URL);

    const response = await fetch(url, {
      // Força o Next.js a não salvar o resultado no servidor
      cache: "no-store",
      next: {
        revalidate: revalidate,
      },
      headers: {
        // Headers padrão HTTP para desativar cache em todas as camadas
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });

    if (!response.ok) {
      return { data: null, error: `HTTP ${response.status}` };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { data: null, error: err.message };
    }
    return { data: null, error: "unknown error" };
  }
}
