"use client";

import { useRef } from "react";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import FotoCarrossel from "../ui/fotoCarrossel";

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

          <h2 className="text-4xl md:text-5xl text-white leading-tight">
            {main.title}
          </h2>

          <p className="text-white/80 text-lg leading-relaxed max-w-lg">
            {main.description}
          </p>

          <div className="flex gap-12 pt-8 border-t border-white/10"></div>

          <Link
  href="https://maps.app.goo.gl"
  target="_blank"
  className="
  inline-flex
  items-center
  justify-center
  gap-3
  bg-[#FFC72C]
  hover:bg-[#F2CB5E]
  text-[#0A0A0A]
  rounded-[10px]
  px-10
  py-5
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
  group
  mt-2
"
>

  Ver sede no Google Maps

  <Icon
    icon="ph:arrow-right"
    className="transition-transform group-hover:translate-x-1"
  />

</Link>

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