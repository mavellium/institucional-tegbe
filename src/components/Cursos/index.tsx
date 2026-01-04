"use client";

import { useRef } from "react";
import { Icon } from "@iconify/react";
import { motion, useInView, Variants } from "framer-motion";
import config from "@/json/Cursos/config.json"; 

export default function CourseModules() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  const lineVariants: Variants = {
    hidden: { height: 0 },
    visible: { 
      height: "100%", 
      transition: { duration: 1.5, ease: "easeInOut" } 
    }
  };

  return (
    <section className="py-24 bg-[#020202] relative overflow-hidden font-sans">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFD700]/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container px-4 md:px-6 relative z-10 max-w-5xl mx-auto" ref={ref}>
        
        {/* --- HEADER --- */}
        <div className="text-center mb-20 space-y-6">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FFD700]/30 bg-[#FFD700]/5 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] animate-pulse"></span>
              <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#FFD700] uppercase">
                {config.header.badge}
              </span>
           </div>
           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
             {config.header.title}
           </h2>
           <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
             {config.header.subtitle}
           </p>
        </div>


        {/* --- TIMELINE DE MÓDULOS --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative space-y-8"
        >
          {/* Linha Conectora Central (Desktop) ou Lateral (Mobile) */}
          <div className="absolute left-[28px] md:left-[50%] top-8 bottom-8 w-px bg-gradient-to-b from-[#FFD700]/0 via-[#FFD700]/30 to-[#FFD700]/0 transform md:-translate-x-1/2 hidden md:block">
            <motion.div variants={lineVariants} className="w-full bg-[#FFD700] shadow-[0_0_10px_#FFD700]" />
          </div>

          {config.modules.map((module, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div 
                key={index}
                variants={cardVariants}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                
                {/* LADO A: CARD DE CONTEÚDO */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                  <div className="group relative p-8 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-[#FFD700]/40 transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(255,215,0,0.1)] overflow-hidden">
                     
                     {/* Efeito de Brilho no Hover */}
                     <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                     {/* Número Gigante de Fundo */}
                     <div className="absolute -right-4 -top-6 text-9xl font-black text-white/[0.02] group-hover:text-[#FFD700]/[0.05] transition-colors select-none pointer-events-none font-mono">
                       {module.id}
                     </div>

                     <div className="relative z-10">
                        <span className="text-[10px] font-bold text-[#FFD700] tracking-widest uppercase mb-2 block">
                          {module.phase}
                        </span>
                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#FFD700] transition-colors">
                          {module.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                          {module.description}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {module.tags.map((tag, i) => (
                            <span key={i} className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider group-hover:border-[#FFD700]/20 group-hover:text-gray-300 transition-colors">
                              {tag}
                            </span>
                          ))}
                        </div>
                     </div>
                  </div>
                </div>

                {/* CENTRO: ÍCONE CONECTOR */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex flex-col items-center justify-center w-14 h-14 z-20">
                   <div className="w-12 h-12 rounded-full bg-[#020202] border border-[#FFD700]/30 flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.2)]">
                      <Icon icon={module.icon} className="w-5 h-5 text-[#FFD700]" />
                   </div>
                </div>

                {/* LADO B: ESPAÇO VAZIO (Para equilíbrio no Grid) */}
                <div className="w-full md:w-1/2 hidden md:block" />

              </motion.div>
            );
          })}
        </motion.div>


        {/* --- CTA FINAL --- */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5 }}
           className="flex justify-center mt-20"
        >
           <button className="group relative px-8 py-4 bg-gradient-to-b from-[#FFD700] to-[#C59D1F] rounded-lg text-black font-bold tracking-wide hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] transition-all active:scale-[0.98]">
              <span className="relative z-10 flex items-center gap-2">
                {config.cta.text}
                <Icon icon="ph:file-text-bold" className="w-4 h-4" />
              </span>
           </button>
        </motion.div>

      </div>
    </section>
  );
}