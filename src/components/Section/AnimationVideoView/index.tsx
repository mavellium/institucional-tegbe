"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from "react";
import {
  DEFAULT_ANIMATION_VIDEO_THEME,
  AnimationVideoTheme,
} from "./theme";
import { VideoPlayer } from "@/components/ui/videoplayer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimationVideoProps {
  badge: string;
  title: string;
  videoSrc: string;
  variant?: "sobre" | "cursos";
  theme?: Partial<AnimationVideoTheme>;
  startMuted?: boolean;
}

export const AnimationVideoView = ({
  badge,
  title,
  videoSrc,
  variant = "cursos",
  theme,
  startMuted = true,
}: AnimationVideoProps) => {
  const mergedTheme: AnimationVideoTheme = {
    ...DEFAULT_ANIMATION_VIDEO_THEME,
    ...theme,
  };

  const {
    backgroundColor,
    textColor,
    badgeBg,
    badgeBorder,
    badgeText,
    accentColor,
  } = mergedTheme;

  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // 🎬 GSAP
  useGSAP(() => {
        if (!containerRef.current || !videoWrapperRef.current) return;

        // Limpa instâncias anteriores para evitar cálculos duplicados no resize
        ScrollTrigger.getAll().filter(st => st.trigger === containerRef.current).forEach(st => st.kill());

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top+=245% top", 
                end: "+=0%", 
                pin: true, 
                scrub: 1,
                markers: true,
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

    }, { scope: containerRef, dependencies: [isMobile, theme] })

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* HEADER */}
      <div className="section-header absolute top-[12%] w-full text-center z-10">
        <div
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border backdrop-blur-md"
          style={{ backgroundColor: badgeBg, borderColor: badgeBorder }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: accentColor }}
          />
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: badgeText }}
          >
            {badge}
          </span>
        </div>

        <h2
          className="text-4xl md:text-6xl font-bold"
          style={{ color: textColor }}
        >
          {title}
        </h2>
      </div>

      {/* VIDEO */}
      <div
        ref={videoWrapperRef}
        className="absolute left-[50%] top-[35%] overflow-hidden bg-black z-20"
        style={{
          width: isMobile ? "90%" : "60%",
          height: "55vh",
          borderRadius: "32px",
        }}
      >
        <VideoPlayer
          src={videoSrc}
          accentColor={accentColor}
          startMuted={false}
          showVolumeControl={false}
        />
      </div>
    </section>
  );
};

export default AnimationVideoView;