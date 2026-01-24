"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- TIPAGEM ---
interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

interface SectionData {
  header: {
    title: string;
    preTitle: string;
    subtitle: string;
  };
  values: ValueItem[];
}

interface SociosProps {
  endpoint?: string;
  variant?: "sobre";
}

const THEME = {
  background: "bg-[#020202]",
  badge: {
    border: "border-[#FFD700]/20",
    background: "bg-[#FFD700]/5 backdrop-blur-sm",
    dot: "bg-[#FFD700]",
    text: "text-[#FFD700]"
  }
};

export function SociosCrescimento({ 
    endpoint = "https://tegbe-dashboard.vercel.app/api/tegbe-institucional/socios",
    variant = "sobre" 
}: SociosProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<SectionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(endpoint);
        const json = await res.json();
        if (json && json[variant]) {
          setData(json[variant]);
        }
      } catch (error) {
        console.error("Erro ao carregar Sócios Tegbe:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint, variant]);

  useGSAP(() => {
    if (loading || !data) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(".reveal-header",
      { y: 30, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out", stagger: 0.1 }
    );

    tl.fromTo(".reveal-card",
      { y: 40, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out", stagger: 0.1 },
      "-=0.5"
    );
  }, { scope: containerRef, dependencies: [data, loading] });

  if (loading || !data) {
    return (
        <div className="h-[500px] bg-[#020202] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#FFD700] border-t-transparent rounded-full animate-spin" />
        </div>
    );
  }

  return (
    <section className={`relative w-full py-10 flex flex-col justify-center items-center overflow-hidden ${THEME.background} selection:bg-[#FFD700]/30`}>
      
      {/* FX sutil */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#FFD700]/5 rounded-full blur-[100px] opacity-30 pointer-events-none" />

      <div ref={containerRef} className="relative z-10 w-full max-w-6xl mx-auto px-6">
        
        {/* Cabeçalho Compacto */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className={`reveal-header opacity-0 mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border ${THEME.badge.border} ${THEME.badge.background}`}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD700] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FFD700]"></span>
            </span>
            <span className={`text-[10px] font-bold tracking-[0.2em] uppercase font-mono ${THEME.badge.text}`}>
              {data.header.preTitle}
            </span>
          </div>

          <h2 
            className="reveal-header opacity-0 text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-[1.1] max-w-4xl"
            dangerouslySetInnerHTML={{ __html: data.header.title }}
          />

          <p className="reveal-header opacity-0 text-base md:text-lg text-gray-500 max-w-2xl font-light leading-relaxed">
            {data.header.subtitle}
          </p>
        </div>

        {/* Grid Inteligente com preenchimento eficiente */}
        <div 
          className="grid gap-4 md:gap-5 w-full"
          style={{ 
            // minmax de 280px permite que os cards caibam melhor em telas menores e não estiquem tanto
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" 
          }}
        >
          {data.values.map((value, index) => (
            <div 
              key={index}
              className="reveal-card opacity-0 group relative p-6 md:p-8 rounded-[1.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-[#FFD700]/30 hover:bg-white/[0.04] flex flex-col h-full"
            >
              <div className="mb-4 inline-flex p-3 rounded-xl bg-[#FFD700]/10 text-[#FFD700] group-hover:bg-[#FFD700] group-hover:text-black transition-all duration-500 w-fit">
                <Icon icon={value.icon} width="24" height="24" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                {value.title}
              </h3>
              
              <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light opacity-80 group-hover:opacity-100 transition-opacity">
                {value.description}
              </p>

              {/* Detalhe técnico discreto */}
              <div className="absolute bottom-4 right-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                 <Icon icon={value.icon} width="48" height="48" className="text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}