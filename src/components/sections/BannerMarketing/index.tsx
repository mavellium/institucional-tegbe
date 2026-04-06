"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

import Heading from "@/components/ui/heading";
import RichText from "@/components/ui/rich/richText";
import Textura from "@/components/ui/textura";
import { Button } from "@/components/ui/button/button";
import { RichTextItem } from "@/types/richText.type";
import { IButton } from "@/interface/button/IButton";

import {
  FaInstagram,
  FaTiktok,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaPinterestP,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";

const ICON_MAP: Record<string, React.ElementType> = {
  Instagram: FaInstagram,
  TikTok: FaTiktok,
  Facebook: FaFacebookF,
  YouTube: FaYoutube,
  LinkedIn: FaLinkedinIn,
  Pinterest: FaPinterestP,
  WhatsApp: FaWhatsapp,
  "Twitter/X": FaXTwitter,
};

const BRAND_COLORS: Record<string, string> = {
  Instagram: "#E1306C",
  TikTok: "#000000",
  Facebook: "#1877F2",
  YouTube: "#FF0000",
  LinkedIn: "#0A66C2",
  Pinterest: "#E60023",
  WhatsApp: "#25D366",
  "Twitter/X": "#000000",
};

interface Social {
  name: string;
  gradient: string;
}

interface IMarketing {
  header: {
    preTitle?: string;
    title: RichTextItem[];
    subtitle: RichTextItem[];
  };
  socials: Social[];
  button?: IButton;
}

const getCssGradient = (tailwindString: string) => {
  if (!tailwindString) return "none";
  const hexColors = [...tailwindString.matchAll(/\[#([a-fA-F0-9]+)\]/g)].map((m) => `#${m[1]}`);

  if (hexColors.length === 2) return `linear-gradient(135deg, ${hexColors[0]}, ${hexColors[1]})`;
  if (hexColors.length >= 3)
    return `linear-gradient(135deg, ${hexColors[0]}, ${hexColors[1]}, ${hexColors[2]})`;
  return "#e5e5e5";
};

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export default function MarketingSection({ data }: { data: IMarketing | null }) {
  // 1. PRIMEIRA TRAVA: Se data for nulo, não renderiza nada
  if (!data) return null;

  // 2. SEGUNDA TRAVA: Desestruturação com valores padrão (default values)
  // Se socials for undefined, ele assume um array vazio [] evitando erro no .map
  const { header, socials = [], button } = data;

  return (
    <section className="relative py-32 bg-neutral-50 selection:bg-neutral-900 selection:text-white">
      <Textura opacity={0.03} className="absolute inset-0 pointer-events-none mix-blend-multiply" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* HEADER - Usando optional chaining (?.) por segurança */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          {header?.preTitle && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary mb-6 border border-primary/10"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest">{header.preTitle}</span>
            </motion.div>
          )}

          {header?.title && (
            <Heading
              align="center"
              as="h2"
              className="text-5xl md:text-6xl font-semibold tracking-tight text-neutral-900 mb-6 leading-tight"
            >
              <RichText content={header.title} />
            </Heading>
          )}

          {header?.subtitle && (
            <div className="text-lg md:text-xl text-neutral-500 font-normal max-w-2xl leading-relaxed">
              <RichText content={header.subtitle} />
            </div>
          )}
        </div>

        {/* GRID DE REDES SOCIAIS */}
        {socials.length > 0 && (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {socials.map((s) => {
              // Verificação extra se s existe
              if (!s) return null;

              const IconComponent = ICON_MAP[s.name] || FaInstagram;
              const dynamicGradient = getCssGradient(s.gradient);
              const brandColor = BRAND_COLORS[s.name] || "#000000";

              return (
                <motion.div key={s.name} variants={item}>
                  <a
                    href="#"
                    className="group block relative bg-white rounded-[1.5rem] p-8 border border-neutral-200 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-1.5 opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: dynamicGradient }}
                    />

                    <div className="flex justify-between items-start mb-12 relative z-10">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white shadow-sm border border-neutral-100 group-hover:scale-110 transition-all duration-500"
                        style={{ color: brandColor }}
                      >
                        <IconComponent size={26} />
                      </div>

                      <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 border border-neutral-100">
                        <FiArrowUpRight
                          size={18}
                          className="text-neutral-600 group-hover:text-neutral-900"
                        />
                      </div>
                    </div>

                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-neutral-800 group-hover:text-neutral-950 transition-colors">
                        {s.name}
                      </h3>

                      <span className="block text-sm font-medium text-neutral-400 mt-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        Explorar rede &rarr;
                      </span>
                    </div>

                    <div
                      className="absolute -right-6 -bottom-6 z-0 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-700 group-hover:scale-110 group-hover:-rotate-6 pointer-events-none"
                      style={{ color: brandColor }}
                    >
                      <IconComponent size={130} />
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* CTA */}
        {button && button.action === "link" && button.link && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex justify-center mt-24 relative z-10"
          >
            <Link href={button.link} target={button.target ?? "_self"}>
              <Button
                variant={button.variant}
                className="h-14 px-10 text-base font-medium shadow-lg hover:shadow-primary/20 transition-all hover:-translate-y-0.5"
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
