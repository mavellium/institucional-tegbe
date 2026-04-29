"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

import { RichTextItem } from "@/types/richText.type";
import RichText from "@/components/ui/rich/richText";
import Link from "next/link";

// ================== TIPAGEM ==================
export interface CtaDuvidasData {
  title: RichTextItem[];
  description: RichTextItem[];
  button: {
    label: string;
    link: string;
  };
}

// ================== COMPONENT ==================
export default function CtaDuvidas({ data }: { data: CtaDuvidasData | null }) {
  const cta = data;

  if (!cta) return null;

  return (
    <section className="relative w-full bg-neutral-950 overflow-hidden selection:bg-white selection:text-neutral-950">
      {/* SVG */}
      <div className="absolute top-0 right-0 bottom-0 w-[55%] md:w-[45%] lg:w-[40%] pointer-events-none z-0 hidden md:block">
        <svg
          viewBox="0 0 400 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover object-left"
          preserveAspectRatio="none"
        >
          <motion.path
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            d="M0 0H400V400H150L0 250V0Z"
            fill="#1A1A1A"
          />

          <motion.path
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            d="M0 450H150L400 700V800H0V450Z"
            fill="#1A1A1A"
          />
        </svg>
      </div>

      {/* CONTEÚDO */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32 lg:py-40 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-[55%] lg:w-[50%] flex flex-col items-center md:items-start text-left">
          {/* TITLE */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-[72px] font-semibold text-white tracking-tight leading-[1.05] mb-6 text-balance text-center md:text-left"
          >
            <RichText content={cta.title} />
          </motion.h2>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-neutral-400 font-medium max-w-md mb-10 leading-relaxed text-center md:text-left"
          >
            <RichText content={cta.description} />
          </motion.p>

          {/* BUTTON */}
          {cta?.button?.link && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                href={cta.button.link}
                className="group flex items-center gap-3 bg-green-500 text-neutral-950 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 hover:shadow-[0_8px_30px_rgba(255,255,255,0.12)] hover:-translate-y-1 transition-all duration-300 active:scale-95"
              >
                {cta.button.label}
                <MessageCircle className="w-5 h-5 text-neutral-950 group-hover:text-neutral-950 transition-colors" />
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
