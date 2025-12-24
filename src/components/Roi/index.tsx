"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import { Icon } from "@iconify/react";

// Registrar apenas se estiver no cliente
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Interfaces para tipagem
export interface RoiCardData {
  id: number;
  title: string;
  highlightedText: string;
  description: string;
  icon: string;
  iconBgColor: string;
  backgroundColor: string;
  primaryColor: string;
  backgroundImage: string;
  hasPhoneImage?: boolean;
  phoneImage?: string;
  phoneImageSize?: {
    width: number;
    height: number;
  };
  gradient?: {
    from: string;
    via?: string;
    to: string;
    opacity?: number;
  };
}

export interface RoiSectionData {
  id?: string;
  title?: string;
  subtitle?: string;
  backgroundColor?: string;
  padding?: {
    vertical: string;
    horizontal: string;
  };
  animation?: {
    delay?: number;
    stagger?: number;
    duration?: number;
  };
  cards: RoiCardData[];
}

interface RoiProps {
  data: RoiSectionData;
  className?: string;
}

// Componente Card Individual
function RoiCard({ card }: { card: RoiCardData }) {
  return (
    <div
      className="roi-card relative overflow-hidden w-full lg:w-1/2 min-h-[500px] lg:h-[700px] rounded-[2rem] p-8 sm:p-10 group shadow-2xl"
      style={{ backgroundColor: card.backgroundColor }}
    >
      {/* Fundo com Zoom suave no Hover */}
      <div className="absolute inset-0">
        <Image
          src={card.backgroundImage}
          fill
          className="object-cover opacity-60 group-hover:scale-105 group-hover:opacity-50 transition-all duration-700 ease-out"
          alt={card.title}
          quality={90}
        />
        {/* Gradiente personalizável */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, 
              ${card.gradient?.from || 'rgba(0,0,0,0.9)'} 0%, 
              ${card.gradient?.via || 'rgba(0,0,0,0.4)'} 50%, 
              ${card.gradient?.to || 'transparent'} 100%)`,
            opacity: card.gradient?.opacity || 1
          }}
        />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Ícone ou Badge */}
        <div
          className="w-12 h-12 rounded-xl p-3 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,0,0,0.3)]"
          style={{ backgroundColor: card.iconBgColor }}
        >
          <Icon icon={card.icon} width="28" height="28" className="text-white" />
        </div>

        <div className="flex-1">
          <h2 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl mb-4 leading-tight">
            {card.title} <br/>
            <span style={{ color: card.primaryColor }}>{card.highlightedText}</span>
          </h2>
          
          <div
            className="w-20 h-1 mb-6 rounded-full"
            style={{ backgroundColor: card.primaryColor }}
          />

          <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed max-w-md mb-6">
            {card.description}
          </p>
        </div>

        {/* Imagem do Celular se configurada */}
        {card.hasPhoneImage && card.phoneImage && (
          <div className="relative w-full flex justify-center mt-auto">
            <div 
              className="absolute bottom-0 w-3/4 h-32 blur-3xl rounded-full pointer-events-none"
              style={{ backgroundColor: `${card.primaryColor}20` }}
            />
            
            <div className="relative w-58 sm:w-64 md:w-72 h-60 sm:h-70 transform group-hover:-translate-y-2 transition-transform duration-500">
              <Image
                src={card.phoneImage}
                width={card.phoneImageSize?.width || 400}
                height={card.phoneImageSize?.height || 600}
                alt={card.title}
                className="drop-shadow-2xl"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Componente Principal
export function Roi({ data, className = "" }: RoiProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Destructuring com valores padrão
  const {
    id = "roi",
    title,
    subtitle,
    backgroundColor = "#F4F4F4",
    padding = { vertical: "py-16 md:py-24", horizontal: "px-4 sm:px-6 lg:px-8" },
    animation = { delay: 0, stagger: 0.2, duration: 1 },
    cards = []
  } = data;

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const cardElements = containerRef.current.querySelectorAll(".roi-card");
    
    gsap.set(cardElements, { opacity: 0, y: 50 });

    gsap.to(cardElements, {
      opacity: 1,
      y: 0,
      duration: animation.duration,
      stagger: animation.stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: containerRef });

  return (
    <section
      id={id}
      ref={containerRef}
      className={`w-full ${padding.vertical} ${padding.horizontal} ${className}`}
      style={{ backgroundColor }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Cabeçalho opcional */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Grid de Cards */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {cards.map((card) => (
            <RoiCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Dados de exemplo em JSON
export const defaultRoiData: RoiSectionData = {
  id: "roi",
  backgroundColor: "#F4F4F4",
  padding: {
    vertical: "py-16 md:py-24",
    horizontal: "px-4 sm:px-6 lg:px-8"
  },
  animation: {
    delay: 0,
    stagger: 0.2,
    duration: 1
  },
  cards: [
    {
      id: 1,
      title: "Consultoria Oficial",
      highlightedText: "Mercado Livre.",
      description: "Inteligência certificada para levar sua conta ao nível Platinum. Unimos nosso braço operacional à autoridade do maior marketplace do país. O selo que valida o nosso conhecimento para garantir o seu resultado.",
      icon: "mdi:handshake-outline",
      iconBgColor: "#FFCC00",
      backgroundColor: "#0A0A0A",
      primaryColor: "#FFCC00",
      backgroundImage: "/card1.png",
      gradient: {
        from: "rgba(0,0,0,0.9)",
        via: "rgba(0,0,0,0.4)",
        to: "transparent",
        opacity: 1
      },
    },
    {
      id: 2,
      title: "Especialistas em escala",
      highlightedText: "na Shopee.",
      description: "Dominamos os algoritmos para colocar seus produtos no topo das buscas. Gestão operacional completa para transformar cliques em vendas diárias.",
      icon: "mdi:shopping-outline",
      iconBgColor: "#FF5722",
      backgroundColor: "#0A0A0A",
      primaryColor: "#FF5722",
      backgroundImage: "/card2.png",
      gradient: {
        from: "rgba(0,0,0,1)",
        via: "rgba(0,0,0,0.5)",
        to: "transparent",
        opacity: 1
      },
      hasPhoneImage: true,
      phoneImage: "/celular-roi.png",
      phoneImageSize: {
        width: 400,
        height: 600
      },
    }
  ]
};

// Exemplo de JSON para usar em CMS
export const roiDataJSON = {
  "id": "roi-section",
  "title": "Nossas Soluções",
  "subtitle": "Estratégias personalizadas para cada marketplace",
  "backgroundColor": "#F4F4F4",
  "cards": [
    {
      "id": 1,
      "title": "Consultoria Oficial",
      "highlightedText": "Mercado Livre",
      "description": "Descrição personalizada do serviço...",
      "icon": "mdi:handshake",
      "iconBgColor": "#FFCC00",
      "backgroundColor": "#0A0A0A",
      "primaryColor": "#FFCC00",
      "backgroundImage": "/images/card1.jpg",
      "features": [
        { "text": "Benefício 1", "icon": "mdi:check" },
        { "text": "Benefício 2", "icon": "mdi:check" }
      ],
      "cta": {
        "text": "Contratar",
        "action": "whatsapp",
        "value": "https://wa.me/5514991779502"
      }
    },
    {
      "id": 2,
      "title": "Performance em",
      "highlightedText": "Amazon",
      "description": "Outra descrição de serviço...",
      "icon": "mdi:amazon",
      "iconBgColor": "#FF9900",
      "backgroundColor": "#0A0A0A",
      "primaryColor": "#FF9900",
      "backgroundImage": "/images/card2.jpg",
      "hasPhoneImage": true,
      "phoneImage": "/images/phone-dashboard.png",
      "phoneImageSize": {
        "width": 400,
        "height": 600
      },
      "cta": {
        "text": "Ver casos",
        "action": "link",
        "value": "/casos-de-sucesso"
      }
    }
  ]
};