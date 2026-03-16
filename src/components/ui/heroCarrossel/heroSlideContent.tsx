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
}

export default function HeroSlideContent({ slide, isActive }: HeroSlideContentProps) {
  return (
    <div className=" z-10 flex flex-col items-center lg:items-start gap-6">

      {/* Tag / Highlight */}
      {slide.tag && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Highlight color="#F9265E" withSerif withItalic>
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
        >
          <Heading size="xl" className="text-white" color="white">
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
        >
          <Paragrafo className="text-gray-200 text-2xl lg:text-3xl font-light leading-snug">
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
          <Text variant="muted" className="text-sm lg:text-base max-w-lg">
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
        >
          <Button asChild variant="marketing">
            <Link href={slide.ctaLink} target="_blank">
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
        >
          <RichText content={slide.richContent} />
        </motion.div>
      )}
    </div>
  );
}