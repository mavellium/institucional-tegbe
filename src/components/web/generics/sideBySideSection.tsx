"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import ButtonLink from "@/components/ui/buttonLink";
import { TargetVideo } from "@/app/types/target-button.types";
import SocialLink from "@/components/ui/socialLink";
import Heading from "@/components/ui/heading";

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
        target: TargetVideo
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


            <Heading
              as="h2"
              size="lg"
              className="animate-up max-w-[720px]"
            >
              {hero.title}
            </Heading>

            <p className="text-lg text-[#0a0a0a] leading-relaxed max-w-md">
              {hero.description}
            </p>

            <ButtonLink button={{
              label: hero.button.label,
              link: hero.button.link,
              target: hero.button.target
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
              <SocialLink
                key={index}
                icon={item.icon}
                href={item.link}
                // variant removed or replace with a valid SocialVariant value if needed
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}