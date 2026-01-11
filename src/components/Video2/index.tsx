"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect, useMemo } from "react";
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

interface APIResponse {
  sobre: ShowcaseConfig;
  cursos: ShowcaseConfig;
  defaultSection: string;
}

interface ShowcaseProps {
  endpoint?: string;
  variant?: "sobre" | "cursos";
}

const ShowcaseVideo = ({ 
  endpoint = "https://tegbe-dashboard.vercel.app/api/tegbe-institucional/video-sections", 
  variant = "cursos" 
}: ShowcaseProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoWrapperRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    
    const [mounted, setMounted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [apiData, setApiData] = useState<APIResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setMounted(true);
        const checkIfMobile = () => setIsMobile(window.innerWidth < 1024);
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        const fetchData = async () => {
            try {
                const res = await fetch(endpoint);
                const json = await res.json();
                setApiData(json);
            } catch (error) {
                console.error("Erro ao carregar ShowcaseVideo:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        return () => window.removeEventListener('resize', checkIfMobile);
    }, [endpoint]);

    const config = useMemo(() => {
        if (!apiData) return null;
        return apiData[variant] || apiData.sobre;
    }, [apiData, variant]);

    useGSAP(() => {
        if (!mounted || !containerRef.current || !videoWrapperRef.current || loading || !config) return;

        // Limpa instâncias anteriores para evitar cálculos duplicados no resize
        ScrollTrigger.getAll().filter(st => st.trigger === containerRef.current).forEach(st => st.kill());

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top", 
                end: "+=150%", 
                pin: true, 
                scrub: 1,
                anticipatePin: 1, // Evita o "flash" branco ao travar a seção
                invalidateOnRefresh: true,
            }
        });

        // Header desaparece um pouco mais rápido para foco no vídeo
        tl.to(".section-header", { 
            y: -80, 
            autoAlpha: 0, 
            duration: 0.3, 
            ease: "power2.inOut" 
        }, 0);

        tl.fromTo(videoWrapperRef.current, 
            {
                width: isMobile ? "90%" : "60%", 
                height: "55vh", 
                top: "35%", 
                borderRadius: "32px",
                xPercent: -50,
                boxShadow: config.style.backgroundColor === "#FFFFFF" 
                    ? "0 25px 50px -12px rgba(0, 0, 0, 0.2)" 
                    : "0 25px 50px -12px rgba(0, 0, 0, 0.8)"
            },
            {
                width: "100.1%", // 100.1% evita sub-pixels brancos nas bordas laterais
                height: "100.1%", // Garante cobertura total em telas de alta densidade
                top: "0%", 
                xPercent: -50, 
                borderRadius: "0px",
                boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
                duration: 1,
                ease: "none" // "none" é obrigatório para scrub perfeito sem atraso (lag)
            }, 0 
        );

    }, { scope: containerRef, dependencies: [isMobile, mounted, config, loading] });

    if (loading || !config) return (
      <div className="h-screen bg-[#020202] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#FFD700] border-t-transparent rounded-full animate-spin" />
      </div>
    );

    return (
        <section 
            ref={containerRef} 
            className="relative w-full h-screen overflow-hidden z-30"
            style={{ backgroundColor: config.style.backgroundColor }}
        >
            {/* Header com z-index controlado */}
            <div className="section-header absolute top-[12%] left-0 w-full z-10 flex flex-col items-center text-center px-6 pointer-events-none">
                <div 
                    className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border backdrop-blur-md transition-all duration-500"
                    style={{ backgroundColor: config.style.badgeBg, borderColor: config.style.badgeBorder }}
                >
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: config.style.accentColor }}></span>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]" style={{ color: config.style.badgeText }}>
                        {config.content.badge}
                    </span>
                </div>

                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight" style={{ color: config.style.textColor }}>
                    {config.content.title}
                </h2>
            </div>

            {/* Video Container com backface-visibility para evitar flicker */}
            <div 
                ref={videoWrapperRef}
                className="absolute overflow-hidden bg-black z-20 will-change-[width,height,top] shadow-2xl origin-center"
                style={{ 
                    left: '50%', 
                    transform: 'translateX(-50%)', 
                    top: '35%', 
                    width: isMobile ? '90%' : '60%', 
                    height: '55vh', 
                    borderRadius: '32px',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                }}
            >
                <video 
                    ref={videoRef}
                    src={config.content.videoSrc} 
                    className="w-full h-full object-cover" 
                    autoPlay loop muted playsInline
                    style={{ opacity: 1 }}
                />

                {/* Overlays de Textura e Atmosfera */}
                <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

                {/* Video Controls */}
                <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-30">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (videoRef.current?.paused) { videoRef.current.play(); setIsPlaying(true); }
                            else { videoRef.current?.pause(); setIsPlaying(false); }
                        }}
                        className="group flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full backdrop-blur-md border transition-all duration-500 hover:scale-110 active:scale-90"
                        style={{ 
                            backgroundColor: config.style.backgroundColor === "#FFFFFF" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)",
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