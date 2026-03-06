"use client";

import { Icon } from '@iconify/react';
import { Service } from './types';

interface ServiceVisualProps {
  service: Service;
  variant: string;
}

export default function ServiceVisual({ service, variant }: ServiceVisualProps) {
  // Log para depuração – ajuda a identificar se a variante está sendo reconhecida
  console.log(`🎨 ServiceVisual: variant="${variant}", visualType="${service.visualType}", wide=${service.wide}`);

  // Variantes que compartilham os mesmos visuais da antiga 'home'
  const useHomeVisuals = ['home', 'ecommerce', 'marketing'].includes(variant);

  if (useHomeVisuals) {
    // Gráficos da home (agora também usados por ecommerce e marketing)
    switch (service.visualType) {
      case 'traffic':
        return (
          <div className="absolute inset-0 flex items-end justify-center gap-1 p-4">
            <div className="w-6 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm h-[30%] opacity-80 group-hover:h-[50%] transition-all duration-700"></div>
            <div className="w-6 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm h-[50%] opacity-90 group-hover:h-[70%] transition-all duration-700 delay-100"></div>
            <div className="w-6 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm h-[40%] opacity-80 group-hover:h-[60%] transition-all duration-700 delay-200"></div>
            <div className="w-6 bg-gradient-to-t from-blue-600 to-blue-500 rounded-t-sm h-[70%] group-hover:h-[90%] transition-all duration-700 delay-300 shadow-lg shadow-blue-500/30"></div>
          </div>
        );

      case 'crm':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-20 h-20">
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <circle cx="20" cy="20" r="16" fill="none" stroke="#374151" strokeWidth="2" />
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeDasharray="100"
                  strokeDashoffset="25"
                  strokeLinecap="round"
                  className="origin-center -rotate-90 transition-all duration-700 group-hover:stroke-dashoffset-10"
                />
                <text x="20" y="24" textAnchor="middle" className="text-[8px] fill-blue-400 font-bold">85%</text>
              </svg>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 whitespace-nowrap">
                Retenção
              </div>
            </div>
          </div>
        );

      case 'social':
        return (
          <div className="absolute inset-0 flex items-center justify-center gap-4">
            <div className="flex flex-col items-center">
              <Icon icon="mdi:amazon" className="text-black w-6 h-6 mb-1" />
              <div className="w-1 bg-orange-400 h-8 rounded-t-full group-hover:h-10 transition-all"></div>
              <span className="text-[8px] text-gray-400 mt-1">2.4k</span>
            </div>
            <div className="flex flex-col items-center">
              <Icon icon="mdi:handshake-outline" className="text-blue-500 w-6 h-6 mb-1" />
              <div className="w-1 bg-yellow-500 h-12 rounded-t-full group-hover:h-14 transition-all delay-100"></div>
              <span className="text-[8px] text-gray-400 mt-1">5.1k</span>
            </div>
            <div className="flex flex-col items-center">
              <Icon icon="mdi:shopping" className="text-orange-600 w-6 h-6 mb-1" />
              <div className="w-1 bg-orange-600 h-6 rounded-t-full group-hover:h-8 transition-all delay-200"></div>
              <span className="text-[8px] text-gray-400 mt-1">892</span>
            </div>
          </div>
        );

      case 'seo':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-end gap-1">
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-gray-500">G</span>
                <div className="w-4 bg-green-500 h-12 rounded-t-sm group-hover:h-16 transition-all"></div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-gray-500">1</span>
                <div className="w-4 bg-blue-500 h-16 rounded-t-sm group-hover:h-20 transition-all delay-100"></div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-gray-500">2</span>
                <div className="w-4 bg-yellow-500 h-8 rounded-t-sm group-hover:h-10 transition-all delay-200"></div>
              </div>
            </div>
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

      case "bar-chart":
        return (
          <div className="absolute inset-0 flex items-end justify-center gap-3 pb-8 px-8">
            <div className="w-4 bg-gray-300 rounded-t-sm h-[30%] group-hover:bg-[#0071E3]/40 group-hover:h-[45%] transition-all duration-700 delay-75"></div>
            <div className="w-4 bg-gray-300 rounded-t-sm h-[50%] group-hover:bg-[#0071E3]/60 group-hover:h-[70%] transition-all duration-700 delay-100"></div>
            <div className="w-4 bg-gray-300 rounded-t-sm h-[40%] group-hover:bg-[#0071E3]/50 group-hover:h-[55%] transition-all duration-700 delay-150"></div>
            <div className="w-4 bg-[#0071E3] rounded-t-sm h-[70%] group-hover:h-[90%] shadow-lg shadow-blue-500/20 transition-all duration-700 delay-200"></div>
          </div>
        );

      case 'training':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex gap-2 items-end">
              <div className="flex flex-col items-center">
                <span className="text-[8px] text-gray-400">CAC</span>
                <div className="w-4 bg-green-400 h-12 rounded-t-sm group-hover:h-16 transition-all"></div>
                <span className="text-[6px] text-green-300">-35%</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[8px] text-gray-400">ROAS</span>
                <div className="w-4 bg-blue-400 h-16 rounded-t-sm group-hover:h-20 transition-all delay-100"></div>
                <span className="text-[6px] text-blue-300">+52%</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[8px] text-gray-400">Conv.</span>
                <div className="w-4 bg-purple-400 h-10 rounded-t-sm group-hover:h-14 transition-all delay-200"></div>
                <span className="text-[6px] text-purple-300">+28%</span>
              </div>
            </div>
          </div>
        );

      case 'ads':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-24 h-28 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden shadow-xl group-hover:scale-105 transition-transform duration-500">
                <div className="h-10 bg-gradient-to-br from-blue-400 to-purple-500"></div>
                <div className="p-2">
                  <div className="h-1 w-12 bg-black/40 rounded mb-1"></div>
                  <div className="h-1 w-8 bg-black/40 rounded"></div>
                </div>
                <div className="absolute bottom-1 right-1 flex items-center gap-1">
                  <Icon icon="mdi:heart-outline" className="w-3 h-3 text-red-300" />
                  <span className="text-[6px] text-black">2.4k</span>
                </div>
              </div>
              <div className="ml-2 flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <span className="text-[6px] text-gray-300">CTR</span>
                  <div className="w-8 h-1.5 bg-gray-600 rounded-full overflow-hidden">
                    <div className="h-full bg-green-400 w-[80%] group-hover:w-[95%] transition-all"></div>
                  </div>
                  <span className="text-[6px] text-green-400">3.2%</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[6px] text-gray-300">CPC</span>
                  <div className="w-8 h-1.5 bg-gray-600 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400 w-[40%] group-hover:w-[25%] transition-all"></div>
                  </div>
                  <span className="text-[6px] text-blue-400">R$0,95</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[6px] text-gray-300">ROAS</span>
                  <div className="w-8 h-1.5 bg-gray-600 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-400 w-[60%] group-hover:w-[90%] transition-all"></div>
                  </div>
                  <span className="text-[6px] text-purple-400">4.1x</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ads-creation':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex gap-1">
              <div className="w-12 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg overflow-hidden shadow-lg flex flex-col">
                <div className="h-6 bg-blue-300 m-1 rounded-sm"></div>
                <div className="h-2 bg-gray-400 mx-1 rounded-full w-8"></div>
                <div className="h-2 bg-gray-400 mx-1 rounded-full w-6 my-1"></div>
                <div className="mt-auto mb-1 mx-1 h-3 bg-blue-400 rounded-sm text-[4px] text-white text-center leading-3">
                  COMPRAR
                </div>
              </div>
              <div className="w-12 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg overflow-hidden shadow-lg flex flex-col">
                <div className="h-6 bg-orange-300 m-1 rounded-sm"></div>
                <div className="h-2 bg-gray-400 mx-1 rounded-full w-8"></div>
                <div className="h-2 bg-gray-400 mx-1 rounded-full w-6 my-1"></div>
                <div className="mt-auto mb-1 mx-1 h-3 bg-orange-400 rounded-sm text-[4px] text-white text-center leading-3">
                  SAIBA +
                </div>
              </div>
            </div>
          </div>
        );

      default:
        if (service.wide) {
          return (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <Icon icon="mdi:advertisements" className="w-22 h-22 text-yellow-500/50 group-hover:text-yellow-400 transition-colors" />
                <div className="absolute top-1 -right-4 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center text-[8px] font-bold text-black">
                  1
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <svg viewBox="0 0 100 50" className="w-full h-full text-gray-400 group-hover:text-blue-400 transition-colors">
                <polyline
                  points="0,40 20,30 40,35 60,15 80,25 100,10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="drop-shadow-md"
                />
                <circle cx="100" cy="10" r="2" className="fill-current" />
              </svg>
            </div>
          );
        }
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
              <Icon icon="ph:check-circle-fill" className="text-green-500 w-4 h-4" />
              <span className="text-xs font-bold text-gray-600">Acesso Liberado</span>
            </div>
          </div>
        );
    }
  }

  // Fallback para variantes não reconhecidas – ajuda a identificar erros
  return (
    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs bg-gray-50/50">
      Visual não disponível para variante: "{variant}"
    </div>
  );
}