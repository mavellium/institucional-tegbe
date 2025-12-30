"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function WhyTegbeRefined() {
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
            className="py-24 w-full flex flex-col justify-center items-center bg-[#F4F4F4] px-6 relative"
        >
            {/* Luzes de Fundo - Mantidas sutis */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#0071E3]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container max-w-5xl relative z-10">
                <div className="flex flex-col items-center text-center w-full">

                    {/* Badge Minimalista */}
                    <div className="reveal-text mb-6 flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/5">
                        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#0071E3] to-[#00a2ff] animate-pulse"></span>
                        <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">
                            Método Validado Tegbe
                        </span>
                    </div>

                    <h1 className="reveal-text font-bold text-3xl sm:text-5xl md:text-6xl mb-6 leading-tight tracking-tight text-black max-w-4xl">
                        Por que vender com a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] to-[#00a2ff]">Tegbe</span> e não sozinho?
                    </h1>

                    <div className="reveal-text max-w-2xl space-y-5 mb-10">
                        <p className="text-lg md:text-xl text-black-900 font-light leading-relaxed">
                            Vender sozinho é tentar a sorte. Com a Tegbe, você aplica o método que destrava o faturamento e domina o algoritmo do Mercado Livre.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}