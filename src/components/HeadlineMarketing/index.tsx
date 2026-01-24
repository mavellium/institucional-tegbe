"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { motion, useSpring, useTransform, animate } from "framer-motion";

interface HeadlineMarketingProps {
  content: any;
  theme: any;
}

// CONFIGURAÇÃO
const RADAR_SPEED = 4; // Segundos por volta
const PRIMARY_COLOR = "#E31B63";

// Targets posicionados estrategicamente
const TARGETS = [
  { id: 1, name: "Dr. Ricardo M.", role: "Proprietário", status: "Qualificado", angle: 45, distance: 35 },
  { id: 2, name: "Construtora V.", role: "Decisor", status: "Em Negociação", angle: 160, distance: 70 },
  { id: 3, name: "Julia S.", role: "High-Ticket", status: "Capturado", angle: 290, distance: 50 },
];

// Subcomponente para o Contador Numérico
function Counter({ value }: { value: number }) {
  const count = useSpring(0, { duration: 2000 }); // Duração de 2s para subir
  const rounded = useTransform(count, (latest) => Math.floor(latest).toLocaleString('pt-BR'));

  useEffect(() => {
    animate(count, value, { duration: 2.5, ease: "circOut" });
  }, [count, value]);

  return <motion.span>{rounded}</motion.span>;
}

