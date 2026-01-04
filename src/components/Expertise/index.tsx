"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import { motion } from "framer-motion";

// --- INTERFACE DE DADOS (CMS) ---
export interface ExpertiseData {
  theme: {
    accentColor: string; // Ex: #E31B63 (Vermelho) ou #FFD700 (Dourado)
    secondaryColor: string; // Tom mais escuro para gradientes
  };
  header: {
    badgeIcon: string;
    badgeText: string;
    titleLine1: string;
    titleHighlight: string;
  };
  visual: {
    imageSrc: string;
    imageAlt: string;
    floatingCard: {
      icon: string;
      title: string;
      subtitle: string;
    };
  };
  content: {
    paragraph1: string; // Suporta HTML string para <strong>
    paragraph2: string; // Suporta HTML string para <strong>
  };
  cta: {
    text: string;
    link: string;
  };
}

interface ExpertiseSectionProps {
  config: ExpertiseData;
}

export default function ExpertiseSection({ config }: ExpertiseSectionProps) {
  const { theme, header, visual, content, cta } = config;

  return (
    <section className="relative py-24 px-4 sm:px-8 lg:px-10 bg-[#020202] flex justify-center items-center border-t border-white/5 overflow-hidden font-sans">
      
      {/* Texture Noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      {/* Luz Ambiental Dinâmica */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[120px] pointer-events-none opacity-10"
        style={{ backgroundColor: theme.accentColor }}
      />

      <div className="mx-auto relative max-w-[1400px] z-10 flex flex-col items-center">

        {/* BADGE */}
        <div 
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-opacity-10 backdrop-blur-md"
          style={{ 
            borderColor: `${theme.accentColor}4D`, // 30% opacity
            backgroundColor: `${theme.accentColor}1A`, // 10% opacity
            boxShadow: `0 0 15px ${theme.accentColor}1A`
          }}
        >
            <Icon icon={header.badgeIcon} className="w-5 h-5" style={{ color: theme.accentColor }} />
            <span 
              className="text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase"
              style={{ color: '#fff' }} // Mantive branco para contraste, ou use theme.accentColor com opacidade
            >
                {header.badgeText}
            </span>
        </div>

        {/* TÍTULO */}
        <h1 className="mb-12 text-center font-bold text-white text-[28px] sm:text-[36px] md:text-[50px] leading-[1.1] max-w-4xl tracking-tight">
          {header.titleLine1} <br/>
          <span 
            className="text-transparent bg-clip-text bg-gradient-to-r"
            style={{ 
              backgroundImage: `linear-gradient(to right, ${theme.accentColor}, ${theme.secondaryColor})`,
              filter: `drop-shadow(0 0 25px ${theme.accentColor}66)`
            }}
          >
            {header.titleHighlight}
          </span>
        </h1>

        {/* IMAGEM */}
        <div className="relative rounded-3xl overflow-hidden flex justify-center w-full max-w-[1200px] group border border-white/10 bg-[#0A0A0A]">
          
          {/* Brilho na borda ao hover (Dinâmico) */}
          <div 
            className="absolute inset-0 border-2 border-transparent rounded-3xl transition-colors duration-500 z-20 pointer-events-none group-hover:border-opacity-40"
            style={{ borderColor: 'transparent' }} // Default
          />
          {/* Hack para hover border color dinâmico via style tag ou CSS variable seria ideal, mas aqui usaremos inline no parent se necessário, ou deixamos fixo e usamos opacity. */}
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
          
          {/* Overlay Gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-70"></div>
          
          {/* Floating Card */}
          <div 
            className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-xl hidden sm:flex items-center gap-4"
            style={{ borderColor: `${theme.accentColor}33` }}
          >
             <div className="p-2 rounded-lg" style={{ backgroundColor: theme.accentColor }}>
                <Icon icon={visual.floatingCard.icon} className="text-black w-6 h-6" /> {/* Icone preto para contraste no accent */}
             </div>
             <div>
                <p className="text-white font-bold text-sm">{visual.floatingCard.title}</p>
                <p className="text-xs" style={{ color: theme.accentColor }}>{visual.floatingCard.subtitle}</p>
             </div>
          </div>
        </div>

        {/* TEXTO FINAL */}
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

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <a aria-label="cta button" href={cta.link} className="group relative">
            
            {/* Glow Button */}
            <div 
              className="absolute -inset-1 rounded-full opacity-40 blur-md group-hover:opacity-70 transition duration-500"
              style={{ background: `linear-gradient(to right, ${theme.accentColor}, ${theme.secondaryColor})` }}
            ></div>
            
            <button 
              className="relative text-black px-12 py-4 rounded-full font-bold text-sm md:text-base uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] flex items-center gap-3 border border-white/10"
              style={{ 
                backgroundColor: theme.accentColor,
                boxShadow: `0 0 20px ${theme.accentColor}4D`
              }}
            >
              {cta.text}
              <Icon icon="lucide:arrow-right" className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
            </button>
          </a>
        </div>

      </div>
    </section>
  );
}