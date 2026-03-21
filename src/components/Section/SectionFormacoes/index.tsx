"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const courses = [
  {
    title: "Gestão de E-commerce",
    description: "Aprenda a gerir lojas online de forma profissional e escalável.",
    tag: "Presencial",
  },
  {
    title: "Marketing Digital Avançado",
    description: "Domine as estratégias de tráfego pago e orgânico.",
    tag: "Presencial",
  },
  {
    title: "Vendas em Marketplaces",
    description: "Técnicas para se destacar nos maiores marketplaces do Brasil.",
    tag: "Presencial",
  },
  {
    title: "Fotografia de Produto",
    description: "Crie fotos que vendem. Equipamento, luz e edição.",
    tag: "Workshop",
  },
];

export default function FormacoesSection() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % courses.length);
  const prev = () => setCurrent((c) => (c - 1 + courses.length) % courses.length);

  return (
    <section id="formacoes" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 bg-emerald-100 text-emerald-700">
            FORMAÇÕES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Aprenda Presencialmente com Especialistas
          </h2>
          <p className="text-muted-foreground text-lg">
            Cursos práticos e intensivos para você dominar o digital. Networking incluído.
          </p>
        </div>

        {/* Carrossel */}
        <div className="relative max-w-3xl mx-auto">
          <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
                className="p-8 md:p-10"
              >
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold mb-4">
                  {courses[current].tag}
                </span>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {courses[current].title}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-md">
                  {courses[current].description}
                </p>

                {/* Dots */}
                <div className="flex gap-2 mt-6">
                  {courses.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === current ? "w-8 bg-primary" : "w-2 bg-border"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Botões de navegação */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full shadow-md bg-card h-10 w-10 flex items-center justify-center border border-border hover:bg-accent transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full shadow-md bg-card h-10 w-10 flex items-center justify-center border border-border hover:bg-accent transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
          >
            Inscreva-se nas Formações
          </a>
        </div>
      </div>
    </section>
  );
}