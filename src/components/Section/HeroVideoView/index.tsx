"use client";

import { VideoPlayer } from "@/components/ui/videoplayer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface HeroVideoProps {
    // Essenciais
    videoSrc: string;
    line1: string;
    line2: {
        prefix?: string;
        highlight: string;
        suffix?: string;
    };
    subline?: string;

    // Customização (com valores padrão para o seu estilo atual)
    accentColor?: string;
    gradientFrom?: string;
    gradientTo?: string;
    videoOpacity?: number;
    startMuted?: boolean;
}

export const HeroVideoView = ({
    videoSrc,
    line1,
    line2,
    subline,
    accentColor = "#E31B63",
    gradientFrom = "#FF0F43",
    gradientTo = "#B3002D",
    videoOpacity = 0.7,
    startMuted = true
}: HeroVideoProps) => {
    const sectionRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 60%"
            }
        });

        tl.fromTo(".hero-line",
            { y: 100, opacity: 0, rotateX: -20 },
            { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.1, ease: "power4.out" }
        );
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative w-full bg-[#020202] overflow-hidden transition-opacity duration-700">
            {/* Altura Responsiva Padrão */}
            <div className='relative w-full h-[60vh] md:h-[80vh] lg:h-screen max-h-[1080px]'>

                {/* BACKGROUND DINÂMICO */}
                <div className="absolute inset-0 w-full h-full">
                    <VideoPlayer
                        src={videoSrc}
                        accentColor={accentColor}
                        opacity={videoOpacity}
                        startMuted={startMuted}
                        className="w-full h-full"
                    />

                    {/* Efeitos de Textura Fixos (Identidade Visual) */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-black/40 z-10" />
                </div>

                {/* CONTEÚDO */}
                <div className="absolute inset-0 flex items-center justify-center z-20 px-4 pointer-events-none">
                    <h1 className="flex flex-col items-center text-center">
                        <span className="overflow-hidden block">
                            <span className="hero-line block text-4xl sm:text-6xl md:text-8xl font-bold text-white tracking-tighter leading-none uppercase">
                                {line1}
                            </span>
                        </span>

                        <span className="overflow-hidden block">
                            <span className="hero-line block text-4xl sm:text-6xl md:text-8xl font-bold text-white tracking-tighter leading-none uppercase">
                                {line2.prefix}{" "}
                                <span
                                    className="text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(227,27,99,0.4)]"
                                    style={{ backgroundImage: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})` }}
                                >
                                    {line2.highlight}
                                </span>
                                {line2.suffix}
                            </span>
                        </span>

                        {subline && (
                            <span className="overflow-hidden block mt-4">
                                <span className="hero-line block text-lg sm:text-2xl font-light text-gray-400 tracking-[0.4em] uppercase">
                                    {subline}
                                </span>
                            </span>
                        )}
                    </h1>
                </div>
            </div>
        </section>
    );
};