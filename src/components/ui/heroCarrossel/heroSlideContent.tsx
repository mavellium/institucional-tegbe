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
    <div className="flex flex-col items-center lg:items-start gap-3 sm:gap-4 lg:gap-5 w-full max-w-lg mx-auto lg:mx-0">
      {slide.tag && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 16 }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          <Highlight color={corDestaque} withSerif withItalic size={14}>
            {slide.tag}
          </Highlight>
        </motion.div>
      )}

      {slide.title && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 16 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="w-full"
        >
          <Heading
            size="xl"
            className="
              text-[22px] sm:text-[28px] md:text-[34px] lg:text-[30px] xl:text-[38px] 2xl:text-[40px]
              text-center lg:text-left
              leading-[1.18] tracking-tight font-medium
              break-words hyphens-auto
            "
            color="white"
          >
            {slide.title}
          </Heading>
        </motion.div>
      )}

      {slide.description && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 16 }}
          transition={{ duration: 0.45, delay: 0.28 }}
          className="w-full"
        >
          <Paragrafo
            align="center"
            color="#fff"
            className="
              text-sm sm:text-base lg:text-[15px] xl:text-[17px]
              font-light
              text-center lg:text-left
              text-gray-300
              break-words
            "
          >
            {slide.description}
          </Paragrafo>
        </motion.div>
      )}

      {/* {slide.subtext && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 16 }}
          transition={{ duration: 0.45, delay: 0.38 }}
        >
          <Text
            color="#fff"
            variant="muted"
            className="text-xs sm:text-sm text-center lg:text-left opacity-70"
          >
            {slide.subtext}
          </Text>
        </motion.div>
      )} */}

      {slide.ctaText && slide.ctaLink && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 16 }}
          transition={{ duration: 0.45, delay: 0.46 }}
          className="w-full sm:w-auto mt-1"
        >
          <Button
            asChild
            className="
              w-full sm:w-auto
              px-7 py-4 lg:py-5
              text-sm font-bold uppercase tracking-wider
              rounded-xl border-2 bg-transparent
              hover:bg-white/10 transition-all
              flex items-center justify-center
            "
            style={{ borderColor: corDestaque, color: corDestaque }}
          >
            <Link href={slide.ctaLink} target="_blank" className="w-full text-center">
              {slide.ctaText}
            </Link>
          </Button>
        </motion.div>
      )}

      {slide.richContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.45, delay: 0.55 }}
          className="w-full"
        >
          <RichText content={slide.richContent} />
        </motion.div>
      )}
    </div>
  );
}
