"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CertifiedSection() {
  const container = useRef(null);
  const imageRef = useRef(null);
  const cardRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Animação de entrada "Magnetic"
    tl.from(imageRef.current, {
      x: -100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
    })
    .from(cardRef.current, {
      x: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
    }, "-=0.8")
    .from(".badge-float", {
      scale: 0,
      rotation: -45,
      stagger: 0.2,
      duration: 0.8,
      ease: "back.out(1.7)",
    }, "-=0.5");
  }, { scope: container });

  return (
    <section 
      ref={container} 
      className="relative px-4 sm:px-8 py-32 bg-[#F4F4F4] overflow-hidden"
    >
      {/* Background Decorativo Sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-50">
        <div className="absolute top-24 left-10 w-64 h-64 bg-yellow-400/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-24 right-10 w-64 h-64 bg-blue-400/10 blur-[120px] rounded-full" />
      </div>

      <div className="flex flex-col lg:flex-row gap-12 w-full max-w-7xl mx-auto items-center">
        
        {/* LADO ESQUERDO: Imagem com efeito Parallax/Floating */}
        <div 
          ref={imageRef}
          className="relative w-full lg:w-1/2 group"
        >
          <div className="relative z-10 w-full aspect-[4/5] max-w-[500px] mx-auto rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
            <Image
              src="/consultor-foto.png" // Foto do Doni ou consultor
              alt="Consultoria Certificada"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Badge Flutuante Real (Selo ML) */}
          <div className="badge-float absolute -bottom-6 -right-6 md:right-0 z-20 w-32 h-32 md:w-44 md:h-44 bg-white p-4 rounded-full shadow-2xl flex items-center justify-center border-4 border-[#0071E3]">
             <Image 
                src="/selo-ml-oficial.png" 
                width={120} 
                height={120} 
                alt="Selo Mercado Livre" 
                className="animate-pulse-slow"
             />
          </div>
        </div>

        {/* LADO DIREITO: Texto com Tipografia de Alta Performance */}
        <div 
          ref={cardRef}
          className="w-full lg:w-1/2 flex flex-col gap-8"
        >
          <div className="space-y-4">
            <span className="inline-block px-4 py-1.5 bg-[#0071E3]/10 text-[#0071E3] font-bold text-xs tracking-widest uppercase rounded-full">
              Parceria Estratégica
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-black leading-[1.1] tracking-tight">
              O selo que <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] to-[#00a2ff]">
                destrava o seu lucro.
              </span>
            </h2>
          </div>

          <div className="space-y-6 max-w-lg">
            <p className="text-gray-600 text-xl leading-relaxed">
              Não somos apenas mais uma agência. Somos uma **Consultoria Oficial Certificada** pelo Mercado Livre.
            </p>
            <p className="text-gray-500 text-lg">
              Isso significa que a Tegbe joga com as cartas do dono da mesa. Acesso a dados antecipados e suporte premium para garantir que sua conta não apenas sobreviva, mas **domine o marketplace.**
            </p>
          </div>

          <div className="pt-4">
            <a
              aria-label="Descubra o poder do selo"
              href="/consultoria" 
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-black text-white font-bold rounded-full overflow-hidden transition-all hover:pr-14"
            >
              <span className="relative z-10">DESCUBRA O PODER DO SELO</span>
              <Icon 
                icon="mdi:arrow-right" 
                className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-300" 
                width="24"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0071E3] to-[#00a2ff] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}