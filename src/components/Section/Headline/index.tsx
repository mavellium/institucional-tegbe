"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { HeadlineEcommerce } from "@/components/Section/HeadlineEcommerce";
import { HeadlineMarketing } from "@/components/Section/HeadlineMarketing";
import { HeadlineHome } from "../HeadlineHome";

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

type HeadlineVariant = "home" | "ecommerce" | "marketing" | "sobre";

interface HeadlineProps {
  variant?: HeadlineVariant;
  data: HeadlineJsonData;
}

const themeConfig = {
  home: {
    primary: "#FFCC00",
    selection: "selection:bg-yellow-500/30",
    badge: { border: "border-white/10", bg: "bg-white/5" },
    spotlight: "bg-blue-900/20",
    button: {
      glow: "from-yellow-600 to-yellow-400",
      bg: "bg-[#FFCC00]",
      hover: "hover:bg-[#ffdb4d]",
      border: "border-yellow-500/20",
      text: "text-black"
    },
    text: {
      highlight: "border-b border-yellow-500/50",
      shadow: "drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
    }
  },

  ecommerce: {
    primary: "#FFCC00",
    selection: "selection:bg-yellow-500/30",
    badge: { border: "border-white/10", bg: "bg-white/5" },
    spotlight: "bg-blue-900/20",
    button: {
      glow: "from-yellow-600 to-yellow-400",
      bg: "bg-[#FFCC00]",
      hover: "hover:bg-[#ffdb4d]",
      border: "border-yellow-500/20",
      text: "text-black"
    },
    text: {
      highlight: "border-b border-yellow-500/50",
      shadow: "drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
    }
  },

  marketing: {
    primary: "#E31B63",
    selection: "selection:bg-rose-500/30",
    badge: { border: "border-rose-500/10", bg: "bg-rose-900/5" },
    spotlight: "bg-[#D90429]/15",
    button: {
      glow: "from-[#FF0F43] to-[#990033]",
      bg: "bg-[#E60045]",
      hover: "hover:bg-[#ff1758]",
      border: "border-rose-500/20",
      text: "text-white"
    },
    text: {
      highlight: "border-b border-rose-500/50",
      shadow: "drop-shadow-[0_0_20px_rgba(227,27,99,0.4)]"
    }
  },

  sobre: {
    primary: "#0071E3",
    selection: "selection:bg-blue-500/30",
    badge: { border: "border-blue-500/10", bg: "bg-blue-900/5" },
    spotlight: "bg-blue-900/20",
    button: {
      glow: "from-blue-600 to-blue-400",
      bg: "bg-[#0071E3]",
      hover: "hover:bg-[#1a81eb]",
      border: "border-blue-500/20",
      text: "text-white"
    },
    text: {
      highlight: "border-b border-blue-500/50",
      shadow: "drop-shadow-[0_0_15px_rgba(0,113,227,0.4)]"
    }
  }
};


export function Headline({ variant, data }: HeadlineProps) {

  // ENGINE 3D
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

  const activeVariant =
    (variant || data.defaultTheme || "home") as HeadlineVariant;

  const content = data[activeVariant];
  const theme = themeConfig[activeVariant] || themeConfig.home;

  // Layouts específicos
  if (activeVariant === "ecommerce")
    return <HeadlineEcommerce content={content} theme={theme} />;

  if (activeVariant === "marketing")
    return <HeadlineMarketing content={content} theme={theme} />;

  if (activeVariant === "home")
    return <HeadlineHome content={content} theme={theme} />;

  // Layout padrão (sobre)
  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="relative w-full min-h-[100svh] flex flex-col justify-center items-center bg-[#020202] text-center px-4 overflow-hidden"
      style={{ perspective: "1500px" }}
    >
      <div
        className={`absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none ${theme.spotlight}`}
      />

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="flex flex-col items-start text-left w-full max-w-7xl mx-auto px-4 z-10"
      >
        <h1 className="flex flex-col gap-2 mb-4">
          {content.titulo?.chamada && (
            <span className="text-xs font-bold text-yellow-500/80 tracking-[0.2em] uppercase">
              {content.titulo.chamada}
            </span>
          )}

          <span className="text-5xl font-black text-white leading-[0.9] uppercase">
            {content.titulo?.tituloPrincipal}
          </span>

          {content.titulo?.palavrasAnimadas?.[0] && (
            <span
              className="text-6xl font-black italic"
              style={{ color: content.titulo.palavrasAnimadas[0].cor }}
            >
              {content.titulo.palavrasAnimadas[0].texto}
            </span>
          )}
        </h1>

        <p className="text-gray-400 text-lg max-w-lg">
          {content.subtitulo}
        </p>
      </motion.div>
    </section>
  );
}
