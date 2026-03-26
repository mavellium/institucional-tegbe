"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

interface PainPoint {
  id: string;
  icon: string;
  stat: string;
  title?: string;
  description: string;
}

interface WarningWord {
  text: string;
  color: string;
}

interface PainSectionData {
  config: {
    primary_color: string;
    section_theme: string;
    rotation_duration_seconds: number;
  };
  pain_points: {
    left: PainPoint[];
    right: PainPoint;
  };
  section_title: {
    badge: string;
    color: string;
    title_normal: string;
    title_effect: string;
  };
  warning_words: WarningWord[];
}

export default function PainSectionFinal() {
  const [data, setData] = useState<PainSectionData | null>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/api-tegbe/tegbe-institucional/pain-points');
        const result = await response.json();
        if (result) setData(result);
      } catch (error) {
        console.error("Erro API PainPoints:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!data) return;
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % data.warning_words.length);
    }, (data.config.rotation_duration_seconds || 3) * 1000);
    return () => clearInterval(timer);
  }, [data]);

  if (loading || !data) return null;

  const ROTATION_DURATION = data.config.rotation_duration_seconds || 3;

  return (
    <section className="py-32 px-6 bg-[#FAFAFA] relative overflow-hidden">
      
      {/* Background Grid Técnico */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Dinâmico */}
        <div className="text-center mb-20">
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-yellow-200 rounded-full shadow-sm mb-6"
            >
                <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    {data.section_title.badge}
                </span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1]">
                {data.section_title.title_normal} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                    {data.section_title.title_effect}
                </span>
            </h2>
        </div>

        {/* --- GRID PRINCIPAL --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative min-h-[500px]">

          {/* ESQUERDA */}
          <div className="space-y-6 flex flex-col justify-center relative z-20 order-2 lg:order-1">
            {data.pain_points.left.map((item, i) => (
              <GlassCard key={item.id} item={item} index={i} align="left" />
            ))}
          </div>

          {/* CENTRO: O REATOR */}
          <div className="relative h-full w-full flex items-center justify-center z-10 order-1 lg:order-2 mb-16 lg:mb-0">
            
            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block overflow-visible">
                <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="#FACC15" /> 
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>
                <PathLine d="M 10,100 C 50,100 80,250 150,250" />
                <PathLine d="M 10,400 C 50,400 80,250 150,250" />
                <PathLine d="M 390,250 C 320,250 290,250 250,250" reverse={true} />
            </svg>

            {/* Círculo Giratório */}
            <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-gray-200" />
                <div className="absolute inset-4 rounded-full border border-dashed border-gray-300 opacity-50" />

                <motion.div
                    className="absolute inset-0 w-full h-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: ROTATION_DURATION, repeat: Infinity, ease: "linear" }}
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-yellow-400 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.6)] flex items-center justify-center z-20">
                        <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                </motion.div>

                {/* Núcleo Central */}
                <div className="relative z-10 w-48 h-48 bg-white rounded-full border-[6px] border-gray-50 shadow-2xl shadow-yellow-500/10 flex flex-col items-center justify-center overflow-hidden">
                    <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-2">Diagnóstico</p>
                    <div className="h-8 relative w-full flex justify-center items-center px-4 text-center">
                        <AnimatePresence mode="wait">
                            <motion.h3
                                key={wordIndex}
                                initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
                                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
                                transition={{ duration: 0.3 }}
                                className={`text-xl font-black italic tracking-tighter ${data.warning_words[wordIndex].color.replace('text-amber-500', 'text-yellow-500')}`}
                            >
                                {data.warning_words[wordIndex].text}
                            </motion.h3>
                        </AnimatePresence>
                    </div>
                    {/* Barra de Progresso */}
                    <div className="absolute bottom-10 w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                            className="h-full bg-yellow-400"
                            animate={{ width: ["0%", "100%"] }}
                            transition={{ duration: ROTATION_DURATION, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                </div>
            </div>
          </div>

          {/* DIREITA */}
          <div className="flex flex-col justify-center relative z-20 h-full order-3">
            <GlassCard item={data.pain_points.right} index={2} align="right" highlight={true} />
          </div>

        </div>
      </div>
    </section>
  );
}

// ... PathLine e GlassCard mantidos conforme original para não quebrar o layout técnico
function PathLine({ d, reverse = false }: { d: string, reverse?: boolean }) {
    return (
        <>
            <path d={d} stroke="#e5e7eb" strokeWidth="1" fill="none" />
            <motion.path 
                d={d}
                stroke="url(#lineGrad)" 
                strokeWidth="2" 
                fill="none"
                strokeDasharray="10 20"
                animate={{ strokeDashoffset: reverse ? [0, 200] : [200, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
        </>
    )
}

function GlassCard({ item, index, align, highlight = false }: { item: PainPoint, index: number, align: 'left' | 'right', highlight?: boolean }) {
    const isRight = align === 'right';
    
    return (
        <motion.div 
            initial={{ opacity: 0, x: isRight ? 40 : -40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: "circOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className={`
                group relative p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-gray-100
                shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]
                transition-all duration-300
                hover:shadow-[0_20px_40px_-15px_rgba(234,179,8,0.15)] hover:border-yellow-400/30
                ${highlight ? 'h-full flex flex-col justify-center' : ''}
                ${isRight ? 'lg:text-right lg:items-end' : ''}
                cursor-default overflow-hidden
            `}
        >
            <div className={`absolute inset-0 bg-gradient-to-br from-yellow-400/0 via-transparent to-transparent opacity-0 
                group-hover:opacity-10 group-hover:from-yellow-400/10 transition-all duration-500 pointer-events-none ${isRight ? 'bg-gradient-to-bl' : ''}`} />

            <div className={`relative flex items-center gap-4 mb-4 ${isRight ? 'lg:flex-row-reverse' : ''}`}>
                <div className="relative w-12 h-12">
                     <div className="absolute inset-0 bg-yellow-50 rounded-xl rotate-0 group-hover:rotate-6 transition-transform duration-300" />
                     <div className="absolute inset-0 bg-white border border-yellow-100 rounded-xl flex items-center justify-center text-yellow-500 shadow-sm group-hover:-translate-y-1 transition-transform duration-300">
                        <Icon icon={item.icon} className="w-6 h-6" />
                     </div>
                </div>
                <div>
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider group-hover:text-yellow-500 transition-colors">
                        Impacto Real
                    </span>
                    <span className="block text-xl font-black text-gray-900 leading-none mt-0.5">
                        {item.stat}
                    </span>
                </div>
            </div>
            
            <div className="relative z-10">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                    {item.title || "Ponto de Atenção"}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium group-hover:text-gray-600">
                    {item.description}
                </p>
            </div>
            <div className={`absolute bottom-0 h-[2px] bg-yellow-400/0 group-hover:bg-yellow-400 transition-all duration-500 ${isRight ? 'right-8 w-0 group-hover:w-16' : 'left-8 w-0 group-hover:w-16'}`} />
        </motion.div>
    )
}