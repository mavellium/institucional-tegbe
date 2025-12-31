"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FinalCTAMarketing() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from(".reveal-final", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
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
      // MUDANÇA 1: Fundo Dark Deep + Borda Superior
      className="py-24 w-full flex flex-col justify-center items-center bg-[#020202] px-6 relative border-t border-white/5 overflow-hidden"
    >
      {/* Texture Noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      {/* MUDANÇA 2: Glow Vermelho Tegbe (Coração Pulsante) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#E31B63]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container max-w-5xl relative z-10">
        <div className="flex flex-col items-center text-center w-full text-white">
          
          {/* Badge de Urgência */}
          <div className="reveal-final mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-rose-500/20 bg-rose-900/10 backdrop-blur-md">
            <Icon icon="mdi:lightning-bolt" className="text-[#FF0F43] w-4 h-4" />
            <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-rose-200/80 uppercase">
              Próximo Passo Lógico
            </span>
          </div>

          {/* Headline: Foco em Decisão e Receita */}
          <h1 className="reveal-final font-bold text-3xl sm:text-5xl md:text-7xl mb-8 leading-[1.1] tracking-tight">
            Sua empresa tem um teto de crescimento. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0F43] to-[#E31B63] drop-shadow-[0_0_20px_rgba(227,27,99,0.3)]">
              Nós vamos quebrá-lo.
            </span>
          </h1>

          {/* Subtítulo: Autoridade e Método */}
          <p className="reveal-final text-base sm:text-xl text-gray-400 font-light leading-relaxed max-w-2xl mb-12">
            Não entregamos "tentativas". Entregamos um <strong className="text-white">plano de engenharia comercial</strong> desenhado para dominar seu nicho e gerar previsibilidade de caixa.
          </p>

          {/* CTA Area */}
          <div className="reveal-final flex flex-col items-center gap-6">
            <a 
              aria-label="Solicitar meu diagnóstico"
              href="#diagnostico" 
              className="group relative"
            >
              {/* Glow atrás do botão */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FF0F43] to-[#D90429] rounded-full opacity-40 blur-lg group-hover:opacity-70 transition duration-500"></div>
              
              <button className="relative flex items-center justify-center gap-3 px-10 py-5 bg-[#E31B63] text-white font-bold text-base sm:text-lg rounded-full transition-all duration-300 hover:bg-[#ff1758] hover:scale-[1.02] active:scale-[0.98] shadow-xl border border-white/10">
                <span>CONSTRUIR MINHA MÁQUINA DE VENDAS</span>
                <Icon 
                  icon="lucide:arrow-right" 
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                />
              </button>
            </a>
            
            {/* Social Proof / Scarcity */}
            <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-default">
              <div className="flex -space-x-2">
                 <div className="w-6 h-6 rounded-full bg-gray-700 border border-black"></div>
                 <div className="w-6 h-6 rounded-full bg-gray-600 border border-black"></div>
                 <div className="w-6 h-6 rounded-full bg-gray-500 border border-black flex items-center justify-center text-[8px] font-bold">+40</div>
              </div>
              <span className="text-[11px] text-gray-400 font-medium tracking-wide uppercase">
                Empresas escaladas este ano
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}