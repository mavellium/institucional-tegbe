"use client";

import { useRef, useEffect, useState } from "react";
import { Icon } from "@iconify/react";

interface VideoPlayerProps {
  src: string;
  accentColor: string;
  showVolumeControl?: boolean;
  className?: string;
  opacity?: number;
  startMuted?: boolean;
}

export const VideoPlayer = ({
  src,
  accentColor,
  showVolumeControl = false,
  className = "",
  opacity = 1,
  startMuted = true
}: VideoPlayerProps) => {

  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(startMuted);
  const [volume, setVolume] = useState(0.2);

  useEffect(() => {

    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {

        if (entry.isIntersecting) {

          video.play()
            .then(() => setIsPlaying(true))
            .catch(() => {

              if (!video.muted) {
                video.muted = true;
                setIsMuted(true);
                video.play();
              }

            });

        } else {

          video.pause();
          setIsPlaying(false);

        }

      },
      { threshold: 0.15 }
    );

    observer.observe(video);

    return () => observer.disconnect();

  }, []);

  useEffect(() => {

    const video = videoRef.current;
    if (!video) return;

    video.volume = volume;
    video.muted = isMuted;

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
        preload="metadata"
      />

      <div className="absolute bottom-6 right-6 flex items-center gap-3 z-30 pointer-events-auto">

        {showVolumeControl && !isMuted && (

          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
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

            const video = videoRef.current;
            if (!video) return;

            if (video.paused) {
              video.play();
              setIsPlaying(true);
            } else {
              video.pause();
              setIsPlaying(false);
            }

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