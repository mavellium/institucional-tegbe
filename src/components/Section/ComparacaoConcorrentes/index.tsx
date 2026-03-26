"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { createPortal } from "react-dom";

import { useApi } from "@/hooks/useApi";
import Heading from "@/components/ui/heading";
import Paragrafo from "@/components/ui/paragrafo";
import { IButton } from "@/interface/button/IButton";

export interface ComparisonFeature {
  label: string;
  competitor: string;
  us: string;
}

export interface ComparisonData {
  header: {
    badge: string;
    title: string;
    subtitle: string;
  };
  columns: {
    competitor: string;
    us: string;
    competitorImage?: string;
    usImage?: string;
  };
  features: ComparisonFeature[];
  button?: IButton;
}

export default function ComparacaoConcorrentes() {
  const { data, loading } = useApi<ComparisonData>("comparison");
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading || !data || !data.features) return null;

  const handleCtaClick = (e: React.MouseEvent) => {
    if (data.button?.action === "form") {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  const buttonVariants = {
    default: "bg-[#FFD700] hover:bg-[#F2C900] text-black font-bold shadow-[0_0_20px_rgba(255,215,0,0.15)] hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]",
    outline: "border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black",
    gradient: "bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:scale-[1.02] text-black shadow-xl",
    ghost: "text-[#FFD700] hover:bg-[#FFD700]/10",
  };

  const renderButton = () => {
    if (!data.button) return null;
    const variantClass = buttonVariants[data.button.variant as keyof typeof buttonVariants] ?? buttonVariants.default;
    const classes = `w-full py-4 rounded-xl text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 ${variantClass}`;

    const content = (
      <>
        {data.button.icon && <Icon icon={data.button.icon} className="w-5 h-5" />}
        {data.button.label}
      </>
    );

    return data.button.action === "link" ? (
      <Link href={data.button.link || "#"} target={data.button.target || "_self"} className={classes}>
        {content}
      </Link>
    ) : (
      <button onClick={handleCtaClick} className={classes}>{content}</button>
    );
  };

  return (
    <>
      <section className="py-24 bg-[#050505] relative overflow-hidden">
        {/* Background Gradients & Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FFD700]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

        <div className="container px-4 max-w-6xl mx-auto relative z-10">
          
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="px-4 py-1.5 rounded-full border border-[#FFD700]/20 bg-[#FFD700]/[0.03] text-[#FFD700] text-[10px] font-bold tracking-[0.3em] uppercase mb-6 inline-block shadow-[0_0_20px_rgba(255,215,0,0.1)]"
            >
              {data.header.badge}
            </motion.div>
            <Heading size="lg" color="#fff" align="center" className="mb-4">
              {data.header.title}
            </Heading>
            <Paragrafo color="#A1A1AA" align="center" className="max-w-2xl mx-auto text-lg">
              {data.header.subtitle}
            </Paragrafo>
          </div>

          {/* =========================================
              DESKTOP VIEW (Unified Glassmorphic Table)
              ========================================= */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hidden lg:block relative bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-4 shadow-2xl backdrop-blur-sm"
          >
            {/* Structural Background Highlight for "Tegbe" Column */}
            <div className="absolute inset-y-4 right-4 w-[calc(33.33%-1rem)] bg-gradient-to-b from-[#FFD700]/[0.08] to-[#FFD700]/[0.02] border border-[#FFD700]/20 rounded-[2rem] shadow-[0_0_40px_rgba(255,215,0,0.05)] pointer-events-none z-0" />

            <div className="grid grid-cols-3 relative z-10">
              
              {/* --- HEADERS --- */}
              <div className="p-8" /> {/* Empty Label Header */}
              
              {/* Competitor Header */}
              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-full h-28 rounded-2xl overflow-hidden mb-5 relative bg-zinc-900 border border-white/5">
                  <img src={data.columns.competitorImage || "https://images.unsplash.com/photo-1551288049-bbbda5366392?q=80&w=500"} className="w-full h-full object-cover grayscale opacity-30" alt="Competitor" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-500">{data.columns.competitor}</h3>
              </div>

              {/* Us Header */}
              <div className="p-8 flex flex-col items-center text-center relative">
                <div className="absolute top-4 right-4 bg-[#FFD700] text-black text-[10px] font-black px-3 py-1 rounded-md shadow-lg z-20 uppercase tracking-wider">
                  Sua Escolha
                </div>
                <div className="w-full h-28 rounded-2xl overflow-hidden mb-5 relative border border-[#FFD700]/30 shadow-[0_0_20px_rgba(255,215,0,0.15)]">
                  <img src={data.columns.usImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500"} className="w-full h-full object-cover" alt="Tegbe" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                </div>
                <h3 className="text-2xl font-black text-white">{data.columns.us}</h3>
              </div>

              {/* --- FEATURES ROWS --- */}
              {data.features.map((f, i) => (
                <React.Fragment key={i}>
                  {/* Label */}
                  <div className="flex items-center px-8 py-5 border-t border-white/5 text-sm font-medium text-zinc-400">
                    {f.label}
                  </div>
                  {/* Competitor Value */}
                  <div className="flex items-center gap-3 px-8 py-5 border-t border-white/5 text-zinc-500">
                    <Icon icon="ph:minus-circle" className="w-5 h-5 shrink-0 opacity-60" />
                    <span className="text-sm">{f.competitor}</span>
                  </div>
                  {/* Us Value */}
                  <div className="flex items-center gap-3 px-8 py-5 border-t border-[#FFD700]/10 text-white">
                    <Icon icon="ph:check-circle-fill" className="text-[#FFD700] w-5 h-5 shrink-0 drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]" />
                    <span className="text-sm font-semibold">{f.us}</span>
                  </div>
                </React.Fragment>
              ))}

              {/* --- CTA FOOTER --- */}
              <div className="p-8" />
              <div className="p-8" />
              <div className="px-8 pb-8 pt-6 border-t border-[#FFD700]/10">
                {renderButton()}
              </div>
            </div>
          </motion.div>

          {/* =========================================
              MOBILE VIEW (Stacked Cards)
              ========================================= */}
          <div className="lg:hidden flex flex-col gap-8 max-w-md mx-auto">
            
            {/* Competitor Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden"
            >
              <div className="h-32 relative overflow-hidden">
                <img src={data.columns.competitorImage || "https://images.unsplash.com/photo-1551288049-bbbda5366392?q=80&w=500"} className="w-full h-full object-cover grayscale opacity-30" alt="Competitor" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
                <h3 className="absolute bottom-4 left-6 text-xl font-bold text-zinc-500">{data.columns.competitor}</h3>
              </div>
              <div className="p-6 space-y-4">
                {data.features.map((f, i) => (
                  <div key={i} className="flex flex-col gap-1 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                    <span className="text-[10px] text-zinc-600 uppercase tracking-widest">{f.label}</span>
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Icon icon="ph:minus-circle" className="w-4 h-4 shrink-0" />
                      <span className="text-sm">{f.competitor}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Us Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#111] border border-[#FFD700]/30 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.1)] relative"
            >
              <div className="absolute top-4 right-4 bg-[#FFD700] text-black text-[10px] font-black px-3 py-1 rounded-md z-20 uppercase tracking-wider">
                Recomendado
              </div>
              <div className="h-32 relative overflow-hidden">
                <img src={data.columns.usImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500"} className="w-full h-full object-cover opacity-80" alt="Tegbe" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
                <h3 className="absolute bottom-4 left-6 text-2xl font-black text-white">{data.columns.us}</h3>
              </div>
              <div className="p-6 space-y-4">
                {data.features.map((f, i) => (
                  <div key={i} className="flex flex-col gap-1 pb-4 border-b border-[#FFD700]/10 last:border-0 last:pb-0">
                    <span className="text-[10px] text-[#FFD700]/60 uppercase tracking-widest">{f.label}</span>
                    <div className="flex items-center gap-2 text-white">
                      <Icon icon="ph:check-circle-fill" className="text-[#FFD700] w-4 h-4 shrink-0" />
                      <span className="text-sm font-medium">{f.us}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 pt-2">
                {renderButton()}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* MODAL FORM */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {data.button?.action === "form" && isModalOpen && data.button.form_html && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                onClick={() => setIsModalOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.95, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 20 }}
                  className="bg-zinc-950 border border-white/10 shadow-2xl p-6 rounded-2xl max-w-lg w-full relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                  >
                    <Icon icon="ph:x-bold" className="w-5 h-5" />
                  </button>
                  <div
                    className="prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: data.button.form_html }}
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