"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

// --- IMPORTAÇÕES DOS LAYOUTS ---
import { HeadlineEcommerce } from "@/components/HeadlineEcommerce";
import { HeadlineMarketing } from "@/components/HeadlineMarketing";
import { HeadlineHome } from "../HeadlineHome";

// --- INTERFACES ---
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
}

type HeadlineVariant = 'home' | 'ecommerce' | 'marketing' | 'sobre';

const themeConfig = {
  home: { primary: "#FFCC00", selection: "selection:bg-yellow-500/30", badge: { border: "border-white/10", bg: "bg-white/5" }, spotlight: "bg-blue-900/20", button: { glow: "from-yellow-600 to-yellow-400", bg: "bg-[#FFCC00]", hover: "hover:bg-[#ffdb4d]", border: "border-yellow-500/20", text: "text-black" }, text: { highlight: "border-b border-yellow-500/50", shadow: "drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]" } },
  ecommerce: { primary: "#FFCC00", selection: "selection:bg-yellow-500/30", badge: { border: "border-white/10", bg: "bg-white/5" }, spotlight: "bg-blue-900/20", button: { glow: "from-yellow-600 to-yellow-400", bg: "bg-[#FFCC00]", hover: "hover:bg-[#ffdb4d]", border: "border-yellow-500/20", text: "text-black" }, text: { highlight: "border-b border-yellow-500/50", shadow: "drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]" } },
  marketing: { primary: "#E31B63", selection: "selection:bg-rose-500/30", badge: { border: "border-rose-500/10", bg: "bg-rose-900/5" }, spotlight: "bg-[#D90429]/15", button: { glow: "from-[#FF0F43] to-[#990033]", bg: "bg-[#E60045]", hover: "hover:bg-[#ff1758]", border: "border-rose-500/20", text: "text-white" }, text: { highlight: "border-b border-rose-500/50", shadow: "drop-shadow-[0_0_20px_rgba(227,27,99,0.4)]" } },
  sobre: { primary: "#0071E3", selection: "selection:bg-blue-500/30", badge: { border: "border-blue-500/10", bg: "bg-blue-900/5" }, spotlight: "bg-blue-900/20", button: { glow: "from-blue-600 to-blue-400", bg: "bg-[#0071E3]", hover: "hover:bg-[#1a81eb]", border: "border-blue-500/20", text: "text-white" }, text: { highlight: "border-b border-blue-500/50", shadow: "drop-shadow-[0_0_15px_rgba(0,113,227,0.4)]" } }
};

export function Headline({ variant }: { variant?: HeadlineVariant }) {
  const [data, setData] = useState<HeadlineJsonData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeadline = async () => {
      try {
        const response = await fetch('https://tegbe-dashboard.vercel.app/api/tegbe-institucional/headline');
        const result = await response.json();
        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error("Mavellium Engine - Erro ao carregar Headline:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHeadline();
  }, []);

  if (loading || !data) return (
    <div className="h-screen w-full bg-[#020202] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const activeVariant = (variant || data.defaultTheme || 'home') as HeadlineVariant;
  const content = data[activeVariant] || data.home;
  const theme = themeConfig[activeVariant] || themeConfig.home;

  // Lógica de Renderização de Layouts Específicos
  if (activeVariant === 'ecommerce') return <HeadlineEcommerce content={content} theme={theme} />;
  if (activeVariant === 'marketing') return <HeadlineMarketing content={content} theme={theme} />;
  if (activeVariant === 'home') return <HeadlineHome content={content} theme={theme} />;

  // Fallback Minimalista
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center bg-[#020202] text-center p-6">
       <h1 className="text-white text-5xl font-bold mb-4">{content.titulo?.chamada}</h1>
       <p className="text-gray-400 max-w-2xl">{content.subtitulo}</p>
    </section>
  );
}