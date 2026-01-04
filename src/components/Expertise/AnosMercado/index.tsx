"use client";

import { useRef } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutElite() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      }
    });

    // 1. A imagem cresce suavemente (Scale effect)
    tl.fromTo(imageRef.current,
      { scale: 0.95, opacity: 0, borderRadius: "3rem" },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out", borderRadius: "2rem" }
    );

    // 2. O Card de Conteúdo sobe sobrepondo a imagem
    tl.fromTo(".content-card",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6" // Começa antes da imagem terminar
    );

    // 3. Badges aparecem
    tl.fromTo(".badge-item",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.4"
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F4F4F4] flex justify-center items-center overflow-hidden">
      <div className="mx-auto relative w-full max-w-[1440px]">

        {/* --- CAMADA 1: A IMAGEM HERO (O Palco) --- */}
        <div className="relative w-full h-[500px] md:h-[700px] rounded-[2rem] overflow-hidden shadow-2xl shadow-black/5">
          <div ref={imageRef} className="w-full h-full relative">
            <Image
              src="/15anos-image.png" // Certifique-se que essa imagem é ALTA RESOLUÇÃO
              alt="Equipe Tegbe em Operação"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay Gradiente sutil para garantir leitura se tiver texto em cima */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
          </div>

          {/* Badge Flutuante no Topo da Imagem */}
          <div className="absolute top-6 left-6 md:top-10 md:left-10 badge-item bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-bold text-[#1d1d1f] uppercase tracking-wider">Desde 2022</span>
          </div>
        </div>

        {/* --- CAMADA 2: O CARD DE CONTEÚDO (A Autoridade) --- */}
        {/* Layout Overlap: Margem negativa para subir em cima da imagem */}
        <div className="relative z-10 -mt-20 md:-mt-32 px-4 md:px-0 w-full flex justify-center">
          <div className="content-card w-full max-w-5xl bg-white rounded-[2.5rem] p-8 md:p-12 lg:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col md:flex-row gap-10 items-start">

            {/* Lado Esquerdo: Headline */}
            <div className="w-full md:w-1/2">
              <div className="flex items-center gap-2 mb-4 text-[#0071E3]">
                <Icon icon="ph:certificate-fill" width="24" />
                <span className="text-xs font-bold uppercase tracking-widest">Consultoria Oficial</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1d1d1f] leading-[1.1] tracking-tight">
                Não apenas operamos.<br />
                <span className="text-gray-400">Nós ditamos o ritmo.</span>
              </h2>
            </div>

            {/* Lado Direito: Copy & CTA */}
            <div className="w-full md:w-1/2 flex flex-col gap-8">
              <p className="text-gray-600 text-lg leading-relaxed font-medium">
                Como Consultores Oficiais, temos acesso direto a estratégias e ferramentas que vendedores comuns desconhecem.
              </p>
              <p className="text-gray-500 text-base leading-relaxed">
                Sua conta não será apenas gerenciada; ela será <strong>blindada e escalada</strong> com o aval da própria plataforma. O que para outros é "segredo", para nós é ferramenta de trabalho diária.
              </p>

              <div className="pt-2">
                <a href="https://api.whatsapp.com/send?phone=5514991779502&text=Gostaria%20de%20falar%20com%20um%20especialista%20da%20Tegbe%20para%20tirar%20algumas%20d%C3%BAvidas." target="_blank"
                  rel="noopener noreferrer" className="group inline-flex items-center gap-4">
                  <button className="bg-[#1d1d1f] text-white h-14 px-8 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 group-hover:bg-[#0071E3] group-hover:scale-105 shadow-xl flex items-center gap-3">
                    Falar com Especialista
                    <Icon icon="ph:arrow-right-bold" className="w-4 h-4" />
                  </button>

                  {/* Prova Social Sutil ao lado do botão */}
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#1d1d1f]">+R$ 40M</span>
                    <span className="text-[10px] text-gray-500 uppercase">Gerenciados</span>
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