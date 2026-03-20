"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import HeroSlideContent from "@/components/ui/heroCarrossel/heroSlideContent";
import HeroSlideImage from "@/components/ui/heroCarrossel/heroSlideImage";
import HeroCarouselNavigation from "@/components/ui/heroCarrossel/heroCarrosselNavigation";
import Textura from "@/components/ui/textura";
import { HeroSlide } from "@/types/heroSlide.type";
import { useApi } from "@/hooks/useApi";

interface HeroCarrosselProps {
  endpoint: string;
  type: string;
  loop?: boolean;
  autoplayDelay?: number;
  corFundo?: string;
  corDestaque?: string; // Usada para a textura e texto
  textoFundo?: string;
  // Cores do Gradiente da Navegação
  navGradienteFrom?: string;
  navGradienteTo?: string;
  navAccent?: string;
  corIcone?: string;
}

export default function HeroCarrossel({
  endpoint,
  type,
  loop = true,
  autoplayDelay = 6000,
  corFundo = "#0A0A0A",
  corDestaque = "#f9265e", // Cor de destaque padrão (Rosa/Vermelho)
  textoFundo = "MARKETING",
  navGradienteFrom = "#ff0400",
  navGradienteTo = "#f9396f",
  navAccent = "#f9265e",
  corIcone = "white"
}: HeroCarrosselProps) {
  const { data } = useApi<HeroSlide[]>(endpoint);
  const slides = data ?? [];
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop },
    [Autoplay({ delay: autoplayDelay, stopOnInteraction: true })]
  );

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
      {/* --- Textura Overlay --- */}
      <Textura
        misturar
        opacity={0.04}
        backgroundImage={`
          linear-gradient(45deg, ${corDestaque} 1px, transparent 1px),
          linear-gradient(-45deg, ${corDestaque} 1px, transparent 1px),
          radial-gradient(circle, ${corDestaque} 1px, transparent 1px)
        `}
      />

      {/* --- Carousel --- */}
      <div className="overflow-hidden relative z-10" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {slides.length > 0 ? slides.map((slide, index) => {
            const isActive = index === selectedIndex;
            return (
              <div className="flex-[0_0_100%] min-w-0 relative" key={slide.id}>
                <div className="w-full lg:w-full pt-22 lg:pt-24 lg:pl-32 flex flex-col lg:flex-row items-center justify-end lg:gap-24 min-h-[600px] h-[calc(100vh-120px)]">
                  <div className="w-full lg:w-[40%] flex flex-col justify-center gap-4 text-center lg:text-left max-w-lg">
                    <HeroSlideContent
                      slide={slide}
                      isActive={isActive}
                      corDestaque={corDestaque} // Adicione esta linha
                    />
                  </div>
                  {slide.image && (
                    <div className="w-full lg:w-[60%] flex items-end h-full lg:pr-0">
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
          }) : (
            <div className="flex justify-center w-full py-40 text-gray-500">Nenhum slide disponível</div>
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

      {/* --- Mensagem sutil de fundo --- */}
      <div className="absolute right-[-40px] bottom-[-80px] md:right-[-30px] md:bottom-[-130px] whitespace-nowrap opacity-[0.025] select-none pointer-events-none">
        <span className="text-white text-[120px] md:text-[260px] font-medium tracking-[-0.04em] uppercase">
          {textoFundo}
        </span>
      </div>

      {/* --- Gradiente de Fade Inferior --- */}
      <div
        className="absolute bottom-0 w-full h-[80px] md:h-[120px] bg-gradient-to-t to-transparent"
        style={{ backgroundImage: `linear-gradient(to top, ${corFundo}, transparent)` }}
      />
    </section>
  );
}