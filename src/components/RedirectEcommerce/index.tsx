"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// --- CONFIGURAÇÃO (JSON) ---
const ECOMMERCE_DATA = {
  theme: {
    bg_section: "#F5F5F7", // Apple Light Gray
    bg_card: "#FFFFFF",
    text_primary: "#1D1D1F",
    text_secondary: "#86868B",
    accent: "#0071E3" // Azul Apple padrão (ou use seu Dourado #FFD700 se preferir)
  },
  header: {
    tag: "Marketplace Solutions",
    title: "Sua loja. Em todo lugar.",
    subtitle: "A integração nativa com os maiores canais de venda do país. Transformamos sua operação em uma potência onipresente no Mercado Livre e Shopee."
  },
  bento_cards: [
    // CARD 1: PRINCIPAL (LAYOUT CORRIGIDO - FLEXBOX)
    {
      id: "card_main",
      colSpan: "md:col-span-2", // Ocupa 2 colunas
      type: "hero", // Tipo Hero (Texto + Imagem lado a lado)
      title: "Reputação Blindada.",
      description: "Não buscamos apenas vendas. Buscamos a medalha Platinum. Gestão estratégica para conquistar e manter o BuyBox.",
      image: "/ads-bg.png", // Sua imagem
      badge: "Conta Platinum"
    },
    // CARD 2: ADS (Texto + Stat)
    {
      id: "card_ads",
      colSpan: "md:col-span-1",
      type: "stat",
      title: "Ads Nativo.",
      description: "Algoritmos proprietários para dominar a primeira página.",
      icon: "solar:rocket-bold-duotone",
      stat: "+35% ROAS"
    },
    // CARD 3: LOGÍSTICA (Texto + Stat)
    {
      id: "card_logistics",
      colSpan: "md:col-span-1",
      type: "stat",
      title: "Logística Full.",
      description: "Integração completa com centros de distribuição.",
      icon: "solar:box-minimalistic-bold-duotone",
      stat: "24h Entrega"
    },
    // CARD 4: CTA (Ação)
    {
      id: "card_cta",
      colSpan: "md:col-span-2",
      type: "action",
      title: "4 Planos de Aceleração.",
      description: "Do setup inicial à escala agressiva. Escolha a velocidade do seu crescimento.",
      ctaText: "Ver Comparativo de Planos",
      href: "/ecommerce"
    }
  ]
};

export default function EcommerceBentoFixed() {
  const { theme, header, bento_cards } = ECOMMERCE_DATA;

  return (
    <section 
        className="py-32 px-6 font-sans relative"
        style={{ backgroundColor: theme.bg_section }}
    >
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16 max-w-3xl mx-auto space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: theme.text_secondary }}>
                {header.tag}
            </span>
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tight leading-tight" style={{ color: theme.text_primary }}>
                {header.title}
            </h2>
            <p className="text-xl font-medium leading-relaxed" style={{ color: theme.text_secondary }}>
                {header.subtitle}
            </p>
        </div>

        {/* --- BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(320px,auto)]">
            
            {bento_cards.map((card, index) => (
                <motion.div
                    key={card.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className={`
                        ${card.colSpan} 
                        rounded-[2rem] overflow-hidden 
                        bg-white shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all duration-500
                        flex flex-col
                    `}
                >
                    {/* --- LAYOUT TIPO 1: HERO (Texto Esq, Imagem Dir) --- */}
                    {card.type === "hero" && (
                        <div className="flex flex-col md:flex-row h-full">
                            {/* Coluna Texto */}
                            <div className="p-10 flex-1 flex flex-col justify-center relative z-10">
                                <h3 className="text-3xl font-semibold mb-4 tracking-tight" style={{ color: theme.text_primary }}>
                                    {card.title}
                                </h3>
                                <p className="text-lg font-medium leading-relaxed mb-6" style={{ color: theme.text_secondary }}>
                                    {card.description}
                                </p>
                                {card.badge && (
                                    <div className="inline-flex items-center gap-2 bg-[#F5F5F7] px-4 py-2 rounded-full w-fit">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-xs font-bold text-gray-500 uppercase">{card.badge}</span>
                                    </div>
                                )}
                            </div>
                            
                            {/* Coluna Imagem (Isolada, sem bugs de sobreposição) */}
                            <div className="relative h-64 md:h-auto md:w-1/2 bg-gray-50">
                                <Image
                                    src={card.image!}
                                    alt={card.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    )}

                    {/* --- LAYOUT TIPO 2: STAT (Icone + Texto) --- */}
                    {card.type === "stat" && (
                        <div className="p-10 h-full flex flex-col justify-between">
                            <div>
                                <div className="mb-6 w-12 h-12 rounded-full bg-[#F5F5F7] flex items-center justify-center text-[#1D1D1F]">
                                    <Icon icon={card.icon!} className="w-6 h-6" />
                                </div>
                                <h3 className="text-3xl font-semibold mb-3 tracking-tight" style={{ color: theme.text_primary }}>
                                    {card.title}
                                </h3>
                                <p className="text-lg font-medium leading-relaxed" style={{ color: theme.text_secondary }}>
                                    {card.description}
                                </p>
                            </div>
                            <div className="mt-6">
                                <span className="text-sm font-bold bg-[#F5F5F7] px-3 py-1 rounded-full text-[#1D1D1F]">
                                    {card.stat}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* --- LAYOUT TIPO 3: ACTION (Texto + Botão Grande) --- */}
                    {card.type === "action" && (
                        <div className="p-10 h-full flex flex-col justify-center items-start text-left">
                            <h3 className="text-3xl font-semibold mb-4 tracking-tight" style={{ color: theme.text_primary }}>
                                {card.title}
                            </h3>
                            <p className="text-lg font-medium leading-relaxed mb-8 max-w-lg" style={{ color: theme.text_secondary }}>
                                {card.description}
                            </p>
                            <Link 
                                href={card.href!} 
                                className="inline-flex items-center gap-3 bg-[#1D1D1F] text-white px-8 py-4 rounded-full text-sm font-bold hover:bg-black transition-colors"
                            >
                                {card.ctaText}
                                <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                            </Link>
                        </div>
                    )}

                </motion.div>
            ))}

        </div>
      </div>
    </section>
  );
}