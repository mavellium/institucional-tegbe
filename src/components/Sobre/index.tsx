"use client";

import React, { useRef } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const TegbeAuthoritySection = () => {
    const sectionRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse",
            }
        });

        // Coluna Esquerda (Headline)
        tl.fromTo(".reveal-left", 
            { x: -30, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
        );

        // Coluna Direita (Conteúdo)
        tl.fromTo(".reveal-right",
            { x: 30, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
            "-=0.6"
        );

        // Contador de Dinheiro
        const counter = { val: 0 }; 
        const targetValue = 40; // Ajustado para +40M conforme outros contextos
        
        gsap.to(counter, {
            val: targetValue,
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

    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-24 lg:py-32 bg-[#F5F5F7] overflow-hidden"
        >
            {/* Background Light Clean */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-[#0071E3]/5 to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                
                {/* Badge diferente do anterior para não repetir */}
                <div className="reveal-left opacity-0 mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white shadow-sm">
                    <Icon icon="ph:crown-simple-bold" className="text-[#0071E3] w-4 h-4" />
                    <span className="text-[11px] font-bold tracking-[0.15em] text-gray-500 uppercase font-sans">
                        Liderança & Visão
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    
                    {/* --- Coluna Esquerda: A Tese --- */}
                    <div className="lg:col-span-5 flex flex-col justify-center">
                        <h2 className="reveal-left opacity-0 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-[#1d1d1f] leading-[1.1] mb-6">
                            Não jogamos <br/>
                            com a sorte. <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] to-[#00C6FF]">
                                Jogamos com dados.
                            </span>
                        </h2>
                        
                        {/* Bloco de Autoridade Financeira */}
                        <div className="reveal-left opacity-0 mt-8 pt-8 border-t border-gray-200">
                            <div className="flex items-center gap-4">
                                <div id="counter-money" className="text-4xl lg:text-5xl font-bold text-[#1d1d1f] tracking-tight">
                                    +R$0M
                                </div>
                                <div className="text-sm text-gray-500 leading-tight font-medium">
                                    Faturamento auditado<br/>
                                    gerado para clientes.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- Coluna Direita: O Fundador --- */}
                    <div className="lg:col-span-7 space-y-8 lg:pt-4">
                        
                        {/* Card do Fundador (Destaque Visual) */}
                        <div className="reveal-right opacity-0 bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-white hover:border-[#0071E3]/20 transition-all duration-500 flex gap-5 items-start">
                            <div className="hidden sm:flex flex-shrink-0 w-14 h-14 rounded-full bg-gray-100 items-center justify-center text-[#1d1d1f]">
                                <Icon icon="ph:user-focus-bold" width="28" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-[#1d1d1f] mb-2">A Visão do Fundador</h3>
                                <p className="text-gray-600 leading-relaxed font-light text-[15px]">
                                    "A Tegbe não nasceu em uma sala de aula, mas no campo de batalha. Fundada por <strong>Donizete Caetano</strong>, nossa estrutura é a resposta direta a anos observando o mercado desperdiçar potencial por falta de técnica."
                                </p>
                            </div>
                        </div>

                        {/* Texto de Metodologia */}
                        <div className="reveal-right opacity-0 space-y-6 pl-6 border-l-2 border-[#0071E3]/20">
                            <p className="text-lg text-gray-600 leading-relaxed font-light">
                                Criamos a agência que nós mesmos gostaríamos de contratar. Uma operação onde <span className="text-[#0071E3] font-medium">transparência radical</span> e <span className="text-[#0071E3] font-medium">obsessão por ROI</span> não são diferenciais, são o mínimo aceitável.
                            </p>
                            
                            <p className="text-lg text-gray-600 leading-relaxed font-light">
                                Aqui, tratamos cada real do seu orçamento com o mesmo respeito, rigor e proteção que tratamos o nosso próprio capital.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default TegbeAuthoritySection;