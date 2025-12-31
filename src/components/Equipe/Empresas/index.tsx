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

export default function TrustAndFilter() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        // Animação padrão de revelação
        gsap.from(".reveal-text", {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
            },
        });

        // Animação específica para os itens de "Não é para você"
        gsap.from(".reject-item", {
            x: -20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            scrollTrigger: {
                trigger: ".reject-list",
                start: "top 90%",
            }
        });

    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            // MUDANÇA 1: Fundo Dark e Borda Superior para separação
            className="py-24 w-full flex flex-col justify-center items-center bg-[#020202] px-6 relative border-t border-white/5"
        >
            {/* Texture Noise */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

            {/* MUDANÇA 2: Luzes Vermelhas/Crimson */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E31B63]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FF0F43]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container max-w-6xl relative z-10">
                <div className="flex flex-col items-center text-center w-full">

                    {/* --- BLOCO 1: PROVA SOCIAL --- */}
                    
                    {/* Badge */}
                    <div className="reveal-text mb-8 flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </span>
                        <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase">
                            Hall de Grandes Players
                        </span>
                    </div>

                    <h1 className="reveal-text font-bold text-3xl sm:text-5xl md:text-6xl mb-12 leading-tight tracking-tight text-white max-w-4xl">
                        Eles confiaram na metodologia e <br className="hidden md:block"/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0F43] to-[#E31B63]">escalaram suas operações.</span>
                    </h1>

                    <LogosMKT />
                    <LogosMKTInvert />
                    
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#E31B63]/30 to-transparent mb-20"></div>

                    <div className="flex flex-col items-center text-center w-full px-4 sm:px-6 lg:px-8">

                        <h1 className="reveal-text font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl mb-10 leading-tight tracking-tight text-white max-w-3xl mx-auto">
                            A Tegbe <span className="text-[#E31B63] underline decoration-[#E31B63]/30 underline-offset-8">NÃO</span> é para você se...
                        </h1>

                        <div className="reject-list grid md:grid-cols-3 gap-6 max-w-5xl w-full">
                            
                            {/* Card de Rejeição 1 */}
                            <div className="reject-item bg-[#0A0A0A] border border-red-900/20 p-8 rounded-2xl hover:border-red-500/40 transition-colors group text-left">
                                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center mb-4 group-hover:bg-red-500/20">
                                    <Icon icon="mdi:close" className="text-red-500 w-6 h-6" />
                                </div>
                                <h3 className="text-white font-bold text-lg mb-2">Marketing de Vaidade</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Se você quer apenas "postar no Instagram" para ganhar likes e não se preocupa com o ROI real no final do mês.
                                </p>
                            </div>

                            {/* Card de Rejeição 2 */}
                            <div className="reject-item bg-[#0A0A0A] border border-red-900/20 p-8 rounded-2xl hover:border-red-500/40 transition-colors group text-left">
                                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center mb-4 group-hover:bg-red-500/20">
                                    <Icon icon="mdi:close" className="text-red-500 w-6 h-6" />
                                </div>
                                <h3 className="text-white font-bold text-lg mb-2">Resistência a Dados</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Se você prefere seguir seus "achismos" e intuições antigas ao invés de aceitar estratégias baseadas em números.
                                </p>
                            </div>

                            {/* Card de Rejeição 3 */}
                            <div className="reject-item bg-[#0A0A0A] border border-red-900/20 p-8 rounded-2xl hover:border-red-500/40 transition-colors group text-left">
                                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center mb-4 group-hover:bg-red-500/20">
                                    <Icon icon="mdi:close" className="text-red-500 w-6 h-6" />
                                </div>
                                <h3 className="text-white font-bold text-lg mb-2">Zona de Conforto</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Se sua empresa não tem estrutura ou vontade real de escalar o atendimento quando os leads começarem a chegar.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}