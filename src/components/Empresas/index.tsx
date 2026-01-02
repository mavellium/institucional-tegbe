"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import LogosMKTInvert from "@/components/Logos/LogosMKTInvert";
import LogosMKT from "@/components/Logos/LogosMKT";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- TIPAGEM ---
type EmpresasVariant = 'marketing' | 'sobre';

interface EmpresasProps {
  variant?: EmpresasVariant;
}

// --- INTERFACES ESPECÍFICAS ---
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
    label: string;
    description: string;
    icon: string;
    show: string;
  };
}

interface MarketingContent {
  badge: {
    text: string;
    icon: string;
  };
  title: string;
  footer: string;
  layout: "marquee";
  logos: {
    row1: Array<{ src: string; alt: string; width: number; height: number }>;
    row2: Array<{ src: string; alt: string; width: number; height: number }>;
  };
}

interface SobreContent {
  badge: {
    text: string;
    icon: string;
  };
  title: string;
  subtitle: string;
  layout: "bento-grid";
  stats: {
    label: string;
    description: string;
    icon: string;
  };
  footer: {
    label: string;
    linkText: string;
  };
}

// --- CONFIGURAÇÃO DE TEMA ---
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
      gradient: "from-[#0071E3] to-[#00a2ff]"
    },
    badge: {
      background: "bg-white border border-gray-200 shadow-sm",
      icon: "text-[#0071E3]",
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
      bottomLeft: "bg-blue-50/50",
      statGlow: "bg-[#0071E3]/20",
      spotlight: "bg-transparent"
    },
    stats: {
      value: "+40M",
      label: "Volume Tracionado",
      description: "Soma do faturamento gerado sob nossa gestão direta nos últimos 12 meses.",
      icon: "ph:trend-up-bold",
      show: "block"
    }
  }
};

// --- CONFIGURAÇÃO DE CONTEÚDO ---
const contentConfig: Record<EmpresasVariant, MarketingContent | SobreContent> = {
  marketing: {
    badge: {
      text: "Ecossistema Validado",
      icon: "mdi:shield-check"
    },
    title: "Não testamos com o seu dinheiro. <br/><span class='text-transparent bg-clip-text bg-gradient-to-r from-[#FF0F43] to-[#E31B63]'>Validamos com o deles.</span>",
    footer: "Empresas que escalaram acima de 7 dígitos/ano",
    layout: "marquee",
    logos: {
      row1: [
        { src: "/logos/logo1.svg", alt: "Client 1", width: 120, height: 40 },
        { src: "/logos/logo2.svg", alt: "Client 2", width: 120, height: 40 },
        { src: "/logos/logo3.svg", alt: "Client 3", width: 120, height: 40 },
        { src: "/logos/logo4.svg", alt: "Client 4", width: 120, height: 40 },
        { src: "/logos/logo5.svg", alt: "Client 5", width: 120, height: 40 },
      ],
      row2: [
        { src: "/logos/logo6.svg", alt: "Client 6", width: 120, height: 40 },
        { src: "/logos/logo7.svg", alt: "Client 7", width: 120, height: 40 },
        { src: "/logos/logo8.svg", alt: "Client 8", width: 120, height: 40 },
        { src: "/logos/logo9.svg", alt: "Client 9", width: 120, height: 40 },
        { src: "/logos/logo10.svg", alt: "Client 10", width: 120, height: 40 },
      ]
    }
  },
  sobre: {
    badge: {
      text: "Hall de Clientes",
      icon: "ph:crown-simple-bold"
    },
    title: "Onde os gigantes <br/>escolhem escalar.",
    subtitle: "Não colecionamos logos. Colecionamos cases de expansão de market share.",
    layout: "bento-grid",
    stats: {
      label: "Volume Tracionado",
      description: "Soma do faturamento gerado sob nossa gestão direta nos últimos 12 meses.",
      icon: "ph:trend-up-bold"
    },
    footer: {
      label: "Ecossistema Validado",
      linkText: "Ver todos os cases"
    }
  }
};

// --- TYPE GUARDS ---
function isMarketingContent(content: MarketingContent | SobreContent): content is MarketingContent {
  return content.layout === 'marquee';
}

function isMarketingTheme(theme: MarketingTheme | SobreTheme): theme is MarketingTheme {
  return 'card' in theme && 'border' in theme.card;
}

