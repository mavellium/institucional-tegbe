"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";
import LogosMKTInvert from "@/components/Logos/LogosMKTInvert";
import LogosMKT from "@/components/Logos/LogosMKT";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function TrustSectionElite() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse",
            }
        });

        // 1. Título e Badge
        tl.fromTo(".reveal-head", 
            { y: 40, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
        );

        // 2. O Card de Logos sobe como um bloco sólido
        tl.fromTo(".logo-card", 
            { y: 60, autoAlpha: 0, scale: 0.98 },
            { y: 0, autoAlpha: 1, scale: 1, duration: 1, ease: "power3.out" },
            "-=0.4"
        );

        // 3. Stat lateral entra
        tl.fromTo(".stat-box",
            { x: -30, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" },
            "-=0.6"
        );

    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="py-24 w-full flex flex-col items-center bg-[#F5F5F7] px-6 relative overflow-hidden"
        >
            {/* Elementos de Fundo (Minimalistas) */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-gray-200/50 to-transparent rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-[100px] pointer-events-none" />

            <div className="container max-w-7xl relative z-10">

                {/* --- HEADER ASSIMÉTRICO --- */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-3xl">
                        <div className="reveal-head mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm">
                            <Icon icon="ph:crown-simple-bold" className="text-[#0071E3] w-4 h-4" />
                            <span className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase">
                                Hall de Clientes
                            </span>
                        </div>
                        <h2 className="reveal-head text-4xl md:text-5xl lg:text-6xl font-bold text-[#1d1d1f] tracking-tight leading-[1.05]">
                            Onde os gigantes <br/>
                            <span className="text-gray-400">escolhem escalar.</span>
                        </h2>
                    </div>
                    
                    {/* Texto de apoio alinhado à direita */}
                    <div className="reveal-head hidden md:block max-w-xs text-right pb-2">
                        <p className="text-sm text-gray-500 leading-relaxed font-medium">
                            Não colecionamos logos. Colecionamos cases de expansão de market share.
                        </p>
                    </div>
                </div>

                {/* --- BENTO GRID DE AUTORIDADE --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* BLOCO 1: O NÚMERO (Ancoragem de Valor) */}
                    <div className="stat-box opacity-0 lg:col-span-4 bg-[#1d1d1f] rounded-[2rem] p-10 flex flex-col justify-between text-white relative overflow-hidden group">
                        {/* Glow sutil */}
                        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#0071E3]/20 rounded-full blur-[80px] group-hover:bg-[#0071E3]/30 transition-all duration-500" />
                        
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                                <Icon icon="ph:trend-up-bold" className="text-white w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-300 mb-2">Volume Tracionado</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Soma do faturamento gerado sob nossa gestão direta nos últimos 12 meses.
                            </p>
                        </div>

                        <div className="relative z-10 mt-10">
                            <span className="text-6xl lg:text-7xl font-bold tracking-tighter text-white">
                                +40M
                            </span>
                            <div className="h-1 w-12 bg-[#0071E3] mt-4"></div>
                        </div>
                    </div>

                    {/* BLOCO 2: OS LOGOS (O Hall) */}
                    <div className="logo-card opacity-0 lg:col-span-8 bg-white rounded-[2rem] border border-white shadow-[0_20px_40px_rgba(0,0,0,0.04)] p-10 flex flex-col justify-center relative overflow-hidden">
                        
                        {/* Label discreto */}
                        <div className="absolute top-6 left-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            Ecossistema Validado
                        </div>

                        {/* Container dos Logos com Máscara Suave */}
                        <div className="w-full relative py-8">
                            {/* Máscaras laterais para o efeito infinito (se houver scroll) ou apenas acabamento */}
                            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                            <div className="grid grid-cols-1 gap-12 opacity-80 grayscale hover:grayscale-0 transition-all duration-700">
                                {/* Componentes de Logo Originais */}
                                <div className="scale-90 hover:scale-100 transition-transform duration-500">
                                    <LogosMKT />
                                </div>
                                <div className="scale-90 hover:scale-100 transition-transform duration-500">
                                    <LogosMKTInvert />
                                </div>
                            </div>
                        </div>

                        {/* Link sutil no rodapé do card */}
                        <div className="absolute bottom-6 right-8 flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer group/link">
                            <span className="text-xs font-bold text-[#1d1d1f]">Ver todos os cases</span>
                            <Icon icon="ph:arrow-right" className="w-3 h-3 group-hover/link:translate-x-1 transition-transform"/>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}