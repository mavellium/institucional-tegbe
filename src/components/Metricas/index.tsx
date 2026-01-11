"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

interface StatCard {
  id: string;
  type: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  theme: string;
  badge?: string;
  icon?: string;
}

interface Partner {
  id: string;
  alt: string;
  src: string;
}

interface AuthorityData {
  header: {
    label: string;
    title_sub: string;
    title_main: string;
    live_data_label: string;
  };
  stats_bento: StatCard[];
  infrastructure: {
    label: string;
    partners: Partner[];
  };
}

export default function AuthoritySectionFinal() {
  const [data, setData] = useState<AuthorityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuthorityData = async () => {
      try {
        const response = await fetch('/api-tegbe/tegbe-institucional/metricas-home');
        const result = await response.json();
        if (result.authority_section) {
          setData(result.authority_section);
        }
      } catch (error) {
        console.error("Mavellium Engine Error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadAuthorityData();
  }, []);

  if (loading || !data) return null;

  const statHero = data.stats_bento.find(s => s.type === "hero") || data.stats_bento[0];
  const statRoas = data.stats_bento.find(s => s.id.includes("stat_1768090748040_2")) || data.stats_bento[1];
  const statAlunos = data.stats_bento.find(s => s.id.includes("stat_1768091650137_3")) || data.stats_bento[2];
  const statCanais = data.stats_bento.find(s => s.id.includes("stat_1768091699091_4")) || data.stats_bento[3];

  // LOGO ESTRATÉGIA: Multiplicar por 10 para garantir que nunca haja buraco no marquee
  const marqueeLogos = Array(10).fill(data.infrastructure.partners).flat();

  return (
    <section className="py-32 bg-[#FAFAFA] relative overflow-hidden font-sans">
      
      {/* Luz Ambiente Amarela */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-white to-transparent z-0 pointer-events-none" />
      <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-yellow-100/30 blur-[120px] rounded-full mix-blend-multiply pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER (Mantido) */}
        <div className="mb-24 flex flex-col md:flex-row items-end justify-between gap-10">
            <div className="max-w-3xl">
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-6">
                    <div className="h-px w-8 bg-yellow-400"></div>
                    <span className="text-xs font-bold text-yellow-500 uppercase tracking-[0.2em]">
                        {data.header.label}
                    </span>
                </motion.div>
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tighter leading-[0.95]">
                    {data.header.title_sub} <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                        {data.header.title_main}
                    </span>
                </motion.h2>
            </div>
            
            <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-gray-900">{data.header.live_data_label}</p>
                <p className="text-[10px] text-yellow-600 font-mono mt-1 uppercase tracking-widest font-bold">Atualizado em tempo real</p>
            </div>
        </div>

        {/* --- BENTO GRID (Mantido) --- */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-32 h-auto md:h-[500px]">
            {/* ... Seus cards GMV, ROAS, ALUNOS, CANAIS (Mantidos conforme o código anterior) ... */}
            <BentoCard className="md:col-span-3 md:row-span-2 bg-gray-900 text-white overflow-hidden relative" delay={0}>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                <div className="absolute bottom-[-20%] right-[-20%] w-[400px] h-[400px] bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-[80px]" />
                <div className="relative z-10 flex flex-col justify-between h-full p-10">
                    <div className="flex justify-between items-start">
                        <Icon icon={statHero.icon || "solar:wad-of-money-bold-duotone"} className="w-12 h-12 text-yellow-400" />
                        <span className="px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-xs font-bold uppercase tracking-widest text-yellow-400">
                            {statHero.badge}
                        </span>
                    </div>
                    <div>
                        <AnimatedNumber value={statHero.value} prefix={statHero.prefix} suffix={statHero.suffix} className="text-8xl md:text-9xl font-bold tracking-tighter text-white leading-none mb-2" />
                        <p className="text-lg text-gray-400 font-medium">{statHero.label}</p>
                    </div>
                </div>
            </BentoCard>

            <BentoCard className="md:col-span-3 bg-white border border-gray-100" delay={0.1}>
                <div className="flex items-center justify-between h-full p-8">
                    <div>
                         <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">{statRoas.label}</p>
                         <AnimatedNumber value={statRoas.value} prefix={statRoas.prefix} suffix={statRoas.suffix} className="text-6xl md:text-7xl font-bold text-gray-900 tracking-tighter leading-none" />
                    </div>
                    <div className="w-24 h-16 opacity-80">
                        <svg viewBox="0 0 100 50" className="w-full h-full stroke-yellow-400 fill-none stroke-[3px]">
                            <motion.path d="M0 45 L20 35 L40 40 L60 20 L80 25 L100 5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5 }} />
                        </svg>
                    </div>
                </div>
            </BentoCard>

            <BentoCard className="md:col-span-2 bg-white border border-gray-100" delay={0.2}>
                <div className="flex flex-col justify-center h-full p-8">
                    <AnimatedNumber value={statAlunos.value} prefix={statAlunos.prefix} suffix={statAlunos.suffix} className="text-5xl font-bold text-gray-900 tracking-tighter" />
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wide mt-2">{statAlunos.label}</p>
                </div>
            </BentoCard>

            <BentoCard className="md:col-span-1 bg-yellow-50/50 border border-yellow-100" delay={0.3}>
                 <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                    <Icon icon={statCanais.icon || "solar:layers-minimalistic-bold-duotone"} className="w-10 h-10 text-yellow-500 mb-4" />
                    <AnimatedNumber value={statCanais.value} prefix={statCanais.prefix} suffix={statCanais.suffix} className="text-4xl font-bold text-gray-900 tracking-tighter" />
                    <p className="text-[10px] font-bold text-yellow-700 uppercase tracking-widest mt-2">{statCanais.label}</p>
                </div>
            </BentoCard>
        </div>

        {/* --- INFRASTRUCTURE MARQUEE (MELHORADO) --- */}
        <div className="relative mt-20">
            <div className="text-center mb-10">
                <span className="px-4 py-1.5 rounded-full bg-white border border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] shadow-sm">
                    Ecossistema de Parceiros
                </span>
            </div>

            {/* Container Marquee Premium */}
            <div className="relative w-full overflow-hidden py-10 bg-white/40 backdrop-blur-sm border-y border-gray-200/50 flex items-center">
                
                {/* Degradês de Máscara laterais para suavizar a entrada/saída */}
                <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#FAFAFA] to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#FAFAFA] to-transparent z-20 pointer-events-none" />

                <motion.div 
                    className="flex items-center gap-20 md:gap-32"
                    animate={{ x: [0, -1000] }} // Ajuste baseado no tamanho real das logos
                    transition={{ 
                        repeat: Infinity, 
                        duration: 40, // Mais lento = mais luxuoso
                        ease: "linear" 
                    }}
                >
                     {marqueeLogos.map((logo, index) => (
                        <div key={`${logo.id}-${index}`} className="relative flex-shrink-0 group">
                            <div className="h-12 md:h-16 w-auto flex items-center justify-center grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out">
                                <img 
                                    src={logo.src} 
                                    alt={logo.alt} 
                                    className="h-full w-auto object-contain max-w-[180px]" 
                                />
                            </div>
                        </div>
                     ))}
                </motion.div>
            </div>
        </div>

      </div>
    </section>
  );
}

// --- SUBCOMPONENTES (MANTIDOS ORIGINAIS) ---

function BentoCard({ children, className, delay }: { children: React.ReactNode, className?: string, delay: number }) {
    return (
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, delay: delay, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }} className={`rounded-[2rem] shadow-sm hover:shadow-xl hover:border-yellow-200/50 transition-all duration-500 ${className}`}>
            {children}
        </motion.div>
    )
}

function AnimatedNumber({ value, prefix = "", suffix = "", className }: any) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const springValue = useSpring(0, { stiffness: 45, damping: 20, mass: 1 });
    const displayValue = useTransform(springValue, (current) => {
        return Number.isInteger(value) ? Math.floor(current).toString() : current.toFixed(1);
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