"use client";

import { useRef } from "react";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import FotoCarrossel from "../ui/fotoCarrossel";
import ButtonLink from "../ui/buttonLink";
import { TargetVideo } from "@/app/types/target-button.types";
import Heading from "../ui/heading";

gsap.registerPlugin(ScrollTrigger);

export interface LocalizacaoItem {
  id: string;
  alt: string;
  image: string;
  title: string;
  description: string;
}

interface Props {
  data: LocalizacaoItem[];
}

export default function Localizacao({ data }: Props) {

  if (!data || data.length === 0) return null;

  const sectionRef = useRef(null);

  const images = data.map(i => i.image).filter(Boolean);
  const main = data[0];

  useGSAP(() => {

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      }
    });

    tl.from(".loc-left", {
      y: 60,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out"
    });

    tl.from(".loc-right", {
      y: 60,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out"
    }, "-=0.6");

  }, { scope: sectionRef });

  return (

    <section
      ref={sectionRef}
      className="relative bg-black py-28 lg:py-36 overflow-hidden selection:bg-[#C5A47E]/30"
    >

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center relative z-10">

        {/* TEXTO */}
        <div className="loc-left space-y-10">

          <Heading
            as="h2"
            size="lg"
            className="animate-up max-w-[720px]"
            color="#FFFFFF"
            font="regular"
          >
            {main.title}
          </Heading>

          <p className="text-white/80 text-lg leading-relaxed max-w-lg">
            {main.description}
          </p>

          <div className="flex gap-12 pt-8 border-t border-white/10"></div>

          <ButtonLink button={{
                        label: "Ver sede no Google Maps",
                        link: "https://maps.app.goo.gl/vPoKscAn58iodWEP7",
                        target: "_blank"
                      }}
          />

        </div>

        {/* CARROSSEL */}
        <div className="loc-right relative">

          <FotoCarrossel
            images={images}
            alt={main.alt}
          />
          
        </div>

      </div>

    </section>

  );

}