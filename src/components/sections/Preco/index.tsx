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
import { IImage } from "@/interface/imagem/IImage";
import { RichTextItem } from "@/types/richText.type";
import RichText from "@/components/ui/rich/richText";
import { sanitizeFormHtml } from "@/core/security";

// --- TIPAGENS ---
export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  price: string;
  currency: string;
  period: string;
  installments: string;
  description: string;
  features: PricingFeature[];
  button: IButton;
  highlight: boolean;
  coverImage?: IImage;
}

export interface PricingData {
  ativo: boolean;
  header: {
    badge: string;
    title: RichTextItem[];
    subtitle: RichTextItem[];
  };
  plans: PricingPlan[];
  guarantee: {
    icon: string;
    title: string;
    text: string;
  };
}

function mapVariant(v?: string | null): "default" | "outline" | "ghost" {
  if (v === "outline") return "outline";
  if (v === "ghost") return "ghost";
  return "default";
}

export default function Preco({ data }: { data: PricingData | null }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFormHtml, setActiveFormHtml] = useState<string | null>(null);

  if (!data || !data.plans || !data.ativo) return null;

  const handleCtaClick = (e: React.MouseEvent, button: IButton) => {
    if (button.action === "form" && button.form_html) {
      e.preventDefault();
      setActiveFormHtml(button.form_html);
      setIsModalOpen(true);
    }
  };

  const renderButton = (plan: PricingPlan) => {
    const variant = mapVariant(plan.button.variant);
    if (plan.button.action === "link") {
      return (
        <Button
          href={plan.button.link}
          target={plan.button.target}
          variant={variant}
          size="pill"
          className="w-full"
        >
          {plan.button.icon && <Icon icon={plan.button.icon} className="w-5 h-5" />}
          {plan.button.label}
        </Button>
      );
    }
    return (
      <Button
        variant={variant}
        size="pill"
        className="w-full"
        onClick={(e) => handleCtaClick(e, plan.button)}
      >
        {plan.button.icon && <Icon icon={plan.button.icon} className="w-5 h-5" />}
        {plan.button.label}
      </Button>
    );
  };

  return (
    <>
      <section className="py-24 bg-[#050505] relative overflow-hidden" id="planos">
        {/* Efeitos de Fundo */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#FFD700]/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="container px-4 max-w-7xl mx-auto relative z-10">
          {/* Cabeçalho */}
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
              <RichText content={data.header.title} />
            </Heading>
            <Paragrafo color="#A1A1AA" align="center" className="max-w-2xl mx-auto text-lg">
              <RichText content={data.header.subtitle} />
            </Paragrafo>
          </div>

          {/* Grid de Planos */}
          {/* items-stretch + py-6 garantem altura uniforme e espaço para o card escalado */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch py-6 max-w-6xl mx-auto">
            {data.plans.map((plan, index) => {
              const isHighlight = plan.highlight;

              return (
                // Wrapper relativo para o badge flutuar sem ser cortado pelo overflow-hidden do card
                <div key={plan.id} className="relative flex flex-col">
                  {/* Badge fora do card para não ser clipado pelo overflow-hidden */}
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black text-xs font-black px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wider whitespace-nowrap">
                      {plan.badge}
                    </div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative flex flex-col flex-1 pb-8 px-8 rounded-[2rem] transition-all duration-300 group overflow-hidden ${
                      isHighlight
                        ? "bg-[#111] border border-[#FFD700]/40 shadow-[0_0_40px_rgba(255,215,0,0.1)] md:scale-105 z-20"
                        : "bg-[#0A0A0A] border border-white/10 z-10 hover:border-white/20"
                    }`}
                  >
                    {/* Imagem de Capa */}
                    {plan.coverImage?.src ? (
                      <div className="relative aspect-[16/9] w-[calc(100%+4rem)] -ml-8 mb-8 overflow-hidden border-b border-white/5">
                        <Image
                          src={plan.coverImage.src}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          alt={plan.coverImage.alt || plan.name}
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${isHighlight ? "from-[#111]" : "from-[#0A0A0A]"}`}
                        />
                      </div>
                    ) : (
                      <div className={`pt-8 ${plan.badge ? "pt-10" : ""}`} />
                    )}

                    {/* Conteúdo do card */}
                    <div className="flex flex-col flex-1">
                      {/* Info do Plano */}
                      <div className="mb-6">
                        <Heading size="sm" color="#fff" className="mb-2">
                          {plan.name}
                        </Heading>
                        <Paragrafo color="#71717A" className="text-sm">
                          {plan.description}
                        </Paragrafo>
                      </div>

                      {/* Preço */}
                      <div className="mb-8">
                        <div className="flex items-start gap-1">
                          <span className="text-xl font-bold text-zinc-500 mt-2">
                            {plan.currency}
                          </span>
                          <span className="text-5xl lg:text-6xl font-black text-white tracking-tighter">
                            {plan.price}
                          </span>
                        </div>
                        <div className="flex flex-col mt-2">
                          <span className="text-sm text-zinc-500">{plan.period}</span>
                          {plan.installments && (
                            <span className="text-[#FFD700] font-medium text-sm mt-1">
                              {plan.installments}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Botão */}
                      <div className="mb-8">{renderButton(plan)}</div>

                      {/* Features — mt-auto empurra para o fundo do card quando há espaço */}
                      <div className="mt-auto space-y-4">
                        {plan.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className={`flex items-start gap-3 ${feature.included ? "text-zinc-200" : "text-zinc-600"}`}
                          >
                            <Icon
                              icon={feature.included ? "ph:check-circle-fill" : "ph:minus-circle"}
                              className={`w-5 h-5 flex-shrink-0 mt-0.5 ${feature.included ? "text-[#FFD700]" : "text-zinc-700"}`}
                            />
                            <span
                              className={`text-sm ${feature.included ? "font-medium" : "line-through opacity-60"}`}
                            >
                              {feature.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Garantia */}
          {data.guarantee && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 max-w-4xl mx-auto bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-8 backdrop-blur-sm"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#FFD700]/10 flex items-center justify-center flex-shrink-0 border border-[#FFD700]/20">
                <Icon
                  icon={data.guarantee.icon || "ph:shield-check-fill"}
                  className="w-8 h-8 text-[#FFD700]"
                />
              </div>
              <div className="text-center md:text-left">
                <Heading size="sm" color="#fff" className="mb-2">
                  {data.guarantee.title}
                </Heading>
                <Paragrafo color="#71717A" className="text-sm leading-relaxed">
                  {data.guarantee.text}
                </Paragrafo>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Modal */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isModalOpen && activeFormHtml && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                onClick={() => setIsModalOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.95, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 20 }}
                  className="bg-[#0A0A0A] border border-[#FFD700]/20 shadow-2xl p-6 md:p-8 rounded-2xl max-w-lg w-full relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors bg-white/5 p-2 rounded-full"
                  >
                    <Icon icon="ph:x-bold" className="w-4 h-4" />
                  </button>
                  <div
                    className="prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: sanitizeFormHtml(activeFormHtml) }}
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
