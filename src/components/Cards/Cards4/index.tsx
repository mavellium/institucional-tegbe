"use client";

import { useRef } from "react";
import { Icon } from "@iconify/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const methodSteps = [
  {
    step: "01",
    title: "Rastreabilidade Total", // Mudou de "Auditoria" para um Princípio
    description: "Eliminamos a intuição. Antes de gastar R$ 1, implementamos um ecossistema de rastreamento (GA4 + Server Side). Se o dado não existe, a decisão não é tomada.",
    icon: "ph:chart-bar-bold",
    color: "#0071E3", 
    wide: false,
    visualType: "bar-chart"
  },
  {
    step: "02",
    title: "Eficiência de Capital", // Mudou de "Tração" para um Valor Financeiro
    description: "Não buscamos apenas cliques; buscamos margem. Nossa engenharia foca em fazer o estoque girar e transformar visitantes em fluxo de caixa líquido.",
    icon: "ph:rocket-launch-bold",
    color: "#0071E3",
    wide: false,
    visualType: "trend-line"
  },
  {
    step: "03",
    title: "Governança Radical", // Mantido (Excelente termo)
    description: "Fim das caixas pretas. Você acessa o mesmo dashboard que nós. Tratamos seu budget com a seriedade e a transparência de um fundo de investimento.",
    icon: "ph:shield-check-bold",
    color: "#1d1d1f",
    wide: true,
    visualType: "dashboard"
  }
];

export default function MetodoTegbe() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      }
    });

    // Animação do Título
    tl.fromTo(".section-title", 
      { y: 30, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" }
    );

    // Animação dos Cards em Cascata
    tl.fromTo(".method-card", 
      { y: 50, autoAlpha: 0 },
      { 
        y: 0, 
        autoAlpha: 1, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: "power3.out" 
      }, 
      "-=0.4"
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 bg-[#F5F5F7] px-6 relative overflow-hidden">
      
      {/* Background Decorativo Clean */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gray-200/40 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* CABEÇALHO */}
        <div className="mb-16 md:mb-24 section-title opacity-0 text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#0071E3]"></span>
            <span className="text-xs font-bold text-gray-500 tracking-wide uppercase">Nosso Modus Operandi</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1d1d1f] tracking-tight leading-[1.1]">
            A engenharia por trás <br/>
            <span className="text-gray-400">da nossa excelência.</span>
          </h2>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {methodSteps.map((item, index) => (
            <div 
              key={index}
              className={`
                method-card opacity-0 group relative overflow-hidden rounded-[32px] p-8 md:p-10 bg-white shadow-[0_2px_20px_rgba(0,0,0,0.02)]
                border border-white hover:border-[#0071E3]/20 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1
                ${item.wide ? 'md:col-span-2 md:flex md:items-center md:gap-10' : 'md:col-span-1 flex flex-col justify-between'}
              `}
            >
              
              {/* Conteúdo Textual */}
              <div className={`relative z-10 ${item.wide ? 'md:w-1/2' : 'w-full'}`}>
                {/* Ícone Container */}
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-[#F5F5F7] text-[#1d1d1f] group-hover:scale-110 group-hover:bg-[#0071E3] group-hover:text-white transition-all duration-500"
                >
                  <Icon icon={item.icon} width="24" height="24" />
                </div>

                <h3 className="text-2xl font-bold text-[#1d1d1f] mb-3 tracking-tight">
                  {item.title}
                </h3>

                <p className="text-gray-500 leading-relaxed text-[15px] font-medium max-w-sm">
                  {item.description}
                </p>
              </div>

              {/* Área Visual (Micro-Interações CSS) */}
              <div className={`mt-8 ${item.wide ? 'mt-0 md:w-1/2 h-full min-h-[160px]' : 'w-full h-[140px]'} relative rounded-2xl bg-[#F5F5F7] border border-gray-100 overflow-hidden group-hover:border-blue-100 transition-colors duration-500`}>
                
                {/* Visual 1: Gráfico de Barras Animado */}
                {item.visualType === "bar-chart" && (
                  <div className="absolute inset-0 flex items-end justify-center gap-3 pb-8 px-8">
                    <div className="w-4 bg-gray-300 rounded-t-sm h-[30%] group-hover:bg-[#0071E3]/40 group-hover:h-[45%] transition-all duration-700 delay-75"></div>
                    <div className="w-4 bg-gray-300 rounded-t-sm h-[50%] group-hover:bg-[#0071E3]/60 group-hover:h-[70%] transition-all duration-700 delay-100"></div>
                    <div className="w-4 bg-gray-300 rounded-t-sm h-[40%] group-hover:bg-[#0071E3]/50 group-hover:h-[55%] transition-all duration-700 delay-150"></div>
                    <div className="w-4 bg-[#0071E3] rounded-t-sm h-[70%] group-hover:h-[90%] shadow-lg shadow-blue-500/20 transition-all duration-700 delay-200"></div>
                  </div>
                )}

                {/* Visual 2: Linha de Tendência */}
                {item.visualType === "trend-line" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-full h-full p-6 text-gray-300 group-hover:text-[#0071E3] transition-colors duration-500" viewBox="0 0 100 50" preserveAspectRatio="none">
                            <path 
                                d="M0,50 Q25,45 50,25 T100,5" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="3" 
                                strokeLinecap="round"
                                className="drop-shadow-md"
                            />
                            <circle cx="100" cy="5" r="3" className="fill-[#0071E3] animate-pulse" />
                        </svg>
                    </div>
                )}

                {/* Visual 3: Dashboard/Shield */}
                {item.visualType === "dashboard" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 gap-2">
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 w-[80%] group-hover:w-[95%] transition-all duration-1000 ease-out"></div>
                        </div>
                        <div className="w-full flex justify-between text-[10px] text-gray-400 font-mono uppercase">
                            <span>Investimento</span>
                            <span className="text-green-600 font-bold">ROI Positivo</span>
                        </div>
                        <div className="mt-2 p-2 rounded-lg bg-white shadow-sm border border-gray-100 flex items-center gap-2">
                            <Icon icon="ph:check-circle-fill" className="text-green-500 w-4 h-4"/>
                            <span className="text-xs font-bold text-gray-600">Acesso Liberado</span>
                        </div>
                    </div>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}