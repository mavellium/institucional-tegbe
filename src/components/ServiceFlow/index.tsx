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
      preTitle: "Nossos Serviços",
      title: "Soluções Completas",
      subtitle: "Oferecemos serviços especializados para impulsionar seu negócio digital",
      gradientTitle: "Para seu Negócio"
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
      preTitle: "Marketing Inteligente",
      title: "Acelere seu",
      subtitle: "Transforme desconhecidos em promotores da sua marca com uma estratégia de inbound marketing que realmente funciona.",
      badge: "Marketing Inteligente",
      highlighted: "Crescimento",
      description: "Transforme desconhecidos em promotores da sua marca com uma estratégia de inbound marketing que realmente funciona."
    },
    services: [],
    cta: {
      text: "Começar Agora",
      url: "https://api.whatsapp.com/send?phone=5514991779502",
      description: "Marketing que realmente converte",
      primary: {
        text: "Começar Agora",
        url: "https://api.whatsapp.com/send?phone=5514991779502"
      },
      secondary: {
        text: "Ver Demo",
        url: "#demo"
      }
    },
    stats: [
      { value: '3x', label: 'Mais Leads' },
      { value: '47%', label: 'Conversão' },
      { value: '2.5x', label: 'ROI' }
    ],
  },
  sobre: {
    header: {
      preTitle: "Nossa História",
      title: "Quem Somos",
      subtitle: "Uma equipe apaixonada por transformar ideias em resultados digitais extraordinários",
      gradientTitle: "Conheça a Tegbe"
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
      preTitle: "E-commerce",
      title: "Lojas que Vendem",
      subtitle: "Soluções completas para e-commerce com foco em conversão e experiência do cliente",
      gradientTitle: "Soluções Completas"
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

  // 3. Adicionar card do Marketing Flywheel se existir na API
  const getEnhancedServices = (): ExtendedService[] => {
    if (!content || !content.services) return [];
    
    const services: ExtendedService[] = [...content.services];
    
    if (content.flywheel) {
      const flywheelCard: ExtendedService = {
        step: "flywheel",
        id: "flywheel",
        title: content.flywheel.title || "Marketing Flywheel",
        description: content.flywheel.description || "Sistema de crescimento contínuo que transforma clientes satisfeitos em promotores da marca.",
        icon: "mdi:cog-sync",
        color: "gradient",
        wide: true,
        visualType: "flywheel",
        flywheel: true
      };
      
      return [...services, flywheelCard];
    }
    
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
    .fromTo(".flywheel-card",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "back.out(1.7)" },
      "-=0.2"
    )
    .fromTo(".cta-element",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.3"
    );

  }, { dependencies: [loading, content, variant], scope: containerRef });

  // Se for ecommerce, renderiza o componente específico
  if (variant === 'ecommerce') {
    return <CertifiedSection />;
  }

  // Para variante marketing, renderiza o novo layout
  if (variant === 'marketing') {
    if (loading || !content) {
      return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }

    // Dados para o layout de marketing
    const header = content.header || FALLBACK_CONTENT.marketing.header;
    const stats = content.stats || FALLBACK_CONTENT.marketing.stats;
    const ctaData = content.cta || FALLBACK_CONTENT.marketing.cta;

    return (
      <div className="relative min-h-screen bg-[#0a0a0a] overflow-hidden flex items-center justify-center">
        {/* Banner de aviso quando usando fallback */}
        {useFallback && (
          <div className="absolute top-4 left-4 right-4 z-50">
            <div className="bg-yellow-500/10 border border-yellow-500/20 backdrop-blur-sm rounded-lg p-3 text-center">
              <p className="text-yellow-300 text-sm">
                ⚠️ Exibindo dados de demonstração. Conectando com a API...
              </p>
            </div>
          </div>
        )}

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />
          
          {/* Gradient Orbs */}
          <motion.div 
            className="absolute top-1/4 -left-32 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-1/4 -right-32 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px]"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-pink-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-pink-500/20 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span className="text-sm text-pink-300 font-medium">
                  {header.badge || "Marketing Inteligente"}
                </span>
              </motion.div>

              {/* Headline */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  {header.title || "Acelere seu"}
                  <span className="block bg-gradient-to-r from-pink-400 via-pink-500 to-rose-400 bg-clip-text text-transparent">
                    {header.highlighted || "Crescimento"}
                  </span>
                </h1>
                <p className="text-lg text-gray-400 max-w-md leading-relaxed">
                  {header.description || "Transforme desconhecidos em promotores da sua marca com uma estratégia de inbound marketing que realmente funciona."}
                </p>
              </div>

              {/* Stats */}
              {stats && stats.length > 0 && (
                <div className="flex gap-8">
                  {stats.map((stat: any, i: number) => (
                    <motion.div 
                      key={i}
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <div className="text-3xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <a
                  href={ctaData.primary?.url || ctaData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-pink-500/25 transition-all hover:shadow-pink-500/40 hover:scale-105"
                >
                  {ctaData.primary?.text || ctaData.text || "Começar Agora"}
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                
                {/* Botão secundário - somente se existir */}
                {ctaData.secondary && (
                  <a
                    href={ctaData.secondary.url}
                    className="border border-white/10 text-white hover:bg-white/5 px-8 py-6 text-lg rounded-xl backdrop-blur-sm transition-all hover:scale-105"
                  >
                    {ctaData.secondary.text}
                  </a>
                )}
              </motion.div>
            </motion.div>

            {/* Right Content - Image */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Glow Effect Behind Image */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-rose-500/30 rounded-full blur-[80px] scale-75" />
              
              {/* Rotating Border */}
              <motion.div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.3), transparent)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Image Container */}
              <div className="relative p-4">
                {/* Decorative Ring */}
                <div className="absolute inset-0 rounded-full border border-pink-500/20" />
                <div className="absolute inset-4 rounded-full border border-pink-500/10" />
                
                {/* Main Image */}
                <motion.div
                  className="relative"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img 
                    src={content.flywheel?.image || "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_6987b81fe4e58f9164f5b3b2/1ed16332d_image.png"}
                    alt="Flywheel de Crescimento"
                    className="w-full max-w-lg mx-auto drop-shadow-2xl"
                    onError={(e) => {
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%230a0a0a'/%3E%3Ctext x='200' y='150' text-anchor='middle' fill='%23ec4899' font-family='Arial' font-size='20'%3EFlywheel Marketing%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </motion.div>

                {/* Floating Icons */}
                <motion.div 
                  className="absolute -top-4 right-12 p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/10"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                >
                  <Zap className="w-6 h-6 text-pink-400" />
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-12 -left-4 p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/10"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >
                  <TrendingUp className="w-6 h-6 text-rose-400" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
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

  const renderFlywheelCard = () => {
    if (!content.flywheel) return null;

    const flywheel = content.flywheel;
    const phases = flywheel.phases || [];
    const benefits = flywheel.benefits || [];
    const colors = flywheel.colors || {
      primary: "#3B82F6",
      secondary: "#8B5CF6",
      accent: "#EC4899"
    };

    return (
      <div className="relative overflow-hidden rounded-2xl mt-5 border border-gray-200/20 bg-gradient-to-br from-gray to-red p-8 backdrop-blur-sm transition-all duration-500 hover:border-rose-500/30 hover:shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 via-pink-300/7 to-gray-500/5 animate-gradient-x" />
        
        <div className="relative flex justify-center items-center gap-4 mb-6">
          <div>
            <h3 className="text-2xl flex font-bold bg-gradient-to-r from-red-400 to-pink-600 bg-clip-text text-transparent">
              {flywheel.title}
            </h3>
            <p className="text-sm text-white-600 mt-1">
              {flywheel.subtitle || "Sistema de Crescimento Contínuo"}
            </p>
          </div>
        </div>

        <p className="relative text-center text-gray-400 mb-8 text-lg leading-relaxed">
          {flywheel.description}
        </p>

        <div className="relative flex items-center justify-center py-8">
          <div className="relative h-64 w-64">
            <div 
              className="absolute inset-0 rounded-full border-4 animate-spin-slow"
              style={{ borderColor: `${colors.primary}30` }}
            />
            
            <div 
              className="absolute inset-8 rounded-full border-4 animate-spin-reverse-slow"
              style={{ borderColor: `${colors.secondary}30` }}
            />
            
            <div 
              className="absolute inset-16 rounded-full border-4 animate-spin-slow"
              style={{ borderColor: `${colors.accent}30` }}
            />
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="flex flex-col items-center">
                <div 
                  className="h-3 w-3 rounded-full mb-12 animate-pulse"
                  style={{ backgroundColor: colors.primary }}
                />
                <div 
                  className="h-3 w-3 rounded-full mb-12 animate-pulse delay-300"
                  style={{ backgroundColor: colors.secondary }}
                />
                <div 
                  className="h-3 w-3 rounded-full animate-pulse delay-700"
                  style={{ backgroundColor: colors.accent }}
                />
              </div>
            </div>
            
            {phases.map((phase: any, index: number) => {
              const positions = [
                { top: "0%", left: "50%", transform: "translate(-50%, -50%)" },
                { bottom: "0%", left: "50%", transform: "translate(-50%, 50%)" },
                { top: "50%", right: "0%", transform: "translate(50%, -50%)" },
                { top: "50%", left: "0%", transform: "translate(-50%, -50%)" },
              ];
              
              return (
                <div
                  key={index}
                  className="absolute"
                  style={positions[index] || positions[0]}
                >
                  <span 
                    className="text-xs font-bold"
                    style={{ color: phase.color || "#3B82F6" }}
                  >
                    {phase.title || `Fase ${index + 1}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {benefits.length > 0 && (
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {benefits.map((benefit: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2 p-3 rounded-lg border border-pink-700/10 hover:border-rose-500/30 transition-all duration-400 bg-black/70 backdrop-blur-sm">
                <Icon icon="mdi:check-circle" className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section 
      ref={containerRef} 
      className={`relative py-24 px-6 overflow-hidden ${theme.background}`}
    >
      {/* Banner de aviso quando usando fallback */}
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
              className={`
                ${service.wide ? "md:col-span-2" : "col-span-1"}
                ${service.flywheel ? "flywheel-card" : "service-card"}
              `}
            >
              {service.flywheel ? (
                renderFlywheelCard()
              ) : (
                <ServiceCard 
                  service={service}
                  theme={theme}
                  variant={variant}
                />
              )}
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
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse-slow {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-reverse-slow {
          animation: spin-reverse-slow 15s linear infinite;
        }
      `}</style>
    </section>
  );
}