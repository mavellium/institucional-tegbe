"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import ButtonLink from "@/components/ui/buttonLink";

interface SocialItem {
  icon: string;
  link: string;
}

interface SideBySideSectionProps {
  type: string
  data: {
    hero: {
      tag: string;
      title: string;
      description: string;
      button: {
        label: string;
        link: string;
      };
      image: {
        src: string;
        alt: string;
      };
    };
    social: {
      tag: string;
      title: string;
      items: SocialItem[];
    };
  };
}

export function SideBySideSection({ data }: SideBySideSectionProps) {
  const { hero, social } = data;

  return (
    <section className="bg-[#F7F6F3] py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* HERO */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* TEXTO */}
          <div className="space-y-6">

            <span className="text-sm text-[#0a0a0a] text-[18px] font-medium">
              {hero.tag}
            </span>

            <h2 className="text-4xl lg:text-5xl font-medium text-[#0a0a0a] leading-tight">
              {hero.title}
            </h2>

            <p className="text-lg text-[#0a0a0a] leading-relaxed max-w-md">
              {hero.description}
            </p>

            <ButtonLink button={{
              label: "Conheça nossas vagas",
              link: "carreiras"
            }}/>

          </div>

          {/* IMAGEM */}
          <div className="relative w-full h-[320px] lg:h-[340px] rounded-xl overflow-hidden">

            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              className="object-cover"
            />

          </div>

        </div>

        {/* DIVIDER */}
        <div className="my-16 border-t border-black/10" />

        {/* SOCIAL */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

          <div>

            <span className="text-sm text-[#0a0a0a] text-[16px]">
              {social.tag}
            </span>

            <h3 className="text-4xl font-medium text-[#0a0a0a] mt-1">
              {social.title}
            </h3>

          </div>

          <div className="flex gap-5">

            {social.items.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="
                  w-12
                  h-12
                  rounded-full
                  bg-black/60
                  flex
                  items-center
                  justify-center
                  text-white
                  hover:scale-105
                  transition
                "
              >
                <Icon icon={item.icon} className="text-xl" />
              </a>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}