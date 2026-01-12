"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import LogosMKTInvert from "@/components/Logos/LogosMKTInvert";
import LogosMKT from "@/components/Logos/LogosMKT";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- TIPAGEM DE DADOS (API) ---
export interface LogoItemData {
  alt: string;
  src: string;
  width: number;
  height: number;
}

export interface EmpresasDataMarketing {
  badge: {
    icon: string;
    text: string;
  };
  logos: {
    row1: LogoItemData[];
    row2: LogoItemData[];
  };
  title: string;
  footer: string;
  layout: string;
}

export interface EmpresasDataSobre {
  badge: {
    icon: string;
    text: string;
  };
  stats: {
    icon: string;
    label: string;
    description: string;
  };
  title: string;
  subtitle: string;
  footer: {
    label: string;
    linkText: string;
  };
  layout: string;
}

// Union Type para props
type EmpresasVariant = 'marketing' | 'sobre';

interface EmpresasProps {
  variant?: EmpresasVariant;
  data: EmpresasDataMarketing | EmpresasDataSobre | null;
}

// --- INTERFACES VISUAIS (TEMA) ---
interface MarketingTheme {
  background: string;
  text: {
    primary: string;
    secondary: string;
    gradient: string;
  };
  badge: {
    border: string;
    background: string;
    icon: string;
    text: string;
  };
  card: {
    background: string;
    border: string;
    hover: string;
  };
  lighting: {
    noise: boolean;
    spotlight: string;
    fade: string;
  };
  stats: {
    value: string;
    label: string;
    show: string;
  };
}

interface SobreTheme {
  background: string;
  text: {
    primary: string;
    secondary: string;
    gradient: string;
  };
  badge: {
    background: string;
    icon: string;
    text: string;
  };
  card: {
    statBackground: string;
    logoBackground: string;
    fade: string;
  };
  lighting: {
    noise: boolean;
    topRight: string;
    bottomLeft: string;
    statGlow: string;
    spotlight: string;
  };
  stats: {
    value: string; 
  };
}

// --- CONFIGURAÇÃO DE TEMA (SOBRE AGORA EM AMARELO) ---
const themeConfig: Record<EmpresasVariant, MarketingTheme | SobreTheme> = {
  marketing: {
    background: "bg-[#020202] border-t border-white/5",
    text: {
      primary: "text-white",
      secondary: "text-gray-400",
      gradient: "from-[#FF0F43] to-[#E31B63]"
    },
    badge: {
      border: "border-rose-500/20",
      background: "bg-rose-950/10 backdrop-blur-md",
      icon: "text-[#E31B63]",
      text: "text-rose-100"
    },
    card: {
      background: "bg-[#0A0A0A]/50 backdrop-blur-sm",
      border: "border-white/10",
      hover: "group-hover:border-[#E31B63]/20"
    },
    lighting: {
      noise: true,
      spotlight: "bg-[#E31B63]/5",
      fade: "from-[#0A0A0A]"
    },
    stats: {
      value: "+R$50M",
      label: "Gerenciados em Ads",
      show: "hidden md:flex"
    }
  },
  sobre: {
    background: "bg-[#F5F5F7]",
    text: {
      primary: "text-[#1d1d1f]",
      secondary: "text-gray-500",
      // GRADIENTE AMARELO MAVELLIUM
      gradient: "from-[#FFCC00] to-[#C59D1F]"
    },
    badge: {
      background: "bg-white border border-gray-200 shadow-sm",
      icon: "text-[#FFCC00]", // Ícone amarelo
      text: "text-gray-500"
    },
    card: {
      statBackground: "bg-[#1d1d1f]",
      logoBackground: "bg-white border border-white shadow-[0_20px_40px_rgba(0,0,0,0.04)]",
      fade: "from-white"
    },
    lighting: {
      noise: false,
      topRight: "bg-gradient-to-b from-gray-200/50 to-transparent",
      bottomLeft: "bg-yellow-50/50", // Luz de fundo amarela sutil
      statGlow: "bg-[#FFCC00]/20", // Brilho amarelo no card de stats
      spotlight: "bg-transparent"
    },
    stats: {
      value: "+40M", 
    }
  }
};

