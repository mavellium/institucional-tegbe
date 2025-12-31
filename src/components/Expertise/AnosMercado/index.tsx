'use client'
import { Icon } from "@iconify/react";
import Image from "next/image";

export default function About() {
  return (
    <section className="py-16 px-4 sm:px-8 lg:px-10 bg-[#F4F4F4] flex justify-center items-center">
      <div className="mx-auto relative max-w-[1520px]">

        {/* TÍTULO */}
        <h1 className="mb-10 text-center font-bold text-black
          text-[24px] sm:text-[32px] md:text-[45px] leading-tight px-5">
          Desde 2022 no mercado
        </h1>

        {/* IMAGEM */}
        <div className="rounded-2xl overflow-hidden flex justify-center">
          <Image
            src="/15anos-image.png"
            alt="Lente Dental"
            width={1376}
            height={774}
            className="w-full h-auto max-w-[1500px] object-contain"
          />
        </div>

        {/* TEXTO FINAL */}
        <div className="mt-14 text-black text-start font-bold
          text-[14px] sm:text-[12px] md:text-[15px] lg:text-[20px] flex flex-col gap-3 px-5">

          <span className="flex flex-col sm:flex-row gap-1 sm:gap-2 justify-center">
            Não apenas operamos, nós ditamos o ritmo. Como Consultores Oficiais, temos acesso direto a estratégias e ferramentas que vendedores comuns desconhecem. Sua conta blindada e escalada com o aval da própria plataforma.
          </span>
        </div>
        <div className="mt-10 flex justify-center">
          <a aria-label="quero vender assim" href="#">
            <button aria-label="Quero vender assim" className="bg-black hover:bg-[#0071E3] text-white px-12 py-3 rounded-full font-black text-md uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-xl flex items-center gap-3">
              Falar com um Especialista
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}