"use client";

import { useApi } from "@/hooks/useApi";
import { RichTextItem } from "@/types/richText.type";
import { TextItem } from "@/types/textType";
import Image from "next/image";

interface HeroData {
  logo: {
    imagem: string;
    alt: string;
    width?: number;
    height?: number;
  };
  tagline: TextItem[];
  backgroundText: TextItem[];
  theme?: {
    backgroundColor?: string;
    accentColor?: string;
  };
}

const Hero = () => {
  const { data } = useApi<HeroData>("inicio");

  if (!data) return null;

  return (
    <section
      className="relative flex items-center justify-center min-h-[520px] md:min-h-[592px] w-full overflow-hidden"
      style={{
        backgroundColor: data.theme?.backgroundColor || "#0A0A0A",
      }}
    >
      {/* Glow */}
      <div className="absolute top-[-180px] md:top-[-250px] w-[600px] h-[600px] md:w-[900px] md:h-[900px] bg-yellow-400/10 blur-[200px] rounded-full" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center text-center gap-8 px-6">
        <Image
          src={data.logo.imagem}
          alt={data.logo.alt}
          width={data.logo.width || 320}
          height={data.logo.height || 150}
          priority
          className="w-[220px] sm:w-[280px] md:w-[420px] object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
        />
      </div>

      {/* Tagline */}
      <p
        className="absolute bottom-10 px-6 z-10 text-xl sm:text-2xl md:text-4xl italic font-medium tracking-wide font-serif text-center"
        style={{ color: data.theme?.accentColor || "#F1D95D" }}
      >
        {data.tagline.map(item => item.value).join("")}
      </p>

      {/* Background Text */}
      <div className="absolute right-[-40px] md:right-[-30px] bottom-[-80px] md:bottom-[-130px] whitespace-nowrap opacity-[0.025] select-none pointer-events-none">
        <span className="text-white text-[120px] md:text-[260px] font-medium tracking-[-0.04em] uppercase">
          {data.backgroundText.map(item => item.value).join("")}
        </span>
      </div>

      {/* Gradient bottom */}
      <div className="absolute bottom-0 w-full h-[80px] md:h-[120px] bg-gradient-to-t from-black to-transparent" />
    </section>
  );
};

export default Hero;