// --- COMPONENTE PARA MARKETING ---
const EmpresasMarketing = ({ data }: { data: EmpresasDataMarketing }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const theme = themeConfig.marketing as MarketingTheme;

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(".reveal-trust", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );

    tl.fromTo(".trust-card", 
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
      "-=0.4"
    );
  }, { scope: sectionRef });

  const marquee1 = [...data.logos.row1, ...data.logos.row1, ...data.logos.row1, ...data.logos.row1];
  const marquee2 = [...data.logos.row2, ...data.logos.row2, ...data.logos.row2, ...data.logos.row2];

  const LogoItem = ({ logo }: { logo: LogoItemData }) => (
    <div className="relative group/logo cursor-pointer grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-125">
      <div className="h-16 md:h-20 w-44 md:w-52 flex items-center justify-center p-2">
        <Image 
            src={logo.src} 
            alt={logo.alt} 
            width={logo.width * 1.5} 
            height={logo.height * 1.5} 
            className="w-full h-full object-contain"
            unoptimized
        />
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className={`relative py-24 px-6 ${theme.background} overflow-hidden`}>
      {theme.lighting.noise && (
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      )}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] ${theme.lighting.spotlight} rounded-full blur-[120px] pointer-events-none`} />
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-3xl">
            <div className={`reveal-trust mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${theme.badge.border} ${theme.badge.background}`}>
              <Icon icon={data.badge.icon} className={`${theme.badge.icon} w-4 h-4`} />
              <span className={`text-[11px] font-bold tracking-[0.2em] uppercase ${theme.badge.text}`}>
                {data.badge.text}
              </span>
            </div>
            <h2 className="reveal-trust text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
              dangerouslySetInnerHTML={{ __html: data.title }}
            />
          </div>
          <div className={`reveal-trust ${theme.stats.show} flex-col items-end border-l border-white/10 pl-8`}>
            <span className="text-5xl font-bold text-white tracking-tighter">{theme.stats.value}</span>
            <span className="text-sm text-gray-400 uppercase tracking-widest mt-1">{theme.stats.label}</span>
          </div>
        </div>
        <div className={`trust-card w-full rounded-[2rem] border ${theme.card.border} ${theme.card.background} overflow-hidden relative group`}>
          <div className={`absolute inset-0 border-2 border-transparent rounded-[2rem] transition-colors duration-500 pointer-events-none z-20 ${theme.card.hover}`} />
          <div className={`absolute inset-y-0 left-0 w-32 bg-gradient-to-r ${theme.lighting.fade} to-transparent z-10 pointer-events-none`} />
          <div className={`absolute inset-y-0 right-0 w-32 bg-gradient-to-l ${theme.lighting.fade} to-transparent z-10 pointer-events-none`} />
          <div className="py-12 flex flex-col gap-10">
            <div className="flex w-full overflow-hidden">
              <motion.div className="flex items-center gap-16 md:gap-24" initial={{ x: 0 }} animate={{ x: "-50%" }} transition={{ repeat: Infinity, ease: "linear", duration: 40 }}>
                {marquee1.map((logo, i) => <LogoItem key={`row1-${i}`} logo={logo} />)}
              </motion.div>
            </div>
            <div className="flex w-full overflow-hidden">
              <motion.div className="flex items-center gap-16 md:gap-24" initial={{ x: "-50%" }} animate={{ x: 0 }} transition={{ repeat: Infinity, ease: "linear", duration: 45 }}>
                {marquee2.map((logo, i) => <LogoItem key={`row2-${i}`} logo={logo} />)}
              </motion.div>
            </div>
          </div>
        </div>
        <div className="reveal-trust mt-6 flex justify-center opacity-60">
          <p className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full bg-[#E31B63] animate-pulse`}></span>
            {data.footer}
          </p>
        </div>
      </div>
    </section>
  );
};

