"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FotoCarrossel from "../ui/fotoCarrossel";
import ButtonLink from "../ui/buttonLink";
import Heading from "../ui/heading";
import RichText from "../ui/richText";

import { RichTextItem } from "@/types/richText.type";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- TYPES ---------------- */

export interface LocalizacaoItem {
  id: string;
  alt: string;
  image: string;
  title: RichTextItem[];
  description: RichTextItem[];

  button: {
    label: string;
    link: string;
    target?: "_blank" | "_self";
  };
}

/* ---------------- MOCK DATA ---------------- */

const mockData: LocalizacaoItem[] = [
  {
    id: "1",
    alt: "Escritório Tegbe em Garça",
    image: "/doni.jpg",

    title: [
      {
        type: "text",
        value: "Nosso QG estratégico fica em Garça, São Paulo."
      }
    ],

    description: [
      {
        type: "text",
        value:
          "É daqui que coordenamos projetos, estratégias e operações digitais que impactam empresas em todo o Brasil. Nossa estrutura é enxuta, estratégica e totalmente conectada."
      }
    ],

    button: {
      label: "Ver sede no Google Maps",
      link: "https://maps.app.goo.gl/vPoKscAn58iodWEP7",
      target: "_blank"
    }
  },

  {
    id: "2",
    alt: "Ambiente de trabalho da equipe",
    image: "/logo-tegbe-fundo.png",

    title: [
      {
        type: "text",
        value: "Nosso QG estratégico fica em Garça, São Paulo."
      }
    ],

    description: [
      {
        type: "text",
        value:
          "É daqui que coordenamos projetos, estratégias e operações digitais que impactam empresas em todo o Brasil. Nossa estrutura é enxuta, estratégica e totalmente conectada."
      }
    ],

    button: {
      label: "Ver sede no Google Maps",
      link: "https://maps.app.goo.gl/vPoKscAn58iodWEP7",
      target: "_blank"
    }
  },

  {
    id: "3",
    alt: "Time trabalhando em projetos digitais",
    image: "/doni.jpg",

    title: [
      {
        type: "text",
        value: "Nosso QG estratégico fica em Garça, São Paulo."
      }
    ],

    description: [
      {
        type: "text",
        value:
          "É daqui que coordenamos projetos, estratégias e operações digitais que impactam empresas em todo o Brasil. Nossa estrutura é enxuta, estratégica e totalmente conectada."
      }
    ],

    button: {
      label: "Ver sede no Google Maps",
      link: "https://maps.app.goo.gl/vPoKscAn58iodWEP7",
      target: "_blank"
    }
  }
];

/* ---------------- COMPONENT ---------------- */

export default function Localizacao() {

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState<LocalizacaoItem[]>(mockData);

  /* ---------------- API FETCH ---------------- */

  useEffect(() => {

    async function fetchData() {

      try {

        const res = await fetch("/api/localizacao");

        if (!res.ok) throw new Error("API error");

        const json = await res.json();

        if (json?.length) {
          setData(json);
        }

      } catch (err) {

        console.warn("Localizacao usando mockData", err);

      }

    }

    fetchData();

  }, []);

  const main = data[0];

  const images = data
    .map((item) => item.image)
    .filter(Boolean);

  /* ---------------- GSAP ---------------- */

  useGSAP(() => {

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    });

    tl.from(".loc-left", {
      y: 60,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
    });

    tl.from(
      ".loc-right",
      {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      },
      "-=0.6"
    );

  }, { scope: sectionRef });

  if (!main) return null;

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
            className="max-w-[720px]"
            color="#FFFFFF"
            font="regular"
          >
            <RichText content={main.title} />
          </Heading>

          <div className="text-white/80 text-lg leading-relaxed max-w-lg">

            <RichText content={main.description} />

          </div>

          <div className="flex gap-12 pt-8 border-t border-white/10" />

          <ButtonLink button={main.button} />

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