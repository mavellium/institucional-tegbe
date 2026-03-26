"use client";

import { useRef, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RejectionCard {
  id: number | string;
  icon: string;
  title: string;
  description: string;
  status_label: string;
  highlight_terms: string[];
}

interface AntiHeroData {
  header: {
    badge: string;
    title_main: string;
    title_highlight: string;
    title_suffix: string;
    description: string;
  };
  rejection_cards: RejectionCard[];
}

// Componente GlowBackground
function GlowBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Primary glow - top right */}
      <motion.div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(227,27,99,0.12) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Secondary glow - bottom left */}
      <motion.div
        className="absolute -bottom-48 -left-48 w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(227,27,99,0.06) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Grid lines - tech feel */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(227,27,99,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(227,27,99,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Scan line effect */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E31B63]/20 to-transparent"
        animate={{
          top: ["-5%", "105%"],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

// Componente RejectionCard atualizado com Iconify
function RejectionCard({ card, index, isLastCard }: { 
  card: RejectionCard; 
  index: number; 
  isLastCard: boolean 
}) {
  // Last card has a different layout (text-only, no X icon)
  if (isLastCard) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="group relative flex items-center anti-card"
      >
        <div className="relative w-full h-full min-h-[220px] flex items-center p-8 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.02] to-transparent">
          {/* Subtle tech corner accents */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#E31B63]/20 rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#E31B63]/20 rounded-br-2xl" />
          
          <p className="text-gray-300/90 text-base md:text-lg leading-relaxed font-light">
            {card.description ? (
              card.description.split(new RegExp(`(${card.highlight_terms.join('|')})`, 'g')).map((part, i) => (
                card.highlight_terms.includes(part) 
                  ? <strong key={i} className="text-white font-semibold">{part}</strong> 
                  : part
              ))
            ) : card.title}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group relative anti-card"
    >
      {/* Card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0A0A0E] h-full min-h-[220px] transition-all duration-500 hover:border-[#E31B63]/30">
        
        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#E31B63]/0 via-[#E31B63]/[0.02] to-[#E31B63]/[0.06] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Tech circuit lines */}
        <svg className="absolute top-0 right-0 w-24 h-24 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500" viewBox="0 0 100 100">
          <path d="M100 0 L60 0 L60 20 L40 20 L40 40 L20 40 L20 60" stroke="#E31B63" fill="none" strokeWidth="0.5" />
          <circle cx="60" cy="20" r="2" fill="#E31B63" />
          <circle cx="40" cy="40" r="2" fill="#E31B63" />
        </svg>
        
        <div className="relative z-10 p-8 flex items-center text-center flex-col h-full">
          {/* X Icon - large and prominent */}
          <div className="mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#E31B63]/10 border border-[#E31B63]/20 flex items-center justify-center group-hover:bg-[#E31B63]/20 transition-all duration-500">
              <Icon icon="mdi:close" className="w-6 h-6 text-[#E31B63]" />
            </div>
          </div>
          
          {/* Title */}
          <h3 className="text-white font-bold text-lg md:text-xl leading-snug tracking-tight">
            {card.title}
          </h3>

          {/* Description if exists */}
          {card.description && (
            <p className="mt-3 text-gray-400/80 text-sm leading-relaxed font-light">
              {card.description.split(new RegExp(`(${card.highlight_terms.join('|')})`, 'g')).map((part, i) => (
                card.highlight_terms.includes(part) 
                  ? <strong key={i} className="text-white font-medium">{part}</strong> 
                  : part
              ))}
            </p>
          )}

          {/* Status label on hover */}
          <div className="mt-auto pt-6">
            <motion.span 
              className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#E31B63]/60 uppercase tracking-[0.15em] opacity-0 group-hover:opacity-100 transition-all duration-500"
              initial={false}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E31B63] animate-pulse" />
              {card.status_label}
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function MarketingAntiHero({ 
  endpoint = "https://tegbe-dashboard.vercel.app/api/tegbe-institucional/nao-para-voce" 
}: { 
  endpoint?: string 
}) {
  const sectionRef = useRef(null);
  const [data, setData] = useState<AntiHeroData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error("Falha na resposta da API");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Erro ao carregar Filtro de Qualificação:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  // Remove GSAP animations since we're using Framer Motion for cards
  useGSAP(() => {
    if (!data || loading) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(".reveal-anti-header", 
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1 }
    );

    // We're not animating cards with GSAP anymore since Framer Motion handles it
  }, { scope: sectionRef, dependencies: [data, loading] });

  if (loading || !data) return (
    <div className="h-96 bg-[#020202] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#E31B63] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <section ref={sectionRef} className="relative py-24 px-6 bg-[#020202] overflow-hidden border-t border-white/5">
      
      {/* Atmosphere - DNA Mavellium */}
      <GlowBackground />
      
      <div className="mx-auto max-w-7xl relative z-10 flex flex-col items-center">
        
        {/* CABEÇALHO ESTRATÉGICO */}
        <div className="text-center mb-16 max-w-4xl">
            <div className="reveal-anti-header mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-950/10 backdrop-blur-md">
                <Icon icon="mdi:filter-variant-remove" className="text-[#E31B63] w-4 h-4" />
                <span className="text-[11px] font-bold tracking-[0.2em] text-red-100 uppercase">
                    {data.header.badge}
                </span>
            </div>

            <h2 className="reveal-anti-header font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-white">
                {data.header.title_main}{" "}
                <span className="relative inline-block text-[#E31B63]">
                    {data.header.title_highlight}
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#E31B63]" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" opacity="0.4" />
                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                </span>{" "}
                {data.header.title_suffix}
            </h2>
            
            <p className="reveal-anti-header mt-6 text-gray-400 text-lg font-light max-w-2xl mx-auto">
                {data.header.description}
            </p>
        </div>

        {/* GRID DE QUALIFICAÇÃO REVERSA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {data.rejection_cards.map((card, index) => (
                <RejectionCard 
                  key={card.id}
                  card={card}
                  index={index}
                  isLastCard={index === data.rejection_cards.length - 1}
                />
            ))}
        </div>
      </div>
    </section>
  );
}