"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// --- INTERFACES ---
export interface PorqueAprenderData {
    theme: { accentColor: string; secondaryColor: string; };
    badge: string;
    features: Array<{ icon: string; label: string; }>;
    headline: { prefix: string; suffix: string; highlight: string; };
    description: {
        paragraph1: { text: string; bold: string; };
        paragraph2: { text: string; highlight: string; };
    };
}

const FALLBACKS: Record<string, PorqueAprenderData> = {
    cursos: {
        theme: { accentColor: "#FFD700", secondaryColor: "#B8860B" },
        badge: "Vivência de Campo",
        features: [
            { icon: "mdi:currency-usd", label: "Liberdade Financeira" },
            { icon: "mdi:clock-fast", label: "Resultado Prático" }
        ],
        headline: { prefix: "Por que aprender com a ", highlight: "Tegbe", suffix: ` e não com um "guru"?`},
        description: {
            paragraph1: { text: "O mercado está cheio de professores que nunca venderam nada. A Tegbe é, antes de tudo, uma ", bold: "operação de vendas ativa." },
            paragraph2: { text: "Não ensinamos teorias de livros antigos. Nós abrimos a caixa-preta das estratégias que geram milhões todos os meses.", highlight: "Você aprende o que nós aplicamos hoje." }
        }
    }
};

interface PorqueAprenderProps {
    endpoint?: string;
    variant?: "marketing" | "cursos";
}

export default function PorqueAprender({ endpoint, variant = "cursos" }: PorqueAprenderProps) {
    const sectionRef = useRef(null);
    const [mounted, setMounted] = useState(false); // Trava de hidratação
    const initialData = FALLBACKS[variant] || FALLBACKS.cursos;
    const [data, setData] = useState<PorqueAprenderData>(initialData);

    useEffect(() => {
        setMounted(true); // Garante que o código do cliente só rode após montagem
        if (endpoint) {
            fetch(endpoint)
                .then(res => res.json())
                .then(json => setData(json))
                .catch(() => setData(initialData));
        }
    }, [endpoint, variant, initialData]);

    useGSAP(() => {
        // Só dispara a animação se estiver montado e o ScrollTrigger puder encontrar os elementos
        if (!mounted) return;

        gsap.from(".reveal-text-p", {
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

    // Padrão Mavellium: Em vez de return null, mantemos a estrutura com opacidade 0
    // Isso evita o erro "Node.insertBefore" pois o nó sempre existe no DOM.
    const accent = data.theme?.accentColor || "#FFD700";
    const secondary = data.theme?.secondaryColor || "#B8860B";

    return (
        <section
            ref={sectionRef}
            className={`py-24 w-full flex flex-col justify-center items-center bg-[#020202] px-6 relative border-t border-white/5 overflow-hidden transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
        >
            {/* Texture Noise */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

            {/* Luzes de Fundo Dinâmicas */}
            <div 
                className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-[0.03] transition-colors duration-1000" 
                style={{ backgroundColor: accent }}
            />
            <div 
                className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none opacity-[0.03] transition-colors duration-1000" 
                style={{ backgroundColor: accent }}
            />

            <div className="container max-w-5xl relative z-10 mx-auto">
                <div className="flex flex-col items-center text-center w-full">

                    {/* Badge */}
                    <div 
                        className="reveal-text-p mb-8 flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md transition-all duration-500"
                        style={{ borderColor: `${accent}33`, backgroundColor: `${accent}0D` }}
                    >
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: accent }}></span>
                          <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: accent }}></span>
                        </span>
                        <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: accent }}>
                            {data.badge}
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="reveal-text-p font-bold text-3xl sm:text-4xl md:text-5xl lg:text-7xl mb-6 leading-[1.1] tracking-tighter text-white max-w-4xl">
                        {data.headline.prefix} <br className="hidden md:block" />
                        <span 
                            className="text-transparent bg-clip-text bg-gradient-to-r transition-all duration-1000"
                            style={{ 
                                backgroundImage: `linear-gradient(to right, ${accent}, ${secondary})`,
                                filter: `drop-shadow(0 0 25px ${accent}26)`
                            }}
                        >
                            {data.headline.highlight}
                        </span> {data.headline.suffix}
                    </h1>

                    {/* Descrição */}
                    <div className="reveal-text-p max-w-3xl space-y-6 mb-12">
                        <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
                            {data.description.paragraph1.text} <strong className="text-white font-medium">{data.description.paragraph1.bold}</strong>
                        </p>
                        <p className="text-base md:text-lg text-gray-500 font-light leading-relaxed">
                            {data.description.paragraph2.text} <span style={{ color: accent }}>{data.description.paragraph2.highlight}</span>
                        </p>
                    </div>

                    {/* Features */}
                    <div className="reveal-text-p flex flex-wrap justify-center gap-4 md:gap-6 mt-4">
                        {data.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm">
                                <Icon icon={feature.icon} className="text-xl" style={{ color: accent }} />
                                <span className="text-sm font-medium text-gray-300">{feature.label}</span>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}