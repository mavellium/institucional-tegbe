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
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, x: 24 }}
      animate={{
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.96,
        x: isActive ? 0 : 24,
      }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full h-full relative"
    >
      <Image
        src={image}
        alt={title ?? "Hero"}
        fill
        sizes="(max-width: 1280px) 100vw, 55vw"
        /* 
           - object-contain: Garante que a imagem nunca distorça no mobile e desktop.
           - object-center: Centraliza no mobile.
           - xl:object-right-bottom: Alinha no canto inferior direito no desktop para compor melhor com o texto.
        */
        className="object-contain object-bottom xl:object-right-bottom"
        priority={priority}
      />
    </motion.div>
  );
}
