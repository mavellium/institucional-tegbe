"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Link from "next/link";

const TEGPRO_DATA = {
  theme: {
    bg_section: "#050505",
    accent_gold: "#C5A059", // Dourado mais seco e sofisticado (Champagne)
    gold_gradient: "linear-gradient(135deg, #C5A059 0%, #8E7037 100%)",
  },
  header: {
    tag: "Higher Management",
    title: "TegPro Academy",
    subtitle: "A ciência por trás da gestão de e-commerces que escalam com previsibilidade e lucro real."
  },
  hero_card: {
    title: "Gestão de E-commerce.",
    subtitle: "O Método TegPro.",
    description: "Abra a caixa preta da operação. Domine CMV, squads e engenharia logística com quem dita o ritmo do mercado.",
    badge: "Formação de Elite",
    cta: "Conhecer Metodologia",
    href: "/cursos"
  },
  tracks: [
    { title: "Operação Implacável", desc: "Do setup à medalha Platinum.", icon: "solar:settings-minimalistic-linear" },
    { title: "Finanças & Margem", desc: "O código do lucro real.", icon: "solar:wad-of-money-linear" },
    { title: "Liderança de Squads", desc: "Gestão de times A-Players.", icon: "solar:users-group-two-rounded-linear" }
  ]
};

export default function TegProRefined() {
  const { theme, header, hero_card, tracks } = TEGPRO_DATA;

  return (
    <section className="py-40 px-6 bg-[#050505] relative overflow-hidden font-sans flex items-center">
      
      {/* Background: Glow extremamente sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#C5A059]/[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* TOP: Header Refinado (Menor e mais elegante) */}
        <div className="mb-24">
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-8"
            >
                <div className="w-8 h-[1px] bg-[#C5A059]/40" />
                <span className="text-[10px] font-medium uppercase tracking-[0.5em] text-[#C5A059]/80">{header.tag}</span>
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-8">
                {header.title}
            </h2>
            <p className="text-lg text-zinc-500 font-medium max-w-xl leading-relaxed">
                {header.subtitle}
            </p>
        </div>

        {/* CENTER: O Monolito (Design de Superfície) */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-[3rem] bg-[#0A0A0B] border border-white/[0.04] p-8 md:p-16 overflow-hidden"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                
                {/* Lado Esquerdo: Conteúdo */}
                <div className="lg:col-span-7 relative z-10">
                    <div className="flex items-center gap-2 mb-8 opacity-60">
                        <Icon icon="solar:crown-star-linear" className="text-[#C5A059] w-4 h-4" />
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{hero_card.badge}</span>
                    </div>
                    
                    <h3 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
                        {hero_card.title} <br/>
                        <span className="text-[#C5A059] font-medium italic">
                            {hero_card.subtitle}
                        </span>
                    </h3>
                    
                    <p className="text-base text-zinc-500 mb-12 max-w-md leading-relaxed">
                        {hero_card.description}
                    </p>

                    <Link 
                        href={hero_card.href}
                        className="group/btn relative inline-flex items-center gap-6 px-10 py-5 rounded-2xl bg-transparent border border-white/10 overflow-hidden transition-all duration-500 hover:border-[#C5A059]/50"
                    >
                        {/* Fill Effect mais suave */}
                        <div className="absolute inset-0 bg-[#C5A059] translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                        
                        <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.2em] text-white group-hover/btn:text-black transition-colors">
                            {hero_card.cta}
                        </span>
                        <Icon icon="solar:arrow-right-linear" className="relative z-10 w-5 h-5 text-[#C5A059] group-hover/btn:text-black transition-all group-hover/btn:translate-x-1" />
                    </Link>
                </div>

                {/* Lado Direito: Tracks (Listagem Técnica) */}
                <div className="lg:col-span-5 space-y-4 relative z-10">
                    {tracks.map((track, i) => (
                        <div 
                            key={i}
                            className="p-6 rounded-2xl bg-white/[0.01] border border-white/[0.03] flex items-center gap-5 hover:bg-white/[0.03] hover:border-white/10 transition-all duration-500 group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-black border border-white/[0.05] flex items-center justify-center flex-shrink-0 group-hover:border-[#C5A059]/30 transition-colors">
                                <Icon icon={track.icon} className="w-5 h-5 text-zinc-500 group-hover:text-[#C5A059] transition-colors" />
                            </div>
                            <div>
                                <h4 className="text-white text-sm font-bold tracking-tight">{track.title}</h4>
                                <p className="text-zinc-600 text-xs mt-0.5">{track.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Grain Texture Sutil */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
        </motion.div>

      </div>
    </section>
  );
}