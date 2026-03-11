"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function OQueSomos() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      },
    });

    tl.from(".animate-manifesto", {
      autoAlpha: 0,
      y: 15,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0A0A0A] py-20 lg:py-28 overflow-hidden selection:bg-[#B38E5D]/30"
    >
      {/* 1. TEXTURA DE RUÍDO (Dá o aspecto de material nobre) */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* 2. GRADIENTE DE PROFUNDIDADE (Preto fosco com leve variação) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,#1A1A1A_0%,#0A0A0A_100%)] opacity-90" />

      {/* 3. GRAFISMO TÉCNICO (Vazado em dourado com opacidade mínima) */}
      <div className="absolute left-[-10%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.04] pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" className="text-[#B38E5D] w-full h-full">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" />
          <path d="M10 50 L90 50 M50 10 L50 90" stroke="currentColor" strokeWidth="0.2" />
          <path d="M20 20 L80 80 M80 20 L20 80" stroke="currentColor" strokeWidth="0.2" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="space-y-10">

          {/* Título: Off-White + Dourado Champagne */}
          <h2 className="animate-manifesto text-2xl md:text-4xl lg:text-5xl font-serif text-[#F2F2F2] leading-tight tracking-tight">
            Somos a nova ordem da <span className="text-[#C5A47E] italic font-light italic-glow">nação empreendedora</span>
          </h2>

          {/* Divisor minimalista */}
          <div className="animate-manifesto h-px w-12 bg-gradient-to-r from-transparent via-[#C5A47E]/40 to-transparent mx-auto" />

          {/* Blocos de Texto Narrativo */}
          <div className="animate-manifesto space-y-8 max-w-3xl mx-auto">
            {/* Texto de apoio: Cinza azulado (Slate) para não brigar com o título */}
            <p className="text-[#8E9BA7] text-[12px] md:text-[13px] font-light leading-relaxed tracking-[0.15em] uppercase">
              Uma plataforma de soluções corporativas para orientar quem lidera empresas reais, em um país com desafios reais.
            </p>

            {/* Destaque Central: Branco puro para saltar aos olhos */}
            <p className="text-[#FFFFFF] text-base md:text-lg font-medium leading-relaxed tracking-tight max-w-2xl mx-auto border-x border-white/5 px-4 lg:px-12">
              A Tegbe é <span className="text-[#C5A47E]">instrumento de poder para empresários brasileiros.</span> Bússola, método, rede, influência e inteligência para empresas que fazem a diferença no Brasil.
            </p>

            {/* Rodapé: Mesmo tom do apoio */}
            <p className="text-[#8E9BA7] text-[13px] md:text-sm font-light leading-relaxed tracking-wide">
              Unimos conhecimento aplicado, comunidade de alto nível e serviços selecionados sob um princípio simples: dar direção, voz e poder aos empresários que fazem o Brasil avançar.
            </p>
          </div>

        </div>
      </div>

      <style jsx>{`
        .italic-glow {
          text-shadow: 0 0 15px rgba(197, 164, 126, 0.2);
        }
      `}</style>
    </section>
  );
}