"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, animate, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TestimonialItem } from "@/types/testimonial.type";
import CompanyCard from "./companyCard";

interface Props {
  items: TestimonialItem[];
}

export default function CompanyCarousel({ items }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const x = useMotionValue(0);

  // Cálculos dinâmicos de largura baseados na tela para alinhar a matemática do arraste
  const getCardWidth = () => {
    if (containerWidth < 640) return containerWidth - 48; // Mobile: tela cheia menos margem
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
  const maxIndex = Math.max(0, items.length - visibleCards);

  // Reajusta o limite caso a tela seja redimensionada
  useEffect(() => {
    if (currentIndex > maxIndex && maxIndex >= 0) {
      setCurrentIndex(maxIndex);
      animate(x, -maxIndex * (cardWidth + cardGap), { type: "spring", stiffness: 200, damping: 25 });
    }
  }, [maxIndex, currentIndex, x, cardWidth, cardGap]);

  const handleNext = () => {
    const newIndex = Math.min(currentIndex + 1, maxIndex);
    setCurrentIndex(newIndex);
    animate(x, -newIndex * (cardWidth + cardGap), { type: "spring", stiffness: 200, damping: 25 });
  };

  const handlePrev = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(newIndex);
    animate(x, -newIndex * (cardWidth + cardGap), { type: "spring", stiffness: 200, damping: 25 });
  };

  const handleDragEnd = (event: unknown, info: PanInfo) => {
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
    <div className="relative mt-8 sm:mt-12 w-full" ref={containerRef}>
      
      {/* BOTÕES DESKTOP - Posicionados à direita acima dos cards */}
      <div className="hidden sm:flex justify-end gap-3 mb-6">
        <motion.button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="w-12 h-12 rounded-full border border-white/10 bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white disabled:cursor-not-allowed flex items-center justify-center text-white transition-all duration-300 hover:bg-[#FFCC00] hover:border-[#FFCC00] hover:text-black"
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        <motion.button
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          className="w-12 h-12 rounded-full border border-white/10 bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white disabled:cursor-not-allowed flex items-center justify-center text-white transition-all duration-300 hover:bg-[#FFCC00] hover:border-[#FFCC00] hover:text-black"
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* ÁREA DE ARRASTE DOS CARDS */}
      <div className="overflow-hidden px-2 py-4 -mx-2 -my-4">
        <motion.div
          className="flex cursor-grab active:cursor-grabbing"
          style={{ x, gap: `${cardGap}px` }}
          drag="x"
          dragConstraints={{ left: -maxIndex * (cardWidth + cardGap), right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
        >
          {items.map((item) => (
            <div 
              key={item.id} 
              style={{ width: containerWidth === 0 ? 'auto' : cardWidth }} 
              // AQUI FOI ADICIONADO O 'flex' PARA ESTICAR O CARD FILHO:
              className="flex-shrink-0 flex items-stretch"
            >
              <CompanyCard item={item} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* BOLINHAS DE PAGINAÇÃO (DOTS) */}
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
                ? "w-8 bg-[#FFCC00] shadow-[0_0_10px_#FFCC00]" 
                : "w-2 bg-gray-700 hover:bg-gray-500"
            }`}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* BOTÕES MOBILE */}
      <div className="flex sm:hidden justify-center gap-4 mt-6">
        <button 
          onClick={handlePrev} 
          disabled={currentIndex === 0} 
          className="p-3 rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-30 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={handleNext} 
          disabled={currentIndex >= maxIndex} 
          className="p-3 rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-30 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}