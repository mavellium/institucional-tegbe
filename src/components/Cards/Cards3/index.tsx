"use client";

import { useRef } from "react";
import { Icon } from "@iconify/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    step: "01",
    id: "traffic",
    title: "Tráfego de Elite",
    description: "Não buscamos cliques, buscamos decisores. Segmentação cirúrgica para atrair quem pode pagar.",
    icon: "mdi:target-account",
    color: "#FF0F43", // Vermelho Vibrante
    wide: false 
  },
  {
    step: "02",
    id: "crm",
    title: "Engenharia de CRM",
    description: "Implementação oficial Kommo. Transformamos seu funil em uma linha de produção previsível.",
    icon: "mdi:sitemap",
    color: "#E31B63", // Rosa Profundo
    wide: false 
  },
  {
    step: "03",
    id: "scale",
    title: "IA & Otimização",
    description: "Automação que trabalha enquanto você dorme. Dashboards de receita em tempo real e atendimento via IA.",
    icon: "mdi:robot-industrial",
    color: "#D90429", // Vermelho Sangue
    wide: true 
  }
];

export default function ServiceFlow() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Título
    gsap.from(".section-title", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 90%", 
      },
    });

    // Cards
    gsap.from(".service-card", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

  }, { scope: containerRef });

  return (
    // MUDANÇA 1: Fundo Dark e Textura
    <section ref={containerRef} className="py-24 bg-[#020202] px-6 relative border-t border-white/5">
      
      {/* Texture Noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* CABEÇALHO */}
        <div className="mb-20 text-center section-title will-change-transform">
          <div className="inline-block mb-4 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
             <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">O Padrão Tegbe</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter mb-4">
            Não é mágica.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0F43] to-[#A30030]">É Metodologia.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
            O tripé estratégico que sustenta operações de alta performance.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`
                service-card relative overflow-hidden rounded-[2rem] p-8 border group
                will-change-transform transition-all duration-500 hover:-translate-y-1
                bg-[#0A0A0A] border-white/10 hover:border-rose-500/30 hover:shadow-[0_0_30px_rgba(227,27,99,0.1)]
                ${service.wide ? 'md:col-span-2' : 'md:col-span-1'}
              `}
            >
              {/* Número de Fundo (Subtil) */}
              <span className="absolute right-6 top-6 text-7xl font-black text-white/5 group-hover:text-white/10 transition-colors duration-500 select-none z-0">
                {service.step}
              </span>

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  {/* Ícone Wrapper */}
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg bg-white/5 border border-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:bg-[#E31B63] group-hover:border-[#E31B63]"
                  >
                    <Icon icon={service.icon} width="28" height="28" className="text-white" />
                  </div>

                  <h1 className="text-2xl font-bold text-white mb-3 w-11/12 md:w-3/4">
                    {service.title}
                  </h1>

                  <p className="text-gray-400 leading-relaxed text-base font-light border-l-2 border-white/10 pl-4">
                    {service.description}
                  </p>
                </div>

                {/* Área Visual Abstrata (Tech Look) */}
                <div className="mt-8 h-32 w-full rounded-xl bg-black/40 border border-white/5 flex items-center justify-center overflow-hidden relative group-hover:border-rose-500/20 transition-colors">
                   
                   {/* Visualização Condicional baseada no ID */}
                   {service.id === 'traffic' && (
                     <div className="flex gap-2 items-end h-16 w-32 pb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                        <div className="w-4 h-8 bg-gray-800 rounded-t-sm animate-pulse"></div>
                        <div className="w-4 h-12 bg-gray-700 rounded-t-sm"></div>
                        <div className="w-4 h-10 bg-gray-700 rounded-t-sm"></div>
                        <div className="w-4 h-full bg-[#E31B63] rounded-t-sm shadow-[0_0_10px_#E31B63]"></div>
                     </div>
                   )}

                   {service.id === 'crm' && (
                     <div className="relative w-full h-full p-4 flex flex-col gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                           <div className="w-1/3 h-full bg-[#E31B63]"></div>
                        </div>
                        <div className="flex justify-between items-center px-4">
                           <div className="w-8 h-8 rounded-full border border-white/10 bg-white/5"></div>
                           <div className="h-[1px] w-8 bg-gray-700"></div>
                           <div className="w-8 h-8 rounded-full border border-[#E31B63] bg-[#E31B63]/20"></div>
                        </div>
                     </div>
                   )}

                   {service.id === 'scale' && (
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-900/20 via-transparent to-transparent group-hover:from-rose-600/20 transition-all duration-700">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Icon icon="mdi:finance" className="text-gray-700 w-16 h-16 group-hover:text-[#E31B63] transition-colors duration-500" />
                        </div>
                     </div>
                   )}

                </div>
              </div>

              {/* Borda Inferior Animada */}
              <div 
                className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700 ease-out"
                style={{ backgroundColor: service.color }} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}