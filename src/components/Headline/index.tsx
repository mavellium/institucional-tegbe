"use client";

import { useState, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";

// --- 1. INTERFACES DO SEU JSON (ENTRADA) ---
interface JsonBadge {
  cor: string;
  icone: string;
  texto: string;
  visivel: boolean;
}

interface JsonBotao {
  link: string;
  icone: string;
  texto: string;
  estilo: string;
  visivel: boolean;
}

interface JsonAgenda {
  mes: string;
  texto: string;
  status: string;
  visivel: boolean;
  corStatus: string;
}

interface JsonTitulo {
  chamada: string;
  separador: string;
  tituloPrincipal: string;
  palavrasAnimadas: Array<{ texto: string; cor: string }>;
}

interface JsonConfig {
  efeitos: {
    grid: boolean;
    spotlight: boolean;
    brilhoTitulo: string;
    sombraInferior: boolean;
  };
  corFundo: string;
  corDestaque: string;
  intervaloAnimacao: number;
}

interface JsonVariantData {
  badge: JsonBadge;
  botao: JsonBotao;
  agenda: JsonAgenda;
  titulo: JsonTitulo;
  subtitulo: string;
  configuracoes: JsonConfig;
}

// A estrutura completa do arquivo JSON
export interface HeadlineJsonData {
  home: JsonVariantData;
  sobre: JsonVariantData;
  ecommerce: JsonVariantData;
  marketing: JsonVariantData;
  defaultTheme: string;
  [key: string]: any; // Flexibilidade
}

// --- 2. PROPS DO COMPONENTE ---
type HeadlineVariant = 'home' | 'ecommerce' | 'marketing' | 'sobre';

interface HeadlineProps {
  variant?: HeadlineVariant; // Opcional, pois pode vir do defaultTheme
  data: HeadlineJsonData;    // O JSON completo
}

// --- 3. CONFIGURAÇÃO DE ESTILOS VISUAIS (THEME ENGINE) ---
// Mantivemos as classes do Tailwind aqui para garantir os gradients complexos
const themeConfig = {
  home: {
    primary: "#FFCC00",
    selection: "selection:bg-yellow-500/30",
    badge: {
      border: "border-white/10",
      bg: "bg-white/5"
    },
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
    badge: {
      border: "border-white/10",
      bg: "bg-white/5"
    },
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
    badge: {
      border: "border-rose-500/10",
      bg: "bg-rose-900/5"
    },
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
    badge: {
      border: "border-blue-500/10",
      bg: "bg-blue-900/5"
    },
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
  const [wordIndex, setWordIndex] = useState(0);

  // 1. Determinar qual variante usar (Prop > JSON Default > 'home')
  const activeVariant = (variant || data.defaultTheme || 'home') as HeadlineVariant;
  
  // 2. Extrair dados da variante ativa
  const content = data[activeVariant];
  
  // 3. Carregar estilos do tema
  const theme = themeConfig[activeVariant];

  // Configuração da animação de palavras (Se houver)
  useEffect(() => {
    const palavras = content.titulo.palavrasAnimadas;
    if (!palavras || palavras.length === 0) return;

    const interval = setInterval(() => {
      setWordIndex((prevIndex) => (prevIndex + 1) % palavras.length);
    }, content.configuracoes.intervaloAnimacao || 2500);

    return () => clearInterval(interval);
  }, [content]);

  // Função auxiliar para renderizar HTML (ex: <br/> no JSON)
  const renderHTML = (htmlString: string) => {
    return { __html: htmlString };
  };

  // Ícone padrão se o JSON vier vazio
  const defaultIcon = activeVariant === 'marketing' ? "mdi:check-decagram" : "mdi:star-shooting";
  const badgeIcon = content.badge.icone || defaultIcon;

  return (
    <section 
      className={`relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#020202] ${theme.selection} pt-[80px] pb-[20px]`}
      style={{ backgroundColor: content.configuracoes.corFundo }}
    >
      
      {/* --- CAMADA 1: Efeitos Visuais --- */}
      {content.configuracoes.efeitos.grid && (
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>
      )}

      {content.configuracoes.efeitos.spotlight && (
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] ${theme.spotlight} rounded-full blur-[120px] opacity-40 mix-blend-screen pointer-events-none`} />
      )}

      {content.configuracoes.efeitos.sombraInferior && (
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020202] to-transparent z-10" />
      )}

      {/* --- CAMADA 2: Conteúdo Principal --- */}
      <div className="container relative z-20 px-4 md:px-6 flex flex-col items-center text-center">

        {/* BADGE */}
        {content.badge.visivel && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`mb-6 md:mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-inner backdrop-blur-md ${theme.badge.border} ${theme.badge.bg}`}
          >
            <Icon 
                icon={badgeIcon} 
                className="w-4 h-4"
                style={{ color: content.badge.cor || theme.primary }} 
            />
            <span className="text-[11px] md:text-xs font-semibold tracking-widest text-gray-300 uppercase">
              {content.badge.texto}
            </span>
          </motion.div>
        )}

        {/* HEADLINE PRINCIPAL */}
        <div className="max-w-5xl mx-auto mb-8">
            
            {/* Linha 1 (Chamada / Intro) */}
            <h2 className="flex flex-col sm:flex-row justify-center items-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-gray-400 mb-2 sm:mb-4 tracking-tight">
              {content.titulo.chamada}
              
              {/* Lógica de Palavras Animadas (Apenas se houver array no JSON) */}
              {content.titulo.palavrasAnimadas && content.titulo.palavrasAnimadas.length > 0 && (
                 <span className="flex justify-center items-center h-auto w-auto overflow-hidden ml-2">
                    <AnimatePresence mode="popLayout">
                        <motion.span
                        key={wordIndex}
                        initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
                        animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                        exit={{ y: "-100%", opacity: 0, filter: "blur(10px)" }}
                        transition={{ type: "spring", stiffness: 50, damping: 20, mass: 1 }}
                        className="font-bold tracking-tight block whitespace-nowrap"
                        style={{ color: content.configuracoes.corDestaque || theme.primary }}
                        >
                        {content.titulo.palavrasAnimadas[wordIndex].texto}
                        </motion.span>
                    </AnimatePresence>
                 </span>
              )}
            </h2>

            {/* Linha 2 (Título Principal Gigante) */}
            <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className={`text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white leading-[0.9] mt-2 ${content.configuracoes.efeitos.brilhoTitulo}`}
                dangerouslySetInnerHTML={renderHTML(content.titulo.tituloPrincipal)}
            />
        </div>

        {/* SUBTÍTULO */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto text-base sm:text-xl text-gray-400 leading-relaxed mb-12 font-light tracking-wide"
          dangerouslySetInnerHTML={renderHTML(content.subtitulo)}
        />

        {/* BOTÃO E AGENDA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col items-center gap-6"
        >
          {content.botao.visivel && (
            <a
              href={content.botao.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
            >
              {/* Glow effect dinâmico */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${theme.button.glow} rounded-full opacity-30 blur-lg group-hover:opacity-60 transition duration-500`}></div>

              <Button
                className={`px-10 py-7 rounded-full font-bold text-lg tracking-tight hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-inner flex items-center gap-3 ${theme.button.bg} ${theme.button.hover} ${theme.button.text} ${theme.button.border}`}
              >
                {content.botao.texto}
                {content.botao.icone && <Icon icon={content.botao.icone} className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
                {!content.botao.icone && <Icon icon="lucide:arrow-right" className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
              </Button>
            </a>
          )}

          {content.agenda.visivel && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: content.agenda.corStatus || '#22C55E' }}
              />
              <span>{content.agenda.texto}</span>
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}