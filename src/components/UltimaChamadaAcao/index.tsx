"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

// --- INTERFACES DINÂMICAS ---
interface FinalCtaData {
  text: {
    headline: string;
    highlight: string;
    description: string;
  };
  theme: {
    bg_color: string;
    gold_start: string;
    gold_end: string;
    button_bg: string;
  };
  calls_to_action: {
    primary: {
      label: string;
      href: string;
      icon: string;
    };
    secondary: {
      label: string;
      href: string;
      icon: string;
    };
  };
}

export default function FinalCtaSection() {
  const [data, setData] = useState<FinalCtaData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCtaData = async () => {
      try {
        const response = await fetch('/api-tegbe/tegbe-institucional/final-cta');
        const result = await response.json();
        if (result.final_cta) {
          setData(result.final_cta);
        }
      } catch (error) {
        console.error("Mavellium Engine - Erro:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCtaData();
  }, []);

  if (loading || !data) return null;

  const { text, theme, calls_to_action } = data;

  return (
    <section className="py-32 px-6 bg-white relative overflow-hidden flex flex-col items-center justify-center">
      
      {/* --- AMBIÊNCIA ORIGINAL --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#fafafa_1px,transparent_1px),linear-gradient(to_top,#fafafa_1px,transparent_1px)] bg-[size:4rem_4rem] bg-bottom [mask-image:radial-gradient(ellipse_80%_70%_at_50%_100%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-amber-100/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-multiply pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full text-center space-y-10">
        
        <h2 className="text-5xl md:text-7xl font-bold text-[#050505] tracking-tighter leading-[1.05]">
          {text.headline} <br />
          <span 
              className="text-transparent bg-clip-text drop-shadow-sm"
              style={{ backgroundImage: `linear-gradient(to right, ${theme.gold_start}, ${theme.gold_end})` }}
          >
            {text.highlight}
          </span>
        </h2>

        <p className="text-lg md:text-xl text-gray-500 font-medium max-w-xl mx-auto leading-relaxed whitespace-pre-line">
          {text.description}
        </p>

        {/* --- BOTÃO COM INVERSÃO DE COR (HOVER DOURADO) --- */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-6">
            
            <a href={calls_to_action.primary.href} className="group relative">
              {/* Sombra de contorno que brilha no hover */}
              <div 
                  className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-30 blur-xl transition-all duration-700"
                  style={{ background: `linear-gradient(to right, ${theme.gold_start}, ${theme.gold_end})` }}
              />
              
              <button 
                  className="relative overflow-hidden px-10 py-5 rounded-full font-black text-sm uppercase tracking-[0.2em] transition-all duration-500 flex items-center gap-4   shadow-xl"
                  style={{ backgroundColor: theme.button_bg }}
              >
                {/* LAYER DE PREENCHIMENTO DOURADO: 
                   Inicia fora do botão (translate-y) e sobe no hover 
                */}
                <div 
                    className="absolute inset-0 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
                    style={{ backgroundImage: `linear-gradient(to right, ${theme.gold_start}, ${theme.gold_end})` }}
                />

                {/* Texto: Muda de branco para preto no hover para contraste */}
                <span className="relative z-10 text-white group-hover:text-black transition-colors duration-500">
                    {calls_to_action.primary.label}
                </span>
                
                {/* Ícone: Fundo escurece no hover para destacar sobre o ouro */}
                <div className="relative z-10 w-8 h-8 rounded-full bg-white/10 group-hover:bg-black/10 flex items-center justify-center transition-all duration-500 group-hover:rotate-12">
                    <Icon 
                        icon={calls_to_action.primary.icon} 
                        className="w-5 h-5 text-white group-hover:text-black transition-colors duration-500" 
                    />
                </div>
              </button>
            </a>

            {/* Link Secundário (Mantido Original) */}
            <a 
                href={calls_to_action.secondary.href} 
                className="group flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-black uppercase tracking-widest transition-colors"
            >
                {calls_to_action.secondary.label}
                <Icon 
                    icon={calls_to_action.secondary.icon} 
                    className="group-hover:translate-x-1 transition-transform" 
                    style={{ color: theme.gold_start }}
                />
            </a>
        </div>
      </div>
    </section>
  );
}