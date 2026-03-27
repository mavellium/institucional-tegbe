"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Heading from "@/components/ui/heading";
import RichText from "@/components/ui/rich/richText";
import { Button } from "@/components/ui/button/button";
import { useApi } from "@/hooks/useApi";
import { RichTextItem } from "@/types/richText.type";
import { IImage } from "@/interface/imagem/IImage";
import { IButton } from "@/interface/button/IButton";
import Paragrafo from "@/components/ui/paragrafo";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export interface IConsultorOficial {
  badge: string;
  title: RichTextItem[];
  description: RichTextItem[][];
  imagens: {
    selo: IImage;
    consultor: IImage;
  };
  button: IButton
}

export default function ConsultorOficial() {
  const { data } = useApi<IConsultorOficial>("consultoria-oficial");

  const container = useRef(null);
  const imageRef = useRef(null);
  const cardRef = useRef(null);

  useGSAP(() => {
    if (!data) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(imageRef.current, {
      x: -100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
    })
      .from(
        cardRef.current,
        {
          x: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
        },
        "-=0.8"
      )
      .from(
        ".badge-float",
        {
          scale: 0,
          rotation: -45,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      );

  }, { scope: container, dependencies: [data] });

  if (!data) return null;

  return (
    <>
      <section
        ref={container}
        className="relative px-4 sm:px-8 py-32 bg-[#F4F4F4] overflow-hidden"
      >
        {/* BG */}
        <div className="absolute inset-0 pointer-events-none opacity-50">
          <div className="absolute top-24 left-10 w-64 h-64 bg-yellow-400/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-24 right-10 w-64 h-64 bg-blue-400/10 blur-[120px] rounded-full" />
        </div>

        <div className="flex flex-col lg:flex-row gap-12 w-full max-w-7xl mx-auto items-center">
          {/* IMAGEM */}
          <div ref={imageRef} className="relative w-full lg:w-1/2 group">
            <div className="relative z-10 w-full aspect-[4/5] max-w-[500px] mx-auto rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
              <Image
                src={data.imagens.consultor.src}
                alt="Consultoria"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <div className="badge-float absolute -bottom-6 -right-6 md:right-0 z-20 w-32 h-32 md:w-44 md:h-44 bg-white p-4 rounded-full shadow-2xl flex items-center justify-center border-4 border-[#0071E3]">
              <Image
                src={data.imagens.selo.src}
                width={120}
                height={120}
                alt="Selo"
                className="animate-pulse-slow object-contain"
              />
            </div>
          </div>

          {/* TEXTO */}
          <div ref={cardRef} className="w-full lg:w-1/2 flex flex-col gap-8">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 bg-[#0071E3]/10 text-[#0071E3] font-bold text-xs tracking-widest uppercase rounded-full">
                {data.badge}
              </span>

              <Heading
                as="h2"
                size="xl"
                className="text-4xl md:text-6xl leading-[1.1]"
              >
                <RichText content={data.title} />
              </Heading>
            </div>

            {data.description.map((paragraph, i) => (
              <Paragrafo key={i} className="space-y-4 max-w-lg">
                <RichText content={paragraph} />
              </Paragrafo>
            ))}

            <div className="pt-4">
              {data.button?.action === "link" && (
                <Link
                  href={data.button.link}
                  target={data.button.target}
                  className="w-fit"
                >
                  <Button variant="secondary">
                    {data.button.label}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}