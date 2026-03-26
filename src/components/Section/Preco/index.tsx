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
  // Nova propriedade adicionada
  coverImage?: {
    url: string;
    alt?: string;
  };
}

export interface PricingData {
  ativo: boolean,
  header: {
    badge: string;
    title: string;
    subtitle: string;
  };
  plans: PricingPlan[];
  guarantee: {
    icon: string;
    title: string;
    text: string;
  };
}

export default function Preco() {
  const { data, loading } = useApi<PricingData>("preco-formacoes");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFormHtml, setActiveFormHtml] = useState<string | null>(null);


  if (loading || !data || !data.plans || !data.ativo) return null;

  const handleCtaClick = (e: React.MouseEvent, button: IButton) => {
    if (button.action === "form" && button.form_html) {
      e.preventDefault();
      setActiveFormHtml(button.form_html);
      setIsModalOpen(true);
    }
  };

  const buttonVariants = {
    default: "bg-[#FFD700] hover:bg-[#F2C900] text-black font-bold shadow-[0_0_20px_rgba(255,215,0,0.15)] hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]",
    outline: "border-2 border-[#FFD700]/50 text-[#FFD700] hover:bg-[#FFD700] hover:text-black",
    gradient: "bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:scale-[1.02] text-black shadow-xl",
    ghost: "text-[#FFD700] hover:bg-[#FFD700]/10",
  };

  return (
    <>
      <section className="py-24 bg-[#050505] relative overflow-hidden" id="planos">
        {/* Efeitos de Fundo */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#FFD700]/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

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
              {data.header.title}
            </Heading>
            <Paragrafo color="#A1A1AA" align="center" className="max-w-2xl mx-auto text-lg">
              {data.header.subtitle}
            </Paragrafo>
          </div>

          {/* Grid de Planos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
            {data.plans.map((plan, index) => {
              const variantClass = buttonVariants[plan.button.variant as keyof typeof buttonVariants] ?? buttonVariants.default;
              const isHighlight = plan.highlight;

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  // Adicionado 'group' e ajustado padding (pb-8 px-8) para acomodar a imagem no topo
                  className={`relative flex flex-col pb-8 px-8 rounded-[2rem] transition-all duration-300 group overflow-hidden ${
                    isHighlight 
                      ? "bg-[#111] border border-[#FFD700]/40 shadow-[0_0_40px_rgba(255,215,0,0.1)] md:scale-105 z-20" 
                      : "bg-[#0A0A0A] border border-white/10 z-10 hover:border-white/20"
                  }`}
                >
                  {/* Badge de Destaque - Aumentado z-index para ficar sobre a imagem */}
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black text-xs font-black px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wider z-30">
                      {plan.badge}
                    </div>
                  )}

                  {/* --- NOVA SEÇÃO: Imagem de Capa do Card --- */}
                  {plan.coverImage?.url && (
                    <div className="relative aspect-[16/9] w-[calc(100%+4rem)] -ml-8 mb-8 overflow-hidden border-b border-white/5 z-10">
                      <img 
                        src={plan.coverImage.url} 
                        alt={plan.coverImage.alt || plan.name} 
                        // Efeito de zoom suave no hover do card
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Gradiente sutil na base da imagem para transição */}
                      <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${isHighlight ? 'from-[#111]' : 'from-[#0A0A0A]'}`} />
                    </div>
                  )}
                  {/* Espaçador caso NÃO haja imagem para manter padding superior */}
                  {!plan.coverImage?.url && <div className="pt-8" />}


                  {/* Contêiner do Conteúdo - z-20 para garantir que fique sobre o gradiente da imagem se necessário */}
                  <div className="relative z-20 flex flex-col flex-1">
                    {/* Info do Plano */}
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                      <p className="text-sm text-zinc-400 min-h-[40px]">{plan.description}</p>
                    </div>

                    {/* Preço */}
                    <div className="mb-8">
                      <div className="flex items-start gap-1">
                        <span className="text-xl font-bold text-zinc-500 mt-2">{plan.currency}</span>
                        <span className="text-5xl lg:text-6xl font-black text-white tracking-tighter">{plan.price}</span>
                      </div>
                      <div className="flex flex-col mt-2">
                        <span className="text-sm text-zinc-500">{plan.period}</span>
                        {plan.installments && (
                          <span className="text-[#FFD700] font-medium text-sm mt-1">{plan.installments}</span>
                        )}
                      </div>
                    </div>

                    {/* Botão Dinâmico */}
                    <div className="mb-8 mt-auto"> {/* mt-auto para empurrar botão e features para baixo */}
                      {plan.button.action === "link" ? (
                        <Link 
                          href={plan.button.link || "#"} 
                          className={`w-full py-4 rounded-xl text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 ${variantClass}`}
                        >
                          {plan.button.icon && <Icon icon={plan.button.icon} className="w-5 h-5" />}
                          {plan.button.label}
                        </Link>
                      ) : (
                        <button 
                          onClick={(e) => handleCtaClick(e, plan.button)} 
                          className={`w-full py-4 rounded-xl text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 ${variantClass}`}
                        >
                          {plan.button.icon && <Icon icon={plan.button.icon} className="w-5 h-5" />}
                          {plan.button.label}
                        </button>
                      )}
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className={`flex items-start gap-3 ${feature.included ? 'text-zinc-200' : 'text-zinc-600'}`}>
                          <Icon 
                            icon={feature.included ? "ph:check-circle-fill" : "ph:minus-circle"} 
                            className={`w-5 h-5 flex-shrink-0 mt-0.5 ${feature.included ? 'text-[#FFD700]' : 'text-zinc-700'}`} 
                          />
                          <span className={`text-sm ${feature.included ? 'font-medium' : 'line-through opacity-60'}`}>
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
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
                <Icon icon={data.guarantee.icon || "ph:shield-check-fill"} className="w-8 h-8 text-[#FFD700]" />
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-xl font-bold text-white mb-2">{data.guarantee.title}</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">{data.guarantee.text}</p>
              </div>
            </motion.div>
          )}

        </div>
      </section>

      {/* Modal para Planos com action "form" (ex: Mentoria) */}
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
                    dangerouslySetInnerHTML={{ __html: activeFormHtml }}
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