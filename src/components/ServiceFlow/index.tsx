"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceFlowProps, VariantContent } from './types';
import { THEMES } from './constants/themes';
import CertifiedSection from './CertifiedSection';
import ServiceHeader from './ServiceHeader';
import ServiceCard from './ServiceCard';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServiceFlow({ variant = 'home' }: ServiceFlowProps) {
  // 1. Estados para os dados dinâmicos da API
  const [content, setContent] = useState<VariantContent | null>(null);
  const [loading, setLoading] = useState(true);
  
  const containerRef = useRef(null);
  const theme = THEMES[variant];

  // 2. Integração com o Endpoint Central de Cards
  useEffect(() => {
    const loadApiContent = async () => {
      try {
        setLoading(true);
        // Usando o proxy configurado para evitar o NetworkError
        const response = await fetch('/api-tegbe/tegbe-institucional/json/cards');
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

  // 3. Animação GSAP sincronizada com o Loading
  useGSAP(() => {
    if (loading || !content || !containerRef.current) return;

    // Reset para garantir a entrada limpa
    gsap.set([".section-title", ".service-card"], { opacity: 0, y: 30 });

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
      clearProps: "all",
    }, "-=0.5");

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

        {/* Grid de Serviços dinâmico vindo da API */}
        {/* Grid de Serviços dinâmico com suporte a WIDE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.services.map((service, index) => (
            <div 
              key={service.id || index}
              // Aqui está a mágica: se wide for true, ocupa as 2 colunas no desktop
              className={`${service.wide ? "md:col-span-2" : "col-span-1"} service-card`}
            >
              <ServiceCard 
                service={service}
                theme={theme}
                variant={variant}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}