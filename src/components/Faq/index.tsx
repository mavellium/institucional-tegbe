"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import config from "@/json/Faq/config.json";

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-[#020202] relative font-sans border-t border-white/5">
      <div className="container px-4 md:px-6 max-w-3xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">{config.header.title}</h2>
            <p className="text-gray-500">{config.header.subtitle}</p>
        </div>

        {/* QUESTIONS */}
        <div className="space-y-4">
            {config.questions.map((item, index) => {
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