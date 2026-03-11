"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function MetaAlunos() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  
  const targetValue = 756410; // Valor atual
  const maxValue = 1000000;    // Meta total (1M)
  const percentage = (targetValue / maxValue) * 100;

  useGSAP(() => {
    // Animação da Barra e do Thumb
    gsap.fromTo(
      progressRef.current,
      { width: "0%" },
      {
        width: `${percentage}%`,
        duration: 2.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );

    // Animação do Contador Numérico
    const obj = { value: 0 };
    gsap.to(obj, {
      value: targetValue,
      duration: 2.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      onUpdate: () => {
        setCount(Math.floor(obj.value));
      },
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="bg-[#FAF9F6] py-20 lg:py-32 text-center overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Título Principal */}
        <h2 className="text-3xl md:text-5xl font-serif text-[#0D1E2D] mb-4 tracking-tight">
          Qual é a principal <span className="text-[#C5A47E] italic font-light">meta da Tegbe?</span>
        </h2>

        {/* Descrição da Meta */}
        <p className="text-[#8E9BA7] text-sm md:text-base font-light mb-16 tracking-wide max-w-2xl mx-auto">
          Gerar <span className="font-bold text-[#0D1E2D]">R$ 100 milhões em novas receitas</span> através dos nossos parceiros até 2030.
        </p>

        {/* CONTAINER DA BARRA (O Card Branco) */}
        <div className="relative bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-8 md:p-12 border border-gray-100">
          
          {/* Barra de Fundo */}
          <div className="relative h-2 w-full bg-gray-100 rounded-full mb-8">
            
            {/* Progresso Ativo */}
            <div 
              ref={progressRef}
              className="absolute top-0 left-0 h-full bg-[#0D1E2D] rounded-full transition-all ease-out"
            >
              {/* Thumb (Ícone que desliza) */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 bg-[#C5A47E] rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <div className="w-4 h-4 text-white">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Números da Meta */}
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm font-bold">0</span>
            
            {/* Valor Central Animado */}
            <div className="text-4xl md:text-6xl font-bold text-[#0D1E2D] tracking-tighter">
              {count.toLocaleString('pt-BR')}
            </div>
            
            <span className="text-gray-300 text-sm font-bold">1M</span>
          </div>
        </div>

        {/* Footer da Meta */}
        <p className="mt-10 text-[#8E9BA7] text-[11px] md:text-xs uppercase tracking-[0.2em] font-medium">
          Resultados gerados até agora pela <span className="text-[#0D1E2D] font-bold">#GeraçãoTegbe</span>
        </p>

      </div>
    </section>
  );
}