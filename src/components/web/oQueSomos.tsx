"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Textura from "../ui/textura";
import Heading from "../ui/heading";
import Highlight from "../ui/highlight";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function OQueSomos() {

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {

    gsap.from(".manifesto-item", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
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
      className="relative bg-[#0A0A0A] py-24 lg:py-32 overflow-hidden selection:bg-[#F1D95D]/30"
    >

      {/* TEXTURA */}
      <Textura/>

      {/* GRAFISMO DE FUNDO */}
      <div className="absolute left-[-15%] top-1/2 -translate-y-1/2 w-[720px] h-[720px] opacity-[0.03] pointer-events-none">

        <svg viewBox="0 0 100 100" fill="none" className="text-[#F1D95D] w-full h-full">

          <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="0.4"/>

          <path d="M10 50 L90 50" stroke="currentColor" strokeWidth="0.2"/>
          <path d="M50 10 L50 90" stroke="currentColor" strokeWidth="0.2"/>

        </svg>

      </div>

      <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center space-y-8">

        <Heading
                    as="h2"
                    size="p"
                    className="animate-up manifesto-item text-[30px] md:text-[42px] lg:text-[40] leading-[1.15] tracking-tight"
                    color="#FFFFFF"
                  >
                    Somos a nova ordem da{" "}
                    <Highlight  color={"F1D95D"}>
                      nação empreendedora
                    </Highlight>
                  </Heading>

        {/* TEXTO INTRO */}
        <p className="manifesto-item text-[#fff] text-[13px] md:text-[18px] mx-auto leading-[1.8]">

          Uma plataforma de soluções corporativas para orientar quem lidera empresas reais, em um país com desafios reais.

        </p>

        {/* TEXTO PRINCIPAL */}
        <p className="manifesto-item text-[#FFFFFF] text-[16px] md:text-[18px] leading-[1.8] mx-auto font-light">

          O G4 é <span className="text-[#F1D95D] font-medium">
          instrumento de poder para empresários brasileiros.
          </span> Bússola, método, rede, influência e inteligência para empresas que fazem a diferença no Brasil.

        </p>

        {/* TEXTO FINAL */}
        <p className="manifesto-item text-[#fff] text-[18px] leading-[1.8] mx-auto">

          Unimos conhecimento aplicado, comunidade de alto nível e serviços selecionados sob um princípio simples: dar direção, voz e poder aos empresários que fazem o Brasil avançar.

        </p>

      </div>

    </section>

  );
}