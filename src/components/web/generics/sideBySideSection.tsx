"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ButtonLink from "@/components/ui/buttonLink";
import SocialLink from "@/components/ui/socialLink";
import Heading from "@/components/ui/heading";
import RichText from "@/components/ui/richText";

import { TargetVideo } from "@/app/types/target-button.types";

interface SocialItem {
  icon: string;
  link: string;
}

interface HeroData {
  tag?: string;
  title: any;
  description: any;
  button?: {
    label: string;
    link: string;
    target: TargetVideo;
  };
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
  endpoint?: string;
  data?: SideBySideSectionData;
}

export function SideBySideSection({
  endpoint,
  data,
}: SideBySideSectionProps) {

  const [apiData, setApiData] = useState<SideBySideSectionData | null>(null);

  useEffect(() => {

    if (!endpoint || data) return;

    async function fetchData() {
      try {

        const res = await fetch(`/api/${endpoint}`);

        if (!res.ok) throw new Error("Erro na API");

        const json = await res.json();

        setApiData(json);

      } catch (error) {
        console.error("[SideBySideSection] erro ao buscar:", error);
      }
    }

    fetchData();

  }, [endpoint, data]);

  const content = data || apiData;

  if (!content) return null;

  const { hero, social } = content;

  return (
    <section className="bg-[#F7F6F3] py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* HERO */}

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          <div className="space-y-6">

            {hero.tag && (
              <span className="text-[18px] font-medium text-[#0a0a0a]">
                {hero.tag}
              </span>
            )}

            <Heading as="h2" size="lg" className="animate-up max-w-[720px]">
              <RichText content={hero.title} />
            </Heading>

            <div className="text-lg text-[#0a0a0a] leading-relaxed max-w-md">
              <RichText content={hero.description} />
            </div>

            {hero.button && (
              <ButtonLink button={hero.button} />
            )}

          </div>

          {hero.image?.src && (
            <div className="relative w-full h-[320px] lg:h-[340px] rounded-xl overflow-hidden">
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

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

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

            <div className="flex gap-5">

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