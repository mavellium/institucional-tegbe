"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";
import Logos from "@/components/Logos";
import LogosInvert from "@/components/Logos/LogosInvert";

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
                            Empresas que confiam na Tegbe
                        </span>
                    </div>

                    <h1 className="reveal-text font-bold text-3xl sm:text-5xl md:text-6xl mb-6 leading-tight tracking-tight text-black max-w-4xl">
                        Eles <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] to-[#00a2ff]">confiaram</span> e estão nadando de braçadas
                    </h1>

                    <Logos />
                    <LogosInvert />
                    <div className="flex flex-col items-center text-center w-full px-4 sm:px-6 lg:px-8">

                        <h1 className="reveal-text font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-5 md:mb-6 leading-tight tracking-tight text-black max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto">
                            A Tegbe <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] to-[#00a2ff]">não</span> é para você se...
                        </h1>

                        <div className="reveal-text max-w-sm sm:max-w-2xl md:max-w-3xl w-full mb-8 sm:mb-10 space-y-4 sm:space-y-5">
                            <p className="text-sm sm:text-md md:text-lg lg:text-xl text-gray-700 font-light leading-relaxed text-center flex flex-col space-y-3 sm:space-y-4">
                                <span className="block">
                                    Você quer apenas "postar no Instagram" e não se preocupa com vendas.
                                </span>
                                <span className="block">
                                    Você prefere seguir o "achismo" a aceitar dados e estratégias comprovadas.
                                </span>
                                <span className="block">
                                    Seu negócio não quer crescer, apenas se manter na zona de conforto.
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}