// --- COMPONENTE PARA MARKETING ---
const EmpresasMarketing = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const theme = themeConfig.marketing as MarketingTheme;
  const content = contentConfig.marketing as MarketingContent;

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
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 1, 
        ease: "power2.out",
      },
      "-=0.4"
    );
  }, { scope: sectionRef });

  // Multiplicar logos para marquee
  const marquee1 = [...content.logos.row1, ...content.logos.row1, ...content.logos.row1, ...content.logos.row1];
  const marquee2 = [...content.logos.row2, ...content.logos.row2, ...content.logos.row2, ...content.logos.row2];

  const LogoItem = ({ logo }: { logo: { alt: string } }) => (
    <div className="relative group/logo cursor-pointer grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-110">
      <div className="h-10 md:h-12 w-32 bg-white/10 rounded flex items-center justify-center text-xs text-white">
        {logo.alt}
      </div>
    </div>
  );

  return (
    <section 
      ref={sectionRef} 
      className={`relative py-24 px-6 ${theme.background} overflow-hidden`}
    >
      {theme.lighting.noise && (
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      )}
      
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] ${theme.lighting.spotlight} rounded-full blur-[120px] pointer-events-none`} />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-3xl">
            <div className={`reveal-trust mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${theme.badge.border} ${theme.badge.background}`}>
              <Icon icon={content.badge.icon} className={`${theme.badge.icon} w-4 h-4`} />
              <span className={`text-[11px] font-bold tracking-[0.2em] uppercase ${theme.badge.text}`}>
                {content.badge.text}
              </span>
            </div>
            <h2 
              className="reveal-trust text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
              dangerouslySetInnerHTML={{ __html: content.title }}
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
              <motion.div
                className="flex items-center gap-16 md:gap-24"
                initial={{ x: 0 }}
                animate={{ x: "-50%" }}
                transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
              >
                {marquee1.map((logo, i) => (
                  <LogoItem key={`row1-${i}`} logo={logo} />
                ))}
              </motion.div>
            </div>

            <div className="flex w-full overflow-hidden">
              <motion.div
                className="flex items-center gap-16 md:gap-24"
                initial={{ x: "-50%" }}
                animate={{ x: 0 }}
                transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
              >
                {marquee2.map((logo, i) => (
                  <LogoItem key={`row2-${i}`} logo={logo} />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
        
        <div className="reveal-trust mt-6 flex justify-center opacity-60">
          <p className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full bg-[#E31B63] animate-pulse`}></span>
            {content.footer}
          </p>
        </div>
      </div>
    </section>
  );
};

// --- COMPONENTE PARA SOBRE ---
const EmpresasSobre = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const theme = themeConfig.sobre as SobreTheme;
  const content = contentConfig.sobre as SobreContent;

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(".reveal-head", 
      { y: 40, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );

    tl.fromTo(".logo-card", 
      { y: 60, autoAlpha: 0, scale: 0.98 },
      { y: 0, autoAlpha: 1, scale: 1, duration: 1, ease: "power3.out" },
      "-=0.4"
    );

    tl.fromTo(".stat-box",
      { x: -30, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className={`py-24 w-full flex flex-col items-center ${theme.background} px-6 relative overflow-hidden`}
    >
      <div className={`absolute top-0 right-0 w-[600px] h-[600px] ${theme.lighting.topRight} rounded-full blur-[120px] pointer-events-none`} />
      <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] ${theme.lighting.bottomLeft} rounded-full blur-[100px] pointer-events-none`} />

      <div className="container max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-3xl">
            <div className={`reveal-head mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.badge.background}`}>
              <Icon icon={content.badge.icon} className={`${theme.badge.icon} w-4 h-4`} />
              <span className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase">
                {content.badge.text}
              </span>
            </div>
            <h2 className="reveal-head text-4xl md:text-5xl lg:text-6xl font-bold text-[#1d1d1f] tracking-tight leading-[1.05]">
              {content.title.split('<br/>')[0]}<br/>
              <span className="text-gray-400">{content.title.split('<br/>')[1]}</span>
            </h2>
          </div>
          
          <div className="reveal-head hidden md:block max-w-xs text-right pb-2">
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              {content.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="stat-box opacity-0 lg:col-span-4 bg-[#1d1d1f] rounded-[2rem] p-10 flex flex-col justify-between text-white relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-[200px] h-[200px] ${theme.lighting.statGlow} rounded-full blur-[80px] group-hover:bg-[#0071E3]/30 transition-all duration-500`} />
            
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                <Icon icon={content.stats.icon} className="text-white w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-300 mb-2">{content.stats.label}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {content.stats.description}
              </p>
            </div>

            <div className="relative z-10 mt-10">
              <span className="text-6xl lg:text-7xl font-bold tracking-tighter text-white">
                {theme.stats.value}
              </span>
              <div className="h-1 w-12 bg-[#0071E3] mt-4"></div>
            </div>
          </div>

          <div className="logo-card opacity-0 lg:col-span-8 bg-white rounded-[2rem] border border-white shadow-[0_20px_40px_rgba(0,0,0,0.04)] p-10 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-6 left-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {content.footer.label}
            </div>

            <div className="w-full relative py-8">
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

              <div className="grid grid-cols-1 gap-12 opacity-80 grayscale hover:grayscale-0 transition-all duration-700">
                <div className="scale-90 hover:scale-100 transition-transform duration-500">
                  <LogosMKT />
                </div>
                <div className="scale-90 hover:scale-100 transition-transform duration-500">
                  <LogosMKTInvert />
                </div>
              </div>
            </div>

            <div className="absolute bottom-6 right-8 flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer group/link">
              <span className="text-xs font-bold text-[#1d1d1f]">{content.footer.linkText}</span>
              <Icon icon="ph:arrow-right" className="w-3 h-3 group-hover/link:translate-x-1 transition-transform"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- COMPONENTE PRINCIPAL ---
export function Empresas({ variant = 'marketing' }: EmpresasProps) {
  switch (variant) {
    case 'marketing':
      return <EmpresasMarketing />;
    case 'sobre':
      return <EmpresasSobre />;
    default:
      return <EmpresasMarketing />;
  }
}