"use client";

import { motion, Easing } from "framer-motion"; // Importe Easing se necessário para tipagem explícita
import { HeroSlide } from "@/types/heroSlide.type";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroSlideContentProps {
  slide: HeroSlide;
  isActive: boolean;
  corDestaque?: string;
}

// Definindo a variante de animação de forma mais "limpa" para o Framer Motion
const variants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 24,
  },
};

// Função para gerar a transição com base no delay
const getTransition = (delay: number) => ({
  duration: 0.5,
  delay,
  // O "as const" resolve o erro do TypeScript garantindo que o array tem 4 números (Bézier)
  ease: [0.25, 0.46, 0.45, 0.94] as const,
});

export default function HeroSlideContent({
  slide,
  isActive,
  corDestaque = "#F9265E",
}: HeroSlideContentProps) {
  return (
    <div className="flex flex-col items-center text-center lg:text-start lg:items-start gap-5 w-full">
      {/* Badge / Tag */}
      {slide.tag && (
        <motion.div
          initial="initial"
          animate={isActive ? "animate" : "initial"}
          variants={variants}
          transition={getTransition(0.05)}
        >
          <span
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full border"
            style={{
              color: corDestaque,
              borderColor: `${corDestaque}40`,
              backgroundColor: `${corDestaque}12`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: corDestaque }}
            />
            {slide.tag}
          </span>
        </motion.div>
      )}

      {/* Título */}
      {slide.title && (
        <motion.div
          initial="initial"
          animate={isActive ? "animate" : "initial"}
          variants={variants}
          transition={getTransition(0.15)}
          className="w-full"
        >
          <h1
            className="text-[clamp(2rem,2.5vw,2.75rem)] font-black leading-[1.06] tracking-tight text-white"
            style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
          >
            {slide.title}
          </h1>
        </motion.div>
      )}

      {/* Descrição */}
      {slide.description && (
        <motion.div
          initial="initial"
          animate={isActive ? "animate" : "initial"}
          variants={variants}
          transition={getTransition(0.28)}
          className="w-full"
        >
          <p className="text-[clamp(0.9rem,1.4vw,1.125rem)] text-white/60 leading-relaxed font-light max-w-full lg:max-w-md">
            {slide.description}
          </p>
        </motion.div>
      )}

      {/* CTA */}
      {slide.ctaText && slide.ctaLink && (
        <motion.div
          initial="initial"
          animate={isActive ? "animate" : "initial"}
          variants={variants}
          transition={getTransition(0.4)}
          className="mt-2"
        >
          <Link
            href={slide.ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-7 py-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:gap-4 hover:bg-gray-100 active:scale-[0.98]"
            style={{ backgroundColor: "#4fff1a", color: "#0A0A0A" }}
          >
            {slide.ctaText}
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>
      )}
    </div>
  );
}
