"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { IBlogCategory } from "@/interface/blog/IBlogCategory";
import type { IBlogTag } from "@/interface/blog/IBlogTag";

interface BlogFiltersProps {
  categories: IBlogCategory[];
  tags: IBlogTag[];
  activeCategory?: string;
  activeTag?: string;
}

export default function BlogFilters({
  categories,
  tags,
  activeCategory,
  activeTag,
}: BlogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setFilter = useCallback(
    (key: "category" | "tag", value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/blog?${params.toString()}`);
    },
    [router, searchParams]
  );

  const clearAll = useCallback(() => {
    router.push("/blog");
  }, [router]);

  const hasActiveFilter = !!activeCategory || !!activeTag;

  if (!categories.length && !tags.length) return null;

  return (
    <div className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-20 shadow-sm">
      <div className="container mx-auto px-4 md:px-8 py-3.5 flex flex-wrap items-center gap-2.5">
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-gray-400 mr-1 shrink-0">
          Filtrar:
        </span>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter("category", activeCategory === cat.id ? undefined : cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
              activeCategory === cat.id
                ? "bg-[#FFCC00] text-black border-[#FFCC00] shadow-sm"
                : "border-gray-200 text-gray-600 bg-white hover:border-[#FFCC00] hover:text-black hover:bg-[#FFCC00]/10"
            }`}
          >
            {cat.name}
          </button>
        ))}

        {tags.length > 0 && categories.length > 0 && (
          <span className="text-gray-200 text-sm select-none">|</span>
        )}

        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => setFilter("tag", activeTag === tag.id ? undefined : tag.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 ${
              activeTag === tag.id
                ? "bg-[#0071e3] text-white border-[#0071e3] shadow-sm"
                : "border-gray-200 text-gray-500 bg-white hover:border-[#0071e3]/40 hover:text-[#0071e3]"
            }`}
          >
            #{tag.name}
          </button>
        ))}

        {hasActiveFilter && (
          <button
            onClick={clearAll}
            className="ml-1 px-3 py-1.5 rounded-full text-xs text-gray-400 hover:text-gray-700 transition-colors"
          >
            Limpar filtros ✕
          </button>
        )}
      </div>
    </div>
  );
}
