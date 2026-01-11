"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface HeadlineEcommerceProps {
  content: any;
  theme: any;
}

// Simulação de "Live Feed" de eventos de E-commerce
const LIVE_EVENTS = [
  { icon: "solar:cart-check-bold", text: "Novo pedido: #9821", value: "+ R$ 429,90", color: "text-green-400" },
  { icon: "solar:graph-up-bold", text: "ROI Diário atualizado", value: "8.4x", color: "text-[#FFCC00]" },
  { icon: "solar:box-minimalistic-bold", text: "Estoque sincronizado", value: "Full", color: "text-blue-400" },
  { icon: "solar:users-group-rounded-bold", text: "Usuários ativos agora", value: "1.240", color: "text-purple-400" },
];

export function HeadlineEcommerce({ content, theme }: HeadlineEcommerceProps) {
  const [currentEvent, setCurrentEvent] = useState(0);

  // Ciclo de notificações "Live"
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEvent((prev) => (prev + 1) % LIVE_EVENTS.length);
    }, 2500); // Troca a cada 2.5s
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-[#050505] overflow-hidden pt-16 pb-8">
      
      {/* --- 1. AMBIENCE & LIGHTING (Cinematografia) --- */}
      {/* O "Spotlight" Dourado vindo de cima, simulando uma luz divina/ouro */}
      <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#FFCC00] rounded-full blur-[120px] opacity-[0.07] pointer-events-none mix-blend-screen" />
      
      {/* Grid de Perspectiva no Chão (Sensação de profundidade) */}
      <div className="absolute bottom-0 w-full h-[30vh] bg-[linear-gradient(to_bottom,transparent_0%,#050505_100%),linear-gradient(to_right,#333_1px,transparent_1px)] bg-[size:2.5rem_100%] opacity-[0.03] [transform:perspective(600px)_rotateX(60deg)] pointer-events-none" />

      <div className="container relative z-10 px-4 md:px-6 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 h-full max-h-[85vh] py-2">
        
        {/* --- 2. ESQUERDA: AUTORIDADE (Copywriting) --- */}
        <div className="flex-1 max-w-2xl text-left h-full flex flex-col justify-center">
          
          {/* Badge Premium - Destaque com Alinhamento */}
<motion.div 
  initial={{ opacity: 0, y: -5 }}
  animate={{ opacity: 1, y: 0 }}
  className="inline-flex items-center mb-3 lg:mb-4"
>
  <div className="flex items-center gap-1.5 px-3 pr-2 py-1.5 rounded-full bg-gradient-to-r from-black/40 via-[#0A0A0A] to-black/40 border border-white/10 backdrop-blur-sm">
    <div className="relative flex items-center justify-center">
      <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-[#FFCC00]/40"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-b from-[#FFCC00] to-[#D97706]"></span>
    </div>
    <span className="text-[12px] font-mono uppercase tracking-[0.15em] text-gray-400/80 leading-tight font-medium">
      {content.badge?.texto || "ALTA PERFORMANCE"}
    </span>
  </div>
</motion.div>

          {/* TÍTULO AAA (ALTA PERFORMANCE) */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] font-bold tracking-[-0.02em] text-white leading-[1.05] lg:leading-[1] mb-3 lg:mb-4 max-w-3xl"
          >
            <span className="block text-balance font-extrabold">
              {content.titulo?.chamada}
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFCC00] via-[#FDE047] to-[#D97706] block text-balance font-black mt-1 lg:mt-2">
              {content.titulo?.tituloPrincipal}
            </span>
          </motion.h1>

          {/* SUBTÍTULO - Mais compacto */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-sm sm:text-base text-gray-400 font-light leading-snug lg:leading-relaxed mb-4 lg:mb-5 max-w-lg"
            dangerouslySetInnerHTML={{ __html: content.subtitulo }}
          />

          {/* CTA - Mais compacto e alinhado */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-2"
          >
            {content.botao?.visivel && (
                <a href={content.botao.link} target="_blank" className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FFCC00] to-yellow-600 rounded-lg opacity-40 blur transition duration-200 group-hover:opacity-70"></div>
                    <Button className="relative h-11 lg:h-12 px-5 lg:px-6 bg-[#0a0a0a] hover:bg-[#111] text-white border border-[#FFCC00]/50 rounded-lg text-sm font-medium flex items-center gap-2 overflow-hidden">
                        <span className="relative z-10 truncate text-sm">{content.botao.texto}</span>
                        <div className="absolute inset-0 bg-[#FFCC00] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                        <Icon icon="solar:arrow-right-up-bold" className="w-4 h-4 text-[#FFCC00]" />
                    </Button>
                </a>
            )}
            
            {/* Elemento de Confiança Sutil - Mais compacto */}
            <div className="flex items-center gap-2.5 h-11 lg:h-12 px-3 border-l border-white/10">
                <div className="text-right">
                    <p className="text-[8px] lg:text-[9px] uppercase text-gray-500 font-bold tracking-[0.2em]">Mercado Livre</p>
                    <div className="flex text-[#FFCC00] text-xs">★★★★★</div>
                </div>
                <Icon icon="simple-icons:mercadolivre" className="w-6 h-6 lg:w-7 lg:h-7 text-gray-600" />
            </div>
          </motion.div>
        </div>

        {/* --- 3. DIREITA: O "MOTOR" (Visual Inovador) - Mais compacto --- */}
        <div className="flex-1 w-full relative h-full max-h-[450px] lg:max-h-[550px] flex items-center justify-center perspective-[1200px]">
            
            {/* O Núcleo do "Reator" (Interface Principal) */}
            <motion.div 
                initial={{ rotateX: 10, rotateY: -10, opacity: 0 }}
                animate={{ rotateX: 3, rotateY: -5, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-20 w-[280px] sm:w-[320px] lg:w-[380px] bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/10 rounded-xl p-4 lg:p-5 shadow-2xl shadow-yellow-900/10"
            >
                {/* Header da Interface - Mais compacto */}
                <div className="flex justify-between items-center mb-5 lg:mb-6 border-b border-white/5 pb-2.5 lg:pb-3">
                    <div className="flex gap-1">
                        <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-red-500/20 border border-red-500" />
                        <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500" />
                        <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-green-500/20 border border-green-500" />
                    </div>
                    <span className="text-[8px] lg:text-[9px] font-mono text-gray-500 tracking-tight">MAVELLIUM_V1.0</span>
                </div>

                {/* Gráfico Abstrato (Barras animadas) - Mais compacto */}
                <div className="flex items-end justify-between h-20 lg:h-24 gap-1 lg:gap-1.5 mb-5 lg:mb-6 px-1">
                    {[40, 65, 45, 80, 55, 90, 70, 95].map((h, i) => (
                        <motion.div 
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 1, delay: i * 0.1, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
                            className={`w-full rounded-t-[1px] ${i === 7 ? 'bg-[#FFCC00] shadow-[0_0_8px_#FFCC00]' : 'bg-gray-800'}`}
                        />
                    ))}
                </div>

                {/* Live Feed Simulator (O "Pulo do Gato") - Mais compacto */}
                <div className="space-y-1.5 lg:space-y-2">
                    <p className="text-[10px] lg:text-xs text-gray-500 uppercase font-bold tracking-[0.2em] mb-0.5">Real-time Activity</p>
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={currentEvent}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex items-center justify-between p-2 lg:p-2.5 rounded-md bg-white/5 border border-white/5"
                        >
                            <div className="flex items-center gap-2">
                                <div className={`p-1 lg:p-1.5 rounded bg-opacity-10 ${LIVE_EVENTS[currentEvent].color.replace('text-', 'bg-')}`}>
                                    <Icon icon={LIVE_EVENTS[currentEvent].icon} className={`w-3.5 h-3.5 lg:w-4 lg:h-4 ${LIVE_EVENTS[currentEvent].color}`} />
                                </div>
                                <span className="text-xs lg:text-sm text-gray-300 font-medium truncate max-w-[100px] lg:max-w-[130px]">
                                  {LIVE_EVENTS[currentEvent].text}
                                </span>
                            </div>
                            <span className={`text-xs lg:text-sm font-bold ${LIVE_EVENTS[currentEvent].color}`}>
                              {LIVE_EVENTS[currentEvent].value}
                            </span>
                        </motion.div>
                    </AnimatePresence>

                    {/* Linha "fantasma" - Mais compacta */}
                    <div className="flex items-center justify-between p-2 lg:p-2.5 rounded-md bg-white/5 border border-white/5 opacity-25 scale-[0.95] grayscale">
                        <div className="flex items-center gap-2">
                             <div className="p-1 lg:p-1.5 rounded bg-gray-700">
                                <Icon icon={LIVE_EVENTS[(currentEvent - 1 + LIVE_EVENTS.length) % LIVE_EVENTS.length].icon} className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-gray-400" />
                             </div>
                             <span className="text-xs lg:text-sm text-gray-300 truncate max-w-[100px] lg:max-w-[130px]">
                               {LIVE_EVENTS[(currentEvent - 1 + LIVE_EVENTS.length) % LIVE_EVENTS.length].text}
                             </span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Elementos Flutuantes - Menores e menos intrusivos */}
            <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-2 right-0 lg:-right-6 z-10 p-2 lg:p-3 bg-[#1a1a1a] border border-gray-800 rounded-lg shadow-lg max-w-[130px] lg:max-w-[150px]"
            >
                <div className="text-[10px] lg:text-xs text-gray-400 mb-0.5">Faturamento Hoje</div>
                <div className="text-lg lg:text-xl font-bold text-white">R$ 18.4k</div>
                <div className="text-[9px] text-green-400 flex items-center gap-1 mt-0.5">
                    <Icon icon="solar:trending-up-bold" className="w-2.5 h-2.5" /> +22%
                </div>
            </motion.div>

             <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-4 left-0 lg:-left-6 z-0 p-2 lg:p-3 bg-[#1a1a1a]/80 backdrop-blur border border-gray-800 rounded-lg shadow-lg"
            >
                <Icon icon="logos:google-analytics" className="w-16 lg:w-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500" />
            </motion.div>

        </div>

      </div>
    </section>
  );
}