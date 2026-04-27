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
      initial={{ opacity: 0, scale: 0.95, x: 20 }}
      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.95, x: isActive ? 0 : 20 }}
      transition={{ duration: 0.7, delay: 0.3, type: "spring" }}
      className="h-full relative"
    >
      <Image
        src={image}
        alt={title ?? "Hero Slide"}
        fill
        className="object-contain object-bottom drop-shadow-2xl"
        priority={priority}
      />
    </motion.div>
  );
}