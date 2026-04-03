"use client";

import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button/button";
import { IButton } from "@/interface/button/IButton";
import RichText from "@/components/ui/rich/richText";
import { RichTextItem } from "@/types/richText.type";
import { motion, Variants } from "framer-motion";
import { IImage } from "@/interface/imagem/IImage";

/* =========================
   INTERFACE DA API
========================= */

interface homeFormacoesData {
  heading: RichTextItem[];
  button: IButton;
  image: IImage;
}

/* =========================
   ANIMAÇÕES
========================= */
const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const imageAnim: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 40,
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
/* =========================
   COMPONENT
========================= */
export default function HomeFormacoes({ data }: { data: homeFormacoesData | null }) {
  if (!data) return null;

  return (
    <section className="relative w-full h-[90vh] overflow-hidden flex items-center">
      {/* BACKGROUND */}
      <div className="absolute inset-0 grayscale">
        <Image
          src={data.image.src}
          alt="Fundo"
          fill
          sizes="100vw"
          quality={60}
          className="object-cover"
          priority
        />
      </div>

      {/* OVERLAY */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          backgroundImage: "linear-gradient(45deg, rgba(0, 0, 0, .1) -70%, rgba(0, 0, 0, 1) 60%)",
          backgroundSize: "3px 3px",
          zIndex: 2,
        }}
      />

      {/* CONTAINER */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-[3] w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex justify-between items-center"
      >
        {/* TEXTO */}
        <div className="max-w-2xl space-y-6 text-left">
          {/* HEADING */}
          <motion.div variants={reveal}>
            <Heading className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
              <RichText content={data.heading} />
            </Heading>
          </motion.div>

          {/* BOTÃO */}
          {data.button.action === "link" && (
            <motion.div variants={reveal}>
              <Button className="px-8 py-4 uppercase tracking-widest text-xs font-bold w-fit">
                <Link href={data.button.link}>{data.button.label}</Link>
              </Button>
            </motion.div>
          )}
        </div>

        {/* IMAGEM */}
        <motion.div variants={imageAnim} className="flex items-end pointer-events-none">
          <Image
            src="/tegpro_logo.svg"
            alt="Pessoa"
            width={400}
            height={600}
            className="object-contain"
            priority
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
