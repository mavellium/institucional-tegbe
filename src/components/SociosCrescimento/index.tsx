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
type ValuePropositionVariant = 'marketing' | 'sobre';

interface ValuePropositionProps {
  variant?: ValuePropositionVariant; // Default: 'marketing'
}

// --- CONFIGURAÇÃO DE TEMA ---
const themeConfig = {
  marketing: {
    background: "bg-white",
    text: {
      primary: "text-black",
      secondary: "text-gray-700",
      gradient: "from-[#0071E3] to-[#00a2ff]"
    },
    badge: null,
    lighting: {
      noise: false,
      spotlight: false,
      border: false
    }
  },
  sobre: {
    background: "bg-[#020202]",
    text: {
      primary: "text-white",
      secondary: "text-gray-400",
      gradient: "from-blue-500 via-blue-400 to-white"
    },
    badge: {
      border: "border-blue-500/20",
      background: "bg-blue-900/10 backdrop-blur-sm",
      dot: "bg-blue-500",
      text: "text-blue-400"
    },
    lighting: {
      noise: true,
      spotlight: true,
      border: false
    }
  }
};

// --- CONFIGURAÇÃO DE CONTEÚDO ---
const contentConfig = {
  marketing: {
    header: {
      title: "A Tegbe <span class='text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] to-[#00a2ff]'>não</span> é para você se...",
      preTitle: null
    },
    content: [
      "Você quer apenas 'postar no Instagram' e não se preocupa com vendas.",
      "Você prefere seguir o 'achismo' a aceitar dados e estratégias comprovadas.",
      "Seu negócio não quer crescer, apenas se manter na zona de conforto."
    ],
    values: null,
    layout: "simple"
  },
  sobre: {
    header: {
      preTitle: "Nossa Essência",
      title: "Não fundamos uma agência.<br /><span class='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-white'>Criamos um padrão de excelência.</span>",
      subtitle: "A Tegbe nasceu de uma inquietação: o mercado aceitava o 'bom' como suficiente. Nós não. Somos um time de mentes analíticas obcecadas por elevar a barra do que é possível em performance digital."
    },
    content: null,
    values: [
      {
        title: "Inteligência Estratégica",
        description: "Antes de apertar qualquer botão, nós pensamos. Nossa cultura valoriza o planejamento profundo e a visão de longo prazo em detrimento de hacks imediatistas.",
        icon: "ph:brain-bold",
        color: "blue"
      },
      {
        title: "Mentes de Dono",
        description: "Aqui dentro, ninguém é apenas funcionário. Atuamos com 'Skin in the Game'. Sentimos a dor e a vitória do cliente como se fosse nossa própria operação.",
        icon: "ph:users-three-bold",
        color: "blue"
      },
      {
        title: "Rigor Técnico",
        description: "Rejeitamos o amadorismo. Nossos processos são auditáveis, nossa tecnologia é de ponta e nossa busca por precisão é inegociável.",
        icon: "ph:diamond-bold",
        color: "blue"
      }
    ],
    layout: "grid"
  }
};

// --- COMPONENTE PRINCIPAL ---
export function SociosCrescimento({ variant = 'marketing' }: ValuePropositionProps) {
  const containerRef = useRef(null);
  const theme = themeConfig[variant];
  const content = contentConfig[variant];

  useGSAP(() => {
    if (variant === 'marketing') {
      // Animação simples para marketing
      gsap.from(".reveal-text", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });
    } else {
      // Animação para sobre
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        }
      });

      tl.fromTo(".reveal-header",
        { y: 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out", stagger: 0.1 }
      );

      tl.fromTo(".reveal-card",
        { y: 60, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out", stagger: 0.15 },
        "-=0.6"
      );
    }
  }, { scope: containerRef });

  // Renderização para marketing (layout simples)
  if (variant === 'marketing') {
    return (
      <div ref={containerRef} className="flex flex-col items-center text-center w-full px-4 sm:px-6 lg:px-8">
        <h1 
          className="reveal-text font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-5 md:mb-6 leading-tight tracking-tight text-black max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto"
          dangerouslySetInnerHTML={{ __html: content.header.title }}
        />

        <div className="reveal-text max-w-sm sm:max-w-2xl md:max-w-3xl w-full mb-8 sm:mb-10 space-y-4 sm:space-y-5">
          <p className="text-sm sm:text-md md:text-lg lg:text-xl text-gray-700 font-light leading-relaxed text-center flex flex-col space-y-3 sm:space-y-4">
            {content.content?.map((text, index) => (
              <span key={index} className="block">
                {text}
              </span>
            ))}
          </p>
        </div>
      </div>
    );
  }

  // Renderização para sobre (layout completo com grid)
  return (
    <section className={`relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden ${theme.background} selection:bg-yellow-500/30 pt-[80px]`}>
      {/* Efeitos visuais */}
      {theme.lighting.noise && (
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>
      )}
      
      {theme.lighting.spotlight && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] opacity-40 mix-blend-screen pointer-events-none" />
      )}

      <div ref={containerRef} className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20">
        {/* CABEÇALHO */}
        <div className="flex flex-col items-center text-center mb-16">
          {/* Badge */}
          <div className={`reveal-header opacity-0 mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${theme.badge?.border} ${theme.badge?.background}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${theme.badge?.dot}`}></span>
            </span>
            <span className={`text-[11px] font-bold tracking-[0.2em] uppercase font-mono ${theme.badge?.text}`}>
              {content.header.preTitle}
            </span>
          </div>

          {/* Headline */}
          <h2 
            className="reveal-header opacity-0 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
            dangerouslySetInnerHTML={{ __html: content.header.title }}
          />

          {/* Texto de Apoio */}
          <p className="reveal-header opacity-0 text-lg text-gray-400 max-w-2xl font-light leading-relaxed">
            {"subtitle" in content.header && content.header.subtitle}
          </p>
        </div>

        {/* GRID DE VALORES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.values?.map((value, index) => (
            <div 
              key={index}
              className="reveal-card opacity-0 group relative p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/[0.07] transition-all duration-500 hover:border-blue-500/30"
            >
              <div className="mb-4 inline-flex p-3 rounded-lg bg-blue-600/20 text-blue-400 group-hover:text-blue-300 transition-colors">
                <Icon icon={value.icon} width="28" height="28" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}