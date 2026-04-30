"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button/button";
import Link from "next/link";
import { IButton } from "@/interface/button/IButton";
import { RichTextItem } from "@/types/richText.type";
import RichText from "@/components/ui/rich/richText";
import Paragrafo from "@/components/ui/paragrafo";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface IEquipe {
  badge: string;
  title: RichTextItem[];
  subtitle: RichTextItem[];
  button: IButton;
  buttonSubtitle: string;
}

export function Equipe({ data }: { data: IEquipe | null }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".reveal-text", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef }
  );

  if (!data) return null;

  return (
    <section
      ref={sectionRef}
      className="py-24 w-full flex flex-col items-center justify-center bg-[#050505] px-6 relative"
    >
      {/* Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#0071E3]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container max-w-5xl relative z-10">
        <div className="flex flex-col items-center text-center w-full">
          {/* Badge */}
          <div className="reveal-text mb-6 flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">
              {data.badge}
            </span>
          </div>

          {/* Title */}
          <div className="reveal-text mb-6 max-w-4xl">
            <Heading as="h1" size="xl" color="white" align="center">
              <RichText content={data.title} />
            </Heading>
          </div>

          {/* Subtitle */}
          <div className="reveal-text max-w-2xl mb-10">
            <Paragrafo align="center">
              <RichText content={data.subtitle} />
            </Paragrafo>
          </div>

          {/* Button */}
          <div className="reveal-text flex flex-col items-center">
            <div className="reveal-text flex flex-col items-center">
              {data.button && data.button.action === "link" && (
                <Button
                  asChild
                  className="group px-8 py-4 rounded-full font-bold bg-green-500 text-black hover:bg-green-400 hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.25)] hover:shadow-[0_0_40px_rgba(34,197,94,0.35)]"
                >
                  <Link href={data.button.link} target="_blank" rel="noopener noreferrer">
                    <span className="flex items-center gap-3">{data.button.label}</span>
                  </Link>
                </Button>
              )}

              <p className="mt-4 text-[11px] text-gray-600 font-medium tracking-widest uppercase">
                {data.buttonSubtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
