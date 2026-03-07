"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- TIPAGEM ---
interface ValueItem {
  image?: string;
  icon: string;
  title: string;
  description: string;
}

interface SectionData {
  header: {
    title: string;
    preTitle: string;
    subtitle: string;
  };
  values: ValueItem[];
}

interface SociosProps {
  endpoint?: string;
  variant?: "sobre";
  primaryColor?: string; // cor principal no formato hexadecimal (ex: #FFD700)
}

// Função auxiliar para converter hex para rgb
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function SociosCrescimento({
  endpoint = "https://tegbe-dashboard.vercel.app/api/tegbe-institucional/socios",
  variant = "sobre",
  primaryColor = "#FFD700", // valor padrão (amarelo)
}: SociosProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<SectionData | null>(null);
  const [loading, setLoading] = useState(true);

  // Converte a cor principal para RGB uma vez
  const rgb = hexToRgb(primaryColor);
  const primaryRgb = rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : "255, 215, 0"; // fallback para amarelo

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(endpoint);
        const json = await res.json();
        if (json && json[variant]) {
          setData(json[variant]);
        }
      } catch (error) {
        console.error("Erro ao carregar Sócios Tegbe:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint, variant]);

  useGSAP(() => {
    if (loading || !data) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(".reveal-header",
      { y: 30, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out", stagger: 0.1 }
    );

    tl.fromTo(".reveal-card",
      { y: 40, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out", stagger: 0.1 },
      "-=0.5"
    );
  }, { scope: containerRef, dependencies: [data, loading] });

  if (loading || !data) {
    return (
      <div className="h-[500px] bg-[#020202] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
             style={{ borderColor: `${primaryColor}`, borderTopColor: 'transparent' }}
        />
      </div>
    );
  }

  return (
    <section className={`relative w-full pt-35 pb-20 flex flex-col justify-center items-center overflow-hidden bg-[#020202] selection:bg-[${primaryColor}]/30`}
      // Define a variável CSS --primary para uso em estilos inline (opcional)
      style={{ '--primary': primaryColor } as any}
    >
      {/* FX sutil */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[100px] opacity-30 pointer-events-none"
           style={{ backgroundColor: `rgba(${primaryRgb}, 0.05)` }}
      />

      <div ref={containerRef} className="relative z-10 w-full max-w-7xl mx-auto px-6">

        {/* HEADER COM DUAS COLUNAS: ESQUERDA (TEXTO) + DIREITA (IMAGEM/LOGOTIPO) */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 mb-16">

          {/* LADO ESQUERDO: TEXTO */}
          <div className="flex-1 text-left">
            <div className={`reveal-header opacity-0 mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-sm`}
                 style={{
                   borderColor: `rgba(${primaryRgb}, 0.2)`,
                   backgroundColor: `rgba(${primaryRgb}, 0.05)`
                 }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ backgroundColor: primaryColor }}
                />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5"
                      style={{ backgroundColor: primaryColor }}
                />
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase font-mono"
                    style={{ color: primaryColor }}
              >
                {data.header.preTitle}
              </span>
            </div>

            <h2
              className="reveal-header opacity-0 text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-[1.1] max-w-4xl"
              dangerouslySetInnerHTML={{ __html: data.header.title }}
            />

            <p className="reveal-header opacity-0 text-base md:text-lg text-gray-500 max-w-2xl font-light leading-relaxed">
              {data.header.subtitle}
            </p>
          </div>

          {/* LADO DIREITO: IMAGEM COM LOGOTIPO DE FUNDO */}
          <div className="reveal-header opacity-0 flex-shrink-0">
            <div className="relative w-104 h-104">
              {/* Fundo da logotipo (opcional) */}
              {/* <div className="absolute inset-0 rounded-full blur-3xl"
                   style={{ backgroundColor: `rgba(${primaryRgb}, 0.1)` }}
                />
                <Icon icon="solar:star-fall-bold" className="absolute inset-0 w-full h-full"
                      style={{ color: `rgba(${primaryRgb}, 0.2)` }}
                /> 
              */}

              {/* Imagem (foto) sobreposta */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-124 h-124 rounded-full border-2 overflow-hidden backdrop-blur-sm"
                   style={{
                     borderColor: `rgba(${primaryRgb}, 0.3)`,
                     backgroundColor: `rgba(${primaryRgb}, 0.05)`
                   }}
              >
                <Image src='/doni.jpg' width={500} height={500} className="w-full h-full object-cover" alt={""} />
              </div>
            </div>
          </div>
        </div>

        {/* Grid de cards */}
        <div
          className="grid gap-4 md:gap-5 w-full"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))"
          }}
        >
          {data.values.map((value, index) => (
            <div
              key={index}
              className="reveal-card opacity-0 group relative p-6 md:p-8 rounded-[1.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.04] flex flex-col h-full"
              style={{
                borderColor: `rgba(255,255,255,0.05)`, // padrão, mas no hover muda
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `rgba(${primaryRgb}, 0.3)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
              }}
            >
              <div className="mb-4 inline-flex p-3 rounded-xl flex justify-center w-full transition-all duration-500 w-fit"
                   style={{
                     color: primaryColor,
                     backgroundColor: `rgba(${primaryRgb}, 0.1)`,
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.backgroundColor = primaryColor;
                     e.currentTarget.style.color = '#000';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.backgroundColor = `rgba(${primaryRgb}, 0.1)`;
                     e.currentTarget.style.color = primaryColor;
                   }}
              >
                {/* Ícone principal: se value.image existir, usa Image; senão, usa mapeamento por índice (ou Iconify) */}
                {value.image ? (
                  <Image src={value.image} width={150} height={54} alt={value.title} />
                ) : (
                  // Fallback: mapeamento por índice (caso a API não tenha campo image)
                  (index === 0 && <Image src="/icone1.png" width={150} height={54} alt="" />) ||
                  (index === 1 && <Image src="/icone2.png" width={150} height={54} alt="" />) ||
                  (index === 2 && <Image src="/icone3.png" width={150} height={54} alt="" />)
                )}
              </div>

              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                {value.title}
              </h3>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light opacity-80 group-hover:opacity-100 transition-opacity">
                {value.description}
              </p>

              {/* Detalhe técnico discreto - usa a mesma imagem ou ícone */}
              <div className="absolute bottom-4 right-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                {value.image ? (
                  <Image src={value.image} width={48} height={48} className="opacity-30" alt="" />
                ) : (
                  <Icon icon={value.icon} width="48" height="48" style={{ color: primaryColor }} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}