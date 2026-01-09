"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Link from "next/link";

// --- CONFIGURAÇÃO (JSON) ---
const MARKETING_ARCADE_DATA = {
  theme: {
    bg_section: "#FFFFFF",
    // Cores do Card Dark (Apple Arcade Style)
    card_dark_bg: "#101010", 
    card_dark_text: "#FFFFFF",
    // Cores dos Cards Light (Apple Widget Style)
    card_light_bg: "#F5F5F7",
    card_light_text: "#1D1D1F",
    // Acento
    accent_pink: "#FF2D55", 
    accent_gradient: "linear-gradient(135deg, #FF2D55 0%, #FF375F 100%)"
  },
  header: {
    tag: "Growth Ecosystem",
    title: "O motor de vendas.",
    subtitle: "Tráfego pago é apenas o combustível. A Tegbe constrói o motor completo: Criativos que convertem + Gestão de Mídia + CRM que retém."
  },
  cards: {
    // CARD 1: O "TALL CARD" (Escuro, Esquerda)
    main: {
      title: "Growth Full-Stack.",
      subtitle: "Dominamos toda a jornada.",
      description: "Não contratamos 'gestores de tráfego'. Contratamos engenheiros de crescimento. Unificamos Google, Meta e TikTok em um dashboard único de atribuição.",
      tags: ["Meta Ads", "Google Ads", "TikTok"],
      cta: "Ver Estratégia Growth",
      href: "/marketing"
    },
    // CARD 2: CRIATIVOS (Claro, Direita Topo)
    creative: {
      title: "Creative Studio.",
      description: "Anúncios feios custam caro. Nosso time de Motion e Design cria peças validadas para CTR alto.",
      icon: "solar:palette-round-bold-duotone",
      stat: "+40% CTR"
    },
    // CARD 3: CRM (Claro, Direita Base)
    crm: {
      title: "CRM & LTV.",
      description: "Transformamos o 'cliente de uma vez' em cliente recorrente com automações de e-mail e WhatsApp.",
      icon: "solar:users-group-two-rounded-bold-duotone",
      stat: "Retenção Ativa"
    }
  }
};

export default function MarketingAppleArcade() {
  const { theme, header, cards } = MARKETING_ARCADE_DATA;

  return (
    <section className="py-32 px-6 font-sans relative overflow-hidden bg-white">
      
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="mb-16 max-w-2xl">
            <motion.span 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-xs font-bold uppercase tracking-[0.2em] mb-4 block"
                style={{ color: theme.accent_pink }}
            >
                {header.tag}
            </motion.span>
            
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl font-semibold tracking-tight leading-tight mb-6"
                style={{ color: theme.card_light_text }}
            >
                {header.title}
            </motion.h2>

            <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-medium leading-relaxed text-gray-500 max-w-xl"
            >
                {header.subtitle}
            </motion.p>
        </div>

        {/* --- ASSYMETRICAL LAYOUT (TOWER + STACK) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">
            
            {/* --- COLUNA ESQUERDA: TOWER CARD (DARK MODE) --- */}
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "circOut" }}
                viewport={{ once: true }}
                className="lg:col-span-5 relative rounded-[2.5rem] overflow-hidden p-10 flex flex-col justify-between shadow-2xl shadow-gray-200 group"
                style={{ backgroundColor: theme.card_dark_bg }}
            >
                {/* Background Gradient Animated */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-[#FF2D55]/40 to-purple-600/20 blur-[100px] rounded-full opacity-60 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none" />
                
                <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8" style={{ background: theme.accent_gradient }}>
                        <Icon icon="solar:graph-new-up-bold" className="w-7 h-7 text-white" />
                    </div>
                    
                    <h3 className="text-4xl font-bold text-white mb-2 tracking-tight">
                        {cards.main.title}
                    </h3>
                    <p className="text-xl font-medium mb-6 text-gray-400">
                        {cards.main.subtitle}
                    </p>
                    <p className="text-base leading-relaxed text-gray-300 mb-8">
                        {cards.main.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {cards.main.tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1 rounded-full border border-white/10 text-xs font-bold text-gray-300 bg-white/5">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 mt-10">
                    <Link 
                        href={cards.main.href}
                        className="w-full flex items-center justify-between px-6 py-4 rounded-full bg-white text-black font-bold text-sm hover:scale-[1.02] transition-transform duration-300"
                    >
                        <span>{cards.main.cta}</span>
                        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                            <Icon icon="solar:arrow-right-up-linear" className="w-4 h-4" />
                        </div>
                    </Link>
                </div>
            </motion.div>

            {/* --- COLUNA DIREITA: STACKED CARDS (LIGHT MODE) --- */}
            <div className="lg:col-span-7 flex flex-col gap-6 h-full">
                
                {/* CARD SUPERIOR: CREATIVE */}
                <motion.div 
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex-1 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-start md:items-center gap-8 relative overflow-hidden group hover:shadow-lg transition-shadow duration-300"
                    style={{ backgroundColor: theme.card_light_bg }}
                >
                     <div className="flex-1 relative z-10">
                        <h3 className="text-2xl font-bold mb-3 text-[#1D1D1F]">
                            {cards.creative.title}
                        </h3>
                        <p className="text-base text-[#86868B] font-medium leading-relaxed max-w-sm">
                            {cards.creative.description}
                        </p>
                     </div>
                     
                     {/* Visual Element (Icon/Stat) */}
                     <div className="relative flex-shrink-0">
                        <div className="w-24 h-24 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <Icon icon={cards.creative.icon} className="w-10 h-10" style={{ color: theme.accent_pink }} />
                        </div>
                        <div className="absolute -bottom-3 -right-3 bg-white px-4 py-1.5 rounded-full shadow-md text-xs font-bold text-[#1D1D1F]">
                            {cards.creative.stat}
                        </div>
                     </div>
                </motion.div>

                {/* CARD INFERIOR: CRM */}
                <motion.div 
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex-1 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-start md:items-center gap-8 relative overflow-hidden group hover:shadow-lg transition-shadow duration-300"
                    style={{ backgroundColor: theme.card_light_bg }}
                >
                     <div className="flex-1 relative z-10">
                        <h3 className="text-2xl font-bold mb-3 text-[#1D1D1F]">
                            {cards.crm.title}
                        </h3>
                        <p className="text-base text-[#86868B] font-medium leading-relaxed max-w-sm">
                            {cards.crm.description}
                        </p>
                     </div>

                     {/* Visual Element (Icon/Stat) */}
                     <div className="relative flex-shrink-0">
                        <div className="w-24 h-24 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <Icon icon={cards.crm.icon} className="w-10 h-10" style={{ color: theme.accent_pink }} />
                        </div>
                        <div className="absolute -bottom-3 -right-3 bg-white px-4 py-1.5 rounded-full shadow-md text-xs font-bold text-[#1D1D1F]">
                            {cards.crm.stat}
                        </div>
                     </div>
                </motion.div>

            </div>

        </div>

      </div>
    </section>
  );
}