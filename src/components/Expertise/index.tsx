"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";

// Interface de Dados Atualizada
export interface ExpertiseData {
  theme: { 
    accentColor: string; 
    secondaryColor: string;
    buttonTextColor: string; // Nova: Controle de cor do texto do CTA
    buttonIconColor: string; // Nova: Controle de cor do ícone do CTA
  };
  header: { badgeIcon: string; badgeText: string; titleLine1: string; titleHighlight: string; };
  visual: { imageSrc: string; imageAlt: string; floatingCard: { icon: string; title: string; subtitle: string; }; };
  content: { paragraph1: string; paragraph2: string; };
  cta: { text: string; link: string; };
}

const FALLBACKS: Record<string, ExpertiseData> = {
  marketing: {
    theme: { 
        accentColor: "#FF0F43", 
        secondaryColor: "#E31B63",
        buttonTextColor: "#FFFFFF",
        buttonIconColor: "#FFFFFF"
    },
    header: {
      badgeIcon: "mdi:ChartLineVariant",
      badgeText: "Engenharia de Vendas",
      titleLine1: "Design de Elite focado em",
      titleHighlight: "Alta Conversão"
    },
    visual: {
      imageSrc: "/images/marketing-showcase.webp",
      imageAlt: "Marketing de Performance",
      floatingCard: { icon: "mdi:trending-up", title: "ROI Exponencial", subtitle: "Data-Driven" }
    },
    content: {
      paragraph1: "Transformamos tráfego frio em <strong>lucro real</strong> através de ecossistemas que rodam 24/7.",
      paragraph2: "Seu negócio merece uma estrutura que evoque <strong>autoridade e desejo</strong> imediato."
    },
    cta: { text: "Escalar meu faturamento", link: "#contato" }
  },
  cursos: {
    theme: { 
        accentColor: "#FFD700", 
        secondaryColor: "#B8860B",
        buttonTextColor: "#000000", 
        buttonIconColor: "#000000"
    },
    header: {
      badgeIcon: "mdi:school",
      badgeText: "Ecossistema de Infoprodutos",
      titleLine1: "Experiência de Aprendizado de",
      titleHighlight: "Alto Valor Percebido"
    },
    visual: {
      imageSrc: "/images/course-showcase.webp",
      imageAlt: "Plataforma de Alunos",
      floatingCard: { icon: "mdi:star", title: "LTV Máximo", subtitle: "Retenção de Alunos" }
    },
    content: {
      paragraph1: "Criamos LPs de lançamento e áreas de membros que transformam conhecimento em um <strong>ativo de luxo</strong>.",
      paragraph2: "O mercado de cursos está saturado de amadorismo. Nós entregamos o <strong>Padrão Rolls-Royce</strong> para o seu infoproduto."
    },
    cta: { text: "Profissionalizar meu curso", link: "#contato" }
  }
};

interface ExpertiseProps {
  endpoint?: string;
  variant?: "marketing" | "cursos";
}

