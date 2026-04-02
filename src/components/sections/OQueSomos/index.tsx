"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Textura from "@/components/ui/textura";
import Heading from "@/components/ui/heading";
import RichText from "@/components/ui/rich/richText";
import Paragrafo from "@/components/ui/paragrafo";
import { RichTextItem } from "@/types/richText.type";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------------- TYPES ---------------- */

type OQueSomosData = {
  header: {
    title: RichTextItem[];
  };
  paragraphs: RichTextItem[][];
};

/* ---------------- COMPONENT ---------------- */

export function OQueSomos({ data }: { data: OQueSomosData | null }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.from(".manifesto-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        opacity: 0,
        y: 20,
        stagger: 0.12,
        duration: 0.9,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  if (!data) return null;

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0A0A0A] py-20 sm:py-24 lg:py-32 overflow-hidden selection:bg-[#F1D95D]/30"
    >
      <Textura src="/textura.svg" />

      {/* GRAFISMO */}
      <div
        aria-hidden
        className="absolute left-[-25%] sm:left-[-15%] top-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[720px] md:h-[720px] opacity-[0.03] pointer-events-none"
      >
        <svg viewBox="0 0 100 100" fill="none" className="text-[#F1D95D] w-full h-full">
          <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="0.4" />
          <path d="M10 50 L90 50" stroke="currentColor" strokeWidth="0.2" />
          <path d="M50 10 L50 90" stroke="currentColor" strokeWidth="0.2" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center space-y-8 sm:space-y-10">
        {/* TITLE */}
        <Heading
          as="h2"
          size="p"
          className="manifesto-item text-[28px] sm:text-[30px] md:text-[42px] leading-[1.15] tracking-tight"
          color="#FFFFFF"
          align="center"
        >
          <RichText content={data.header.title} />
        </Heading>

        {/* PARAGRAPHS */}
        <div className="space-y-4 sm:space-y-6">
          {data.paragraphs.map((paragraph, i) => (
            <Paragrafo
              color="#fff"
              key={i}
              className="manifesto-item text-[#FFFFFF] text-[15px] sm:text-[16px] md:text-[19px] font-light"
              align="center"
            >
              <RichText content={paragraph} />
            </Paragrafo>
          ))}
        </div>
      </div>
    </section>
  );
}
