"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Bot,
  Users,
  Globe,
  BarChart3,
  Mail,
  Layers,
  ArrowUpRight,
} from "lucide-react";

import Textura from "@/components/ui/textura";
import { useApi } from "@/hooks/useApi";
import { RichTextItem } from "@/types/richText.type";
import RichText from "@/components/ui/rich/richText";

// ================== MAPEAMENTO DE ÍCONES ==================
const iconMap = {
  Bot,
  Users,
  Globe,
  BarChart3,
  Mail,
  Layers,
};

// ================== TIPAGEM ==================
interface Tool {
  icon: keyof typeof iconMap;
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
export default function Ferramentas() {
  const { data } = useApi<FerramentasData>("ferramentas");

  const ferramentas = data?.ferramentas;

  if (!ferramentas || !ferramentas.tools?.length) return null;

  const { header, tools, cta } = ferramentas;

  return (
    <section
      id="ferramentas"
      className="relative py-32 bg-[#F8F9FA] selection:bg-neutral-900 selection:text-white overflow-hidden"
    >
      <Textura
        opacity={0.02}
        className="absolute inset-0 pointer-events-none mix-blend-multiply"
      />

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
            const Icon = iconMap[tool.icon];

            return (
              <motion.div
                key={tool.icon}
                variants={itemVariants}
                className="relative group h-full"
              >
                <div className="relative flex flex-col h-full bg-white rounded-[1.5rem] p-8 border border-black/[0.03] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1.5 overflow-hidden z-10">
                  
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 bg-gradient-to-br ${tool.gradient}`}
                  />

                  {/* TOPO */}
                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} shadow-lg ${tool.shadow} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}
                    >
                      {Icon && (
                        <Icon
                          className="w-6 h-6 text-white"
                          strokeWidth={1.5}
                        />
                      )}
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

                  {/* FUNDO */}
                  <div className="absolute -right-6 -bottom-6 opacity-[0.02] group-hover:opacity-[0.05] transition-all duration-700 group-hover:scale-110 group-hover:-rotate-12 pointer-events-none z-0">
                    {Icon && (
                      <Icon
                        className="w-40 h-40 text-neutral-900"
                        strokeWidth={1}
                      />
                    )}
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
            className="group flex items-center gap-2 h-14 px-10 rounded-full text-base font-semibold bg-neutral-950 text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-neutral-800 hover:shadow-[0_15px_40px_rgb(0,0,0,0.2)] hover:-translate-y-0.5 transition-all duration-300"
          >
            {cta.label}
            <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}