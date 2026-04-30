"use client";

import Image from "next/image";
import { ServiceA, ServiceTheme } from "../../types/service.type";

interface ServiceCardProps {
  service: ServiceA;
  theme: ServiceTheme;
  variant: string;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const accentColor = service.color ?? "#FF9500";
  const titleColor = service.titleColor ?? "#1D1D1F";
  const descColor = service.descColor ?? "#86868B";

  return (
    <div
      className={`
        group relative flex flex-col w-full aspect-[2/3] overflow-hidden rounded-[18px]
        transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        shadow-[0_2px_8px_rgba(0,0,0,0.04),_0_1px_32px_rgba(0,0,0,0.04)]
        hover:shadow-[0_2px_10px_rgba(0,0,0,0.20)] hover:-translate-y-1 cursor-pointer
      `}
    >
      {/* IMAGEM DE FUNDO */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-bottom transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* TEXTO SOBREPOSTO — padding e fonte escalam com o breakpoint */}
      <div className="relative z-10 flex flex-col p-5 sm:p-6 lg:p-6 xl:p-10 pointer-events-none">
        <span
          className="mb-1.5 text-[10px] xl:text-[10px] font-bold uppercase tracking-widest"
          style={{ color: accentColor }}
        >
          {service.step}
        </span>

        {/*
          hyphens-none  → desativa hifenização automática
          [word-break:normal] + [overflow-wrap:anywhere] → só quebra palavra
          como último recurso (nunca no hífen literal de "e-commerce")
        */}
        <h3
          className="mb-1.5 text-[27px] xl:text-[24px] font-semibold tracking-tight leading-snug hyphens-none [word-break:normal] [overflow-wrap:anywhere]"
          style={{ color: titleColor }}
        >
          {service.title}
        </h3>

        <p
          className="text-[15px] xl:text-[15px] font-medium leading-relaxed line-clamp-3 max-w-[95%]"
          style={{ color: descColor }}
        >
          {service.description}
        </p>
      </div>
    </div>
  );
}
