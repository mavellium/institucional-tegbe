"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Icon } from '@iconify/react';

// Dados simulados com métricas de Marketing/Escala
const testimonials = [
  {
    id: 1,
    logo: "/equipe.png", 
    name: "Construtora Viver",
    description: "Imobiliário • SP",
    result: "R$ 4.2Mi em VGV",
    metric: "Em 3 meses de campanha",
    tags: ["Google Ads", "CRM Kommo"]
  },
  {
    id: 2,
    logo: "/equipe.png",
    name: "Dr. Ricardo Silva",
    description: "Clínica de Estética • RJ",
    result: "Agenda Lotada",
    metric: "Custo por Lead: R$ 4,50",
    tags: ["Meta Ads", "Automação"]
  },
  {
    id: 3,
    logo: "/equipe.png",
    name: "Fintech Advance",
    description: "B2B • Nacional",
    result: "300% de ROI",
    metric: "Otimização de Pipeline",
    tags: ["Inbound", "Hubspot"]
  },
  {
    id: 4,
    logo: "/equipe.png",
    name: "Educacional Alpha",
    description: "Infoproduto • Online",
    result: "ROAS de 14x",
    metric: "Lançamento Perpétuo",
    tags: ["Tráfego", "Copywriting"]
  },
  {
    id: 5,
    logo: "/equipe.png",
    name: "Solar Energy",
    description: "Energia Solar • MG",
    result: "-40% no CAC",
    metric: "Qualificação via IA",
    tags: ["Leads", "Vendas"]
  },
  {
    id: 6,
    logo: "/equipe.png",
    name: "Logística Express",
    description: "Serviços • Sul",
    result: "Recorde de Receita",
    metric: "Previsibilidade total",
    tags: ["BI", "Dashboards"]
  }
];

export default function CompanysMarketing() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const x = useMotionValue(0);

  // Lógica Responsiva
  const getCardWidth = () => {
    if (containerWidth < 640) return containerWidth - 48; 
    if (containerWidth < 1024) return 340; 
    return 380; 
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
      type: "spring", stiffness: 200, damping: 25
    });
  };

  const handlePrev = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(newIndex);
    animate(x, -newIndex * (cardWidth + cardGap), {
      type: "spring", stiffness: 200, damping: 25
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
      type: "spring", stiffness: 200, damping: 25
    });
  };

  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 md:px-8 bg-[#020202] relative overflow-hidden border-t border-white/5">
      
      {/* Texture Noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      {/* Luzes de Fundo (Red Theme) */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#E31B63]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row justify-between items-end mb-12 sm:mb-16 gap-6">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-rose-500/20 bg-rose-900/10 backdrop-blur-sm">
                <Icon icon="mdi:chart-box-outline" className="text-[#E31B63] w-4 h-4" />
                <span className="text-xs font-bold text-rose-200/80 tracking-wider uppercase">
                    Track Record
                </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Empresas que <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0F43] to-[#E31B63]">escalaram conosco.</span>
            </h2>
          </div>

          {/* Navegação Desktop */}
          <div className="hidden sm:flex gap-3">
            <motion.button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-[#E31B63] hover:border-[#E31B63] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-all duration-300"
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-[#E31B63] hover:border-[#E31B63] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-all duration-300"
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Carrossel */}
        <div className="relative" ref={containerRef}>
          <div className="overflow-hidden px-2 py-4 -mx-2 -my-4">
            <motion.div
              className="flex"
              style={{ x, gap: `${cardGap}px` }}
              drag="x"
              dragConstraints={{ left: -maxIndex * (cardWidth + cardGap), right: 0 }}
              dragElastic={0.1}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
            >
              {testimonials.map((item, index) => {
                const range = [
                    -(index + 1) * (cardWidth + cardGap),
                    -index * (cardWidth + cardGap),
                    -(index - 1) * (cardWidth + cardGap)
                ];
                
                const opacity = useTransform(x, range, [0.4, 1, 0.4]);
                const scale = useTransform(x, range, [0.95, 1, 0.95]);

                return (
                  <motion.div
                    key={item.id}
                    className="flex-shrink-0 cursor-grab active:cursor-grabbing"
                    style={{ width: cardWidth }} // Removi opacity/scale no mobile para usabilidade
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* CARD */}
                    <div className="h-full bg-[#0A0A0A] border border-white/5 hover:border-[#E31B63]/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-colors duration-300 group shadow-lg hover:shadow-[0_0_30px_rgba(227,27,99,0.15)] relative overflow-hidden">
                      
                      {/* Glow interno */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#E31B63]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      <div>
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-[#E31B63] transition-colors">
                                <motion.img
                                src={item.logo}
                                alt={item.name}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100"
                                />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-white group-hover:text-[#E31B63] transition-colors">
                                    {item.name}
                                </h1>
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                                    {item.description}
                                </p>
                            </div>
                        </div>

                        {/* Resultado */}
                        <div className="mb-4">
                            <p className="text-3xl font-bold text-white leading-tight tracking-tight">
                                {item.result}
                            </p>
                            <p className="text-sm text-gray-400 mt-1 flex items-center gap-1">
                                <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                                {item.metric}
                            </p>
                        </div>
                      </div>

                      {/* Footer Tags */}
                      <div className="flex flex-wrap gap-2 mt-auto border-t border-white/5 pt-4">
                        {item.tags.map(tag => (
                             <span key={tag} className="text-[10px] font-medium px-2.5 py-1 rounded-md bg-white/5 text-gray-400 border border-white/5 group-hover:border-[#E31B63]/20 group-hover:text-gray-300 transition-colors">
                                {tag}
                             </span>
                        ))}
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
                  animate(x, -index * (cardWidth + cardGap), { type: "spring", stiffness: 200, damping: 25 });
                }}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-[#E31B63] shadow-[0_0_8px_#E31B63]' 
                    : 'w-2 bg-gray-800 hover:bg-gray-600'
                }`}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

           {/* Mobile Arrows */}
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