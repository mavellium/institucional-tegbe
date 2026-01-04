"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import config from "@/json/Localizacao/config.json"; 

export default function LocationsSection() {
  return (
    <section className="relative py-24 bg-[#020202] overflow-hidden font-sans border-t border-white/5">
      
      {/* --- BACKGROUND MAPA TÁTICO (SVG) --- */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {/* Padrão de Grid Tático */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        {/* Mapa Mundi Pontilhado (Simulado via imagem ou SVG inline para performance) */}
        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/2/2f/World_map_dots_grey.svg')] bg-no-repeat bg-center bg-contain opacity-30 grayscale invert mix-blend-overlay"></div>
      </div>

      {/* Luz Dourada Central */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFD700]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10 max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-16 space-y-4">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FFD700]/20 bg-[#FFD700]/5 backdrop-blur-md">
              <Icon icon="ph:map-pin-fill" className="text-[#FFD700] w-4 h-4" />
              <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#FFD700] uppercase">
                {config.header.badge}
              </span>
           </div>
           <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
             {config.header.title}
           </h2>
           <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
             {config.header.subtitle}
           </p>
        </div>

        {/* LOCATIONS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {config.locations.map((loc, index) => (
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    className="group relative rounded-3xl bg-[#0A0A0A] border border-white/10 overflow-hidden hover:border-[#FFD700]/30 transition-all duration-500"
                >
                    {/* Imagem/Mapa do Local (Placeholder visual de mapa escuro) */}
                    <div className="h-48 w-full bg-[#111] relative overflow-hidden">
                        {/* Efeito de Radar */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                             <div className="relative flex items-center justify-center w-24 h-24">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-[#FFD700] opacity-10 animate-ping duration-[3s]"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FFD700]"></span>
                             </div>
                        </div>
                        {/* Label Cidade */}
                        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                            <span className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                <Icon icon="ph:navigation-arrow-fill" className="text-[#FFD700]" />
                                {loc.city}
                            </span>
                        </div>
                    </div>

                    {/* Conteúdo */}
                    <div className="p-8">
                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#FFD700] transition-colors">
                            {loc.role}
                        </h3>
                        <p className="text-gray-500 text-sm mb-6 font-mono">
                            {loc.city}
                        </p>

                        <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                            {loc.description}
                        </p>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {loc.features.map((feat, i) => (
                                <span key={i} className="px-2 py-1 bg-white/5 rounded text-[10px] text-gray-400 border border-white/5 uppercase tracking-wide">
                                    {feat}
                                </span>
                            ))}
                        </div>

                        {/* Footer Card */}
                        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex items-start gap-3">
                                <Icon icon="ph:map-trifold-bold" className="text-[#FFD700] w-5 h-5 mt-0.5" />
                                <span className="text-xs text-gray-300 max-w-[180px]">
                                    {loc.address}
                                </span>
                            </div>
                            
                            <a 
                                href={loc.link} 
                                target="_blank" 
                                className="flex items-center gap-2 text-xs font-bold text-white hover:text-[#FFD700] transition-colors uppercase tracking-wider group/link"
                            >
                                Ver no Mapa
                                <Icon icon="ph:arrow-up-right-bold" className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                            </a>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* CTA FINAL */}
        <div className="mt-16 flex justify-center">
             <a 
                href={config.cta.link}
                target="_blank"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-[#FFD700] hover:text-black hover:border-[#FFD700] transition-all duration-300"
             >
                <Icon icon="ph:coffee-bold" className="w-5 h-5 text-[#FFD700] group-hover:text-black transition-colors" />
                <span className="text-sm font-bold uppercase tracking-widest text-white group-hover:text-black transition-colors">
                    {config.cta.text}
                </span>
             </a>
        </div>

      </div>
    </section>
  );
}