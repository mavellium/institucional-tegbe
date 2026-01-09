"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Link from "next/link";

// --- CONFIGURAÇÃO (JSON) ---
const SOBRE_DATA = {
  theme: {
    bg_section: "#FFFFFF",
    text_primary: "#1D1D1F",
    text_secondary: "#86868B",
    accent_gold: "#B8860B",
    bg_accent: "#F5F5F7"
  },
  content: {
    tag: "A Tegbe",
    title: "Engenharia por trás do faturamento.",
    description: "Nascemos em Garça com uma missão clara: erradicar a 'métrica de vaidade'. Não somos uma agência de marketing tradicional. Somos o braço direito operacional de empresas que buscam eficiência máxima.",
    long_text: "Unimos o artesanato do design de elite com a precisão da ciência de dados. Na Tegbe, cada pixel é desenhado para converter e cada clique é rastreado para escalar. Mais do que serviços, entregamos ativos digitais.",
    cta: "Conheça nossa História",
    href: "/sobre"
  },
  stats: [
    { label: "Anos de Mercado", value: "8+" },
    { label: "Faturamento Gerado", value: "8 Dígitos" },
    { label: "Sede Física", value: "Garça / SP" }
  ]
};

export default function SobreAppleSection() {
  const { theme, content, stats } = SOBRE_DATA;

  return (
    <section className="py-32 px-6 font-sans relative bg-white border-t border-gray-50">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* --- COLUNA ESQUERDA: O MANIFESTO (7 Colunas) --- */}
            <div className="lg:col-span-7 space-y-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-xs font-bold uppercase tracking-[0.3em] mb-6 block" style={{ color: theme.accent_gold }}>
                        {content.tag}
                    </span>
                    <h2 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] mb-8" style={{ color: theme.text_primary }}>
                        {content.title}
                    </h2>
                    <p className="text-2xl font-medium leading-relaxed mb-6" style={{ color: theme.text_primary }}>
                        {content.description}
                    </p>
                    <p className="text-lg leading-relaxed max-w-2xl" style={{ color: theme.text_secondary }}>
                        {content.long_text}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <Link 
                        href={content.href}
                        className="group inline-flex items-center gap-2 text-sm font-bold transition-all duration-300"
                        style={{ color: theme.text_primary }}
                    >
                        <span className="border-b-2 border-transparent group-hover:border-[#B8860B] pb-1 transition-all">
                            {content.cta}
                        </span>
                        <Icon icon="solar:arrow-right-linear" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                {/* --- STATS GRID (Horizontal) --- */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-gray-100">
                    {stats.map((stat, i) => (
                        <div key={i} className="space-y-1">
                            <p className="text-3xl font-bold tracking-tight" style={{ color: theme.text_primary }}>{stat.value}</p>
                            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: theme.text_secondary }}>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- COLUNA DIREITA: VISUAL ABSTRACT (5 Colunas) --- */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-5 relative aspect-square lg:aspect-auto lg:h-full min-h-[400px] rounded-[3rem] overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: theme.bg_accent }}
            >
                {/* Visual Abstrato (DNA / Engrenagem / Foco) */}
                <div className="relative w-full h-full flex items-center justify-center group">
                    {/* Círculos Concêntricos Sólidos Estilo Apple */}
                    <div className="absolute w-64 h-64 border border-gray-200 rounded-full" />
                    <div className="absolute w-48 h-48 border border-gray-200 rounded-full" />
                    <div className="absolute w-32 h-32 border border-gray-300 rounded-full" />
                    
                    {/* O Ponto Central de Foco (Gold) */}
                    <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="w-12 h-12 rounded-full shadow-2xl flex items-center justify-center z-10"
                        style={{ backgroundColor: theme.accent_gold }}
                    >
                        <Icon icon="solar:crown-star-bold" className="text-white w-6 h-6" />
                    </motion.div>

                    {/* Texto Rotativo Discreto */}
                    <div className="absolute inset-0 flex items-center justify-center animate-[spin_20s_linear_infinite] opacity-[0.05] pointer-events-none">
                        <span className="text-[120px] font-bold tracking-tighter uppercase">TEGBE TEGBE TEGBE</span>
                    </div>
                </div>

                {/* Badge Flutuante de Localização */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/80 backdrop-blur-xl p-5 rounded-3xl border border-white/50 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <Icon icon="solar:map-point-bold-duotone" className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sede Estratégica</p>
                        <p className="text-sm font-bold" style={{ color: theme.text_primary }}>Garça, São Paulo</p>
                    </div>
                </div>
            </motion.div>

        </div>
      </div>
    </section>
  );
}