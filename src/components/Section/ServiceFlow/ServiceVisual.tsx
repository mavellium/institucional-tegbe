"use client";

import { Icon } from '@iconify/react';
import { Service } from './types';

interface ServiceVisualProps {
  service: Service;
  variant: string;
}

export default function ServiceVisual({ service, variant }: ServiceVisualProps) {
  // Renderizações específicas por variante
  if (variant === 'home') {
    return (
      <div className="flex items-center justify-center text-gray-400 text-xs font-bold uppercase tracking-widest h-full">
        {service.wide ? '🏆 [Área da Medalha 3D]' : '📈 [Gráfico de Performance]'}
      </div>
    );
  }

  if (variant === 'marketing') {
    switch (service.id) {
      case 'traffic':
        return (
          <div className="flex gap-2 items-end h-16 w-32 pb-4 opacity-50 group-hover:opacity-100 transition-opacity">
            <div className="w-4 h-8 bg-gray-800 rounded-t-sm animate-pulse"></div>
            <div className="w-4 h-12 bg-gray-700 rounded-t-sm"></div>
            <div className="w-4 h-10 bg-gray-700 rounded-t-sm"></div>
            <div className="w-4 h-full bg-[#E31B63] rounded-t-sm shadow-[0_0_10px_#E31B63]"></div>
          </div>
        );

      case 'crm':
        return (
          <div className="relative w-full h-full p-4 flex flex-col gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
            <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-[#E31B63]"></div>
            </div>
            <div className="flex justify-between items-center px-4">
              <div className="w-8 h-8 rounded-full border border-white/10 bg-white/5"></div>
              <div className="h-[1px] w-8 bg-gray-700"></div>
              <div className="w-8 h-8 rounded-full border border-[#E31B63] bg-[#E31B63]/20"></div>
            </div>
          </div>
        );

      default:
        return (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-900/20 via-transparent to-transparent group-hover:from-rose-600/20 transition-all duration-700">
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon 
                icon="mdi:finance" 
                className="text-gray-700 w-16 h-16 group-hover:text-[#E31B63] transition-colors duration-500" 
              />
            </div>
          </div>
        );
    }
  }

  if (variant === 'sobre') {
    switch (service.visualType) {
      case "bar-chart":
        return (
          <div className="absolute inset-0 flex items-end justify-center gap-3 pb-8 px-8">
            <div className="w-4 bg-gray-300 rounded-t-sm h-[30%] group-hover:bg-[#0071E3]/40 group-hover:h-[45%] transition-all duration-700 delay-75"></div>
            <div className="w-4 bg-gray-300 rounded-t-sm h-[50%] group-hover:bg-[#0071E3]/60 group-hover:h-[70%] transition-all duration-700 delay-100"></div>
            <div className="w-4 bg-gray-300 rounded-t-sm h-[40%] group-hover:bg-[#0071E3]/50 group-hover:h-[55%] transition-all duration-700 delay-150"></div>
            <div className="w-4 bg-[#0071E3] rounded-t-sm h-[70%] group-hover:h-[90%] shadow-lg shadow-blue-500/20 transition-all duration-700 delay-200"></div>
          </div>
        );

      case "trend-line":
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg 
              className="w-full h-full p-6 text-gray-300 group-hover:text-[#0071E3] transition-colors duration-500" 
              viewBox="0 0 100 50" 
              preserveAspectRatio="none"
            >
              <path 
                d="M0,50 Q25,45 50,25 T100,5" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round"
                className="drop-shadow-md"
              />
              <circle cx="100" cy="5" r="3" className="fill-[#0071E3] animate-pulse" />
            </svg>
          </div>
        );

      default:
        return (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 gap-2">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-[80%] group-hover:w-[95%] transition-all duration-1000 ease-out"></div>
            </div>
            <div className="w-full flex justify-between text-[10px] text-gray-400 font-mono uppercase">
              <span>Investimento</span>
              <span className="text-green-600 font-bold">ROI Positivo</span>
            </div>
            <div className="mt-2 p-2 rounded-lg bg-white shadow-sm border border-gray-100 flex items-center gap-2">
              <Icon icon="ph:check-circle-fill" className="text-green-500 w-4 h-4"/>
              <span className="text-xs font-bold text-gray-600">Acesso Liberado</span>
            </div>
          </div>
        );
    }
  }

  return null;
}