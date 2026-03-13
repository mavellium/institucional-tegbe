"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CardFundador from "@/components/ui/cardFundador";
import ButtonLink from "../ui/buttonLink";
import ParagrafoTexto from "../ui/paragrafoTexto";
import Heading from "../ui/heading";
import Highlight from "../ui/highlight";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function QuemSomos({ endpoint = `${process.env.NEXT_PUBLIC_API_URL}/socios` }) {

  const containerRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const res = await fetch(endpoint);
        const json = await res.json();

        if (json?.sobre) setData(json.sobre);

      } catch (error) {

        console.error("Erro Tegbe API:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchData();

  }, [endpoint]);

  useGSAP(() => {

    if (loading || !data) return;

    gsap.from(".animate-up", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%"
      },
      y: 28,
      opacity: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: "power2.out"
    });

  }, { scope: containerRef, dependencies: [data, loading] });

  if (loading || !data) {
    return (
      <div className="h-[500px] bg-[#FAFAF8] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#F1D95D] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (

    <section
      ref={containerRef}
      className="relative bg-[#FAFAF8] py-20 selection:bg-[#F1D95D]/30 overflow-hidden"
    >

      {/* textura */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "url('/textura.svg')",
          backgroundRepeat: "repeat"
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-24 items-start">


          <div className="space-y-12">

            {/* título */}
            <Heading
              as="h2"
              size="lg"
              className="animate-up max-w-[720px]"
            >
              Onde a parceria<br />
              constrói{" "}
              <Highlight>
                resultado
              </Highlight>
            </Heading>

            {/* texto */}
            <div className="animate-up max-w-[560px] space-y-7 text-[#444] text-[17px] leading-[1.75] font-light ">

              <ParagrafoTexto
                content={data.header.subtitle}
                className="animate-up max-w-[560px]"
              />

            </div>

            <div className="animate-up flex justify-center">

              <ButtonLink button={{
                            label: "Conhecer o Método",
                            link: "carreiras",
                            target: "_blank"
                          }}/>

            </div>

          </div>

          {/* CARD FUNDADOR */}

          <div className="animate-up flex justify-center lg:justify-end lg:sticky lg:top-10">

            <div className="w-full max-w-[420px]">

              <CardFundador />

            </div>

          </div>

        </div>

      </div>

    </section>

  );
}