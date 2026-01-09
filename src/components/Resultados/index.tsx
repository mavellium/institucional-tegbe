"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, animate, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Icon } from '@iconify/react';

// --- 1. INTERFACES ---
export interface SuccessCaseCard {
  id: string | number;
  logo: string;
  name: string;
  description: string;
  result: string;
  tags: string[];
}

export interface NewsInputData {
  items?: SuccessCaseCard[];
}

interface NewsProps {
  data?: NewsInputData;
}

// --- 2. DADOS (Adicionei o 4º item e refinei os textos) ---
const defaultNewsItems: SuccessCaseCard[] = [
  {
    id: 1,
    logo: "/equipe.png", 
    name: "Decora Fest",
    description: "E-commerce • Nacional",
    result: "Faturamento +215%",
    tags: ["Escala de Ads", "CRO"]
  },
  {
    id: 2,
    logo: "/equipe.png",
    name: "Tech Solutions",
    description: "SaaS B2B • São Paulo",
    result: "CAC reduzido em 40%",
    tags: ["Inbound", "Automação"]
  },
  {
    id: 3,
    logo: "/equipe.png",
    name: "Bella Moda",
    description: "Varejo Fashion • Marília",
    result: "ROAS 12x no Meta Ads",
    tags: ["Branding", "Tráfego"]
  },
  {
    id: 4,
    logo: "/equipe.png",
    name: "Sabor & Arte",
    description: "Gastronomia • Bauru",
    result: "+25% em Reservas/Mês",
    tags: ["Local SEO", "Google Ads"]
  }
];

const CARD_WIDTH_DESKTOP = 400;
const CARD_WIDTH_TABLET = 340;
const CARD_GAP = 24;

export default function NewsCarousel({ data }: NewsProps) {
  
  const testimonials = (data?.items && data.items.length > 0 ? data.items : defaultNewsItems).map(item => ({
      ...item,
      logo: item.logo || "/equipe.png"
  }));

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const x = useMotionValue(0);

  // Lógica Responsiva Robusta
  const getCardWidth = () => {
    if (containerWidth < 640) return containerWidth - 32; // Mobile (Full width - padding)
    if (containerWidth < 1024) return CARD_WIDTH_TABLET;
    return CARD_WIDTH_DESKTOP;
  };

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const cardWidth = getCardWidth();
  const visibleCards = containerWidth < 640 ? 1 : 
                       containerWidth < 1024 ? 2 : 
                       Math.floor(containerWidth / (cardWidth + CARD_GAP));
                       
  const maxIndex = Math.max(0, testimonials.length - visibleCards);

  // Função de Animação Suave
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
    setIsDragging(false);
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
    <section className="py-24 px-4 sm:px-6 md:px-8 bg-[#020202] relative overflow-hidden font-sans">
      
      {/* Background Noise & Gold Glow */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-8 border-b border-white/10 pb-8">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-[#FFC400]/20 bg-[#FFC400]/5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFC400] animate-pulse" />
                <span className="text-[10px] font-bold text-[#FFC400] tracking-widest uppercase">
                    Track Record Validado
                </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              Resultados que <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC400] to-yellow-700">falam por si.</span>
            </h2>
          </div>

          {/* Botões de Navegação (Desktop) */}
          <div className="hidden sm:flex gap-3">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="group w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-[#FFC400] hover:border-[#FFC400] disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5 text-white group-hover:text-black transition-colors" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="group w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-[#FFC400] hover:border-[#FFC400] disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5 text-white group-hover:text-black transition-colors" />
            </button>
          </div>
        </div>

        {/* ÁREA DO CARROSSEL */}
        <div className="relative" ref={containerRef}>
          <div className="overflow-hidden py-8 -my-8 px-2 -mx-2"> {/* Margem negativa para sombras não cortarem */}
            <motion.div
              className="flex"
              style={{ x, gap: `${CARD_GAP}px` }}
              drag="x"
              dragConstraints={{
                left: -maxIndex * (cardWidth + CARD_GAP),
                right: 0
              }}
              dragElastic={0.1}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
            >
              {testimonials.map((item) => {
                return (
                  <motion.div
                    key={item.id}
                    className="flex-shrink-0 cursor-grab active:cursor-grabbing relative group"
                    style={{ width: cardWidth }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="h-full bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 group-hover:border-[#FFC400]/50 group-hover:shadow-[0_0_40px_rgba(255,196,0,0.1)]">
                      
                      {/* Gradient Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      {/* Topo do Card */}
                      <div>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gray-800 overflow-hidden border border-white/10 group-hover:border-[#FFC400] transition-colors relative shadow-lg">
                                    <img
                                      src={item.logo}
                                      alt={item.name}
                                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white group-hover:text-[#FFC400] transition-colors">
                                        {item.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Ícone Decorativo */}
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-600 group-hover:bg-[#FFC400] group-hover:text-black transition-all duration-300">
                                <ArrowUpRight className="w-4 h-4" />
                            </div>
                        </div>

                        <div className="mb-8 relative z-10">
                            <p className="text-3xl font-bold text-white leading-tight tracking-tight">
                                {item.result}
                            </p>
                        </div>
                      </div>

                      {/* Footer do Card */}
                      <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                        {item.tags.map((tag, i) => (
                             <span key={i} className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/5 uppercase tracking-wide">
                                {tag}
                             </span>
                        ))}
                      </div>

                      {/* Watermark Icon */}
                      <div className="absolute -bottom-4 -right-4 text-[#FFC400] opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none">
                        <TrendingUp className="w-32 h-32" />
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Paginação (Dots) */}
          <div className="flex justify-center gap-3 mt-12">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  snapToPosition(index);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-10 bg-[#FFC400] shadow-[0_0_15px_rgba(255,196,0,0.5)]' 
                    : 'w-2 bg-gray-800 hover:bg-gray-600'
                }`}
              />
            ))}
          </div>

           {/* Setas Mobile (Abaixo) */}
           <div className="flex sm:hidden justify-center gap-4 mt-8">
                <button onClick={handlePrev} disabled={currentIndex === 0} className="p-4 rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-30 active:bg-[#FFC400] active:text-black transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={handleNext} disabled={currentIndex >= maxIndex} className="p-4 rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-30 active:bg-[#FFC400] active:text-black transition-colors">
                    <ChevronRight className="w-5 h-5" />
                </button>
           </div>

        </div>
      </div>
    </section>
  );
}