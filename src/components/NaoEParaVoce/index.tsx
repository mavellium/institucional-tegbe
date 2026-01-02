"use client";

import { useRef } from "react";
import { Icon } from "@iconify/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MarketingAntiHero() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      }
    });

    // 1. Badge e Título (Entrada de Cima)
    tl.fromTo(".reveal-anti-header", 
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1 }
    );

    // 2. Cards (Entrada Lateral ou Escala)
    tl.fromTo(".anti-card", 
      { y: 50, opacity: 0, scale: 0.95 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 0.6, 
        stagger: 0.15, 
        ease: "back.out(1.5)" 
      }, 
      "-=0.4"
    );

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative py-24 px-6 bg-[#020202] overflow-hidden border-t border-white/5"
    >
      
      {/* --- LAYER 1: Atmosfera & Textura --- */}
      {/* Texture Noise (Mesma do exemplo) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      {/* Luz Ambiente Vermelha (Perigo/Alerta) */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E31B63]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#990033]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10 flex flex-col items-center">

        {/* --- CABEÇALHO --- */}
        <div className="text-center mb-16 max-w-4xl">
            
            {/* Badge de "Filtro" */}
            <div className="reveal-anti-header mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-950/10 backdrop-blur-md shadow-[0_0_15px_rgba(227,27,99,0.1)]">
                <Icon icon="mdi:filter-variant-remove" className="text-[#E31B63] w-4 h-4" />
                <span className="text-[11px] font-bold tracking-[0.2em] text-red-100 uppercase">
                    Filtro de Qualificação
                </span>
            </div>

            <h2 className="reveal-anti-header font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-white">
                A Tegbe <span className="relative inline-block text-[#E31B63]">
                    NÃO
                    {/* Sublinhado Riscado Estilizado */}
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#E31B63]" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" opacity="0.4" />
                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                </span> é para você se...
            </h2>
            
            <p className="reveal-anti-header mt-6 text-gray-400 text-lg font-light max-w-2xl mx-auto">
                Buscamos parceiros de crescimento, não aventuras. Se sua empresa se encaixa nos perfis abaixo, nossa engenharia não vai funcionar.
            </p>
        </div>

        {/* --- GRID DE REJEIÇÃO (Cards) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            
            {/* CARD 1: Vaidade */}
            <div className="anti-card group relative bg-[#0A0A0A] border border-white/5 p-8 rounded-[2rem] overflow-hidden hover:border-[#E31B63]/50 transition-all duration-500">
                {/* Glow Vermelho no Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#E31B63]/0 to-[#E31B63]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-2xl bg-[#E31B63]/10 flex items-center justify-center mb-6 border border-[#E31B63]/20 group-hover:scale-110 group-hover:bg-[#E31B63] group-hover:text-white transition-all duration-500 text-[#E31B63]">
                        <Icon icon="mdi:camera-off" width="28" height="28" />
                    </div>
                    
                    <h3 className="text-white font-bold text-xl mb-3 group-hover:text-[#E31B63] transition-colors">
                        Busca Marketing de Vaidade
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed font-light">
                        Você quer apenas "postar no Instagram" para ganhar likes e inflar o ego, sem se preocupar com o <strong className="text-white">Lucro Real</strong> que sobra no caixa da empresa no final do mês.
                    </p>

                    <div className="mt-auto pt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                        <span className="text-xs font-bold text-[#E31B63] uppercase tracking-wider flex items-center gap-2">
                            <Icon icon="mdi:close-circle" /> Incompatível
                        </span>
                    </div>
                </div>
            </div>

            {/* CARD 2: Achismo (Dados) */}
            <div className="anti-card group relative bg-[#0A0A0A] border border-white/5 p-8 rounded-[2rem] overflow-hidden hover:border-[#E31B63]/50 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-b from-[#E31B63]/0 to-[#E31B63]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-2xl bg-[#E31B63]/10 flex items-center justify-center mb-6 border border-[#E31B63]/20 group-hover:scale-110 group-hover:bg-[#E31B63] group-hover:text-white transition-all duration-500 text-[#E31B63]">
                        <Icon icon="mdi:chart-line-variant" width="28" height="28" />
                    </div>
                    
                    <h3 className="text-white font-bold text-xl mb-3 group-hover:text-[#E31B63] transition-colors">
                        Resiste aos Dados
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed font-light">
                        Você prefere seguir sua intuição ou fazer "o que todo mundo faz" ao invés de aceitar estratégias baseadas em <strong className="text-white">números frios</strong> e testes A/B validados.
                    </p>

                    <div className="mt-auto pt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                        <span className="text-xs font-bold text-[#E31B63] uppercase tracking-wider flex items-center gap-2">
                            <Icon icon="mdi:close-circle" /> Incompatível
                        </span>
                    </div>
                </div>
            </div>

            {/* CARD 3: Zona de Conforto */}
            <div className="anti-card group relative bg-[#0A0A0A] border border-white/5 p-8 rounded-[2rem] overflow-hidden hover:border-[#E31B63]/50 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-b from-[#E31B63]/0 to-[#E31B63]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-2xl bg-[#E31B63]/10 flex items-center justify-center mb-6 border border-[#E31B63]/20 group-hover:scale-110 group-hover:bg-[#E31B63] group-hover:text-white transition-all duration-500 text-[#E31B63]">
                        <Icon icon="ph:armchair-bold" width="28" height="28" />
                    </div>
                    
                    <h3 className="text-white font-bold text-xl mb-3 group-hover:text-[#E31B63] transition-colors">
                        Ama a Zona de Conforto
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed font-light">
                        Seu negócio não tem estrutura, equipe ou <strong className="text-white">vontade real de escalar</strong> o atendimento quando o volume de leads qualificados triplicar.
                    </p>

                    <div className="mt-auto pt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                        <span className="text-xs font-bold text-[#E31B63] uppercase tracking-wider flex items-center gap-2">
                            <Icon icon="mdi:close-circle" /> Incompatível
                        </span>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
}