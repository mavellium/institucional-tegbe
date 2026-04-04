"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FotoCarrossel from "@/components/ui/fotoCarrossel";
import Heading from "@/components/ui/heading";
import RichText from "@/components/ui/rich/richText";
import { RichTextItem } from "@/types/richText.type";
import { IButton } from "@/interface/button/IButton";
import { Button } from "@/components/ui/button/button";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export interface LocalizacaoItem {
  id: string;
  alt: string;
  image: string;
  title: RichTextItem[];
  description: RichTextItem[];

  button?: IButton;
}

export default function Localizacao({ data }: { data: LocalizacaoItem[] | null }) {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.from(".loc-right", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      tl.from(
        ".loc-left",
        {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.6"
      );
    },
    { scope: sectionRef }
  );

  if (!data || data.length === 0) return null;

  const main = data[0];
  const images = data.map((item) => item.image).filter(Boolean);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-20 lg:py-36 overflow-hidden selection:bg-[#C5A47E]/30"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-24">
          {/* TEXTO */}

          <div className="loc-left w-full lg:w-1/2 space-y-8 text-center lg:text-left max-w-xl mx-auto lg:mx-0">
            <Heading
              align="center"
              as="h2"
              size="lg"
              className="md:text-left max-w-[720px]"
              color="#FFFFFF"
              font="regular"
            >
              <RichText content={main.title} />
            </Heading>

            <div className="text-white/80 text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
              <RichText content={main.description} />
            </div>

            <div className="border-t border-white/10 flex items-center justify-center lg:justify-start w-24 mx-auto lg:mx-0" />

            <div className="flex justify-center lg:justify-start">
              {main.button?.action === "link" && (
                <Button asChild variant={main.button.variant}>
                  <Link href={main.button.link} target={main.button.target}>
                    {main.button.label}
                  </Link>
                </Button>
              )}
            </div>
          </div>

          <div className="loc-right w-full lg:w-1/2 mb-6 lg:mb-0">
            <FotoCarrossel images={images} alt={main.alt} />
          </div>
        </div>
      </div>
    </section>
  );
}
