"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Configuração de Engenharia: Endpoint Fixo Centralizado
const TEGBE_API_URL = "https://tegbe-dashboard.vercel.app/api/tegbe-institucional/agencias-falham";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// --- INTERFACE DE DADOS ---
interface WhyTegbeData {
    content: {
        badge: { label: string };
        headline: {
            static_text_prefix: string;
            highlight_text: string;
            static_text_suffix: string;
        };
        copy: {
            paragraph: string;
            strong_points: string[];
        };
    };
}

export default function WhyTegbeMarketing() {
    const sectionRef = useRef(null);
    const [data, setData] = useState<WhyTegbeData | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Sincronização direta com a infraestrutura Tegbe
        fetch(TEGBE_API_URL)
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch((err) => console.error("Mavellium Sync Error:", err));
    }, []);

    // Animações Cinematográficas (GSAP)
    useGSAP(() => {
        if (!mounted || !data) return;

        gsap.from(".reveal-text", {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
            },
        });
    }, { scope: sectionRef, dependencies: [data, mounted] });

    // Blindagem de Hidratação e Carregamento
    if (!mounted || !data) {
        return <section className="py-24 w-full bg-[#020202] min-h-[500px]" />;
    }

    return (
        <section
            ref={sectionRef}
            className="py-24 w-full flex flex-col justify-center items-center bg-[#020202] px-6 relative border-t border-white/5 overflow-hidden transition-opacity duration-700"
        >
            {/* Texture Noise */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

            {/* Ambient Lights (Padrão Ferrari) */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E31B63]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#FF0F43]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container max-w-5xl relative z-10 mx-auto">
                <div className="flex flex-col items-center text-center w-full">

                    {/* Badge Minimalista Pulsante */}
                    <div className="reveal-text mb-8 flex items-center gap-2 px-3 py-1.5 rounded-full border border-rose-500/20 bg-rose-900/10 backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E31B63]"></span>
                        </span>
                        <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-rose-200/80 uppercase">
                            {data.content.badge.label}
                        </span>
                    </div>

                    {/* Headline Dinâmica */}
                    <h1 className="reveal-text font-bold text-3xl sm:text-4xl md:text-5xl lg:text-7xl mb-6 leading-tight tracking-tight text-white max-w-4xl">
                        {data.content.headline.static_text_prefix}{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0F43] to-[#E31B63]">
                            {data.content.headline.highlight_text}
                        </span>{" "}
                        {data.content.headline.static_text_suffix}
                    </h1>

                    {/* Copywriting Estratégico com Destaques Neural */}
                    <div className="reveal-text max-w-3xl space-y-5 mb-10">
                        <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
                            {data.content.copy.paragraph.split(new RegExp(`(${data.content.copy.strong_points.join('|')})`, 'g')).map((part, i) => (
                                data.content.copy.strong_points.includes(part) 
                                ? <strong key={i} className="text-white font-medium">{part}</strong> 
                                : part
                            ))}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}