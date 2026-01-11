"use client";

import { useRef, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Swiper para o visor principal
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

// --- INTERFACES ---
interface Location {
  id: string;
  city: string;
  role: string;
  description: string;
  features: string[];
  address: string;
  mapLink: string; // Adicionado para o CTA de localização
  images: string[];
}

interface LocationsConfig {
  theme: { accentColor: string; };
  header: { badge: string; title: string; subtitle: string; };
  locations: Location[];
  cta: { text: string; link: string; };
}

// --- DADOS REAIS MAVELLIUM ---
const FALLBACK_DATA: LocationsConfig = {
  theme: { accentColor: "#FFFFFF" }, // Apple Style: Foco no Branco/Prata
  header: {
    badge: "Operational Presence",
    title: "Nossos Centros",
    subtitle: "Infraestrutura de elite projetada para performance e criatividade."
  },
  locations: [
    {
      id: "sp-01",
      city: "São Paulo",
      role: "Hub de Inteligência & IA",
      description: "Nossa central de comando com infraestrutura de elite para imersões executivas e engenharia de dados aplicada.",
      features: ["Estrategistas Sênior", "Laboratório IA", "Setup Apple Pro"],
      address: "Av. Paulista, Jardins - SP",
      mapLink: "https://maps.google.com",
      images: ["/card1.png", "/card2.png", "/ads-bg.png"]
    },
    {
      id: "rj-02",
      city: "Rio de Janeiro",
      role: "Célula de Growth & Social",
      description: "Ambiente disruptivo focado em produção de conteúdo de alto impacto e escala de tráfego orgânico.",
      features: ["Studio Pro", "Growth Social", "Célula de Performance"],
      address: "Barra da Tijuca - RJ",
      mapLink: "https://maps.google.com",
      images: ["/ads-bg.png", "/ads-bg.png"]
    }
  ],
  cta: { text: "Agendar Visita Técnica", link: "#contato" }
};

export default function LocationsSection({ endpoint }: { endpoint?: string }) {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<LocationsConfig>(FALLBACK_DATA);
  const [activeLoc, setActiveLoc] = useState(FALLBACK_DATA.locations[0]);

  useEffect(() => {
    setMounted(true);
    if (endpoint) {
      fetch(endpoint)
        .then(res => res.json())
        .then(json => {
            setData(json);
            setActiveLoc(json.locations[0]);
        })
        .catch(() => setData(FALLBACK_DATA));
    }
  }, [endpoint]);

  if (!mounted) return <div className="h-[700px] bg-[#020202] animate-pulse" />;

  const accent = data.theme?.accentColor || "#FFFFFF";

  return (
    <section className="relative py-24 bg-[#050505] overflow-hidden font-sans">
      
      {/* Apple-style Gradient Background (Substituindo a Grade) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10 max-w-7xl mx-auto">
        
        {/* HEADER LIMPO */}
        <div className="flex flex-col items-center text-center mb-20">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-6"
            >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }}></span>
                <span className="text-[10px] font-medium tracking-[0.2em] text-white/70 uppercase">{data.header.badge}</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-semibold text-white tracking-tight mb-4">
                {data.header.title}
            </h2>
            <p className="text-gray-400 max-w-lg text-sm md:text-base leading-relaxed">
                {data.header.subtitle}
            </p>
        </div>

        {/* INTERFACE PRINCIPAL - GLASSMORPHISM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white/[0.02] rounded-[2.5rem] border border-white/10 overflow-hidden backdrop-blur-2xl shadow-2xl">
            
            {/* SIDEBAR DE NAVEGAÇÃO */}
            <div className="lg:col-span-4 flex flex-col border-b lg:border-b-0 lg:border-r border-white/10 bg-black/20">
                <div className="p-6 border-b border-white/5">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Unidades Operacionais</span>
                </div>
                {data.locations.map((loc) => (
                    <button
                        key={loc.id}
                        onClick={() => setActiveLoc(loc)}
                        className={`relative p-8 text-left transition-all duration-500 group ${activeLoc.id === loc.id ? 'bg-white/[0.05]' : 'hover:bg-white/[0.02]'}`}
                    >
                        <h3 className={`text-xl font-medium transition-all ${activeLoc.id === loc.id ? 'text-white' : 'text-gray-500'}`}>
                            {loc.city}
                        </h3>
                        <p className={`text-xs mt-1 transition-colors ${activeLoc.id === loc.id ? 'text-white/60' : 'text-gray-700'}`}>
                            {loc.role}
                        </p>
                        
                        {activeLoc.id === loc.id && (
                            <motion.div layoutId="activeTab" className="absolute right-6 top-1/2 -translate-y-1/2">
                                <Icon icon="ph:caret-right-bold" className="text-white w-4 h-4" />
                            </motion.div>
                        )}
                    </button>
                ))}

                {/* INFO DA UNIDADE + CTA LOCALIZAÇÃO */}
                <div className="mt-auto p-8 border-t border-white/5 space-y-6">
                    <div className="space-y-2">
                        <div className="flex items-start gap-3">
                            <Icon icon="ph:map-pin-light" className="text-white/40 w-5 h-5 mt-0.5" />
                            <span className="text-xs text-gray-400 leading-relaxed">{activeLoc.address}</span>
                        </div>
                    </div>
                    
                    <a 
                        href={activeLoc.mapLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[11px] font-bold text-white uppercase tracking-wider group/map"
                    >
                        Ver localização no mapa
                        <Icon icon="ph:arrow-up-right" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                </div>
            </div>

            {/* CARROSSEL PRINCIPAL */}
            <div className="lg:col-span-8 relative h-[400px] lg:h-[600px] bg-black">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeLoc.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full w-full"
                    >
                        <Swiper
                            modules={[Pagination, Autoplay, EffectFade, Navigation]}
                            effect="fade"
                            autoplay={{ delay: 4000 }}
                            pagination={{ clickable: true }}
                            navigation={{ nextEl: '.s-next', prevEl: '.s-prev' }}
                            className="h-full w-full location-swiper"
                        >
                            {activeLoc.images.map((img, i) => (
                                <SwiperSlide key={i}>
                                    <div className="relative h-full w-full">
                                        <Image 
                                            src={img} 
                                            alt={activeLoc.city} 
                                            fill 
                                            className="object-cover transition-transform duration-[10s] scale-105" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* CONTROLES CUSTOMIZADOS */}
                        <div className="absolute bottom-8 right-8 z-30 flex gap-3">
    <button className="s-prev w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-black/40 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-300 shadow-2xl">
        <Icon icon="ph:caret-left-bold" className="w-5 h-5" />
    </button>
    <button className="s-next w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-black/40 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-300 shadow-2xl">
        <Icon icon="ph:caret-right-bold" className="w-5 h-5" />
    </button>
</div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>

        {/* CTA FINAL */}
        <div className="mt-20 text-center">
            <a 
                href={data.cta.link}
                className="inline-flex items-center gap-6 px-10 py-5 rounded-full bg-white text-black font-bold uppercase text-[10px] tracking-[0.2em] hover:scale-105 transition-all active:scale-95 shadow-xl shadow-white/5"
            >
                {data.cta.text}
                <Icon icon="ph:calendar-check-fill" className="w-4 h-4" />
            </a>
        </div>
      </div>

      <style jsx global>{`
        .location-swiper .swiper-pagination-bullet {
            background: white !important;
            opacity: 0.3;
        }
        .location-swiper .swiper-pagination-bullet-active {
            opacity: 1;
            width: 20px;
            border-radius: 4px;
            transition: all 0.3s;
        }
        .location-swiper .swiper-pagination {
            bottom: 32px !important;
            left: 32px !important;
            text-align: left !important;
            width: auto !important;
        }
      `}</style>
    </section>
  );
}