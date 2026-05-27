"use client";

export function resolveApiUrl(_slug: string): string { return ""; }

export function useApi<T>(_slug: string) {
  return { data: null as T | null, loading: false };
}
