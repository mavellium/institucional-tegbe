"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

import Textura from "@/components/ui/textura";
import { RichTextItem } from "@/types/richText.type";
import RichText from "@/components/ui/rich/richText";

// ================== TIPAGEM ==================
interface FAQItem {
  id: string | number;
  question: RichTextItem[];
  answer: RichTextItem[];
  order?: number;
}

interface FAQData {
  faq: {
    header: {
      tag: RichTextItem[];
      title: RichTextItem[];
      subtitle: RichTextItem[];
      tag_icon: string;
    };
    questions_and_answers: FAQItem[];
  };
}

// ================== COMPONENT ==================
export default function FaqSection({ data }: { data: FAQData | null }) {
  const faq = data?.faq;

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faq || !faq.questions_and_answers?.length) return null;

  const { header, questions_and_answers } = faq;

  return (
    <section className="relative py-32 bg-[#F8F9FA] selection:bg-neutral-900 selection:text-white">
      <Textura opacity={0.02} className="absolute inset-0 pointer-events-none mix-blend-multiply" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200 mb-6 shadow-sm"
          >
            <Icon
              icon={header.tag_icon || "solar:question-circle-linear"}
              className="w-4 h-4 text-neutral-500"
            />
            <span className="text-[11px] font-bold uppercase tracking-widest mt-[1px]">
              <RichText content={header.tag} />
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-900 mb-6 leading-tight">
            <RichText content={header.title} />
          </h2>

          <p className="text-lg md:text-xl text-neutral-500 font-normal max-w-2xl leading-relaxed">
            <RichText content={header.subtitle} />
          </p>
        </div>

        {/* ACCORDION */}
        <div className="space-y-4">
          {questions_and_answers.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`
                  group relative overflow-hidden rounded-[1.5rem] transition-all duration-500 ease-out
                  ${
                    isOpen
                      ? "bg-white border border-neutral-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
                      : "bg-white border border-neutral-100 shadow-sm hover:shadow-md hover:border-neutral-200 hover:-translate-y-0.5"
                  }
                `}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                >
                  <span
                    className={`text-lg md:text-xl font-semibold tracking-tight transition-colors duration-300 pr-6 ${
                      isOpen ? "text-neutral-950" : "text-neutral-600 group-hover:text-neutral-900"
                    }`}
                  >
                    <RichText content={item.question} />
                  </span>

                  <div
                    className={`
                    flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500
                    ${
                      isOpen
                        ? "bg-neutral-950 text-white rotate-180 scale-105"
                        : "bg-neutral-50 border border-neutral-100 text-neutral-400 group-hover:bg-neutral-100 group-hover:text-neutral-900"
                    }
                  `}
                  >
                    <Icon icon="solar:alt-arrow-down-linear" className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <div className="px-6 md:px-8 pb-8 pt-0">
                        <p className="text-neutral-500 leading-relaxed text-base md:text-lg max-w-3xl">
                          <RichText content={item.answer} />
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
