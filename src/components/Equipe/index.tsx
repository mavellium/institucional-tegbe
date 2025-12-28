"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyTegbeRefined() {
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
      className="py-24 w-full flex flex-col justify-center items-center bg-[#050505] px-6 relative"
    >
      {/* Luzes de Fundo - Reduzidas para não pesar visualmente */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#0071E3]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container max-w-5xl relative z-10">
        <div className="flex flex-col items-center text-center w-full">
          
          {/* Badge Minimalista */}
          <div className="reveal-text mb-6 flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/5">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">
              Método Validado Tegbe
            </span>
          </div>

          <h1 className="reveal-text font-bold text-3xl sm:text-5xl md:text-6xl mb-6 leading-tight tracking-tight text-white max-w-4xl">
            Por que vender com a <span className="text-yellow-500">Tegbe</span> e não sozinho?
          </h1>

          <div className="reveal-text max-w-2xl space-y-5 mb-10">
            <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
              Vender sozinho é tentar a sorte. Com a Tegbe, você aplica o método que <span className="text-white">destrava o faturamento</span> e domina o algoritmo do Mercado Livre.
            </p>
          </div>

          {/* CTA mais sóbrio e eficiente */}
          <div className="reveal-text">
            <a 
              href="#" 
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#0071E3] text-white font-bold rounded-full transition-all hover:bg-[#005bb5] shadow-lg shadow-blue-900/20"
            >
              <span>FALAR COM UM ESPECIALISTA</span>
              <Icon icon="ph:chart-line-up-bold" className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <p className="mt-4 text-[11px] text-gray-600 font-medium tracking-widest uppercase">
              Plano de guerra para vender mais
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}