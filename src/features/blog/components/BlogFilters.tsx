"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react";
import type { IBlogCategory } from "@/interface/blog/IBlogCategory";
import type { IBlogTag } from "@/interface/blog/IBlogTag";

interface BlogFiltersProps {
  categories: IBlogCategory[];
  tags: IBlogTag[];
  activeCategories: string[];
  activeTags: string[];
  activeSearch?: string;
}

export default function BlogFilters({
  categories,
  tags,
  activeCategories,
  activeTags,
  activeSearch,
}: BlogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(activeSearch ?? "");
  const [panelOpen, setPanelOpen] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const filterBtnRef = useRef<HTMLButtonElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasActiveFilter = activeCategories.length > 0 || activeTags.length > 0;
  const activeFilterCount = activeCategories.length + activeTags.length;

  // Fecha o painel ao clicar fora
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        filterBtnRef.current &&
        !filterBtnRef.current.contains(e.target as Node)
      ) {
        setPanelOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const buildParams = useCallback(
    (overrides: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");
      for (const [k, v] of Object.entries(overrides)) {
        if (v) params.set(k, v);
        else params.delete(k);
      }
      return params.toString();
    },
    [searchParams]
  );

  const toggleCategory = useCallback(
    (id: string) => {
      const next = activeCategories.includes(id)
        ? activeCategories.filter((c) => c !== id)
        : [...activeCategories, id];
      router.push(`/blog?${buildParams({ categories: next.join(",") || undefined })}`);
    },
    [router, buildParams, activeCategories]
  );

  const toggleTag = useCallback(
    (id: string) => {
      const next = activeTags.includes(id)
        ? activeTags.filter((t) => t !== id)
        : [...activeTags, id];
      router.push(`/blog?${buildParams({ tags: next.join(",") || undefined })}`);
    },
    [router, buildParams, activeTags]
  );

  const removeCategory = useCallback(
    (id: string) => {
      const next = activeCategories.filter((c) => c !== id);
      router.push(`/blog?${buildParams({ categories: next.join(",") || undefined })}`);
    },
    [router, buildParams, activeCategories]
  );

  const removeTag = useCallback(
    (id: string) => {
      const next = activeTags.filter((t) => t !== id);
      router.push(`/blog?${buildParams({ tags: next.join(",") || undefined })}`);
    },
    [router, buildParams, activeTags]
  );

  const handleSearch = useCallback(
    (value: string) => {
      setSearchValue(value);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        router.push(`/blog?${buildParams({ search: value || undefined })}`);
      }, 400);
    },
    [router, buildParams]
  );

  const clearAll = useCallback(() => {
    setSearchValue("");
    setPanelOpen(false);
    router.push("/blog");
  }, [router]);

  const hasAnything = !!activeSearch || hasActiveFilter;

  return (
    <div className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-20 shadow-sm">
      <div className="container mx-auto px-4 md:px-8 py-3">
        <div className="flex items-center gap-3">
          {/* Barra de pesquisa */}
          <div className="relative flex-1 max-w-sm">
            <Icon
              icon="ph:magnifying-glass"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4 pointer-events-none"
            />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Pesquisar artigos..."
              className="w-full pl-9 pr-9 py-2 text-sm rounded-full border border-gray-200 bg-white text-gray-800 placeholder-gray-400 outline-none focus:border-[#FFCC00] focus:ring-2 focus:ring-[#FFCC00]/20 transition-all"
            />
            {searchValue && (
              <button
                onClick={() => handleSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Limpar pesquisa"
              >
                <Icon icon="ph:x" className="size-3.5" />
              </button>
            )}
          </div>

          {/* Botão de filtro */}
          <div className="relative">
            <button
              ref={filterBtnRef}
              onClick={() => setPanelOpen((o) => !o)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 ${
                panelOpen || hasActiveFilter
                  ? "bg-[#FFCC00] border-[#FFCC00] text-black shadow-sm"
                  : "border-gray-200 text-gray-600 bg-white hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <Icon icon="ph:sliders-horizontal" className="size-4" />
              <span className="hidden sm:inline">Filtros</span>
              {activeFilterCount > 0 && (
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-black text-white text-[10px] font-bold leading-none">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Painel de filtros */}
            {panelOpen && (
              <div
                ref={panelRef}
                className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl border border-gray-100 shadow-xl z-30 overflow-hidden"
              >
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">
                    Filtrar por
                  </span>
                  {hasActiveFilter && (
                    <button
                      onClick={() => {
                        router.push(
                          `/blog?${buildParams({ categories: undefined, tags: undefined })}`
                        );
                      }}
                      className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
                    >
                      Limpar filtros
                    </button>
                  )}
                </div>

                <div className="p-4 space-y-5 max-h-80 overflow-y-auto">
                  {/* Categorias */}
                  {categories.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-3">
                        Categoria
                      </p>
                      <div className="flex flex-col gap-1.5">
                        {categories.map((cat) => {
                          const active = activeCategories.includes(cat.id);
                          return (
                            <button
                              key={cat.id}
                              onClick={() => toggleCategory(cat.id)}
                              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-left transition-all duration-150 ${
                                active
                                  ? "bg-[#FFCC00]/15 text-black"
                                  : "text-gray-600 hover:bg-gray-50"
                              }`}
                            >
                              <span
                                className={`w-4 h-4 rounded flex items-center justify-center border-2 shrink-0 transition-all ${
                                  active ? "bg-[#FFCC00] border-[#FFCC00]" : "border-gray-300"
                                }`}
                              >
                                {active && (
                                  <Icon icon="ph:check-bold" className="size-2.5 text-black" />
                                )}
                              </span>
                              <span
                                className={`leading-snug ${active ? "font-semibold" : "font-medium"}`}
                              >
                                {cat.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-3">
                        Tags
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => {
                          const active = activeTags.includes(tag.id);
                          return (
                            <button
                              key={tag.id}
                              onClick={() => toggleTag(tag.id)}
                              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 ${
                                active
                                  ? "bg-[#0071e3] text-white border-[#0071e3] shadow-sm"
                                  : "border-gray-200 text-gray-500 bg-white hover:border-[#0071e3]/40 hover:text-[#0071e3]"
                              }`}
                            >
                              #{tag.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Limpar tudo */}
          {hasAnything && !panelOpen && (
            <button
              onClick={clearAll}
              className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors"
            >
              <Icon icon="ph:x-circle" className="size-4" />
              <span className="hidden sm:inline">Limpar</span>
            </button>
          )}
        </div>

        {/* Pills dos filtros ativos */}
        {hasActiveFilter && (
          <div className="flex flex-wrap gap-2 mt-2.5">
            {activeCategories.map((id) => {
              const cat = categories.find((c) => c.id === id);
              if (!cat) return null;
              return (
                <span
                  key={id}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FFCC00]/15 text-[#856a00]"
                >
                  {cat.name}
                  <button
                    onClick={() => removeCategory(id)}
                    className="hover:opacity-60 transition-opacity"
                    aria-label={`Remover categoria ${cat.name}`}
                  >
                    <Icon icon="ph:x" className="size-3" />
                  </button>
                </span>
              );
            })}
            {activeTags.map((id) => {
              const tag = tags.find((t) => t.id === id);
              if (!tag) return null;
              return (
                <span
                  key={id}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#0071e3]/10 text-[#0071e3]"
                >
                  #{tag.name}
                  <button
                    onClick={() => removeTag(id)}
                    className="hover:opacity-60 transition-opacity"
                    aria-label={`Remover tag ${tag.name}`}
                  >
                    <Icon icon="ph:x" className="size-3" />
                  </button>
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
