"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from 'framer-motion';
import { ServiceFlowProps, VariantContent, Service, ServiceFlowVariant } from './types';
import { THEMES } from './constants/themes';
import CertifiedSection from './CertifiedSection';
import ServiceHeader from './ServiceHeader';
import ServiceCard from './ServiceCard';


import { Icon } from '@iconify/react';
import { Sparkles, Zap, TrendingUp, ArrowRight } from 'lucide-react';
import Flywheel from "../../ui/Flywheel";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Interface estendida para incluir a propriedade flywheel
interface ExtendedService extends Service {
  flywheel?: boolean;
}

// Dados de fallback para cada variante
const FALLBACK_CONTENT: Record<ServiceFlowVariant, VariantContent> = {
  home: {
    header: {
      title: "Soluções Completas",
      badge: "Nossos Serviços",
      highlighted: "Para seu Negócio",
      description: "Oferecemos serviços especializados para impulsionar seu negócio digital",
      preTitle: "",
      subtitle: ""
    },
    services: [
      {
        step: "01",
        id: "consultoria",
        title: "Consultoria Estratégica",
        description: "Desenvolvemos estratégias personalizadas para o crescimento sustentável do seu negócio.",
        icon: "mdi:strategy",
        color: "blue",
        wide: false,
        visualType: "default"
      },
      {
        step: "02",
        id: "marketing",
        title: "Marketing Digital",
        description: "Campanhas inteligentes que convertem visitantes em clientes fiéis.",
        icon: "mdi:bullhorn",
        color: "pink",
        wide: false,
        visualType: "default"
      },
      {
        step: "03",
        id: "desenvolvimento",
        title: "Desenvolvimento Web",
        description: "Sites e aplicações modernas com performance e experiência excepcionais.",
        icon: "mdi:code",
        color: "green",
        wide: false,
        visualType: "default"
      },
      {
        step: "04",
        id: "analytics",
        title: "Análise de Dados",
        description: "Insights baseados em dados para tomada de decisões inteligentes.",
        icon: "mdi:chart-bar",
        color: "purple",
        wide: false,
        visualType: "default"
      }
    ],
    cta: {
      text: "Quero Transformar Meu Negócio",
      url: "https://api.whatsapp.com/send?phone=5514991779502",
      description: "Estratégia, tecnologia e execução trabalhando juntas para seus resultados."
    }
  },
  marketing: {
    header: {
      title: "Acelere seu",
      badge: "Marketing Inteligente",
      highlighted: "Crescimento",
      description: "Transforme desconhecidos em promotores da sua marca com uma estratégia de inbound marketing que realmente funciona.",
      preTitle: "",
      subtitle: ""
    },
    services: [],
    cta: {
      text: "Começar Agora",
      url: "https://api.whatsapp.com/send?phone=5514991779502",
      description: "Marketing que realmente converte"
    },
    stats: [
      { value: '3x', label: 'Mais Leads' },
      { value: '47%', label: 'Conversão' },
      { value: '2.5x', label: 'ROI' }
    ],
  },
  sobre: {
    header: {
      title: "Quem Somos",
      badge: "Nossa História",
      highlighted: "Conheça a Tegbe",
      description: "Uma equipe apaixonada por transformar ideias em resultados digitais extraordinários",
      preTitle: "",
      subtitle: ""
    },
    services: [
      {
        step: "01",
        id: "missao",
        title: "Missão",
        description: "Transformar negócios através de soluções digitais inovadoras e estratégias eficientes.",
        icon: "mdi:target",
        color: "blue",
        wide: false,
        visualType: "default"
      },
      {
        step: "02",
        id: "visao",
        title: "Visão",
        description: "Ser referência em transformação digital, reconhecida pela excelência e resultados.",
        icon: "mdi:eye",
        color: "green",
        wide: false,
        visualType: "default"
      },
      {
        step: "03",
        id: "valores",
        title: "Valores",
        description: "Inovação, transparência, excelência e parceria em cada projeto.",
        icon: "mdi:heart",
        color: "red",
        wide: false,
        visualType: "default"
      },
      {
        step: "04",
        id: "equipe",
        title: "Equipe",
        description: "Profissionais especializados e comprometidos com o sucesso do seu negócio.",
        icon: "mdi:account-group",
        color: "purple",
        wide: false,
        visualType: "default"
      }
    ],
    cta: {
      text: "Fale Conosco",
      url: "https://api.whatsapp.com/send?phone=5514991779502",
      description: "Vamos construir algo incrível juntos"
    }
  },
  ecommerce: {
    header: {
      title: "Lojas que Vendem",
      badge: "E-commerce",
      highlighted: "Soluções Completas",
      description: "Soluções completas para e-commerce com foco em conversão e experiência do cliente",
      preTitle: "",
      subtitle: ""
    },
    services: [
      {
        step: "01",
        id: "plataforma",
        title: "Plataforma",
        description: "Lojas virtuais otimizadas para conversão em diferentes nichos de mercado.",
        icon: "mdi:store",
        color: "orange",
        wide: false,
        visualType: "default"
      },
      {
        step: "02",
        id: "integracao",
        title: "Integração",
        description: "Sistemas integrados para gestão de estoque, pagamentos e logística.",
        icon: "mdi:connection",
        color: "blue",
        wide: false,
        visualType: "default"
      }
    ],
    cta: {
      text: "Quero Vender Mais Online",
      url: "https://api.whatsapp.com/send?phone=5514991779502",
      description: "E-commerce completo com foco em resultados"
    }
  }
};

