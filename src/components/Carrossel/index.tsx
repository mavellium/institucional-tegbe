"use client";

import { useRef, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

// --- TIPAGEM ---
export type CaseType = 'video' | 'image' | 'text';

export interface ClientCase {
  id: string;
  type: CaseType;
  clientName: string;
  clientRole: string; // Ex: "Aluno - E-commerce"
  description: string;
  src?: string; 
  poster?: string;
  stats?: { 
    value: string;
    label: string;
  };
}

// Interface que espelha o JSON da API
export interface TestimonialsData {
  titulo: string;
  subtitulo: string;
  showStats: boolean;
  textColor: string;
  backgroundColor: string;
  testimonials: ClientCase[];
}

interface CasesCarouselProps {
  data: TestimonialsData | null;
}

// --- CARDS (DARK MODE & GOLD) ---

const VideoCard = ({ data }: { data: ClientCase }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleHover = (play: boolean) => {
    if (videoRef.current) {
      if (play) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div 
      className="relative w-[350px] md:w-[400px] h-[500px] flex-shrink-0 overflow-hidden rounded-[2rem] group cursor-pointer border border-white/5 hover:border-[#FFD700]/30 transition-all duration-300"
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      {data.src ? (
        <video 
          ref={videoRef}
          src={data.src}
          poster={data.poster}
          muted
          playsInline
          loop
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-[#0A0A0A] flex items-center justify-center border border-white/5">
           {/* Placeholder elegante para manter o padrão visual Mavellium */}
           <div className="w-12 h-12 rounded-full border border-[#FFD700]/20 animate-pulse" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
      
      {/* Play Icon */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#FFD700]/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 border border-[#FFD700]/30 ${isPlaying ? 'opacity-0 scale-150' : 'opacity-100 scale-100'}`}>
         <Icon icon="ph:play-fill" className="text-[#FFD700] w-6 h-6 ml-1" />
      </div>

      {/* Info */}
      <div className="absolute bottom-0 left-0 w-full p-8 text-white z-10">
         {data.stats && data.stats.value && (
           <div className="mb-4 inline-flex flex-col border-l-2 border-[#FFD700] pl-3 bg-black/20 backdrop-blur-sm pr-4 py-1 rounded-r-lg">
             <span className="text-2xl font-bold tracking-tight text-[#FFD700]">{data.stats.value}</span>
             <span className="text-[10px] text-gray-300 uppercase tracking-widest">{data.stats.label}</span>
           </div>
         )}
         <p className="text-base font-medium leading-relaxed mb-4 line-clamp-3 text-gray-200">"{data.description}"</p>
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-[#FFD700]">
               {data.clientName.charAt(0)}
            </div>
            <div>
               <p className="text-sm font-bold text-white">{data.clientName}</p>
               <p className="text-[10px] text-gray-500 uppercase tracking-wider">{data.clientRole}</p>
            </div>
         </div>
      </div>
    </div>
  );
};

const ImageCard = ({ data }: { data: ClientCase }) => (
  <div className="relative w-[350px] md:w-[400px] h-[500px] flex-shrink-0 overflow-hidden rounded-[2rem] group bg-[#0A0A0A] border border-white/10 hover:border-[#FFD700]/30 transition-all">
      <div className="absolute inset-0 h-[65%] overflow-hidden">
        {data.src ? (
  <img 
    src={data.src} 
    alt={data.clientName} 
    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
  />
) : (
  <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
    {/* Placeholder opcional para manter o visual Mavellium mesmo sem imagem */}
    <span className="text-white/20 text-xs">Premium Content</span>
  </div>
)}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0A0A] opacity-100" />
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[40%] bg-[#0A0A0A] p-8 flex flex-col justify-between rounded-t-[2rem] border-t border-white/5">
         <div>
            {data.stats && data.stats.value && (
                <div className="absolute -top-10 right-8 bg-[#FFD700] text-black px-4 py-2 rounded-xl shadow-[0_0_20px_rgba(255,215,0,0.2)]">
                    <p className="text-lg font-bold">{data.stats.value}</p>
                    <p className="text-[9px] uppercase font-bold opacity-70">{data.stats.label}</p>
                </div>
            )}
            <Icon icon="ph:quotes-fill" className="text-gray-700 w-8 h-8 mb-2" />
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
              {data.description}
            </p>
         </div>
         <div className="pt-4 border-t border-white/5 mt-2 flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-gray-500">
               {data.clientName.charAt(0)}
            </div>
             <div>
                <p className="text-sm font-bold text-white">{data.clientName}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">{data.clientRole}</p>
             </div>
         </div>
      </div>
  </div>
);

const TextCard = ({ data }: { data: ClientCase }) => (
  <div className="relative w-[300px] md:w-[350px] h-[500px] flex-shrink-0 bg-[#0A0A0A] rounded-[2rem] border border-white/10 p-8 flex flex-col justify-between group hover:border-[#FFD700]/30 hover:bg-[#0f0f0f] transition-all duration-300">
      <div>
         <div className="mb-8 w-10 h-10 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center text-[#FFD700]">
            <Icon icon="ph:chat-teardrop-text-bold" className="w-5 h-5" />
         </div>
         {data.stats && data.stats.value && (
            <div className="mb-6">
                <span className="text-3xl font-bold text-white block">{data.stats.value}</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider">{data.stats.label}</span>
            </div>
         )}
         <p className="text-lg text-gray-200 leading-relaxed font-light italic">
            "{data.description}"
         </p>
      </div>
      
      <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/5">
         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#222] border border-white/10 flex items-center justify-center text-xs font-bold text-gray-400">
            {data.clientName.charAt(0)}
         </div>
         <div>
            <p className="text-sm font-bold text-white">{data.clientName}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">{data.clientRole}</p>
         </div>
      </div>
  </div>
);


// --- COMPONENTE PRINCIPAL (CARROSSEL) ---
export default function CasesCarousel({ data }: CasesCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  // Recalcular largura do carrossel quando os dados mudarem
  useEffect(() => {
    if (carouselRef.current) {
      // Pequeno timeout para garantir que o DOM renderizou
      setTimeout(() => {
          if(carouselRef.current) {
             setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
          }
      }, 100);
    }
  }, [data]);

  if (!data) return null;

  return (
    <section className="py-24 w-full bg-[#020202] relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFD700]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FFD700]/20 bg-[#FFD700]/5 backdrop-blur-md mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] animate-pulse"></span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#FFD700] uppercase">
                {data.titulo}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.05]">
               {/* Lógica simples para quebrar o título ou destacar, se quiser customizar mais pode usar o campo 'subtitulo' */}
               Resultados <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DBB46C] via-[#FFD700] to-[#B8860B]">
                 {data.subtitulo || "Comprovados"}
               </span>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 text-gray-500">
             <Icon icon="ph:hand-swipe-left" className="w-5 h-5 animate-pulse" />
             <span className="text-xs uppercase tracking-widest">Arraste para explorar</span>
          </div>
        </div>

        {/* DRAGGABLE CAROUSEL */}
        <motion.div 
            ref={carouselRef} 
            className="cursor-grab active:cursor-grabbing overflow-hidden"
            whileTap={{ cursor: "grabbing" }}
        >
            <motion.div 
                drag="x" 
                dragConstraints={{ right: 0, left: -width }} 
                className="flex gap-6"
            >
                {data.testimonials.map((item) => (
                    <div key={item.id} className="relative">
                        {item.type === 'video' && <VideoCard data={item} />}
                        {item.type === 'image' && <ImageCard data={item} />}
                        {item.type === 'text' && <TextCard data={item} />}
                    </div>
                ))}
            </motion.div>
        </motion.div>

        {/* FOOTER STATS (Opcional, baseado no showStats) */}
        {data.showStats && (
            <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 border-t border-white/5 pt-10">
            <div className="text-center">
                <p className="text-3xl font-bold text-white">+1.2k</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Alunos Formados</p>
            </div>
            <div className="text-center">
                <p className="text-3xl font-bold text-[#FFD700]">R$ 45M+</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Gerados (Alunos)</p>
            </div>
            <div className="text-center">
                <p className="text-3xl font-bold text-white">4.9/5</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Avaliação Média</p>
            </div>
            </div>
        )}

      </div>
    </section>
  );
}