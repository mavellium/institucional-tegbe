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
        sizes="(max-width: 1024px) 100vw, 52vw"
        className="object-contain object-center lg:object-fill lg:object-bottom"
        priority={priority}
      />
    </motion.div>
  );
}
