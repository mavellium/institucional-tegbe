"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Icon } from '@iconify/react';

// --- TIPAGEM ---
type CompanysVariant = 'ecommerce' | 'marketing';

interface CompanysProps {
  variant?: CompanysVariant;
}

// --- INTERFACES ESPECÍFICAS ---
interface TestimonialItem {
  id: number;
  logo: string;
  name: string;
  description: string;
  result: string;
  metric?: string;
  tags: string[];
}

interface EcommerceTheme {
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
    icon: string;
    text: string;
  };
  lighting: {
    spotlight: string;
  };
  card: {
    background: string;
    border: string;
    hoverBorder: string;
    glow: string;
    decorIcon: {
      color: string;
      hover: string;
    };
  };
  buttons: {
    prevNext: {
      border: string;
      background: string;
      hover: {
        background: string;
        border: string;
        text: string;
      };
    };
    dot: {
      active: string;
      inactive: string;
      shadow: string;
    };
  };
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
    icon: string;
    text: string;
  };
  lighting: {
    noise: boolean;
    spotlight: string;
  };
  card: {
    background: string;
    border: string;
    hoverBorder: string;
    glow: string;
    metricIcon: string;
  };
  buttons: {
    prevNext: {
      border: string;
      background: string;
      hover: {
        background: string;
        border: string;
        text: string;
      };
    };
    dot: {
      active: string;
      inactive: string;
      shadow: string;
    };
  };
}

interface EcommerceContent {
  badge: {
    text: string;
    icon: string;
  };
  title: {
    part1: string;
    part2: string;
  };
  testimonials: TestimonialItem[];
}

interface MarketingContent {
  badge: {
    text: string;
    icon: string;
  };
  title: {
    part1: string;
    part2: string;
  };
  testimonials: TestimonialItem[];
}

// --- CONFIGURAÇÃO DE TEMA ---
const themeConfig: Record<CompanysVariant, EcommerceTheme | MarketingTheme> = {
  ecommerce: {
    background: "bg-[#050505]",
    border: "",
    text: {
      primary: "text-white",
      secondary: "text-gray-500",
      gradient: "from-[#FFCC00] to-yellow-600"
    },
    badge: {
      border: "border-gray-800",
      background: "bg-gray-900/50 backdrop-blur-sm",
      icon: "text-[#FFCC00]",
      text: "text-gray-300"
    },
    lighting: {
      spotlight: "bg-blue-900/10"
    },
    card: {
      background: "bg-[#111111]",
      border: "border-white/5",
      hoverBorder: "border-[#FFCC00]/30",
      glow: "bg-gradient-to-br from-white/5 to-transparent",
      decorIcon: {
        color: "text-gray-800",
        hover: "text-[#FFCC00]/20"
      }
    },
    buttons: {
      prevNext: {
        border: "border-white/10",
        background: "bg-white/5",
        hover: {
          background: "bg-[#FFCC00]",
          border: "border-[#FFCC00]",
          text: "text-black"
        }
      },
      dot: {
        active: "bg-[#FFCC00]",
        inactive: "bg-gray-700",
        shadow: "shadow-[0_0_10px_#FFCC00]"
      }
    }
  },
  marketing: {
    background: "bg-[#020202]",
    border: "border-t border-white/5",
    text: {
      primary: "text-white",
      secondary: "text-gray-500",
      gradient: "from-[#FF0F43] to-[#E31B63]"
    },
    badge: {
      border: "border-rose-500/20",
      background: "bg-rose-900/10 backdrop-blur-sm",
      icon: "text-[#E31B63]",
      text: "text-rose-200/80"
    },
    lighting: {
      noise: true,
      spotlight: "bg-[#E31B63]/10"
    },
    card: {
      background: "bg-[#0A0A0A]",
      border: "border-white/5",
      hoverBorder: "border-[#E31B63]/50",
      glow: "bg-gradient-to-br from-[#E31B63]/5 to-transparent",
      metricIcon: "text-emerald-500"
    },
    buttons: {
      prevNext: {
        border: "border-white/10",
        background: "bg-white/5",
        hover: {
          background: "bg-[#E31B63]",
          border: "border-[#E31B63]",
          text: "text-white"
        }
      },
      dot: {
        active: "bg-[#E31B63]",
        inactive: "bg-gray-800",
        shadow: "shadow-[0_0_8px_#E31B63]"
      }
    }
  }
};

