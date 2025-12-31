"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";

// Dados dinâmicos da seção (em produção, viria de uma API)
const headlineData = {
  id: "hero-section",
  badge: {
    icone: "mdi:check-decagram",
    texto: "Consultoria Oficial Mercado Livre",
    cor: "text-[#FFCC00]",
    visivel: true
  },
  titulo: {
    chamada: "O seu negócio não precisa de mais",
    palavrasAnimadas: [
      { texto: "CURTIDAS", cor: "text-[#FFCC00]", ordem: 1 },
      { texto: "SEGUIDORES", cor: "text-[#FFCC00]", ordem: 2 },
      { texto: "PLANILHAS", cor: "text-red-500", ordem: 3 },
      { texto: "TEORIAS", cor: "text-gray-400", ordem: 4 }
    ],
    tituloPrincipal: "PRECISA<br/>VENDER MAIS",
    separador: "<br className='hidden sm:block'/>"
  },
  subtitulo: "A única assessoria com selo Oficial que <strong class='text-gray-100 font-medium border-b border-yellow-500/50 pb-0.5'>assume o operacional</strong> da sua loja. Pare de perder tempo com gestão técnica e foque apenas no lucro.",
  botao: {
    texto: "QUERO VENDER AGORA",
    link: "#planos",
    icone: "lucide:arrow-right",
    estilo: "gradiente-amarelo",
    visivel: true
  },
  agenda: {
    status: "aberta",
    mes: "Janeiro",
    corStatus: "bg-green-500",
    texto: "Agenda de Janeiro aberta",
    visivel: true
  },
  configuracoes: {
    intervaloAnimacao: 2500,
    corFundo: "bg-[#020202]",
    corDestaque: "#FFCC00",
    efeitos: {
      brilhoTitulo: "drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]",
      spotlight: true,
      grid: true,
      sombraInferior: true
    }
  }
};

export function Headline() {
  const [index, setIndex] = useState(0);
  const { 
    badge, 
    titulo, 
    subtitulo, 
    botao, 
    agenda, 
    configuracoes 
  } = headlineData;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % titulo.palavrasAnimadas.length);
    }, configuracoes.intervaloAnimacao);
    
    return () => clearInterval(interval);
  }, [titulo.palavrasAnimadas.length, configuracoes.intervaloAnimacao]);

  // Função para renderizar HTML com segurança
  const renderHTML = (htmlString: string) => {
    return { __html: htmlString };
  };

  return (
    <section 
      className={`relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden ${configuracoes.corFundo} selection:bg-yellow-500/30 pt-[80px] pb-[20px]`}
    >
      {/* --- CAMADA 1: Efeitos Visuais --- */}
      {configuracoes.efeitos.grid && (
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>
      )}
      
      {configuracoes.efeitos.spotlight && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] opacity-40 mix-blend-screen pointer-events-none" />
      )}
      
      {configuracoes.efeitos.sombraInferior && (
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020202] to-transparent z-10" />
      )}

      {/* --- CAMADA 2: Conteúdo Principal --- */}
      <div className="container relative z-20 px-4 md:px-6 flex flex-col items-center text-center">
        
        {/* Badge Oficial */}
        {badge.visivel && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-inner"
          >
            <Icon icon={badge.icone} className={`${badge.cor} w-4 h-4`} />
            <span className="text-[11px] md:text-xs font-semibold tracking-widest text-gray-300 uppercase">
              {badge.texto}
            </span>
          </motion.div>
        )}

        {/* Headline com Animação */}
        <div className="max-w-5xl mx-auto mb-8">
          <h2 className="flex text-xl sm:text-2xl md:text-3xl lg:text-4xl flex-col sm:flex-row font-medium text-gray-400 mb-2 sm:mb-4 tracking-tight">
            {titulo.chamada}{" "}
            <span className="flex justify-center items-center h-auto w-auto overflow-hidden ml-2">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={index}
                  initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
                  animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: "-100%", opacity: 0, filter: "blur(10px)" }}
                  transition={{ type: "spring", stiffness: 50, damping: 20, mass: 1 }}
                  className={`col-start-1 row-start-1 ${titulo.palavrasAnimadas[index].cor} font-bold tracking-tight block whitespace-nowrap`}
                >
                  {titulo.palavrasAnimadas[index].texto}
                </motion.span>
              </AnimatePresence>
            </span>
          </h2>

          <motion.h1 
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white leading-[0.9] mt-2"
            dangerouslySetInnerHTML={renderHTML(titulo.tituloPrincipal)}
          />
        </div>

        {/* Subtítulo */}
        <motion.p 
          className="max-w-2xl mx-auto text-base sm:text-xl text-gray-400 leading-relaxed mb-12 font-light tracking-wide"
          dangerouslySetInnerHTML={renderHTML(subtitulo)}
        />

        {/* Botão CTA e Agenda */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col items-center gap-6"
        >
          {botao.visivel && (
            <a 
              aria-label={botao.texto.toLowerCase()} 
              href={botao.link} 
              className="group relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full opacity-30 blur-lg group-hover:opacity-60 transition duration-500"></div>
              
              <Button 
                aria-label={botao.texto.toLowerCase()}
                className="relative px-10 py-7 rounded-full bg-[#FFCC00] text-black font-bold text-lg tracking-tight hover:bg-[#ffdb4d] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[inset_0px_1px_0px_rgba(255,255,255,0.4)] border border-yellow-500/20 flex items-center gap-3"
              >
                {botao.texto}
                <Icon 
                  icon={botao.icone} 
                  className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                />
              </Button>
            </a>
          )}

          {agenda.visivel && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className={`w-2 h-2 rounded-full ${agenda.corStatus} animate-pulse`} />
              <span>{agenda.texto}</span>
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}