"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- TIPAGEM ---
export type FinalCTAVariant = 'ecommerce' | 'marketing' | 'sobre';

// Interfaces baseadas no JSON da API
export interface StatItem {
  label: string;
  sublabel: string;
}

export interface CTAData {
  badge: {
    icon: string;
    text: string;
  };
  title: string;
  subtitle: string;
  button: {
    icon: string;
    text: string;
  };
  footer: {
    icon: string;
    text: string;
    // Aceita string ("+40"), array de objetos (Sobre) ou string vazia (Ecommerce)
    stats?: string | StatItem[] | null; 
  };
  layout: string;
}

interface FinalCTAProps {
  variant?: FinalCTAVariant; 
  data: CTAData | null; // Aceita null para evitar crash antes do fetch
}

// --- CONFIGURAÇÃO DE TEMA (VISUAL - HARDCODED) ---
const themeConfig = {
  ecommerce: {
    background: "bg-[#050505]",
    text: {
      primary: "text-white",
      secondary: "text-gray-400",
      accent: "text-yellow-500",
      button: "text-black"
    },
    badge: {
      text: "text-yellow-500",
      bg: ""
    },
    button: {
      bg: "bg-white",
      hover: "hover:bg-yellow-500",
      icon: "text-yellow-500"
    },
    glow: "bg-[#0071E3]/5"
  },
  marketing: {
    background: "bg-[#020202] border-t border-white/5",
    text: {
      primary: "text-white",
      secondary: "text-gray-400",
      accent: "text-transparent bg-clip-text bg-gradient-to-r from-[#FF0F43] to-[#E31B63]",
      button: "text-white"
    },
    badge: {
      text: "text-rose-200/80",
      bg: "border border-rose-500/20 bg-rose-900/10 backdrop-blur-md"
    },
    button: {
      bg: "bg-[#E31B63]",
      hover: "hover:bg-[#ff1758]",
      icon: "text-white"
    },
    glow: "bg-[#E31B63]/10"
  },
  sobre: {
    background: "bg-white",
    text: {
      primary: "text-[#1d1d1f]",
      secondary: "text-gray-500",
      accent: "text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] to-blue-600",
      button: "text-white"
    },
    badge: {
      text: "text-gray-500",
      bg: "border border-gray-200 bg-white shadow-sm"
    },
    button: {
      bg: "bg-[#1d1d1f]",
      hover: "hover:bg-black",
      icon: "text-white"
    },
    glow: "bg-[#0071E3]/5"
  }
};

// --- ANIMAÇÃO COMUM ---
const useFinalCTAAnimations = (sectionRef: React.RefObject<HTMLElement | null>, variant: FinalCTAVariant) => {
  useGSAP(() => {
    if (variant === 'sobre') {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      });

      tl.fromTo(".reveal-final",
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );

      tl.fromTo(".cta-button",
        { scale: 0.9, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.4"
      );
    } else {
      gsap.from(".reveal-final", {
        y: variant === 'ecommerce' ? 20 : 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: variant === 'ecommerce' ? "power2.out" : "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: variant === 'ecommerce' ? "top 85%" : "top 80%",
        },
      });
    }
  }, { scope: sectionRef });
};

