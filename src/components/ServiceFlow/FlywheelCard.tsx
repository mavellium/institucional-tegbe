import React from 'react';
import { FlywheelContent } from './types';
import { ServiceFlowTheme } from './constants/themes';
import { Icon } from '@iconify/react';

interface FlywheelCardProps {
  content: FlywheelContent;
  theme: ServiceFlowTheme;
}

export default function FlywheelCard({ content, theme }: FlywheelCardProps) {
  const colors = content.colors || {
    primary: '#3B82F6', // blue-500
    secondary: '#8B5CF6', // purple-500
    accent: '#EC4899', // pink-500
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200/20 bg-gradient-to-br from-gray to-red p-8 backdrop-blur-sm transition-all duration-500 hover:border-rose-500/30 hover:shadow-2xl">
      {/* Gradiente animado de fundo */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 via-pink-300/7 to-gray-500/5 animate-gradient-x" />
      
      {/* Cabeçalho do Flywheel */}
      <div className="relative flex justify-center items-center gap-4 mb-6">
        <div>
          <h3 className="text-2xl flex font-bold bg-gradient-to-r from-red-400 to-pink-600 bg-clip-text text-transparent">
            {content.title}
          </h3>
          <p className="text-sm text-white-600 mt-1">
            {content.subtitle || "Sistema de Crescimento Contínuo"}
          </p>
        </div>
      </div>

      {/* Descrição */}
      <p className="relative text-center text-gray-400 mb-8 text-lg leading-relaxed">
        {content.description}
      </p>

      {/* Elementos visuais do Flywheel */}
      <div className="relative flex items-center justify-center py-8">
        <div className="relative h-64 w-64">
          {/* Anel externo do flywheel */}
          <div 
            className="absolute inset-0 rounded-full border-4 animate-spin-slow"
            style={{ borderColor: `${colors.primary}30` }}
          />
          
          {/* Anel médio */}
          <div 
            className="absolute inset-8 rounded-full border-4 animate-spin-reverse-slow"
            style={{ borderColor: `${colors.secondary}30` }}
          />
          
          {/* Anel interno */}
          <div 
            className="absolute inset-16 rounded-full border-4 animate-spin-slow"
            style={{ borderColor: `${colors.accent}30` }}
          />
          
          {/* Pontos do flywheel */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col items-center">
              <div 
                className="h-3 w-3 rounded-full mb-12 animate-pulse"
                style={{ backgroundColor: colors.primary }}
              />
              <div 
                className="h-3 w-3 rounded-full mb-12 animate-pulse delay-300"
                style={{ backgroundColor: colors.secondary }}
              />
              <div 
                className="h-3 w-3 rounded-full animate-pulse delay-700"
                style={{ backgroundColor: colors.accent }}
              />
            </div>
          </div>
          
          {/* Textos das fases - dinâmicas da API */}
          {content.phases.map((phase, index) => {
            const positions = [
              { top: "0%", left: "50%", transform: "translate(-50%, -50%)" }, // Top
              { bottom: "0%", left: "50%", transform: "translate(-50%, 50%)" }, // Bottom
              { top: "50%", right: "0%", transform: "translate(50%, -50%)" }, // Right
              { top: "50%", left: "0%", transform: "translate(-50%, -50%)" }, // Left
            ];
            
            return (
              <div
                key={index}
                className="absolute"
                style={positions[index]}
              >
                <span 
                  className="text-xs font-bold"
                  style={{ color: phase.color || colors.primary }}
                >
                  {phase.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Benefícios - dinâmicos da API */}
      {content.benefits && content.benefits.length > 0 && (
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {content.benefits.map((benefit, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-2 p-3 rounded-lg border border-pink-700/10 hover:border-rose-500/30 transition-all duration-400 bg-black/70 backdrop-blur-sm"
            >
              <Icon icon="mdi:check-circle" className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-gray-300">{benefit}</span>
            </div>
          ))}
        </div>
      )}

      {/* Estilos CSS para animações */}
      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse-slow {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-reverse-slow {
          animation: spin-reverse-slow 15s linear infinite;
        }
      `}</style>
    </div>
  );
}