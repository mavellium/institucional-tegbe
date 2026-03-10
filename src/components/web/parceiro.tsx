/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import CarrosselParceiros from "../ui/carrosselParceiros";

export default function Parceiro() {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animação simples de entrada para o CTA ao scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ctaRef.current) observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 px-4 sm:px-6 md:px-8 bg-[#020202] relative overflow-hidden border-t border-white/5">
    
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#E31B63]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header da Seção */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-rose-500/20 bg-rose-900/10 backdrop-blur-sm"
          >
            <Icon icon="solar:star-ring-bold" className="text-[#E31B63] w-4 h-4" />
            <span className="text-xs font-bold tracking-wider uppercase text-rose-200/80">
              Elite do Mercado
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white leading-tight"
          >
            Trabalhamos com quem <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0F43] to-[#E31B63]">
              domina o jogo.
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-gray-400 max-w-2xl text-lg"
          >
            Unimos forças com os maiores especialistas para garantir que sua operação 
            não apenas rode, mas escale com previsibilidade e lucro.
          </motion.p>
        </div>

        {/* O Carrossel de Cartões */}
        <div className="relative">
          <CarrosselParceiros />
        </div>

        <div ref={ctaRef} className="flex flex-col items-center mt-20 opacity-0 transition-all duration-700 translate-y-10 [&.animate-fade-in-up]:opacity-100 [&.animate-fade-in-up]:translate-y-0">
          <Link
            href="https://api.whatsapp.com/send?phone="
            target="_blank"
            className="group inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold transition-all duration-300 bg-white text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            <span>Quero Escalar meu Negócio</span>
            <Icon
              icon="lucide:arrow-right"
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          
          <p className="mt-6 text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-2 text-gray-500">
            <span className="w-2 h-2 rounded-full animate-pulse bg-rose-500"></span>
            Vagas limitadas para consultoria estratégica
          </p>
        </div>

      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}