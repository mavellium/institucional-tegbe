"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceFlowProps, VariantContent, Service, ServiceFlowVariant } from './types';
import { THEMES } from './constants/themes';
import ServiceHeader from './ServiceHeader';
import ServiceCard from './ServiceCard';
import { Icon } from '@iconify/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import Flywheel from "../../ui/Flywheel";
import Link from "next/link";
import { useServiceFlowContent } from "./hooks/useServiceFlowContent";
import { DefaultVariant } from "./variants/DefaultVariant";
import { MarketingVariant } from "./variants/MarketingVariant";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServiceFlow({ variant = 'home' }: ServiceFlowProps) {
  const { content, loading, error, useFallback } = useServiceFlowContent(variant);
  const containerRef = useRef(null);
  const theme = THEMES[variant as ServiceFlowVariant];

  // Animação GSAP (apenas para variantes que não são 'marketing')
  useGSAP(() => {
    if (loading || !content || variant === 'marketing' || !containerRef.current) return;

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

    // Cleanup do ScrollTrigger
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, { dependencies: [loading, content, variant], scope: containerRef });

  // Error state (opcional, você pode mostrar algo mais amigável)
  if (error && !content) {
    return (
      <div className={` flex items-center justify-center ${theme.background}`}>
        <div className="text-center text-red-400">
          <p>Erro ao carregar os dados. Tente novamente mais tarde.</p>
        </div>
      </div>
    );
  }

  // Fallback warning (exibido apenas se estiver usando fallback)
  const showFallbackWarning = useFallback && !!content;

  // Renderização condicional por variante
  const renderVariant = () => {
    if (!content) return null; // não deveria acontecer

    switch (variant) {
      case 'marketing':
        return <MarketingVariant content={content} />;
      case 'ecommerce':
        // Se não houver layout específico, usa o DefaultVariant ou um componente próprio
        // return <EcommerceVariant content={content} />;
        return <DefaultVariant content={content} theme={theme} variant={variant} showFallbackWarning={showFallbackWarning} />;
      default:
        return <DefaultVariant content={content} theme={theme} variant={variant} showFallbackWarning={showFallbackWarning} />;
    }
  };

  return (
    <div ref={containerRef}>
      {renderVariant()}
      
    </div>
  );
}