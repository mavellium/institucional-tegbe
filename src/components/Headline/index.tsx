"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button"; 
import { motion, AnimatePresence } from "framer-motion";

// --- IMPORTAÇÕES DOS LAYOUTS ---
import { HeadlineEcommerce } from "@/components/HeadlineEcommerce";
import { HeadlineMarketing } from "@/components/HeadlineMarketing";
import { HeadlineHome } from "../HeadlineHome";

// --- INTERFACES (Mantidas iguais) ---
interface JsonBadge { cor: string; icone: string; texto: string; visivel: boolean; }
interface JsonBotao { link: string; icone: string; texto: string; estilo: string; visivel: boolean; }
interface JsonAgenda { mes: string; texto: string; status: string; visivel: boolean; corStatus: string; }
interface JsonTitulo { chamada: string; separador: string; tituloPrincipal: string; palavrasAnimadas: Array<{ texto: string; cor: string }>; }
interface JsonConfig { efeitos: { grid: boolean; spotlight: boolean; brilhoTitulo: string; sombraInferior: boolean; }; corFundo: string; corDestaque: string; intervaloAnimacao: number; }
interface JsonVariantData { badge: JsonBadge; botao: JsonBotao; agenda: JsonAgenda; titulo: JsonTitulo; subtitulo: string; configuracoes: JsonConfig; }

export interface HeadlineJsonData {
  home: JsonVariantData;
  sobre: JsonVariantData;
  ecommerce: JsonVariantData;
  marketing: JsonVariantData;
  defaultTheme: string;
  [key: string]: any; 
}

type HeadlineVariant = 'home' | 'ecommerce' | 'marketing' | 'sobre';

interface HeadlineProps {
  variant?: HeadlineVariant; 
  data: HeadlineJsonData;    
}

// --- CONFIGURAÇÃO DE TEMAS (Mantida para fallbacks) ---
const themeConfig = {
  home: { primary: "#FFCC00", selection: "selection:bg-yellow-500/30", badge: { border: "border-white/10", bg: "bg-white/5" }, spotlight: "bg-blue-900/20", button: { glow: "from-yellow-600 to-yellow-400", bg: "bg-[#FFCC00]", hover: "hover:bg-[#ffdb4d]", border: "border-yellow-500/20", text: "text-black" }, text: { highlight: "border-b border-yellow-500/50", shadow: "drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]" } },
  ecommerce: { primary: "#FFCC00", selection: "selection:bg-yellow-500/30", badge: { border: "border-white/10", bg: "bg-white/5" }, spotlight: "bg-blue-900/20", button: { glow: "from-yellow-600 to-yellow-400", bg: "bg-[#FFCC00]", hover: "hover:bg-[#ffdb4d]", border: "border-yellow-500/20", text: "text-black" }, text: { highlight: "border-b border-yellow-500/50", shadow: "drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]" } },
  marketing: { primary: "#E31B63", selection: "selection:bg-rose-500/30", badge: { border: "border-rose-500/10", bg: "bg-rose-900/5" }, spotlight: "bg-[#D90429]/15", button: { glow: "from-[#FF0F43] to-[#990033]", bg: "bg-[#E60045]", hover: "hover:bg-[#ff1758]", border: "border-rose-500/20", text: "text-white" }, text: { highlight: "border-b border-rose-500/50", shadow: "drop-shadow-[0_0_20px_rgba(227,27,99,0.4)]" } },
  sobre: { primary: "#0071E3", selection: "selection:bg-blue-500/30", badge: { border: "border-blue-500/10", bg: "bg-blue-900/5" }, spotlight: "bg-blue-900/20", button: { glow: "from-blue-600 to-blue-400", bg: "bg-[#0071E3]", hover: "hover:bg-[#1a81eb]", border: "border-blue-500/20", text: "text-white" }, text: { highlight: "border-b border-blue-500/50", shadow: "drop-shadow-[0_0_15px_rgba(0,113,227,0.4)]" } }
};

export function Headline({ variant, data }: HeadlineProps) {
  const activeVariant = (variant || data.defaultTheme || 'home') as HeadlineVariant;
  const content = data[activeVariant] || data.home;
  const theme = themeConfig[activeVariant] || themeConfig.home;

  // --- LÓGICA DE DECISÃO DE LAYOUT ---
  
  if (activeVariant === 'ecommerce') {
    return <HeadlineEcommerce content={content} theme={theme} />;
  }

  if (activeVariant === 'marketing') {
    return <HeadlineMarketing content={content} theme={theme} />;
  }

  // AGORA A HOME TAMBÉM TEM LAYOUT EXCLUSIVO
  if (activeVariant === 'home') {
    return <HeadlineHome content={content} theme={theme} />;
  }

  // --- FALLBACK (Apenas para 'sobre' ou erro) ---
  const [wordIndex, setWordIndex] = useState(0);
  useEffect(() => {
    const palavras = content.titulo?.palavrasAnimadas;
    if (!palavras || palavras.length === 0) return;
    const interval = setInterval(() => setWordIndex((prev) => (prev + 1) % palavras.length), 2500);
    return () => clearInterval(interval);
  }, [content]);

  const renderHTML = (htmlString: string) => ({ __html: htmlString });
  const badgeIcon = content.badge?.icone || "mdi:star-shooting";

  return (
    <section className={`relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#020202] pt-[80px] pb-[20px]`} style={{ backgroundColor: content.configuracoes?.corFundo }}>
      {/* ... (Manter código do fallback se desejar, mas Home já está coberta acima) ... */}
      <div className="container relative z-20 px-4 flex flex-col items-center text-center">
         <h1 className="text-white text-4xl font-bold">{content.titulo?.chamada}</h1>
         <div className="text-gray-400 mt-4" dangerouslySetInnerHTML={renderHTML(content.subtitulo)} />
      </div>
    </section>
  );
}