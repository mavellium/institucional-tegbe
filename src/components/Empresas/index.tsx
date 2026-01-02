"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";
import LogosMKTInvert from "@/components/Logos/LogosMKTInvert";
import LogosMKT from "@/components/Logos/LogosMKT";
import Logos from "@/components/Logos";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- TIPAGEM ---
type TrustSectionVariant = 'marketing' | 'sobre';

interface TrustSectionProps {
  variant?: TrustSectionVariant; // Default: 'marketing'
}

// --- CONFIGURAÇÃO DE TEMA ---
const themeConfig = {
  marketing: {
    background: "bg-[#020202] border-t border-white/5",
    text: {
      primary: "text-white",
      secondary: "text-gray-400",
      gradient: "from-[#FF0F43] to-[#E31B63]"
    },
    badge: {
      background: "border border-white/10 bg-white/5 backdrop-blur-md",
      text: "text-gray-400",
      icon: "bg-white"
    },
    lights: {
      topRight: "bg-[#E31B63]/10",
      bottomLeft: "bg-[#FF0F43]/5"
    }
  },
  sobre: {
    background: "bg-[#F5F5F7]",
    text: {
      primary: "text-[#1d1d1f]",
      secondary: "text-gray-500",
      gradient: "from-[#0071E3] to-[#00a2ff]"
    },
    badge: {
      background: "bg-white border border-gray-200 shadow-sm",
      text: "text-gray-500",
      icon: "text-[#0071E3]"
    },
    lights: {
      topRight: "bg-gradient-to-b from-gray-200/50 to-transparent",
      bottomLeft: "bg-blue-50/50"
    }
  }
};

// --- CONFIGURAÇÃO DE CONTEÚDO ---
const contentConfig = {
  marketing: {
    badge: {
      text: "Hall de Grandes Players",
      icon: true
    },
    title: "Eles confiaram na metodologia e <br className='hidden md:block'/><span class='text-transparent bg-clip-text bg-gradient-to-r from-[#FF0F43] to-[#E31B63]'>escalaram suas operações.</span>",
    subtitle: "",
    stats: null,
    logos: ["Logos", "LogosMKTInvert"]
  },
  sobre: {
    badge: {
      text: "Hall de Clientes",
      icon: "ph:crown-simple-bold"
    },
    title: "Onde os gigantes <br/><span class='text-gray-400'>escolhem escalar.</span>",
    subtitle: "Não colecionamos logos. Colecionamos cases de expansão de market share.",
    stats: {
      value: "+40M",
      label: "Volume Tracionado",
      description: "Soma do faturamento gerado sob nossa gestão direta nos últimos 12 meses.",
      icon: "ph:trend-up-bold"
    },
    logos: ["LogosMKT", "LogosMKTInvert"]
  }
};

// --- ANIMAÇÃO COMUM ---
const useCommonAnimations = (sectionRef: React.RefObject<HTMLElement | null>, variant: TrustSectionVariant) => {
  useGSAP(() => {
    if (variant === 'marketing') {
      // Animação para marketing
      gsap.from(".reveal-text", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current || undefined,
          start: "top 85%",
        },
      });

      gsap.from(".reject-item", {
        x: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".reject-list",
          start: "top 90%",
        }
      });
    } else {
      // Animação para sobre
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        }
      });

      // 1. Título e Badge
      tl.fromTo(".reveal-head", 
        { y: 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );

      // 2. O Card de Logos sobe como um bloco sólido
      tl.fromTo(".logo-card", 
        { y: 60, autoAlpha: 0, scale: 0.98 },
        { y: 0, autoAlpha: 1, scale: 1, duration: 1, ease: "power3.out" },
        "-=0.4"
      );

      // 3. Stat lateral entra
      tl.fromTo(".stat-box",
        { x: -30, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );
    }
  }, { scope: sectionRef });
};

