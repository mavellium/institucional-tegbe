"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Interfaces atualizadas para refletir o JSON completo
export interface MetricItem {
  id: string;
  icon: string;
  color: string;
  label: string;
  value: string;
  suffix: string;
  description: string;
}

interface MetricasData {
  header: {
    badge: string;
    title: string;
    titleHighlight: string;
    updatedAt: string;
  };
  footer: {
    info: string;
    precision: string;
    source: string;
  };
  metrics: MetricItem[];
}

const Metricas = ({ endpoint = "https://tegbe-dashboard.vercel.app/api/tegbe-institucional/metricas" }) => {
  const containerRef = useRef(null);
  const [data, setData] = useState<MetricasData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((json) => {
        // Se a API retornar apenas o array (como está agora), 
        // criamos um objeto padrão para não quebrar enquanto você ajusta a API
        if (Array.isArray(json)) {
          setData({
            header: {
              badge: "Auditoria de Resultados",
              title: "Números que superam",
              titleHighlight: "qualquer argumento.",
              updatedAt: "Janeiro 2026"
            },
            footer: {
              info: "Dados auditados internamente via GA4 e Dashboards.",
              precision: "99.8%",
              source: "Fonte: Base Tegbe"
            },
            metrics: json
          });
        } else {
          setData(json);
        }
      })
      .catch((err) => console.error("Erro ao carregar métricas:", err))
      .finally(() => setLoading(false));
  }, [endpoint]);

  useGSAP(() => {
    if (!data) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(".reveal-metric", 
      { y: 30, autoAlpha: 0 }, 
      { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );

    data.metrics.forEach((metric) => {
      const selectorId = `counter-${metric.id.replace(/[^a-zA-Z0-9-_]/g, '')}`;
      const counterElement = document.getElementById(selectorId);
      const finalValue = parseFloat(metric.value);

      if (counterElement && !isNaN(finalValue)) {
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
            counterElement.textContent = Math.ceil(this.targets()[0].value).toString();
          }
        });
      }
    });
  }, { scope: containerRef, dependencies: [data] });

  if (loading || !data) return null;

  return (
    <section ref={containerRef} className="py-24 bg-[#F5F5F7] px-6 relative overflow-hidden border-t border-gray-200/50">
      
      {/* Background Decorativo */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
         <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-gray-200/60 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Cabeçalho Dinâmico */}
        <div className="reveal-metric opacity-0 flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl text-left">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#0071E3]"></span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{data.header.badge}</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1d1d1f] tracking-tight leading-[1.05]">
                    {data.header.title} <br/>
                    <span className="text-gray-400">{data.header.titleHighlight}</span>
                </h2>
            </div>
            
            <div className="hidden md:block pb-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] text-right">
                    Última Atualização <br/>
                    <span className="text-[#1d1d1f] text-xs">{data.header.updatedAt}</span>
                </p>
            </div>
        </div>

        {/* Grid de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.metrics.map((metric) => (
                <div 
                    key={metric.id}
                    className="reveal-metric opacity-0 group relative bg-white rounded-[2rem] p-10 border border-white hover:border-gray-200 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)]"
                >
                    <div className="mb-10 w-14 h-14 rounded-2xl bg-[#F5F5F7] flex items-center justify-center text-[#1d1d1f] group-hover:scale-110 group-hover:bg-[#0071E3] group-hover:text-white transition-all duration-500">
                        <Icon icon={metric.icon} width="28" height="28" className="opacity-80 group-hover:opacity-100" />
                    </div>

                    <div className="flex items-baseline gap-1 mb-4">
                        {metric.label.toLowerCase().includes("faturamento") && (
                             <span className="text-2xl font-bold text-gray-300">R$</span>
                        )}
                        
                        <span 
                            id={`counter-${metric.id.replace(/[^a-zA-Z0-9-_]/g, '')}`} 
                            className="text-6xl font-bold tracking-tighter text-[#1d1d1f]"
                        >
                            0
                        </span>
                        
                        <span className="text-3xl font-bold text-[#0071E3]">
                            {metric.suffix}
                        </span>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-[#1d1d1f] mb-3">{metric.label}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed font-medium opacity-80">{metric.description}</p>
                    </div>

                    <div className="absolute bottom-0 left-10 right-10 h-[3px] bg-gray-50 overflow-hidden rounded-full">
                        <div className="h-full bg-[#0071E3] w-0 group-hover:w-full transition-all duration-1000 ease-out"></div>
                    </div>
                </div>
            ))}
        </div>

        {/* Footer Dinâmico */}
        <div className="reveal-metric opacity-0 mt-16 flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-200 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
             <div className="flex items-center gap-2">
                <Icon icon="ph:shield-check-bold" className="text-green-500 text-sm" />
                <span>{data.footer.info}</span>
             </div>
             <div className="mt-4 md:mt-0 flex gap-8">
                <span>{data.footer.precision}</span>
                <span>{data.footer.source}</span>
             </div>
        </div>

      </div>
    </section>
  );
}

export default Metricas;