export function HeadlineMarketing({ content, theme }: HeadlineMarketingProps) {
  // Coordenadas aleatórias para o HUD (efeito cosmético)
  const [hudCoords, setHudCoords] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const i = setInterval(() => setHudCoords({ x: Math.random() * 90, y: Math.random() * 90 }), 300);
    return () => clearInterval(i);
  }, []);

  return (
    <section className="relative w-full min-h-[95vh] flex items-center justify-center bg-[#020202] overflow-hidden pb-10">
      
      {/* --- 1. AMBIENCE (Cinematic) --- */}
      {/* Luz volumétrica de fundo */}
      <div className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-[#E31B63] rounded-full blur-[300px] opacity-[0.07] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-purple-800 rounded-full blur-[250px] opacity-[0.06] pointer-events-none mix-blend-screen" />
      
      {/* Grid de Dados (Matrix sutil) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)] pointer-events-none" />

      <div className="container relative z-10 px-4 md:px-6 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        
        {/* --- 2. ESQUERDA: COPYWRITING (Estratégia) --- */}
        <div className="flex-1 max-w-2xl text-left relative z-20">
          
          {/* Badge Tático */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-sm border-l-[3px] border-[#E31B63] bg-gradient-to-r from-[#E31B63]/10 to-transparent mb-8 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31B63] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E31B63]"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E31B63] drop-shadow-sm">
              {content.badge?.texto || "Aquisição de Tráfego"}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[1.05] mb-8"
          >
            {content.titulo?.chamada} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E31B63] via-[#FF4D80] to-[#B3003B] drop-shadow-[0_0_30px_rgba(227,27,99,0.3)]">
              {content.titulo?.tituloPrincipal}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-xl text-gray-400 font-light leading-relaxed mb-12 max-w-lg border-l-2 border-[#E31B63]/20 pl-6"
            dangerouslySetInnerHTML={{ __html: content.subtitulo }}
          />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-8"
          >
            {content.botao?.visivel && (
                <a href={content.botao.link} target="_blank" className="group relative w-full sm:w-auto">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#E31B63] to-purple-600 rounded-lg blur opacity-40 group-hover:opacity-80 transition duration-500"></div>
                    <Button
                    aria-label={content.botao.texto}
                     className="relative w-full sm:w-auto h-14 px-10 bg-[#0A0A0A] hover:bg-[#111] text-white border border-[#E31B63]/50 rounded-lg text-base font-bold tracking-wide uppercase flex items-center justify-center gap-3 transition-all group-hover:tracking-wider">
                        {content.botao.texto}
                        <Icon icon="solar:target-bold" className="w-5 h-5 text-[#E31B63]" />
                    </Button>
                </a>
            )}
            
            {/* KPI Dinâmico */}
            <div className="flex flex-col justify-center h-14 px-6 border-l border-[#E31B63]/20">
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white font-mono tracking-tight">
                        <Counter value={542000} />
                    </span>
                    <span className="text-[#E31B63] text-lg">+</span>
                </div>
                <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider mt-1">Leads Processados</span>
            </div>
          </motion.div>
        </div>

        {/* --- 3. DIREITA: O RADAR HOLOGRÁFICO (Visual Key) --- */}
        <div className="flex-1 w-full relative h-[600px] flex items-center justify-center perspective-[1200px]">
            
            {/* O Radar Container (Inclinado para efeito 3D Tático) */}
            <motion.div 
                initial={{ rotateX: 45, scale: 0.8, opacity: 0 }}
                animate={{ rotateX: 25, scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative w-[450px] h-[450px] md:w-[550px] md:h-[550px]"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* HUD Overlay (Elementos Técnicos) */}
                <div className="absolute -top-16 left-0 w-full flex justify-between font-mono text-[9px] text-[#E31B63]/60 tracking-[0.2em] pointer-events-none">
                    <span>SYS_READY</span>
                    <span>TARGET_ACQ_MODE</span>
                </div>
                <div className="absolute -bottom-16 w-full text-center font-mono text-[9px] text-[#E31B63]/40 tracking-[0.3em] pointer-events-none">
                    Scanning Sector {Math.floor(hudCoords.x)}-{Math.floor(hudCoords.y)}
                </div>

                {/* Base do Radar (Anéis) */}
                {[1, 2, 3].map(i => (
                    <div key={i} className="absolute inset-0 rounded-full border border-[#E31B63]/10" style={{ margin: `${i * 15}%` }} />
                ))}
                <div className="absolute inset-0 rounded-full border border-[#E31B63]/30 shadow-[0_0_30px_rgba(227,27,99,0.1)]" />
                
                {/* Cruz de Mira */}
                <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#E31B63]/20 to-transparent" />
                <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#E31B63]/20 to-transparent" />

                {/* --- O SCANNER (A Luz) --- */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: RADAR_SPEED, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full z-10"
                >
                    {/* Cone de Luz Suave */}
                    <div 
                        className="absolute inset-0 rounded-full"
                        style={{ background: `conic-gradient(from 0deg, transparent 270deg, ${PRIMARY_COLOR}05 300deg, ${PRIMARY_COLOR}60 360deg)` }}
                    />
                    {/* Borda de Ataque (Laser Branco/Rosa) */}
                    <div 
                        className="absolute top-0 left-1/2 h-1/2 w-[2px] bg-gradient-to-b from-white via-[#E31B63] to-transparent shadow-[0_0_15px_#E31B63,0_0_5px_white]" 
                        style={{ transformOrigin: "bottom center" }} 
                    />
                </motion.div>

                {/* --- TARGETS (Os Leads) --- */}
                {TARGETS.map((target) => {
                    const exactDelay = (target.angle / 360) * RADAR_SPEED;

                    return (
                        <motion.div
                            key={target.id}
                            className="absolute top-1/2 left-1/2 w-0 h-0 z-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: exactDelay, duration: 0 }} // Aparece instantaneamente quando o scanner passa
                            style={{ 
                                rotate: `${target.angle}deg`, 
                                translateX: `${target.distance * 2.8}px` // Distância do centro
                            }}
                        >
                            {/* 1. MIRA DE TRAVAMENTO (Lock-on Brackets) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 2 }}
                                animate={{ opacity: [0, 1, 0], scale: [1.5, 1, 1] }} // Pisca e some
                                transition={{ delay: exactDelay, duration: 1.5, repeat: Infinity, repeatDelay: RADAR_SPEED - 1.5 }}
                                className="absolute -inset-6 border-2 border-[#E31B63] rounded-sm opacity-0"
                                style={{ transform: `rotate(-${target.angle}deg)` }} // Mantém reto
                            />
                            
                            {/* 2. PONTO DE IMPACTO (Ping) */}
                            <motion.div
                                initial={{ scale: 0, opacity: 1 }}
                                animate={{ scale: 3, opacity: 0 }}
                                transition={{ delay: exactDelay, duration: 1, repeat: Infinity, repeatDelay: RADAR_SPEED - 1 }}
                                className="absolute -inset-1 rounded-full bg-[#E31B63]"
                            />

                            {/* 3. O CARD DO LEAD (Informação) */}
                            <motion.div 
                                style={{ rotate: `${-target.angle}deg` }} // Contra-rotaciona para ficar legível
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: exactDelay, duration: 0.5 }} // Suave entrada
                                className="relative left-4 -top-6 flex items-center gap-3 p-3 rounded-lg bg-[#0A0A0A]/90 backdrop-blur-md border border-[#E31B63]/40 shadow-[0_0_20px_rgba(227,27,99,0.3)] min-w-[180px]"
                            >
                                {/* Avatar */}
                                <div className="relative shrink-0 w-8 h-8 rounded-full bg-gray-800 border border-white/10 flex items-center justify-center">
                                     <Icon icon="solar:user-bold" className="text-gray-400 w-4 h-4" />
                                     <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-black animate-pulse" />
                                </div>
                                
                                {/* Info */}
                                <div>
                                    <div className="text-xs font-bold text-white leading-none mb-1">{target.name}</div>
                                    <div className="text-[9px] font-bold text-[#E31B63] uppercase tracking-wider bg-[#E31B63]/10 px-1.5 py-0.5 rounded-sm inline-block">
                                        {target.status}
                                    </div>
                                </div>

                                {/* Linha conectora (Holograma) */}
                                <div className="absolute right-full top-1/2 w-4 h-[1px] bg-[#E31B63]/50" />
                            </motion.div>
                        </motion.div>
                    );
                })}

                {/* Núcleo Central (Pulsante) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                    <div className="w-3 h-3 rounded-full bg-[#E31B63] shadow-[0_0_20px_#E31B63] animate-pulse" />
                    <div className="absolute inset-0 w-3 h-3 rounded-full border border-[#E31B63] animate-ping opacity-50" />
                </div>

            </motion.div>

        </div>

      </div>
    </section>
  );
}