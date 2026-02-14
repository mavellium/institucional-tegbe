"use client";

import React from "react";
import { TrendingUp, Zap } from "lucide-react";

interface FlywheelProps {
  centerText?: string;
  outerItems?: string[];
  innerItems?: string[];
}

export default function Flywheel({ 
  centerText = "CRESCIMENTO",
  outerItems = ["DESCONHECIDOS", "PROSPECTS", "CLIENTES", "PROMOTORES"],
  innerItems = ["ATRAIR", "ENVOLVER", "ENCANTAR"]
}: FlywheelProps) {
  return (
    <div className="relative w-full max-w-[520px] aspect-square mx-auto">
      <style>{`
        @keyframes spin-left { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes spin-right { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow-left { animation: spin-left 30s linear infinite; transform-origin: center; }
        .animate-spin-slow-right { animation: spin-right 20s linear infinite; transform-origin: center; }
      `}</style>

      <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-2xl overflow-visible">
        <defs>
          <linearGradient id="gradOuter" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF0F43" />
            <stop offset="100%" stopColor="#E31B63" />
          </linearGradient>
          <linearGradient id="gradInner" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E31B63" />
            <stop offset="100%" stopColor="#FF0F43" />
          </linearGradient>
          
          <path id="pathOuter" d="M 250,250 m -200,0 a 200,200 0 1,1 400,0 a 200,200 0 1,1 -400,0" />
          <path id="pathInner" d="M 250,250 m -135,0 a 135,135 0 1,1 270,0 a 135,135 0 1,1 -270,0" />
        </defs>

        {/* Outer Ring - COR MAIS FRACA (Opacidade reduzida) */}
        <g className="animate-spin-slow-left">
          <circle cx="250" cy="250" r="200" fill="none" stroke="url(#gradOuter)" strokeWidth="45" strokeLinecap="round" strokeOpacity="0.2" />
          <text fill="white" fillOpacity="0.5" fontSize="12" fontWeight="800" letterSpacing="0.15em">
            {outerItems.map((item, i) => (
              <textPath key={i} href="#pathOuter" startOffset={`${12.5 + (i * 25)}%`} textAnchor="middle">{item}</textPath>
            ))}
          </text>
        </g>

        {/* Inner Ring - COR MÉDIA (Opacidade intermediária) */}
        <g className="animate-spin-slow-right">
          <circle cx="250" cy="250" r="135" fill="none" stroke="url(#gradInner)" strokeWidth="55" strokeLinecap="round" strokeOpacity="0.4" />
          <text fill="white" fillOpacity="0.8" fontSize="14" fontWeight="900">
            {innerItems.map((item, i) => (
              <textPath key={i} href="#pathInner" startOffset={`${16.6 + (i * 33.3)}%`} textAnchor="middle">{item}</textPath>
            ))}
          </text>
        </g>

        {/* Center - COR FORTE (Destaque total no Crescimento) */}
        <g>
          {/* Brilho de fundo para intensificar a cor */}
          <circle cx="250" cy="250" r="95" fill="url(#gradOuter)" fillOpacity="0.3" filter="blur(15px)" />
          {/* Círculo central sólido com a cor forte da marca */}
          <circle cx="250" cy="250" r="85" fill="url(#gradOuter)" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
          <text 
            x="250" 
            y="250" 
            textAnchor="middle" 
            dominantBaseline="middle" 
            fill="white" 
            fontSize="18" 
            fontWeight="950" 
            letterSpacing="0.1em"
            style={{ filter: "drop-shadow(0px 0px 4px rgba(0,0,0,0.5))" }}
          >
            {centerText}
          </text>
        </g>
      </svg>

      {/* Badges Flutuantes */}
      <div className="absolute top-6 right-6 p-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl">
        <Zap className="w-5 h-5 text-[#FF0F43]" />
      </div>
      <div className="absolute bottom-10 left-6 p-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl">
        <TrendingUp className="w-5 h-5 text-[#E31B63]" />
      </div>
    </div>
  );
}