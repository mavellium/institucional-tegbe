"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

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

  // --- ENGINE 3D MAVELLIUM ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  useEffect(() => {
    const fetchHeadline = async () => {
      try {
        const response = await fetch('https://tegbe-dashboard.vercel.app/api/tegbe-institucional/headline');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Mavellium Engine - Error:", error);
        // Em caso de erro, mantém data = null para exibir loading infinito?
        // Melhor: talvez definir um estado de erro e exibir algo, mas por enquanto só loga.
      } finally {
        setLoading(false);
      }
    };
    fetchHeadline();
  }, []);

  // --- LOADING ---
  if (loading) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#020202] overflow-hidden">
        {/* Background sutil igual ao do headline */}
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 bg-yellow-500/20" />
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="w-12 h-12 border-3 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin" />
          <span className="text-sm text-gray-400 font-medium tracking-wider uppercase animate-pulse">
            Carregando experiência...
          </span>
        </div>
      </div>
    );
  }

  // Se após o loading ainda não houver dados, podemos mostrar uma mensagem de erro ou fallback mínimo.
  // O usuário pediu para remover o fallback, então caso não haja dados, também exibimos loading?
  // Vamos assumir que a API sempre retorna algo, mas por segurança:
  if (!data) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#020202]">
        <p className="text-gray-500">Não foi possível carregar o conteúdo.</p>
      </div>
    );
  }

  const activeVariant = (variant || data.defaultTheme || 'home') as HeadlineVariant;
  const content = data[activeVariant];
  const theme = themeConfig[activeVariant] || themeConfig.home;

  // Renderização condicional dos layouts especializados
  if (activeVariant === 'ecommerce') return <HeadlineEcommerce content={content} theme={theme} />;
  if (activeVariant === 'marketing') return <HeadlineMarketing content={content} theme={theme} />;
  if (activeVariant === 'home') return <HeadlineHome content={content} theme={theme} />;

  // Fallback genérico para 'sobre' ou outras variantes
  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="relative w-full h-screen flex flex-col justify-center items-center bg-[#020202] text-center px-4 overflow-hidden"
      style={{ perspective: "1500px" }}
    >
      <div className={`absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none ${theme.spotlight}`} />

      <div className="flex flex-col items-start text-left w-full max-w-7xl mx-auto px-4 z-10">
        <motion.h1 
          initial={false}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-1 mb-4"
          style={{ transformStyle: "preserve-3d" }}
        >
          {content.titulo?.chamada && (
            <span className="text-xs md:text-sm font-bold text-yellow-500/80 tracking-[0.2em] uppercase mb-2">
              {content.titulo.chamada}
            </span>
          )}
          
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-[clamp(2rem,5.5vw,4.5rem)] font-black text-white leading-[0.9] tracking-tighter uppercase max-w-[12ch] md:max-w-[15ch]"
                style={{ transform: "translateZ(50px)" }}>
            {content.titulo?.tituloPrincipal}
          </span>

          {content.titulo?.palavrasAnimadas?.[0] && (
            <span 
              className="text-4xl md:text-6xl lg:text-[clamp(2.5rem,6vw,5rem)] font-black italic leading-[0.8] drop-shadow-2xl"
              style={{ 
                color: content.titulo.palavrasAnimadas[0].cor,
                transform: "translateZ(80px)"
              }}
            >
              {content.titulo.palavrasAnimadas[0].texto}
            </span>
          )}
        </motion.h1>

        <motion.p 
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-sm md:text-base lg:text-lg font-light max-w-md md:max-w-lg leading-relaxed mb-8"
          style={{ transform: "translateZ(30px)" }}
        >
          {content.subtitulo}
        </motion.p>
      </div>
    </section>
  );
}