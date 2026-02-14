"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Interface baseada no JSON da API (estrutura 'values')
export interface LocalizacaoItem {
  id: string;
  alt: string;
  image: string;
  title: string;
  description: string;
}

interface LocalizacaoProps {
  data: LocalizacaoItem[];
}

const Localizacao = ({ data }: LocalizacaoProps) => {
  // Se não houver dados, não renderiza
  if (!data || data.length === 0) return null;

  const sectionRef = useRef(null);
  const [currentImg, setCurrentImg] = useState(0);

  // Extrai apenas as imagens disponíveis para o slider
  // Se houver apenas 1 item na API, o slider terá apenas 1 slide
  const images = data.map(item => item.image).filter(Boolean);
  
  // Dados principais de texto (assume-se que o primeiro item carrega os textos da seção)
  const mainContent = data[0];

  useEffect(() => {
    if (images.length <= 1) return; // Não roda slider se só tiver 1 imagem

    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      }
    });

    // 1. Texto (Esquerda)
    tl.fromTo(".hub-content", 
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    // 2. Imagem (Direita)
    tl.fromTo(".hub-image", 
      { x: 50, opacity: 0, scale: 0.98 },
      { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );

    // 3. Radar (Círculos)
    gsap.to(".radar-circle", {
      scale: 2,
      opacity: 0,
      duration: 2.5,
      stagger: 0.6,
      repeat: -1,
      ease: "power1.out"
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative py-24 px-6 bg-white overflow-hidden">
      
      {/* Background Decorativo Clean */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Mancha Azul Suave no canto */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0071E3]/5 rounded-full blur-[120px] opacity-60" />
        
        {/* Pattern de Mapa Pontilhado (Simulado com CSS radial) */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
      </div>

      <div className="mx-auto max-w-7xl relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* --- LADO ESQUERDO: TEXTO --- */}
        <div className="hub-content flex flex-col items-start">
            
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white shadow-sm">
                <Icon icon="ph:map-pin-fill" className="text-[#0071E3] w-4 h-4" />
                <span className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase">
                    QG Operacional
                </span>
            </div>

            {/* Headline Dinâmico */}
            <h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1d1d1f] mb-6 leading-[1.1] tracking-tight"
            >
                {/* Lógica simples para quebrar título e colorir a segunda parte se houver ponto final */}
                {mainContent.title.includes('.') ? (
                    <>
                        {mainContent.title.split('.')[0]}.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] to-blue-500">
                            {mainContent.title.split('.').slice(1).join('.')}
                        </span>
                    </>
                ) : (
                    mainContent.title
                )}
            </h2>

            {/* Copy Dinâmico */}
            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md font-medium">
                {mainContent.description}
            </p>

            {/* Stats (Hardcoded por enquanto pois não vieram no JSON, mas são estáticos do negócio) */}
            <div className="flex gap-8 border-t border-gray-100 pt-8 w-full">
                <div>
                    <span className="block text-3xl font-bold text-[#1d1d1f]">+24</span>
                    <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Estados Atendidos</span>
                </div>
                <div className="w-px h-10 bg-gray-200"></div>
                <div>
                    <span className="block text-3xl font-bold text-[#1d1d1f]">100%</span>
                    <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Digital & Remoto</span>
                </div>
            </div>
            
            {/* Link Google Maps */}
            <a 
                href="https://maps.app.goo.gl/seu-link-aqui" 
                target="_blank"
                rel="noreferrer"
                className="mt-8 flex items-center gap-2 text-sm text-[#0071E3] font-bold uppercase tracking-widest cursor-pointer group"
            >
                <span>Ver no Google Maps</span>
                <Icon icon="ph:arrow-right" className="group-hover:translate-x-1 transition-transform" />
            </a>
        </div>

        {/* --- LADO DIREITO: IMAGEM (CARD FLUTUANTE) --- */}
        <div className="hub-image relative w-full aspect-[4/3] lg:aspect-square max-h-[600px]">
            
            {/* Moldura Branca com Sombra Suave (Apple Style) */}
            <div className="absolute inset-0 rounded-[2rem] bg-white overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100">
                
                {/* O Efeito Radar (Azul sobre a imagem) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                    <div className="radar-circle w-20 h-20 border border-white/50 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(255,255,255,0.3)]"></div>
                    <div className="radar-circle w-20 h-20 border border-white/20 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 delay-300"></div>
                </div>

                {/* Slider de Imagens vindas da API */}
                {images.length > 0 ? (
                    images.map((src, index) => (
                    <div 
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentImg === index ? "opacity-100" : "opacity-0"}`}
                    >
                        <Image 
                            src={src} 
                            alt={mainContent.alt || "Escritório Tegbe Garça"} 
                            fill 
                            className="object-cover"
                            unoptimized // Permite URLs externas sem config no next.config.js (útil para CMS)
                        />
                        {/* Overlay escuro leve na base para o texto do card aparecer melhor */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    </div>
                    ))
                ) : (
                    // Fallback visual caso não venha imagem
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                        <Icon icon="ph:image-broken" width="48" />
                    </div>
                )}

                {/* Card Flutuante de Informação */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md border border-white/40 p-4 rounded-xl flex items-center justify-between z-30 shadow-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#0071E3] flex items-center justify-center text-white shadow-md">
                            <Icon icon="ph:buildings-bold" width="20" />
                        </div>
                        <div>
                            <p className="text-[#1d1d1f] font-bold text-sm">Tegbe HQ</p>
                            <p className="text-gray-500 text-xs font-medium">Garça, São Paulo</p>
                        </div>
                    </div>
                    
                    {/* Indicadores do Slider (só mostra se tiver mais de 1 imagem) */}
                    {images.length > 1 && (
                        <div className="flex gap-1.5">
                            {images.map((_, i) => (
                                <div 
                                    key={i} 
                                    onClick={() => setCurrentImg(i)}
                                    className={`h-1.5 rounded-full transition-all cursor-pointer ${currentImg === i ? "w-6 bg-[#0071E3]" : "w-1.5 bg-gray-300 hover:bg-gray-400"}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

            </div>

            {/* Elemento Decorativo Atrás (Profundidade) */}
            <div className="absolute -z-10 top-8 -right-8 w-full h-full border border-gray-200 rounded-[2rem] bg-gray-50"></div>
        </div>

      </div>
    </section>
  );
}

export default Localizacao;