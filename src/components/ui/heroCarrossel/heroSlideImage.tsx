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
  // Slide 0 (priority): renderiza instantaneamente sem animação para otimizar LCP
  if (priority) {
    return (
      <div className="w-full h-full relative">
        <Image
          src={image}
          alt={title ?? "Hero Slide"}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-contain object-bottom"
          priority
        />
      </div>
    );
  }

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
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="object-contain object-bottom"
        priority={false}
      />
    </motion.div>
  );
}
