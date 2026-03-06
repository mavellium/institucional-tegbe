"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceFlowProps } from './types';
import { THEMES } from './constants/themes';
import { useServiceFlowContent } from "./hooks/useServiceFlowContent";
import { DefaultVariant } from "./variants/DefaultVariant";
import { MarketingVariant } from "./variants/MarketingVariant";

export default function ServiceFlow({ variant = 'ecommerce' }: ServiceFlowProps) {
  const { content, loading, error, useFallback } = useServiceFlowContent(variant);
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = THEMES[variant];

  useGSAP(() => {
    if (loading || !content || variant === 'marketing' || !containerRef.current) return;

    const container = containerRef.current;

    // Função para criar animações após tudo carregado
    const createAnimations = () => {
      // Mata qualquer ScrollTrigger anterior dentro do container
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger && container.contains(st.trigger)) {
          st.kill();
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none none",
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
    };

    // Aguarda imagens carregarem
    const images = container.querySelectorAll('img');
    const imagePromises = Array.from(images).map(img =>
      img.complete ? Promise.resolve() : new Promise(resolve => { img.onload = resolve; img.onerror = resolve; })
    );

    Promise.all(imagePromises).then(() => {
      ScrollTrigger.refresh();
      createAnimations();
    });

    return () => {
      // Limpeza completa de todos os triggers deste container
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger && container.contains(st.trigger)) {
          st.kill();
        }
      });
    };
  }, { dependencies: [loading, content, variant], scope: containerRef });

  // Renderização condicional...
  if (error && !content) {
    return <div className={`flex items-center justify-center ${theme.background}`}>Erro ao carregar.</div>;
  }

  const renderVariant = () => {
    if (!content) return null;
    switch (variant) {
      case 'marketing':
        return <MarketingVariant content={content} />;
      default:
        return <DefaultVariant content={content} theme={theme} variant={variant} showFallbackWarning={useFallback} />;
    }
  };

  return (
  <div ref={containerRef}>
    {renderVariant()}
  </div>
  );
}