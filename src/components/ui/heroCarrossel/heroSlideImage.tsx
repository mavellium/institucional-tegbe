"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface HeroSlideImageProps {
  image: string;
  title?: string;
  isActive: boolean;
  priority?: boolean;
}

export default function HeroSlideImage({
  image,
  title,
  isActive,
  priority = false,
}: HeroSlideImageProps) {
  // Condição para o LCP (Largest Contentful Paint) - Slide Inicial
  if (priority) {
    return (
      // Removido o 'aspect-video' para respeitar a altura dinâmica (dvh) do pai
      <div className="w-full h-full relative">
        <Image
          src={image}
          alt={title ?? "Hero Slide"}
          fill
          // Sizes atualizado para melhorar a performance de carregamento baseada na tela
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
          className="object-contain object-bottom"
          priority
        />
      </div>
    );
  }

  // Condição para os demais slides (Animados)
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, x: 20 }}
      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.95, x: isActive ? 0 : 20 }}
      transition={{ duration: 0.7, delay: 0.3, type: "spring" }}
      className="w-full h-full relative"
    >
      <Image
        src={image}
        alt={title ?? "Hero Slide"}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
        className="object-contain object-bottom"
        priority={false}
      />
    </motion.div>
  );
}
