"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FinalCTARefined() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from(".reveal-final", {
      y: 20,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="py-24 w-full flex flex-col justify-center items-center bg-[#050505] px-6 relative"
    >
      {/* Glow sutil - apenas para dar profundidade, sem poluir */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0071E3]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container max-w-4xl relative z-10">
        <div className="flex flex-col items-center text-center w-full text-white">
          
          <p className="reveal-final text-yellow-500 font-bold tracking-[0.2em] uppercase text-[10px] mb-6">
            O próximo passo para sua escala
          </p>

          <h1 className="reveal-final font-bold text-3xl sm:text-5xl md:text-6xl mb-6 leading-tight tracking-tight">
            O próximo case de sucesso <br />
            <span className="text-yellow-500">será o seu.</span>
          </h1>

          <p className="reveal-final text-base sm:text-lg text-gray-400 font-light leading-relaxed max-w-xl mb-10">
            Trabalhamos com um <span className="text-white">plano de guerra</span> desenhado para sua marca dominar o mercado e vender mais junto com a Tegbe.
          </p>

          <div className="reveal-final flex flex-col items-center gap-5">
            <a 
              aria-label="Solicitar meu diagnóstico"
              href="#" 
              className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold text-sm sm:text-base rounded-full transition-all duration-300 hover:bg-yellow-500"
            >
              <span>SOLICITAR MEU DIAGNÓSTICO</span>
              <Icon 
                icon="ph:arrow-right-bold" 
                className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
              />
            </a>
            
            <div className="flex items-center gap-2 opacity-50">
              <Icon icon="mdi:check-decagram" className="text-yellow-500 w-4 h-4" />
              <span className="text-[11px] text-gray-400 font-medium tracking-wide uppercase">
                Vagas limitadas para este mês
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}