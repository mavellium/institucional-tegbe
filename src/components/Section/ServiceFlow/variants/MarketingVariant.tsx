"use client";

import { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { Icon } from '@iconify/react';
import Flywheel from '../../../ui/flywheel';
import { VariantContent } from '../types';

interface MarketingVariantProps {
  content: VariantContent;
}

export function MarketingVariant({ content }: MarketingVariantProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const header = content.header;
  const stats = content.stats || [];
  const cta = content.cta;

  const handleCtaClick = (e: React.MouseEvent) => {
    if (cta?.use_form) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <section className="relative min-h-screen bg-[#020202] overflow-hidden flex items-center justify-center py-24 px-6">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#E31B63]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#FF0F43]/10 rounded-full blur-[120px]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-[#E31B63]" />
                <span className="text-xs text-gray-200 font-bold tracking-widest uppercase">
                  {header.badge}
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tighter">
                {header.title}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0F43] to-[#E31B63]">
                  {header.highlighted}.
                </span>
              </h1>

              <p className="text-lg text-gray-400 max-w-lg leading-relaxed font-light">
                {header.description}
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-12 pt-4">
                {stats.map((stat, i) => (
                  <div key={i} className="relative">
                    <div className="text-4xl font-black text-white">{stat.value}</div>
                    <div className="text-[10px] text-[#E31B63] uppercase tracking-[0.2em] font-bold mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="pt-8">
                {cta?.use_form ? (
                  <button
                    onClick={handleCtaClick}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-[#FF0F43] to-[#E31B63] text-white px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:shadow-[0_0_40px_rgba(227,27,99,0.3)] transition-all hover:scale-105 cursor-pointer"
                  >
                    {cta.text}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                ) : (
                  <Link
                    href={cta?.url || '#'}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-[#FF0F43] to-[#E31B63] text-white px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:shadow-[0_0_40px_rgba(227,27,99,0.3)] transition-all hover:scale-105"
                  >
                    {cta?.text}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                )}
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-[#E31B63]/20 blur-[100px] rounded-full animate-pulse" />
              <Flywheel />
            </div>
          </div>
        </div>
      </section>

      {/* Modal com formulário */}
      {typeof document !== 'undefined' && createPortal(
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
                className="relative max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[200px]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <Icon icon="solar:close-circle-linear" className="w-5 h-5 text-gray-600" />
                </button>
                <div className="p-6">
                  {cta?.form_html ? (
                    <div dangerouslySetInnerHTML={{ __html: cta.form_html }} />
                  ) : (
                    <p className="text-gray-500">Formulário não disponível.</p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}