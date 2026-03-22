"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useApi } from "@/hooks/useApi";

// --- TIPAGEM ---
export type CaseType = 'video' | 'image' | 'text';

export interface ClientCase {
  id: string;
  type: CaseType;
  clientName: string;
  clientRole: string;
  description: string;
  src?: string;
  poster?: string;
  stats?: {
    value: string;
    label: string;
  };
}

export interface FooterStat {
  id?: string;
  value: string;
  label: string;
  icon?: string;
  color?: string;
}

export interface TestimonialsData {
  badge: string;
  titulo: string;
  subtitulo: string;
  showStats: boolean;
  textColor: string;
  backgroundColor: string;
  testimonials: ClientCase[];
  footerStats?: FooterStat[];
}

interface CasesCarouselProps {
  data?: TestimonialsData | null;
  endpoint?: string;
}

function normalizeTestimonialsPayload(raw: unknown): TestimonialsData | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const inner = o.data;
  if (
    inner &&
    typeof inner === "object" &&
    "testimonials" in inner &&
    Array.isArray((inner as { testimonials?: unknown }).testimonials)
  ) {
    return inner as unknown as TestimonialsData;
  }
  if ("testimonials" in o && Array.isArray((o as { testimonials?: unknown }).testimonials)) {
    return raw as TestimonialsData;
  }
  return null;
}

interface VideoCardProps {
  data: ClientCase;
  isActive: boolean;
  isDimmed: boolean;
  onPlay: (id: string) => void;
  onPause: (id: string) => void;
}

interface ImageCardProps {
  data: ClientCase;
  isDimmed: boolean;
}

interface TextCardProps {
  data: ClientCase;
  isDimmed: boolean;
}

