"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function SociosCrecimento() {
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse",
            }
        });

        // Animação do Header (Blindada com fromTo + autoAlpha)
        tl.fromTo(".reveal-header", 
            { y: 40, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out", stagger: 0.1 }
        );

        // Animação dos Cards
        tl.fromTo(".reveal-card",
            { y: 60, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out", stagger: 0.15 },
            "-=0.6"
        );

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20">
            
            {/* --- CABEÇALHO (INSTITUCIONAL / CULTURA) --- */}
            <div className="flex flex-col items-center text-center mb-16">
                
                {/* Badge */}
                <div className="reveal-header opacity-0 mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-900/10 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <span className="text-[11px] font-bold tracking-[0.2em] text-blue-400 uppercase font-mono">
                        Nossa Essência
                    </span>
                </div>

                {/* Headline de Posicionamento */}
                <h2 className="reveal-header opacity-0 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                    Não fundamos uma agência.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-white">
                        Criamos um padrão de excelência.
                    </span>
                </h2>

                {/* Texto de Apoio (Storytelling) */}
                <p className="reveal-header opacity-0 text-lg text-gray-400 max-w-2xl font-light leading-relaxed">
                    A Tegbe nasceu de uma inquietação: o mercado aceitava o "bom" como suficiente. 
                    Nós não. Somos um time de mentes analíticas obcecadas por elevar a barra do que é possível em performance digital.
                </p>
            </div>

            {/* --- GRID DE VALORES (CULTURA) --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Card 1 */}
                <div className="reveal-card opacity-0 group relative p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/[0.07] transition-all duration-500 hover:border-blue-500/30">
                    <div className="mb-4 inline-flex p-3 rounded-lg bg-blue-600/20 text-blue-400 group-hover:text-blue-300 transition-colors">
                        <Icon icon="ph:brain-bold" width="28" height="28" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Inteligência Estratégica</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Antes de apertar qualquer botão, nós pensamos. Nossa cultura valoriza o planejamento profundo e a visão de longo prazo em detrimento de hacks imediatistas.
                    </p>
                </div>

                {/* Card 2 */}
                <div className="reveal-card opacity-0 group relative p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/[0.07] transition-all duration-500 hover:border-blue-500/30">
                    <div className="mb-4 inline-flex p-3 rounded-lg bg-blue-600/20 text-blue-400 group-hover:text-blue-300 transition-colors">
                        <Icon icon="ph:users-three-bold" width="28" height="28" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Mentes de Dono</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Aqui dentro, ninguém é apenas funcionário. Atuamos com "Skin in the Game". Sentimos a dor e a vitória do cliente como se fosse nossa própria operação.
                    </p>
                </div>

                {/* Card 3 */}
                <div className="reveal-card opacity-0 group relative p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/[0.07] transition-all duration-500 hover:border-blue-500/30">
                    <div className="mb-4 inline-flex p-3 rounded-lg bg-blue-600/20 text-blue-400 group-hover:text-blue-300 transition-colors">
                        <Icon icon="ph:diamond-bold" width="28" height="28" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Rigor Técnico</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Rejeitamos o amadorismo. Nossos processos são auditáveis, nossa tecnologia é de ponta e nossa busca por precisão é inegociável.
                    </p>
                </div>

            </div>
        </div>
    );
}