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
    // 1. Aumentamos o max-w para o texto ter mais espaço horizontal e preencher a tela
    <div className="z-10 flex flex-col items-center lg:items-start gap-5 lg:gap-8 w-full max-w-2xl mx-auto lg:mx-0 px-2 lg:px-0">
      {/* Tag / Highlight */}
      {slide.tag && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-2"
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
          {/* 2. Ajuste na altura da linha (leading-tight) para o título ficar bem agrupado e legível */}
          <Heading
            size="xl"
            className="text-center lg:text-left w-full leading-[1.15] tracking-tight font-bold"
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
          <Paragrafo
            align="center"
            color="#fff"
            // 3. Aumentamos levemente o tamanho da fonte no mobile e melhoramos o espaçamento (leading-relaxed)
            className="text-gray-200 text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-center lg:text-left px-2 lg:px-0"
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
            className="text-sm lg:text-base max-w-lg text-center lg:text-left"
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
          // 4. Container do botão com largura total no mobile para dar o efeito "block" do G4
          className="w-full sm:w-auto mt-4"
        >
          <Button
            asChild
            // Removemos a variant padrão caso ela force um tamanho pequeno, e aplicamos classes utilitárias
            className="w-full lg:w-auto px-8 py-6 text-base font-bold uppercase tracking-wider rounded-lg border-2 bg-transparent hover:bg-white/10 transition-all flex items-center justify-center"
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
          className="w-full"
        >
          <RichText content={slide.richContent} />
        </motion.div>
      )}
    </div>
  );
}
