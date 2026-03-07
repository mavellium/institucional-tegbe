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
  
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };

  // Desenha o formato do Chevron (Flecha)
  const getChevronPath = (
    centerX: number, centerY: number, 
    innerRadius: number, outerRadius: number, 
    startAngle: number, endAngle: number, 
    reverse: boolean = false
  ) => {
    const midRadius = (innerRadius + outerRadius) / 2;
    const arrowDepth = 8; 

    if (!reverse) {
      const p1 = polarToCartesian(centerX, centerY, outerRadius, endAngle - arrowDepth);
      const p2 = polarToCartesian(centerX, centerY, midRadius, endAngle);
      const p3 = polarToCartesian(centerX, centerY, innerRadius, endAngle - arrowDepth);
      const p4 = polarToCartesian(centerX, centerY, innerRadius, startAngle);
      const p5 = polarToCartesian(centerX, centerY, midRadius, startAngle + arrowDepth);
      const p6 = polarToCartesian(centerX, centerY, outerRadius, startAngle);
      return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${innerRadius} ${innerRadius} 0 0 0 ${p4.x} ${p4.y} L ${p5.x} ${p5.y} L ${p6.x} ${p6.y} A ${outerRadius} ${outerRadius} 0 0 1 ${p1.x} ${p1.y} Z`;
    } else {
      const p1 = polarToCartesian(centerX, centerY, outerRadius, startAngle + arrowDepth);
      const p2 = polarToCartesian(centerX, centerY, midRadius, startAngle);
      const p3 = polarToCartesian(centerX, centerY, innerRadius, startAngle + arrowDepth);
      const p4 = polarToCartesian(centerX, centerY, innerRadius, endAngle);
      const p5 = polarToCartesian(centerX, centerY, midRadius, endAngle - arrowDepth);
      const p6 = polarToCartesian(centerX, centerY, outerRadius, endAngle);
      return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${innerRadius} ${innerRadius} 0 0 1 ${p4.x} ${p4.y} L ${p5.x} ${p5.y} L ${p6.x} ${p6.y} A ${outerRadius} ${outerRadius} 0 0 0 ${p1.x} ${p1.y} Z`;
    }
  };

  // Cria um arco invisível centralizado para guiar o texto
  const getLabelPath = (centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number, reverse: boolean) => {
    const start = polarToCartesian(centerX, centerY, radius, reverse ? endAngle : startAngle);
    const end = polarToCartesian(centerX, centerY, radius, reverse ? startAngle : endAngle);
    const sweep = reverse ? 0 : 1;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 ${sweep} ${end.x} ${end.y}`;
  };

  return (
    <div className="relative w-full max-w-[550px] aspect-square mx-auto flex items-center justify-center  rounded-xl overflow-hidden">
      <style>{`
        @keyframes spin-cw { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-ccw { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        .animate-spin-outer { animation: spin-ccw 50s linear infinite; transform-origin: center; }
        .animate-spin-inner { animation: spin-cw 35s linear infinite; transform-origin: center; }
      `}</style>

      <svg viewBox="0 0 500 500" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF0F43" />
            <stop offset="100%" stopColor="#E31B63" />
          </linearGradient>
        </defs>

        {/* Anel Externo - Pontas Invertidas */}
        <g className="animate-spin-outer">
          {outerItems.map((item, i) => {
            const angle = 360 / outerItems.length;
            const start = i * angle;
            const end = (i + 1) * angle;
            const id = `outerPathLabel${i}`;
            return (
              <g key={`outer-group-${i}`}>
                <path
                  d={getChevronPath(250, 250, 190, 235, start + 1, end - 1, true)}
                  fill="#FF0F43" fillOpacity="0.1" stroke="#FF0F43" strokeOpacity="0.4" strokeWidth="1"
                />
                <path id={id} d={getLabelPath(250, 250, 212.5, start + 5, end - 5, true)} fill="none" />
                <text fill="white" fillOpacity="0.7" fontSize="12" fontWeight="800" letterSpacing="0.05em">
                  <textPath href={`#${id}`} startOffset="50%" textAnchor="middle" dominantBaseline="middle">
                    {item}
                  </textPath>
                </text>
              </g>
            );
          })}
        </g>

        {/* Anel Interno - Pontas Horário */}
        <g className="animate-spin-inner">
          {innerItems.map((item, i) => {
            const angle = 360 / innerItems.length;
            const start = i * angle;
            const end = (i + 1) * angle;
            const id = `innerPathLabel${i}`;
            return (
              <g key={`inner-group-${i}`}>
                <path
                  d={getChevronPath(250, 250, 115, 175, start + 2, end - 2, false)}
                  fill="#FF0F43" fillOpacity="0.25" stroke="#FF0F43" strokeOpacity="0.6" strokeWidth="1"
                />
                <path id={id} d={getLabelPath(250, 250, 145, start + 8, end - 8, false)} fill="none" />
                <text fill="white" fontSize="16" fontWeight="900">
                  <textPath href={`#${id}`} startOffset="50%" textAnchor="middle" dominantBaseline="middle">
                    {item}
                  </textPath>
                </text>
              </g>
            );
          })}
        </g>

        

        {/* Centro Sólido */}
        <circle cx="250" cy="250" r="82" fill="url(#brandGrad)" />
        <text 
          x="250" y="250" textAnchor="middle" dominantBaseline="middle" 
          fill="white" fontSize="14" fontWeight="950" className="tracking-tight"
        >
          {centerText}
        </text>
      </svg>

      {/* Ícones de Impulso nas Bordas */}
      <div className="absolute top-[8%] right-[8%] w-11 h-11 bg-[#FF0F43]/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 shadow-lg">
        <Zap className="w-5 h-5 text-[#FF0F43] fill-[#FF0F43]" />
      </div>
      <div className="absolute bottom-[8%] left-[8%] w-11 h-11 bg-[#E31B63] rounded-full flex items-center justify-center shadow-2xl">
        <TrendingUp className="w-5 h-5 text-white" />
      </div>
    </div>
  );
}