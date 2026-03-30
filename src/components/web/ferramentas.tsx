"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Bot, Users, Globe, BarChart3, Mail, Layers, ArrowUpRight } from "lucide-react";

// Adicione o import da Textura que usamos nas outras seções
import Textura from "@/components/ui/textura";

const tools = [
  { 
    icon: Bot, 
    name: "Inteligência Artificial", 
    description: "Automação inteligente para atendimento e análise de dados em tempo real.", 
    gradient: "from-violet-500 to-purple-600",
    shadow: "shadow-violet-500/20"
  },
  { 
    icon: Users, 
    name: "CRM de Vendas", 
    description: "Gerencie leads e clientes de forma organizada, acompanhando cada etapa do funil.", 
    gradient: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/20"
  },
  { 
    icon: Globe, 
    name: "Páginas de Vendas", 
    description: "Landing pages de altíssima conversão, prontas para vender e escalar sua operação.", 
    gradient: "from-emerald-500 to-teal-500",
    shadow: "shadow-emerald-500/20"
  },
  { 
    icon: BarChart3, 
    name: "Analytics Avançado", 
    description: "Dashboards completos e intuitivos para você acompanhar cada métrica do seu negócio.", 
    gradient: "from-amber-500 to-orange-500",
    shadow: "shadow-amber-500/20"
  },
  { 
    icon: Mail, 
    name: "E-mail Marketing", 
    description: "Crie campanhas segmentadas e automatizadas que geram resultados e vendas reais.", 
    gradient: "from-rose-500 to-pink-500",
    shadow: "shadow-rose-500/20"
  },
  { 
    icon: Layers, 
    name: "Integrações", 
    description: "Conecte todas as suas ferramentas e centralize sua operação em um único lugar.", 
    gradient: "from-indigo-500 to-blue-600",
    shadow: "shadow-indigo-500/20"
  },
];

// ======================
// ANIMAÇÕES SPRING
// ======================
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
    transition: { type: "spring", stiffness: 100, damping: 20 } 
  },
};

export default function Ferramentas() {
  return (
    <section id="ferramentas" className="relative py-32 bg-[#F8F9FA] selection:bg-neutral-900 selection:text-white overflow-hidden">
      
      {/* TEXTURA SUTIL PARA QUEBRAR O BRANCO ABSOLUTO */}
      <Textura opacity={0.02} className="absolute inset-0 pointer-events-none mix-blend-multiply" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* HEADER PREMIUM */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary mb-6 border border-primary/10"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest">
              FERRAMENTAS
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-900 mb-6 leading-tight">
            Tecnologia para Escalar
          </h2>
          
          <p className="text-lg md:text-xl text-neutral-500 font-normal max-w-2xl leading-relaxed">
            Soluções que trabalham por si enquanto você foca no crescimento estratégico do seu negócio.
          </p>
        </div>

        {/* GRID DE FERRAMENTAS */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.name}
              variants={itemVariants}
              className="relative group h-full"
            >
              <div 
                className="relative flex flex-col h-full bg-white rounded-[1.5rem] p-8 border border-black/[0.03] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1.5 overflow-hidden z-10"
              >
                
                {/* GLOW DE FUNDO SUAVE NO HOVER */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 bg-gradient-to-br ${tool.gradient} pointer-events-none`} />

                {/* TOPO DO CARD: ÍCONE E SETA */}
                <div className="flex justify-between items-start mb-8 relative z-10">
                  {/* Container do Ícone com Gradiente */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} shadow-lg ${tool.shadow} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                    <tool.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>

                  {/* Seta discreta que aparece no hover */}
                  <div className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-neutral-900 transition-colors" />
                  </div>
                </div>

                {/* TEXTOS */}
                <div className="relative z-10 mt-auto">
                  <h3 className="text-xl font-bold text-neutral-900 mb-3 tracking-tight group-hover:text-neutral-950 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-neutral-500 leading-relaxed text-sm">
                    {tool.description}
                  </p>
                </div>

                {/* ÍCONE FANTASMA DE FUNDO (A assinatura visual do layout) */}
                <div className="absolute -right-6 -bottom-6 opacity-[0.02] group-hover:opacity-[0.05] transition-all duration-700 group-hover:scale-110 group-hover:-rotate-12 pointer-events-none z-0">
                  <tool.icon className="w-40 h-40 text-neutral-900" strokeWidth={1} />
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA PRINCIPAL */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex justify-center mt-20"
        >
          <a
            href="#"
            className="group flex items-center gap-2 h-14 px-10 rounded-full text-base font-semibold bg-neutral-950 text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-neutral-800 hover:shadow-[0_15px_40px_rgb(0,0,0,0.2)] hover:-translate-y-0.5 transition-all duration-300"
          >
            Explorar Ferramentas
            <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}