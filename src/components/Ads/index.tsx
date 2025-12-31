"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Icon } from "@iconify/react";

// Dados simplificados
const adsConfig = {
  titulo: {
    linha1: "Enquanto você",
    linha2: "foca em ter o",
    linha3: "melhor produto",
    linha4: "nós dominamos o",
    linha5: "algoritmo, os",
    linha6: "anúncios e as",
    linha7: "regras do jogo.",
    corDestaque: "text-[#FFCC00]"
  },
  botao: {
    texto: "Falar com um Especialista",
    link: "https://api.whatsapp.com/send?phone=5514991779502",
    icone: "ic:baseline-whatsapp"
  },
  background: {
    src: "/ads-bg.png",
    alt: "Background Ads"
  }
};

export function Ads() {
  const { titulo, botao, background } = adsConfig;

  return (
    <section className="relative w-full flex flex-col justify-between items-center overflow-hidden bg-white h-[350vh] py-20">
      
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <Image
          src={background.src}
          alt={background.alt}
          fill
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Gradiente no topo */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-white/90 to-transparent z-10 pointer-events-none" />

      {/* --- CONTEÚDO SUPERIOR --- */}
      <div className="container relative z-20 px-6 flex justify-start w-full">
        <div className="max-w-xl md:max-w-[480px] text-black text-left space-y-6 mt-20 sm:mt-40">
          <h1 className="font-heading font-bold tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            {titulo.linha1} <br />
            {titulo.linha2} <br />
            <span className={`${titulo.corDestaque} drop-shadow-sm`}>
              {titulo.linha3}
            </span>,<br />
            {titulo.linha4} <br />
            {titulo.linha5} <br />
            {titulo.linha6} <br />
            {titulo.linha7}
          </h1>
        </div>
      </div>

      {/* --- BOTÃO CTA --- */}
      <div className="relative z-20">
        <a
          aria-label={botao.texto}
          href={botao.link}
          target="_blank"
          className="group relative inline-block"
        >
          <div className="absolute -inset-1 bg-yellow-400 rounded-full opacity-30 blur group-hover:opacity-60 transition duration-200" />
          
          <Button 
            aria-label={botao.texto}
            className="relative shadow-2xl bg-[#FFCC00] text-black font-bold hover:bg-[#ffdb4d] hover:scale-105 transition-all duration-300 h-14 px-10 rounded-full text-lg flex items-center gap-3"
          >
            <Icon icon={botao.icone} className="size-6" />
            {botao.texto}
          </Button>
        </a>
      </div>

    </section>
  );
}