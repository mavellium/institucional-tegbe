"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

import Heading from "@/components/ui/heading";
import Paragrafo from "@/components/ui/paragrafo";
import RichText from "@/components/ui/rich/richText";
import Textura from "@/components/ui/textura"; // Importado para manter o padrão sutil de ruído
import { RichTextItem } from "@/types/richText.type";

import ServiceCard from "@/components/ui/serviceCard";
import { ServiceA, ServiceTheme } from "@/types/service.type";

// Tipagem
interface IHero {
  header: {
    badge?: string;
    title: RichTextItem[];
    subtitle: RichTextItem[];
  };
  services: ServiceA[];
}

// Animações Spring (Mais fluidas, padrão Apple/Stripe)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export default function MostrarSolucoes({ data }: { data: IHero | null }) {
  if (!data) return null;

  const { header, services } = data;

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const theme: ServiceTheme = {
    badge: {
      background: "bg-neutral-100 text-neutral-800 border border-neutral-200", // Ajustado para ornar com o fundo clean
    },
  };

  return (
    // FUNDO PADRONIZADO COM A SEÇÃO DE MARKETING
    <section className="relative py-32 bg-[#F8F9FA] selection:bg-neutral-900 selection:text-white">
      {/* TEXTURA SUTIL PARA QUEBRAR O BRANCO ABSOLUTO */}
      <Textura opacity={0.02} className="absolute inset-0 pointer-events-none mix-blend-multiply" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* HEADER PADRONIZADO */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          {header.badge && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary mb-6 border border-primary/10"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest">{header.badge}</span>
            </motion.div>
          )}

          <Heading
            align="center"
            as="h2"
            className="text-5xl md:text-6xl font-semibold tracking-tight text-neutral-900 mb-6 leading-tight"
          >
            <RichText content={header.title} />
          </Heading>

          <div className="text-lg md:text-xl text-neutral-500 font-normal max-w-2xl leading-relaxed">
            <RichText content={header.subtitle} />
          </div>
        </div>

        {/* GRID COM SERVICE CARD */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              onClick={() => scrollTo(service.id)}
              // O WRAPPER ASSUME O COMPORTAMENTO 3D FLUTUANTE
              className="group relative cursor-pointer bg-white rounded-[1.5rem] border border-black/[0.03] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 overflow-hidden hover:z-50"
            >
              <ServiceCard service={service} theme={theme} variant="hero" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
