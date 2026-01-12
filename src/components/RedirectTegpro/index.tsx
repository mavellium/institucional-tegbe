"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Link from "next/link";

// --- INTERFACES DINÂMICAS MAVELLIUM ---
interface Track {
    id: string;
    title: string;
    desc: string;
    icon: string;
    enabled: boolean;
    order: number;
}

interface TegProData {
    theme: {
        style: string;
        bg_section: string;
        accent_gold: string;
        gold_gradient: string;
    };
    header: {
        tag: string;
        title: string;
        subtitle: string;
    };
    hero_card: {
        title: string;
        subtitle: string;
        description: string;
        badge: string;
        cta: string;
        href: string;
        enabled: boolean;
    };
    tracks: Track[];
    visual_metadata: {
        glow_radius: string;
        border_style: string;
        grain_opacity: string;
    };
}

export default function TegProRefined() {
    const [data, setData] = useState<TegProData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                // ENDPOINT ATUALIZADO CONFORME SOLICITADO
                const response = await fetch('/api-tegbe/tegpro-academy/tegpro-home');
                const result = await response.json();

                // Verificação da estrutura (tegpro_refined está dentro do objeto principal)
                if (result.tegpro_refined) {
                    setData(result.tegpro_refined);
                } else if (result.methodology) { // Fallback caso a estrutura mude
                    setData(result as any);
                }
            } catch (error) {
                console.error("Mavellium Engine - Erro ao carregar TegPro Academy:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading || !data) return null;

    const { theme, header, hero_card, tracks, visual_metadata } = data;

    return (
        <section className="py-40 px-6 relative overflow-hidden font-sans flex items-center" style={{ backgroundColor: theme.bg_section }}>

            {/* Background Glow: Raio vindo do visual_metadata */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[150px] rounded-full pointer-events-none opacity-[0.05]"
                style={{
                    backgroundColor: theme.accent_gold,
                    width: visual_metadata?.glow_radius || "1000px",
                    height: "600px"
                }}
            />

            <div className="max-w-6xl mx-auto w-full relative z-10">

                {/* TOP: Header */}
                <div className="mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 mb-8"
                    >
                        <div className="w-8 h-[1px]" style={{ backgroundColor: `${theme.accent_gold}66` }} />
                        <span className="text-[10px] font-medium uppercase tracking-[0.5em]" style={{ color: theme.accent_gold }}>
                            {header.tag}
                        </span>
                    </motion.div>

                    <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-8">
                        {header.title}
                    </h2>
                    <p className="text-lg text-zinc-500 font-medium max-w-xl leading-relaxed">
                        {header.subtitle}
                    </p>
                </div>

                {/* CENTER: O Monolito */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative rounded-[3rem] bg-[#0A0A0B] border border-white/[0.04] p-8 md:p-16 overflow-hidden"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                        {/* Lado Esquerdo: Conteúdo */}
                        <div className="lg:col-span-7 relative z-10">
                            <div className="flex items-center gap-2 mb-8 opacity-60">
                                <Icon icon="solar:crown-star-linear" style={{ color: theme.accent_gold }} className="w-4 h-4" />
                                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                    {hero_card.badge}
                                </span>
                            </div>

                            <h3 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
                                {hero_card.title} <br />
                                <span style={{ color: theme.accent_gold }} className="font-medium italic">
                                    {hero_card.subtitle}
                                </span>
                            </h3>

                            <p className="text-base text-zinc-500 mb-12 max-w-md leading-relaxed">
                                {hero_card.description}
                            </p>

                            <Link
                                href={hero_card.href}
                                className="group/btn relative inline-flex items-center gap-6 px-10 py-5 rounded-2xl bg-transparent border border-white/10 overflow-hidden transition-all duration-500 hover:border-[#C5A059]/50"
                            >
                                <div
                                    className="absolute inset-0 translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
                                    style={{ backgroundColor: theme.accent_gold }}
                                />

                                <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.2em] text-white group-hover/btn:text-black transition-colors">
                                    {hero_card.cta}
                                </span>
                                <Icon
                                    icon="solar:arrow-right-linear"
                                    className="relative z-10 w-5 h-5 text-[#C5A059] group-hover/btn:text-black transition-all group-hover/btn:translate-x-1"
                                />
                            </Link>
                        </div>

                        {/* Lado Direito: Tracks */}
                        <div className="lg:col-span-5 space-y-4 relative z-10">
                            {tracks
                                .filter(t => t.enabled)
                                .sort((a, b) => a.order - b.order)
                                .map((track) => (
                                    <div
                                        key={track.id}
                                        className="p-6 rounded-2xl bg-white/[0.01] border border-white/[0.03] flex items-center gap-5 hover:bg-white/[0.03] hover:border-white/10 transition-all duration-500 group"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-black border border-white/[0.05] flex items-center justify-center flex-shrink-0 group-hover:border-[#C5A059]/30 transition-colors">
                                            <Icon icon={track.icon} className="w-5 h-5 text-zinc-500 group-hover:text-[#C5A059] transition-colors" />
                                        </div>
                                        <div>
                                            <h4 className="text-white text-sm font-bold tracking-tight">{track.title}</h4>
                                            <p className="text-zinc-600 text-xs mt-0.5">{track.desc}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>

                    </div>

                    {/* Grain Texture: Opacidade vinda do metadata */}
                    <div
                        className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"
                        style={{ opacity: visual_metadata?.grain_opacity || "0.03" }}
                    />
                </motion.div>

            </div>
        </section>
    );
}