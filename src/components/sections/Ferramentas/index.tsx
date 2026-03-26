"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bot, Users, Globe, BarChart3, Mail, Layers } from "lucide-react";

const tools = [
  { icon: Bot, name: "Inteligência Artificial", description: "Automação inteligente para atendimento e análise de dados.", gradient: "from-violet-500 to-purple-600", bg: "bg-violet-50", border: "border-violet-200" },
  { icon: Users, name: "CRM de Vendas", description: "Gerencie leads e clientes de forma organizada e eficiente.", gradient: "from-blue-500 to-cyan-600", bg: "bg-blue-50", border: "border-blue-200" },
  { icon: Globe, name: "Páginas de Vendas", description: "Landing pages de alta conversão, prontas para vender.", gradient: "from-emerald-500 to-teal-600", bg: "bg-emerald-50", border: "border-emerald-200" },
  { icon: BarChart3, name: "Analytics Avançado", description: "Dashboards completos para acompanhar cada métrica.", gradient: "from-amber-500 to-orange-600", bg: "bg-amber-50", border: "border-amber-200" },
  { icon: Mail, name: "E-mail Marketing", description: "Campanhas segmentadas que geram resultados reais.", gradient: "from-rose-500 to-pink-600", bg: "bg-rose-50", border: "border-rose-200" },
  { icon: Layers, name: "Integrações", description: "Conecte todas as suas ferramentas em um só lugar.", gradient: "from-indigo-500 to-blue-600", bg: "bg-indigo-50", border: "border-indigo-200" },
];

export default function FerramentasSection() {
  return (
    <section id="ferramentas" className="py-20 px-4 bg-muted/40">
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 bg-violet-100 text-violet-700">
            FERRAMENTAS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Ferramentas para Alavancar Suas Vendas
          </h2>
          <p className="text-muted-foreground text-lg">
            Tecnologia de ponta ao seu alcance. Soluções que trabalham por si enquanto você foca no crescimento.
          </p>
        </div>

        {/* Grid de ferramentas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`group bg-card rounded-2xl p-6 border ${tool.border} shadow-sm hover:shadow-lg transition-shadow duration-300 relative overflow-hidden`}
            >
              {/* Hover shimmer */}
              <motion.div
                className={`absolute inset-0 ${tool.bg} opacity-0 group-hover:opacity-60 transition-opacity duration-400 rounded-2xl`}
              />

              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                <tool.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-1.5 relative z-10">{tool.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed relative z-10">{tool.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
          >
            Explorar Ferramentas
          </a>
        </div>
      </div>
    </section>
  );
}