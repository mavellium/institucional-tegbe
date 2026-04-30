"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Icon } from "@iconify/react";
import { ArrowUpRight } from "lucide-react";

import Textura from "@/components/ui/textura";
import { RichTextItem } from "@/types/richText.type";
import RichText from "@/components/ui/rich/richText";

// ================== TIPAGEM ==================
interface Tool {
  icon: string;
  name: RichTextItem[];
  description: RichTextItem[];
  gradient: string;
  shadow: string;
}

interface FerramentasData {
  ferramentas: {
    header: {
      badge: RichTextItem[];
      title: RichTextItem[];
      description: RichTextItem[];
    };
    tools: Tool[];
    cta: {
      label: string;
      link: string;
    };
  };
}

// ================== GRADIENTE INLINE ==================
// Tailwind purge não inclui classes que chegam só via API em runtime.
// Convertemos para CSS inline usando esta tabela de cores.
const TW: Record<string, string> = {
  "slate-500": "#64748b",
  "gray-500": "#6b7280",
  "zinc-500": "#71717a",
  "red-500": "#ef4444",
  "orange-500": "#f97316",
  "amber-500": "#f59e0b",
  "yellow-500": "#eab308",
  "lime-500": "#84cc16",
  "green-500": "#22c55e",
  "emerald-500": "#10b981",
  "teal-500": "#14b8a6",
  "cyan-500": "#06b6d4",
  "sky-500": "#0ea5e9",
  "blue-500": "#3b82f6",
  "blue-600": "#2563eb",
  "indigo-500": "#6366f1",
  "violet-500": "#8b5cf6",
  "purple-500": "#a855f7",
  "purple-600": "#9333ea",
  "fuchsia-500": "#d946ef",
  "pink-500": "#ec4899",
  "rose-500": "#f43f5e",
};

function parseGradient(cls: string): string {
  const from = cls.match(/from-([\w]+-[\d]+)/)?.[1];
  const to = cls.match(/to-([\w]+-[\d]+)/)?.[1];
  const c1 = (from && TW[from]) ?? "#888";
  const c2 = (to && TW[to]) ?? "#555";
  return `linear-gradient(135deg, ${c1}, ${c2})`;
}

function parseShadow(cls: string): string {
  const m = cls.match(/shadow-([\w]+-[\d]+)\/(\d+)/);
  if (!m) return "0 8px 24px rgba(0,0,0,0.15)";
  const hex = TW[m[1]];
  if (!hex) return "0 8px 24px rgba(0,0,0,0.15)";
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const a = parseInt(m[2]) / 100;
  return `0 8px 24px rgba(${r},${g},${b},${a})`;
}

// ================== ANIMAÇÕES ==================
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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

// ================== COMPONENT ==================
export default function Ferramentas({ data }: { data: FerramentasData | null }) {
  const ferramentas = data?.ferramentas;

  if (!ferramentas || !ferramentas.tools?.length) return null;

  const { header, tools, cta } = ferramentas;

  return (
    <section
      id="ferramentas"
      className="relative py-32 bg-[#F8F9FA] selection:bg-neutral-900 selection:text-white overflow-hidden"
    >
      <Textura opacity={0.02} className="absolute inset-0 pointer-events-none mix-blend-multiply" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary mb-6 border border-primary/10"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest">
              <RichText content={header.badge} />
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-900 mb-6 leading-tight">
            <RichText content={header.title} />
          </h2>

          <p className="text-lg md:text-xl text-neutral-500 font-normal max-w-2xl leading-relaxed">
            <RichText content={header.description} />
          </p>
        </div>

        {/* GRID */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {tools.map((tool) => {
            const gradient = parseGradient(tool.gradient);
            const shadow = parseShadow(tool.shadow);

            return (
              <motion.div key={tool.icon} variants={itemVariants} className="relative group h-full">
                <div className="relative flex flex-col h-full bg-white rounded-[1.5rem] p-8 border border-black/[0.03] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1.5 overflow-hidden z-10">
                  {/* hover bg overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500"
                    style={{ background: gradient }}
                  />

                  {/* TOPO */}
                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                      style={{ background: gradient, boxShadow: shadow }}
                    >
                      <Icon icon={tool.icon} className="w-6 h-6 text-white" />
                    </div>

                    <div className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-neutral-900 transition-colors" />
                    </div>
                  </div>

                  {/* TEXTO */}
                  <div className="relative z-10 mt-auto">
                    <h3 className="text-xl font-bold text-neutral-900 mb-3 tracking-tight">
                      <RichText content={tool.name} />
                    </h3>

                    <p className="text-neutral-500 leading-relaxed text-sm">
                      <RichText content={tool.description} />
                    </p>
                  </div>

                  {/* FUNDO DECORATIVO */}
                  <div className="absolute -right-6 -bottom-6 opacity-[0.04] group-hover:opacity-[0.08] transition-all duration-700 group-hover:scale-110 group-hover:-rotate-12 pointer-events-none z-0 text-neutral-900">
                    <Icon icon={tool.icon} style={{ width: 160, height: 160 }} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-20"
        >
          <a
            href={cta.link}
            className="group flex items-center gap-2 h-14 px-10 rounded-full text-base font-semibold bg-green-500 text-neutral-950 shadow-[0_8px_30px_rgba(34,197,94,0.25)] hover:bg-green-400 hover:shadow-[0_15px_40px_rgba(34,197,94,0.35)] hover:-translate-y-0.5 transition-all duration-300"
          >
            {cta.label}
            <ArrowUpRight className="w-4 h-4 text-neutral-700 group-hover:text-neutral-950 transition-colors" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