// --- COMPONENTE PARA SOBRE (TOTALMENTE AMARELO) ---
const EmpresasSobre = ({ data }: { data: EmpresasDataSobre }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const theme = themeConfig.sobre as SobreTheme;

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(".reveal-head", { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" });
    tl.fromTo(".logo-card", { y: 60, autoAlpha: 0, scale: 0.98 }, { y: 0, autoAlpha: 1, scale: 1, duration: 1, ease: "power3.out" }, "-=0.4");
    tl.fromTo(".stat-box", { x: -30, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" }, "-=0.6");
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={`py-24 w-full flex flex-col items-center ${theme.background} px-6 relative overflow-hidden`}>
      <div className={`absolute top-0 right-0 w-[600px] h-[600px] ${theme.lighting.topRight} rounded-full blur-[120px] pointer-events-none`} />
      <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] ${theme.lighting.bottomLeft} rounded-full blur-[100px] pointer-events-none`} />

      <div className="container max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-3xl">
            <div className={`reveal-head mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.badge.background}`}>
              <Icon icon={data.badge.icon} className={`${theme.badge.icon} w-6 h-6`} />
              <span className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase">
                {data.badge.text}
              </span>
            </div>
            <h2 className="reveal-head text-4xl md:text-5xl lg:text-6xl font-bold text-[#1d1d1f] tracking-tight leading-[1.05]"
                dangerouslySetInnerHTML={{ __html: data.title }}
            />
          </div>
          <div className="reveal-head hidden md:block max-w-xs text-right pb-2">
            <p className="text-sm text-gray-500 leading-relaxed font-medium">{data.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="stat-box opacity-0 lg:col-span-4 bg-[#1d1d1f] rounded-[2rem] p-10 flex flex-col justify-between text-white relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-[200px] h-[200px] ${theme.lighting.statGlow} rounded-full blur-[80px] group-hover:bg-[#FFCC00]/30 transition-all duration-500`} />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8">
                <Icon icon={data.stats.icon} className="text-white w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium text-gray-300 mb-2">{data.stats.label}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{data.stats.description}</p>
            </div>
            <div className="relative z-10 mt-10">
              <span className="text-6xl lg:text-7xl font-bold tracking-tighter text-white">{theme.stats.value}</span>
              <div className="h-1 w-12 bg-[#FFCC00] mt-4 shadow-[0_0_10px_#FFCC00]"></div>
            </div>
          </div>

          <div className="logo-card opacity-0 lg:col-span-8 bg-white rounded-[2rem] border border-white shadow-[0_20px_40px_rgba(0,0,0,0.04)] p-10 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-6 left-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{data.footer.label}</div>
            <div className="w-full relative py-8">
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              <div className="grid grid-cols-1 gap-12 opacity-90 grayscale hover:grayscale-0 transition-all duration-700">
                <div className="scale-110 md:scale-[1.3] hover:scale-[1.4] transition-transform duration-500 origin-center">
                  <LogosMKT />
                </div>
                <div className="scale-110 md:scale-[1.3] hover:scale-[1.4] transition-transform duration-500 origin-center">
                  <LogosMKTInvert />
                </div>
              </div>
            </div>
            <div className="absolute bottom-6 right-8 flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer group/link">
              <span className="text-xs font-bold text-[#1d1d1f]">{data.footer.linkText}</span>
              <Icon icon="ph:arrow-right" className="w-3 h-3 group-hover/link:translate-x-1 transition-transform"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export function Empresas({ variant = 'marketing', data }: EmpresasProps) {
  if (!data) return null;
  switch (variant) {
    case 'marketing': return <EmpresasMarketing data={data as EmpresasDataMarketing} />;
    case 'sobre': return <EmpresasSobre data={data as EmpresasDataSobre} />;
    default: return <EmpresasMarketing data={data as EmpresasDataMarketing} />;
  }
}