// --- CONFIGURAÇÃO DE CONTEÚDO ---
const contentConfig: Record<CompanysVariant, EcommerceContent | MarketingContent> = {
  ecommerce: {
    badge: {
      text: "Track Record",
      icon: "solar:graph-up-bold"
    },
    title: {
      part1: "Empresas que estão",
      part2: "vendendo conosco."
    },
    testimonials: [
      {
        id: 1,
        logo: "/equipe.png",
        name: "Decora Fest",
        description: "Loja de Decorações • Garça/SP",
        result: "Aumento de 30% nas Vendas",
        tags: ["E-commerce", "Gestão"]
      },
      {
        id: 2,
        logo: "/equipe.png",
        name: "Tech Solutions",
        description: "Tecnologia • São Paulo/SP",
        result: "Redução de 40% no SLA",
        tags: ["Automação", "Processos"]
      },
      {
        id: 3,
        logo: "/equipe.png",
        name: "Bella Moda",
        description: "Moda Feminina • Marília/SP",
        result: "+50% Engajamento Social",
        tags: ["Social Media", "Branding"]
      },
      {
        id: 4,
        logo: "/equipe.png",
        name: "Sabor & Arte",
        description: "Gastronomia • Bauru/SP",
        result: "Aumento de 25% nas Reservas",
        tags: ["Tráfego Local", "Google"]
      },
      {
        id: 5,
        logo: "/equipe.png",
        name: "FitLife Academia",
        description: "Fitness • Ribeirão Preto/SP",
        result: "45% mais Matrículas",
        tags: ["Leads", "Vendas"]
      },
      {
        id: 6,
        logo: "/equipe.png",
        name: "Pet Care Plus",
        description: "Veterinária • Campinas/SP",
        result: "3x Clientes Recorrentes",
        tags: ["CRM", "Fidelização"]
      }
    ]
  },
  marketing: {
    badge: {
      text: "Track Record",
      icon: "mdi:chart-box-outline"
    },
    title: {
      part1: "Empresas que",
      part2: "escalaram conosco."
    },
    testimonials: [
      {
        id: 1,
        logo: "/equipe.png",
        name: "Construtora Viver",
        description: "Imobiliário • SP",
        result: "R$ 4.2Mi em VGV",
        metric: "Em 3 meses de campanha",
        tags: ["Google Ads", "CRM Kommo"]
      },
      {
        id: 2,
        logo: "/equipe.png",
        name: "Dr. Ricardo Silva",
        description: "Clínica de Estética • RJ",
        result: "Agenda Lotada",
        metric: "Custo por Lead: R$ 4,50",
        tags: ["Meta Ads", "Automação"]
      },
      {
        id: 3,
        logo: "/equipe.png",
        name: "Fintech Advance",
        description: "B2B • Nacional",
        result: "300% de ROI",
        metric: "Otimização de Pipeline",
        tags: ["Inbound", "Hubspot"]
      },
      {
        id: 4,
        logo: "/equipe.png",
        name: "Educacional Alpha",
        description: "Infoproduto • Online",
        result: "ROAS de 14x",
        metric: "Lançamento Perpétuo",
        tags: ["Tráfego", "Copywriting"]
      },
      {
        id: 5,
        logo: "/equipe.png",
        name: "Solar Energy",
        description: "Energia Solar • MG",
        result: "-40% no CAC",
        metric: "Qualificação via IA",
        tags: ["Leads", "Vendas"]
      },
      {
        id: 6,
        logo: "/equipe.png",
        name: "Logística Express",
        description: "Serviços • Sul",
        result: "Recorde de Receita",
        metric: "Previsibilidade total",
        tags: ["BI", "Dashboards"]
      }
    ]
  }
};

// --- TYPE GUARDS ---
function isMarketingContent(content: EcommerceContent | MarketingContent): content is MarketingContent {
  return 'testimonials' in content && content.testimonials.some(item => 'metric' in item);
}

function isMarketingTheme(theme: EcommerceTheme | MarketingTheme): theme is MarketingTheme {
  return 'lighting' in theme && 'noise' in theme.lighting;
}

