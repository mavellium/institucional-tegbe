"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

const QUESTIONS = [
  {
    question: "Preciso ter um faturamento mínimo para contratar?",
    answer: "Trabalhamos com escalas diferentes. Para a Consultoria e Agência (Marketing), recomendamos que você já tenha um produto validado e orçamento para tráfego (mínimo R$ 2k/mês). Se você está começando do absoluto zero, indicamos iniciar pelo TegPro Academy para validar sua oferta sem queimar caixa."
  },
  {
    question: "Em quanto tempo vejo o ROI?",
    answer: "Não vendemos milagres, vendemos engenharia. Em média, nossos clientes de E-commerce veem a maturação das campanhas entre 45 a 60 dias (período de aprendizado do algoritmo). Porém, com a implementação do CRM e CRO, melhorias na conversão costumam ser notadas já nas primeiras semanas."
  },
  {
    question: "Vocês atendem qual nicho?",
    answer: "Somos agnósticos de nicho, mas especialistas em modelo de negócio. Se você vende produtos físicos (E-commerce) ou serviços de alto ticket (Clínicas, Escritórios, B2B), nosso protocolo funciona. Não atendemos: Dropshipping genérico ou PLR de baixa qualidade."
  },
  {
    question: "Qual a diferença entre a Tegbe e uma agência comum?",
    answer: "A agência comum quer seus 'likes' e foca em métricas de vaidade. A Tegbe foca no seu LTV (Lifetime Value) e Lucro Líquido. Somos parceiros de negócio. Se você não lucra, a gente não renova. Simples assim."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-6 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-widest mb-4">
            <Icon icon="solar:question-circle-linear" />
            Clarificação Estratégica
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight">
            Dúvidas de quem <br className="md:hidden" /> joga sério.
          </h2>
          <p className="text-gray-500 text-lg">
            Sem letras miúdas. Transparência radical antes do aperto de mão.
          </p>
        </div>

        {/* ACCORDION */}
        <div className="space-y-4">
          {QUESTIONS.map((item, i) => {
            const isOpen = openIndex === i;
            
            return (
              <div 
                key={i} 
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