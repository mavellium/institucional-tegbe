"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from "react";
import { Icon } from "@iconify/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ShowcaseClean = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoWrapperRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => setIsMobile(window.innerWidth < 1024);
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    useGSAP(() => {
        if (!containerRef.current || !videoWrapperRef.current) return;

        // Centraliza horizontalmente via GSAP logo de cara para evitar conflito com CSS
        gsap.set(videoWrapperRef.current, { xPercent: -50, left: "50%" });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top", 
                end: "+=200%", 
                pin: true, 
                scrub: 1, 
            }
        });

        // 1. O Header Sobe
        tl.to(".section-header", {
            y: -150,
            autoAlpha: 0,
            duration: 0.4,
            ease: "power2.in"
        }, 0);

        // 2. O Vídeo expande (Controle total de Height/Top)
        tl.fromTo(videoWrapperRef.current, 
            {
                // ESTADO INICIAL (CSS Match)
                width: isMobile ? "90%" : "60%", 
                height: "55vh", // Altura fixa inicial (resolve o bug da linha fina)
                top: "35%", // Posição inicial (abaixo do header)
                borderRadius: "32px",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            },
            {
                // ESTADO FINAL (Full Screen)
                width: "100vw", // Largura total da viewport
                height: "100vh", // Altura total da viewport
                top: "0%", // Cola no topo
                borderRadius: "0px",
                boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
                duration: 1,
                ease: "power2.inOut"
            }, 
            0 
        );

    }, { scope: containerRef, dependencies: [isMobile] });

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
            } else {
                videoRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    return (
        <section ref={containerRef} className="relative w-full h-screen bg-[#F5F5F7] overflow-hidden">
            
            {/* --- HEADER (FIXO NO TOPO) --- */}
            <div className="section-header absolute top-[10%] left-0 w-full z-10 flex flex-col items-center text-center px-6 pointer-events-none">
                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#0071E3] animate-pulse"></span>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Showcase 2026</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1d1d1f] tracking-tight leading-tight">
                    Bastidores da Performance
                </h2>
            </div>

            {/* --- CONTAINER DO VÍDEO --- */}
            <div 
                ref={videoWrapperRef}
                // REMOVIDO: aspect-video, translate-x/y do CSS
                // ADICIONADO: invisible no inicio para o GSAP assumir o controle sem flash
                className="absolute overflow-hidden bg-black z-20 will-change-transform shadow-2xl origin-center"
                style={{
                    // CSS de fallback idêntico ao estado inicial do GSAP
                    left: '50%',
                    transform: 'translateX(-50%)', // Centralização simples CSS
                    top: '35%',
                    width: '60%',
                    height: '55vh', // Altura explícita
                    borderRadius: '32px'
                }}
            >
                {/* O VÍDEO */}
                <video 
                    ref={videoRef}
                    src='/videos/showcase.webm' 
                    className="w-full h-full object-cover" 
                    autoPlay
                    loop 
                    muted 
                    playsInline
                />

                {/* Overlay Noise */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

                {/* Botão Play */}
                <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-30">
                    <button
                        onClick={togglePlayPause}
                        className="group flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black transition-all duration-300 text-white shadow-lg"
                    >
                        {isPlaying ? (
                            <Icon icon="ph:pause-fill" className="w-5 h-5 md:w-6 md:h-6" />
                        ) : (
                            <Icon icon="ph:play-fill" className="w-5 h-5 md:w-6 md:h-6 ml-1" />
                        )}
                    </button>
                </div>
            </div>

        </section>
    );
};

export default ShowcaseClean;