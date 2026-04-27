"use client";

import { ServiceA, ServiceTheme } from '../../types/service.type';

interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  service: ServiceA;
  theme: ServiceTheme;
  variant: string;
}

export default function ServiceCard({ service, theme, variant }: ServiceCardProps) {
  // Cores de fallback
  const accentColor = service.color ?? "#FF9500";
  const titleColor = service.titleColor ?? "#1D1D1F";
  const descColor = service.descColor ?? "#86868B";

  return (
    <div
      className={`
        group relative flex flex-col w-full aspect-[3/4] overflow-hidden rounded-[18px] 
        transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        shadow-[0_2px_8px_rgba(0,0,0,0.04),_0_1px_32px_rgba(0,0,0,0.04)]
        hover:shadow-[0_2px_10px_rgba(0,0,0,0.20)] hover:-translate-y-1 cursor-pointer
      `}
    >
      {/* 1. Imagem de Fundo Preenchendo o Card */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Se quiser usar o Next Image depois, é só trocar a tag */}
        <img
          src={service.image} // Vai vir do seu JSON
          alt={service.title}
          // object-bottom joga a imagem pra baixo (como o iPhone na foto da Apple)
          className="w-full h-full object-cover object-bottom transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* 2. Conteúdo de Texto (Sobreposto) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">

        {/* Tag do Passo */}
        <span
          className="mb-2 text-[10px] font-bold uppercase tracking-widest"
          style={{ color: accentColor }}
        >
          {service.step}
        </span>

        {/* Título */}
        <h3
          className="mb-2 text-[24px] font-semibold tracking-tight md:text-[28px] leading-tight"
          style={{ color: titleColor }}
        >
          {service.title}
        </h3>

        {/* Descrição */}
        <p
          className="text-[15px] font-medium leading-relaxed line-clamp-3 md:line-clamp-4 max-w-[90%]"
          style={{ color: descColor }}
        >
          {service.description}
        </p>

      </div>
    </div>
  );
}