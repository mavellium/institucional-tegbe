"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, animate, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import { Icon } from '@iconify/react';

// --- 1. INTERFACES EXPORTADAS (Isso corrige o erro do page.tsx) ---
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

// --- 2. DADOS PADRÃO (Fallback) ---
const defaultNewsItems: SuccessCaseCard[] = [
  {
    id: 1,
    logo: "/equipe.png", 
    name: "Decora Fest",
    description: "Loja de Decorações • Garça/SP",
    result: "Aumento de 30% nas Vendas",
    tags: ["E-commerce", "Gestão"]
  },
  {
    id: 2,
    logo: "/equipe.png",
    name: "Tech Solutions",
    description: "Tecnologia • São Paulo/SP",
    result: "Redução de 40% no SLA",
    tags: ["Automação", "Processos"]
  },
  {
    id: 3,
    logo: "/equipe.png",
    name: "Bella Moda",
    description: "Moda Feminina • Marília/SP",
    result: "+50% Engajamento Social",
    tags: ["Social Media", "Branding"]
  },
  {
    id: 4,
    logo: "/equipe.png",
    name: "Sabor & Arte",
    description: "Gastronomia • Bauru/SP",
    result: "Aumento de 25% nas Reservas",
    tags: ["Tráfego Local", "Google"]
  }
];

// --- 3. EXPORT DEFAULT (Isso corrige o erro de importação) ---
export default function News({ data }: NewsProps) {
  
  // Merge dos dados: Se vier da API usa, senão usa o padrão
  const testimonials = (data?.items && data.items.length > 0 ? data.items : defaultNewsItems).map(item => ({
      ...item,
      logo: item.logo || "/equipe.png" // Garante fallback de imagem
  }));

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const x = useMotionValue(0);

  // Lógica Responsiva
  const getCardWidth = () => {
    if (containerWidth < 640) return containerWidth - 48; // Mobile
    if (containerWidth < 1024) return 340; // Tablet
    return 380; // Desktop
  };

  const getCardGap = () => {
    if (containerWidth < 640) return 16;
    return 32;
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
  const cardGap = getCardGap();
  const visibleCards = containerWidth < 640 ? 1 : 
                       containerWidth < 1024 ? 2 : 
                       Math.floor(containerWidth / (cardWidth + cardGap));
  const maxIndex = Math.max(0, testimonials.length - visibleCards);

  const handleNext = () => {
    const newIndex = Math.min(currentIndex + 1, maxIndex);
    setCurrentIndex(newIndex);
    animate(x, -newIndex * (cardWidth + cardGap), {
      type: "spring",
      stiffness: 200,
      damping: 25
    });
  };

  const handlePrev = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(newIndex);
    animate(x, -newIndex * (cardWidth + cardGap), {
      type: "spring",
      stiffness: 200,
      damping: 25
    });
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
    animate(x, -newIndex * (cardWidth + cardGap), {
      type: "spring",
      stiffness: 200,
      damping: 25
    });
  };

  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 md:px-8 bg-[#050505] relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row justify-between items-end mb-12 sm:mb-16 gap-6">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                <Icon icon="solar:graph-up-bold" className="text-[#FFCC00] w-4 h-4" />
                <span className="text-xs font-semibold text-gray-300 tracking-wider uppercase">
                    Track Record
                </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Resultados que <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFCC00] to-yellow-600">falam por si.</span>
            </h2>
          </div>

          {/* Botões Desktop */}
          <div className="hidden sm:flex gap-3">
            <motion.button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-[#FFCC00] hover:border-[#FFCC00] hover:text-black disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white disabled:cursor-not-allowed flex items-center justify-center text-white transition-all duration-300"
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-[#FFCC00] hover:border-[#FFCC00] hover:text-black disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white disabled:cursor-not-allowed flex items-center justify-center text-white transition-all duration-300"
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Área do Carrossel */}
        <div className="relative" ref={containerRef}>
          <div className="overflow-hidden px-2 py-4 -mx-2 -my-4">
            <motion.div
              className="flex"
              style={{ x, gap: `${cardGap}px` }}
              drag="x"
              dragConstraints={{
                left: -maxIndex * (cardWidth + cardGap),
                right: 0
              }}
              dragElastic={0.1}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
            >
              {testimonials.map((item, index) => {
                return (
                  <motion.div
                    key={item.id}
                    className="flex-shrink-0 cursor-grab active:cursor-grabbing"
                    style={{
                      width: cardWidth,
                    }}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="h-full bg-[#111111] border border-white/5 hover:border-[#FFCC00]/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-colors duration-300 group shadow-2xl relative overflow-hidden">
                      
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-full bg-gray-800 overflow-hidden border border-white/10 group-hover:border-[#FFCC00] transition-colors relative">
                                {/* Aqui usamos img normal ou Image do Next conforme sua preferência, pus motion.img para manter compatibilidade com animações se houver */}
                                <motion.img
                                src={item.logo}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h1 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#FFCC00] transition-colors">
                                    {item.name}
                                </h1>
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                                    {item.description}
                                </p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                                {item.result}
                            </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-auto">
                        {item.tags.map((tag, i) => (
                             <span key={i} className="text-[10px] sm:text-xs font-medium px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/5">
                                {tag}
                             </span>
                        ))}
                      </div>

                      <div className="absolute top-6 right-6 text-gray-800 group-hover:text-[#FFCC00]/20 transition-colors">
                        <TrendingUp className="w-8 h-8 opacity-50" />
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  animate(x, -index * (cardWidth + cardGap), {
                    type: "spring",
                    stiffness: 200,
                    damping: 25
                  });
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-[#FFCC00] shadow-[0_0_10px_#FFCC00]' 
                    : 'w-2 bg-gray-700 hover:bg-gray-500'
                }`}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

           {/* Setas Mobile */}
           <div className="flex sm:hidden justify-center gap-4 mt-6">
                <button onClick={handlePrev} disabled={currentIndex === 0} className="p-3 rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-30">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={handleNext} disabled={currentIndex >= maxIndex} className="p-3 rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-30">
                    <ChevronRight className="w-5 h-5" />
                </button>
           </div>

        </div>
      </div>
    </section>
  );
}