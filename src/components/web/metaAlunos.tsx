"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function MetaAlunos() {

  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const [count, setCount] = useState(0);

  const targetValue = 1500;
  const maxValue = 5000;

  const percentage = (targetValue / maxValue) * 100;

  useGSAP(() => {

    gsap.from(".meta-item", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%"
      },
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
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%"
        }
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
    scrollTrigger: {
      trigger: containerRef.current,
      start: "top 80%"
    }
  }
);

    const obj = { value: 0 };

    gsap.to(obj, {
      value: targetValue,
      duration: 2.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%"
      },
      onUpdate: () => {
        setCount(Math.floor(obj.value));
      }
    });

  }, { scope: containerRef });

  return (

    <section
      ref={containerRef}
      className="relative bg-[#FAFAF8] py-24 lg:py-32 text-center overflow-hidden selection:bg-[#F1D95D]/30"
    >

      {/* textura leve */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "url('/textura.svg')",
          backgroundRepeat: "repeat"
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-16">

        {/* TITULO */}

        <div className="space-y-6">

          <h2 className="meta-item text-3xl md:text-5xl text-[#0A0A0A] font-medium">

            Qual é a principal{" "}
            <span className="text-[#FFC72C] italic font-serif ">
              meta
            </span>
            {" "}da Tegbe?

          </h2>

          <p className="meta-item text-[#0a0a0a] text-sm md:text-[18px] mx-auto leading-relaxed">

            Gerar <span className="font-semibold text-[#0A0A0A]">R$ 100 milhões em novas receitas</span> através dos nossos parceiros até 2030.

          </p>

        </div>

        {/* BARRA DE PROGRESSO */}

        <div className="meta-item bg-white/80 backdrop-blur rounded-2xl p-10 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 space-y-12">

  <div className="relative w-full">

    {/* TRACK */}
   <div className="h-[14px] w-full rounded-full bg-[#E7E7E7]" />

    {/* PROGRESSO */}
<div
  ref={progressRef}
  className="
  absolute
  top-0
  left-0
  h-[12px]
  rounded-full
  bg-gradient-to-r
  from-[#1A1A1A]
  to-[#2A2A2A]
"
/>
    {/* THUMB */}
<div
  ref={thumbRef}
  className="
  absolute
  top-1/2
  -translate-y-1/2
  w-12
  h-12
  rounded-full
  bg-gradient-to-br
  from-[#2A2A2A]
  to-[#0F0F0F]
  border
  border-[#3A3A3A]
  shadow-[0_10px_25px_rgba(0,0,0,0.35)]
  flex
  items-center
  justify-center
">

  <Image
    src="/logo_icone4.svg"
    alt="Tegbe"
    width={24}
    height={24}
    className="object-contain"
  />

</div>
    </div>

    {/* NUMEROS */}
    <div className="flex justify-between items-end">

      <span className="text-gray-400 text-sm font-semibold tracking-wide">
        0
      </span>

      <div className="flex flex-col items-center">

        <span className="text-5xl md:text-3xl font-bold text-[#0A0A0A] tracking-tight">
          {count.toLocaleString("pt-BR")}
        </span>

      </div>

      <span className="text-gray-400 text-sm font-semibold tracking-wide">
        5K
      </span>

    </div>

  </div>

        {/* FOOTER */}

        <p className="meta-item text-xs text-[18px] text-[#0a0a0a]">

          resultados gerados até agora pela{" "}
          <span className="text-[#0A0A0A] font-semibold italic">
            #geraçãotegbe
          </span>

        </p>

      </div>
      

    </section>
  );
}