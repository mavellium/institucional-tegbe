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
  if (priority) {
    return (
      <div className="w-full h-full relative">
        <Image
          src={image}
          alt={title ?? "Hero Slide"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 58vw"
          className="object-contain object-bottom"
          priority
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, x: 16 }}
      animate={{
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.97,
        x: isActive ? 0 : 16,
      }}
      transition={{ duration: 0.65, delay: 0.25, type: "spring", stiffness: 100 }}
      className="w-full h-full relative"
    >
      <Image
        src={image}
        alt={title ?? "Hero Slide"}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 58vw"
        className="object-contain object-bottom"
        priority={false}
      />
    </motion.div>
  );
}
