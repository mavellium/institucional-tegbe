"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Heading from "@/components/ui/heading";
import RichText from "@/components/ui/rich/richText";
import { RichTextItem } from "@/types/richText.type";

const TEGBE_API_URL =
  "https://tegbe-dashboard.vercel.app/api/tegbe-institucional/agencias-falham!";

gsap.registerPlugin(ScrollTrigger);

interface PorqueATegbeData {
  badge: string;
  heading: RichTextItem[];
  body: RichTextItem[];
}

const mockData: PorqueATegbeData = {
  badge: "Marketing Estratégico",

  heading: [
    { type: "text", value: "Por que tantas " },
    {
      type: "highlight",
      value: "agências falham",
      color: "#F9396F",
    },
    { type: "text", value: " em gerar resultados reais?" },
  ],

  body: [
    {
      type: "text",
      value:
        "A maioria das agências foca apenas em tráfego e estética.",
    },
    { type: "linebreak" },
    {
      type: "text",
      value:
        "Mas crescimento de verdade exige estratégia, posicionamento e execução consistente.",
    },
    { type: "linebreak" },
    {
      type: "bold",
      value: "É aqui que a Tegbe faz diferente.",
    },
  ],
};

export default function PorqueATegbe() {
  const sectionRef = useRef(null);
  const [data, setData] = useState<PorqueATegbeData>(mockData);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(TEGBE_API_URL);
        if (!res.ok) throw new Error("API error");

        const json = await res.json();
        setData(json);
      } catch (err) {
        console.warn("Using mockData because API failed:", err);
      }
    }

    loadData();
  }, []);

  useGSAP(
    () => {
      gsap.from(".reveal", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef, dependencies: [data] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-32 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.svg')] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center space-y-10">

        {/* badge */}
        <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 bg-neutral-50">

          <span className="w-2 h-2 rounded-full bg-[#F9396F]" />

          <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-500">
            {data.badge}
          </span>

        </div>

        {/* heading */}
        <Heading
          as="h2"
          size="md"
          align="center"
          className="reveal"
        >
          <RichText content={data.heading} />
        </Heading>

        {/* body */}
        <div className="reveal max-w-3xl mx-auto text-lg text-neutral-600 leading-relaxed">

          <RichText content={data.body} />

        </div>

      </div>
    </section>
  );
}