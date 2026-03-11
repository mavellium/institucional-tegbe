"use client";

import Image from "next/image";

interface EspecialistaProps {
  nome: string;
  sobrenome: string;
  cargo: string;
  imagem: string;
}

export function CardEspecialista({ nome, sobrenome, cargo, imagem }: EspecialistaProps) {
  return (
    <div className="relative bg-[#0D1E2D] rounded-xl overflow-hidden aspect-[3/4.2] group border border-white/5 shadow-2xl transition-all duration-500 hover:border-[#C5A47E]/30 h-full">
      
      {/* Imagem com fundo azul (Estilo G4) */}
      <div className="relative h-[62%] w-full overflow-hidden bg-gradient-to-b from-[#152B3D] to-[#0D1E2D]">
        <Image
          src={imagem}
          alt={`${nome} ${sobrenome}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
        />
        {/* Overlay de luz sutil para dar profundidade à base da foto */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1E2D] via-transparent opacity-60 pointer-events-none" />
      </div>

      {/* Informações do Especialista */}
      <div className="p-6 space-y-4">
        <div>
          <h4 className="text-white text-xl font-serif leading-none tracking-tight">
            {nome}
          </h4>
          <span className="text-[#C5A47E] text-xl font-serif italic block mt-1">
            {sobrenome}
          </span>
        </div>

        {/* Linha divisória elegante */}
        <div className="h-[1px] w-full bg-gradient-to-r from-white/20 via-white/5 to-transparent" />

        <p className="text-[#8E9BA7] text-[13px] leading-relaxed line-clamp-3 font-light italic lg:not-italic">
          {cargo}
        </p>
      </div>
    </div>
  );
}