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
  navGradienteFrom = "#fcc520",
  navGradienteTo = "#f9c939",
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
      className="relative w-full text-white group overflow-hidden h-[640px] sm:h-[700px] md:h-[760px] lg:h-[580px] xl:h-[600px] 2xl:h-[560px]"
      style={{ backgroundColor: corFundo }}
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

      {/* Glow de fundo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 70% 60%, ${corDestaque}18 0%, transparent 70%)`,
        }}
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
                    Container centralizado com max-w-7xl para garantir alinhamento
                    consistente com o header. pt-20/pt-24 limpa o header fixo.
                  */}
                  <div className="h-full max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 flex flex-col lg:grid lg:grid-cols-[45%_55%] gap-8 lg:grid-rows-1">
                    {/* Coluna de texto — primeiro no DOM = primeiro no mobile */}
                    <div className="flex flex-col justify-center py-8 lg:py-0 shrink-0">
                      <HeroSlideContent
                        slide={slide}
                        isActive={isActive}
                        corDestaque={corDestaque}
                      />
                    </div>

                    {/* Coluna de imagem — abaixo do texto no mobile, direita no desktop */}
                    {slide.image ? (
                      <div className="relative h-[42dvh] lg:h-full">
                        <HeroSlideImage
                          image={slide.image}
                          title={slide.title}
                          isActive={isActive}
                          priority={index === 0}
                        />
                      </div>
                    ) : (
                      <div />
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
        <span className="block text-white text-[90px] sm:text-[160px] md:text-[220px] font-black tracking-[-0.04em] uppercase whitespace-nowrap leading-none pb-2 pr-2">
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
