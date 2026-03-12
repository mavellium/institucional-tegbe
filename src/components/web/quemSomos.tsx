"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";
import CardFundador from "@/components/ui/cardFundador";
import { Button } from "@/components/ui/button";

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

            <h2 className="animate-up text-[32px] lg:text-[48px] leading-[1.1] tracking-tight text-[#0A0A0A] font-medium max-w-[720px]">

              Onde a parceria<br/>constrói{" "}
              <span className="text-[#C9A646] font-serif italic">
                resultado
              </span>

            </h2>

            {/* texto */}

            <div className="animate-up max-w-[560px] space-y-7 text-[#444] text-[17px] leading-[1.75] font-light ">

              {data.header.subtitle.split(".  ").map((para: string, i: number) => {

                const text = para.trim();
                if (!text) return null;

                return (
                  <p className="text-[#0A0A0A]"  key={i}>
                    {text}{text.endsWith('.') ? '' : '.'}
                  </p>
                );

              })}

            </div>

            <div className="animate-up flex justify-center">

              <Button
                size="lg"
                className="
                group
                bg-[#C9A646]
                hover:bg-[#b9973c]
                text-[#0A0A0A]
                rounded-10
                px-10
                py-7
                text-[12px]
                font-bold
                tracking-[0.28em]
                uppercase
                shadow-[0_6px_18px_rgba(0,0,0,0.08)]
                transition-all
                duration-300
                ease-out
                hover:shadow-[0_10px_28px_rgba(0,0,0,0.12)]
                hover:-translate-y-[1px]
                active:translate-y-0
                "
              >

                Conhecer o Método

              </Button>

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