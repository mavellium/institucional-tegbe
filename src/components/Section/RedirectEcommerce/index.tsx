"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Link from "next/link";

interface BentoCard {
  id: string;
  type: "hero" | "stat" | "action";
  title: string;
  description: string;
  colSpan: string;
  image?: string;
  badge?: string;
  icon?: string;
  stat?: string;
  ctaText?: string;
  href?: string;
}

interface EcommerceData {
  theme: {
    accent: string;
    bg_card: string;
    bg_section: string;
    text_primary: string;
    text_secondary: string;
  };
  header: {
    tag: string;
    title: string;
    subtitle: string;
  };
  bento_cards: BentoCard[];
}

export default function EcommerceBentoFixed() {
  const [data, setData] = useState<EcommerceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/api-tegbe/tegbe-institucional/ecommerce-home');
        const result = await response.json();
        if (result) setData(result);
      } catch (error) {
        console.error("Mavellium Engine - Erro ao carregar Bento:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading || !data) return null;

  const { theme, header, bento_cards } = data;

  return (
    <section 
        className="py-32 px-6 font-sans relative overflow-hidden"
        style={{ backgroundColor: theme.bg_section }}
    >
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER ( DNA APPLE ) --- */}
        <div className="text-center mb-20 max-w-3xl mx-auto space-y-6">
            <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-[10px] font-bold uppercase tracking-[0.3em] px-5 py-2 rounded-full border inline-block"
                style={{ 
                    color: theme.accent, 
                    backgroundColor: `${theme.accent}15`, 
                    borderColor: `${theme.accent}30` 
                }}
            >
                {header.tag}
            </motion.span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.95]" style={{ color: theme.text_primary }}>
                {header.title}
            </h2>
            <p className="text-xl font-medium opacity-70" style={{ color: theme.text_secondary }}>
                {header.subtitle}
            </p>
        </div>

        {/* --- BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(340px,auto)]">
            
            {bento_cards.map((card, index) => (
                <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className={`
                        ${card.colSpan} 
                        rounded-[2.5rem] overflow-hidden border group relative
                        transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] flex flex-col
                    `}
                    style={{ 
                        backgroundColor: theme.bg_card, 
                        borderColor: 'rgba(0,0,0,0.05)' 
                    }}
                >
                    {/* --- LAYOUT TIPO 1: HERO (RESTAURADO) --- */}
                    {card.type === "hero" && (
                        <div className="flex flex-col md:flex-row h-full relative">
                            <div className="p-10 flex-1 flex flex-col justify-center z-20 bg-gradient-to-br from-white to-transparent">
                                <div className="mb-5 inline-flex items-center gap-2 bg-yellow-50 border border-yellow-100 px-3 py-1 rounded-full w-fit shadow-sm">
                                    <Icon icon="solar:medal-star-bold" className="text-yellow-600 w-3.5 h-3.5" />
                                    <span className="text-[10px] font-bold text-yellow-700 uppercase tracking-wider">{card.badge}</span>
                                </div>
                                <h3 className="text-4xl font-bold mb-4 leading-tight text-gray-900">
                                    {card.title}
                                </h3>
                                <p className="text-lg font-medium text-gray-500 leading-relaxed">
                                    {card.description}
                                </p>
                            </div>
                            
                            <div className="relative h-72 md:h-auto md:w-1/2 overflow-hidden bg-gray-50">
                                <img
                                    src={card.image!}
                                    alt={card.title}
                                    className="absolute inset-0 w-full h-full object-cover opacity-95 group-hover:scale-110 transition-transform duration-1000 ease-out"
                                />
                                {/* Overlay Suave para mesclar com o texto */}
                                <div className="absolute inset-0 bg-gradient-to-r from-white md:via-transparent to-transparent z-10" />
                            </div>
                        </div>
                    )}

                    {/* --- LAYOUT TIPO 2: STAT (RESTAURADO) --- */}
                    {card.type === "stat" && (
                        <div className="p-10 h-full flex flex-col justify-between relative overflow-hidden">
                            {/* Glow sutil no hover */}
                            <div className="absolute -right-4 -top-4 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                                 style={{ backgroundColor: theme.accent }} />
                            
                            <div className="relative z-10">
                                <div className="mb-8 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl"
                                     style={{ backgroundColor: theme.accent, color: 'white' }}>
                                    <Icon icon={card.icon!} className="w-8 h-8" />
                                </div>
                                <h3 className="text-3xl font-bold mb-4 text-gray-900 leading-snug">
                                    {card.title}
                                </h3>
                                <p className="text-base font-medium text-gray-500 opacity-80">
                                    {card.description}
                                </p>
                            </div>
                            <div className="mt-8 relative z-10">
                                <span className="text-sm font-black bg-[#1D1D1F] text-white px-5 py-2.5 rounded-xl uppercase tracking-widest inline-block shadow-xl group-hover:scale-105 transition-transform">
                                    {card.stat}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* --- LAYOUT TIPO 3: ACTION (RESTAURADO) --- */}
                    {card.type === "action" && (
                        <div className="p-12 h-full flex flex-col justify-center items-start bg-[#0A0A0A] relative overflow-hidden">
                            {/* Animated Glow Pulsante */}
                            <motion.div 
                                animate={{ 
                                    scale: [1, 1.2, 1],
                                    opacity: [0.1, 0.2, 0.1]
                                }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -right-20 -top-20 w-96 h-96 rounded-full blur-[100px]" 
                                style={{ backgroundColor: theme.accent }} 
                            />
                            
                            <h3 className="text-4xl font-bold mb-6 text-white relative z-10 leading-tight">
                                {card.title}
                            </h3>
                            <p className="text-lg font-medium mb-10 max-w-lg text-gray-400 relative z-10 leading-relaxed">
                                {card.description}
                            </p>
                            <Link 
                                href={card.href!} 
                                className="group/btn inline-flex items-center gap-4 px-10 py-5 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] transition-all relative z-10 hover:scale-105 active:scale-95 shadow-2xl"
                                style={{ backgroundColor: theme.accent, color: '#FFF' }}
                            >
                                {card.ctaText}
                                <Icon icon="solar:arrow-right-linear" className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    )}

                </motion.div>
            ))}

        </div>
      </div>
    </section>
  );
}