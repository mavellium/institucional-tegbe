"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import HeroSlideContent from "@/components/ui/heroCarrossel/heroSlideContent";
import HeroSlideImage from "@/components/ui/heroCarrossel/heroSlideImage";
import HeroCarouselNavigation from "@/components/ui/heroCarrossel/heroCarrosselNavigation";
import Textura from "@/shared/ui/Textura";
import type { HeroSlide } from "../types";

interface HeroCarrosselProps {
  slides: HeroSlide[];
  loop?: boolean;
  autoplayDelay?: number;
  corFundo?: string;
  corDestaque?: string;
  textoFundo?: string;
  navGradienteFrom?: string;
  navGradienteTo?: string;
  navAccent?: string;
  corIcone?: string;
}

export default function HeroCarrossel({
  slides,
  loop = true,
  autoplayDelay = 8000,
  corFundo = "#0A0A0A",
  corDestaque = "#f9265e",
  textoFundo = "TEGBE",
  navGradienteFrom = "#ff0400",
  navGradienteTo = "#f9396f",
  navAccent = "#f9265e",
  corIcone = "white",
}: HeroCarrosselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop }, [
    Autoplay({ delay: autoplayDelay, stopOnInteraction: true }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section
      className="relative w-full text-white group overflow-hidden"
      style={{ backgroundColor: corFundo, height: "100dvh" }}
    >
      <Textura
        misturar
        opacity={0.04}
        backgroundImage={`
          linear-gradient(45deg, ${corDestaque} 1px, transparent 1px),
          linear-gradient(-45deg, ${corDestaque} 1px, transparent 1px),
          radial-gradient(circle, ${corDestaque} 1px, transparent 1px)
        `}
      />

      {/* Carousel */}
      <div className="overflow-hidden relative z-10 h-full" ref={emblaRef}>
        <div className="flex touch-pan-y h-full">
          {slides.length > 0 ? (
            slides.map((slide, index) => {
              const isActive = index === selectedIndex;
              return (
                <div key={slide.id} className="flex-[0_0_100%] min-w-0 h-full">
                  {/*
                    pt-20 / lg:pt-[88px] — limpa o header fixo (76px mobile, 88px desktop)
                    flex-col em mobile (conteúdo em cima, imagem embaixo)
                    flex-row em desktop (lado a lado)
                  */}
                  <div className="h-full flex flex-col lg:flex-row pt-20 lg:pt-[88px] lg:pl-16 xl:pl-28">
                    {/* Coluna de texto */}
                    <div className="w-full lg:w-[46%] shrink-0 flex flex-col justify-center px-5 sm:px-10 lg:px-0 py-6 lg:py-10">
                      <HeroSlideContent
                        slide={slide}
                        isActive={isActive}
                        corDestaque={corDestaque}
                      />
                    </div>

                    {/* Coluna de imagem — ocupa o espaço restante */}
                    {slide.image && (
                      <div className="flex-1 min-h-0 min-w-0 flex items-end overflow-hidden">
                        <HeroSlideImage
                          image={slide.image}
                          title={slide.title}
                          isActive={isActive}
                          priority={index === 0}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center w-full h-full text-white/40">
              Nenhum slide disponível
            </div>
          )}
        </div>
      </div>

      <HeroCarouselNavigation
        scrollPrev={scrollPrev}
        scrollNext={scrollNext}
        selectedIndex={selectedIndex}
        slidesLength={slides.length}
        onDotClick={(i) => emblaApi?.scrollTo(i)}
        corPrimaria={navGradienteFrom}
        corSecundaria={navGradienteTo}
        corAcento={navAccent}
        corIcone={corIcone}
      />

      {/* Texto decorativo de fundo */}
      <div className="absolute right-0 bottom-0 overflow-hidden pointer-events-none select-none opacity-[0.025]">
        <span className="block text-white text-[90px] sm:text-[160px] md:text-[220px] font-medium tracking-[-0.04em] uppercase whitespace-nowrap leading-none pb-2 pr-2">
          {textoFundo}
        </span>
      </div>

      {/* Fade gradiente inferior */}
      <div
        className="absolute bottom-0 left-0 w-full h-20 md:h-32 pointer-events-none z-10"
        style={{ background: `linear-gradient(to top, ${corFundo}, transparent)` }}
      />
    </section>
  );
}
