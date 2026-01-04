"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";

// --- TIPAGEM ---
type HeadlineVariant = 'home' | 'ecommerce' | 'marketing' | 'sobre';

// Interface para dados da API
export interface HeadlineApiData {
  badge?: {
    icon?: string;
    text?: string;
    visible?: boolean;
  };
  title?: {
    // Para variante home
    intro?: string;
    animatedWords?: Array<{ text: string; color: string }>;
    main?: string;
    // Para outras variantes
    line1?: string;
    line2?: string;
    line3?: string;
  };
  subtitle?: string;
  button?: {
    text?: string;
    link?: string;
    icon?: string;
    visible?: boolean;
  };
  agenda?: {
    text?: string;
    visible?: boolean;
    iconColor?: string;
  };
  variant?: HeadlineVariant;
}

interface HeadlineProps {
  variant?: HeadlineVariant;
  data?: HeadlineApiData;
}

// --- TIPOS INTERNOS DO COMPONENTE ---
interface AnimatedTitle {
  intro: string;
  animatedWords: { text: string; color: string }[];
  main: string;
  separator: string;
  classes: {
    container: string;
    introLine: string;
    mainTitle: string;
  };
}

interface StaticTitle {
  line1: string;
  line2: string;
  line3: string;
  classes: {
    container: string;
    introLine: string;
    mainTitle: string;
  };
}

interface BadgeConfig {
  icon: string;
  text: string;
  visible: boolean;
  classes: string;
}

interface ButtonConfig {
  text: string;
  link: string;
  icon: string;
  visible: boolean;
  classes: string;
}

interface AgendaConfig {
  text: string;
  visible: boolean;
  iconColor: string;
}

interface HeadlineContent {
  badge: BadgeConfig;
  title: AnimatedTitle | StaticTitle;
  subtitle: string;
  button: ButtonConfig;
  agenda: AgendaConfig;
}

// --- CONFIGURAÇÃO DE CORES (THEME) ---
const themeConfig = {
  home: {
    primary: "#FFCC00",
    selection: "selection:bg-yellow-500/30",
    badge: {
      icon: "text-[#FFCC00]",
      border: "border-white/10",
      bg: "bg-white/5"
    },
    spotlight: "bg-blue-900/20",
    button: {
      glow: "from-yellow-600 to-yellow-400",
      bg: "bg-[#FFCC00]",
      hover: "hover:bg-[#ffdb4d]",
      border: "border-yellow-500/20"
    },
    text: {
      highlight: "border-b border-yellow-500/50",
      shadow: "drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
    }
  },
  ecommerce: {
    primary: "#FFCC00",
    selection: "selection:bg-yellow-500/30",
    badge: {
      icon: "text-[#FFCC00]",
      border: "border-white/10",
      bg: "bg-white/5"
    },
    spotlight: "bg-blue-900/20",
    button: {
      glow: "from-yellow-600 to-yellow-400",
      bg: "bg-[#FFCC00]",
      hover: "hover:bg-[#ffdb4d]",
      border: "border-yellow-500/20"
    },
    text: {
      highlight: "border-b border-yellow-500/50",
      shadow: "drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
    }
  },
  marketing: {
    primary: "#E31B63",
    selection: "selection:bg-rose-500/30",
    badge: {
      icon: "text-[#FF0F43]",
      border: "border-rose-500/10",
      bg: "bg-rose-900/5"
    },
    spotlight: "bg-[#D90429]/15",
    button: {
      glow: "from-[#FF0F43] to-[#990033]",
      bg: "bg-[#E60045]",
      hover: "hover:bg-[#ff1758]",
      border: "border-rose-500/20"
    },
    text: {
      highlight: "border-b border-rose-500/50",
      shadow: "drop-shadow-[0_0_20px_rgba(227,27,99,0.4)]"
    }
  },
  sobre: {
    primary: "#0071E3",
    selection: "selection:bg-blue-500/30",
    badge: {
      icon: "text-[#0071E3]",
      border: "border-blue-500/10",
      bg: "bg-blue-900/5"
    },
    spotlight: "bg-blue-900/20",
    button: {
      glow: "from-blue-600 to-blue-400",
      bg: "bg-[#0071E3]",
      hover: "hover:bg-[#1a81eb]",
      border: "border-blue-500/20"
    },
    text: {
      highlight: "border-b border-blue-500/50",
      shadow: "drop-shadow-[0_0_15px_rgba(0,113,227,0.4)]"
    }
  }
};