export function Empresas({ variant = 'marketing' }: TrustSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const theme = themeConfig[variant];
  const content = contentConfig[variant];

  useCommonAnimations(sectionRef, variant);

  // Renderização específica para marketing
  if (variant === 'marketing') {
    return (
      <section
        ref={sectionRef}
        className={`py-24 w-full flex flex-col justify-center items-center ${theme.background} px-6 relative`}
      >
        {/* Texture Noise */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

        {/* Luzes de fundo */}
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] ${theme.lights.topRight} rounded-full blur-[120px] pointer-events-none`} />
        <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] ${theme.lights.bottomLeft} rounded-full blur-[100px] pointer-events-none`} />

        <div className="container max-w-6xl relative z-10">
          <div className="flex flex-col items-center text-center w-full">
            {/* Badge */}
            <div className={`reveal-text mb-8 flex items-center gap-2 px-3 py-1.5 rounded-full ${theme.badge.background}`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase">
                {content.badge.text}
              </span>
            </div>

            <h1 
              className="reveal-text font-bold text-3xl sm:text-5xl md:text-6xl mb-12 leading-tight tracking-tight text-white max-w-4xl"
              dangerouslySetInnerHTML={{ __html: content.title }}
            />

            <Logos />
            <LogosMKTInvert />
          </div>
        </div>
      </section>
    );
  }

  // Renderização específica para sobre
  return (
    <section
      ref={sectionRef}
      className={`py-24 w-full flex flex-col items-center ${theme.background} px-6 relative overflow-hidden`}
    >
      {/* Elementos de Fundo */}
      <div className={`absolute top-0 right-0 w-[600px] h-[600px] ${theme.lights.topRight} rounded-full blur-[120px] pointer-events-none`} />
      <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] ${theme.lights.bottomLeft} rounded-full blur-[100px] pointer-events-none`} />

      <div className="container max-w-7xl relative z-10">
        {/* --- HEADER ASSIMÉTRICO --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-3xl">
            <div className={`reveal-head mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.badge.background}`}>
              {typeof content.badge.icon === 'string' && (
                <Icon icon={content.badge.icon} className={`${theme.badge.icon} w-4 h-4`} />
              )}
              <span className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase">
                {content.badge.text}
              </span>
            </div>
            <h2 
              className="reveal-head text-4xl md:text-5xl lg:text-6xl font-bold text-[#1d1d1f] tracking-tight leading-[1.05]"
              dangerouslySetInnerHTML={{ __html: content.title }}
            />
          </div>
          
          {/* Texto de apoio alinhado à direita */}
          <div className="reveal-head hidden md:block max-w-xs text-right pb-2">
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              {content.subtitle}
            </p>
          </div>
        </div>

        {/* --- BENTO GRID DE AUTORIDADE --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* BLOCO 1: O NÚMERO (Ancoragem de Valor) */}
          <div className="stat-box opacity-0 lg:col-span-4 bg-[#1d1d1f] rounded-[2rem] p-10 flex flex-col justify-between text-white relative overflow-hidden group">
            {/* Glow sutil */}
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#0071E3]/20 rounded-full blur-[80px] group-hover:bg-[#0071E3]/30 transition-all duration-500" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                <Icon icon={content.stats!.icon} className="text-white w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-300 mb-2">{content.stats!.label}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {content.stats!.description}
              </p>
            </div>

            <div className="relative z-10 mt-10">
              <span className="text-6xl lg:text-7xl font-bold tracking-tighter text-white">
                {content.stats!.value}
              </span>
              <div className="h-1 w-12 bg-[#0071E3] mt-4"></div>
            </div>
          </div>

          {/* BLOCO 2: OS LOGOS (O Hall) */}
          <div className="logo-card opacity-0 lg:col-span-8 bg-white rounded-[2rem] border border-white shadow-[0_20px_40px_rgba(0,0,0,0.04)] p-10 flex flex-col justify-center relative overflow-hidden">
            
            {/* Label discreto */}
            <div className="absolute top-6 left-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Ecossistema Validado
            </div>

            {/* Container dos Logos com Máscara Suave */}
            <div className="w-full relative py-8">
              {/* Máscaras laterais para o efeito infinito */}
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

              <div className="grid grid-cols-1 gap-12 opacity-80 grayscale hover:grayscale-0 transition-all duration-700">
                {/* Componentes de Logo Originais */}
                <div className="scale-90 hover:scale-100 transition-transform duration-500">
                  <LogosMKT />
                </div>
                <div className="scale-90 hover:scale-100 transition-transform duration-500">
                  <LogosMKTInvert />
                </div>
              </div>
            </div>

            {/* Link sutil no rodapé do card */}
            <div className="absolute bottom-6 right-8 flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer group/link">
              <span className="text-xs font-bold text-[#1d1d1f]">Ver todos os cases</span>
              <Icon icon="ph:arrow-right" className="w-3 h-3 group-hover/link:translate-x-1 transition-transform"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}