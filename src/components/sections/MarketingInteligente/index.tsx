"use client";

import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import Flywheel from "@/components/ui/flywheel";
import Heading from "@/components/ui/heading";
import RichText from "@/components/ui/rich/richText";
import Paragrafo from "@/components/ui/paragrafo";
import { RichTextItem } from "@/types/richText.type";
import { IButton } from "@/interface/button/IButton";
import Textura from "@/components/ui/textura";
import CTAButton from "@/components/ui/button/ctaButton";

interface Stat {
  value: string;
  label: RichTextItem[];
}

interface Content {
  badge: RichTextItem[];
  title: RichTextItem[];
  description: RichTextItem[];
  stats: Stat[];
  button: IButton;
}

const mockData: Content = {
  badge: [{ type: "text", value: "Marketing Inteligente" }],
  title: [{ type: "text", value: "Título padrão" }],
  description: [{ type: "text", value: "Descrição padrão" }],
  stats: [],
  button: { action: "link", label: "Saiba mais", link: "#" },
};

export default function MarketingInteligente({ data: dataProp }: { data: Content | null }) {
  const content = dataProp ?? mockData;
  const { badge, title, description, stats, button } = content;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen bg-white flex items-center overflow-hidden py-24">
        <Textura />

        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#E31B63]/6 blur-[140px] rounded-full" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#FF0F43]/6 blur-[140px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* LEFT */}
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
              {/* badge */}
              <div className="flex justify-center lg:justify-start">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                  <Sparkles className="w-4 h-4 text-[#E31B63]" />
                  <span className="text-xs text-gray-600 font-bold tracking-widest uppercase">
                    <RichText content={badge} />
                  </span>
                </div>
              </div>

              {/* heading */}
              <Heading
                as="h1"
                size="xl"
                font="black"
                className="text-[#0a0a0a] max-w-xl mx-auto lg:mx-0"
              >
                <RichText content={title} />
              </Heading>

              {/* description */}
              <Paragrafo className="text-gray-600 max-w-lg mx-auto lg:mx-0 text-base md:text-lg">
                <RichText content={description} />
              </Paragrafo>

              {/* stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center lg:text-left space-y-1">
                    <Heading
                      as="h3"
                      size="lg"
                      font="bold"
                      align="center"
                      className="md:text-left text-[#0a0a0a] leading-none"
                    >
                      {stat.value}
                    </Heading>

                    <span className="text-xs text-[#E31B63] uppercase tracking-[0.18em] font-semibold block">
                      <RichText content={stat.label} />
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-6 flex justify-center lg:justify-start">
                <CTAButton button={button} onOpenForm={() => setIsModalOpen(true)} />
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-[#E31B63]/10 blur-[120px] rounded-full animate-pulse" />
              <Flywheel />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