// --- CONFIGURAÇÃO DE CONTEÚDO PADRÃO ---
const defaultContentConfig: Record<HeadlineVariant, HeadlineContent> = {
  home: {
    badge: {
      icon: "mdi:check-decagram",
      text: "Consultoria Oficial Mercado Livre",
      visible: true,
      classes: "mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-inner"
    },
    title: {
      intro: "O seu negócio não precisa de mais",
      animatedWords: [
        { text: "CURTIDAS", color: "text-[#FFCC00]" },
        { text: "SEGUIDORES", color: "text-[#FFCC00]" },
        { text: "PLANILHAS", color: "text-red-500" },
        { text: "TEORIAS", color: "text-gray-400" }
      ],
      main: "PRECISA<br/>VENDER MAIS",
      separator: "<br className='hidden sm:block'/>",
      classes: {
        container: "max-w-5xl mx-auto mb-8",
        introLine: "flex text-xl sm:text-2xl md:text-3xl lg:text-4xl flex-col sm:flex-row font-medium text-gray-400 mb-2 sm:mb-4 tracking-tight",
        mainTitle: "text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white leading-[0.9] mt-2"
      }
    },
    subtitle: "A única assessoria com selo Oficial que <strong class='text-gray-100 font-medium border-b border-yellow-500/50 pb-0.5'>assume o operacional</strong> da sua loja. Pare de perder tempo com gestão técnica e foque apenas no lucro.",
    button: {
      text: "QUERO VENDER AGORA",
      link: "https://api.whatsapp.com/send?phone=5514991779502&text=Quero%20come%C3%A7ar%20a%20vender%20agora.%20Podemos%20conversar%20sobre%20uma%20estrat%C3%A9gia%20imediata?",
      icon: "lucide:arrow-right",
      visible: true,
      classes: "px-10 py-7 rounded-full bg-[#FFCC00] text-black font-bold text-lg tracking-tight hover:bg-[#ffdb4d] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[inset_0px_1px_0px_rgba(255,255,255,0.4)] border border-yellow-500/20 flex items-center gap-3"
    },
    agenda: {
      text: "Agenda de Janeiro aberta",
      visible: true,
      iconColor: "bg-green-500"
    }
  },
  ecommerce: {
    badge: {
      icon: "mdi:check-decagram",
      text: "Consultoria Oficial Mercado Livre",
      visible: true,
      classes: "mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-inner"
    },
    title: {
      line1: "Sua marca não foi feita para ficar parada.",
      line2: "ELA FOI FEITA",
      line3: "PARA VENDER.",
      classes: {
        container: "max-w-5xl mx-auto mb-8",
        introLine: "flex text-xl sm:text-2xl md:text-3xl lg:text-4xl justify-center flex-col sm:flex-row font-medium text-gray-400 mb-2 sm:mb-4 tracking-tight",
        mainTitle: "text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white leading-[0.9] mt-2"
      }
    },
    subtitle: "Unimos tecnologia, gestão de elite e as <strong class='text-gray-100 font-medium border-b border-yellow-500/50 pb-0.5'>estratégias de quem domina os algoritmos</strong>. Se o seu objetivo é ver o gráfico de vendas subir todos os dias, você está no lugar certo.",
    button: {
      text: "QUERO VENDER MAIS AGORA",
      link: "https://api.whatsapp.com/send?phone=5514991779502&text=Quero%20come%C3%A7ar%20a%20vender%20agora.%20Podemos%20conversar%20sobre%20uma%20estrat%C3%A9gia%20imediata?",
      icon: "lucide:arrow-right",
      visible: true,
      classes: "px-10 py-7 rounded-full bg-[#FFCC00] text-black font-bold text-lg tracking-tight hover:bg-[#ffdb4d] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[inset_0px_1px_0px_rgba(255,255,255,0.4)] border border-yellow-500/20 flex items-center gap-3"
    },
    agenda: {
      text: "Agenda de Janeiro aberta",
      visible: true,
      iconColor: "bg-green-500"
    }
  },
  marketing: {
    badge: {
      icon: "mdi:check-decagram",
      text: "Kommo Gold Partner",
      visible: true,
      classes: "mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/10 bg-rose-900/5 backdrop-blur-sm"
    },
    title: {
      line1: "O fim das métricas de vaidade",
      line2: "CONVERTA TRÁFEGO",
      line3: "EM RECEITA REAL.",
      classes: {
        container: "max-w-4xl mx-auto mb-6",
        introLine: "text-sm md:text-base font-medium text-gray-500 mb-3 tracking-widest uppercase",
        mainTitle: "text-4xl sm:text-6xl md:text-[5.5rem] font-bold tracking-tight text-white leading-[1.1]"
      }
    },
    subtitle: "Sem hacks. Sem promessas vazias. Apenas a engenharia exata para transformar cliques em contratos assinados no seu CRM.",
    button: {
      text: "Estruturar meu Comercial",
      link: "https://api.whatsapp.com/send?phone=5514991779502&text=Preciso%20estruturar%20meu%20time%20comercial%20e%20quero%20a%20ajuda%20da%20Tegbe.",
      icon: "lucide:arrow-right",
      visible: true,
      classes: "px-8 py-4 rounded-full bg-[#E60045] text-white font-bold text-sm md:text-base tracking-wide hover:bg-[#ff1758] hover:scale-[1.01] active:scale-[0.99] transition-all border border-rose-500/20 flex items-center gap-2"
    },
    agenda: {
      text: "Agenda de Consultoria Aberta",
      visible: true,
      iconColor: "bg-green-500"
    }
  },
  sobre: {
    badge: {
      icon: "mdi:star-shooting",
      text: "Cultura de Excelência",
      visible: true,
      classes: "mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/10 bg-blue-900/5 backdrop-blur-md shadow-inner"
    },
    title: {
      line1: "Não somos uma agência, somos",
      line2: "SEU BRAÇO",
      line3: "DIREITO ESTRATÉGICO",
      classes: {
        container: "max-w-5xl mx-auto mb-8",
        introLine: "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-gray-400 mb-4 tracking-tight",
        mainTitle: "text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white leading-[0.9]"
      }
    },
    subtitle: "Somos o parceiro que constrói o futuro da sua operação com <strong class='text-gray-100 font-medium border-b border-blue-500/50 pb-0.5'>estratégia, tecnologia e execução</strong>. Do equity à governança, aceleramos seu growth de ponta a ponta.",
    button: {
      text: "CONHECER A TEGBE",
      link: "#historia",
      icon: "lucide:users",
      visible: true,
      classes: "px-10 py-7 rounded-full bg-[#0071E3] text-white font-bold text-lg tracking-tight hover:bg-[#1a81eb] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[inset_0px_1px_0px_rgba(255,255,255,0.4)] border border-blue-500/20 flex items-center gap-3"
    },
    agenda: {
      text: "Disponível para Parcerias",
      visible: true,
      iconColor: "bg-blue-500"
    }
  }
};