// --- CARDS ---
const VideoCard = ({ data, isActive, isDimmed, onPlay, onPause }: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [videoClicked, setVideoClicked] = useState(false);
  const [isHoveringVolume, setIsHoveringVolume] = useState(false);
  const playButtonRef = useRef<HTMLDivElement>(null);
  const volumeContainerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive && isPlaying && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowInfo(true);
    }
  }, [isActive]);

  useEffect(() => {
    if (isPlaying) {
      onPlay(data.id);
    } else {
      onPause(data.id);
    }
  }, [isPlaying, data.id, onPlay, onPause]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
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
    }
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    if (volumeContainerRef.current && volumeContainerRef.current.contains(e.target as Node)) return;
    if (playButtonRef.current && playButtonRef.current.contains(e.target as Node)) return;

    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        setShowInfo(true);
      } else {
        if (videoRef.current.muted) {
          videoRef.current.muted = false;
          setIsMuted(false);
        }
        videoRef.current.play();
        setIsPlaying(true);
        setHasUserInteracted(true);
        setShowInfo(false);
      }
      setVideoClicked(true);
      setTimeout(() => setVideoClicked(false), 300);
    }
  };

  const handlePlayButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        setShowInfo(true);
      } else {
        if (videoRef.current.muted) {
          videoRef.current.muted = false;
          setIsMuted(false);
        }
        videoRef.current.play();
        setIsPlaying(true);
        setHasUserInteracted(true);
        setShowInfo(false);
      }
      setVideoClicked(true);
      setTimeout(() => setVideoClicked(false), 300);
    }
  };

  const handleVolumeMouseEnter = () => {
    if (!isMobile) {
      setIsHoveringVolume(true);
      setShowVolumeSlider(true);
    }
  };

  const handleVolumeMouseLeave = () => {
    if (!isMobile) {
      setIsHoveringVolume(false);
      setTimeout(() => {
        if (!isHoveringVolume) setShowVolumeSlider(false);
      }, 300);
    }
  };

  const handleSliderMouseEnter = () => setIsHoveringVolume(true);
  const handleSliderMouseLeave = () => {
    setIsHoveringVolume(false);
    setTimeout(() => {
      if (!isHoveringVolume) setShowVolumeSlider(false);
    }, 300);
  };

  const handleVolumeButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMobile) setShowVolumeSlider(!showVolumeSlider);
  };

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

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setShowInfo(true);
  };
  const handleVideoPause = () => {
    setIsPlaying(false);
    setShowInfo(true);
  };
  const handleVideoPlayEvent = () => {
    setIsPlaying(true);
    setShowInfo(false);
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (videoRef.current && document.hidden) {
        videoRef.current.pause();
        setIsPlaying(false);
        setShowInfo(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <div
      ref={videoContainerRef}
      className={`
        relative w-[280px] xs:w-[300px] sm:w-[320px] md:w-[350px] lg:w-[400px] 
        h-[380px] xs:h-[420px] sm:h-[450px] md:h-[480px] lg:h-[500px] 
        flex-shrink-0 overflow-hidden rounded-2xl sm:rounded-[1.5rem] lg:rounded-[2rem] 
        group cursor-pointer border border-white/5 hover:border-[#FFD700]/30 
        transition-all duration-300
        ${isDimmed ? 'opacity-40 brightness-50 grayscale-[30%]' : ''}
      `}
      onClick={handleVideoClick}
    >
      {data.src ? (
        <video
          ref={videoRef}
          src={data.src}
          poster={data.poster}
          playsInline
          loop
          className={`w-full h-full object-cover ${videoClicked ? 'scale-[1.02]' : 'scale-100'} transition-transform duration-300`}
          preload={isMobile ? "none" : "metadata"}
          onEnded={handleVideoEnded}
          onPause={handleVideoPause}
          onPlay={handleVideoPlayEvent}
        />
      ) : (
        <div className="w-full h-full bg-[#0A0A0A] flex items-center justify-center border border-white/5">
          <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-full border border-[#FFD700]/20 animate-pulse" />
        </div>
      )}
      <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity duration-300 ${showInfo ? 'opacity-80' : 'opacity-0'}`} />
      <div
        ref={volumeContainerRef}
        className={`absolute top-2 xs:top-3 sm:top-4 right-2 xs:right-3 sm:right-4 z-20 flex items-center gap-2 transition-all duration-300 ${isPlaying || showVolumeSlider ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onMouseEnter={handleVolumeMouseEnter}
        onMouseLeave={handleVolumeMouseLeave}
      >
        {(showVolumeSlider || isMobile) && (
          <div
            className="bg-black/70 backdrop-blur-md rounded-full px-3 py-2 border border-white/20 flex items-center gap-2"
            onMouseEnter={handleSliderMouseEnter}
            onMouseLeave={handleSliderMouseLeave}
          >
            <Icon icon="ph:speaker-none-fill" className="text-white w-3 h-3 xs:w-4 xs:h-4 flex-shrink-0" />
            <input
              type="range" min="0" max="1" step="0.1" value={volume}
              onChange={handleVolumeChange}
              className="w-16 xs:w-20 sm:w-24 h-1 bg-white/20 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            />
            <Icon icon="ph:speaker-high-fill" className="text-white w-3 h-3 xs:w-4 xs:h-4 flex-shrink-0" />
          </div>
        )}
        <div
          className="w-8 h-8 xs:w-9 xs:h-9 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 hover:border-[#FFD700]/50 transition-all cursor-pointer"
          onClick={isMobile ? handleVolumeButtonClick : handleToggleMute}
          onMouseEnter={() => !isMobile && setShowVolumeSlider(true)}
        >
          <Icon icon={videoRef.current?.muted ? "ph:speaker-none-fill" : volume < 0.5 ? "ph:speaker-low-fill" : "ph:speaker-high-fill"} className="text-white w-3 h-3 xs:w-4 xs:h-4" />
        </div>
      </div>
      <div
        ref={playButtonRef}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-[#FFD700]/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 border border-[#FFD700]/30 cursor-pointer z-20 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        onClick={handlePlayButtonClick}
      >
        <Icon icon="ph:play-fill" className="text-[#FFD700] w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
      </div>
      {isMobile && !hasUserInteracted && (
        <div className="absolute top-2 xs:top-3 sm:top-4 left-2 xs:left-3 sm:left-4 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 xs:px-3 xs:py-1 border border-white/10 z-10">
          <span className="text-[10px] xs:text-xs text-white/80 flex items-center gap-1">
            <Icon icon="ph:hand-tap" className="w-2 h-2 xs:w-3 xs:h-3" />
            <span className="hidden xs:inline">Toque para play</span>
            <span className="xs:hidden">Play</span>
          </span>
        </div>
      )}
      <div className={`absolute bottom-0 left-0 w-full p-4 xs:p-5 sm:p-6 md:p-8 text-white z-10 transition-all duration-300 ${showInfo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {data.stats && data.stats.value && (
          <div className="mb-2 xs:mb-3 sm:mb-4 inline-flex flex-col border-l-2 border-[#FFD700] pl-2 xs:pl-3 bg-black/20 backdrop-blur-sm pr-3 xs:pr-4 py-1 rounded-r-lg">
            <span className="text-lg xs:text-xl sm:text-2xl font-bold tracking-tight text-[#FFD700]">{data.stats.value}</span>
            <span className="text-[8px] xs:text-[9px] sm:text-[10px] text-gray-300 uppercase tracking-widest">{data.stats.label}</span>
          </div>
        )}
        <p className="text-xs xs:text-sm sm:text-base font-medium leading-relaxed mb-2 xs:mb-3 sm:mb-4 line-clamp-3 text-gray-200">"{data.description}"</p>
        <div className="flex items-center gap-2 xs:gap-3">
          <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] xs:text-xs font-bold text-[#FFD700]">
            {data.clientName.charAt(0)}
          </div>
          <div>
            <p className="text-xs xs:text-sm font-bold text-white">{data.clientName}</p>
            <p className="text-[8px] xs:text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wider">{data.clientRole}</p>
          </div>
        </div>
      </div>
      {isPlaying && !showInfo && !showVolumeSlider && (
        <div className="absolute bottom-3 xs:bottom-4 right-3 xs:right-4 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 border border-white/10 z-10">
          <span className="text-[10px] xs:text-xs text-white/80 flex items-center gap-1">
            <Icon icon={videoRef.current?.muted ? "ph:speaker-none-fill" : volume < 0.5 ? "ph:speaker-low-fill" : "ph:speaker-high-fill"} className="w-2 h-2 xs:w-3 xs:h-3" />
            <span className="hidden xs:inline">{videoRef.current?.muted ? 'Mudo' : `${Math.round(volume * 100)}%`}</span>
          </span>
        </div>
      )}
      {videoClicked && <div className="absolute inset-0 border-2 border-[#FFD700]/50 rounded-2xl sm:rounded-[1.5rem] lg:rounded-[2rem] pointer-events-none animate-ping z-10" />}
    </div>
  );
};

const ImageCard = ({ data, isDimmed }: ImageCardProps) => (
  <div
    className={`
      relative w-[280px] xs:w-[300px] sm:w-[320px] md:w-[350px] lg:w-[400px] 
      h-[380px] xs:h-[420px] sm:h-[450px] md:h-[480px] lg:h-[500px] 
      flex-shrink-0 overflow-hidden rounded-2xl sm:rounded-[1.5rem] lg:rounded-[2rem] 
      group bg-[#0A0A0A] border border-white/10 hover:border-[#FFD700]/30 
      transition-all duration-300
      ${isDimmed ? 'opacity-40 brightness-50 grayscale-[30%]' : ''}
    `}
  >
    <div className="absolute inset-0 h-[65%] overflow-hidden">
      {data.src ? (
        <Image src={data.src} alt={data.clientName} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
      ) : (
        <div className="w-full h-full bg-neutral-900 flex items-center justify-center"><span className="text-white/20 text-xs">Premium Content</span></div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0A0A] opacity-100" />
    </div>
    <div className="absolute bottom-0 left-0 w-full h-[40%] bg-[#0A0A0A] p-4 xs:p-5 sm:p-6 md:p-8 flex flex-col justify-between rounded-t-2xl sm:rounded-t-[1.5rem] lg:rounded-t-[2rem] border-t border-white/5">
      <div>
        {data.stats && data.stats.value && (
          <div className="absolute -top-6 xs:-top-7 sm:-top-8 md:-top-9 lg:-top-10 right-3 xs:right-4 sm:right-6 md:right-8 bg-[#FFD700] text-black px-2 py-1 xs:px-3 xs:py-1 sm:px-3 sm:py-2 rounded-lg xs:rounded-xl shadow-[0_0_20px_rgba(255,215,0,0.2)]">
            <p className="text-sm xs:text-base sm:text-lg font-bold">{data.stats.value}</p>
            <p className="text-[7px] xs:text-[8px] sm:text-[9px] uppercase font-bold opacity-70">{data.stats.label}</p>
          </div>
        )}
        <Icon icon="ph:quotes-fill" className="text-gray-700 w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mb-1 xs:mb-2" />
        <p className="text-xs xs:text-sm text-gray-300 leading-relaxed line-clamp-3">{data.description}</p>
      </div>
      <div className="pt-3 xs:pt-4 border-t border-white/5 mt-1 xs:mt-2 flex items-center gap-2 xs:gap-3">
        <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] xs:text-xs font-bold text-gray-500">{data.clientName.charAt(0)}</div>
        <div>
          <p className="text-xs xs:text-sm font-bold text-white">{data.clientName}</p>
          <p className="text-[8px] xs:text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wider">{data.clientRole}</p>
        </div>
      </div>
    </div>
  </div>
);

const TextCard = ({ data, isDimmed }: TextCardProps) => (
  <div
    className={`
      relative w-[240px] xs:w-[260px] sm:w-[280px] md:w-[300px] lg:w-[350px] 
      h-[380px] xs:h-[420px] sm:h-[450px] md:h-[480px] lg:h-[500px] 
      flex-shrink-0 bg-[#0A0A0A] rounded-2xl sm:rounded-[1.5rem] lg:rounded-[2rem] 
      border border-white/10 p-4 xs:p-5 sm:p-6 md:p-8 flex flex-col justify-between 
      group hover:border-[#FFD700]/30 hover:bg-[#0f0f0f] transition-all duration-300
      ${isDimmed ? 'opacity-40 brightness-50 grayscale-[30%]' : ''}
    `}
  >
    <div>
      <div className="mb-4 xs:mb-5 sm:mb-6 md:mb-8 w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center text-[#FFD700]">
        <Icon icon="ph:chat-teardrop-text-bold" className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
      </div>
      {data.stats && data.stats.value && (
        <div className="mb-3 xs:mb-4 sm:mb-5 md:mb-6">
          <span className="text-xl xs:text-2xl sm:text-3xl font-bold text-white block">{data.stats.value}</span>
          <span className="text-[10px] xs:text-xs text-gray-500 uppercase tracking-wider">{data.stats.label}</span>
        </div>
      )}
      <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed font-light italic">"{data.description}"</p>
    </div>
    <div className="flex items-center gap-2 xs:gap-3 mt-4 xs:mt-5 sm:mt-6 md:mt-8 pt-3 xs:pt-4 sm:pt-5 md:pt-6 border-t border-white/5">
      <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#222] border border-white/10 flex items-center justify-center text-[10px] xs:text-xs font-bold text-gray-400">{data.clientName.charAt(0)}</div>
      <div>
        <p className="text-xs xs:text-sm font-bold text-white">{data.clientName}</p>
        <p className="text-[8px] xs:text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wider">{data.clientRole}</p>
      </div>
    </div>
  </div>
);

// --- COMPONENTE PRINCIPAL (CARROSSEL) ---
export default function CasesCarousel({ data: dataProp, endpoint }: CasesCarouselProps) {
  const { data: apiRaw, loading: apiLoading } = useApi<unknown>(endpoint ?? "");
  const data = useMemo(() => {
    if (dataProp) return dataProp;
    if (!endpoint) return null;
    return normalizeTestimonialsPayload(apiRaw);
  }, [dataProp, apiRaw, endpoint]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState(0);
  const [loadedCount, setLoadedCount] = useState(5); // quantidade inicial de itens renderizados
  const [isMobile, setIsMobile] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  // Motion value para monitorar a posição X do arrasto
  const x = useMotionValue(0);

  // Detectar mobile e definir quantidade inicial de itens
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    // Define a quantidade inicial baseada no tamanho da tela
    const setInitialCount = () => {
      if (window.innerWidth < 640) setLoadedCount(3);
      else if (window.innerWidth < 1024) setLoadedCount(4);
      else setLoadedCount(5);
    };
    setInitialCount();

    // Mostra o guia visual após um pequeno delay
    const timer = setTimeout(() => {
      setShowGuide(true);
    }, 1500);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
      clearTimeout(timer);
    };
  }, []);

  // Recalcula a largura total do track sempre que loadedCount mudar
  useEffect(() => {
    const updateWidth = () => {
      if (trackRef.current && wrapperRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const wrapperWidth = wrapperRef.current.offsetWidth;
        const newWidth = trackWidth - wrapperWidth;
        setWidth(newWidth > 0 ? newWidth : 0);
      }
    };

    const timer = setTimeout(updateWidth, 100);
    window.addEventListener('resize', updateWidth);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateWidth);
    };
  }, [loadedCount, isMobile, data]); // Adicionado loadedCount como dependência

  const handlePlayVideo = (id: string) => {
    setActiveVideoId(id);
    setShowGuide(false);
  };

  const handlePauseVideo = (id: string) => {
    if (activeVideoId === id) {
      setActiveVideoId(null);
    }
  };

  const handleDragStart = () => {
    setShowGuide(false);
  };

  // Função para carregar mais itens
  const loadMore = () => {
    if (!data) return;
    const step = isMobile ? 2 : 3;
    setLoadedCount(prev => Math.min(prev + step, data.testimonials.length));
    // Libera o loading após um breve delay para garantir que a largura foi atualizada
    setTimeout(() => setIsLoadingMore(false), 500);
  };

  if (endpoint && apiLoading) {
    return (
      <section className="py-24 w-full bg-[#020202] flex items-center justify-center min-h-[320px]">
        <div className="w-10 h-10 border-2 border-[#FFD700] border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  if (!data) return null;

  const defaultFooterStats: FooterStat[] = [
    { id: '1', value: "+1.2k", label: "Alunos Formados", color: "#FFFFFF" },
    { id: '2', value: "R$ 45M+", label: "Gerados (Alunos)", color: "#FFD700" },
    { id: '3', value: "4.9/5", label: "Avaliação Média", color: "#FFFFFF" }
  ];

  const footerStats = data.footerStats && data.footerStats.length > 0 ? data.footerStats : defaultFooterStats;

  return (
    <section className="py-12 xs:py-16 sm:py-20 md:py-24 w-full bg-[#020202] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[300px] h-[300px] xs:w-[400px] xs:h-[400px] sm:w-[500px] sm:h-[500px] bg-[#FFD700]/5 rounded-full blur-[100px] xs:blur-[120px] sm:blur-[150px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-3 xs:px-4 sm:px-5 md:px-6">
        {/* Header do Carrossel */}
        <div className="flex flex-col lg:flex-row justify-between items-center text-center lg:text-left lg:items-start mb-8 xs:mb-10 sm:mb-12 gap-6 xs:gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2 xs:px-3 py-1 rounded-full border border-[#FFD700]/20 bg-[#FFD700]/5 backdrop-blur-md mb-4 xs:mb-5 sm:mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] animate-pulse"></span>
              <span className="text-[9px] xs:text-[10px] font-bold tracking-[0.2em] text-[#FFD700] uppercase">{data.badge}</span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl flex flex-col font-bold text-white tracking-tight leading-[1.05]">
              {data.titulo} <br className="hidden xs:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DBB46C] via-[#FFD700] to-[#B8860B]">{data.subtitulo || "Comprovados"}</span>
            </h2>
          </div>
          {/* Instrução visual quicando */}
          <motion.div
            animate={isMobile ? { x: [0, -10, 0] } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex items-center gap-3 text-gray-500 border border-white/10 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm"
          >
            <Icon icon="ph:hand-swipe-left" className="w-5 h-5 text-[#FFD700]" />
            <span className="text-[10px] uppercase font-bold tracking-widest">
              {isMobile ? "Deslize para ver mais" : "Arraste para explorar"}
            </span>
          </motion.div>
        </div>

        {/* WRAPPER DO CARROSSEL */}
        <div className="relative group">
          {/* GUIA VISUAL DA MÃOZINHA (COACH MARK) */}
          <AnimatePresence>
            {showGuide && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center bg-black/30 backdrop-blur-[2px]"
              >
                <div className="flex flex-col items-center gap-5">
                  <motion.div
                    animate={{ x: [-50, 50, -50] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-[#FFD700]"
                  >
                    <Icon icon="ph:hand-pointing-fill" className="w-16 h-16 drop-shadow-[0_0_20px_rgba(255,215,0,0.6)]" />
                  </motion.div>
                  <p className="text-white font-bold text-xs tracking-[0.3em] uppercase bg-black/60 px-6 py-3 rounded-full border border-white/10">
                    Arraste para explorar
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* TRACK DO CARROSSEL */}
          <motion.div
            ref={wrapperRef}
            className="cursor-grab active:cursor-grabbing overflow-hidden"
            whileTap={{ cursor: "grabbing" }}
          >
            <motion.div
              ref={trackRef}
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
              dragElastic={0.1}
              style={{ x }} // vincula o motion value
              // Animação Peek no carregamento
              initial={{ x: 60 }}
              whileInView={{ x: [60, -40, 0] }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeInOut", delay: 1 }}
              onDragStart={handleDragStart}
              onDragEnd={(event, info) => {
                const currentX = x.get();
                if (!trackRef.current || !wrapperRef.current) return;
                if (isLoadingMore || loadedCount >= data.testimonials.length) return;

                const trackWidth = trackRef.current.scrollWidth;
                const wrapperWidth = wrapperRef.current.offsetWidth;
                const maxDrag = -(trackWidth - wrapperWidth);
                const threshold = 200; // pixels do fim para disparar o carregamento

                if (currentX <= maxDrag + threshold) {
                  setIsLoadingMore(true);
                  loadMore();
                }
              }}
              className="flex gap-3 xs:gap-4 sm:gap-5 md:gap-6 w-max"
            >
              {data.testimonials.slice(0, loadedCount).map((item) => {
                const isDimmed = activeVideoId !== null && activeVideoId !== item.id;

                return (
                  <motion.div
                    key={item.id}
                    className="relative flex-shrink-0"
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {item.type === 'video' && (
                      <VideoCard
                        data={item}
                        isActive={activeVideoId === item.id}
                        isDimmed={isDimmed}
                        onPlay={handlePlayVideo}
                        onPause={handlePauseVideo}
                      />
                    )}
                    {item.type === 'image' && (
                      <ImageCard data={item} isDimmed={isDimmed} />
                    )}
                    {item.type === 'text' && (
                      <TextCard data={item} isDimmed={isDimmed} />
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}