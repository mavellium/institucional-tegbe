"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button/button";
import CardFundador from "@/components/ui/card/cardFundador";
import Paragrafo from "@/components/ui/paragrafo";
import RichText from "@/components/ui/rich/richText";
import Heading from "@/components/ui/heading";
import Textura from "@/components/ui/textura";
import { useApi } from "@/hooks/useApi";
import { useGSAP } from "@gsap/react";
import { QuemSomosData } from "@/types/quemSomos.type";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function QuemSomos() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, loading } = useApi<QuemSomosData>("quem-somos");

  useGSAP(
    () => {
      if (loading) return;

      gsap.registerPlugin(ScrollTrigger);

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
    },
    { scope: containerRef, dependencies: [loading] }
  );

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
      <Textura opacity={0.03} />

      <div className="relative max-w-6xl mx-auto px-6">

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-24 items-start">

          <div className="space-y-10 lg:space-y-12">

            <Heading
              as="h2"
              size="lg"
              className="animate-up max-w-[720px] mx-auto lg:mx-0 text-center lg:text-left"
              font="medium"
            >
              <RichText content={data.header.title} />
            </Heading>

            <div className="space-y-5 max-w-[560px] mx-auto lg:mx-0 text-center lg:text-left">


              {data.header.subtitle.map((item, i) => (
                <Paragrafo
                  key={i}
                  className="animate-up text-[#0A0A0A] text-[16px] sm:text-[17px]">
                  <RichText content={[item]} />
                </Paragrafo>
              ))}

            </div>

            <div className="animate-up flex justify-center">
              {data.button?.action === "link" && (
                <Button asChild variant={data.button.variant}>
                  <Link href={data.button.link} target={data.button.target}>
                    {data.button.label}
                  </Link>
                </Button>
              )}
            </div>

          </div>

          <div className="animate-up flex justify-center lg:justify-end lg:sticky lg:top-10 mt-4 lg:mt-0">

            <div className="w-full max-w-[420px] flex justify-center">
              <CardFundador data={data.founder} />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}