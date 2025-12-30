"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Button } from "../ui/button"; // Certifique-se que o caminho está certo
import { motion, AnimatePresence } from "framer-motion";

export function Headline() {
  const [index, setIndex] = useState(0);
  
  // Palavras calibradas para dor vs. vaidade
  const words = [
    { text: "CURTIDAS", color: "text-[#FFCC00]" }, // Amarelo Marca
    { text: "SEGUIDORES", color: "text-[#FFCC00]" },
    { text: "PLANILHAS", color: "text-red-500" }, // Vermelho Alerta
    { text: "TEORIAS", color: "text-gray-400" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2500); // Tempo um pouco maior para leitura confortável
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#020202] selection:bg-yellow-500/30 pt-[80px] pb-[20px]">
      
      {/* --- CAMADA 1: Atmosfera & Profundidade --- */}
      
      {/* Grid sutil para dar ar "Tech" (Opcional, mas adiciona textura) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

      {/* Spotlight Central - Foca o olhar no centro da tela */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] opacity-40 mix-blend-screen pointer-events-none" />
      
      {/* Sombra inferior para fusão com a próxima seção */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020202] to-transparent z-10" />

      {/* --- CAMADA 2: Conteúdo --- */}
      <div className="container relative z-20 px-4 md:px-6 flex flex-col items-center text-center">
        
        {/* Badge "Oficial" - Pequeno e elegante */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-inner"
        >
          <Icon icon="mdi:check-decagram" className="text-[#FFCC00] w-4 h-4" />
          <span className="text-[11px] md:text-xs font-semibold tracking-widest text-gray-300 uppercase">
            Consultoria Oficial Mercado Livre
          </span>
        </motion.div>

        {/* Headline Principal */}
        <div className="max-w-5xl mx-auto mb-8">
          <h2 className="flex text-xl sm:text-2xl md:text-3xl lg:text-4xl flex-col sm:flex-row font-medium text-gray-400 mb-2 sm:mb-4 tracking-tight">
            O seu negócio não precisa de mais{" "}
            {/* Container da Animação */}
            <span className="flex justify-center items-center h-auto w-auto overflow-hidden ml-2">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={index}
                  initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
                  animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: "-100%", opacity: 0, filter: "blur(10px)" }}
                  transition={{ type: "spring", stiffness: 50, damping: 20, mass: 1 }}
                  className={`col-start-1 row-start-1 ${words[index].color} font-bold tracking-tight block whitespace-nowrap`}
                >
                  {words[index].text}
                </motion.span>
              </AnimatePresence>
            </span>
          </h2>

          <motion.h1 
            // initial={{ opacity: 0, scale: 0.95 }}
            // animate={{ opacity: 1, scale: 1 }}
            // transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white leading-[0.9] mt-2"
          >
            PRECISA <br className="hidden sm:block" />
            <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
              VENDER MAIS
            </span>
          </motion.h1>
        </div>

        {/* Subtítulo Otimizado */}
        <motion.p 
          // initial={{ opacity: 0 }}
          // animate={{ opacity: 1 }}
          // transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mx-auto text-base sm:text-xl text-gray-400 leading-relaxed mb-12 font-light tracking-wide"
        >
          A única assessoria com selo Oficial que <strong className="text-gray-100 font-medium border-b border-yellow-500/50 pb-0.5">assume o operacional</strong> da sua loja.
          Pare de perder tempo com gestão técnica e foque apenas no lucro.
        </motion.p>

        {/* CTA de Alta Conversão - Estilo Mavellium */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col items-center gap-6"
        >
          <a aria-label="quero vender agora" href="#planos" className="group relative">
            {/* Glow effect atrás do botão */}
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full opacity-30 blur-lg group-hover:opacity-60 transition duration-500"></div>
            
            <Button className="relative px-10 py-7 rounded-full bg-[#FFCC00] text-black font-bold text-lg tracking-tight hover:bg-[#ffdb4d] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[inset_0px_1px_0px_rgba(255,255,255,0.4)] border border-yellow-500/20 flex items-center gap-3">
              QUERO VENDER AGORA
              <Icon icon="lucide:arrow-right" className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </a>

          <div className="flex items-center gap-2 text-sm text-gray-500">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span>Agenda de Janeiro aberta</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}