"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceFlowProps, VariantContent, Service, ServiceFlowVariant } from './types';
import { THEMES } from './constants/themes';
import CertifiedSection from './CertifiedSection';
import ServiceHeader from './ServiceHeader';
import ServiceCard from './ServiceCard';
import { Icon } from '@iconify/react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Interface estendida para incluir a propriedade flywheel
interface ExtendedService extends Service {
  flywheel?: boolean;
}

export default function ServiceFlow({ variant = 'home' }: ServiceFlowProps) {
  // 1. Estados para os dados dinâmicos da API
  const [content, setContent] = useState<VariantContent | null>(null);
  const [loading, setLoading] = useState(true);
  
  const containerRef = useRef(null);
  const theme = THEMES[variant as ServiceFlowVariant];

  // 2. Integração com o Endpoint Central de Cards
  useEffect(() => {
    const loadApiContent = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api-tegbe/tegbe-institucional/cards');
        const allVariants = await response.json();

        // Filtra o conteúdo com base na variante da prop
        if (allVariants && allVariants[variant]) {
          setContent(allVariants[variant]);
        }
      } catch (error) {
        console.error("Mavellium Engine - Erro no cruzamento de dados:", error);
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
    
    // Se tiver conteúdo do flywheel na API, adiciona como um serviço especial
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
    if (loading || !content || !containerRef.current) return;

    // Reset para garantir a entrada limpa
    gsap.set([".section-title", ".service-card", ".cta-element", ".flywheel-card"], { 
      opacity: 0, 
      y: 30 
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(".section-title", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    })
    .to(".service-card", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    }, "-=0.5")
    // Animação especial para o card do Flywheel
    .to(".flywheel-card", {
      opacity: 1,
      y: 0,
      duration: 1.2,
      scale: 1.05,
      ease: "back.out(1.7)",
    }, "-=0.2")
    .to(".cta-element", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.3");

  }, { dependencies: [loading, content], scope: containerRef });

  // Se for ecommerce, renderiza o componente específico
  if (variant === 'ecommerce') {
    return <CertifiedSection />;
  }

  // Previne erro de renderização antes dos dados chegarem
  if (loading || !content) {
    return (
      <div className={`py-24 flex items-center justify-center ${theme.background}`}>
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // CTA padrão caso não exista na API
  const ctaData = content.cta || {
    text: "Quero Estruturar e Escalar Meu Negócio",
    url: "https://api.whatsapp.com/send?phone=5514991779502",
    description: "Anúncios, operação e dados trabalhando juntos para vender mais."
  };

  // Serviços com o card adicional para marketing
  const enhancedServices = getEnhancedServices();

  // Função para renderizar o card do Flywheel dinamicamente
  const renderFlywheelCard = () => {
    if (!content.flywheel) return null;

    const flywheel = content.flywheel;
    const phases = flywheel.phases || [
      { title: "ATRAIR", color: "#3B82F6" },
      { title: "ENGAJAR", color: "#8B5CF6" },
      { title: "ENCANTAR", color: "#EC4899" },
      { title: "EXPANDIR", color: "#10B981" }
    ];

    const benefits = flywheel.benefits || [
      'Crescimento Orgânico', 
      'Retenção Elevada', 
      'Custo de Aquisição Reduzido'
    ];

    const colors = flywheel.colors || {
      primary: "#3B82F6",
      secondary: "#8B5CF6",
      accent: "#EC4899"
    };

    return (
      <div className="relative overflow-hidden rounded-2xl mt-5 border border-gray-200/20 bg-gradient-to-br from-gray to-red p-8 backdrop-blur-sm transition-all duration-500 hover:border-rose-500/30 hover:shadow-2xl">
        {/* Gradiente animado de fundo */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 via-pink-300/7 to-gray-500/5 animate-gradient-x" />
        
        {/* Cabeçalho do Flywheel */}
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

        {/* Descrição */}
        <p className="relative text-center text-gray-400 mb-8 text-lg leading-relaxed">
          {flywheel.description}
        </p>

        {/* Elementos visuais do Flywheel */}
        <div className="relative flex items-center justify-center py-8">
          <div className="relative h-64 w-64">
            {/* Anel externo do flywheel */}
            <div 
              className="absolute inset-0 rounded-full border-4 animate-spin-slow"
              style={{ borderColor: `${colors.primary}30` }}
            />
            
            {/* Anel médio */}
            <div 
              className="absolute inset-8 rounded-full border-4 animate-spin-reverse-slow"
              style={{ borderColor: `${colors.secondary}30` }}
            />
            
            {/* Anel interno */}
            <div 
              className="absolute inset-16 rounded-full border-4 animate-spin-slow"
              style={{ borderColor: `${colors.accent}30` }}
            />
            
            {/* Pontos do flywheel */}
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
            
            {/* Textos das fases - dinâmicas da API */}
            {phases.map((phase: {title: string, color: string}, index: number) => {
              const positions = [
                { top: "0%", left: "50%", transform: "translate(-50%, -50%)" }, // Top
                { bottom: "0%", left: "50%", transform: "translate(-50%, 50%)" }, // Bottom
                { top: "50%", right: "0%", transform: "translate(50%, -50%)" }, // Right
                { top: "50%", left: "0%", transform: "translate(-50%, -50%)" }, // Left
              ];
              
              return (
                <div
                  key={index}
                  className="absolute"
                  style={positions[index]}
                >
                  <span 
                    className="text-xs font-bold"
                    style={{ color: phase.color }}
                  >
                    {phase.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefícios - dinâmicos da API */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {benefits.map((benefit: string, idx: number) => (
            <div key={idx} className="flex items-center gap-2 p-3 rounded-lg border border-pink-700/10 hover:border-rose-500/30 transition-all duration-400 bg-black/70 backdrop-blur-sm">
              <Icon icon="mdi:check-circle" className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-gray-300">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section 
      ref={containerRef} 
      className={`relative py-24 px-6 overflow-hidden ${theme.background}`}
    >
      {/* Noise texture para marketing */}
      {variant === 'marketing' && (
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
      )}

      {/* Background decorativo para sobre */}
      {variant === 'sobre' && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gray-200/40 rounded-full blur-[100px]" />
        </div>
      )}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Cabeçalho dinâmico vindo da API */}
        <ServiceHeader 
          content={content.header} 
          theme={theme} 
          variant={variant} 
        />

        {/* Grid de Serviços dinâmico com suporte a WIDE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enhancedServices.map((service, index) => (
            <div 
              key={service.id || index}
              className={`
                ${service.wide ? "md:col-span-2" : "col-span-1"}
                ${service.flywheel ? "flywheel-card" : "service-card"}
              `}
            >
              {/* Renderização especial para o card do Flywheel */}
              {service.flywheel ? (
                renderFlywheelCard()
              ) : (
                // Card de serviço normal
                <ServiceCard 
                  service={service}
                  theme={theme}
                  variant={variant}
                />
              )}
            </div>
          ))}
        </div>

        {/* CTA Dinâmico */}
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
            <p className={`mt-4 text-[10px] font-medium tracking-widest uppercase flex items-center gap-2`}>
              <span className={`w-1.5 h-1.5 rounded-full animate-pulse`}></span>
              {ctaData.description}
            </p>
          </div>
        )}
      </div>

      {/* Adicionar estilos CSS para animações */}
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