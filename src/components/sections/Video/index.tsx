"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useEffect, useState } from "react";
import { Icon } from "@iconify/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Configuração de Engenharia: Endpoint Fixo
const TEGBE_API_URL = "https://tegbe-dashboard.vercel.app/api/tegbe-institucional/video-marketing";

// --- INTERFACE DE DADOS ---
interface ShowcaseData {
    metadata: {
        assets: {
            video_url: string;
        }
    };
    content: {
        headline: {
            line_1: string;
            line_2: { prefix: string; highlight: string; suffix: string; };
            subline: string;
        };
        labels: {
            loading: string;
            error: string;
        }
    };
}

const Showcase = () => {
    const sectionRef = useRef(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [data, setData] = useState<ShowcaseData | null>(null);
    const [mounted, setMounted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showLoading, setShowLoading] = useState(true);
    const [videoError, setVideoError] = useState(false);

    // Fetch de Dados Direto
    useEffect(() => {
        setMounted(true);
        fetch(TEGBE_API_URL)
            .then(res => res.json())
            .then(json => setData(json))
            .catch(err => console.error("Mavellium Sync Error:", err));
    }, []);

    // Detecção de Ambiente
    useEffect(() => {
        const checkIfMobile = () => setIsMobile(window.innerWidth < 1024);
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    // Lógica de Vídeo
    useEffect(() => {
        if (videoRef.current && data) {
            const video = videoRef.current;
            const handleCanPlay = () => {
                setIsVideoLoaded(true);
                setShowLoading(false);
                if (isMobile) {
                    video.pause();
                    setIsPlaying(false);
                } else {
                    video.play().catch(() => setIsPlaying(false));
                }
            };
            const handleError = () => { setVideoError(true); setShowLoading(false); };

            video.addEventListener('canplay', handleCanPlay);
            video.addEventListener('error', handleError);
            video.load();

            return () => {
                video.removeEventListener('canplay', handleCanPlay);
                video.removeEventListener('error', handleError);
            };
        }
    }, [isMobile, data]);

    // Animações GSAP
    useGSAP(() => {
        if (!mounted || !data) return;

        const tl = gsap.timeline({
            scrollTrigger: { trigger: sectionRef.current, start: "top 60%" }
        });

        tl.fromTo(".showcase-line",
            { y: 100, opacity: 0, rotateX: -20 },
            { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.1, ease: "power4.out" }
        );

        if (!isMobile) {
            gsap.fromTo(".play-btn",
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)", delay: 0.5 }
            );
        }
    }, { scope: sectionRef, dependencies: [isMobile, data, mounted] });

    // Prevenção de Crash de Hidratação
    if (!mounted || !data) {
        return <section className="w-full h-screen bg-[#020202]" />;
    }

    return (
        <section ref={sectionRef} className="relative w-full bg-[#020202] overflow-hidden transition-opacity duration-700">
            <div className='relative w-full h-[60vh] md:h-[80vh] lg:h-screen max-h-[1080px]'>
                
                {/* --- MÍDIA --- */}
                <div className="absolute inset-0 w-full h-full">
                    {showLoading && !videoError && (
                        <div className="absolute inset-0 bg-[#020202] z-20 flex items-center justify-center">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-12 h-12 border-2 border-[#E31B63]/20 border-t-[#E31B63] rounded-full animate-spin" />
                                <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em]">{data.content.labels.loading}</p>
                            </div>
                        </div>
                    )}
                    
                    <video 
                        ref={videoRef}
                        src={data.metadata.assets.video_url} 
                        className="w-full h-full object-cover opacity-70"
                        loop muted playsInline
                    />

                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-black/40 z-10" />
                </div>

                {/* --- CONTEÚDO --- */}
                <div className="absolute inset-0 flex items-center justify-center z-20 px-4 pointer-events-none">
                    <h1 className="flex flex-col items-center text-center">
                        <span className="overflow-hidden block">
                            <span className="showcase-line block text-4xl sm:text-6xl md:text-8xl font-bold text-white tracking-tighter leading-none">
                                {data.content.headline.line_1}
                            </span>
                        </span>
                        
                        <span className="overflow-hidden block">
                            <span className="showcase-line block text-4xl sm:text-6xl md:text-8xl font-bold text-white tracking-tighter leading-none">
                                {data.content.headline.line_2.prefix} <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FF0F43] to-[#B3002D] drop-shadow-[0_0_20px_rgba(227,27,99,0.4)]">{data.content.headline.line_2.highlight}</span>{data.content.headline.line_2.suffix}
                            </span>
                        </span>

                        <span className="overflow-hidden block mt-4">
                            <span className="showcase-line block text-lg sm:text-2xl font-light text-gray-400 tracking-[0.4em] uppercase">
                                {data.content.headline.subline}
                            </span>
                        </span>
                    </h1>
                </div>

                {/* --- CONTROLES --- */}
                {isVideoLoaded && !isMobile && (
                    <div className="absolute bottom-10 right-10 z-30 pointer-events-auto">
                        <button
                            onClick={() => {
                                if (isPlaying) videoRef.current?.pause();
                                else videoRef.current?.play();
                                setIsPlaying(!isPlaying);
                            }}
                            className="play-btn group flex items-center justify-center w-16 h-16 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#E31B63]/50 transition-all duration-500 shadow-2xl"
                        >
                            <Icon 
                                icon={isPlaying ? "mdi:pause" : "mdi:play"} 
                                className={`w-8 h-8 transition-colors ${isPlaying ? 'text-white' : 'text-[#E31B63]'}`} 
                            />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Showcase;