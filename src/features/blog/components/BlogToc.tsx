"use client";

import { useEffect, useRef, useState } from "react";
import type { TocItem } from "@/features/blog/utils/toc";

interface BlogTocProps {
  items: TocItem[];
}

export default function BlogToc({ items }: BlogTocProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!items.length) return;

    const elements = items
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const topmost = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveId(topmost.target.id);
        }
      },
      { rootMargin: "-88px 0px -55% 0px", threshold: 0 }
    );

    elements.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, [items]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 104;
    window.scrollTo({ top, behavior: "smooth" });
  };

  if (!items.length) return null;

  return (
    <div className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm">
      <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-gray-400 mb-5">
        Neste artigo
      </p>

      <nav aria-label="Índice do artigo">
        <div className="relative">
          {/* Linha vertical da timeline */}
          <div className="absolute left-[6px] top-2 bottom-2 w-px bg-gray-100" aria-hidden="true" />

          <ul className="space-y-0.5">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={`w-full flex items-start gap-3 py-1.5 text-left transition-all duration-200 group cursor-pointer ${
                      isActive ? "text-gray-900" : "text-gray-400 hover:text-gray-700"
                    }`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {/* Marcador da timeline */}
                    <span
                      className={`mt-[5px] shrink-0 transition-all duration-300 ${
                        item.level === 2 ? "w-3 h-3" : "w-2 h-2 mt-[7px]"
                      } rounded-full border-2 ${
                        isActive
                          ? "border-[#FFCC00] bg-[#FFCC00] shadow-[0_0_0_3px_rgba(255,204,0,0.2)]"
                          : "border-gray-200 bg-white group-hover:border-gray-400"
                      }`}
                      aria-hidden="true"
                    />
                    <span
                      className={`leading-snug line-clamp-2 ${
                        isActive
                          ? "font-semibold text-gray-900"
                          : item.level === 3
                            ? "text-xs"
                            : "text-sm"
                      }`}
                    >
                      {item.text}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
}
