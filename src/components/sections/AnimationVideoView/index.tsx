"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from "react";
import { DEFAULT_ANIMATION_VIDEO_THEME, AnimationVideoTheme } from "./theme";
import { VideoPlayer } from "@/components/ui/videoplayer";

// Importando seus componentes de UI
import Heading from "@/components/ui/heading";
import RichText from "@/components/ui/rich/richText";
import { RichTextItem } from "@/types/richText.type";
import Textura from "@/components/ui/textura"; // Ajuste o caminho se necessário

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimationVideoProps {
  badge?: string;
  title: RichTextItem[] | string; // Agora aceita o RichText ou string normal
  videoSrc: string;
  variant?: "sobre" | "cursos";
  theme?: Partial<AnimationVideoTheme>;
  startMuted?: boolean;
  // Novas props para a Textura
  showTexture?: boolean;
  textureOpacity?: number;
  textureSrc?: string;
}

export const AnimationVideoView = ({
  badge,
  title,
  videoSrc,
  variant = "cursos",
  theme,
  startMuted = false,
  showTexture = false,
  textureOpacity = 0.1,
  textureSrc = "/textura.svg",
}: AnimationVideoProps) => {
  const mergedTheme: AnimationVideoTheme = {
    ...DEFAULT_ANIMATION_VIDEO_THEME,
    ...theme,
  };

  const { backgroundColor, textColor, badgeBg, badgeBorder, badgeText, accentColor } = mergedTheme;

  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // 🎬 GSAP – INTACTO (Não mexi em nada aqui)
  useGSAP(
    () => {
      if (!containerRef.current || !videoWrapperRef.current) return;

      ScrollTrigger.getAll()
        .filter((st) => st.trigger === containerRef.current)
        .forEach((st) => st.kill());

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        ".section-header",
        {
          y: -80,
          autoAlpha: 0,
          duration: 0.3,
          ease: "power2.inOut",
        },
        0
      );

      tl.fromTo(
        videoWrapperRef.current,
        {
          width: isMobile ? "90%" : "60%",
          height: "55vh",
          top: "35%",
          borderRadius: "32px",
          xPercent: -50,
          boxShadow:
            backgroundColor === "#FFFFFF"
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.2)"
              : "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
        },
        {
          width: "100.1%",
          height: "100.1%",
          top: "0%",
          xPercent: -50,
          borderRadius: "0px",
          boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
          duration: 1,
          ease: "none",
        },
        0
      );

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: containerRef, dependencies: [isMobile, backgroundColor] }
  );

  useEffect(() => {
    const handleRefresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleRefresh);
    window.addEventListener("load", handleRefresh);
    return () => {
      window.removeEventListener("resize", handleRefresh);
      window.removeEventListener("load", handleRefresh);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* 🔹 TEXTURA DE FUNDO (Z-0) */}
      {showTexture && (
        <Textura
          misturar
          opacity={textureOpacity}
          src={textureSrc}
          className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        />
      )}

      {/* 🔹 HEADER COM RICHTEXT E HEADING (Z-10) */}
      <div className="section-header absolute top-[12%] w-full text-center z-10 px-6">
        {/* Badge protegido por condicional caso não exista */}
        {badge && (
          <div
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border backdrop-blur-md shadow-sm"
            style={{ backgroundColor: badgeBg, borderColor: badgeBorder }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: accentColor }}
            />
            <span
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: badgeText }}
            >
              {badge}
            </span>
          </div>
        )}

        <Heading as="h2" className="max-w-4xl mx-auto" color={textColor} align="center">
          {typeof title === "string" ? title : <RichText content={title} />}
        </Heading>
      </div>

      {/* 🔹 VIDEO (Z-20) */}
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
