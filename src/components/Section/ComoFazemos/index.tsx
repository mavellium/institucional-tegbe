"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

// Interfaces
interface Cta {
  href: string;
  icon: string;
  text: string;
  form_id: string;
  use_form: boolean;
  form_html: string;
}

interface Step {
  id: string;
  desc: string;
  icon: string;
  label: string;
  title: string;
}

interface SectionHeader {
  manifesto: string;
  title_main: string;
  title_highlight: string;
}

interface MethodologyData {
  section_header: SectionHeader;
  steps: Step[];
  cta: Cta;
}

export default function MethodSectionPremium() {
  const [data, setData] = useState<MethodologyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch dos dados
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/api-tegbe/tegbe-institucional/como-fazemos');
        const result = await response.json();
        if (result.methodology) setData(result.methodology);
      } catch (error) {
        console.error("Mavellium Engine - Erro ao carregar Metodologia:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading || !data) return null;

  const handleCtaClick = () => {
    if (data.cta.use_form) setIsModalOpen(true);
    else window.location.href = data.cta.href;
  };

  return (
    <section className="py-32 px-6 bg-white relative overflow-hidden font-sans">
      {/* Fundo decorativo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-70" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-yellow-100/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gray-100/60 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Cabeçalho */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 mb-28">
          <div className="max-w-3xl relative">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              className="h-1 bg-yellow-400 mb-6"
            />
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight leading-[1.05]">
              {data.section_header.title_main}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-400">
                {data.section_header.title_highlight}
              </span>
            </h2>
          </div>
          <div className="max-w-md text-center lg:text-left">
            <p className="text-gray-500 text-lg font-medium leading-relaxed">
              {data.section_header.manifesto}
            </p>
          </div>
        </div>

        {/* Grid de passos */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          <div className="hidden md:block absolute top-[4.5rem] left-[16%] right-[16%] h-[2px] bg-gray-100 z-0">
            <motion.div
              className="h-full w-1/3 bg-gradient-to-r from-transparent via-yellow-300 to-transparent blur-[1px]"
              animate={{ x: ["-27%", "220%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
          {data.steps.map((step, index) => (
            <StepCard key={step.id} data={step} index={index} totalSteps={data.steps.length} />
          ))}
        </div>

        {/* Botão CTA */}
        <div className="mt-20 flex justify-center">
          <motion.button
            onClick={handleCtaClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-3 px-8 py-4 bg-[#0A0A0A] text-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-yellow-400 hover:text-black hover:shadow-xl hover:shadow-yellow-400/20 transition-all duration-300 cursor-pointer border-none"
          >
            <span>{data.cta.text}</span>
            <Icon icon={data.cta.icon} className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>

      {/* Modal com portal para o body */}
      {createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="relative max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Botão fechar */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <Icon icon="solar:close-circle-linear" className="w-5 h-5 text-gray-600" />
                </button>

                {/* Formulário injetado */}
                <div
                  className="p-6"
                  dangerouslySetInnerHTML={{ __html: data.cta.form_html }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}

// Componente StepCard (inalterado)
function StepCard({ data, index, totalSteps }: { data: Step; index: number; totalSteps: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.2, ease: "circOut" }}
      viewport={{ once: true }}
      className="relative group"
    >
      {/* Versão mobile */}
      <div className="md:hidden">
        <div className="flex items-start gap-6 px-4">
          <div className="flex flex-col items-center relative">
            {index > 0 && (
              <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1px] h-50 bg-gradient-to-b from-transparent via-yellow-300/40 to-yellow-400" />
            )}
            <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.05)] flex items-center justify-center relative z-20 group-hover:border-yellow-400 group-hover:shadow-[0_12px_30px_-10px_rgba(234,179,8,0.2)] transition-all duration-500">
              <Icon icon={data.icon} className="w-7 h-7 text-gray-400 group-hover:text-yellow-600 transition-colors duration-300" />
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold font-mono border-2 border-white group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                {data.id}
              </div>
            </div>
            {index < totalSteps - 1 && (
              <>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[1px] h-8 bg-gradient-to-b from-yellow-400 via-yellow-300/40 to-transparent" />
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border border-yellow-400 shadow-md shadow-yellow-400/30 z-10" />
              </>
            )}
          </div>
          <div className="flex-1 pt-2">
            <div className="mb-3">
              <span className="px-3 py-1 rounded-full bg-gray-50 border border-gray-100 text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-yellow-600 group-hover:bg-yellow-50 group-hover:border-yellow-100 transition-all duration-300">
                // {data.label}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors duration-300">
              {data.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">{data.desc}</p>
            <div className="mt-4 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          </div>
        </div>
      </div>

      {/* Versão desktop */}
      <div className="hidden md:block px-6">
        <div className="relative flex justify-center mb-10 z-10">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-24 h-24 rounded-[2rem] bg-white border border-gray-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] flex items-center justify-center relative z-20 group-hover:border-yellow-400 group-hover:shadow-[0_20px_40px_-15px_rgba(234,179,8,0.2)] transition-all duration-500"
          >
            <Icon icon={data.icon} className="w-10 h-10 text-gray-400 group-hover:text-yellow-600 transition-colors duration-300" />
            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold font-mono border-4 border-white group-hover:bg-yellow-400 group-hover:text-black transition-colors">
              {data.id}
            </div>
          </motion.div>
        </div>
        <div className="text-center relative">
          <div className="inline-block mb-3">
            <span className="px-3 py-1 rounded-full bg-gray-50 border border-gray-100 text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-yellow-600 group-hover:bg-yellow-50 group-hover:border-yellow-100 transition-all duration-300">
              // {data.label}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors duration-300">
            {data.title}
          </h3>
          <p className="text-gray-500 text-base leading-relaxed px-2 lg:px-6">{data.desc}</p>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-12 h-1 bg-gray-100 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <motion.div
              className="h-full bg-yellow-400"
              initial={{ x: "-100%" }}
              whileInView={{ x: "0%" }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
            />
          </div>
        </div>
        {index !== 2 && (
          <div className="hidden md:block absolute right-0 top-1/4 bottom-0 w-[1px] bg-gradient-to-b from-gray-100 via-transparent to-transparent opacity-0 lg:opacity-100" />
        )}
      </div>
    </motion.div>
  );
}