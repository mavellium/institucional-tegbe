"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// --- CONFIGURAÇÃO (MINIMALISTA) ---
const SOBRE_DATA = {
  theme: {
    bg_section: "#FFFFFF",
    text_primary: "#1D1D1F",
    text_secondary: "#86868B",
    accent_yellow: "#EAB308", // Yellow 600 - tom mais sóbrio
    bg_accent: "#F5F5F7"
  },
  content: {
    tag: "Digital Architecture",
    title: "Engenharia por trás do faturamento.",
    description: "Não somos uma agência tradicional. Somos o braço direito operacional de empresas que buscam eficiência máxima.",
    long_text: "Unimos o minimalismo do design de elite com a precisão da ciência de dados. Na Mavellium, cada pixel é desenhado para converter e cada clique é rastreado para escalar.",
    cta: "Nossa Metodologia",
    href: "/sobre",
    image_bg: "/ads-bg.png"
  },
  stats: [
    { label: "Anos de Escala", value: "8+" },
    { label: "Faturamento Gerado", value: "8 Dígitos" },
    { label: "Sede Física", value: "Garça / SP" }
  ]
};

export default function SobreRefinedSection() {
  const { theme, content, stats } = SOBRE_DATA;

  return (
    <section className="py-40 px-6 font-sans relative bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            
            {/* --- COLUNA ESQUERDA: O MANIFESTO (REFINADO) --- */}
            <div className="lg:col-span-6 space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-6 h-[1px] bg-yellow-500/50" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-yellow-600">
                            {content.tag}
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] mb-10 text-[#1D1D1F]">
                        {content.title}
                    </h2>
                    
                    <p className="text-xl font-medium leading-relaxed mb-8 text-[#1D1D1F]">
                        {content.description}
                    </p>
                    
                    <p className="text-base leading-relaxed max-w-lg text-[#86868B]">
                        {content.long_text}
                    </p>
                </motion.div>

                {/* Stats Minimalistas */}
                <div className="grid grid-cols-3 gap-4 pt-10 border-t border-gray-100">
                    {stats.map((stat, i) => (
                        <div key={i}>
                            <p className="text-2xl font-semibold tracking-tight text-[#1D1D1F]">{stat.value}</p>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <Link 
                        href={content.href}
                        className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1D1D1F] hover:text-yellow-600 transition-colors"
                    >
                        <span className="border-b border-gray-200 group-hover:border-yellow-500 pb-1 transition-all">
                            {content.cta}
                        </span>
                        <Icon icon="solar:arrow-right-linear" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>

            {/* --- COLUNA DIREITA: VISUAL COM IMAGEM DE FUNDO --- */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="lg:col-span-6 relative aspect-[4/5] lg:aspect-square rounded-[3rem] overflow-hidden bg-gray-100 group shadow-sm"
            >
   
                <Image 
                    src={content.image_bg}
                    alt="Tegbe"
                    fill
                    className="object-cover grayscale opacity-40 group-hover:scale-105 transition-transform duration-[2s] ease-out"
                />

                {/* Camada de Gradiente Suave para Integração */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/80 via-white/20 to-transparent" />
                
                {/* Animação Técnica Centralizada */}
                <div className="relative w-full h-full flex items-center justify-center">
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="w-72 h-72 border border-black/5 rounded-full flex items-center justify-center"
                    >
                         <div className="w-56 h-56 border border-black/5 rounded-full border-dashed" />
                    </motion.div>

                    {/* Badge Central Silenciosa */}
                    <div className="absolute w-16 h-16 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-center border border-white/20 group-hover:border-yellow-500/50 transition-colors duration-500">
                        <Icon icon="solar:crown-star-bold" className="text-yellow-600 w-8 h-8" />
                    </div>
                </div>

                {/* Badge HQ Localização (Clean Style) */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[calc(100%-80px)] bg-white/90 backdrop-blur-xl p-5 rounded-3xl border border-white flex items-center gap-4 shadow-2xl shadow-black/5">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500 flex items-center justify-center">
                        <Icon icon="solar:map-point-bold" className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Sede Estratégica</p>
                        <p className="text-sm font-bold text-[#1D1D1F]">Garça, São Paulo</p>
                    </div>
                </div>
            </motion.div>

        </div>
      </div>
    </section>
  );
}