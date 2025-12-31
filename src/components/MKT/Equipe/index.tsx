"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyTegbeMarketing() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from(".reveal-text", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      // MUDANÇA 1: Fundo Dark Deep (#020202) + Borda sutil
      className="py-24 w-full flex flex-col justify-center items-center bg-[#020202] px-6 relative border-t border-white/5 overflow-hidden"
    >
      {/* Texture Noise (Padrão Mavellium) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      {/* MUDANÇA 2: Luzes de Fundo RED/CRIMSON */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E31B63]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FF0F43]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container max-w-5xl relative z-10">
        <div className="flex flex-col items-center text-center w-full">
          
          {/* Badge Minimalista */}
          <div className="reveal-text mb-6 flex items-center gap-2 px-3 py-1.5 rounded-full border border-rose-500/20 bg-rose-900/10 backdrop-blur-md">
            {/* Ponto Pulsante Rosa */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E31B63]"></span>
            </span>
            <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-rose-200/80 uppercase">
              Engenharia de Vendas
            </span>
          </div>

          {/* Headline: Agência Comum vs Tegbe */}
          <h1 className="reveal-text font-bold text-3xl sm:text-5xl md:text-6xl mb-6 leading-tight tracking-tight text-white max-w-4xl">
            Por que contratar a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0F43] to-[#E31B63]">Tegbe</span> e não uma agência comum?
          </h1>

          {/* Subtítulo: Foco em Processo e não em Sorte */}
          <div className="reveal-text max-w-3xl space-y-5 mb-10">
            <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
              Agências comuns vendem "posts criativos" e esperam um milagre. 
              Nós instalamos um <strong className="text-white font-medium">Ecossistema de Receita</strong> (Tráfego + CRM + IA) que elimina a sorte e transforma dados em <strong className="text-white border-b border-[#E31B63]">lucro líquido.</strong>
            </p>
          </div>

          {/* CTA ATUALIZADO: Branco -> Hover Vermelho */}
          <div className="reveal-text flex flex-col items-center">
            <a 
              aria-label="Falar com um consultor"
              href="#diagnostico" 
              className="
                group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all duration-300
                bg-white text-black
                hover:bg-[#E31B63] hover:text-white hover:scale-105 hover:shadow-[0_0_30px_rgba(227,27,99,0.4)]
              "
            >
              <span>AGENDAR DIAGNÓSTICO</span>
              <Icon 
                icon="lucide:arrow-right" 
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
              />
            </a>
            <p className="mt-4 text-[10px] text-gray-500 font-medium tracking-widest uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Agenda de Consultoria Liberada
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}