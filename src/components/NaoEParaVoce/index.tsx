"use client";

import { useRef, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RejectionCard {
  id: number | string;
  icon: string;
  title: string;
  description: string;
  status_label: string;
  highlight_terms: string[];
}

interface AntiHeroData {
  header: {
    badge: string;
    title_main: string;
    title_highlight: string;
    title_suffix: string;
    description: string;
  };
  rejection_cards: RejectionCard[];
}

export default function MarketingAntiHero({ 
  endpoint = "https://tegbe-dashboard.vercel.app/api/tegbe-institucional/nao-para-voce" 
}: { 
  endpoint?: string 
}) {
  const sectionRef = useRef(null);
  const [data, setData] = useState<AntiHeroData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error("Falha na resposta da API");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Erro ao carregar Filtro de Qualificação:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  useGSAP(() => {
    if (!data || loading) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(".reveal-anti-header", 
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1 }
    );

    tl.fromTo(".anti-card", 
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.5)" }, 
      "-=0.4"
    );
  }, { scope: sectionRef, dependencies: [data, loading] });

  if (loading || !data) return (
    <div className="h-96 bg-[#020202] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#E31B63] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <section ref={sectionRef} className="relative py-24 px-6 bg-[#020202] overflow-hidden border-t border-white/5">
      
      {/* Atmosphere - DNA Mavellium */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E31B63]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10 flex flex-col items-center">
        
        {/* CABEÇALHO ESTRATÉGICO */}
        <div className="text-center mb-16 max-w-4xl">
            <div className="reveal-anti-header mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-950/10 backdrop-blur-md">
                <Icon icon="mdi:filter-variant-remove" className="text-[#E31B63] w-4 h-4" />
                <span className="text-[11px] font-bold tracking-[0.2em] text-red-100 uppercase">
                    {data.header.badge}
                </span>
            </div>

            <h2 className="reveal-anti-header font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-white">
                {data.header.title_main}{" "}
                <span className="relative inline-block text-[#E31B63]">
                    {data.header.title_highlight}
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#E31B63]" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" opacity="0.4" />
                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                </span>{" "}
                {data.header.title_suffix}
            </h2>
            
            <p className="reveal-anti-header mt-6 text-gray-400 text-lg font-light max-w-2xl mx-auto">
                {data.header.description}
            </p>
        </div>

        {/* GRID DE QUALIFICAÇÃO REVERSA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {data.rejection_cards.map((card) => (
                <div 
                    key={card.id} 
                    className="anti-card group relative bg-[#0A0A0A] border border-white/5 p-8 rounded-[2rem] overflow-hidden hover:border-[#E31B63]/50 transition-all duration-500"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-[#E31B63]/0 to-[#E31B63]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="w-14 h-14 rounded-2xl bg-[#E31B63]/10 flex items-center justify-center mb-6 border border-[#E31B63]/20 group-hover:bg-[#E31B63] group-hover:text-white transition-all duration-500 text-[#E31B63]">
                            <Icon icon={card.icon} width="28" height="28" />
                        </div>
                        
                        <h3 className="text-white font-bold text-xl mb-3 group-hover:text-[#E31B63] transition-colors">
                            {card.title}
                        </h3>
                        
                        <p className="text-gray-400 text-sm leading-relaxed font-light">
                            {card.description.split(new RegExp(`(${card.highlight_terms.join('|')})`, 'g')).map((part, i) => (
                                card.highlight_terms.includes(part) ? <strong key={i} className="text-white">{part}</strong> : part
                            ))}
                        </p>

                        <div className="mt-auto pt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                            <span className="text-xs font-bold text-[#E31B63] uppercase tracking-wider flex items-center gap-2">
                                <Icon icon="mdi:close-circle" /> {card.status_label}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}