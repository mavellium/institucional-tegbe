"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Icon } from "@iconify/react";

export function Ads() {
  return (
    <section className="relative w-full flex flex-col justify-between items-center overflow-hidden bg-white h-[350vh] py-20">
      
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/ads-bg.png"
          alt="Background Ads"
          fill
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Gradiente sutil no topo para garantir leitura do texto caso a imagem seja escura/clara demais */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-white/90 to-transparent z-10 pointer-events-none" />

      {/* --- CONTEÚDO SUPERIOR (Texto) --- */}
      <div className="container relative z-20 px-6 flex justify-start w-full">
        <div className="max-w-xl md:max-w-[480px] text-black text-left space-y-6 mt-20 sm:mt-40">
          <h1 className="font-heading font-bold tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            Enquanto você <br />
            foca em ter o <br />
            <span className="text-[#FFCC00] drop-shadow-sm">melhor produto</span>,
            nós dominamos o
            algoritmo, os
            anúncios e as
            regras do jogo.
          </h1>
          {/* Adicionei um parágrafo de apoio para mobile não ficar vazio */}
          <p className="text-lg font-medium text-gray-700 md:hidden">
            Venda todos os dias com previsibilidade e escala.
          </p>
        </div>
      </div>

      {/* --- CONTEÚDO INFERIOR (CTA) --- */}
      {/* O botão ficará lá no final dos 350vh */}
      <div className="relative z-20">
        <a
          href="https://api.whatsapp.com/send?phone=5514991779502"
          target="_blank"
          className="group relative inline-block"
        >
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-yellow-400 rounded-full opacity-30 blur group-hover:opacity-60 transition duration-200" />
          
          <Button className="relative shadow-2xl bg-[#FFCC00] text-black font-bold hover:bg-[#ffdb4d] hover:scale-105 transition-all duration-300 h-14 px-10 rounded-full text-lg flex items-center gap-3">
            <Icon icon="ic:baseline-whatsapp" className="size-6" />
            Falar com um Especialista
          </Button>
        </a>
      </div>

    </section>
  );
}