// --- CONFIGURAÇÃO GLOBAL ---
const globalConfig = {
  animationInterval: 2500,
  effects: {
    grid: true,
    spotlight: true,
    bottomShadow: true
  }
};

// --- TYPE GUARDS ---
function isAnimatedTitle(title: any): title is AnimatedTitle {
  return 'animatedWords' in title;
}

function mergeWithDefault(variant: HeadlineVariant, apiData?: HeadlineApiData): HeadlineContent {
  const defaultContent = defaultContentConfig[variant];
  
  if (!apiData) return defaultContent;

  // Determinar qual variante usar (API pode sobrescrever)
  const actualVariant = apiData.variant || variant;
  const themeVariant = themeConfig[actualVariant] || themeConfig[variant];
  
  // Mesclar dados
  const mergedContent: HeadlineContent = {
    badge: {
      ...defaultContent.badge,
      ...(apiData.badge?.icon && { icon: apiData.badge.icon }),
      ...(apiData.badge?.text && { text: apiData.badge.text }),
      ...(apiData.badge?.visible !== undefined && { visible: apiData.badge.visible }),
    },
    title: defaultContent.title,
    subtitle: apiData.subtitle || defaultContent.subtitle,
    button: {
      ...defaultContent.button,
      ...(apiData.button?.text && { text: apiData.button.text }),
      ...(apiData.button?.link && { link: apiData.button.link }),
      ...(apiData.button?.icon && { icon: apiData.button.icon }),
      ...(apiData.button?.visible !== undefined && { visible: apiData.button.visible }),
    },
    agenda: {
      ...defaultContent.agenda,
      ...(apiData.agenda?.text && { text: apiData.agenda.text }),
      ...(apiData.agenda?.visible !== undefined && { visible: apiData.agenda.visible }),
      ...(apiData.agenda?.iconColor && { iconColor: apiData.agenda.iconColor }),
    }
  };

  // Mesclar título com base no tipo
  if (isAnimatedTitle(defaultContent.title) && apiData.title) {
    // Para título animado (variante home)
    const animatedTitle = defaultContent.title as AnimatedTitle;
    mergedContent.title = {
      ...animatedTitle,
      ...(apiData.title.intro && { intro: apiData.title.intro }),
      ...(apiData.title.animatedWords && { animatedWords: apiData.title.animatedWords }),
      ...(apiData.title.main && { main: apiData.title.main }),
    };
  } else if (apiData.title) {
    // Para título estático
    const staticTitle = defaultContent.title as StaticTitle;
    mergedContent.title = {
      ...staticTitle,
      ...(apiData.title.line1 && { line1: apiData.title.line1 }),
      ...(apiData.title.line2 && { line2: apiData.title.line2 }),
      ...(apiData.title.line3 && { line3: apiData.title.line3 }),
    };
  }

  return mergedContent;
}

