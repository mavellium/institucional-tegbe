"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

import Heading from "@/components/ui/heading";
import Paragrafo from "@/components/ui/paragrafo";
import { Button } from "@/components/ui/button/button";
import { IButton } from "@/interface/button/IButton";
import { RichTextItem } from "@/types/richText.type";
import RichText from "@/components/ui/rich/richText";
import { sanitizeFormHtml } from "@/core/security";

export interface ComparisonFeature {
  label: string;
  competitor: string;
  us: string;
}

export interface ComparisonData {
  header: {
    badge: string;
    title: RichTextItem[];
    subtitle: RichTextItem[];
  };
  columns: {
    competitor: string;
    us: string;
  };
  features: ComparisonFeature[];
  button?: IButton;
}

interface Props {
  data: ComparisonData | null;
}

function mapVariant(v?: string): "default" | "outline" | "ghost" {
  if (v === "outline") return "outline";
  if (v === "ghost") return "ghost";
  return "default";
}

export default function ComparacaoConcorrentes({ data }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!data || !data.features) return null;

  const handleCtaClick = (e: React.MouseEvent) => {
    if (data.button?.action === "form") {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  const renderButton = () => {
    if (!data.button || !data.button.variant) return null;
    const variant = mapVariant(data.button.variant);

    if (data.button.action === "link") {
      return (
        <Button
          href={data.button.link}
          target={data.button.target}
          variant={variant}
          size="pill"
          className="w-full"
        >
          {data.button.icon && <Icon icon={data.button.icon} className="w-5 h-5" />}
          {data.button.label}
        </Button>
      );
    }

    return (
      <Button variant={variant} size="pill" className="w-full" onClick={handleCtaClick}>
        {data.button.icon && <Icon icon={data.button.icon} className="w-5 h-5" />}
        {data.button.label}
      </Button>
    );
  };

  return (
    <>
      <section className="py-20 md:py-24 bg-[#050505] relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[300px] md:h-[400px] bg-[#FFD700]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container px-4 max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-20">
            {data.header.badge && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="px-4 py-1.5 rounded-full border border-[#FFD700]/20 bg-[#FFD700]/[0.03] text-[#FFD700] text-[10px] font-bold tracking-[0.3em] uppercase mb-6 inline-block shadow-[0_0_20px_rgba(255,215,0,0.1)]"
              >
                {data.header.badge}
              </motion.div>
            )}
            <Heading size="lg" color="#fff" align="center" className="mb-4">
              <RichText content={data.header.title} />
            </Heading>
            <Paragrafo color="#A1A1AA" align="center" className="max-w-2xl mx-auto text-lg">
              <RichText content={data.header.subtitle} />
            </Paragrafo>
          </div>

          {/* DESKTOP VIEW */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hidden lg:block relative bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-4 shadow-2xl backdrop-blur-sm"
          >
            {/* Highlight for "Tegbe" Column */}
            <div className="absolute inset-y-4 right-4 w-[calc(33.33%-1rem)] bg-gradient-to-b from-[#FFD700]/[0.08] to-[#FFD700]/[0.02] border border-[#FFD700]/20 rounded-[2rem] shadow-[0_0_40px_rgba(255,215,0,0.05)] pointer-events-none z-0" />

            <div className="grid grid-cols-3 relative z-10">
              {/* Headers */}
              <div className="p-8" />

              {/* Competitor Header */}
              <div className="p-8 flex flex-col items-center text-center">
                <h3 className="text-xl font-semibold text-zinc-500">{data.columns.competitor}</h3>
              </div>

              {/* Us Header */}
              <div className="p-8 flex flex-col items-center text-center relative">
                <h3 className="text-2xl font-black text-white">{data.columns.us}</h3>
              </div>

              {/* Feature Rows */}
              {data.features.map((f, i) => (
                <React.Fragment key={i}>
                  <div className="flex items-center px-8 py-5 border-t border-white/5 text-sm font-medium text-zinc-400">
                    {f.label}
                  </div>
                  <div className="flex items-center gap-3 px-8 py-5 border-t border-white/5 text-zinc-500">
                    <Icon icon="ph:minus-circle" className="w-5 h-5 shrink-0 opacity-60" />
                    <span className="text-sm">{f.competitor}</span>
                  </div>
                  <div className="flex items-center gap-3 px-8 py-5 border-t border-[#FFD700]/10 text-white">
                    <Icon
                      icon="ph:check-circle-fill"
                      className="text-[#FFD700] w-5 h-5 shrink-0 drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]"
                    />
                    <span className="text-sm font-semibold">{f.us}</span>
                  </div>
                </React.Fragment>
              ))}

              {/* CTA Footer */}
              <div className="p-8" />
              <div className="p-8" />
              <div className="px-8 pb-8 pt-6 border-t border-[#FFD700]/10">{renderButton()}</div>
            </div>
          </motion.div>

          {/* MOBILE VIEW */}
          <div className="lg:hidden flex flex-col gap-6 max-w-md mx-auto">
            {/* Competitor Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden"
            >
              <div className="h-28 relative overflow-hidden bg-zinc-900">
                <h3 className="absolute bottom-4 left-6 text-xl font-bold text-zinc-500">
                  {data.columns.competitor}
                </h3>
              </div>
              <div className="p-5 space-y-3">
                {data.features.map((f, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-1 pb-3 border-b border-white/5 last:border-0 last:pb-0"
                  >
                    <span className="text-[10px] text-zinc-600 uppercase tracking-widest">
                      {f.label}
                    </span>
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
              <div className="h-28 relative overflow-hidden">
                <h3 className="absolute bottom-4 left-6 text-2xl font-black text-white">
                  {data.columns.us}
                </h3>
              </div>
              <div className="p-5 space-y-3">
                {data.features.map((f, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-1 pb-3 border-b border-[#FFD700]/10 last:border-0 last:pb-0"
                  >
                    <span className="text-[10px] text-[#FFD700]/60 uppercase tracking-widest">
                      {f.label}
                    </span>
                    <div className="flex items-center gap-2 text-white">
                      <Icon
                        icon="ph:check-circle-fill"
                        className="text-[#FFD700] w-4 h-4 shrink-0"
                      />
                      <span className="text-sm font-medium">{f.us}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-5 pt-2">{renderButton()}</div>
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
                    dangerouslySetInnerHTML={{ __html: sanitizeFormHtml(data.button.form_html) }}
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
