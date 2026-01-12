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
export type WhyTegbeVariant = 'ecommerce' | 'marketing';

// Interface ajustada para o JSON real
export interface WhyTegbeData {
  badge: {
    text: string;
  };
  title: {
    part1: string;
    part2: string;
    gradient?: string;
    highlight?: string;
  };
  subtitle: {
    text: string;
    strong1?: string;
    strong2?: string;
    highlight?: string;
  };
  cta: {
    text: string;
    icon: string;
    href: string;
  };
  // Ajuste crucial: Aceita string (Ecommerce) ou Objeto (Marketing)
  ctaSubtitle: string | { text: string }; 
}

interface WhyTegbeProps {
  variant?: WhyTegbeVariant;
  data: WhyTegbeData;
}

// --- INTERFACES DE TEMA (VISUAL) ---
interface EcommerceTheme {
  background: string;
  border: string;
  text: {
    primary: string;
    secondary: string;
    highlight: string;
  };
  badge: {
    border: string;
    background: string;
    dot: string;
    text: string;
  };
  lighting: {
    topRight: string;
  };
  cta: {
    background: string;
    text: string;
    hover: {
      background: string;
      shadow: string;
    };
  };
  ctaSubtitle: string;
}

interface MarketingTheme {
  background: string;
  border: string;
  text: {
    primary: string;
    secondary: string;
    gradient: string;
  };
  badge: {
    border: string;
    background: string;
    dot: {
      outer: string;
      inner: string;
    };
    text: string;
  };
  lighting: {
    noise: boolean;
    topRight: string;
    bottomLeft: string;
  };
  cta: {
    background: string;
    text: string;
    hover: {
      background: string;
      text: string;
      shadow: string;
    };
  };
  ctaSubtitle: {
    text: string;
    dot: string;
  };
}

// --- CONFIGURAÇÃO DE TEMA (VISUAL - HARDCODED) ---
const themeConfig: Record<WhyTegbeVariant, EcommerceTheme | MarketingTheme> = {
  ecommerce: {
    background: "bg-[#050505]",
    border: "",
    text: {
      primary: "text-white",
      secondary: "text-gray-400",
      highlight: "text-[#FFD700]"
    },
    badge: {
      border: "border-white/5",
      background: "bg-white/5",
      dot: "bg-[#FFD700]",
      text: "text-gray-500"
    },
    lighting: {
      topRight: "bg-[#0071E3]/5"
    },
    cta: {
      background: "bg-white",
      text: "text-black",
      hover: {
        background: "bg-[#FFD700]",
        shadow: "hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]"
      }
    },
    ctaSubtitle: "text-gray-600"
  },
  marketing: {
    background: "bg-[#020202]",
    border: "border-t border-white/5",
    text: {
      primary: "text-white",
      secondary: "text-gray-400",
      gradient: "from-[#FF0F43] to-[#E31B63]"
    },
    badge: {
      border: "border-rose-500/20",
      background: "bg-rose-900/10 backdrop-blur-md",
      dot: {
        outer: "bg-rose-500",
        inner: "bg-[#E31B63]"
      },
      text: "text-rose-200/80"
    },
    lighting: {
      noise: true,
      topRight: "bg-[#E31B63]/10",
      bottomLeft: "bg-[#FF0F43]/5"
    },
    cta: {
      background: "bg-white",
      text: "text-black",
      hover: {
        background: "bg-[#E31B63]",
        text: "text-black",
        shadow: "hover:shadow-[0_0_30px_rgba(227,27,99,0.4)]"
      }
    },
    ctaSubtitle: {
      text: "text-gray-500",
      dot: "bg-emerald-500"
    }
  }
};

