"use client";

import { Service, ServiceTheme } from './types';
import { Icon } from '@iconify/react';
import ServiceVisual from './ServiceVisual';

interface ServiceCardProps {
  service: Service;
  theme: ServiceTheme;
  variant: string;
}

export default function ServiceCard({ service, theme, variant }: ServiceCardProps) {
  return (
    <div 
      className={`
        service-card relative overflow-hidden rounded-[2rem] p-8 border group
        will-change-transform transition-all duration-500 hover:-translate-y-1
        flex flex-col h-full w-full /* ESSENCIAL para alinhar alturas */
        ${theme.card.background} ${theme.card.border} ${theme.card.hover}
        ${variant === 'sobre' && service.wide ? 'md:flex-row md:items-center md:gap-10' : ''}
      `}
    >
      {/* Número de Fundo - Mantido sutil */}
      <span className={`
        absolute right-6 top-6 text-6xl font-black select-none pointer-events-none transition-colors duration-500
        ${variant === 'home' ? 'text-gray-100 group-hover:text-gray-200' : ''}
        ${variant === 'marketing' ? 'text-white/5 group-hover:text-white/10 text-7xl' : ''}
        ${variant === 'sobre' ? 'hidden' : ''}
      `}>
        {service.step}
      </span>

      {/* Conteúdo Principal - Usando flex-1 para empurrar a Área Visual para o fundo */}
      <div className={`relative z-10 flex flex-col flex-1 justify-between ${variant === 'sobre' && service.wide ? 'md:w-1/2 h-full' : ''}`}>
        <div className="flex-1">
          {/* Ícone com transição suave, sem preenchimento agressivo */}
          <div 
            className={`
              w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm
              transition-all duration-500 group-hover:scale-110
              ${variant === 'home' ? 'bg-gray-50 border border-gray-100' : ''}
              ${variant === 'marketing' ? 'bg-white/5 border border-white/10' : ''}
              ${variant === 'sobre' ? `${theme.badge.background}` : ''}
            `}
            style={{ color: service.color }}
          >
            <Icon icon={service.icon} width="28" height="28" />
          </div>

          <h1 className={`text-2xl font-bold mb-3 w-11/12 md:w-full ${theme.text.title}`}>
            {service.title}
          </h1>

          <p className={`
            leading-relaxed text-base mb-6
            ${variant === 'home' ? 'text-gray-600 font-medium' : ''}
            ${variant === 'marketing' ? 'text-gray-400 font-light border-l-2 border-white/10 pl-4' : ''}
            ${variant === 'sobre' ? 'text-gray-500 font-medium' : ''}
          `}>
            {service.description}
          </p>
        </div>

        {/* Área Visual - Fixada no rodapé do card para manter alinhamento */}
        <div className={`
          relative rounded-xl border overflow-hidden mt-auto
          transition-colors duration-500
          ${variant === 'home' ? 'h-32 bg-gray-50/50 border-gray-100' : ''}
          ${variant === 'marketing' ? 'h-32 bg-black/40 border-white/5' : ''}
          ${variant === 'sobre' ? `${service.wide ? 'mt-0 md:absolute md:right-0 md:top-0 md:w-1/2 md:h-full md:rounded-none' : 'h-[140px]'} bg-[#F5F5F7] border-gray-100` : ''}
        `}>
          <ServiceVisual service={service} variant={variant} />
        </div>
      </div>

      {/* REFINAMENTO: Borda inferior sutil de 2px em vez de preenchimento total */}
      <div 
        className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-700 ease-in-out opacity-70"
        style={{ backgroundColor: service.color }}
      />
    </div>
  );
}