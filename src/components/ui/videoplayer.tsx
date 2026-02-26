"use client";

import { useRef, useEffect, useState } from "react";
import { Icon } from "@iconify/react";

interface VideoPlayerProps {
    src: string;
    accentColor: string;
    showVolumeControl?: boolean;
    className?: string;
    opacity?: number;
    startMuted?: boolean; // Nova Prop: Padrão será false conforme seu pedido
}

export const VideoPlayer = ({
    src,
    accentColor,
    showVolumeControl = false,
    className = "",
    opacity = 1,
    startMuted = false // O vídeo tentará começar com som por padrão
}: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(startMuted);
    const [volume, setVolume] = useState(0.2);

    useEffect(() => {
        if (!videoRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const playPromise = videoRef.current?.play();

                    if (playPromise !== undefined) {
                        playPromise
                            .then(() => setIsPlaying(true))
                            .catch(() => {
                                // Fallback: Se o browser bloquear play com som, 
                                // mutamos e tentamos de novo automaticamente
                                if (!isMuted) {
                                    console.warn("Autoplay com som bloqueado. Mutando para iniciar.");
                                    setIsMuted(true);
                                    videoRef.current?.play();
                                }
                            });
                    }
                } else {
                    videoRef.current?.pause();
                    setIsPlaying(false);
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(videoRef.current);
        return () => observer.disconnect();
    }, [src, isMuted]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume;
            videoRef.current.muted = isMuted;
        }
    }, [volume, isMuted]);

    return (
        <div className={`relative w-full h-full overflow-hidden ${className}`}>
            <video
                ref={videoRef}
                src={src}
                className="w-full h-full object-cover transition-opacity duration-700"
                style={{ opacity }}
                loop
                muted={isMuted}
                playsInline
            />

            <div className="absolute bottom-6 right-6 flex items-center gap-3 z-30 pointer-events-auto">
                {showVolumeControl && !isMuted && (
                    <input
                        type="range" min="0" max="1" step="0.1"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-white hidden md:block"
                    />
                )}

                <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-3 rounded-full backdrop-blur-md bg-black/20 border border-white/10 hover:bg-white/10 transition-colors"
                    style={{ color: accentColor }}
                >
                    <Icon icon={isMuted ? "ph:speaker-none-fill" : "ph:speaker-high-fill"} />
                </button>

                <button
                    onClick={() => {
                        if (isPlaying) videoRef.current?.pause();
                        else videoRef.current?.play();
                        setIsPlaying(!isPlaying);
                    }}
                    className="p-3 rounded-full backdrop-blur-md bg-black/20 border border-white/10 hover:bg-white/10 transition-colors"
                    style={{ color: accentColor }}
                >
                    <Icon icon={isPlaying ? "ph:pause-fill" : "ph:play-fill"} />
                </button>
            </div>
        </div>
    );
};