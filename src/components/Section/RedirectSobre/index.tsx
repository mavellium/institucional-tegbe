"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Link from "next/link";

// --- INTERFACES PARA O SCHEMA MAVELLIUM ---
interface Stat {
  label: string;
  value: string;
}

interface SobreData {
  stats: Stat[];
  theme: {
    bg_accent: string;
    bg_section: string;
    text_primary: string;
    accent_yellow: string;
    text_secondary: string;
  };
  content: {
    cta: string;
    tag: string;
    href: string;
    title: string;
    image_bg: string;
    long_text: string;
    description: string;
  };
  visual_metadata: {
    image_effects: string;
    location_badge: {
      city: string;
      icon: string;
      label: string;
    };
    central_badge_icon: string;
  };
}

export default function SobreRefinedSection() {
  const [data, setData] = useState<SobreData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api-tegbe/tegbe-institucional/sobre-home');
        const result = await response.json();
        if (result) setData(result);
      } catch (error) {
        console.error("Mavellium Engine - Erro:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !data) return null;

  const { theme, content, stats, visual_metadata } = data;

  return (
    <section 
      className="py-40 px-6 font-sans relative overflow-hidden"
      style={{ backgroundColor: theme.bg_section }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            
            {/* --- COLUNA ESQUERDA: O MANIFESTO --- */}
            <div className="lg:col-span-6 space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-6 h-[1px]" style={{ backgroundColor: theme.accent_yellow }} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em]" style={{ color: theme.accent_yellow }}>
                            {content.tag}
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] mb-10" style={{ color: theme.text_primary }}>
                        {content.title}
                    </h2>
                    
                    <p className="text-xl font-medium leading-relaxed mb-8" style={{ color: theme.text_primary }}>
                        {content.description}
                    </p>
                    
                    <p className="text-base leading-relaxed max-w-lg" style={{ color: theme.text_secondary }}>
                        {content.long_text}
                    </p>
                </motion.div>

                {/* Stats Minimalistas */}
                <div className="grid grid-cols-3 gap-4 pt-10 border-t border-gray-100">
                    {stats.filter(s => s.label !== "e").map((stat, i) => (
                        <div key={i}>
                            <p className="text-2xl font-semibold tracking-tight" style={{ color: theme.text_primary }}>
                              {stat.value}
                            </p>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-1">
                              {stat.label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* --- CTA DE ALTO IMPACTO (REDIRECCIONADO) --- */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <Link 
                        href={content.href}
                        className="group/btn relative inline-flex items-center gap-8 px-12 py-6 rounded-2xl bg-[#0A0A0A] overflow-hidden transition-all duration-500 shadow-2xl shadow-black/20 hover:shadow-yellow-500/20"
                    >
                        {/* Efeito de Preenchimento Dourado Mavellium */}
                        <div 
                            className="absolute inset-0 translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" 
                            style={{ backgroundColor: theme.accent_yellow }}
                        />
                        
                        {/* Texto e Ícone com inversão de cor dinâmica */}
                        <span className="relative z-10 text-[12px] font-black uppercase tracking-[0.25em] text-white group-hover/btn:text-black transition-colors duration-500">
                            {content.cta}
                        </span>

                        <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white/10 group-hover/btn:bg-black/10 transition-all duration-500">
                            <Icon 
                                icon="solar:round-alt-arrow-right-bold" 
                                className="w-6 h-6 text-white group-hover/btn:text-black transition-all duration-500 group-hover/btn:translate-x-1" 
                            />
                        </div>
                    </Link>
                </motion.div>
            </div>

            {/* --- COLUNA DIREITA: VISUAL --- */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="lg:col-span-6 relative aspect-[4/5] lg:aspect-square rounded-[3rem] overflow-hidden bg-gray-100 group shadow-sm"
            >
                <img 
                    src={content.image_bg}
                    alt="Mavellium Engine"
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:scale-105 transition-transform duration-[2s] ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-tr from-white/80 via-white/20 to-transparent" />
                
                <div className="relative w-full h-full flex items-center justify-center">
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="w-72 h-72 border border-black/5 rounded-full flex items-center justify-center"
                    >
                         <div className="w-56 h-56 border border-black/5 rounded-full border-dashed" />
                    </motion.div>

                    <div className="absolute w-16 h-16 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-center border border-white/20 group-hover:border-yellow-500/50 transition-colors duration-500">
                        <Icon 
                          icon={visual_metadata.central_badge_icon} 
                          className="w-8 h-8" 
                          style={{ color: theme.accent_yellow }} 
                        />
                    </div>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[calc(100%-80px)] bg-white/90 backdrop-blur-xl p-5 rounded-3xl border border-white flex items-center gap-4 shadow-2xl shadow-black/5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: theme.accent_yellow }}>
                        <Icon icon={visual_metadata.location_badge.icon} className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">
                          {visual_metadata.location_badge.label}
                        </p>
                        <p className="text-sm font-bold" style={{ color: theme.text_primary }}>
                          {visual_metadata.location_badge.city}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
}