"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Textura from "../ui/textura";
import Heading from "../ui/heading";
import RichText from "../ui/rich/richText";
import Paragrafo from "../ui/paragrafo";
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

/* ---------------- MOCK DATA ---------------- */

const mockData: OQueSomosData = {
  header: {
    title: [
      { type: "text", value: "Somos a nova ordem da " },
      { type: "highlight", value: "nação empreendedora", color: "#F1D95D" }
    ]
  },

  paragraphs: [
    [
      {
        type: "text",
        value:
          "Uma plataforma de soluções corporativas para orientar quem lidera empresas reais, em um país com desafios reais."
      }
    ],

    [
      { type: "text", value: "A TEGBE é " },
      {
        type: "highlight",
        value: "instrumento de poder para empresários brasileiros.",
        color: "#F1D95D",
        serif: false,
        italic: false
      },
      {
        type: "text",
        value:
          " Bússola, método, rede, influência e inteligência para empresas que fazem a diferença no Brasil."
      }
    ],

    [
      {
        type: "text",
        value:
          "Unimos conhecimento aplicado, comunidade de alto nível e serviços selecionados sob um princípio simples: dar direção, voz e poder aos empresários que fazem o Brasil avançar."
      }
    ]
  ]
};

/* ---------------- COMPONENT ---------------- */

export function OQueSomos() {

  const containerRef = useRef<HTMLDivElement>(null);

  const data = mockData;

  useGSAP(() => {

    if (!containerRef.current) return;

    gsap.from(".manifesto-item", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%"
      },
      opacity: 0,
      y: 20,
      stagger: 0.12,
      duration: 0.9,
      ease: "power2.out"
    });

  }, { scope: containerRef });

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
    >
      <RichText content={data.header.title} />
    </Heading>

    {/* PARAGRAPHS */}
    <div className="space-y-4 sm:space-y-6">
      {data.paragraphs.map((paragraph, i) => (
        <Paragrafo
          key={i}
          className="manifesto-item text-[#FFFFFF] text-[15px] sm:text-[16px] md:text-[19px] font-light"
        >
          <RichText content={paragraph} />
        </Paragrafo>
      ))}
    </div>

  </div>
</section>
  );
}