// --- COMPONENTE PARA ECOMMERCE ---
const CompanysEcommerce = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);

  const theme = themeConfig.ecommerce as EcommerceTheme;
  const content = contentConfig.ecommerce as EcommerceContent;

  const getCardWidth = () => {
    if (containerWidth < 640) return containerWidth - 48;
    if (containerWidth < 1024) return 340;
    return 380;
  };

  const getCardGap = () => {
    if (containerWidth < 640) return 16;
    return 32;
  };

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const cardWidth = getCardWidth();
  const cardGap = getCardGap();
  const visibleCards = containerWidth < 640 ? 1 : 
                       containerWidth < 1024 ? 2 : 
                       Math.floor(containerWidth / (cardWidth + cardGap));
  const maxIndex = Math.max(0, content.testimonials.length - visibleCards);

  const handleNext = () => {
    const newIndex = Math.min(currentIndex + 1, maxIndex);
    setCurrentIndex(newIndex);
    animate(x, -newIndex * (cardWidth + cardGap), {
      type: "spring",
      stiffness: 200,
      damping: 25
    });
  };

  const handlePrev = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(newIndex);
    animate(x, -newIndex * (cardWidth + cardGap), {
      type: "spring",
      stiffness: 200,
      damping: 25
    });
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    setIsDragging(false);
    const threshold = 50;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    let newIndex = currentIndex;

    if (offset < -threshold || velocity < -500) {
      newIndex = Math.min(currentIndex + 1, maxIndex);
    } else if (offset > threshold || velocity > 500) {
      newIndex = Math.max(currentIndex - 1, 0);
    }

    setCurrentIndex(newIndex);
    animate(x, -newIndex * (cardWidth + cardGap), {
      type: "spring",
      stiffness: 200,
      damping: 25
    });
  };

  return (
    <section className={`py-20 sm:py-24 px-4 sm:px-6 md:px-8 ${theme.background} relative overflow-hidden ${theme.border}`}>
      
      <div className={`absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] ${theme.lighting.spotlight} rounded-full blur-[120px] pointer-events-none`} />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col sm:flex-row justify-between items-end mb-12 sm:mb-16 gap-6">
          <div className="text-center sm:text-left">
            <div className={`inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border ${theme.badge.border} ${theme.badge.background}`}>
                <Icon icon={content.badge.icon} className={`${theme.badge.icon} w-4 h-4`} />
                <span className={`text-xs font-semibold tracking-wider uppercase ${theme.badge.text}`}>
                    {content.badge.text}
                </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              {content.title.part1} <br className="hidden sm:block" />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.text.gradient}`}>
                {content.title.part2}
              </span>
            </h2>
          </div>

          <div className="hidden sm:flex gap-3">
            <motion.button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`w-12 h-12 rounded-full border ${theme.buttons.prevNext.border} ${theme.buttons.prevNext.background} disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white disabled:cursor-not-allowed flex items-center justify-center text-white transition-all duration-300 hover:${theme.buttons.prevNext.hover.background} hover:${theme.buttons.prevNext.hover.border} hover:${theme.buttons.prevNext.hover.text}`}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className={`w-12 h-12 rounded-full border ${theme.buttons.prevNext.border} ${theme.buttons.prevNext.background} disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white disabled:cursor-not-allowed flex items-center justify-center text-white transition-all duration-300 hover:${theme.buttons.prevNext.hover.background} hover:${theme.buttons.prevNext.hover.border} hover:${theme.buttons.prevNext.hover.text}`}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        <div className="relative" ref={containerRef}>
          <div className="overflow-hidden px-2 py-4 -mx-2 -my-4">
            <motion.div
              className="flex"
              style={{ x, gap: `${cardGap}px` }}
              drag="x"
              dragConstraints={{ left: -maxIndex * (cardWidth + cardGap), right: 0 }}
              dragElastic={0.1}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
            >
              {content.testimonials.map((item, index) => {
                const range = [
                    -(index + 1) * (cardWidth + cardGap),
                    -index * (cardWidth + cardGap),
                    -(index - 1) * (cardWidth + cardGap)
                ];
                
                const opacity = useTransform(x, range, [0.4, 1, 0.4]);
                const scale = useTransform(x, range, [0.95, 1, 0.95]);

                return (
                  <motion.div
                    key={item.id}
                    className="flex-shrink-0 cursor-grab active:cursor-grabbing"
                    style={{ width: cardWidth }}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`h-full ${theme.card.background} border ${theme.card.border} hover:${theme.card.hoverBorder} rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-colors duration-300 group shadow-2xl relative overflow-hidden`}>
                      
                      <div className={`absolute inset-0 ${theme.card.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                      <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`w-14 h-14 rounded-full bg-gray-800 overflow-hidden border border-white/10 group-hover:${theme.card.hoverBorder} transition-colors`}>
                                <motion.img
                                  src={item.logo}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h1 className={`text-lg sm:text-xl font-bold ${theme.text.primary} group-hover:text-[#FFCC00] transition-colors`}>
                                    {item.name}
                                </h1>
                                <p className={`text-xs ${theme.text.secondary} uppercase tracking-wide font-medium`}>
                                    {item.description}
                                </p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                                {item.result}
                            </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-auto">
                        {item.tags.map(tag => (
                             <span key={tag} className="text-[10px] sm:text-xs font-medium px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/5">
                                {tag}
                             </span>
                        ))}
                      </div>

                      <div className={`absolute top-6 right-6 ${theme.card.decorIcon.color} group-hover:${theme.card.decorIcon.hover} transition-colors`}>
                        <TrendingUp className="w-8 h-8 opacity-50" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  animate(x, -index * (cardWidth + cardGap), {
                    type: "spring",
                    stiffness: 200,
                    damping: 25
                  });
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? `w-8 ${theme.buttons.dot.active} ${theme.buttons.dot.shadow}` 
                    : `w-2 ${theme.buttons.dot.inactive} hover:bg-gray-500`
                }`}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

           <div className="flex sm:hidden justify-center gap-4 mt-6">
                <button onClick={handlePrev} disabled={currentIndex === 0} className="p-3 rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-30">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={handleNext} disabled={currentIndex >= maxIndex} className="p-3 rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-30">
                    <ChevronRight className="w-5 h-5" />
                </button>
           </div>
        </div>
      </div>
    </section>
  );
};

// --- COMPONENTE PARA MARKETING ---
const CompanysMarketing = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);

  const theme = themeConfig.marketing as MarketingTheme;
  const content = contentConfig.marketing as MarketingContent;

  const getCardWidth = () => {
    if (containerWidth < 640) return containerWidth - 48;
    if (containerWidth < 1024) return 340;
    return 380;
  };

  const getCardGap = () => {
    if (containerWidth < 640) return 16;
    return 32;
  };

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const cardWidth = getCardWidth();
  const cardGap = getCardGap();
  const visibleCards = containerWidth < 640 ? 1 : 
                       containerWidth < 1024 ? 2 : 
                       Math.floor(containerWidth / (cardWidth + cardGap));
  const maxIndex = Math.max(0, content.testimonials.length - visibleCards);

  const handleNext = () => {
    const newIndex = Math.min(currentIndex + 1, maxIndex);
    setCurrentIndex(newIndex);
    animate(x, -newIndex * (cardWidth + cardGap), {
      type: "spring",
      stiffness: 200,
      damping: 25
    });
  };

  const handlePrev = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(newIndex);
    animate(x, -newIndex * (cardWidth + cardGap), {
      type: "spring",
      stiffness: 200,
      damping: 25
    });
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    setIsDragging(false);
    const threshold = 50;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    let newIndex = currentIndex;

    if (offset < -threshold || velocity < -500) {
      newIndex = Math.min(currentIndex + 1, maxIndex);
    } else if (offset > threshold || velocity > 500) {
      newIndex = Math.max(currentIndex - 1, 0);
    }

    setCurrentIndex(newIndex);
    animate(x, -newIndex * (cardWidth + cardGap), {
      type: "spring",
      stiffness: 200,
      damping: 25
    });
  };

  return (
    <section className={`py-20 sm:py-24 px-4 sm:px-6 md:px-8 ${theme.background} relative overflow-hidden ${theme.border}`}>
      
      {theme.lighting.noise && (
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      )}

      <div className={`absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] ${theme.lighting.spotlight} rounded-full blur-[120px] pointer-events-none`} />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col sm:flex-row justify-between items-end mb-12 sm:mb-16 gap-6">
          <div className="text-center sm:text-left">
            <div className={`inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border ${theme.badge.border} ${theme.badge.background}`}>
                <Icon icon={content.badge.icon} className={`${theme.badge.icon} w-4 h-4`} />
                <span className={`text-xs font-bold tracking-wider uppercase ${theme.badge.text}`}>
                    {content.badge.text}
                </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              {content.title.part1} <br className="hidden sm:block" />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.text.gradient}`}>
                {content.title.part2}
              </span>
            </h2>
          </div>

          <div className="hidden sm:flex gap-3">
            <motion.button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`w-12 h-12 rounded-full border ${theme.buttons.prevNext.border} ${theme.buttons.prevNext.background} disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-all duration-300 hover:${theme.buttons.prevNext.hover.background} hover:${theme.buttons.prevNext.hover.border} hover:${theme.buttons.prevNext.hover.text}`}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className={`w-12 h-12 rounded-full border ${theme.buttons.prevNext.border} ${theme.buttons.prevNext.background} disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-all duration-300 hover:${theme.buttons.prevNext.hover.background} hover:${theme.buttons.prevNext.hover.border} hover:${theme.buttons.prevNext.hover.text}`}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        <div className="relative" ref={containerRef}>
          <div className="overflow-hidden px-2 py-4 -mx-2 -my-4">
            <motion.div
              className="flex"
              style={{ x, gap: `${cardGap}px` }}
              drag="x"
              dragConstraints={{ left: -maxIndex * (cardWidth + cardGap), right: 0 }}
              dragElastic={0.1}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
            >
              {content.testimonials.map((item, index) => {
                const range = [
                    -(index + 1) * (cardWidth + cardGap),
                    -index * (cardWidth + cardGap),
                    -(index - 1) * (cardWidth + cardGap)
                ];
                
                const opacity = useTransform(x, range, [0.4, 1, 0.4]);
                const scale = useTransform(x, range, [0.95, 1, 0.95]);

                return (
                  <motion.div
                    key={item.id}
                    className="flex-shrink-0 cursor-grab active:cursor-grabbing"
                    style={{ width: cardWidth }}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`h-full ${theme.card.background} border ${theme.card.border} hover:${theme.card.hoverBorder} rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-colors duration-300 group shadow-lg hover:shadow-[0_0_30px_rgba(227,27,99,0.15)] relative overflow-hidden`}>
                      
                      <div className={`absolute inset-0 ${theme.card.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                      <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-[#E31B63] transition-colors">
                                <motion.img
                                  src={item.logo}
                                  alt={item.name}
                                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100"
                                />
                            </div>
                            <div>
                                <h1 className={`text-lg font-bold ${theme.text.primary} group-hover:text-[#E31B63] transition-colors`}>
                                    {item.name}
                                </h1>
                                <p className={`text-xs ${theme.text.secondary} uppercase tracking-wide font-medium`}>
                                    {item.description}
                                </p>
                            </div>
                        </div>

                        <div className="mb-4">
                            <p className="text-3xl font-bold text-white leading-tight tracking-tight">
                                {item.result}
                            </p>
                            {item.metric && (
                              <p className="text-sm text-gray-400 mt-1 flex items-center gap-1">
                                  <ArrowUpRight className={`w-3 h-3 ${theme.card.metricIcon}`} />
                                  {item.metric}
                              </p>
                            )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-auto border-t border-white/5 pt-4">
                        {item.tags.map(tag => (
                             <span key={tag} className="text-[10px] font-medium px-2.5 py-1 rounded-md bg-white/5 text-gray-400 border border-white/5 group-hover:border-[#E31B63]/20 group-hover:text-gray-300 transition-colors">
                                {tag}
                             </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  animate(x, -index * (cardWidth + cardGap), {
                    type: "spring",
                    stiffness: 200,
                    damping: 25
                  });
                }}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? `w-8 ${theme.buttons.dot.active} ${theme.buttons.dot.shadow}` 
                    : `w-2 ${theme.buttons.dot.inactive} hover:bg-gray-600`
                }`}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

           <div className="flex sm:hidden justify-center gap-4 mt-6">
                <button onClick={handlePrev} disabled={currentIndex === 0} className="p-3 rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-30">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={handleNext} disabled={currentIndex >= maxIndex} className="p-3 rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-30">
                    <ChevronRight className="w-5 h-5" />
                </button>
           </div>
        </div>
      </div>
    </section>
  );
};

// --- COMPONENTE PRINCIPAL ---
export function Companys({ variant = 'ecommerce' }: CompanysProps) {
  switch (variant) {
    case 'ecommerce':
      return <CompanysEcommerce />;
    case 'marketing':
      return <CompanysMarketing />;
    default:
      return <CompanysEcommerce />;
  }
}