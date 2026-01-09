"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Link from "next/link";

// --- CONFIGURAÇÃO (JSON) ---
const TEGPRO_DATA = {
  theme: {
    bg_section: "#FFFFFF",
    hero_bg: "#000000",
    text_light: "#FFFFFF",
    text_dark: "#1D1D1F",
    accent_gold: "#FFD700", // Ouro Puro
    gold_gradient: "linear-gradient(to right, #FFD700, #FDB931)" // Ouro Metálico
  },
  header: {
    tag: "TegPro Academy",
    title: "O código fonte da operação.",
    subtitle: "Não ensinamos teoria. Ensinamos o método exato que usamos para escalar nossos clientes e nossa própria agência."
  },
  // O Card Gigante (Cinematic)
  hero_card: {
    title: "Mastery em Escala.",
    subtitle: "Do Zero ao Exit.",
    description: "Acesse os bastidores. Processos de contratação, planilhas de precificação, scripts de vendas e a engenharia financeira por trás de um negócio de múltiplos 7 dígitos.",
    badge: "Acesso Vitalício",
    cta: "Começar Agora",
    href: "/cursos"
  },
  // Os Cards Menores (Tracks)
  tracks: [
    {
      title: "Gestão & Processos",
      desc: "Como organizar a casa para não quebrar na escala.",
      icon: "solar:bill-check-bold-duotone"
    },
    {
      title: "Formação de Times",
      desc: "Contrate A-Players e construa uma cultura forte.",
      icon: "solar:users-group-rounded-bold-duotone"
    },
    {
      title: "Mentalidade de Founder",
      desc: "Saia do operacional e assuma a cadeira de CEO.",
      icon: "solar:crown-star-bold-duotone"
    }
  ]
};

export default function TegProCinema() {
  const { theme, header, hero_card, tracks } = TEGPRO_DATA;

  return (
    <section className="py-32 px-6 font-sans relative overflow-hidden bg-white">
      
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="mb-16 max-w-3xl">
            <motion.span 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-xs font-bold uppercase tracking-[0.2em] mb-4 block"
                style={{ color: theme.accent_gold }} // Dourado no label
            >
                {header.tag}
            </motion.span>
            
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl font-semibold tracking-tight leading-tight mb-6"
                style={{ color: theme.text_dark }}
            >
                {header.title}
            </motion.h2>

            <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-medium leading-relaxed text-gray-500 max-w-2xl"
            >
                {header.subtitle}
            </motion.p>
        </div>

        {/* --- CINEMATIC HERO CARD (Wide) --- */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // Curva Apple suave
            viewport={{ once: true }}
            className="relative w-full rounded-[2.5rem] overflow-hidden bg-black text-white shadow-2xl shadow-gray-200 min-h-[500px] flex items-center group"
        >
            {/* Background Texture (Abstract Gold Dust) */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-[#FFD700]/20 to-transparent blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />

            {/* Conteúdo (Lado Esquerdo) */}
            <div className="relative z-10 p-10 md:p-16 max-w-2xl">
                {/* Badge Dourada */}
                <div 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-md border border-white/10 bg-white/5"
                >
                    <div className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse shadow-[0_0_10px_#FFD700]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#FFD700]">{hero_card.badge}</span>
                </div>

                <h3 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight leading-tight">
                    {hero_card.title} <br />
                    <span className="text-transparent bg-clip-text" style={{ backgroundImage: theme.gold_gradient }}>
                        {hero_card.subtitle}
                    </span>
                </h3>

                <p className="text-lg md:text-xl text-gray-400 font-medium leading-relaxed mb-10 max-w-lg">
                    {hero_card.description}
                </p>

                <Link 
                    href={hero_card.href}
                    className="group/btn inline-flex items-center gap-4 bg-white text-black px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#FFD700] transition-colors duration-300"
                >
                    {hero_card.cta}
                    <Icon icon="solar:play-circle-bold" className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                </Link>
            </div>

            {/* Elemento Visual (Direita - Abstract Play Button / Interface) */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-10 md:translate-x-0 w-[400px] h-[300px] md:w-[500px] md:h-[400px] opacity-10 md:opacity-100 transition-all duration-700 pointer-events-none">
                 {/* Círculos Concêntricos (Representando foco/lente) */}
                 <div className="absolute inset-0 border border-white/10 rounded-full scale-[0.8]" />
                 <div className="absolute inset-0 border border-white/5 rounded-full scale-[1.2]" />
                 <div className="absolute inset-0 border border-white/5 rounded-full scale-[1.6]" />
                 
                 {/* Ícone Gigante Central */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#FFD700]/10 rotate-12 group-hover:rotate-0 transition-transform duration-700 ease-out">
                    <Icon icon="solar:diploma-verified-bold" className="w-96 h-96" />
                 </div>
            </div>

        </motion.div>

        {/* --- TRACKS GRID (Abaixo do Hero) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {tracks.map((track, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    viewport={{ once: true }}
                    className="p-8 rounded-[2rem] bg-[#F5F5F7] hover:bg-white hover:shadow-xl hover:shadow-gray-100 transition-all duration-300 border border-transparent hover:border-gray-100 group"
                >
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                        <Icon icon={track.icon} className="w-6 h-6 text-gray-900 group-hover:text-[#FFD700] transition-colors" />
                    </div>
                    <h4 className="text-xl font-bold text-[#1D1D1F] mb-2">{track.title}</h4>
                    <p className="text-gray-500 font-medium text-sm leading-relaxed">{track.desc}</p>
                </motion.div>
            ))}
        </div>

      </div>
    </section>
  );
}