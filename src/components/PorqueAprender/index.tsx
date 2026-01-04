"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// --- CONTEÚDO CONFIGURÁVEL (CMS READY) ---
const whyUsContent = {
    badge: "Vivência de Campo",
    headline: {
        prefix: "Por que aprender com a",
        highlight: "Tegbe",
        suffix: "e não com um \"guru\"?"
    },
    description: {
        paragraph1: {
            text: "O mercado está cheio de professores que nunca venderam nada. A Tegbe é, antes de tudo, uma",
            bold: "operação de vendas ativa"
        },
        paragraph2: {
            text: "Não ensinamos teorias de livros antigos. Nós abrimos a caixa-preta das estratégias que geram milhões todos os meses para nossos clientes de assessoria.",
            highlight: "Você aprende o que nós aplicamos hoje."
        }
    },
    features: [
        { label: "Método Validado", icon: "ph:check-circle-fill" },
        { label: "Foco em ROI", icon: "ph:chart-line-up-bold" },
        { label: "Comunidade Ativa", icon: "ph:users-three-fill" }
    ]
};

export default function WhyLearnFromTegbe() {
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
            className="py-24 w-full flex flex-col justify-center items-center bg-[#020202] px-6 relative border-t border-white/5"
        >
            {/* Texture Noise */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

            {/* Luzes de Fundo DOURADAS */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FFD700]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#FFD700]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container max-w-5xl relative z-10">
                <div className="flex flex-col items-center text-center w-full">

                    {/* Badge Dourada */}
                    <div className="reveal-text mb-8 flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#FFD700]/20 bg-[#FFD700]/5 backdrop-blur-md shadow-[0_0_15px_rgba(255,215,0,0.05)]">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD700] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFD700]"></span>
                        </span>
                        <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-[#FFD700] uppercase">
                            {whyUsContent.badge}
                        </span>
                    </div>

                    {/* Headline Dinâmica */}
                    <h1 className="reveal-text font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight tracking-tight text-white max-w-4xl">
                        {whyUsContent.headline.prefix} <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DBB46C] via-[#FFD700] to-[#B8860B] drop-shadow-[0_0_20px_rgba(219,180,108,0.15)]">
                            {whyUsContent.headline.highlight}
                        </span> {whyUsContent.headline.suffix}
                    </h1>

                    {/* Descrição em dois blocos */}
                    <div className="reveal-text max-w-3xl space-y-6 mb-10">
                        <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
                            {whyUsContent.description.paragraph1.text} <strong className="text-white font-medium">{whyUsContent.description.paragraph1.bold}.</strong>
                        </p>
                        <p className="text-base md:text-lg text-gray-500 font-light leading-relaxed">
                            {whyUsContent.description.paragraph2.text} <span className="text-[#FFD700]">{whyUsContent.description.paragraph2.highlight}</span>
                        </p>
                    </div>

                    {/* Features/Ícones Mapeados */}
                    <div className="reveal-text flex flex-wrap justify-center gap-4 md:gap-8 mt-4 opacity-80">
                        {whyUsContent.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/5 bg-white/[0.02]">
                                <Icon icon={feature.icon} className="text-[#FFD700]" />
                                <span className="text-sm text-gray-300">{feature.label}</span>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}