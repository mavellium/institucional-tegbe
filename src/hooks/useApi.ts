"use client";

import { useEffect, useState } from "react";

/**
 * Monta a URL da API institucional. Slugs relativos usam sempre
 * `NEXT_PUBLIC_API_URL` (sem barra final) + `/` + slug.
 */
export function resolveApiUrl(slug: string): string {
  if (!slug) return "";
  if (
    slug.startsWith("http://") ||
    slug.startsWith("https://") ||
    slug.startsWith("/")
  ) {
    return slug;
  }
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
  if (baseUrl) {
    return `${baseUrl.replace(/\/$/, "")}/${slug}`;
  }
  return `https://tegbe-dashboard.vercel.app/api/tegbe-institucional/${slug}`;
}

export function useApi<T>(slug: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!!slug);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setData(null);
      return;
    }

    const fetchData = async () => {
      try {
        const url = resolveApiUrl(slug);
        const res = await fetch(url);

        if (!res.ok) throw new Error("Erro ao buscar API");

        const json = await res.json();

        setData(json);
      } catch (err: unknown) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Erro ao buscar API");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  return { data, loading, error };
}