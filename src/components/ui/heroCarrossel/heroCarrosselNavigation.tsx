"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroCarouselNavigationProps {
  scrollPrev: () => void;
  scrollNext: () => void;
  selectedIndex: number;
  slidesLength: number;
  onDotClick: (index: number) => void;
  corPrimaria?: string; 
  corSecundaria?: string;
  corAcento?: string;
  corIcone?: string; // Nova prop para o controle que você pediu
}

export default function HeroCarouselNavigation({
  scrollPrev,
  scrollNext,
  selectedIndex,
  slidesLength,
  onDotClick,
  corPrimaria = "#ff0400",
  corSecundaria = "#f9396f",
  corAcento = "#f9265e",
  corIcone = "white", // Valor padrão original
}: HeroCarouselNavigationProps) {

  const vars = {
    "--nav-from": corPrimaria,
    "--nav-to": corSecundaria,
    "--nav-accent": corAcento,
    "--nav-icon": corIcone, // Variável para o ícone
  } as React.CSSProperties;

  return (
    <div style={vars}>
      {/* Botão anterior */}
      <button
        onClick={scrollPrev}
        aria-label="Slide anterior"
        style={{ color: "var(--nav-icon)" }} // Aplica a cor do ícone
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-gradient-to-tr from-[var(--nav-from)] via-[var(--nav-to)] to-[var(--nav-accent)] opacity-100 lg:opacity-0 group-hover:lg:opacity-100 transition-all duration-300 hover:scale-110 z-20 shadow-xl"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Botão próximo */}
      <button
        onClick={scrollNext}
        aria-label="Próximo slide"
        style={{ color: "var(--nav-icon)" }} // Aplica a cor do ícone
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-gradient-to-tr from-[var(--nav-from)] via-[var(--nav-to)] to-[var(--nav-accent)] opacity-100 lg:opacity-0 group-hover:lg:opacity-100 transition-all duration-300 hover:scale-110 z-20 shadow-xl"
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
            className={`transition-all duration-300 rounded-full shadow-md ${
              i === selectedIndex
                ? "w-8 h-2 bg-gradient-to-r from-[var(--nav-from)] via-[var(--nav-to)] to-[var(--nav-accent)] scale-110"
                : "w-2 h-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}