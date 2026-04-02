"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import Heading from "@/components/ui/heading";
import Paragrafo from "@/components/ui/paragrafo";
import { RichTextItem } from "@/types/richText.type";
import RichText from "@/components/ui/rich/richText";

export interface FaqItem {
  question: RichTextItem[];
  answer: RichTextItem[];
}

export interface FaqData {
  header: {
    badge?: string;
    title: RichTextItem[];
    subtitle: RichTextItem[];
  };
  questions: FaqItem[];
}

interface FaqProps {
  data: FaqData | null;
}

export default function FaqSection({ data }: FaqProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!data || !data.questions) return null;

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-24 bg-[#020202] relative font-sans border-t border-white/5">
      <div className="container px-4 md:px-6 max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          {data.header.badge && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="px-4 py-1.5 rounded-full border border-[#FFD700]/20 bg-[#FFD700]/[0.03] text-[#FFD700] text-[10px] font-bold tracking-[0.3em] uppercase mb-6 inline-block"
            >
              {data.header.badge}
            </motion.div>
          )}
          <Heading size="lg" color="#fff" align="center" className="mb-3">
            <RichText content={data.header.title} />
          </Heading>
          <Paragrafo color="#A1A1AA" align="center">
            <RichText content={data.header.subtitle} />
          </Paragrafo>
        </div>

        {/* Questions */}
        <div className="space-y-3">
          {data.questions.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-2xl border transition-colors duration-300 overflow-hidden cursor-pointer
                  ${isOpen ? "bg-[#0A0A0A] border-[#FFD700]/30" : "bg-transparent border-white/5 hover:border-white/10"}
                `}
                onClick={() => toggleIndex(index)}
              >
                <div className="p-5 md:p-6 flex justify-between items-center gap-4">
                  <Heading
                    size="sm"
                    as="h3"
                    color={isOpen ? "#fff" : "#9CA3AF"}
                    className="font-medium leading-snug"
                  >
                    <RichText content={item.question} />
                  </Heading>
                  <div
                    className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center border transition-all duration-300
                    ${isOpen ? "bg-[#FFD700] border-[#FFD700] rotate-45" : "border-white/10 bg-white/5"}
                  `}
                  >
                    <Icon
                      icon="ph:plus-bold"
                      className={`w-4 h-4 ${isOpen ? "text-black" : "text-gray-400"}`}
                    />
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
                      <div className="px-5 md:px-6 pb-5 md:pb-6 border-t border-white/5">
                        <Paragrafo color="#9CA3AF" className="pt-4 leading-relaxed">
                          <RichText content={item.answer} />
                        </Paragrafo>
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
