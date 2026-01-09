"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Interface baseada no JSON da API
export interface MetricItem {
  id: string;
  icon: string;
  color: string;
  label: string;
  value: string; // API retorna string ("45")
  suffix: string; // ("Mi", "%")
  description: string;
}

interface MetricasProps {
  data: MetricItem[];
}

const Metricas = ({ data }: MetricasProps) => {
  const containerRef = useRef(null);

  // Se não houver dados, não renderiza
  if (!data || data.length === 0) return null;

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%", 
        toggleActions: "play none none reverse",
      }
    });

    // Animação dos Cards (Blindada)
    tl.fromTo(".metric-card", 
      { y: 50, autoAlpha: 0 }, 
      { 
        y: 0, 
        autoAlpha: 1, 
        duration: 0.8, 
        stagger: 0.15, 
        ease: "power3.out" 
      }
    );

    // Animação dos Números
    data.forEach((metric) => {
        // Sanitização do ID para seletor (caso venha com caracteres especiais, embora o ID da API pareça seguro)
        const selectorId = `counter-${metric.id.replace(/[^a-zA-Z0-9-_]/g, '')}`;
        const counterElement = document.getElementById(selectorId);
        
        // Converte string para número para a animação
        const finalValue = parseFloat(metric.value);

        if(counterElement && !isNaN(finalValue)) {
            let proxy = { value: 0 };
            
            gsap.to(proxy, {
                value: finalValue,
                duration: 2.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                },
                onUpdate: function() {
                    // Math.ceil garante números inteiros durante a contagem
                    counterElement.textContent = Math.ceil(this.targets()[0].value).toString();
                }
            });
        }
    });

  }, { scope: containerRef, dependencies: [data] });

  return (
    <section ref={containerRef} className="py-24 bg-[#F5F5F7] px-6 relative overflow-hidden">
      
      {/* Background Decorativo */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
         <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-gray-200/60 rounded-full blur-[120px]" />
         <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-gray-200/60 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Cabeçalho */}
        <div className="metric-card opacity-0 flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#0071E3]"></span>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Auditoria de Resultados</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] tracking-tight leading-[1.1]">
                    Números que superam <br/>
                    <span className="text-gray-400">qualquer argumento.</span>
                </h2>
            </div>
            
            <div className="hidden md:block pb-2">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-widest text-right">
                    Atualizado em <br/>
                    <span className="text-[#1d1d1f]">Janeiro 2026</span>
                </p>
            </div>
        </div>

        {/* Grid de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.map((metric) => (
                <div 
                    key={metric.id}
                    className="metric-card opacity-0 group relative bg-white rounded-[2rem] p-8 shadow-[0_2px_20px_rgba(0,0,0,0.03)] border border-white hover:border-gray-200 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1"
                >
                    {/* Ícone */}
                    <div className="mb-8 w-12 h-12 rounded-2xl bg-[#F5F5F7] flex items-center justify-center text-[#1d1d1f] group-hover:scale-110 transition-transform duration-300">
                        <Icon icon={metric.icon} width="24" height="24" className="opacity-70" />
                    </div>

                    {/* Número Grande */}
                    <div className="flex items-baseline gap-1 mb-4">
                        {/* Lógica condicional: Se for faturamento, adiciona R$ */}
                        {metric.label.toLowerCase().includes("faturamento") && (
                             <span className="text-2xl font-bold text-gray-400">R$</span>
                        )}
                        
                        <span 
                            id={`counter-${metric.id.replace(/[^a-zA-Z0-9-_]/g, '')}`} 
                            className={`text-6xl font-bold tracking-tighter ${metric.color}`}
                        >
                            0
                        </span>
                        
                        <span className={`text-3xl font-bold ${metric.color}`}>
                            {metric.suffix}
                        </span>
                    </div>

                    {/* Descrições */}
                    <div>
                        <h3 className="text-lg font-bold text-[#1d1d1f] mb-2">
                            {metric.label}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed font-medium">
                            {metric.description}
                        </p>
                    </div>

                    {/* Linha Decorativa */}
                    <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-gray-100 overflow-hidden">
                        <div className="h-full bg-[#0071E3] w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                    </div>
                </div>
            ))}
        </div>

        {/* Footer */}
        <div className="metric-card opacity-0 mt-12 flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-200/60 text-gray-400 text-xs font-medium">
             <div className="flex items-center gap-2">
                <Icon icon="ph:info-bold" />
                <span>Dados auditados internamente via GA4 e Dashboards.</span>
             </div>
             <div className="mt-4 md:mt-0 flex gap-6">
                <span>Precisão: 99.8%</span>
                <span>Fonte: Base Tegbe</span>
             </div>
        </div>

      </div>
    </section>
  );
}

export default Metricas;