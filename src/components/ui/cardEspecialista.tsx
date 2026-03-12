"use client";

import Image from "next/image";

interface EspecialistaProps {
  nome: string;
  sobrenome: string;
  cargo: string;
  imagem: string;
}

export function CardEspecialista({
  nome,
  sobrenome,
  cargo,
  imagem,
}: EspecialistaProps) {
  return (
    <div className="
      relative
      h-full
      aspect-[3/5.5]
      overflow-hidden
      rounded-2xl
      bg-black
      group
      border
      border-white/5
      hover:border-[#C5A47E]/40
      transition-all
      duration-500
      
    ">

      {/* FOTO */}
      <div className="absolute inset-0">

        <Image
          src={imagem}
          alt={`${nome} ${sobrenome}`}
          fill
          className="
            object-cover
            object-top
            grayscale
            group-hover:grayscale-0
            group-hover:scale-[1.04]
            transition-all
            duration-700
          "
        />

        {/* overlay cinematic */}
        <div className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black
          via-black/40
          to-transparent
        "/>

      </div>

      {/* CONTEÚDO */}
      <div className="
        relative
        z-10
        h-full
        flex
        flex-col
        justify-end
        p-7
      ">

        {/* NOME */}
        <div className="space-y-1">

          <h3 className="
            text-white
            text-2xl
            font-serif
            leading-none
            tracking-tight
          ">
            {nome}
          </h3>

          <span className="
            text-[#F1D95D]
            italic
            font-serif
            text-2xl
          ">
            {sobrenome}
          </span>

        </div>

        {/* CARGO */}
        <p className="
          mt-3
          text-white/70
          text-sm
          leading-relaxed
          max-w-[85%]
        ">
          {cargo}
        </p>

      </div>

      {/* glow hover */}
      <div className="
        absolute
        inset-0
        opacity-0
        group-hover:opacity-100
        transition
        duration-700
        pointer-events-none
        bg-[radial-gradient(circle_at_50%_0%,rgba(197,164,126,0.2),transparent_60%)]
      "/>

    </div>
  );
}