"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import Heading from "../ui/heading";
import Paragrafo from "../ui/paragrafo";
import RichText from "../ui/richText";
import Textura from "../ui/textura";

import { RichTextItem } from "@/types/richText.type";
import ProgressMetric from "../ui/progressMetric";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------------- TYPES ---------------- */

type MetaData = {
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
};

/* ---------------- MOCK DATA ---------------- */

const mockData: MetaData = {
  header: {
    title: [
      { type: "text", value: "Qual é a principal " },
      { type: "highlight", value: "meta", color: "#FFC72C" },
      { type: "text", value: " da Tegbe?" }
    ],

    subtitle: [
      { type: "text", value: "Gerar ", size:18 },
      { type: "bold", value: "R$ 100 milhões em novas receitas", size:18 },
      { type: "text", value: " através dos nossos parceiros até 2030.", size:18 }
    ]
  },

  progress: {
    current: 1500,
    target: 1500,
    max: 5000
  },

  footer: [
    { type: "text", value: "resultados gerados até agora pela "},
    { type: "bold", value: "#geraçãotegbe", },
  ]
};

/* ---------------- COMPONENT ---------------- */

export function MetaAlunos() {

  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const [count, setCount] = useState(0);

  const data = mockData;

  const percentage = (data.progress.target / data.progress.max) * 100;

  useGSAP(() => {

    if (!containerRef.current) return;

    const trigger = {
      trigger: containerRef.current,
      start: "top 80%"
    };

    gsap.from(".meta-item", {
      scrollTrigger: trigger,
      y: 24,
      opacity: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: "power2.out"
    });

    gsap.fromTo(
      progressRef.current,
      { width: "0%" },
      {
        width: `${percentage}%`,
        duration: 2.2,
        ease: "power3.out",
        scrollTrigger: trigger
      }
    );

    gsap.fromTo(
      thumbRef.current,
      { left: "0%", xPercent: -50 },
      {
        left: `${percentage}%`,
        xPercent: -50,
        duration: 2.2,
        ease: "power3.out",
        scrollTrigger: trigger
      }
    );

    const obj = { value: 0 };

    gsap.to(obj, {
      value: data.progress.target,
      duration: 2.2,
      ease: "power3.out",
      scrollTrigger: trigger,
      onUpdate: () => setCount(Math.floor(obj.value))
    });

  }, { scope: containerRef });

  return (

    <section
      ref={containerRef}
      className="relative bg-[#FAFAF8] py-24 lg:py-32 text-center overflow-hidden selection:bg-[#F1D95D]/30"
    >

      <Textura opacity={0.03} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-16">

        {/* HEADER */}

        <div className="space-y-6">

          <Heading
            as="h2"
            size="lg"
            className="meta-item"
          >
            <RichText content={data.header.title} />
          </Heading>

          <Paragrafo className="meta-item text-[#0A0A0A] text-[18px] mx-auto">
            <RichText content={data.header.subtitle} />
          </Paragrafo>

        </div>

        {/* PROGRESS */}
        <ProgressMetric
          value={data.progress.target}
          max={data.progress.max}
        />

        {/* FOOTER */}

        <Paragrafo className="meta-item text-[#0A0A0A] text-[18px]">
          <RichText content={data.footer} />
        </Paragrafo>

      </div>

    </section>

  );
}