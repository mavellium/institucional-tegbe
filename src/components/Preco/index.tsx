"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import config from "@/json/Preco/config.json"; 

export default function PricingSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[#020202] relative overflow-hidden font-sans" id="planos">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#FFD700]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10 max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-16 space-y-4">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FFD700]/20 bg-[#FFD700]/5 backdrop-blur-md">
              <Icon icon="ph:credit-card-bold" className="text-[#FFD700] w-4 h-4" />
              <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#FFD700] uppercase">
                {config.header.badge}
              </span>
           </div>
           <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
             {config.header.title}
           </h2>
           <p className="text-gray-400 max-w-xl mx-auto text-lg font-light">
             {config.header.subtitle}
           </p>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {config.plans.map((plan, index) => {
               const isHighlight = plan.highlight;
               
               return (
                 <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`relative p-8 rounded-3xl border flex flex-col h-full transition-all duration-500
                        ${isHighlight 
                            ? 'bg-[#0F0F0F] border-[#FFD700]/40 shadow-[0_0_40px_rgba(255,215,0,0.1)] scale-105 z-10' 
                            : 'bg-[#0A0A0A] border-white/5 hover:border-white/10 opacity-80 hover:opacity-100'
                        }
                    `}
                 >
                    {/* Badge de Destaque */}
                    {isHighlight && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFD700] text-black text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                            {plan.tag}
                        </div>
                    )}

                    {/* Conteúdo do Card */}
                    <div className="mb-6">
                        <h3 className={`text-xl font-bold mb-2 ${isHighlight ? 'text-white' : 'text-gray-300'}`}>{plan.name}</h3>
                        <p className="text-xs text-gray-500 min-h-[40px] leading-relaxed">{plan.description}</p>
                    </div>

                    <div className="mb-8">
                        <div className="flex items-baseline gap-1">
                            <span className="text-sm text-gray-400">R$</span>
                            <span className={`text-4xl font-bold tracking-tight ${isHighlight ? 'text-[#FFD700]' : 'text-white'}`}>{plan.price}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{plan.installments}</p>
                    </div>

                    <div className="flex-grow space-y-4 mb-8">
                        {plan.features.map((feature, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <Icon icon="ph:check-circle-fill" className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isHighlight ? 'text-[#FFD700]' : 'text-gray-600'}`} />
                                <span className="text-sm text-gray-300">{feature}</span>
                            </div>
                        ))}
                    </div>

                    <button className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2
                        ${isHighlight 
                            ? 'bg-gradient-to-r from-[#FFD700] to-[#C59D1F] hover:to-[#E5C100] text-black shadow-lg hover:scale-[1.02]' 
                            : 'bg-white/5 hover:bg-white/10 text-white border border-white/5'
                        }
                    `}>
                        {plan.cta}
                        {isHighlight && <Icon icon="ph:arrow-right-bold" className="w-4 h-4" />}
                    </button>

                 </motion.div>
               );
            })}
        </div>

        {/* GARANTIA */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-6 p-6 rounded-2xl border border-white/5 bg-[#0A0A0A]/50 max-w-2xl mx-auto">
             <div className="w-16 h-16 rounded-full bg-[#FFD700]/10 flex items-center justify-center flex-shrink-0 border border-[#FFD700]/20">
                 <Icon icon="ph:shield-check-fill" className="w-8 h-8 text-[#FFD700]" />
             </div>
             <div className="text-center md:text-left">
                 <h4 className="text-white font-bold text-lg mb-1">{config.guarantee.title}</h4>
                 <p className="text-gray-400 text-sm leading-relaxed">{config.guarantee.text}</p>
             </div>
        </div>

      </div>
    </section>
  );
}