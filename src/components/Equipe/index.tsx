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
type WhyTegbeVariant = 'ecommerce' | 'marketing';

interface WhyTegbeProps {
  variant?: WhyTegbeVariant;
}

// --- INTERFACES ESPECÍFICAS ---
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

interface EcommerceContent {
  badge: {
    text: string;
  };
  title: {
    part1: string;
    part2: string;
    highlight: string;
  };
  subtitle: {
    text: string;
    highlight: string;
  };
  cta: {
    text: string;
    icon: string;
  };
  ctaSubtitle: string;
}

interface MarketingContent {
  badge: {
    text: string;
  };
  title: {
    part1: string;
    part2: string;
    gradient: string;
  };
  subtitle: {
    text: string;
    strong1: string;
    strong2: string;
    highlight: string;
  };
  cta: {
    text: string;
    icon: string;
    href: string;
  };
  ctaSubtitle: {
    text: string;
  };
}

// --- CONFIGURAÇÃO DE TEMA ---
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

// --- CONFIGURAÇÃO DE CONTEÚDO ---
const contentConfig: Record<WhyTegbeVariant, EcommerceContent | MarketingContent> = {
  ecommerce: {
    badge: {
      text: "Método Validado Tegbe"
    },
    title: {
      part1: "Por que vender com a ",
      part2: "Tegbe",
      highlight: "e não sozinho?"
    },
    subtitle: {
      text: "Vender sozinho é tentar a sorte. Com a Tegbe, você aplica o método que ",
      highlight: "destrava o faturamento"
    },
    cta: {
      text: "FALAR COM UM ESPECIALISTA",
      icon: "ph:chart-line-up-bold"
    },
    ctaSubtitle: "Plano de guerra para vender mais"
  },
  marketing: {
    badge: {
      text: "Engenharia de Vendas"
    },
    title: {
      part1: "Por que contratar a ",
      part2: "Tegbe",
      gradient: "e não uma agência comum?"
    },
    subtitle: {
      text: "Agências comuns vendem 'posts criativos' e esperam um milagre. Nós instalamos um ",
      strong1: "Ecossistema de Receita",
      strong2: "(Tráfego + CRM + IA) que elimina a sorte e transforma dados em ",
      highlight: "lucro líquido."
    },
    cta: {
      text: "AGENDAR DIAGNÓSTICO",
      icon: "lucide:arrow-right",
      href: "https://api.whatsapp.com/send?phone=5514991779502&text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20diagn%C3%B3stico%20estrat%C3%A9gico%20para%20avaliar%20meu%20neg%C3%B3cio."
    },
    ctaSubtitle: {
      text: "Agenda de Consultoria Liberada"
    }
  }
};

// --- TYPE GUARDS ---
function isMarketingContent(content: EcommerceContent | MarketingContent): content is MarketingContent {
  return 'cta' in content && 'href' in content.cta;
}

function isMarketingTheme(theme: EcommerceTheme | MarketingTheme): theme is MarketingTheme {
  return 'lighting' in theme && 'noise' in theme.lighting;
}

// --- COMPONENTE PARA ECOMMERCE ---
const WhyTegbeEcommerce = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const theme = themeConfig.ecommerce as EcommerceTheme;
  const content = contentConfig.ecommerce as EcommerceContent;

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

          <div className={`reveal-text mb-6 flex items-center gap-2 px-3 py-1 rounded-full border ${theme.badge.border} ${theme.badge.background}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${theme.badge.dot} animate-pulse`}></span>
            <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${theme.badge.text}`}>
              {content.badge.text}
            </span>
          </div>

          <h1 className="reveal-text font-bold text-3xl sm:text-5xl md:text-6xl mb-6 leading-tight tracking-tight text-white max-w-4xl">
            {content.title.part1}<span className={theme.text.highlight}>{content.title.part2}</span> {content.title.highlight}
          </h1>

          <div className="reveal-text max-w-2xl space-y-5 mb-10">
            <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
              {content.subtitle.text}<span className={theme.text.primary}>{content.subtitle.highlight}</span> e domina o algoritmo do Mercado Livre.
            </p>
          </div>

          <div className="reveal-text">
            <a
              aria-label={content.cta.text}
              href="https://api.whatsapp.com/send?phone=5514991779502&text=Gostaria%20de%20falar%20com%20um%20especialista%20da%20Tegbe%20para%20tirar%20algumas%20d%C3%BAvidas."
              target="_blank"
              rel="noopener noreferrer"
              className={`
                group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all duration-300
                ${theme.cta.background} ${theme.cta.text}
                ${theme.cta.hover.background} hover:scale-105 ${theme.cta.hover.shadow}
              `}
            >
              <span>{content.cta.text}</span>
              <Icon
                icon={content.cta.icon}
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
            <p className={`mt-4 text-[11px] ${theme.ctaSubtitle} font-medium tracking-widest uppercase`}>
              {content.ctaSubtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- COMPONENTE PARA MARKETING ---
const WhyTegbeMarketing = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const theme = themeConfig.marketing as MarketingTheme;
  const content = contentConfig.marketing as MarketingContent;

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

          <div className={`reveal-text mb-6 flex items-center gap-2 px-3 py-1.5 rounded-full border ${theme.badge.border} ${theme.badge.background}`}>
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${theme.badge.dot.outer} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${theme.badge.dot.inner}`}></span>
            </span>
            <span className={`text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase ${theme.badge.text}`}>
              {content.badge.text}
            </span>
          </div>

          <h1 className="reveal-text font-bold text-3xl sm:text-5xl md:text-6xl mb-6 leading-tight tracking-tight text-white max-w-4xl">
            {content.title.part1}<span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.text.gradient}`}>{content.title.part2}</span> {content.title.gradient}
          </h1>

          <div className="reveal-text max-w-3xl space-y-5 mb-10">
            <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
              {content.subtitle.text}<strong className="text-white font-medium">{content.subtitle.strong1}</strong> {content.subtitle.strong2}<strong className="text-white border-b border-[#E31B63]">{content.subtitle.highlight}</strong>
            </p>
          </div>

          <div className="reveal-text flex flex-col items-center">
            <a
              aria-label={content.cta.text}
              href={content.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all duration-300
                ${theme.cta.background} ${theme.cta.text}
                ${theme.cta.hover.background} ${theme.cta.hover.text} hover:scale-105 ${theme.cta.hover.shadow}
              `}
            >
              <span>{content.cta.text}</span>
              <Icon
                icon={content.cta.icon}
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <p className={`mt-4 text-[10px] ${theme.ctaSubtitle.text} font-medium tracking-widest uppercase flex items-center gap-2`}>
              <span className={`w-1.5 h-1.5 rounded-full ${theme.ctaSubtitle.dot} animate-pulse`}></span>
              {content.ctaSubtitle.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- COMPONENTE PRINCIPAL ---
export function Equipe({ variant = 'ecommerce' }: WhyTegbeProps) {
  switch (variant) {
    case 'ecommerce':
      return <WhyTegbeEcommerce />;
    case 'marketing':
      return <WhyTegbeMarketing />;
    default:
      return <WhyTegbeEcommerce />;
  }
}