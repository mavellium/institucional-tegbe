"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

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
    <section className="py-24 px-6 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER DINÂMICO */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-widest mb-4">
            <Icon icon={data.header.tag_icon || "solar:question-circle-linear"} />
            {data.header.tag}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight">
            {data.header.title.split('.').map((part, i) => (
                <span key={i}>{part}{part && '.'}{i === 0 && <br className="md:hidden" />}</span>
            ))}
          </h2>
          <p className="text-gray-500 text-lg">
            {data.header.subtitle}
          </p>
        </div>

        {/* ACCORDION (LAYOUT IDÊNTICO AO ENVIADO) */}
        <div className="space-y-4">
          {data.questions_and_answers.map((item, i) => {
            const isOpen = openIndex === i;
            
            return (
              <div 
                key={item.id} 
                className={`
                  group rounded-2xl border transition-all duration-300 overflow-hidden
                  ${isOpen ? 'bg-gray-50 border-gray-200 shadow-sm' : 'bg-white border-transparent hover:border-gray-200'}
                `}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`text-lg md:text-xl font-medium transition-colors ${isOpen ? 'text-black' : 'text-gray-500 group-hover:text-black'}`}>
                    {item.question}
                  </span>
                  
                  {/* Ícone Animado */}
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300
                    ${isOpen ? 'bg-black border-black text-white rotate-180' : 'bg-white border-gray-200 text-gray-400 group-hover:border-gray-400'}
                  `}>
                    <Icon icon="solar:alt-arrow-down-linear" className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-8 pt-0">
                        <p className="text-gray-600 leading-relaxed text-base border-l-2 border-black/10 pl-4">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}