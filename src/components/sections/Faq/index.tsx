"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { resolveApiUrl } from "@/hooks/useApi";
import { motion, AnimatePresence } from "framer-motion";

// --- TIPAGEM DOS DADOS ---
export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqData {
  header: {
    title: string;
    subtitle: string;
  };
  questions: FaqItem[];
}

interface FaqProps {
  data?: FaqData | null;
  /** Ex.: `/api-tegbe/tegbe-institucional/json/faq-curso` */
  endpoint?: string;
}

export default function FaqSection({ data: dataProp, endpoint }: FaqProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [fetched, setFetched] = useState<FaqData | null>(null);

  useEffect(() => {
    if (!endpoint) {
      setFetched(null);
      return;
    }
    const url = resolveApiUrl(endpoint);
    if (!url) {
      setFetched(null);
      return;
    }
    let cancelled = false;
    fetch(url)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (cancelled || !json) return;
        setFetched(json as FaqData);
      })
      .catch(() => {
        if (!cancelled) setFetched(null);
      });
    return () => {
      cancelled = true;
    };
  }, [endpoint]);

  const data = fetched ?? dataProp ?? null;

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Segurança: Se não houver dados, não renderiza
  if (!data || !data.questions) return null;

  return (
    <section className="py-24 bg-[#020202] relative font-sans border-t border-white/5">
      <div className="container px-4 md:px-6 max-w-3xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">{data.header.title}</h2>
            <p className="text-gray-500">{data.header.subtitle}</p>
        </div>

        {/* QUESTIONS */}
        <div className="space-y-4">
            {data.questions.map((item, index) => {
                const isOpen = activeIndex === index;

                return (
                    <div 
                        key={index} 
                        className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer
                            ${isOpen ? 'bg-[#0A0A0A] border-[#FFD700]/30' : 'bg-transparent border-white/5 hover:border-white/10'}
                        `}
                        onClick={() => toggleIndex(index)}
                    >
                        <div className="p-6 flex justify-between items-center gap-4">
                            <h3 className={`font-medium text-lg ${isOpen ? 'text-white' : 'text-gray-400'}`}>
                                {item.question}
                            </h3>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300
                                ${isOpen ? 'bg-[#FFD700] border-[#FFD700] rotate-45' : 'border-white/10 bg-white/5'}
                            `}>
                                <Icon icon="ph:plus-bold" className={`w-4 h-4 ${isOpen ? 'text-black' : 'text-gray-400'}`} />
                            </div>
                        </div>

                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className="px-6 pb-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2 pt-4">
                                        {item.answer}
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