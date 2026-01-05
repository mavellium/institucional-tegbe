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
    <section className="relative w-full min-h-[95vh] flex items-center justify-center bg-[#050505] overflow-hidden pt-20">
      
      {/* --- 1. AMBIENCE & LIGHTING (Cinematografia) --- */}
      {/* O "Spotlight" Dourado vindo de cima, simulando uma luz divina/ouro */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#FFCC00] rounded-full blur-[180px] opacity-[0.08] pointer-events-none mix-blend-screen" />
      
      {/* Grid de Perspectiva no Chão (Sensação de profundidade) */}
      <div className="absolute bottom-0 w-full h-[50vh] bg-[linear-gradient(to_bottom,transparent_0%,#050505_100%),linear-gradient(to_right,#333_1px,transparent_1px)] bg-[size:4rem_100%] opacity-[0.05] [transform:perspective(1000px)_rotateX(60deg)] pointer-events-none" />

      <div className="container relative z-10 px-4 md:px-6 flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* --- 2. ESQUERDA: AUTORIDADE (Copywriting) --- */}
        <div className="flex-1 max-w-2xl text-left">
          
          {/* Badge de "Sistema Ativo" */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111] border border-[#222] mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFCC00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFCC00]"></span>
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
              {content.badge?.texto || "Sistema Operacional"}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Ease "Apple"
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-6"
          >
            {content.titulo?.chamada} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFCC00] via-[#FDE047] to-[#D97706]">
              {content.titulo?.tituloPrincipal}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg sm:text-xl text-gray-400 font-light leading-relaxed mb-10 max-w-lg"
            dangerouslySetInnerHTML={{ __html: content.subtitulo }}
          />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-start gap-5"
          >
            {content.botao?.visivel && (
                <a href={content.botao.link} target="_blank" className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FFCC00] to-yellow-600 rounded-lg opacity-40 blur transition duration-200 group-hover:opacity-70"></div>
                    <Button className="relative h-14 px-8 bg-[#0a0a0a] hover:bg-[#111] text-white border border-[#FFCC00]/50 rounded-lg text-base font-medium flex items-center gap-3 overflow-hidden">
                        <span className="relative z-10">{content.botao.texto}</span>
                        <div className="absolute inset-0 bg-[#FFCC00] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                        <Icon icon="solar:arrow-right-up-bold" className="w-5 h-5 text-[#FFCC00]" />
                    </Button>
                </a>
            )}
            
            {/* Elemento de Confiança Sutil */}
            <div className="flex items-center gap-4 h-14 px-4 border-l border-white/10">
                <div className="text-right">
                    <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Mercado Livre</p>
                    <div className="flex text-[#FFCC00]">★★★★★</div>
                </div>
                <Icon icon="simple-icons:mercadolivre" className="w-8 h-8 text-gray-600" />
            </div>
          </motion.div>
        </div>

        {/* --- 3. DIREITA: O "MOTOR" (Visual Inovador) --- */}
        <div className="flex-1 w-full relative h-[600px] flex items-center justify-center perspective-[2000px]">
            
            {/* O Núcleo do "Reator" (Interface Principal) */}
            <motion.div 
                initial={{ rotateX: 20, rotateY: -20, opacity: 0 }}
                animate={{ rotateX: 5, rotateY: -10, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative z-20 w-[380px] md:w-[450px] bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl shadow-yellow-900/10"
            >
                {/* Header da Interface */}
                <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500" />
                    </div>
                    <span className="text-[10px] font-mono text-gray-500">MAVELLIUM_ENGINE_V1.0</span>
                </div>

                {/* Gráfico Abstrato (Barras animadas) */}
                <div className="flex items-end justify-between h-32 gap-2 mb-8 px-2">
                    {[40, 65, 45, 80, 55, 90, 70, 95].map((h, i) => (
                        <motion.div 
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 1, delay: i * 0.1, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
                            className={`w-full rounded-t-sm ${i === 7 ? 'bg-[#FFCC00] shadow-[0_0_15px_#FFCC00]' : 'bg-gray-800'}`}
                        />
                    ))}
                </div>

                {/* Live Feed Simulator (O "Pulo do Gato") */}
                <div className="space-y-3">
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">Real-time Activity</p>
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={currentEvent}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-md bg-opacity-10 ${LIVE_EVENTS[currentEvent].color.replace('text-', 'bg-')}`}>
                                    <Icon icon={LIVE_EVENTS[currentEvent].icon} className={`w-5 h-5 ${LIVE_EVENTS[currentEvent].color}`} />
                                </div>
                                <span className="text-sm text-gray-300 font-medium">{LIVE_EVENTS[currentEvent].text}</span>
                            </div>
                            <span className={`text-sm font-bold ${LIVE_EVENTS[currentEvent].color}`}>{LIVE_EVENTS[currentEvent].value}</span>
                        </motion.div>
                    </AnimatePresence>

                    {/* Linha "fantasma" para dar volume (item anterior fade out) */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 opacity-30 scale-95 grayscale">
                        <div className="flex items-center gap-3">
                             <div className="p-2 rounded-md bg-gray-700">
                                <Icon icon={LIVE_EVENTS[(currentEvent - 1 + LIVE_EVENTS.length) % LIVE_EVENTS.length].icon} className="w-5 h-5 text-gray-400" />
                             </div>
                             <span className="text-sm text-gray-300">{LIVE_EVENTS[(currentEvent - 1 + LIVE_EVENTS.length) % LIVE_EVENTS.length].text}</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Elementos Flutuantes em Profundidade (Parallax Fake) */}
            <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-0 lg:-right-10 z-10 p-4 bg-[#1a1a1a] border border-gray-800 rounded-xl shadow-2xl max-w-[180px]"
            >
                <div className="text-xs text-gray-400 mb-1">Faturamento Hoje</div>
                <div className="text-2xl font-bold text-white">R$ 18.4k</div>
                <div className="text-[10px] text-green-400 flex items-center gap-1 mt-1">
                    <Icon icon="solar:trending-up-bold" /> +22% vs ontem
                </div>
            </motion.div>

             <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 left-0 lg:-left-10 z-0 p-4 bg-[#1a1a1a]/80 backdrop-blur border border-gray-800 rounded-xl shadow-2xl"
            >
                <Icon icon="logos:google-analytics" className="w-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500" />
            </motion.div>

        </div>

      </div>
    </section>
  );
}