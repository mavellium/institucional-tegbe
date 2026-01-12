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

// --- INTERFACE DE DADOS ---
interface AboutEliteData {
  visual: { imageSrc: string; imageAlt: string; badgeText: string; };
  header: { badgeIcon: string; badgeText: string; titleMain: string; titleSecondary: string; };
  content: { 
    description: string; 
    details: string; 
    cta: { text: string; link: string; };
    socialProof: { value: string; label: string; };
  };
}

// --- FALLBACK MAVELLIUM ---
const FALLBACK_ABOUT: AboutEliteData = {
  visual: {
    imageSrc: "/15anos-image.png",
    imageAlt: "Equipe Tegbe em Operação",
    badgeText: "Desde 2022"
  },
  header: {
    badgeIcon: "ph:certificate-fill",
    badgeText: "Consultoria Oficial",
    titleMain: "Não apenas operamos.",
    titleSecondary: "Nós ditamos o ritmo."
  },
  content: {
    description: "Como Consultores Oficiais, temos acesso direto a estratégias e ferramentas que vendedores comuns desconhecem.",
    details: "Sua conta não será apenas gerenciada; ela será <strong>blindada e escalada</strong> com o aval da própria plataforma.",
    cta: {
      text: "Falar com Especialista",
      link: "https://api.whatsapp.com/send?phone=5514991779502"
    },
    socialProof: {
      value: "+R$ 40M",
      label: "Gerenciados"
    }
  }
};

export default function AboutElite({ endpoint = "https://tegbe-dashboard.vercel.app/api/tegbe-institucional/anos-mercado" }) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [data, setData] = useState<AboutEliteData>(FALLBACK_ABOUT);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      try {
        const res = await fetch(endpoint);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.warn("Usando Fallback para AboutElite:", error);
      }
    };
    fetchData();
  }, [endpoint]);

  useGSAP(() => {
    if (!mounted) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(imageRef.current,
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }
    );

    tl.fromTo(".content-card",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );

    tl.fromTo(".badge-item",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.4"
    );

  }, { scope: containerRef, dependencies: [data, mounted] });

  // Padrão de hidratação segura
  if (!mounted) return <div className="h-[700px] bg-[#F4F4F4]" />;

  return (
    <section ref={containerRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F4F4F4] flex justify-center items-center overflow-hidden">
      <div className="mx-auto relative w-full max-w-[1440px]">

        {/* --- CAMADA 1: VISUAL HERO --- */}
        <div className="relative w-full h-[500px] md:h-[700px] rounded-[2rem] overflow-hidden shadow-2xl shadow-black/5">
          <div ref={imageRef} className="w-full h-full relative">
            <Image
              src={data.visual.imageSrc}
              alt={data.visual.imageAlt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
          </div>

          <div className="absolute top-6 left-6 md:top-10 md:left-10 badge-item bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-bold text-[#1d1d1f] uppercase tracking-wider">{data.visual.badgeText}</span>
          </div>
        </div>

        {/* --- CAMADA 2: O CARD DE CONTEÚDO --- */}
        <div className="relative z-10 -mt-20 md:-mt-32 px-4 md:px-0 w-full flex justify-center">
          <div className="content-card w-full max-w-5xl bg-white rounded-[2.5rem] p-8 md:p-12 lg:p-14 shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-gray-100 flex flex-col md:flex-row gap-10 items-start">

            <div className="w-full md:w-1/2">
              <div className="flex items-center gap-2 mb-4 text-[#0071E3]">
                <Icon icon={data.header.badgeIcon} width="24" />
                <span className="text-xs font-bold uppercase tracking-widest">{data.header.badgeText}</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1d1d1f] leading-[1.1] tracking-tight">
                {data.header.titleMain}<br />
                <span className="text-gray-400">{data.header.titleSecondary}</span>
              </h2>
            </div>

            <div className="w-full md:w-1/2 flex flex-col gap-8">
              <p className="text-gray-600 text-lg leading-relaxed font-medium">
                {data.content.description}
              </p>
              <p 
                className="text-gray-500 text-base leading-relaxed [&>strong]:text-[#1d1d1f] [&>strong]:font-bold"
                dangerouslySetInnerHTML={{ __html: data.content.details }}
              />

              <div className="pt-2">
                <a href={data.content.cta.link} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-6">
                  <button className="bg-[#1d1d1f] text-white h-14 px-8 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 group-hover:bg-[#0071E3] group-hover:scale-105 shadow-xl flex items-center gap-3">
                    {data.content.cta.text}
                    <Icon icon="ph:arrow-right-bold" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <div className="flex flex-col border-l border-gray-200 pl-6">
                    <span className="text-sm font-bold text-[#1d1d1f] tracking-tighter">{data.content.socialProof.value}</span>
                    <span className="text-[10px] text-gray-400 uppercase font-medium">{data.content.socialProof.label}</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}