export function ChamadaAcao({ variant = 'ecommerce', data }: FinalCTAProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const theme = themeConfig[variant];

  // Fallback de segurança caso data venha null
  if (!data) return null;

  useFinalCTAAnimations(sectionRef, variant);

  const getLink = () => {
    switch(variant) {
      case 'ecommerce': return "https://api.whatsapp.com/send?phone=5514991779502&text=Quero%20solicitar%20meu%20diagn%C3%B3stico%20comercial%20personalizado.";
      case 'marketing': return "https://api.whatsapp.com/send?phone=5514991779502&text=Quero%20construir%20uma%20m%C3%A1quina%20de%20vendas%20previs%C3%ADvel%20com%20a%20Tegbe.";
      default: return "https://api.whatsapp.com/send?phone=5514991779502&text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20diagn%C3%B3stico%20estrat%C3%A9gico%20para%20avaliar%20meu%20neg%C3%B3cio.";
    }
  };

  const ButtonCTA = () => (
    <a
      aria-label={data.button.text.toLowerCase()}
      href={getLink()}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group relative flex items-center justify-center gap-3 
        ${variant === 'sobre' ? 'cta-button' : ''}
        ${variant === 'sobre' ? 'px-10 py-5' : variant === 'marketing' ? 'px-10 py-5' : 'px-8 py-4'}
        ${theme.button.bg} ${theme.text.button} font-bold rounded-full transition-all duration-300 
        ${theme.button.hover} hover:scale-[1.02] active:scale-[0.98]
        ${variant === 'marketing' ? 'shadow-xl border border-white/10' : ''}
        ${variant === 'sobre' ? 'hover:shadow-2xl' : ''}
      `}
    >
      <span className={`${variant === 'marketing' ? 'text-base sm:text-lg' : variant === 'sobre' ? 'text-lg tracking-wide' : 'text-sm sm:text-base'}`}>
        {data.button.text}
      </span>
      <Icon
        icon={data.button.icon}
        className={`
          ${variant === 'sobre' ? 'w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-[#0071E3] transition-colors' : ''}
          ${variant === 'marketing' ? 'w-5 h-5 group-hover:translate-x-1 transition-transform' : ''}
          ${variant === 'ecommerce' ? 'w-4 h-4 group-hover:translate-x-1 transition-transform' : ''}
        `}
      />
    </a>
  );

  const GlowEffect = () => (
    <div className={`
      absolute -inset-1 bg-gradient-to-r rounded-full opacity-40 blur-lg group-hover:opacity-70 transition duration-500
      ${variant === 'marketing' ? 'from-[#FF0F43] to-[#D90429]' : ''}
      ${variant === 'sobre' ? 'top-4 left-0 right-0 h-full bg-[#0071E3]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' : ''}
    `} />
  );

  return (
    <section
      ref={sectionRef}
      className={`
        py-24 w-full flex flex-col justify-center items-center px-6 relative overflow-hidden
        ${variant === 'marketing' ? 'border-t border-white/5' : ''}
        ${theme.background}
        ${variant === 'sobre' ? 'md:py-32' : ''}
      `}
    >
      {/* Efeitos de background */}
      {variant === 'marketing' && (
        <>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#E31B63]/10 rounded-full blur-[120px] pointer-events-none" />
        </>
      )}

      {variant === 'sobre' && (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#0071E3]/5 rounded-full blur-[120px] pointer-events-none" />
        </>
      )}

      {(variant === 'ecommerce' || variant === 'sobre') && (
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 ${variant === 'ecommerce' ? 'w-[600px] h-[300px]' : 'w-[800px] h-[500px]'} ${theme.glow} rounded-full blur-[100px] pointer-events-none`} />
      )}

      <div className={`container relative z-10 ${variant === 'sobre' ? 'max-w-4xl' : variant === 'marketing' ? 'max-w-5xl' : 'max-w-4xl'}`}>
        <div className="flex flex-col items-center text-center w-full">

          {/* Badge */}
          <div className={`
            reveal-final mb-8 inline-flex items-center gap-2 
            ${variant === 'sobre' ? 'px-4 py-2 rounded-full' : 'px-3 py-1.5 rounded-full'}
            ${variant === 'sobre' ? 'border border-gray-200 bg-white shadow-sm' : theme.badge.bg}
          `}>
            {variant === 'sobre' && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            )}

            {variant === 'marketing' && data.badge.icon && (
              <Icon icon={data.badge.icon} className={`${variant === 'marketing' ? 'text-[#FF0F43]' : ''} w-4 h-4`} />
            )}

            <span className={`
              ${variant === 'marketing' ? 'text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase' : ''}
              ${variant === 'ecommerce' ? 'text-yellow-500 font-bold tracking-[0.2em] uppercase text-[10px]' : ''}
              ${variant === 'sobre' ? 'text-xs font-mono text-gray-500 tracking-wider uppercase' : ''}
              ${theme.badge.text}
            `} dangerouslySetInnerHTML={{ __html: data.badge.text }} />
          </div>

          {/* Título */}
          <h1 className={`
            reveal-final font-bold mb-6 leading-tight tracking-tight
            ${variant === 'marketing' ? 'text-3xl sm:text-5xl md:text-7xl mb-8 leading-[1.1]' : ''}
            ${variant === 'sobre' ? 'text-4xl sm:text-5xl md:text-7xl mb-6 leading-[1.1] text-[#1d1d1f]' : ''}
            ${variant === 'ecommerce' ? 'text-3xl sm:text-5xl md:text-6xl mb-6 leading-tight' : ''}
            ${theme.text.primary}
          `} dangerouslySetInnerHTML={{ __html: data.title }} />

          {/* Subtítulo */}
          <p className={`
            reveal-final font-light leading-relaxed mb-10
            ${variant === 'marketing' ? 'text-base sm:text-xl mb-12 max-w-2xl' : ''}
            ${variant === 'sobre' ? 'text-lg mb-12 max-w-2xl font-medium' : ''}
            ${variant === 'ecommerce' ? 'text-base sm:text-lg max-w-xl' : ''}
            ${theme.text.secondary}
          `} dangerouslySetInnerHTML={{ __html: data.subtitle }} />

          {/* Botão CTA */}
          <div className="reveal-final flex flex-col items-center gap-5">
            {variant === 'marketing' ? (
              <div className="group relative">
                <GlowEffect />
                <ButtonCTA />
              </div>
            ) : variant === 'sobre' ? (
              <div className="cta-button group relative">
                <GlowEffect />
                <ButtonCTA />
              </div>
            ) : (
              <ButtonCTA />
            )}

            {/* Footer/Rodapé */}
            <div className={`
              flex items-center gap-2
              ${variant === 'marketing' ? 'opacity-60 hover:opacity-100 transition-opacity cursor-default' : ''}
              ${variant === 'ecommerce' ? 'opacity-50' : ''}
              ${variant === 'sobre' ? 'mt-12 gap-8 md:gap-12 opacity-70' : ''}
            `}>
              {/* Lógica para Marketing (String Stats) */}
              {variant === 'marketing' && (
                <>
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gray-700 border border-black"></div>
                    <div className="w-6 h-6 rounded-full bg-gray-600 border border-black"></div>
                    <div className="w-6 h-6 rounded-full bg-gray-500 border border-black flex items-center justify-center text-[8px] font-bold">
                        {typeof data.footer.stats === 'string' ? data.footer.stats : '+40'}
                    </div>
                  </div>
                  <span className="text-[11px] text-gray-400 font-medium tracking-wide uppercase">
                    {data.footer.text}
                  </span>
                </>
              )}

              {/* Lógica para Ecommerce (Sem Stats) */}
              {variant === 'ecommerce' && (
                <>
                  {data.footer.icon && (
                    <Icon icon={data.footer.icon} className="text-yellow-500 w-4 h-4" />
                  )}
                  <span className="text-[11px] text-gray-400 font-medium tracking-wide uppercase">
                    {data.footer.text}
                  </span>
                </>
              )}

              {/* Lógica para Sobre (Array Stats) */}
              {variant === 'sobre' && Array.isArray(data.footer.stats) && (
                <>
                  {data.footer.stats.map((stat, idx) => (
                    <div key={idx} className="flex items-center gap-8 md:gap-12">
                        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                            <span className="text-[#1d1d1f] font-bold text-lg">{stat.label}</span>
                            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">{stat.sublabel}</span>
                        </div>
                        {/* Renderiza o divisor apenas se não for o último item */}
                        {idx < (data.footer.stats as StatItem[]).length - 1 && (
                            <div className="h-8 w-[1px] bg-gray-300"></div>
                        )}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}