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
  autoplayDelay = 6000,
  corFundo = "#0A0A0A",
  corDestaque = "#f9265e",
  textoFundo = "MARKETING",
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
      className="relative w-full overflow-hidden text-white group"
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

      <div className="overflow-hidden relative z-10" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {slides.length > 0 ? (
            slides.map((slide, index) => {
              const isActive = index === selectedIndex;
              return (
                <div className="flex-[0_0_100%] min-w-0 relative" key={slide.id}>
                  <div className="w-full lg:w-full pt-22 lg:pt-24 lg:pl-32 flex flex-col lg:flex-row items-center justify-end lg:gap-4 h-screen lg:h-[calc(100vh-120px)] min-h-[600px]">
                    <div className="w-full lg:w-auto lg:min-w-[30vw] flex flex-col justify-center text-center lg:text-left z-20 px-4 lg:px-0">
                      <HeroSlideContent
                        slide={slide}
                        isActive={isActive}
                        corDestaque={corDestaque}
                      />
                    </div>
                    {slide.image && (
                      <div className="w-full lg:w-full flex items-end h-full lg:pr-0">
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
            <div className="flex justify-center w-full py-40 text-gray-500">
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

      <div className="absolute right-[-40px] bottom-[-80px] md:right-[-30px] md:bottom-[-130px] whitespace-nowrap opacity-[0.025] select-none pointer-events-none">
        <span className="text-white text-[120px] md:text-[260px] font-medium tracking-[-0.04em] uppercase">
          {textoFundo}
        </span>
      </div>

      <div
        className="absolute bottom-0 w-full h-[80px] md:h-[120px] bg-gradient-to-t to-transparent"
        style={{ backgroundImage: `linear-gradient(to top, ${corFundo}, transparent)` }}
      />
    </section>
  );
}