// --- COMPONENTE PARA ECOMMERCE ---
const WhyTegbeEcommerce = ({ data }: { data: WhyTegbeData }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const theme = themeConfig.ecommerce as EcommerceTheme;

  // Normaliza o subtítulo do CTA (garante que seja string)
  const ctaSubtitleText = typeof data.ctaSubtitle === 'object' ? data.ctaSubtitle.text : data.ctaSubtitle;

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
      className={`py-24 w-full flex flex-col justify-center items-center ${theme.background} px-6 relative`}
    >
      <div className={`absolute top-0 right-0 w-[400px] h-[400px] ${theme.lighting.topRight} rounded-full blur-[120px] pointer-events-none`} />

      <div className="container max-w-5xl relative z-10">
        <div className="flex flex-col items-center text-center w-full">

          {/* Badge */}
          <div className={`reveal-text mb-6 flex items-center gap-2 px-3 py-1 rounded-full border ${theme.badge.border} ${theme.badge.background}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${theme.badge.dot} animate-pulse`}></span>
            <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${theme.badge.text}`}>
              {data.badge.text}
            </span>
          </div>

          {/* Title */}
          <h1 className="reveal-text font-bold text-3xl sm:text-5xl md:text-6xl mb-6 leading-tight tracking-tight text-white max-w-4xl">
            {data.title.part1}
            <span className={theme.text.highlight}>{data.title.part2}</span> 
            {data.title.highlight || data.title.gradient}
          </h1>

          {/* Subtitle */}
          <div className="reveal-text max-w-2xl space-y-5 mb-10">
            <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
              {data.subtitle.text}
              {/* Highlight (destrava o faturamento) */}
              {data.subtitle.highlight && (
                 <span className={theme.text.primary}>{data.subtitle.highlight}</span>
              )}
              {/* Strong1 (e domina o algoritmo...) - Agora dinâmico */}
              {data.subtitle.strong1 && (
                <span>{data.subtitle.strong1}</span>
              )}
            </p>
          </div>

          {/* CTA */}
          <div className="reveal-text">
            <a
              aria-label={data.cta.text}
              href={data.cta.href || "https://api.whatsapp.com/send?phone=5514991779502"}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all duration-300
                ${theme.cta.background} ${theme.cta.text}
                ${theme.cta.hover.background} hover:scale-105 ${theme.cta.hover.shadow}
              `}
            >
              <span>{data.cta.text}</span>
              <Icon
                icon={data.cta.icon || "lucide:arrow-right"}
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-x-1"
              />
            </a>
            <p className={`mt-4 text-[11px] ${theme.ctaSubtitle} font-medium tracking-widest uppercase`}>
              {ctaSubtitleText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- COMPONENTE PARA MARKETING ---
const WhyTegbeMarketing = ({ data }: { data: WhyTegbeData }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const theme = themeConfig.marketing as MarketingTheme;

  // Normaliza o subtítulo do CTA (extrai .text se for objeto)
  const ctaSubtitleText = typeof data.ctaSubtitle === 'object' ? data.ctaSubtitle.text : data.ctaSubtitle;

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
      className={`py-24 w-full flex flex-col justify-center items-center ${theme.background} px-6 relative ${theme.border} overflow-hidden`}
    >
      {theme.lighting.noise && (
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      )}

      <div className={`absolute top-0 right-0 w-[500px] h-[500px] ${theme.lighting.topRight} rounded-full blur-[120px] pointer-events-none`} />
      <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] ${theme.lighting.bottomLeft} rounded-full blur-[100px] pointer-events-none`} />

      <div className="container max-w-5xl relative z-10">
        <div className="flex flex-col items-center text-center w-full">

          {/* Badge */}
          <div className={`reveal-text mb-6 flex items-center gap-2 px-3 py-1.5 rounded-full border ${theme.badge.border} ${theme.badge.background}`}>
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${theme.badge.dot.outer} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${theme.badge.dot.inner}`}></span>
            </span>
            <span className={`text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase ${theme.badge.text}`}>
              {data.badge.text}
            </span>
          </div>

          {/* Title */}
          <h1 className="reveal-text font-bold text-3xl sm:text-5xl md:text-6xl mb-6 leading-tight tracking-tight text-white max-w-4xl">
            {data.title.part1}
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.text.gradient}`}>
                {data.title.part2}
            </span> 
            {data.title.gradient || data.title.highlight}
          </h1>

          {/* Subtitle */}
          <div className="reveal-text max-w-3xl space-y-5 mb-10">
            <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
              {data.subtitle.text}
              {/* Strong1 (Ecossistema de Receita) */}
              {data.subtitle.strong1 && (
                  <strong className="text-white font-medium">{data.subtitle.strong1}</strong>
              )}
              {/* Strong2 (Tráfego + CRM...) */}
              {data.subtitle.strong2 && (
                   <> {data.subtitle.strong2}</>
              )}
              {/* Highlight (caso exista no futuro) */}
              {data.subtitle.highlight && (
                  <strong className="text-white border-b border-[#E31B63]">{data.subtitle.highlight}</strong>
              )}
            </p>
          </div>

          {/* CTA */}
          <div className="reveal-text flex flex-col items-center">
            <a
              aria-label={data.cta.text}
              href={data.cta.href || "https://api.whatsapp.com/send?phone=5514991779502"}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all duration-300
                ${theme.cta.background} ${theme.cta.text}
                ${theme.cta.hover.background} ${theme.cta.hover.text} hover:scale-105 ${theme.cta.hover.shadow}
              `}
            >
              <span>{data.cta.text}</span>
              <Icon
                icon={data.cta.icon || "lucide:arrow-right"}
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <p className={`mt-4 text-[10px] ${theme.ctaSubtitle.text} font-medium tracking-widest uppercase flex items-center gap-2`}>
              <span className={`w-1.5 h-1.5 rounded-full ${theme.ctaSubtitle.dot} animate-pulse`}></span>
              {ctaSubtitleText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- COMPONENTE PRINCIPAL ---
export function Equipe({ variant = 'ecommerce', data }: WhyTegbeProps) {
  // Segurança
  if (!data) return null;

  switch (variant) {
    case 'ecommerce':
      return <WhyTegbeEcommerce data={data} />;
    case 'marketing':
      return <WhyTegbeMarketing data={data} />;
    default:
      return <WhyTegbeEcommerce data={data} />;
  }
}