export default function Expertise({ endpoint, variant = "marketing" }: ExpertiseProps) {
  const initialData = FALLBACKS[variant] || FALLBACKS.marketing;
  const [config, setConfig] = useState<ExpertiseData>(initialData);

  useEffect(() => {
    if (endpoint) {
      fetch(endpoint)
        .then(res => res.json())
        .then(json => setConfig(json))
        .catch(() => setConfig(initialData));
    }
  }, [endpoint, initialData]);

  const { theme, header, visual, content, cta } = config;

  return (
    <section className="relative py-24 px-4 sm:px-8 lg:px-10 bg-[#020202] flex justify-center items-center border-t border-white/5 overflow-hidden font-sans">
      
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[120px] pointer-events-none opacity-10 transition-colors duration-1000"
        style={{ backgroundColor: theme.accentColor }}
      />

      <div className="mx-auto relative max-w-[1400px] z-10 flex flex-col items-center">

        {/* BADGE */}
        <div 
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-opacity-10 backdrop-blur-md transition-all duration-500"
          style={{ 
            borderColor: `${theme.accentColor}4D`,
            backgroundColor: `${theme.accentColor}1A`,
            boxShadow: `0 0 15px ${theme.accentColor}1A`
          }}
        >
            <Icon icon={header.badgeIcon} className="w-5 h-5" style={{ color: theme.accentColor }} />
            <span className="text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase text-white">
                {header.badgeText}
            </span>
        </div>

        {/* TÍTULO */}
        <h1 className="mb-12 text-center font-bold text-white text-[28px] sm:text-[36px] md:text-[50px] leading-[1.1] max-w-4xl tracking-tight">
          {header.titleLine1} <br/>
          <span 
            className="text-transparent bg-clip-text bg-gradient-to-r transition-all duration-1000"
            style={{ 
              backgroundImage: `linear-gradient(to right, ${theme.accentColor}, ${theme.secondaryColor})`,
              filter: `drop-shadow(0 0 25px ${theme.accentColor}66)`
            }}
          >
            {header.titleHighlight}
          </span>
        </h1>

        {/* IMAGEM COM FLOATING CARD */}
        <div className="relative rounded-3xl overflow-hidden flex justify-center w-full max-w-[1200px] group border border-white/10 bg-[#0A0A0A]">
          <div 
             className="absolute inset-0 rounded-3xl z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
             style={{ border: `2px solid ${theme.accentColor}66` }} 
          />
          
          <Image
            src={visual.imageSrc} 
            alt={visual.imageAlt}
            width={1376}
            height={774}
            className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.01] transition-all duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-70"></div>
          
          <div 
            className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-xl hidden sm:flex items-center gap-4 transition-all duration-500"
            style={{ borderColor: `${theme.accentColor}33` }}
          >
             <div className="p-2 rounded-lg transition-colors duration-500 shadow-[0_0_15px_rgba(255,15,67,0.4)]" style={{ backgroundColor: theme.accentColor }}>
                <Icon icon={visual.floatingCard.icon} className="text-white w-6 h-6" />
             </div>
             <div>
                <p className="text-white font-bold text-sm">{visual.floatingCard.title}</p>
                <p className="text-xs" style={{ color: theme.accentColor }}>{visual.floatingCard.subtitle}</p>
             </div>
          </div>
        </div>

        {/* COPYWRITING */}
        <div className="mt-16 max-w-4xl text-center flex flex-col gap-6 px-5">
            <div 
              className="text-gray-300 text-lg md:text-xl font-light leading-relaxed [&>strong]:text-white [&>strong]:font-bold"
              dangerouslySetInnerHTML={{ __html: content.paragraph1 }}
            />
            <div 
              className="text-gray-400 text-base md:text-lg font-light max-w-3xl mx-auto [&>strong]:text-white [&>strong]:font-bold"
              dangerouslySetInnerHTML={{ __html: content.paragraph2 }}
            />
        </div>

        {/* CTA BUTTON - ATUALIZADO */}
        <div className="mt-12 flex justify-center">
          <a aria-label="cta button" href={cta.link} className="group relative">
            <div 
              className="absolute -inset-1 rounded-full opacity-40 blur-md group-hover:opacity-70 transition duration-500"
              style={{ background: `linear-gradient(to right, ${theme.accentColor}, ${theme.secondaryColor})` }}
            ></div>
            <button 
              className="relative px-12 py-4 rounded-full font-bold text-sm md:text-base uppercase tracking-wider transition-all duration-500 hover:scale-[1.05] flex items-center gap-3 border border-white/10"
              style={{ 
                backgroundColor: theme.accentColor, // Agora usa a cor de destaque
                color: theme.buttonTextColor, // Cor do texto dinâmica
                boxShadow: `0 0 25px ${theme.accentColor}4D`
              }}
            >
              {cta.text}
              <Icon 
                icon="lucide:arrow-right" 
                className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                style={{ color: theme.buttonIconColor }} // Cor do ícone dinâmica
              />
            </button>
          </a>
        </div>

      </div>
    </section>
  );
}