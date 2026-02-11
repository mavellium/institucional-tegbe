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
    const volumeContainerRef = useRef<HTMLDivElement>(null);
    
    const [mounted, setMounted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [apiData, setApiData] = useState<APIResponse | null>(null);
    const [loading, setLoading] = useState(true);
    
    // Controles de som para a variante cursos
    const [isMuted, setIsMuted] = useState(variant === "cursos" ? false : true);
    const [volume, setVolume] = useState(0.1);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const [hasUserInteracted, setHasUserInteracted] = useState(false);

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

    // Efeito para inicializar o volume do vídeo
    useEffect(() => {
        if (videoRef.current && config) {
            videoRef.current.volume = volume;
            
            // Para cursos: começa com som ativo
            if (variant === "cursos") {
                videoRef.current.muted = false;
                // Tenta dar play com som imediatamente
                const playPromise = videoRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Autoplay com som bloqueado, aguardando interação do usuário");
                        // Se falhar, tenta com muted
                        videoRef.current!.muted = true;
                        videoRef.current!.play();
                        setIsMuted(true);
                    });
                }
            } else {
                // Outras variantes: começa muted
                videoRef.current.muted = true;
            }
        }
    }, [config, variant]);

    // Efeito para atualizar volume quando mudar
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume;
            if (volume === 0) {
                videoRef.current.muted = true;
                setIsMuted(true);
            } else if (videoRef.current.muted && volume > 0) {
                videoRef.current.muted = false;
                setIsMuted(false);
            }
        }
    }, [volume]);

    const handleToggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            const newMutedState = !videoRef.current.muted;
            videoRef.current.muted = newMutedState;
            setIsMuted(newMutedState);
            setHasUserInteracted(true);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
            if (newVolume === 0) {
                videoRef.current.muted = true;
                setIsMuted(true);
            } else if (videoRef.current.muted) {
                videoRef.current.muted = false;
                setIsMuted(false);
            }
            setHasUserInteracted(true);
        }
    };

    const handleVolumeMouseEnter = () => {
        if (!isMobile) {
            setShowVolumeSlider(true);
        }
    };

    const handleVolumeMouseLeave = () => {
        if (!isMobile) {
            setShowVolumeSlider(false);
        }
    };

    const handleVolumeButtonClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isMobile) {
            setShowVolumeSlider(!showVolumeSlider);
            setHasUserInteracted(true);
        }
    };

    // Função para dar play com som (tenta desmutar se necessário)
    const handlePlayWithSound = () => {
        if (videoRef.current) {
            // Para cursos, tenta desmutar se estiver muted
            if (variant === "cursos" && videoRef.current.muted) {
                videoRef.current.muted = false;
                setIsMuted(false);
                setHasUserInteracted(true);
            }
            
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    // Fechar volume slider ao clicar fora (apenas mobile)
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (isMobile && volumeContainerRef.current && !volumeContainerRef.current.contains(e.target as Node)) {
                setShowVolumeSlider(false);
            }
        };
        if (isMobile) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [isMobile]);

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
                anticipatePin: 1,
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
                width: "100.1%",
                height: "100.1%",
                top: "0%", 
                xPercent: -50, 
                borderRadius: "0px",
                boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
                duration: 1,
                ease: "none"
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
                    autoPlay 
                    loop 
                    playsInline
                    muted={variant === "cursos" ? false : true}
                    style={{ opacity: 1 }}
                />

                {/* Overlays de Textura e Atmosfera */}
                <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

                {/* Video Controls */}
                <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-30 flex flex-col md:flex-row gap-3 md:gap-4 items-end md:items-center">
                    {/* Controle de volume (apenas para variante cursos) */}
                    {variant === "cursos" && (
                        <div 
                            ref={volumeContainerRef}
                            className="relative"
                            onMouseEnter={handleVolumeMouseEnter}
                            onMouseLeave={handleVolumeMouseLeave}
                        >
                            {(showVolumeSlider) && (
                                <div 
                                    className="absolute bottom-full right-0 mb-2 bg-black/70 backdrop-blur-md rounded-full px-3 py-2 border border-white/20 flex items-center gap-2"
                                    onMouseEnter={handleVolumeMouseEnter}
                                    onMouseLeave={handleVolumeMouseLeave}
                                >
                                    <Icon 
                                        icon="ph:speaker-none-fill" 
                                        className="text-white w-3 h-3 md:w-4 md:h-4 flex-shrink-0" 
                                    />
                                    <input
                                        type="range" 
                                        min="0" 
                                        max="1" 
                                        step="0.1" 
                                        value={volume}
                                        onChange={handleVolumeChange}
                                        className="w-16 md:w-20 h-1 bg-white/20 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white cursor-pointer"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    <Icon 
                                        icon="ph:speaker-high-fill" 
                                        className="text-white w-3 h-3 md:w-4 md:h-4 flex-shrink-0" 
                                    />
                                </div>
                            )}
                            
                            <button
                                onClick={isMobile ? handleVolumeButtonClick : handleToggleMute}
                                className="group flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-110 active:scale-90"
                                style={{ 
                                    backgroundColor: config.style.backgroundColor === "#FFFFFF" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)",
                                    borderColor: config.style.accentColor,
                                    color: config.style.accentColor 
                                }}
                            >
                                <Icon 
                                    icon={
                                        isMuted ? "ph:speaker-none-fill" : 
                                        volume < 0.5 ? "ph:speaker-low-fill" : "ph:speaker-high-fill"
                                    } 
                                    className="w-4 h-4 md:w-5 md:h-5" 
                                />
                            </button>
                        </div>
                    )}
                    
                    {/* Botão de play/pause */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (videoRef.current?.paused) { 
                                // Para cursos, tenta tocar com som
                                if (variant === "cursos") {
                                    handlePlayWithSound();
                                } else {
                                    videoRef.current.play();
                                    setIsPlaying(true);
                                }
                            } else { 
                                videoRef.current?.pause(); 
                                setIsPlaying(false); 
                            }
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

                {/* Indicador de áudio para cursos */}
                {variant === "cursos" && !showVolumeSlider && isPlaying && (
                    <div className="absolute bottom-24 md:bottom-28 right-6 md:right-10 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 border border-white/10 z-10">
                        <span className="text-[10px] md:text-xs text-white/80 flex items-center gap-1">
                            <Icon 
                                icon={isMuted ? "ph:speaker-none-fill" : volume < 0.5 ? "ph:speaker-low-fill" : "ph:speaker-high-fill"} 
                                className="w-2 h-2 md:w-3 md:h-3" 
                            />
                            <span className="hidden md:inline">
                                {isMuted ? 'Mudo' : `${Math.round(volume * 100)}%`}
                            </span>
                        </span>
                    </div>
                )}

                {/* Aviso sobre interação necessária para som (apenas se ainda não interagiu) */}
                {variant === "cursos" && !hasUserInteracted && isMuted && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-yellow-500/30">
                        <span className="text-[10px] md:text-xs text-yellow-300 flex items-center gap-2">
                            <Icon icon="ph:speaker-simple-slash" className="w-3 h-3" />
                            Clique para ativar o som
                        </span>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ShowcaseVideo;