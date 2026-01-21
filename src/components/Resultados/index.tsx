"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, animate, PanInfo, useInView, useSpring, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Icon } from '@iconify/react';

// --- INTERFACES DINÂMICAS ---
export interface SuccessCase {
  id: string | number;
  logo: string;
  name: string;
  description: string;
  result: string;
  tags: string[];
  icon_decoration?: string;
}

interface ResultsData {
  header: {
    tag: string;
    title_main: string;
    title_highlight: string;
    live_status: string;
  };
  cases: SuccessCase[];
}

const CARD_GAP = 24;

export default function NewsCarousel() {
  const [data, setData] = useState<ResultsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const x = useMotionValue(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [totalSlides, setTotalSlides] = useState(0);

  // --- FETCH DINÂMICO ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api-tegbe/tegbe-institucional/resultado');
        const result = await response.json();
        if (result) {
          setData(result);
          setTotalSlides(result.cases?.length || 0);
        }
      } catch (error) {
        console.error("Mavellium Engine - Erro ao carregar Resultados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- CONTROLE DE LARGURA ---
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [loading]);

  if (loading || !data) return null;

  const cardWidth = containerWidth < 640 ? containerWidth : 400;
  const visibleCards = containerWidth < 1024 ? (containerWidth < 640 ? 1 : 2) : 3;
  const maxIndex = Math.max(0, data.cases.length - visibleCards);

  const snapToPosition = (index: number) => {
    animate(x, -index * (cardWidth + CARD_GAP), {
      type: "spring",
      stiffness: 150,
      damping: 20,
      mass: 0.8
    });
  };

  const handleNext = () => {
    const newIndex = Math.min(currentIndex + 1, maxIndex);
    setCurrentIndex(newIndex);
    snapToPosition(newIndex);
  };

  const handlePrev = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(newIndex);
    snapToPosition(newIndex);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    let newIndex = currentIndex;
    if (offset < -threshold || velocity < -500) {
      newIndex = Math.min(currentIndex + 1, maxIndex);
    } else if (offset > threshold || velocity > 500) {
      newIndex = Math.max(currentIndex - 1, 0);
    }
    setCurrentIndex(newIndex);
    snapToPosition(newIndex);
  };

  return (
    <section 
      className="py-32 bg-[#020202] relative overflow-hidden font-sans"
      aria-label="Carrossel de cases de sucesso"
      ref={carouselRef}
    >
      
      {/* Background Noise & Yellow Glow */}
      <div 
        className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" 
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400/5 rounded-full blur-[150px] pointer-events-none" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER: ALINHADO COM O GRID DA PÁGINA */}
        <div className="flex flex-col sm:flex-row justify-between items-start mb-20 gap-8 border-b border-white/5 pb-12">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-yellow-400/20 bg-yellow-400/5 shadow-[0_0_15px_rgba(250,204,21,0.1)]">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" aria-hidden="true" />
                <span className="text-[10px] font-black text-yellow-500 tracking-[0.2em] uppercase">
                    {data.header.tag}
                </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[0.95]">
              {data.header.title_main} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 italic">
                {data.header.title_highlight}
              </span>
            </h2>
          </div>

          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-white">{data.header.live_status}</p>
            <p className="text-[10px] text-yellow-500 font-mono mt-1 uppercase tracking-widest font-black animate-pulse opacity-70">Engine Connected</p>
          </div>
        </div>

        {/* ÁREA DO CARROSSEL */}
        <div className="relative" ref={containerRef}>
          {/* Announcer para leitores de tela - indica slide atual */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {`Slide ${currentIndex + 1} de ${totalSlides}: ${data.cases[currentIndex]?.name || 'Case de sucesso'}`}
          </div>
          
          <div className="overflow-visible">
            <motion.div
              className="flex"
              style={{ x, gap: `${CARD_GAP}px` }}
              drag="x"
              dragConstraints={{
                left: -maxIndex * (cardWidth + CARD_GAP),
                right: 0
              }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              aria-label="Lista de cases de sucesso"
              role="list"
            >
              {data.cases.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="flex-shrink-0 cursor-grab active:cursor-grabbing relative group"
                  style={{ width: cardWidth }}
                  whileHover={{ y: -5 }}
                  role="listitem"
                  aria-label={`Case de sucesso: ${item.name} - ${item.description}`}
                  aria-describedby={`card-${item.id}`}
                  tabIndex={0}
                >
                  <div 
                    id={`card-${item.id}`}
                    className="h-full bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden transition-all duration-500 group-hover:border-yellow-400/40 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)]"
                  >
                    
                    {/* Interior Glow Hover */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-yellow-400/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" 
                      aria-hidden="true"
                    />

                    <div>
                      <div className="flex items-center justify-between mb-10">
                          <div className="flex items-center gap-5">
                              <div className="w-14 h-14 rounded-2xl bg-zinc-900 overflow-hidden border border-white/5 relative group-hover:border-yellow-400/50 transition-colors shadow-2xl">
                                  <img
                                    src={item.logo || "/equipe.png"}
                                    alt={`Logo da empresa ${item.name}`}
                                    className="w-full h-full object-cover grayscale brightness-125 group-hover:grayscale-0 transition-all duration-700"
                                  />
                              </div>
                              <div>
                                  <h3 className="text-xl font-bold text-white tracking-tight">
                                      {item.name}
                                  </h3>
                                  <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mt-1">
                                      {item.description}
                                  </p>
                              </div>
                          </div>
                          <div 
                            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-600 group-hover:bg-yellow-400 group-hover:text-black transition-all duration-500"
                            aria-hidden="true"
                          >
                              <ArrowUpRight className="w-5 h-5" />
                          </div>
                      </div>

                      <div className="mb-10 relative z-10">
                          <p className="text-4xl font-bold text-white tracking-tighter leading-none group-hover:text-yellow-400 transition-colors">
                              {item.result}
                          </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2.5 mt-auto relative z-10">
                      {item.tags.map((tag, i) => (
                           <span 
                             key={i} 
                             className="text-[10px] font-black px-4 py-2 rounded-xl bg-white/[0.03] text-zinc-400 border border-white/5 uppercase tracking-widest group-hover:border-yellow-400/20 group-hover:text-zinc-300 transition-all"
                           >
                              {tag}
                           </span>
                      ))}
                    </div>

                    {/* Background Icon Watermark */}
                    <div 
                      className="absolute -bottom-6 -right-6 text-yellow-400 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700 pointer-events-none scale-150 rotate-[-10deg]"
                      aria-hidden="true"
                    >
                      <Icon icon={item.icon_decoration || "solar:graph-up-bold"} className="w-48 h-48" />
                    </div>

                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* CONTROLES TÉCNICOS (FOOTER) */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-16 gap-8">
            {/* Paginação */}
            <div 
              className="flex gap-3"
              role="tablist"
              aria-label="Navegação de slides"
            >
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                    key={index}
                    onClick={() => {
                    setCurrentIndex(index);
                    snapToPosition(index);
                    }}
                    className={`h-1 rounded-full transition-all duration-500 ${
                    index === currentIndex 
                        ? 'w-12 bg-yellow-400' 
                        : 'w-3 bg-zinc-800'
                    }`}
                    aria-label={`Ir para o slide ${index + 1}`}
                    aria-selected={index === currentIndex}
                    role="tab"
                    tabIndex={index === currentIndex ? 0 : -1}
                />
                ))}
            </div>

            {/* Setas de Navegação */}
            <div className="flex gap-4">
                <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="w-14 h-14 rounded-full border border-white/5 bg-white/[0.02] hover:bg-yellow-400 disabled:opacity-20 flex items-center justify-center transition-all duration-500 group"
                aria-label="Slide anterior"
                aria-disabled={currentIndex === 0}
                title="Voltar para slide anterior"
                >
                <ChevronLeft className="w-6 h-6 text-white group-hover:text-black" aria-hidden="true" />
                <span className="sr-only">Slide anterior</span>
                </button>
                <button
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className="w-14 h-14 rounded-full border border-white/5 bg-white/[0.02] hover:bg-yellow-400 disabled:opacity-20 flex items-center justify-center transition-all duration-500 group"
                aria-label="Próximo slide"
                aria-disabled={currentIndex >= maxIndex}
                title="Avançar para próximo slide"
                >
                <ChevronRight className="w-6 h-6 text-white group-hover:text-black" aria-hidden="true" />
                <span className="sr-only">Próximo slide</span>
                </button>
            </div>
          </div>

          {/* Instrução para teclado */}
          <div className="sr-only" id="carousel-instructions">
            Use as setas do teclado para navegar ou arraste horizontalmente.
          </div>

          {/* Anúncio de slide atual para leitores de tela (visível apenas para leitores) */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {currentIndex + 1} de {totalSlides}
          </div>

        </div>
      </div>
    </section>
  );
}

// Subcomponentes integrados no código principal para evitar imports externos desnecessários
function AnimatedNumber({ value, prefix = "", suffix = "", className }: any) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
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

function BentoCard({ children, className, delay }: { children: React.ReactNode, className?: string, delay: number }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: delay }} 
            viewport={{ once: true }} 
            className={className}
        >
            {children}
        </motion.div>
    )
}