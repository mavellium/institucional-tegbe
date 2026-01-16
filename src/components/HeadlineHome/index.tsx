"use client";

import { useState, useEffect, useRef, useMemo } from "react";
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
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);

  // Otimização: Carregar animações após hidratação
  useEffect(() => {
    setIsVisible(true);
    
    // Detectar mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Marcar o h1 como LCP element para otimização
    if (h1Ref.current) {
      // Forçar renderização imediata
      h1Ref.current.style.opacity = '1';
      h1Ref.current.style.transform = 'translateY(0)';
    }
    
    return () => window.removeEventListener('resize', checkMobile);
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

  // Otimização: SVG de noise inline para mobile (evita request)
  const noiseBackground = useMemo(() => {
    if (isMobile) {
      // SVG otimizado como data URL para mobile
      return `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.1'/%3E%3C/svg%3E")`;
    }
    return "url('https://grainy-gradients.vercel.app/noise.svg')";
  }, [isMobile]);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#050505] pt-[80px] pb-[40px]"
      style={{ 
        contain: 'paint layout',
        // Otimização mobile: forçar aceleração GPU
        ...(isMobile && {
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        })
      }}
    >
      
      {/* --- 1. BACKGROUND REFINADO (A Essência, mas High-End) --- */}
      
      {/* Grid muito sutil para dar estrutura técnica */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to_right,#ffffff05_1px,transparent_1px), linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)',
          backgroundSize: isMobile ? '4rem 4rem' : '6rem 6rem',
          maskImage: 'radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)'
        }}
      />

      {/* "God Ray" Superior - Luz divina focando no título */}
      <div 
        className="absolute pointer-events-none"
        style={{
          top: isMobile ? '-10%' : '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: isMobile ? '400px' : '800px',
          height: isMobile ? '300px' : '600px',
          borderRadius: '50%',
          filter: `blur(${isMobile ? '80px' : '140px'})`,
          opacity: isMobile ? 0.08 : 0.1,
          backgroundColor: primaryColor
        }}
      />
      
      {/* Noise Texture otimizada para mobile */}
      <div 
        className="absolute inset-0 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: noiseBackground,
          opacity: isMobile ? 0.1 : 0.15
        }}
      />

      {/* --- 2. CONTEÚDO (Layout Original Preservado) --- */}
      <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">

        {/* BADGE - VISÍVEL IMEDIATAMENTE COM ANIMAÇÃO NÃO-BLOQUEANTE */}
        {content.badge?.visivel && (
          <div 
            className="mb-8 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-lg"
            style={{ 
              opacity: isMobile ? 1 : 0,
              animation: isMobile ? 'none' : 'fadeIn 0.5s ease-out 0.1s forwards',
              backdropFilter: isMobile ? 'blur(6px)' : 'blur(8px)'
            }}
          >
            <Icon 
              icon={badgeIcon} 
              className="w-3.5 h-3.5" 
              style={{ 
                color: primaryColor,
                // Otimização mobile: forçar renderização GPU
                ...(isMobile && { transform: 'translateZ(0)' })
              }} 
            />
            <span className="text-[11px] font-bold tracking-[0.2em] text-gray-300 uppercase">
              {content.badge.texto}
            </span>
          </div>
        )}

        {/* BLOCO DE TÍTULO */}
        <div className="max-w-5xl mx-auto mb-10">
            
            {/* Linha 1: "Sua operação guiada por..." + Palavra Animada */}
            <h2 className="flex flex-col sm:flex-row justify-center items-center text-xl sm:text-2xl md:text-3xl font-medium text-gray-400 mb-4 tracking-tight">
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
                          type: isMobile ? "tween" : "spring",
                          duration: isMobile ? 0.3 : 0.5,
                          stiffness: 120, 
                          damping: 20, 
                          mass: 0.8,
                          delay: isVisible ? 0 : 1000
                        }}
                        className="font-bold tracking-tight block whitespace-nowrap"
                        style={{ 
                          color: primaryColor,
                          ...(isMobile && {
                            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                            willChange: 'transform'
                          })
                        }}
                        >
                        {content.titulo.palavrasAnimadas[wordIndex].texto}
                        </motion.span>
                    </AnimatePresence>
                 </span>
              )}
            </h2>

            {/* Linha 2: Título Principal - VISÍVEL IMEDIATAMENTE (LCP CRÍTICO) */}
            <h1
                ref={h1Ref}
                className={`${isMobile ? 'text-5xl sm:text-6xl md:text-6xl' : 'text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem]'} font-extrabold tracking-tighter text-white leading-[1] mt-2 drop-shadow-2xl ${content.configuracoes?.efeitos?.brilhoTitulo}`}
                style={{
                  // Visível imediatamente para LCP
                  opacity: 1,
                  transform: 'translateY(0)',
                  // Garantir que não tenha animações que atrasem a renderização
                  animation: 'none',
                  // Forçar composição por GPU
                  willChange: 'transform',
                  // Otimização mobile: prevenir layout shift
                  ...(isMobile && {
                    minHeight: '100px',
                    WebkitFontSmoothing: 'antialiased',
                    textRendering: 'optimizeLegibility'
                  })
                }}
                dangerouslySetInnerHTML={{ __html: content.titulo?.tituloPrincipal }}
            />
        </div>

        {/* SUBTÍTULO - VISÍVEL IMEDIATAMENTE */}
        <div
          className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-400 font-light leading-relaxed mb-12"
          style={{
            opacity: 1,
            animation: isMobile ? 'none' : 'fadeIn 0.6s ease-out 0.2s backwards'
          }}
          dangerouslySetInnerHTML={{ __html: content.subtitulo }}
        />

        {/* BOTÕES */}
        <div
          className="flex flex-col sm:flex-row items-center gap-5"
          style={{
            opacity: isMobile ? 1 : 0,
            animation: isMobile ? 'none' : 'fadeIn 0.6s ease-out 0.3s forwards'
          }}
        >
          {content.botao?.visivel && (
            <a 
              href={content.botao.link} 
              target="_blank" 
              className="group relative"
              style={isMobile ? { display: 'inline-block', transform: 'translateZ(0)' } : {}}
            >
              {/* Glow sutil atrás do botão - otimizado para mobile */}
              {!isMobile && (
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full opacity-0 group-hover:opacity-50 blur-md transition duration-500"></div>
              )}
              
              <Button 
                aria-label={content.botao.texto}
                className={`relative ${isMobile ? 'px-6 h-12 text-base' : 'px-9 h-14 text-lg'} rounded-full font-bold tracking-tight flex items-center gap-3 transition-transform active:scale-95 ${theme.button.bg} hover:bg-[#E6B800] text-black border border-yellow-400/20`}
                style={isMobile ? { transform: 'translateZ(0)' } : {}}
              >
                {content.botao.texto}
                <Icon 
                  icon={content.botao.icone || "solar:arrow-right-up-linear"} 
                  className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} transition-transform group-hover:translate-x-1`} 
                />
              </Button>
            </a>
          )}
          
          {/* Agenda / Prova Social secundária - MANTIDA MAS OTIMIZADA */}
          {content.agenda?.visivel && (
             <div 
               className="flex items-center gap-3 px-5 py-3 rounded-full border border-white/5 bg-white/5 backdrop-blur hover:bg-white/10 transition-colors cursor-default"
               style={{
                 backdropFilter: isMobile ? 'blur(4px)' : 'blur(8px)',
                 ...(isMobile && { transform: 'translateZ(0)' })
               }}
             >
                <div className="relative flex h-2.5 w-2.5">
                  <span 
                    className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"
                    style={{
                      animation: isMobile ? 'none' : 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
                    }}
                  ></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </div>
                <span className="text-sm font-medium text-gray-300">
                  {content.agenda.texto}
                </span>
             </div>
          )}
        </div>

      </div>

      {/* Adicionar estas animações CSS globais no seu arquivo CSS principal */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { 
            opacity: 0;
            transform: translateY(10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        /* Otimizações específicas para mobile */
        @media (max-width: 767px) {
          /* Desativar animações não essenciais para performance */
          * {
            animation-duration: 0.3s !important;
            transition-duration: 0.2s !important;
          }
          
          /* Otimizar efeitos de blur */
          .backdrop-blur-md {
            backdrop-filter: blur(4px) !important;
          }
          
          /* Prevenir animações complexas */
          .blur-md {
            filter: blur(4px) !important;
          }
          
          /* Forçar aceleração por hardware */
          .gpu-accelerate {
            transform: translateZ(0);
            backface-visibility: hidden;
          }
          
          /* Garantir que elementos críticos sejam renderizados */
          .headline-section {
            min-height: 100vh;
            height: 100vh;
            overflow: hidden;
          }
        }
        
        /* Garantir que o LCP element (h1) não tenha animação inicial */
        .headline-h1 {
          opacity: 1 !important;
          transform: none !important;
          animation: none !important;
        }
      `}</style>
    </section>
  );
}