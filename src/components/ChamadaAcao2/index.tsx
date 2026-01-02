"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FinalCTALight() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    // 1. O Texto surge
    tl.fromTo(".reveal-final", 
      { y: 30, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );

    // 2. O Botão escala
    tl.fromTo(".cta-button",
      { scale: 0.9, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.4"
    );

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 w-full flex flex-col justify-center items-center bg-white px-6 relative overflow-hidden"
    >
      {/* --- AMBIENTE LIGHT --- */}
      {/* Grid sutilíssimo para textura */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Luz Azul Suave no fundo (Bem sutil) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#0071E3]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container max-w-4xl relative z-10">
        <div className="flex flex-col items-center text-center w-full">
          
          {/* Badge de Status (Light Version) */}
          <div className="reveal-final mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-mono text-gray-500 tracking-wider uppercase">
                Agenda Q1/2026: <span className="text-[#1d1d1f] font-bold">Últimas Vagas</span>
            </span>
          </div>

          <h1 className="reveal-final font-bold text-4xl sm:text-5xl md:text-7xl mb-6 leading-[1.1] tracking-tight text-[#1d1d1f]">
            Sua operação está pronta <br />
            para o <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] to-blue-600">próximo nível?</span>
          </h1>

          <p className="reveal-final text-lg text-gray-500 font-medium leading-relaxed max-w-2xl mb-12">
            Não procuramos clientes, procuramos parceiros de crescimento. Se você tem produto validado e ambição de escala, 
            <span className="text-[#1d1d1f] font-bold"> nós temos a engenharia.</span>
          </p>

          {/* O BOTÃO PRETO (High Contrast Luxury) */}
          <div className="cta-button group relative">
             {/* Sombra difusa azulada atrás do botão para dar um "pop" */}
             <div className="absolute top-4 left-0 right-0 h-full bg-[#0071E3]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <a 
              href="#" 
              className="relative flex items-center gap-4 px-10 py-5 bg-[#1d1d1f] text-white rounded-full font-bold text-lg tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:bg-black active:scale-[0.98]"
            >
              <span>AGENDAR SESSÃO ESTRATÉGICA</span>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white group-hover:bg-[#0071E3] transition-colors">
                 <Icon icon="ph:arrow-right-bold" />
              </div>
            </a>
          </div>

          {/* RODAPÉ DO CTA (Sem "Gratuito") */}
          <div className="reveal-final mt-12 flex items-center justify-center gap-8 md:gap-12 opacity-70">
             
             {/* Item 1 */}
             <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <span className="text-[#1d1d1f] font-bold text-lg">30 Min</span>
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Duração da Sessão</span>
             </div>

             {/* Divisor Vertical */}
             <div className="h-8 w-[1px] bg-gray-300"></div>

             {/* Item 2 */}
             <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <span className="text-[#1d1d1f] font-bold text-lg">Senior</span>
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Especialista Real</span>
             </div>

          </div>

        </div>
      </div>
    </section>
  );
}