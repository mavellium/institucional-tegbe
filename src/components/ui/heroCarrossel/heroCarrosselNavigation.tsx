"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroCarouselNavigationProps {
  scrollPrev: () => void;
  scrollNext: () => void;
  selectedIndex: number;
  slidesLength: number;
  onDotClick: (index: number) => void;
}

export default function HeroCarouselNavigation({
  scrollPrev,
  scrollNext,
  selectedIndex,
  slidesLength,
  onDotClick,
}: HeroCarouselNavigationProps) {
  const accentColor = "#f9265e";
  const gradientFrom = "#ff0400";
  const gradientTo = "#f9396f";

  return (
    <>
      {/* Botão anterior */}
      <button
        onClick={scrollPrev}
        aria-label="Slide anterior"
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-gradient-to-tr from-[#ff0400] via-[#f9396f] to-[#f9265e] text-white opacity-100 lg:opacity-0 group-hover:lg:opacity-100 transition-all duration-300 hover:scale-110 z-20 shadow-xl"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Botão próximo */}
      <button
        onClick={scrollNext}
        aria-label="Próximo slide"
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-gradient-to-tr from-[#ff0400] via-[#f9396f] to-[#f9265e] text-white opacity-100 lg:opacity-0 group-hover:lg:opacity-100 transition-all duration-300 hover:scale-110 z-20 shadow-xl"
      >
        <ChevronRight size={24} />
      </button>

      {/* Paginação (dots) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {Array.from({ length: slidesLength }).map((_, i) => (
          <button
            key={i}
            onClick={() => onDotClick(i)}
            aria-label={`Ir para o slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full shadow-md ${i === selectedIndex
                ? `w-8 h-2 bg-gradient-to-r from-[${gradientFrom}] via-[${gradientTo}] to-[${accentColor}] scale-110`
                : "w-2 h-2 bg-white/30 hover:bg-white/50"
              }`}
          />
        ))}
      </div>
    </>
  );
}