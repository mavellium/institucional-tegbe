"use client";

import { useState, useEffect, lazy, Suspense, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// --- INTERFACES (mantenha do código original) ---
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

export type HeadlineVariant = 'home' | 'ecommerce' | 'marketing' | 'sobre';

// --- CONSTANTES (mantenha do código original) ---
const themeConfig = {
  home: { primary: "#FFCC00", selection: "selection:bg-yellow-500/30", badge: { border: "border-white/10", bg: "bg-white/5" }, spotlight: "bg-blue-900/20", button: { glow: "from-yellow-600 to-yellow-400", bg: "bg-[#FFCC00]", hover: "hover:bg-[#ffdb4d]", border: "border-yellow-500/20", text: "text-black" }, text: { highlight: "border-b border-yellow-500/50", shadow: "drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]" } },
  ecommerce: { primary: "#FFCC00", selection: "selection:bg-yellow-500/30", badge: { border: "border-white/10", bg: "bg-white/5" }, spotlight: "bg-blue-900/20", button: { glow: "from-yellow-600 to-yellow-400", bg: "bg-[#FFCC00]", hover: "hover:bg-[#ffdb4d]", border: "border-yellow-500/20", text: "text-black" }, text: { highlight: "border-b border-yellow-500/50", shadow: "drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]" } },
  marketing: { primary: "#E31B63", selection: "selection:bg-rose-500/30", badge: { border: "border-rose-500/10", bg: "bg-rose-900/5" }, spotlight: "bg-[#D90429]/15", button: { glow: "from-[#FF0F43] to-[#990033]", bg: "bg-[#E60045]", hover: "hover:bg-[#ff1758]", border: "border-rose-500/20", text: "text-white" }, text: { highlight: "border-b border-rose-500/50", shadow: "drop-shadow-[0_0_20px_rgba(227,27,99,0.4)]" } },
  sobre: { primary: "#0071E3", selection: "selection:bg-blue-500/30", badge: { border: "border-blue-500/10", bg: "bg-blue-900/5" }, spotlight: "bg-blue-900/20", button: { glow: "from-blue-600 to-blue-400", bg: "bg-[#0071E3]", hover: "hover:bg-[#1a81eb]", border: "border-blue-500/20", text: "text-white" }, text: { highlight: "border-b border-blue-500/50", shadow: "drop-shadow-[0_0_15px_rgba(0,113,227,0.4)]" } }
};

// Dados fallback
const fallbackContent: JsonVariantData = {
  titulo: {
    chamada: "",
    separador: "|",
    tituloPrincipal: "Unimos Tecnologia, Marketing e Educação",
    palavrasAnimadas: []
  },
  subtitulo: "Criamos máquinas de vendas escaláveis e inteligentes.",
  badge: { cor: "#FFCC00", icone: "lucide:star", texto: "Destaque", visivel: false },
  botao: { link: "#", icone: "lucide:arrow-right", texto: "Saiba mais", estilo: "primary", visivel: false },
  agenda: { mes: "Janeiro", texto: "Agenda aberta", status: "Disponível", visivel: false, corStatus: "#10B981" },
  configuracoes: {
    efeitos: { grid: true, spotlight: true, brilhoTitulo: "medium", sombraInferior: true },
    corFundo: "#020202",
    corDestaque: "#FFCC00",
    intervaloAnimacao: 3000
  }
};

const fallbackData: HeadlineJsonData = {
  home: fallbackContent,
  sobre: fallbackContent,
  ecommerce: fallbackContent,
  marketing: fallbackContent,
  defaultTheme: 'home'
};

// --- LAZY LOAD CORRIGIDO ---
const HeadlineEcommerce = lazy(() => 
  import("@/components/HeadlineEcommerce").then(module => ({
    default: module.HeadlineEcommerce
  }))
);

const HeadlineMarketing = lazy(() => 
  import("@/components/HeadlineMarketing").then(module => ({
    default: module.HeadlineMarketing
  }))
);

const HeadlineHome = lazy(() => 
  import("../HeadlineHome").then(module => ({
    default: module.HeadlineHome
  }))
);

// Componente de esqueleto
const HeadlineSkeleton = () => (
  <div className="w-full h-screen bg-[#020202] flex items-center justify-center">
    <div className="animate-pulse flex flex-col items-center space-y-4">
      <div className="h-8 w-64 bg-gray-800 rounded"></div>
      <div className="h-12 w-96 bg-gray-800 rounded"></div>
    </div>
  </div>
);

export function Headline({ variant }: { variant?: HeadlineVariant }) {
  const [data, setData] = useState<HeadlineJsonData | null>(null);
  const [enable3DEffects, setEnable3DEffects] = useState(false);
  
  // Optimized mouse tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!enable3DEffects) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [enable3DEffects, x, y]);

  // Carregar dados com cache
  useEffect(() => {
    const controller = new AbortController();
    
    const fetchData = async () => {
      try {
        // Tentar cache primeiro
        const cacheKey = 'headline-cache-v1';
        const cached = sessionStorage.getItem(cacheKey);
        
        if (cached) {
          setData(JSON.parse(cached));
        }
        
        // Fetch com timeout
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 3000)
        );
        
        const fetchPromise = fetch(
          'https://tegbe-dashboard.vercel.app/api/tegbe-institucional/headline',
          { signal: controller.signal }
        );
        
        const response = await Promise.race([fetchPromise, timeoutPromise]) as Response;
        const result = await response.json();
        
        setData(result);
        sessionStorage.setItem(cacheKey, JSON.stringify(result));
      } catch (error) {
        if (!controller.signal.aborted) {
          console.warn('Using fallback data');
        }
      }
    };
    
    fetchData();
    
    // Habilitar efeitos 3D após conteúdo carregado
    const timer = setTimeout(() => setEnable3DEffects(true), 500);
    
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, []);

  // Renderização otimizada
  const activeVariant = (variant || data?.defaultTheme || 'home') as HeadlineVariant;
  const activeData = data || fallbackData;
  const content = activeData[activeVariant] || fallbackContent;
  const theme = themeConfig[activeVariant] || themeConfig.home;

  // Variantes para animação eficiente
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  // Renderização condicional com lazy loading
  if (activeVariant === 'ecommerce') return (
    <Suspense fallback={<HeadlineSkeleton />}>
      <HeadlineEcommerce content={content} theme={theme} />
    </Suspense>
  );
  
  if (activeVariant === 'marketing') return (
    <Suspense fallback={<HeadlineSkeleton />}>
      <HeadlineMarketing content={content} theme={theme} />
    </Suspense>
  );
  
  if (activeVariant === 'home') return (
    <Suspense fallback={<HeadlineSkeleton />}>
      <HeadlineHome content={content} theme={theme} />
    </Suspense>
  );

  // Fallback para variante 'sobre' ou outras
  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen flex flex-col justify-center items-center bg-[#020202] text-center px-4 overflow-hidden"
    >
      {/* Background otimizado - menos blur inicialmente */}
      <div className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-5 pointer-events-none bg-gradient-to-r from-blue-900/20 to-purple-900/20" />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-start text-left w-full max-w-7xl mx-auto px-4 z-10"
      >
        <motion.h1 variants={childVariants} className="flex flex-col gap-1 mb-4">
          {/* Conteúdo renderizado prioritariamente */}
          {content.titulo?.chamada && (
            <span className="text-xs md:text-sm font-bold text-yellow-500/80 tracking-[0.2em] uppercase mb-2">
              {content.titulo.chamada}
            </span>
          )}
          
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-[clamp(2rem,5.5vw,4.5rem)] font-black text-white leading-[0.9] tracking-tighter uppercase max-w-[12ch] md:max-w-[15ch]">
            {content.titulo?.tituloPrincipal}
          </span>
        </motion.h1>
        
        <motion.p variants={childVariants} className="text-gray-400 text-sm md:text-base lg:text-lg font-light max-w-md md:max-w-lg leading-relaxed mb-8">
          {content.subtitulo}
        </motion.p>
      </motion.div>
    </section>
  );
}