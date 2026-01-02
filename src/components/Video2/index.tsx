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

    // --- DETECÇÃO MOBILE ---
    useEffect(() => {
        const checkIfMobile = () => setIsMobile(window.innerWidth < 1024);
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    // --- ANIMAÇÃO GSAP ---
    useGSAP(() => {
        if (!containerRef.current || !videoWrapperRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top", 
                end: "+=150%", 
                pin: true, 
                scrub: 1, 
            }
        });

        // 1. O Header some (sobe e apaga)
        tl.to(".section-header", {
            y: -100,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in"
        }, 0);

        // 2. O vídeo cresce para ocupar o espaço deixado pelo header
        tl.fromTo(videoWrapperRef.current, 
            {
                width: isMobile ? "90%" : "50%", // Começa menor para dar respiro
                height: isMobile ? "40vh" : "60vh",
                borderRadius: "32px",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
            },
            {
                width: "98%", // Cresce para quase tela cheia
                height: "95vh",
                borderRadius: "24px",
                boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
                duration: 1,
                ease: "power2.inOut"
            }, 
            0 // Começa junto com o header sumindo
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
        // Mudei para justify-start e adicionei padding-top (pt-24) para organizar verticalmente
        <section ref={containerRef} className="relative w-full h-screen bg-[#F5F5F7] overflow-hidden flex flex-col items-center justify-start pt-32 gap-10">
            
            {/* --- HEADER (Agora faz parte do fluxo, não é absolute) --- */}
            <div className="section-header relative z-10 flex flex-col items-center text-center px-6">
                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#0071E3] animate-pulse"></span>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Showcase 2026</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1d1d1f] tracking-tight leading-tight">
                    Bastidores da Performance
                </h2>
            </div>

            {/* --- O CONTAINER DO VÍDEO --- */}
            <div 
                ref={videoWrapperRef}
                className="relative overflow-hidden bg-black z-20 will-change-transform shadow-2xl"
                style={{
                    // Define o tamanho inicial aqui para evitar layout shift
                    width: '50%',
                    height: '60vh',
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

                {/* Overlay sutil (Noise) */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

                {/* BOTÃO PLAY/PAUSE */}
                <div className="absolute bottom-8 right-8 z-30">
                    <button
                        onClick={togglePlayPause}
                        className="group flex items-center justify-center w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black transition-all duration-300 text-white"
                    >
                        {isPlaying ? (
                            <Icon icon="ph:pause-fill" width="24" />
                        ) : (
                            <Icon icon="ph:play-fill" width="24" className="ml-1" />
                        )}
                    </button>
                </div>
            </div>

        </section>
    );
};

export default ShowcaseClean;