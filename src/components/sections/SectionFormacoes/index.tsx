"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight, ArrowRight } from "lucide-react";
import Image from "next/image";

import Textura from "@/components/ui/textura";

interface Course {
  tag: string;
  link: string;
  image: string;
  alt?: string;
  title: string;
  accent: string;
  ctaLabel?: string;
  description: string;
}

interface FormacoesData {
  formacoes: {
    header: {
      badge: string;
      title: string;
      description: string;
    };
    courses: Course[];
    cta: {
      label: string;
      link: string;
    };
  };
}

export default function FormacoesSection({ data }: { data: FormacoesData | null }) {
  const [current, setCurrent] = useState(0);

  const formacoes = data?.formacoes;

  if (!formacoes || !formacoes.courses?.length) return null;

  const { header, courses, cta } = formacoes;

  const next = () => setCurrent((c) => (c + 1) % courses.length);
  const prev = () => setCurrent((c) => (c - 1 + courses.length) % courses.length);

  return (
    <section
      id="formacoes"
      className="relative py-32 bg-neutral-950 text-white overflow-hidden selection:bg-white selection:text-neutral-950"
    >
      <Textura opacity={0.04} className="absolute inset-0 pointer-events-none mix-blend-screen" />

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 blur-[128px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 blur-[128px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 text-neutral-300 mb-6 border border-white/10 shadow-inner"
          >
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest">{header.badge}</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-6 leading-tight">
            {header.title}
          </h2>

          <p className="text-lg md:text-xl text-neutral-400 font-normal max-w-2xl leading-relaxed">
            {header.description}
          </p>
        </div>

        {/* PAINEL */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative bg-white/[0.02] backdrop-blur-md rounded-[2rem] border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-500">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${courses[current].accent} to-transparent transition-colors duration-700 pointer-events-none opacity-60`}
            />

            {/* CONTEÚDO */}
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                  transition={{ type: "spring", stiffness: 200, damping: 24 }}
                  className="relative z-10"
                >
                  <span className="inline-block px-3 py-1 rounded-md bg-white/10 text-neutral-200 text-[11px] font-bold uppercase tracking-wider mb-5 border border-white/5">
                    {courses[current].tag}
                  </span>

                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 leading-tight">
                    {courses[current].title}
                  </h3>

                  <p className="text-lg text-neutral-400 leading-relaxed max-w-2xl mb-6">
                    {courses[current].description}
                  </p>

                  {courses[current].image && (
                    <div className="relative w-full h-85 rounded-xl overflow-hidden mb-8">
                      <Image
                        src={courses[current].image}
                        alt={courses[current].alt ?? courses[current].title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 896px"
                      />
                    </div>
                  )}

                  {courses[current].link && courses[current].ctaLabel && (
                    <a
                      href={courses[current].link}
                      className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white text-sm font-semibold transition-all duration-300 border border-white/10 hover:border-white/20"
                    >
                      {courses[current].ctaLabel}
                      <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </a>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* CONTROLES */}
            <div className="relative z-10 flex items-center justify-between px-10 py-6 border-t border-white/10 bg-black/20 backdrop-blur-sm">
              <div className="flex gap-2">
                {courses.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === current ? "w-8 bg-white" : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={prev}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:bg-white/10 hover:text-white hover:shadow-lg hover:-translate-x-0.5 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={next}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:bg-white/10 hover:text-white hover:shadow-lg hover:translate-x-0.5 transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA FINAL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mt-16"
        >
          <a
            href={cta.link}
            className="group flex items-center gap-2 h-14 px-10 rounded-full text-base font-semibold bg-white text-neutral-950 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:bg-neutral-200 hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 transition-all duration-300"
          >
            {cta.label}
            <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-neutral-900 transition-colors" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
