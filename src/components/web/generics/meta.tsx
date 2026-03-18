"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Heading from "../../ui/heading";
import Paragrafo from "../../ui/paragrafo";
import RichText from "../../ui/rich/richText";
import Textura from "../../ui/textura";

import { RichTextItem } from "@/types/richText.type";
import ProgressMetric from "../../ui/progressMetric";
import { useApi } from "@/hooks/useApi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------------- TYPES ---------------- */
export interface MetaData {
  header: {
    title: RichTextItem[];
    subtitle: RichTextItem[];
  };
  progress: {
    current: number;
    target: number;
    max: number;
  };
  footer: RichTextItem[];
}

interface MetaProps{
  type: string;
  endpoint: string;
}

/* ---------------- COMPONENT ---------------- */

export default function MetaSection({endpoint,
}: MetaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
    const { data } = useApi<MetaData>(endpoint);
  useGSAP(() => {
    if (!containerRef.current) return;

    const trigger = {
      trigger: containerRef.current,
      start: "top 80%"
    };

    gsap.from(".meta-item", {
      scrollTrigger: trigger,
      y: 18,
      opacity: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: "power2.out"
    });

  }, { scope: containerRef });

  if (!data) return null;

  return (
    <section
      ref={containerRef}
      className="relative bg-[#FAFAF8] py-20 lg:py-32 text-center overflow-hidden selection:bg-[#F1D95D]/30"
    >
      <Textura opacity={0.03} />

      <div className="relative z-10 max-w-3xl lg:max-w-4xl mx-auto px-6 space-y-12 lg:space-y-16">

        {/* HEADER */}
        <div className="space-y-5 lg:space-y-6">
          <Heading as="h2" size="lg" align="center" className="meta-item">
            <RichText content={data.header.title} />
          </Heading>

          <Paragrafo className="meta-item text-[#0A0A0A] text-[16px] sm:text-[18px] max-w-xl mx-auto">
            <RichText content={data.header.subtitle} />
          </Paragrafo>
        </div>

        {/* PROGRESS */}
        <div className="meta-item w-full">
          <ProgressMetric
            value={data.progress.target}
            max={data.progress.max}
          />
        </div>

        {/* FOOTER */}
        <Paragrafo className="meta-item text-[#0A0A0A] text-[16px] sm:text-[18px]" align="center">
          <RichText content={data.footer} />
        </Paragrafo>

      </div>
    </section>
  );
}