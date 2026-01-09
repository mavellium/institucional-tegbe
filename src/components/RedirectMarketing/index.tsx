"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Link from "next/link";

// --- CONFIGURAÇÃO DARK MARKETING ---
const MARKETING_ARCADE_DATA = {
  theme: {
    bg_section: "#050505", 
    card_main_bg: "#0A0A0B", 
    card_sub_bg: "#121214",
    text_primary: "#FFFFFF",
    text_secondary: "#A1A1AA",
    accent_rose: "#FF2D55", 
    accent_gradient: "linear-gradient(135deg, #FF2D55 0%, #BA002E 100%)",
  },
  header: {
    tag: "Growth Ecosystem",
    title: "O motor de vendas.",
    subtitle: "Tráfego pago é apenas o combustível. Construímos o motor completo: Criativos que convertem + Gestão de Mídia + CRM que retém."
  },
  cards: {
    main: {
      title: "Growth Full-Stack.",
      subtitle: "Performance sem limites.",
      description: "Unificamos Google, Meta e TikTok em um dashboard único de atribuição. Decisões baseadas em dados reais, não em intuição.",
      tags: ["Meta Ads", "Google Ads", "TikTok", "Analytics"],
      cta: "Ativar Escala",
      href: "/marketing"
    },
    creative: {
      title: "Creative Studio.",
      description: "Anúncios validados para CTR alto. Motion e Design que param o scroll.",
      icon: "solar:palette-round-bold-duotone",
      stat: "+40% CTR"
    },
    crm: {
      title: "CRM & LTV.",
      description: "Automações de e-mail e WhatsApp para máxima retenção.",
      icon: "solar:users-group-two-rounded-bold-duotone",
      stat: "Retenção Ativa"
    }
  }
};

export default function MarketingDarkArcade() {
  const { theme, header, cards } = MARKETING_ARCADE_DATA;

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
                <div className="w-10 h-[1px]" style={{ backgroundColor: theme.accent_rose }} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: theme.accent_rose }}>
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
                style={{ backgroundColor: theme.card_main_bg }}
            >
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-rose-600/10 via-transparent to-transparent" />
                
                <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-10 shadow-lg shadow-rose-900/40" style={{ background: theme.accent_gradient }}>
                        <Icon icon="solar:graph-new-up-bold" className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-4xl font-bold text-white mb-4 tracking-tight">
                        {cards.main.title}
                    </h3>
                    <p className="text-lg font-bold mb-6 text-rose-500 uppercase tracking-widest text-[11px]">
                        {cards.main.subtitle}
                    </p>
                    <p className="text-zinc-400 leading-relaxed mb-10 font-medium">
                        {cards.main.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {cards.main.tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1 rounded-lg border border-white/10 text-[10px] font-bold text-zinc-500 bg-white/5 uppercase tracking-tighter">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* CTA REFINADO: GHOST GLASS DESIGN */}
                <Link 
    href={cards.main.href}
    className="mt-12 group/btn relative flex items-center justify-between px-10 py-6 rounded-2xl overflow-hidden transition-all duration-500 bg-[#0F0F10] border border-white/[0.08] hover:border-rose-500/50 hover:shadow-[0_0_30px_rgba(255,45,85,0.15)]"
>
    {/* Preenchimento Sólido de Impacto */}
    <div className="absolute inset-0 bg-rose-600 translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
    
    <div className="relative z-10 flex items-center justify-between w-full">
        {/* TEXTO: Peso Extra Bold para máxima autoridade e intenção de clique */}
        <span className="text-[13px] font-extrabold uppercase tracking-[0.15em] text-white group-hover/btn:text-black transition-colors duration-500">
            {cards.main.cta}
        </span>
        
        {/* ELEMENTO DE AÇÃO */}
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 group-hover/btn:bg-black/20 transition-all duration-500">
             <Icon 
                icon="solar:round-alt-arrow-right-bold" 
                className="w-6 h-6 text-rose-500 group-hover/btn:text-black transition-all duration-500 group-hover/btn:translate-x-1" 
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
                    style={{ backgroundColor: theme.card_sub_bg }}
                >
                     <div className="flex-1">
                        <h3 className="text-3xl font-bold mb-3 text-white tracking-tight">
                            {cards.creative.title}
                        </h3>
                        <p className="text-zinc-500 font-medium leading-relaxed">
                            {cards.creative.description}
                        </p>
                     </div>
                     
                     <div className="relative">
                        <div className="w-28 h-28 rounded-3xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-white/10">
                            <Icon icon={cards.creative.icon} className="w-12 h-12" style={{ color: theme.accent_rose }} />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-rose-600 text-white px-4 py-1.5 rounded-lg shadow-lg text-[10px] font-black uppercase tracking-widest">
                            {cards.creative.stat}
                        </div>
                     </div>
                </motion.div>

                {/* CARD CRM */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex-1 rounded-[3rem] p-10 flex flex-col md:flex-row items-center gap-10 border border-white/5 hover:border-rose-500/30 transition-all group"
                    style={{ backgroundColor: theme.card_sub_bg }}
                >
                     <div className="flex-1">
                        <h3 className="text-3xl font-bold mb-3 text-white tracking-tight">
                            {cards.crm.title}
                        </h3>
                        <p className="text-zinc-500 font-medium leading-relaxed">
                            {cards.crm.description}
                        </p>
                     </div>

                     <div className="relative">
                        <div className="w-28 h-28 rounded-3xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 border border-white/10">
                            <Icon icon={cards.crm.icon} className="w-12 h-12" style={{ color: theme.accent_rose }} />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-white text-black px-4 py-1.5 rounded-lg shadow-lg text-[10px] font-black uppercase tracking-widest">
                            {cards.crm.stat}
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