"use client";

import { VideoPlayer } from "@/components/ui/videoplayer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import RichText from "@/components/ui/rich/richText";
import { RichTextItem } from "@/types/richText.type";

gsap.registerPlugin(ScrollTrigger);

interface HeroVideoProps {
  videoSrc: string;

  title: RichTextItem[];
  subtitle?: RichTextItem[];

  accentColor?: string;
  gradientFrom?: string;
  gradientTo?: string;

  videoOpacity?: number;
  startMuted?: boolean;
}

export const HeroVideoView = ({
  videoSrc,
  title,
  subtitle,

  accentColor = "#FFC72C",
  gradientFrom = "#FFC72C",
  gradientTo = "#F59E0B",

  videoOpacity = 0.7,
  startMuted = false,
}: HeroVideoProps) => {

  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });

    tl.from(".hero-reveal", {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: "power3.out",
    });

  }, { scope: sectionRef });

  if (!videoSrc) return null;
  return (
    
    <section
      ref={sectionRef}
      className="relative w-full bg-[#020202] overflow-hidden"
    >

      <div className="relative w-full h-[65vh] md:h-[85vh] lg:h-screen max-h-[1080px]">

        {/* VIDEO */}
        <div className="absolute inset-0">

          <VideoPlayer
            src={videoSrc}
            accentColor={accentColor}
            opacity={videoOpacity}
            startMuted={false}
            className="w-full h-full"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />

          {/* noise */}
          <div className="absolute inset-0 opacity-[0.18] mix-blend-overlay pointer-events-none z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        </div>

        {/* CONTENT */}
        <div className="absolute inset-0 flex items-center justify-center z-20 px-6">

          <div className="text-center max-w-6xl">

            {/* TITLE */}
            <h1 className="hero-reveal text-4xl sm:text-6xl md:text-8xl font-bold text-white tracking-tight leading-[0.95] uppercase">

              <RichText content={title} />

            </h1>

            {/* SUBTITLE */}
            {subtitle && (

              <p className="hero-reveal mt-6 text-lg sm:text-2xl font-light text-white/70 tracking-[0.35em] uppercase">

                <RichText content={subtitle} />

              </p>

            )}

          </div>

        </div>

      </div>

    </section>
  );
};