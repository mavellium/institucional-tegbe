"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SocialLink from "@/components/ui/socialLink";
import Heading from "@/components/ui/heading";
import RichText from "@/components/ui/rich/richText";
import { Button } from "@/components/ui/button/button";
import Link from "next/link";
import { IButton } from "@/interface/button/IButton";
import { useApi } from "@/hooks/useApi";
import { RichTextItem } from "@/types/richText.type";

interface SocialItem {
  icon: string;
  link: string;
}

interface HeroData {
  tag?: string;
  title: RichTextItem[];
  description: RichTextItem[];
  button?: IButton
  image?: {
    src: string;
    alt?: string;
  };
}

interface SocialData {
  tag?: string;
  title: any;
  items: SocialItem[];
}

interface SideBySideSectionData {
  hero: HeroData;
  social: SocialData;
}

interface SideBySideSectionProps {
  type?: string;
  endpoint: string;
  data?: SideBySideSectionData;
}

export function SideBySideSection({
  endpoint,
}: SideBySideSectionProps) {

  const { data } = useApi<SideBySideSectionData>(endpoint);

  const content = data

  if (!content) return null;

  const { hero, social } = content;

  return (
    <section className="bg-[#F7F6F3] py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* HERO */}

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          <div className="space-y-7 lg:space-y-6 text-center lg:text-left max-w-xl mx-auto lg:mx-0 order-2 lg:order-1">

            {hero.tag && (
              <span className="flex justify-center lg:justify-start text-[18px] font-medium text-[#0a0a0a]">
                {hero.tag}
              </span>
            )}

            <Heading as="h2" size="lg" className="flex justify-center lg:justify-start animate-up max-w-[720px]">
              <RichText content={hero.title} />
            </Heading>

            <div className="text-lg text-[#0a0a0a] leading-relaxed max-w-lg text-center lg:text-left mx-auto lg:mx-0">
              <RichText content={hero.description} />
            </div>

            {hero.button?.action === "link" && (
              <Button asChild variant={hero.button.variant}>
                <Link href={hero.button.link} target={hero.button.target}>
                  {hero.button.label}
                </Link>
              </Button>
            )}

          </div>

          {hero.image?.src && (
            <div className="relative w-full h-[260px] sm:h-[300px] lg:h-[340px] rounded-xl overflow-hidden order-1 lg:order-2">
              <Image
                src={hero.image.src}
                alt={hero.image.alt || ""}
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
          )}

        </div>

        <div className="my-16 border-t border-black/10" />

        {/* SOCIAL */}

        <div className="flex flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left gap-6 md:gap-8">

          <div className="space-y-2">

            {social.tag && (
              <span className="text-[16px] text-[#0a0a0a]">
                {social.tag}
              </span>
            )}

            <Heading as="h3" size="md">
              <RichText content={social.title} />
            </Heading>

          </div>

          {social.items?.length > 0 && (

            <div className="flex gap-4 sm:gap-5 justify-center md:justify-start">

              {social.items.map((item, index) => (

                <SocialLink
                  key={index}
                  icon={item.icon}
                  href={item.link}
                  variant="dark"
                />

              ))}

            </div>

          )}

        </div>

      </div>
    </section>
  );
}