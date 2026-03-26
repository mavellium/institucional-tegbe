"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Link from "next/link";

// --- INTERFACES PARA O SCHEMA DINÂMICO ---
interface MarketingCard {
  id: string;
  icon: string;
  stat?: string;
  title: string;
  description: string;
  subtitle?: string;
  tags?: string[];
  cta?: string;
  href?: string;
}

interface MarketingData {
  theme: {
    bg_section: string;
    accent_pink: string;
    card_dark_bg: string;
    card_light_bg: string;
    card_dark_text: string;
    card_light_text: string;
    accent_gradient: string;
  };
  header: {
    tag: string;
    title: string;
    subtitle: string;
  };
  cards: {
    main_tower: MarketingCard;
    creative_stack: MarketingCard;
    crm_stack: MarketingCard;
  };
}

export default function MarketingDarkArcade() {
  const [data, setData] = useState<MarketingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMarketingData = async () => {
      try {
        const response = await fetch('/api-tegbe/tegbe-institucional/marketing');
        const result = await response.json();
        if (result.marketing_section) {
          setData(result.marketing_section);
        }
      } catch (error) {
        console.error("Mavellium Engine - Erro ao carregar Marketing:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMarketingData();
  }, []);

  if (loading || !data) return null;

  const { theme, header, cards } = data;

  return (
    <section className="py-32 px-6 font-sans relative overflow-hidden" style={{ backgroundColor: theme.bg_section }}>
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-rose-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="mb-20">
            <motion.div 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-6"
            >
                <div className="w-10 h-[1px]" style={{ backgroundColor: theme.accent_pink }} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: theme.accent_pink }}>
                    {header.tag}
                </span>
            </motion.div>
            
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] text-white mb-8"
            >
                {header.title}
            </motion.h2>

            <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-xl font-medium leading-relaxed text-zinc-500 max-w-xl"
            >
                {header.subtitle}
            </motion.p>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:min-h-[600px]">
            
            {/* CARD TOWER (ESQUERDA) */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="lg:col-span-5 relative rounded-[3rem] border border-white/5 overflow-hidden p-12 flex flex-col justify-between group"
                style={{ backgroundColor: theme.card_dark_bg }}
            >
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-rose-600/10 via-transparent to-transparent" />
                
                <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-10 shadow-lg shadow-rose-900/40" style={{ background: theme.accent_gradient }}>
                        <Icon icon={cards.main_tower.icon} className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-4xl font-bold text-white mb-4 tracking-tight">
                        {cards.main_tower.title}
                    </h3>
                    <p className="text-lg font-bold mb-6 text-rose-500 uppercase tracking-widest text-[11px]">
                        {cards.main_tower.subtitle}
                    </p>
                    <p className="text-zinc-400 leading-relaxed mb-10 font-medium">
                        {cards.main_tower.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {cards.main_tower.tags?.map((tag, i) => (
                            <span key={i} className="px-3 py-1 rounded-lg border border-white/10 text-[10px] font-bold text-zinc-500 bg-white/5 uppercase tracking-tighter">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* CTA REFINADO: GHOST GLASS DESIGN */}
                <Link 
                    href={cards.main_tower.href || "#"}
                    className="mt-12 group/btn relative flex items-center justify-between px-10 py-6 rounded-2xl overflow-hidden transition-all duration-500 bg-[#0F0F10] border border-white/[0.08] hover:border-rose-500/50 hover:shadow-[0_0_30px_rgba(255,45,85,0.15)]"
                >
                    <div 
                        className="absolute inset-0 translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" 
                        style={{ backgroundColor: theme.accent_pink }}
                    />
                    
                    <div className="relative z-10 flex items-center justify-between w-full">
                        <span className="text-[13px] font-extrabold uppercase tracking-[0.15em] text-white group-hover/btn:text-black transition-colors duration-500">
                            {cards.main_tower.cta}
                        </span>
                        
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 group-hover/btn:bg-black/20 transition-all duration-500">
                             <Icon 
                                icon="solar:round-alt-arrow-right-bold" 
                                className="w-6 h-6 transition-all duration-500 group-hover/btn:text-black group-hover/btn:translate-x-1" 
                                style={{ color: theme.accent_pink }}
                            />
                        </div>
                    </div>
                </Link>
            </motion.div>

            {/* STACKED CARDS (DIREITA) */}
            <div className="lg:col-span-7 flex flex-col gap-8">
                
                {/* CARD CREATIVE */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="flex-1 rounded-[3rem] p-10 flex flex-col md:flex-row items-center gap-10 border border-white/5 hover:border-rose-500/30 transition-all group"
                    style={{ backgroundColor: theme.card_dark_bg }}
                >
                     <div className="flex-1">
                        <h3 className="text-3xl font-bold mb-3 text-white tracking-tight">
                            {cards.creative_stack.title}
                        </h3>
                        <p className="text-zinc-500 font-medium leading-relaxed">
                            {cards.creative_stack.description}
                        </p>
                     </div>
                     
                     <div className="relative">
                        <div className="w-28 h-28 rounded-3xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-white/10">
                            <Icon icon={cards.creative_stack.icon} className="w-12 h-12" style={{ color: theme.accent_pink }} />
                        </div>
                        <div className="absolute -bottom-2 -right-2 text-white px-4 py-1.5 rounded-lg shadow-lg text-[10px] font-black uppercase tracking-widest"
                             style={{ backgroundColor: theme.accent_pink }}>
                            {cards.creative_stack.stat}
                        </div>
                     </div>
                </motion.div>

                {/* CARD CRM */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex-1 rounded-[3rem] p-10 flex flex-col md:flex-row items-center gap-10 border border-white/5 hover:border-rose-500/30 transition-all group"
                    style={{ backgroundColor: theme.card_dark_bg }}
                >
                     <div className="flex-1">
                        <h3 className="text-3xl font-bold mb-3 text-white tracking-tight">
                            {cards.crm_stack.title}
                        </h3>
                        <p className="text-zinc-500 font-medium leading-relaxed">
                            {cards.crm_stack.description}
                        </p>
                     </div>

                     <div className="relative">
                        <div className="w-28 h-28 rounded-3xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 border border-white/10">
                            <Icon icon={cards.crm_stack.icon} className="w-12 h-12" style={{ color: theme.accent_pink }} />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-white text-black px-4 py-1.5 rounded-lg shadow-lg text-[10px] font-black uppercase tracking-widest">
                            {cards.crm_stack.stat}
                        </div>
                     </div>
                </motion.div>

            </div>
        </div>
      </div>
      
      {/* CSS Keyframes para o Shimmer Effect */}
      <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}