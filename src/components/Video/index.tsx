'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useEffect, useState } from "react";
import { Icon } from "@iconify/react"; // Adicionei para usar ícones mais limpos se precisar

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Showcase = () => {
    const sectionRef = useRef(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showLoading, setShowLoading] = useState(true);
    const [videoError, setVideoError] = useState(false);

    // Detectar Mobile
    useEffect(() => {
        const checkIfMobile = () => setIsMobile(window.innerWidth < 1024);
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    // Fallback do Loading
    useEffect(() => {
        const timer = setTimeout(() => setShowLoading(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    // Lógica de Vídeo Robusta (Mantida e Otimizada)
    useEffect(() => {
        if (videoRef.current) {
            const video = videoRef.current;
            video.preload = 'auto';
            
            const handleCanPlay = () => {
                setIsVideoLoaded(true);
                setShowLoading(false);
                if (isMobile) {
                    video.pause();
                    setIsPlaying(false);
                } else {
                    video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
                }
            };

            const handleStalled = () => {
                if (video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) video.load();
            };

            const handleError = () => {
                setVideoError(true);
                setIsPlaying(false);
                setShowLoading(false);
            };

            video.addEventListener('canplay', handleCanPlay);
            video.addEventListener('loadeddata', handleCanPlay); // Reforço
            video.addEventListener('stalled', handleStalled);
            video.addEventListener('error', handleError);
            
            // Tenta carregar
            if (video.readyState >= 3) handleCanPlay();
            video.load();

            return () => {
                video.removeEventListener('canplay', handleCanPlay);
                video.removeEventListener('loadeddata', handleCanPlay);
                video.removeEventListener('stalled', handleStalled);
                video.removeEventListener('error', handleError);
            };
        }
    }, [isMobile]);

    // Animações GSAP (Tegbe Style)
    useGSAP(() => {
        if (!sectionRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 60%",
            }
        });

        // Título entrando com impacto
        tl.fromTo(".showcase-title .line",
            { y: 100, opacity: 0, rotateX: -20 },
            { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.1, ease: "power4.out" }
        );

        // Botão Play (apenas desktop)
        if (!isMobile) {
            gsap.fromTo(".play-pause-btn",
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)", delay: 0.2 }
            );
        }

    }, { scope: sectionRef, dependencies: [isMobile] });

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
        <section ref={sectionRef} className="relative w-full bg-[#020202] overflow-hidden">
            
            <div className='relative w-full h-[60vh] md:h-[80vh] lg:h-screen max-h-[1080px]'>
                
                {/* --- LAYER 1: VÍDEO & LOADING --- */}
                <div className="absolute inset-0 w-full h-full">
                    
                    {/* Tela de Loading (Estilo Tegbe) */}
                    {showLoading && !videoError && (
                        <div className="absolute inset-0 bg-[#020202] z-20 flex items-center justify-center">
                            <div className="flex flex-col items-center gap-4">
                                {/* Spinner Vermelho */}
                                <div className="w-12 h-12 border-2 border-[#E31B63]/20 border-t-[#E31B63] rounded-full animate-spin" />
                                <p className="text-gray-500 text-xs uppercase tracking-widest animate-pulse">Carregando Experiência...</p>
                            </div>
                        </div>
                    )}
                    
                    {/* Tratamento de Erro */}
                    {videoError && (
                        <div className="absolute inset-0 bg-[#111] z-20 flex items-center justify-center">
                            <p className="text-gray-500 text-sm">Vídeo indisponível no momento.</p>
                        </div>
                    )}
                    
                    <video 
                        ref={videoRef}
                        src='/videos/showcase.webm' 
                        className="w-full h-full object-cover opacity-80" // Opacidade para fundir com o preto
                        loop 
                        muted 
                        playsInline
                    />

                    {/* Overlay de Textura (Noise) - Assinatura Visual */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none z-10"></div>
                    
                    {/* Gradiente para garantir leitura do texto */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-black/40 z-10" />
                </div>

                {/* --- LAYER 2: CONTEÚDO (Texto) --- */}
                <div className="absolute inset-0 flex items-center justify-center z-20 px-4 pointer-events-none">
                    <h1 className="showcase-title flex flex-col items-center text-center">
                        <span className="overflow-hidden block">
                            <span className="line block text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[1.1] drop-shadow-2xl">
                                SE NÃO FOR
                            </span>
                        </span>
                        
                        <span className="overflow-hidden block">
                            <span className="line block text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[1.1] drop-shadow-2xl">
                                PARA <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FF0F43] to-[#B3002D] drop-shadow-[0_0_25px_rgba(227,27,99,0.5)]">GANHAR</span>,
                            </span>
                        </span>

                        <span className="overflow-hidden block mt-2">
                            <span className="line block text-lg sm:text-2xl md:text-3xl font-light text-gray-300 tracking-wide">
                                NEM COMEÇA.
                            </span>
                        </span>
                    </h1>
                </div>

                {/* --- LAYER 3: CONTROLES --- */}
                {isVideoLoaded && !isMobile && !videoError && (
                    <div className="absolute bottom-10 right-10 z-30 hidden lg:block pointer-events-auto">
                        <button
                            className="play-pause-btn group flex items-center justify-center w-16 h-16 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#E31B63]/50 hover:bg-[#E31B63]/10 transition-all duration-300"
                            onClick={togglePlayPause}
                        >
                            <div className="text-white group-hover:text-[#E31B63] transition-colors duration-300">
                                {isPlaying ? (
                                    <Icon icon="mdi:pause" className="w-8 h-8" />
                                ) : (
                                    <Icon icon="mdi:play" className="w-8 h-8 ml-1" />
                                )}
                            </div>
                            
                            {/* Glow Effect no Hover */}
                            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_30px_rgba(227,27,99,0.4)]" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Showcase;