export default function ServiceFlow({ variant = 'home' }: ServiceFlowProps) {
  // 1. Estados para os dados dinâmicos da API
  const [content, setContent] = useState<VariantContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  const containerRef = useRef(null);
  const theme = THEMES[variant as ServiceFlowVariant];

  // 2. Integração com o Endpoint Central de Cards
  useEffect(() => {
    const loadApiContent = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api-tegbe/tegbe-institucional/cards');

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const allVariants = await response.json();

        // Verifica se temos dados para a variante específica
        if (allVariants && allVariants[variant]) {
          setContent(allVariants[variant]);
          setUseFallback(false);
        } else {
          // Usa fallback se não encontrar dados
          console.warn(`Mavellium Engine - Dados não encontrados para variante: ${variant}. Usando fallback.`);
          setContent(FALLBACK_CONTENT[variant]);
          setUseFallback(true);
        }
      } catch (error) {
        console.error("Mavellium Engine - Erro no carregamento de dados:", error);
        // Usa fallback em caso de erro
        setContent(FALLBACK_CONTENT[variant]);
        setUseFallback(true);
      } finally {
        setLoading(false);
      }
    };

    loadApiContent();
  }, [variant]);

  // 3. Helper para serviços
  const getEnhancedServices = (): ExtendedService[] => {
    if (!content || !content.services) return [];
    const services: ExtendedService[] = [...content.services];
    return services;
  };

  // 4. Animação GSAP sincronizada com o Loading
  useGSAP(() => {
    if (loading || !content || !containerRef.current || variant === 'marketing') return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(".section-title",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
      .fromTo(".service-card",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(".cta-element",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.3"
      );

  }, { dependencies: [loading, content, variant], scope: containerRef });

  if (variant === 'ecommerce') {
    return <CertifiedSection />;
  }
  
  if (variant === 'marketing') {
    if (loading || !content) return <Flywheel />; // Crie um loader bonitinho

   const header = content.header || FALLBACK_CONTENT.marketing.header;
    const stats = content.stats || FALLBACK_CONTENT.marketing.stats;
    const ctaData = content.cta || FALLBACK_CONTENT.marketing.cta;

    return (
      <section className="relative min-h-screen bg-[#020202] overflow-hidden flex items-center justify-center py-24 px-6">
        {/* Background Noise e Glows padrão ExploreDetails */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#E31B63]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#FF0F43]/10 rounded-full blur-[120px]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-[#E31B63]" />
                <span className="text-xs text-gray-200 font-bold tracking-widest uppercase">
                  {header.badge}
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tighter">
                {header.title}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0F43] to-[#E31B63]">
                  {header.highlighted}.
                </span>
              </h1>

              <p className="text-lg text-gray-400 max-w-lg leading-relaxed font-light">
                {header.description}
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-12 pt-4">
                {stats?.map((stat, i) => (
                  <div key={i} className="relative">
                    <div className="text-4xl font-black text-white">{stat.value}</div>
                    <div className="text-[10px] text-[#E31B63] uppercase tracking-[0.2em] font-bold mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <a 
                  href={ctaData.url} 
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-[#FF0F43] to-[#E31B63] text-white px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:shadow-[0_0_40px_rgba(227,27,99,0.3)] transition-all hover:scale-105"
                >
                  {ctaData.text}
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
               {/* Glow pulsante atrás do Flywheel */}
               <div className="absolute inset-0 bg-[#E31B63]/20 blur-[100px] rounded-full animate-pulse" />
               <Flywheel />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Layout original para outras variantes
  if (loading || !content) {
    return (
      <div className={`py-24 flex items-center justify-center ${theme.background}`}>
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const ctaData = content.cta || FALLBACK_CONTENT[variant].cta;
  const enhancedServices = getEnhancedServices();

  return (
    <section
      ref={containerRef}
      className={`relative py-24 px-6 overflow-hidden ${theme.background}`}
    >
      {useFallback && (
        <div className="absolute top-4 left-4 right-4 z-50">
          <div className="bg-yellow-500/10 border border-yellow-500/20 backdrop-blur-sm rounded-lg p-3 text-center">
            <p className="text-yellow-300 text-sm">
              ⚠️ Exibindo dados de demonstração. Conectando com a API...
            </p>
          </div>
        </div>
      )}

      {variant === 'sobre' && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gray-200/40 rounded-full blur-[100px]" />
        </div>
      )}

      <div className="max-w-6xl mx-auto relative z-10">
        <ServiceHeader
          content={content.header}
          theme={theme}
          variant={variant}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enhancedServices.map((service, index) => (
            <div
              key={service.id || index}
              className={`service-card ${service.wide ? "md:col-span-2" : "col-span-1"}`}
            >
              <ServiceCard
                service={service}
                theme={theme}
                variant={variant}
              />
            </div>
          ))}
        </div>

        {ctaData && (
          <div className="cta-element reveal-text flex flex-col items-center mt-12">
            <a
              aria-label="Entre em contato pelo WhatsApp"
              href={ctaData.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all duration-300
                hover:scale-105 bg-black text-white shadow-lg hover:shadow-2xl
              `}
            >
              <span>{ctaData.text}</span>
              <Icon
                icon="lucide:arrow-right"
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            {ctaData.description && (
              <p className={`mt-4 text-[10px] font-medium tracking-widest uppercase flex items-center gap-2`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse`}></span>
                {ctaData.description}
              </p>
            )}
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
      `}</style>
    </section>
  );
}