"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// --- INTERFACES ---
interface AuthorityData {
  theme: {
    accentColor: string;
    gradientStart: string;
    gradientEnd: string;
  };
  header: {
    badge: string;
    badgeIcon: string;
    titlePrefix: string;
    titleSuffix: string;
    titleHighlight: string;
    counterValue: number;
    counterLabel: string;
  };
  founder: {
    title: string;
    icon: string;
    quote: string;
  };
  methodology: {
    paragraphs: string[];
  };
}

const FALLBACK_DATA: AuthorityData = {
    theme: { 
        accentColor: "#FFCC00",
        gradientStart: "#FFCC00",
        gradientEnd: "#ffd900ff"
    },
    header: {
        badge: "Liderança & Visão",
        badgeIcon: "ph:crown-simple-bold",
        titlePrefix: "Não jogamos",
        titleSuffix: "com a sorte.",
        titleHighlight: "Jogamos com dados.",
        counterValue: 40,
        counterLabel: "Faturamento auditado<br/>gerado para clientes."
    },
    founder: {
        title: "A Visão do Fundador",
        icon: "ph:user-focus-bold",
        quote: "A Tegbe não nasceu em uma sala de aula, mas no campo de batalha. Fundada por <strong>Donizete Caetano</strong>, nossa estrutura é a resposta direta a anos observando o mercado desperdiçar potencial por falta de técnica."
    },
    methodology: {
        paragraphs: [
            "Criamos a agência que nós mesmos gostaríamos de contratar. Uma operação onde <span class='font-medium' style='color: var(--accent-color)'>transparência radical</span> e <span class='px-1 rounded-sm font-medium' style='color: var(--accent-color)'>obsessão por ROI</span> não são diferenciais, são o mínimo aceitável.",
            "Aqui, tratamos cada real do seu orçamento com o mesmo respeito, rigor e proteção que tratamos o nosso próprio capital."
        ]
    }
};

const TegbeAuthoritySection = ({ endpoint = "https://tegbe-dashboard.vercel.app/api/tegbe-institucional/autoridade" }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const [data, setData] = useState<AuthorityData>(FALLBACK_DATA);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const fetchData = async () => {
            try {
                const res = await fetch(endpoint);
                if (res.ok) {
                    const json = await res.json();
                    setData(json);
                }
            } catch (error) {
                console.warn("AuthoritySection: Usando Fallback.");
            }
        };
        fetchData();
    }, [endpoint]);

    // Extração segura das cores do tema
    const theme = data.theme || FALLBACK_DATA.theme;

    useGSAP(() => {
        if (!mounted) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse",
            }
        });

        tl.fromTo(".reveal-left", 
            { x: -30, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
        );

        tl.fromTo(".reveal-right",
            { x: 30, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
            "-=0.6"
        );

        const counter = { val: 0 }; 
        gsap.to(counter, {
            val: data.header.counterValue,
            duration: 2.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
            },
            onUpdate: () => {
                const element = document.getElementById("counter-money");
                if (element) {
                    element.innerHTML = `+R$${counter.val.toFixed(0)}M`;
                }
            }
        });

    }, { scope: sectionRef, dependencies: [data, mounted] });

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-24 lg:py-32 bg-[#F5F5F7] overflow-hidden border-t border-gray-200/50"
            style={{ 
                "--accent-color": theme.accentColor,
                "--grad-start": theme.gradientStart,
                "--grad-end": theme.gradientEnd 
            } as React.CSSProperties}
        >
            {/* Background Spot dinâmico */}
            <div 
                className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none opacity-[0.04] transition-all duration-700" 
                style={{ background: `radial-gradient(circle, ${theme.accentColor} 0%, transparent 70%)` }}
            />

            <div className="container mx-auto px-6 relative z-10">
                
                <div className="reveal-left opacity-0 mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white shadow-sm">
                    <Icon icon={data.header.badgeIcon} style={{ color: theme.accentColor }} className="w-4 h-4" />
                    <span className="text-[11px] font-bold tracking-[0.15em] text-gray-500 uppercase">
                        {data.header.badge}
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    
                    <div className="lg:col-span-5 flex flex-col justify-center">
                        <h2 className="reveal-left opacity-0 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-[#1d1d1f] leading-[1.1] mb-6">
                            {data.header.titlePrefix} <br/>
                            {data.header.titleSuffix} <br/>
                            <span 
                                className="text-transparent bg-clip-text transition-all duration-700"
                                style={{ backgroundImage: `linear-gradient(to right, ${theme.gradientStart}, ${theme.gradientEnd})` }}
                            >
                                {data.header.titleHighlight}
                            </span>
                        </h2>
                        
                        <div className="reveal-left opacity-0 mt-8 pt-8 border-t border-gray-200">
                            <div className="flex items-center gap-4">
                                <div id="counter-money" className="text-4xl lg:text-5xl font-bold text-[#1d1d1f] tracking-tight">
                                    +R$0M
                                </div>
                                <div 
                                    className="text-sm text-gray-500 leading-tight font-medium"
                                    dangerouslySetInnerHTML={{ __html: data.header.counterLabel }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 space-y-8 lg:pt-4">
                        <div 
                            className="reveal-right opacity-0 bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-white transition-all duration-500 flex gap-5 items-start"
                            style={{ borderLeft: `4px solid ${theme.accentColor}` }}
                        >
                            <div className="hidden sm:flex flex-shrink-0 w-14 h-14 rounded-full bg-gray-50 items-center justify-center" style={{ color: theme.accentColor }}>
                                <Icon icon={data.founder.icon} width="28" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-[#1d1d1f] mb-2">{data.founder.title}</h3>
                                <p 
                                    className="text-gray-600 leading-relaxed font-light text-[15px]"
                                    dangerouslySetInnerHTML={{ __html: data.founder.quote }}
                                />
                            </div>
                        </div>

                        <div className="reveal-right opacity-0 space-y-6 pl-6 border-l-2" style={{ borderColor: `${theme.accentColor}33` }}>
                            {data.methodology.paragraphs.map((p, i) => (
                                <p 
                                    key={i} 
                                    className="text-lg text-gray-600 leading-relaxed font-light"
                                    dangerouslySetInnerHTML={{ __html: p }}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default TegbeAuthoritySection;