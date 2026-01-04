"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from "react";
import { Icon } from "@iconify/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- TIPAGEM DA CONFIGURAÇÃO (INTERFACE) ---
export interface ShowcaseConfig {
  content: {
    badge: string;
    title: string;
    videoSrc: string;
  };
  style: {
    backgroundColor: string; // Cor de fundo da seção
    textColor: string;       // Cor do título
    badgeBg: string;         // Fundo da badge
    badgeBorder: string;     // Borda da badge
    badgeText: string;       // Texto da badge
    accentColor: string;     // Cor do "ponto" pulsante e ícones
  };
}

interface ShowcaseProps {
  config: ShowcaseConfig;
}

const ShowcaseVideo = ({ config }: ShowcaseProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoWrapperRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // Detecção de Mobile para ajustar o tamanho inicial do vídeo
    useEffect(() => {
        const checkIfMobile = () => setIsMobile(window.innerWidth < 1024);
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    useGSAP(() => {
        if (!containerRef.current || !videoWrapperRef.current) return;

        // SET Inicial: Garante centralização
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

        // 1. O Header Sobe e desaparece
        tl.to(".section-header", {
            y: -150,
            autoAlpha: 0,
            duration: 0.4,
            ease: "power2.in"
        }, 0);

        // 2. O Vídeo expande (Efeito Showcase)
        tl.fromTo(videoWrapperRef.current, 
            {
                // ESTADO INICIAL 
                width: isMobile ? "90%" : "60%", 
                height: "55vh", 
                top: "35%", 
                borderRadius: "32px",
                xPercent: -50, 
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" // Sombra mais forte para dark mode
            },
            {
                // ESTADO FINAL (Full Screen)
                width: "100vw", 
                height: "100vh", 
                top: "0%", 
                xPercent: -50, 
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
        <section 
            ref={containerRef} 
            className="relative w-full h-screen overflow-hidden transition-colors duration-500"
            style={{ backgroundColor: config.style.backgroundColor }}
        >
            
            {/* --- HEADER --- */}
            <div className="section-header absolute top-[10%] left-0 w-full z-10 flex flex-col items-center text-center px-6 pointer-events-none">
                
                {/* Badge Dinâmica */}
                <div 
                    className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md transition-colors"
                    style={{ 
                        backgroundColor: config.style.badgeBg,
                        borderColor: config.style.badgeBorder,
                        borderWidth: '1px'
                    }}
                >
                    <span 
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: config.style.accentColor }}
                    ></span>
                    <span 
                        className="text-[10px] md:text-xs font-bold uppercase tracking-widest"
                        style={{ color: config.style.badgeText }}
                    >
                        {config.content.badge}
                    </span>
                </div>

                {/* Título Dinâmico */}
                <h2 
                    className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight transition-colors"
                    style={{ color: config.style.textColor }}
                >
                    {config.content.title}
                </h2>
            </div>

            {/* --- CONTAINER DO VÍDEO --- */}
            <div 
                ref={videoWrapperRef}
                className="absolute overflow-hidden bg-black z-20 will-change-transform shadow-2xl origin-center"
                style={{
                    // CSS Fallback
                    left: '50%',
                    transform: 'translateX(-50%)', 
                    top: '35%',
                    width: '60%',
                    height: '55vh', 
                    borderRadius: '32px'
                }}
            >
                {/* O VÍDEO */}
                <video 
                    ref={videoRef}
                    src={config.content.videoSrc} 
                    className="w-full h-full object-cover" 
                    autoPlay
                    loop 
                    muted 
                    playsInline
                />

                {/* Overlay Noise (Textura Premium) */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

                {/* Botão Play (Estilizado para combinar com o tema) */}
                <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-30">
                    <button
                        onClick={togglePlayPause}
                        className="group flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black transition-all duration-300 text-white shadow-lg"
                        style={{ borderColor: config.style.accentColor }} // Borda sutil na cor do tema
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

export default ShowcaseVideo;