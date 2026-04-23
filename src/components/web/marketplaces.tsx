"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import Heading from "@/components/ui/heading";
import RichText from "@/components/ui/rich/richText";
import Textura from "@/components/ui/textura";
import { Button } from "@/components/ui/button/button";
import { IButton } from "@/interface/button/IButton";
import { RichTextItem } from "@/types/richText.type";

interface Marketplace {
  name: string;
  color: string;
  src: string; // NOVO: URL da imagem de fundo da marca
}

interface IEcommerce {
  header: {
    preTitle?: string;
    title: RichTextItem[];
    subtitle: RichTextItem[];
  };
  marketplaces: Marketplace[];
  button?: IButton;
}

// ======================
// ANIMAÇÕES
// ======================
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export default function Marketplaces({ data }: { data: IEcommerce | null }) {
  if (!data) return null;

  const { header, marketplaces, button } = data;

  return (
    <section
      id="ecommerce"
      className="relative py-32 bg-neutral-950 text-white overflow-hidden selection:bg-white selection:text-neutral-950"
    >
      {/* TEXTURA E GLOWS DE FUNDO */}
      <Textura opacity={0.02} className="absolute inset-0 pointer-events-none mix-blend-overlay" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 blur-[128px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 blur-[128px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-24">
          {header.preTitle && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-neutral-400 mb-6 border border-white/10 shadow-inner"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-600 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                {header.preTitle}
              </span>
            </motion.div>
          )}

          {header.title && (
            <Heading
              color="white"
              align="center"
              as="h2"
              className="text-5xl md:text-6xl font-extrabold tracking-tighter text-white mb-8 leading-[1.1]"
            >
              <RichText content={header.title} />
            </Heading>
          )}

          {header.subtitle && (
            <div className="text-lg md:text-xl text-neutral-400 font-light max-w-2xl leading-relaxed">
              <RichText content={header.subtitle} />
            </div>
          )}
        </div>

        {/* GRID */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6"
        >
          {marketplaces.map((mp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group w-full sm:w-[280px]"
            >
              {/* GLOW COLORIDO ATRÁS DO CARD NO HOVER */}
              <div
                className="absolute inset-0 rounded-[1.5rem] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none -z-10"
                style={{ backgroundColor: mp.color }}
              />

              <Link
                href="#"
                // NOVO DESIGN DO CARD (Aspect Ratio de retrato, overflow hidden)
                className="relative flex flex-col w-full aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-white/[0.05] bg-neutral-900 transition-all duration-500 hover:-translate-y-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.4)]"
              >
                {/* 1. IMAGEM DE FUNDO */}
                <div className="absolute inset-0 w-full h-full overflow-hidden bg-neutral-900">
                  {mp.src && (
                    <Image
                      src={mp.src}
                      alt={`${mp.name} background`}
                      fill
                      sizes="(min-width: 640px) 280px, 100vw"
                      className="object-cover object-bottom transition-transform duration-700 ease-out group-hover:scale-105 opacity-60 group-hover:opacity-80"
                      loading="lazy"
                    />
                  )}
                </div>

                {/* 3. CONTEÚDO SOBREPOSTO */}
                <div className="relative z-10 flex flex-col h-full p-8 pointer-events-none">
                  {/* TEXTO E SETA NA BASE */}
                  <div className="flex items-center gap-3 mt-auto">
                    <span className="font-semibold text-neutral-300 group-hover:text-white transition-colors text-lg tracking-wide">
                      {mp.name}
                    </span>
                  </div>
                </div>

                {/* LINHA DE LUZ INFERIOR (Rim Light) */}
                <div
                  className="absolute bottom-0 inset-x-0 h-px w-3/4 mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-x-50 group-hover:scale-x-100 transition-transform duration-700 z-20"
                  style={{
                    background: `linear-gradient(to right, transparent, ${mp.color}, transparent)`,
                  }}
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        {button && button.action === "link" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex justify-center mt-24"
          >
            <Link href={button.link} target={button.target ?? "_self"}>
              <Button
                variant={button.variant}
                className="h-14 px-12 rounded-full text-base font-semibold bg-white text-neutral-950 hover:bg-neutral-200 shadow-[0_0_60px_rgba(255,255,255,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_80px_rgba(255,255,255,0.2)]"
              >
                {button.label}
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