export function Headline({ variant = 'home', data }: HeadlineProps) {
  const [wordIndex, setWordIndex] = useState(0);
  
  // Mesclar dados da API com padrão
  const mergedContent = mergeWithDefault(variant, data);
  const theme = themeConfig[variant];
  const content = mergedContent;

  // Configuração da animação apenas para a variante 'home'
  useEffect(() => {
    if (variant !== 'home') return;

    const title = content.title;
    if (!isAnimatedTitle(title)) return;

    const interval = setInterval(() => {
      setWordIndex((prevIndex) => (prevIndex + 1) % title.animatedWords.length);
    }, globalConfig.animationInterval);

    return () => clearInterval(interval);
  }, [variant, content]);

  // Função para renderizar HTML com segurança
  const renderHTML = (htmlString: string) => {
    return { __html: htmlString };
  };

  return (
    <section className={`relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#020202] ${theme.selection} pt-[80px] pb-[20px]`}>
      {/* --- CAMADA 1: Efeitos Visuais --- */}
      {globalConfig.effects.grid && (
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>
      )}

      {globalConfig.effects.spotlight && (
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] ${theme.spotlight} rounded-full blur-[120px] opacity-40 mix-blend-screen pointer-events-none`} />
      )}

      {globalConfig.effects.bottomShadow && (
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020202] to-transparent z-10" />
      )}

      {/* --- CAMADA 2: Conteúdo Principal --- */}
      <div className="container relative z-20 px-4 md:px-6 flex flex-col items-center text-center">

        {/* Badge Oficial */}
        {content.badge.visible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={content.badge.classes}
          >
            <Icon icon={content.badge.icon} className={`${theme.badge.icon} w-4 h-4`} />
            <span className="text-[11px] md:text-xs font-semibold tracking-widest text-gray-300 uppercase">
              {content.badge.text}
            </span>
          </motion.div>
        )}

        {/* Headline Principal - Renderização Condicional */}
        <div className={content.title.classes.container}>
          {isAnimatedTitle(content.title) ? (
            <>
              {/* Variant HOME com animação de palavras */}
              <h2 className={content.title.classes.introLine}>
                {content.title.intro}{" "}
                <span className="flex justify-center items-center h-auto w-auto overflow-hidden ml-2">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={wordIndex}
                      initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
                      animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                      exit={{ y: "-100%", opacity: 0, filter: "blur(10px)" }}
                      transition={{ type: "spring", stiffness: 50, damping: 20, mass: 1 }}
                      className={`col-start-1 row-start-1 ${content.title.animatedWords[wordIndex].color} font-bold tracking-tight block whitespace-nowrap`}
                    >
                      {content.title.animatedWords[wordIndex].text}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h2>

              <motion.h1
                className={content.title.classes.mainTitle}
                dangerouslySetInnerHTML={renderHTML(content.title.main)}
              />
            </>
          ) : (
            <>
              {/* Variants ECOMMERCE, MARKETING, SOBRE - sem animação */}
              <h2 className={content.title.classes.introLine}>
                {content.title.line1}
              </h2>

              <motion.h1 className={content.title.classes.mainTitle}>
                {content.title.line2} <br className="hidden sm:block" />
                <span className={theme.text.shadow}>
                  {content.title.line3}
                </span>
              </motion.h1>
            </>
          )}
        </div>

        {/* Subtítulo */}
        <motion.p
          className="max-w-2xl mx-auto text-base sm:text-xl text-gray-400 leading-relaxed mb-12 font-light tracking-wide"
          dangerouslySetInnerHTML={renderHTML(content.subtitle)}
        />

        {/* Botão CTA e Agenda */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col items-center gap-6"
        >
          {content.button.visible && (
            <a
              aria-label={content.button.text.toLowerCase()}
              href={content.button.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
            >
              {/* Glow effect atrás do botão */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${theme.button.glow} rounded-full opacity-30 blur-lg group-hover:opacity-60 transition duration-500`}></div>

              <Button
                aria-label={content.button.text.toLowerCase()}
                className={content.button.classes}
              >
                {content.button.text}
                <Icon
                  icon={content.button.icon}
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                />
              </Button>
            </a>
          )}

          {content.agenda.visible && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className={`w-2 h-2 rounded-full ${content.agenda.iconColor} animate-pulse`} />
              <span>{content.agenda.text}</span>
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}