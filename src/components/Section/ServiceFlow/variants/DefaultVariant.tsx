"use client";

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceCard from '../ServiceCard';
import ServiceHeader from '../ServiceHeader';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { THEMES } from '../constants/themes';
import { VariantContent, ServiceFlowVariant } from '../types';

interface DefaultVariantProps {
  content: VariantContent;
  theme: typeof THEMES[keyof typeof THEMES];
  variant: ServiceFlowVariant;
  showFallbackWarning?: boolean;
}

export function DefaultVariant({ content, theme, variant, showFallbackWarning }: DefaultVariantProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ctaData = content.cta;
  const enhancedServices = content.services || [];

  const handleCtaClick = (e: React.MouseEvent) => {
    if (ctaData?.use_form) {
      e.preventDefault();
      setIsModalOpen(true);
    }
    // Caso contrário, o Link padrão segue o href normalmente
  };

  return (
    <>
      <section className={`flex py-24 relative`}>
        {showFallbackWarning && (
          <div className="absolute top-4 left-4 right-4 z-50">
            <div className="bg-yellow-500/10 border border-yellow-500/20 backdrop-blur-sm rounded-lg p-3 text-center">
              <p className="text-yellow-300 text-sm">
                ⚠️ Exibindo dados de demonstração. Conectando com a API...
              </p>
            </div>
          </div>
        )}

        {variant === 'sobre' && (
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gray-200/40 rounded-full blur-[100px]" />
          </div>
        )}

        <div className="max-w-6xl mx-auto relative z-10">
          <ServiceHeader content={content.header} theme={theme} variant={variant} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enhancedServices.map((service, index) => (
              <div
                key={service.id || index}
                className={`service-card ${service.wide ? "md:col-span-2" : "col-span-1"}`}
              >
                <ServiceCard service={service} theme={theme} variant={variant} />
              </div>
            ))}
          </div>

          {ctaData && (
            <div className="cta-element reveal-text flex flex-col items-center mt-12">
              {ctaData.use_form ? (
                <button
                  onClick={handleCtaClick}
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 bg-black text-white shadow-lg hover:shadow-2xl cursor-pointer"
                >
                  <span>{ctaData.text}</span>
                  <Icon icon="lucide:arrow-right" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              ) : (
                <Link
                  aria-label="Entre em contato pelo WhatsApp"
                  href={ctaData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 bg-black text-white shadow-lg hover:shadow-2xl"
                >
                  <span>{ctaData.text}</span>
                  <Icon icon="lucide:arrow-right" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              )}
              {ctaData.description && (
                <p className="mt-4 text-[10px] font-medium tracking-widest uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-current"></span>
                  {ctaData.description}
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Modal com formulário - renderizado no body via portal */}
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
                className="relative max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <Icon icon="solar:close-circle-linear" className="w-5 h-5 text-gray-600" />
                </button>
                <div
                  dangerouslySetInnerHTML={{ __html: ctaData?.form_html || '' }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}