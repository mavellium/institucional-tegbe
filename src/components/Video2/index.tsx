"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from "react";
import { Icon } from "@iconify/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ShowcaseConfig {
  content: { badge: string; title: string; videoSrc: string; };
  style: {
    backgroundColor: string; textColor: string;
    badgeBg: string; badgeBorder: string; badgeText: string;
    accentColor: string;
  };
}

const FALLBACKS: Record<string, ShowcaseConfig> = {
    sobre: {
        content: { badge: "Nossa História", title: "A excelência como único padrão", videoSrc: "/videos/sobre.mp4" },
        style: { backgroundColor: "#FFFFFF", textColor: "#020202", badgeBg: "rgba(255, 215, 0, 0.1)", badgeBorder: "rgba(255, 215, 0, 0.3)", badgeText: "#B8860B", accentColor: "#FFD700" }
    },
    cursos: {
        content: { badge: "Metodologia", title: "Aprenda com quem faz", videoSrc: "/videos/cursos.mp4" },
        style: { backgroundColor: "#020202", textColor: "#FFFFFF", badgeBg: "rgba(255, 215, 0, 0.05)", badgeBorder: "rgba(255, 215, 0, 0.2)", badgeText: "#FFD700", accentColor: "#FFD700" }
    }
};

interface ShowcaseProps {
  endpoint?: string;
  variant?: "sobre" | "cursos";
}

const ShowcaseVideo = ({ endpoint, variant = "cursos" }: ShowcaseProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoWrapperRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    
    const [mounted, setMounted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    
    const initialData = FALLBACKS[variant] || FALLBACKS.cursos;
    const [config, setConfig] = useState<ShowcaseConfig>(initialData);

    useEffect(() => {
        setMounted(true);
        const checkIfMobile = () => setIsMobile(window.innerWidth < 1024);
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        if (endpoint) {
            fetch(endpoint)
                .then(res => res.json())
                .then(json => setConfig(json))
                .catch(() => setConfig(initialData));
        }
        return () => window.removeEventListener('resize', checkIfMobile);
    }, [endpoint, variant, initialData]);

    useGSAP(() => {
        if (!mounted || !containerRef.current || !videoWrapperRef.current) return;

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

        tl.to(".section-header", { y: -150, autoAlpha: 0, duration: 0.4, ease: "power2.in" }, 0);

        tl.fromTo(videoWrapperRef.current, 
            {
                width: isMobile ? "90%" : "60%", 
                height: "55vh", 
                top: "35%", 
                borderRadius: "32px",
                xPercent: -50, 
                // Ajuste de sombra baseado no fundo para manter o "pop"
                boxShadow: config.style.backgroundColor === "#FFFFFF" 
                    ? "0 25px 50px -12px rgba(0, 0, 0, 0.2)" 
                    : "0 25px 50px -12px rgba(0, 0, 0, 0.8)"
            },
            {
                width: "100vw", 
                height: "100vh", 
                top: "0%", 
                xPercent: -50, 
                borderRadius: "0px",
                boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
                duration: 1,
                ease: "power2.inOut"
            }, 0 
        );

    }, { scope: containerRef, dependencies: [isMobile, mounted, config] });

    return (
        <section 
            ref={containerRef} 
            className={`relative w-full h-screen overflow-hidden transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundColor: config.style.backgroundColor }}
        >
            <div className="section-header absolute top-[10%] left-0 w-full z-10 flex flex-col items-center text-center px-6 pointer-events-none">
                <div 
                    className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border backdrop-blur-md transition-all duration-500"
                    style={{ backgroundColor: config.style.badgeBg, borderColor: config.style.badgeBorder }}
                >
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: config.style.accentColor }}></span>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]" style={{ color: config.style.badgeText }}>
                        {config.content.badge}
                    </span>
                </div>

                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight transition-colors duration-500" style={{ color: config.style.textColor }}>
                    {config.content.title}
                </h2>
            </div>

            <div 
                ref={videoWrapperRef}
                className="absolute overflow-hidden bg-black z-20 will-change-transform shadow-2xl origin-center"
                style={{ left: '50%', transform: 'translateX(-50%)', top: '35%', width: isMobile ? '90%' : '60%', height: '55vh', borderRadius: '32px' }}
            >
                <video 
                    ref={videoRef}
                    src={config.content.videoSrc} 
                    className="w-full h-full object-cover opacity-90" 
                    autoPlay loop muted playsInline
                />

                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

                <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-30">
                    <button
                        onClick={() => {
                            if (videoRef.current?.paused) { videoRef.current.play(); setIsPlaying(true); }
                            else { videoRef.current?.pause(); setIsPlaying(false); }
                        }}
                        className="group flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full backdrop-blur-md border transition-all duration-500 shadow-2xl"
                        style={{ 
                            backgroundColor: config.style.backgroundColor === "#FFFFFF" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.1)",
                            borderColor: config.style.accentColor,
                            color: config.style.accentColor 
                        }}
                    >
                        <Icon icon={isPlaying ? "ph:pause-fill" : "ph:play-fill"} className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ShowcaseVideo;