"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

// --- DADOS REAIS ---
const PARTNER_LOGOS = [
  { id: "ml", src: "https://oaaddtqd6pehgldz.public.blob.vercel-storage.com/1767659970226-logo1.svg", alt: "Mercado Livre", width: 140, height: 60 },
  { id: "vtex", src: "https://upload.wikimedia.org/wikipedia/commons/a/a8/VTEX_Logo.svg", alt: "VTEX", width: 120, height: 60 },
  { id: "shopify", src: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg", alt: "Shopify", width: 130, height: 60 },
  { id: "google", src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", alt: "Google", width: 110, height: 60 },
  { id: "meta", src: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg", alt: "Meta", width: 120, height: 60 },
  { id: "tiktok", src: "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg", alt: "TikTok", width: 110, height: 60 },
  { id: "shopee", src: "https://oaaddtqd6pehgldz.public.blob.vercel-storage.com/1767659999428-logo4.svg", alt: "Shopee", width: 120, height: 60 },
];

export default function AuthoritySectionFinal() {
  // Loop infinito garantido (multiplicado para preencher telas 4k se necessário)
  const marqueeLogos = [...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS];

  return (
    <section className="py-32 bg-[#FAFAFA] relative overflow-hidden font-sans">
      
      {/* Luz Ambiente (Subtle Glow) */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-white to-transparent z-0 pointer-events-none" />
      <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-amber-50/40 blur-[120px] rounded-full mix-blend-multiply pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="mb-24 flex flex-col md:flex-row items-end justify-between gap-10">
            <div className="max-w-3xl">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 mb-6"
                >
                    <div className="h-px w-8 bg-amber-500"></div>
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-[0.2em]">
                        Performance Auditada
                    </span>
                </motion.div>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tighter leading-[0.95]"
                >
                    Não prometemos. <br/>
                    <span className="text-gray-300">Nós provamos.</span>
                </motion.h2>
            </div>
            
            <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-gray-900">Live Data 2026</p>
                <p className="text-xs text-gray-400 font-mono mt-1">Atualizado em tempo real</p>
            </div>
        </div>

        {/* --- BENTO GRID (STATS) --- */}
        {/* Layout assimétrico para quebrar a monotonia */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-24 h-auto md:h-[500px]">
            
            {/* CARD 1: HERO (GMV) - Ocupa 3 colunas e altura total */}
            <BentoCard 
                className="md:col-span-3 md:row-span-2 bg-gray-900 text-white overflow-hidden relative"
                delay={0}
            >
                {/* Background Decorativo Abstract */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                <div className="absolute bottom-[-20%] right-[-20%] w-[400px] h-[400px] bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-[80px]" />

                <div className="relative z-10 flex flex-col justify-between h-full p-10">
                    <div className="flex justify-between items-start">
                        <Icon icon="solar:wad-of-money-bold-duotone" className="w-12 h-12 text-amber-400" />
                        <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-widest text-amber-400">
                            Recorde Anual
                        </span>
                    </div>
                    <div>
                        <AnimatedNumber value={100} prefix="+" suffix="M" className="text-8xl md:text-9xl font-bold tracking-tighter text-white leading-none mb-2" />
                        <p className="text-lg text-gray-400 font-medium">GMV (Faturamento) Gerenciado</p>
                    </div>
                </div>
            </BentoCard>

            {/* CARD 2: ROAS - Ocupa 3 colunas, metade da altura */}
            <BentoCard 
                className="md:col-span-3 bg-white border border-gray-100"
                delay={0.1}
            >
                <div className="flex items-center justify-between h-full p-8">
                    <div>
                         <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Retorno Médio (ROAS)</p>
                         <AnimatedNumber value={8.4} suffix="x" className="text-6xl md:text-7xl font-bold text-gray-900 tracking-tighter leading-none" />
                    </div>
                    {/* Micro-chart SVG decorativo */}
                    <div className="w-24 h-16 opacity-50">
                        <svg viewBox="0 0 100 50" className="w-full h-full stroke-amber-500 fill-none stroke-[3px]">
                            <motion.path 
                                d="M0 45 L20 35 L40 40 L60 20 L80 25 L100 5" 
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                            />
                        </svg>
                    </div>
                </div>
            </BentoCard>

            {/* CARD 3: ALUNOS - 2 Colunas */}
            <BentoCard 
                className="md:col-span-2 bg-white border border-gray-100"
                delay={0.2}
            >
                <div className="flex flex-col justify-center h-full p-8">
                    <AnimatedNumber value={1.2} suffix="k" className="text-5xl font-bold text-gray-900 tracking-tighter" />
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wide mt-2">Alunos & Mentorados</p>
                </div>
            </BentoCard>

            {/* CARD 4: ECOSSISTEMA - 1 Coluna */}
            <BentoCard 
                className="md:col-span-1 bg-amber-50 border border-amber-100"
                delay={0.3}
            >
                 <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                    <Icon icon="solar:layers-minimalistic-bold-duotone" className="w-10 h-10 text-amber-500 mb-4" />
                    <AnimatedNumber value={15} suffix="+" className="text-4xl font-bold text-gray-900 tracking-tighter" />
                    <p className="text-[10px] font-bold text-amber-700 uppercase tracking-widest mt-2">Canais</p>
                </div>
            </BentoCard>

        </div>

        {/* --- INFRASTRUCTURE CAPSULE (MARQUEE) --- */}
        <div className="relative">
            <div className="text-center mb-8">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">
                    Infraestrutura Certificada
                </p>
            </div>

            {/* A CÁPSULA (Cointainer Premium) */}
            <div className="relative w-full max-w-6xl mx-auto h-32 rounded-[2.5rem] bg-white border border-gray-200 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] overflow-hidden flex items-center">
                
                {/* Máscaras laterais para suavizar entrada/saída */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

                {/* O Slider Infinito */}
                <motion.div 
                    className="flex items-center gap-16 md:gap-24 pl-10"
                    animate={{ x: "-50%" }}
                    transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
                >
                     {marqueeLogos.map((logo, index) => (
                        <div 
                            key={`${logo.id}-${index}`} 
                            className="relative flex-shrink-0 group cursor-default"
                        >
                            <div className="relative h-10 w-auto md:h-12 transition-all duration-500 filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110">
                                <Image 
                                    src={logo.src}
                                    alt={logo.alt}
                                    width={logo.width}
                                    height={logo.height}
                                    className="w-auto h-full object-contain"
                                />
                            </div>
                        </div>
                     ))}
                </motion.div>
                
                {/* Brilho interno na borda (Vidro) */}
                <div className="absolute inset-0 rounded-[2.5rem] border border-white/50 pointer-events-none ring-1 ring-black/5" />
            </div>
        </div>

      </div>
    </section>
  );
}

// --- SUBCOMPONENTES ---

// Wrapper do Card Bento com animação de entrada
function BentoCard({ children, className, delay }: { children: React.ReactNode, className?: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: delay, ease: [0.22, 1, 0.36, 1] }} // Curva "Apple"
            viewport={{ once: true }}
            className={`rounded-[2rem] shadow-sm hover:shadow-lg transition-all duration-500 ${className}`}
        >
            {children}
        </motion.div>
    )
}

// Número Animado (Spring Physics)
function AnimatedNumber({ value, prefix = "", suffix = "", className }: any) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const springValue = useSpring(0, { stiffness: 45, damping: 20, mass: 1 });
    const displayValue = useTransform(springValue, (current) => {
        if (Number.isInteger(value)) return Math.floor(current).toString();
        return current.toFixed(1);
    });

    useEffect(() => {
        if (isInView) springValue.set(value);
    }, [isInView, value, springValue]);

    return (
        <span ref={ref} className={className}>
            {prefix}<motion.span>{displayValue}</motion.span>{suffix}
        </span>
    );
}