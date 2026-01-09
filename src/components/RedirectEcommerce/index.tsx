"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// --- CONFIGURAÇÃO SUAVE (ML SOFT DNA) ---
const ECOMMERCE_DATA = {
  theme: {
    bg_section: "#FAFAFA",
    bg_card: "#FFFFFF",
    text_primary: "#2D2D2D",
    text_secondary: "#6E6E73",
    ml_yellow_soft: "#FFF9C4", // Amarelo pastel para fundos
    ml_yellow_solid: "#FFE600", // Amarelo ML para ícones
  },
  header: {
    tag: "Marketplace Solutions",
    title: "Sua loja. Em todo lugar.",
    subtitle: "A integração nativa com os maiores canais de venda do país. Transformamos sua operação em uma potência onipresente no Mercado Livre e Shopee."
  },
  bento_cards: [
    {
      id: "card_main",
      colSpan: "md:col-span-2",
      type: "hero",
      title: "Reputação Blindada.",
      description: "Não buscamos apenas vendas. Buscamos a medalha Platinum. Gestão estratégica para conquistar e manter o BuyBox.",
      image: "/ads-bg.png",
      badge: "Vendedor Lider Platinum"
    },
    {
      id: "card_ads",
      colSpan: "md:col-span-1",
      type: "stat",
      title: "Product Ads.",
      description: "Algoritmos proprietários para dominar a primeira página e vencer a concorrência.",
      icon: "solar:rocket-bold-duotone",
      stat: "+35% ROAS"
    },
    {
      id: "card_logistics",
      colSpan: "md:col-span-1",
      type: "stat",
      title: "Full & Coleta.",
      description: "Integração completa com os centros de distribuição para entrega no dia seguinte.",
      icon: "solar:box-minimalistic-bold-duotone",
      stat: "24h Entrega"
    },
    {
      id: "card_cta",
      colSpan: "md:col-span-2",
      type: "action",
      title: "4 Planos de Aceleração.",
      description: "Do setup inicial à escala agressiva. Escolha a velocidade do seu crescimento no ecossistema.",
      ctaText: "Ver Planos de Escala",
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
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-yellow-700 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-100">
                {header.tag}
            </span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-[#1D1D1F]">
                {header.title}
            </h2>
            <p className="text-xl font-medium text-gray-500">
                {header.subtitle}
            </p>
        </div>

        {/* --- BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(320px,auto)]">
            
            {bento_cards.map((card, index) => (
                <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className={`
                        ${card.colSpan} 
                        rounded-[2.5rem] overflow-hidden 
                        bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-yellow-200 transition-all duration-500
                        flex flex-col group
                    `}
                >
                    {/* --- LAYOUT TIPO 1: HERO (Suave) --- */}
                    {card.type === "hero" && (
                        <div className="flex flex-col md:flex-row h-full">
                            <div className="p-10 flex-1 flex flex-col justify-center bg-gradient-to-br from-white to-[#FDFDFD]">
                                <div className="mb-4 inline-flex items-center gap-2 bg-yellow-50 border border-yellow-100 px-3 py-1 rounded-full w-fit">
                                    <Icon icon="solar:medal-star-bold" className="text-yellow-600 w-3.5 h-3.5" />
                                    <span className="text-[10px] font-bold text-yellow-700 uppercase tracking-wider">{card.badge}</span>
                                </div>
                                <h3 className="text-3xl font-bold mb-4 text-gray-900">
                                    {card.title}
                                </h3>
                                <p className="text-lg font-medium text-gray-500">
                                    {card.description}
                                </p>
                            </div>
                            
                            <div className="relative h-64 md:h-auto md:w-1/2 bg-gray-50 overflow-hidden">
                                <Image
                                    src={card.image!}
                                    alt={card.title}
                                    fill
                                    className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>
                    )}

                    {/* --- LAYOUT TIPO 2: STAT (Ícone Amarelo, Fundo Neutro) --- */}
                    {card.type === "stat" && (
                        <div className="p-10 h-full flex flex-col justify-between hover:bg-yellow-50/20 transition-colors">
                            <div>
                                <div className="mb-6 w-14 h-14 rounded-2xl bg-yellow-50 border border-yellow-100 flex items-center justify-center text-yellow-600 group-hover:bg-yellow-100 transition-colors">
                                    <Icon icon={card.icon!} className="w-8 h-8" />
                                </div>
                                <h3 className="text-3xl font-bold mb-3 text-gray-900">
                                    {card.title}
                                </h3>
                                <p className="text-lg font-medium text-gray-500">
                                    {card.description}
                                </p>
                            </div>
                            <div className="mt-6">
                                <span className="text-xs font-bold bg-gray-900 text-white px-4 py-2 rounded-lg uppercase tracking-widest">
                                    {card.stat}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* --- LAYOUT TIPO 3: ACTION (Elegante e Profundo) --- */}
                    {card.type === "action" && (
                        <div className="p-10 h-full flex flex-col justify-center items-start bg-[#1A1A1A] relative overflow-hidden">
                            {/* Glow Amarelo Suave no fundo */}
                            <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-400/5 blur-[80px] rounded-full" />
                            
                            <h3 className="text-3xl font-bold mb-4 text-white relative z-10">
                                {card.title}
                            </h3>
                            <p className="text-lg font-medium mb-8 max-w-lg text-gray-400 relative z-10">
                                {card.description}
                            </p>
                            <Link 
                                href={card.href!} 
                                className="inline-flex items-center gap-3 bg-yellow-400 text-black px-10 py-5 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-all shadow-lg relative z-10"
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