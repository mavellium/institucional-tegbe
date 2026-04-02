"use client";

import { useEffect, useState } from "react";

/**
 * Monta a URL da API institucional. Slugs relativos usam sempre
 * `NEXT_PUBLIC_API_URL` (sem barra final) + `/` + slug.
 */
export function resolveApiUrl(slug: string): string {
  if (!slug) return "";
  if (slug.startsWith("http://") || slug.startsWith("https://") || slug.startsWith("/")) {
    return slug;
  }
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
  if (baseUrl) {
    return `${baseUrl.replace(/\/$/, "")}/${slug}`;
  }
  return `https://tegbe-dashboard.vercel.app/api/tegbe-institucional/${slug}`;
}

// Cache module-level: persiste durante a sessão, reseta em hard refresh
const cache = new Map<string, unknown>();

/**
 * Verifica se o dado retornado pela API está ativo/habilitado.
 * Se qualquer flag conhecida de desativação for `false`, retorna false.
 */
function isDataEnabled(data: unknown): boolean {
  if (!data || typeof data !== "object") return true;
  const d = data as Record<string, unknown>;
  if (d.active === false) return false;
  if (d.ativo === false) return false;
  if (d.enabled === false) return false;
  if (d.visible === false) return false;
  return true;
}

/**
 * @deprecated Substituído por fetch server-side via `getSafeData` (Phase 5).
 * Todos os componentes devem receber `data` como prop a partir da page.
 * Este hook será removido na Phase 6.
 *
 * Hook com estratégia Stale-While-Revalidate:
 * - Serve o cache imediatamente (sem flash de loading em revisitas)
 * - Revalida em background e atualiza os dados silenciosamente
 * - Retorna `data: null` se a API sinalizar desativação (active/ativo/enabled/visible: false)
 * - Mantém dados stale em caso de erro de rede
 */
export function useApi<T>(slug: string) {
  const [data, setData] = useState<T | null>((cache.get(slug) as T) ?? null);
  const [loading, setLoading] = useState(!cache.has(slug) && !!slug);

  useEffect(() => {
    if (!slug) {
      setData(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    let cancelled = false;

    const fetchData = async () => {
      try {
        const url = resolveApiUrl(slug);
        const res = await fetch(url, { signal: controller.signal });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json: T = await res.json();

        if (cancelled) return;

        if (!isDataEnabled(json)) {
          cache.delete(slug);
          setData(null);
          return;
        }

        cache.set(slug, json);
        setData(json);
      } catch (err) {
        if (cancelled) return;
        if ((err as Error).name === "AbortError") return;
        // Em erro de rede, mantém dado stale — não limpa o state
        console.error(`[useApi] ${slug}:`, err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [slug]);

  return { data, loading };
}
