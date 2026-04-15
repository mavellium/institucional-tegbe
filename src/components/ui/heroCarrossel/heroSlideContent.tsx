"use client";

import { motion } from "framer-motion";
import Heading from "@/components/ui/heading";
import Highlight from "@/components/ui/highlight";
import Text from "@/components/ui/texto";
import Paragrafo from "@/components/ui/paragrafo";
import RichText from "@/components/ui/rich/richText";
import { HeroSlide } from "@/types/heroSlide.type";
import { Button } from "../button/button";
import Link from "next/link";

interface HeroSlideContentProps {
  slide: HeroSlide;
  isActive: boolean;
  corDestaque?: string;
}

export default function HeroSlideContent({
  slide,
  isActive,
  corDestaque = "#F9265E",
}: HeroSlideContentProps) {
  return (
    // 1. Removido o padding lateral (px-2) pois o componente pai já faz o controle de margem.
    // Adicionado md:gap-6 para uma transição mais suave entre celular e PC.
    <div className="z-10 flex flex-col items-center lg:items-start gap-4 sm:gap-6 lg:gap-5 w-full max-w-full sm:max-w-xl md:max-w-2xl mx-auto lg:mx-0">
      {/* Tag / Highlight */}
      {slide.tag && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-1 sm:mb-2"
        >
          <Highlight color={corDestaque} withSerif withItalic>
            {slide.tag}
          </Highlight>
        </motion.div>
      )}

      {/* Title */}
      {slide.title && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full"
        >
          {/* 2. Ajuste na altura da linha dependendo do tamanho da tela */}
          <Heading
            size="xl"
            className="text-[24px] sm:text-[30px] md:text-[36px] lg:text-[30px] xl:text-[42px] text-center lg:text-left w-full leading-[1.2] tracking-tight font-bold break-words hyphens-auto"
            color="white"
          >
            {slide.title}
          </Heading>
        </motion.div>
      )}

      {/* Description */}
      {slide.description && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full"
        >
          {/* 3. Escala fluida de texto: text-base (celular) -> text-lg (tablet) -> text-xl/2xl (desktop) */}
          <Paragrafo
            align="center"
            color="#fff"
            className="text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed text-center lg:text-left break-words"
          >
            {slide.description}
          </Paragrafo>
        </motion.div>
      )}

      {/* Subtext */}
      {slide.subtext && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Text
            color="#fff"
            variant="muted"
            className="text-xs sm:text-sm lg:text-base max-w-lg text-center lg:text-left opacity-80"
          >
            {slide.subtext}
          </Text>
        </motion.div>
      )}

      {/* CTA Button */}
      {slide.ctaText && slide.ctaLink && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          // 4. Largura total no celular (w-full), mas ajustada para o conteúdo em telas maiores (sm:w-auto)
          className="w-full sm:w-auto mt-2 sm:mt-4 mb-6 lg:mb-0"
        >
          <Button
            asChild
            // 5. Padding e fonte reduzidos no mobile (py-4, text-sm) e aumentados no desktop (lg:py-6, lg:text-base)
            className="w-full sm:w-max px-6 sm:px-8 py-4 lg:py-6 text-sm lg:text-base font-bold uppercase tracking-wider rounded-lg border-2 bg-transparent hover:bg-white/10 transition-all flex items-center justify-center"
            style={{
              borderColor: corDestaque,
              color: corDestaque,
            }}
          >
            <Link href={slide.ctaLink} target="_blank" className="w-full text-center">
              {slide.ctaText}
            </Link>
          </Button>
        </motion.div>
      )}

      {/* Rich content */}
      {slide.richContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="w-full mt-4"
        >
          <RichText content={slide.richContent} />
        </motion.div>
      )}
    </div>
  );
}
