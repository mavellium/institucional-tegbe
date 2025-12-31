"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function WhyTegbeMarketing() {
    const sectionRef = useRef(null);

    useGSAP(() => {
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
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            // MUDANÇA 1: Fundo Dark (#020202) para continuidade com o Hero
            className="py-24 w-full flex flex-col justify-center items-center bg-[#020202] px-6 relative border-t border-white/5"
        >
            {/* Texture Noise para manter o padrão "Rolls-Royce" */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

            {/* MUDANÇA 2: Luzes de Fundo agora são RED/CRIMSON */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E31B63]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#FF0F43]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container max-w-5xl relative z-10">
                <div className="flex flex-col items-center text-center w-full">

                    {/* Badge Minimalista Dark */}
                    <div className="reveal-text mb-8 flex items-center gap-2 px-3 py-1.5 rounded-full border border-rose-500/20 bg-rose-900/10 backdrop-blur-md">
                        {/* Ponto pulsante Vermelho */}
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E31B63]"></span>
                        </span>
                        <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-rose-200/80 uppercase">
                            Engenharia de Vendas
                        </span>
                    </div>

                    {/* Headline: Comparação Agressiva */}
                    <h1 className="reveal-text font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight tracking-tight text-white max-w-4xl">
                        Por que contratar a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0F43] to-[#E31B63]">Tegbe</span> e não uma agência comum?
                    </h1>

                    {/* Subtítulo: Foco em Processo e CRM, não sorte */}
                    <div className="reveal-text max-w-3xl space-y-5 mb-10">
                        <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
                            Agências comuns entregam "posts criativos" e esperam que você venda. 
                            Nós instalamos um <strong className="text-white font-medium">Ecossistema de Receita</strong> (Tráfego + CRM + IA) para eliminar a dependência da sorte.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}