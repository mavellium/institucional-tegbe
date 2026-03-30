"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function CtaDuvidas() {
  return (
    // Fundo "Quase Preto" Premium
    <section className="relative w-full bg-neutral-950 overflow-hidden selection:bg-white selection:text-neutral-950">
      
      {/* A FORMA GEOMÉTRICA MASSIVA (SVG) */}
      <div className="absolute top-0 right-0 bottom-0 w-[55%] md:w-[45%] lg:w-[40%] pointer-events-none z-0 hidden md:block">
        <svg
          viewBox="0 0 400 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover object-left"
          preserveAspectRatio="none"
        >
          {/* Bloco Superior */}
          <motion.path
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            d="M0 0H400V400H150L0 250V0Z"
            fill="#1A1A1A" // Cinza chumbo escuro para dar contraste com o fundo
          />
          {/* Bloco Inferior */}
          <motion.path
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            d="M0 450H150L400 700V800H0V450Z"
            fill="#1A1A1A" // Cinza chumbo escuro
          />
        </svg>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32 lg:py-40 flex flex-col md:flex-row items-center">
        
        {/* Coluna de Texto */}
        <div className="w-full md:w-[55%] lg:w-[50%] flex flex-col items-start text-left">
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl lg:text-[72px] font-semibold text-white tracking-tight leading-[1.05] mb-6 text-balance"
          >
            Está em dúvida<br />
            sobre qual<br />
            plano escolher?
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-neutral-400 font-medium max-w-md mb-10 leading-relaxed"
          >
            O nosso time de especialistas (ou assistente com IA) está pronto para ajudar você a escolher o plano ideal para o seu projeto.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className="group flex items-center gap-3 bg-white text-neutral-950 px-8 py-4 rounded-xl font-bold text-lg hover:bg-neutral-200 hover:shadow-[0_8px_30px_rgba(255,255,255,0.12)] hover:-translate-y-1 transition-all duration-300 active:scale-95">
              Fale com um Especialista
              <MessageCircle className="w-5 h-5 text-neutral-500 group-hover:text-neutral-950 transition-colors" />
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}