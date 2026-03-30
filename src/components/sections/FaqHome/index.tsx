"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import Textura from "@/components/ui/textura"; // Mantendo nossa textura premium

// --- INTERFACES PARA O SCHEMA DINÂMICO ---
interface FAQItem {
  id: string | number;
  question: string;
  answer: string;
  order?: number;
}

interface FAQData {
  header: {
    tag: string;
    title: string;
    subtitle: string;
    tag_icon: string;
  };
  questions_and_answers: FAQItem[];
}

export default function FaqSection() {
  const [data, setData] = useState<FAQData | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [loading, setLoading] = useState(true);

  // --- FETCH DINÂMICO MAVELLIUM ---
  useEffect(() => {
    const loadFAQ = async () => {
      try {
        const response = await fetch('/api-tegbe/tegbe-institucional/faq-home');
        const result = await response.json();
        if (result.faq_section) {
          setData(result.faq_section);
        }
      } catch (error) {
        console.error("Mavellium Engine - Erro ao carregar FAQ:", error);
      } finally {
        setLoading(false);
      }
    };
    loadFAQ();
  }, []);

  if (loading || !data) return null;

  return (
    <section className="relative py-32 bg-[#F8F9FA] selection:bg-neutral-900 selection:text-white">
      
      {/* TEXTURA SUTIL DE FUNDO */}
      <Textura opacity={0.02} className="absolute inset-0 pointer-events-none mix-blend-multiply" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        
        {/* HEADER PADRONIZADO E PREMIUM */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200 mb-6 shadow-sm"
          >
            <Icon icon={data.header.tag_icon || "solar:question-circle-linear"} className="w-4 h-4 text-neutral-500" />
            <span className="text-[11px] font-bold uppercase tracking-widest mt-[1px]">
              {data.header.tag}
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-900 mb-6 leading-tight">
            {data.header.title.split('.').map((part, i) => (
              <span key={i}>
                {part}{part && '.'}
                {i === 0 && <br className="hidden md:block" />}
              </span>
            ))}
          </h2>
          
          <p className="text-lg md:text-xl text-neutral-500 font-normal max-w-2xl leading-relaxed">
            {data.header.subtitle}
          </p>
        </div>

        {/* ACCORDION REFINADO (CARDS FLUTUANTES) */}
        <div className="space-y-4">
          {data.questions_and_answers.map((item, i) => {
            const isOpen = openIndex === i;
            
            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`
                  group relative overflow-hidden rounded-[1.5rem] transition-all duration-500 ease-out
                  ${isOpen 
                    ? 'bg-white border border-neutral-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)]' 
                    : 'bg-white border border-neutral-100 shadow-sm hover:shadow-md hover:border-neutral-200 hover:-translate-y-0.5'}
                `}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                >
                  <span className={`text-lg md:text-xl font-semibold tracking-tight transition-colors duration-300 pr-6 ${isOpen ? 'text-neutral-950' : 'text-neutral-600 group-hover:text-neutral-900'}`}>
                    {item.question}
                  </span>
                  
                  {/* Ícone Redondo com Inversão de Cor */}
                  <div className={`
                    flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500
                    ${isOpen 
                      ? 'bg-neutral-950 text-white rotate-180 scale-105' 
                      : 'bg-neutral-50 border border-neutral-100 text-neutral-400 group-hover:bg-neutral-100 group-hover:text-neutral-900'}
                  `}>
                    <Icon icon="solar:alt-arrow-down-linear" className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // Curva de animação nativa (estilo Apple)
                    >
                      <div className="px-6 md:px-8 pb-8 pt-0">
                        <p className="text-neutral-500 leading-relaxed text-base md:text-lg max-w-3xl">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}