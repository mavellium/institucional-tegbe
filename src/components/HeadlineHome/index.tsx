"use client";

import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface HeadlineHomeProps {
  content: any;
  theme: any;
}

export function HeadlineHome({ content, theme }: HeadlineHomeProps) {
  // Lógica original de troca de palavras (Mantida intacta)
  const [wordIndex, setWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Otimização: Carregar animações após hidratação
  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const palavras = content.titulo?.palavrasAnimadas;
    if (!palavras || palavras.length === 0) return;
    
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % palavras.length);
    }, content.configuracoes?.intervaloAnimacao || 2500);
    
    return () => clearInterval(interval);
  }, [content]);

  // Fallbacks visuais
  const badgeIcon = content.badge?.icone || "solar:crown-star-bold";
  const primaryColor = theme.primary || "#FFCC00";

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#050505] pt-[80px] pb-[40px]"
    >
      
      {/* --- 1. BACKGROUND REFINADO (A Essência, mas High-End) --- */}
      
      {/* Grid muito sutil para dar estrutura técnica */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* "God Ray" Superior - Luz divina focando no título */}
      <div 
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[140px] opacity-10 pointer-events-none"
        style={{ backgroundColor: primaryColor }}
      />
      
      {/* Noise Texture (Textura de papel/filme para tirar o aspecto "digital barato") */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay pointer-events-none"></div>

      {/* --- 2. CONTEÚDO (Layout Original Preservado) --- */}
      <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">

        {/* BADGE (Mais elegante, bordas finas) - Renderização condicional com CSS */}
        {content.badge?.visivel && (
          <div 
            className="mb-8 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-lg opacity-0 animate-fadeIn"
            style={{ 
              animationDelay: '100ms',
              animationFillMode: 'forwards'
            }}
          >
            <Icon icon={badgeIcon} className="w-3.5 h-3.5" style={{ color: primaryColor }} />
            <span className="text-[11px] font-bold tracking-[0.2em] text-gray-300 uppercase">
              {content.badge.texto}
            </span>
          </div>
        )}

        {/* BLOCO DE TÍTULO */}
        <div className="max-w-5xl mx-auto mb-10">
            
            {/* Linha 1: "Sua operação guiada por..." + Palavra Animada */}
            <h2 className="flex flex-col sm:flex-row justify-center items-center text-xl sm:text-2xl md:text-3xl font-medium text-gray-400 mb-4 tracking-tight opacity-0 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
              {content.titulo?.chamada}
              
              {content.titulo?.palavrasAnimadas?.length > 0 && isVisible && (
                 <span className="flex justify-center items-center h-[1.3em] w-auto overflow-hidden ml-2 relative top-[1px]">
                    <AnimatePresence mode="popLayout">
                        <motion.span
                        key={wordIndex}
                        initial={{ y: "120%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: "-120%", opacity: 0 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 120, 
                          damping: 20, 
                          mass: 0.8,
                          // Desabilitar durante SSR
                          delay: isVisible ? 0 : 1000
                        }}
                        className="font-bold tracking-tight block whitespace-nowrap"
                        style={{ color: primaryColor }}
                        >
                        {content.titulo.palavrasAnimadas[wordIndex].texto}
                        </motion.span>
                    </AnimatePresence>
                 </span>
              )}
            </h2>

            {/* Linha 2: Título Principal (Mais pesado e imponente) */}
            <h1
                className={`text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-extrabold tracking-tighter text-white leading-[1] mt-2 drop-shadow-2xl opacity-0 animate-fadeInUp ${content.configuracoes?.efeitos?.brilhoTitulo}`}
                style={{ 
                  animationDelay: '300ms',
                  animationFillMode: 'forwards'
                }}
                dangerouslySetInnerHTML={{ __html: content.titulo?.tituloPrincipal }}
            />
        </div>

        {/* SUBTÍTULO (Melhor leitura) - RENDERIZADO IMEDIATAMENTE */}
        <div
          className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-400 font-light leading-relaxed mb-12 opacity-0 animate-fadeIn"
          style={{ 
            animationDelay: '400ms',
            animationFillMode: 'forwards'
          }}
          dangerouslySetInnerHTML={{ __html: content.subtitulo }}
        />

        {/* BOTÕES (Design mais limpo e interativo) */}
        <div
          className="flex flex-col sm:flex-row items-center gap-5 opacity-0 animate-fadeInUp"
          style={{ 
            animationDelay: '500ms',
            animationFillMode: 'forwards'
          }}
        >
          {content.botao?.visivel && (
            <a href={content.botao.link} target="_blank" className="group relative">
              {/* Glow sutil atrás do botão */}
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full opacity-0 group-hover:opacity-50 blur-md transition duration-500"></div>
              
              <Button 
                aria-label={content.botao.texto}
                className={`relative px-9 h-14 rounded-full font-bold text-lg tracking-tight flex items-center gap-3 transition-transform active:scale-95 ${theme.button.bg} hover:bg-[#E6B800] text-black border border-yellow-400/20`}
              >
                {content.botao.texto}
                <Icon icon={content.botao.icone || "solar:arrow-right-up-linear"} className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          )}
          
          {/* Agenda / Prova Social secundária */}
          {content.agenda?.visivel && (
             <div className="flex items-center gap-3 px-5 py-3 rounded-full border border-white/5 bg-white/5 backdrop-blur hover:bg-white/10 transition-colors cursor-default">
                <div className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </div>
                <span className="text-sm font-medium text-gray-300">{content.agenda.texto}</span>
             </div>
          )}
        </div>

      </div>

      {/* Adicionar estas animações CSS globais no seu arquivo CSS principal ou usar Tailwind */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        
        /* Garantir que o LCP (subtítulo) seja renderizado imediatamente */
        @media (prefers-reduced-motion: no-preference) {
          .animate-fadeIn,
          .animate-fadeInUp {
            animation-fill-mode: both;
          }
        }
      `}</style>
    </section>
  );
}