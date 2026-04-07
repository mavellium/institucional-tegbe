/**
 * Cliente de API para o CMS
 * Configurado para garantir dados frescos e facilitar a conversão.
 */

// Movido para uma constante que pode ser injetada ou vir de env
const DEFAULT_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com/tegbe";

interface FetchOptions extends RequestInit {
  revalidate?: number;
  params?: Record<string, string>;
}

interface FetchResponse<T> {
  data: T | null;
  error: string | null;
}

/**
 * Constrói a URL de forma robusta e gerencia o cache busting
 */
export function buildUrl(
  slug: string,
  baseUrl: string = DEFAULT_BASE_URL,
  params?: Record<string, string>
): string {
  if (!slug) return "";

  let finalUrl = "";

  if (/^https?:\/\//.test(slug)) {
    finalUrl = slug;
  } else {
    const cleanBase = baseUrl.replace(/\/+$/, "");
    const cleanSlug = slug.startsWith("/") ? slug : `/${slug}`;
    finalUrl = `${cleanBase}${cleanSlug}`;
  }

  const urlObj = new URL(finalUrl);

  // Adiciona parâmetros de busca se existirem
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      urlObj.searchParams.append(key, value);
    });
  }

  // Cache busting: Força dados novos para garantir que a oferta atualizada
  // (estratégia Tegbe) chegue sempre ao cliente.
  urlObj.searchParams.append("t", Date.now().toString());

  return urlObj.toString();
}

/**
 * Busca dados do CMS com política rigorosa de No-Cache
 */
export async function fetchCms<T>(
  slug: string,
  options: FetchOptions = {}
): Promise<FetchResponse<T>> {
  if (!slug) {
    return { data: null, error: "Slug is required" };
  }

  const { revalidate = 0, params, ...restOptions } = options;

  try {
    const url = buildUrl(slug, DEFAULT_BASE_URL, params);

    const response = await fetch(url, {
      cache: "no-store",
      ...restOptions,
      next: {
        revalidate: revalidate,
      },
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        ...restOptions.headers,
      },
    });

    if (!response.ok) {
      return {
        data: null,
        error: `Falha na requisição CMS: ${response.status} ${response.statusText}`,
      };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Erro desconhecido ao buscar dados";
    return { data: null, error: errorMessage };
  }
}
