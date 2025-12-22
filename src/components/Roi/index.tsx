"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

export function Roi() {
  useGSAP(() => {
    gsap.to(".card", {
      opacity: 1,
      y: 0,
      duration: 1.4,
      stagger: 0.3,
      scrollTrigger: {
        trigger: "#roi",
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <section
      id="roi"
      className="w-full bg-[#F4F4F4] py-12 md:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl flex flex-col lg:flex-row gap-6 md:gap-8">

        {/* CARD 1 */}
        <div
          className="
            card
            relative overflow-hidden
            w-full lg:w-1/2
            h-[600px]
            bg-[#1D1D1F]
            rounded-3xl
            p-6 sm:p-8
            opacity-0 translate-y-20
          "
        >
          {/* FUNDO */}
          <div className="absolute inset-0">
            <Image
              src="/card1.png"
              fill
              className="object-cover opacity-80"
              alt=""
              priority
            />
          </div>

          {/* CONTEÚDO */}
          <div className="relative z-10 flex flex-col h-full justify-between">
            <h2 className="text-[#FADC05] font-bold text-lg sm:text-xl mb-4">
              A Tegbe é Consultoria Oficial Mercado Livre.
              <span className="block text-white text-sm sm:text-base font-normal mt-2">
                inteligência certificada para levar sua conta ao nível Platinum.
                Unimos nosso braço operacional à autoridade do maior marketplace
                do país para escalar suas vendas com segurança e velocidade.
                O selo que valida o nosso conhecimento para garantir o seu resultado.
              </span>
            </h2>
          </div>
        </div>

        {/* CARD 2 */}
        <div
          className="
            card
            relative overflow-hidden
            w-full lg:w-1/2
            h-[600px]
            bg-[#1D1D1F]
            rounded-3xl
            p-6 sm:p-8
            opacity-0 translate-y-20
          "
        >
          {/* FUNDO */}
          <div className="absolute inset-0">
            <Image
              src="/card2.png"
              fill
              className="object-cover opacity-80"
              alt=""
            />
          </div>

          {/* CONTEÚDO */}
          <div className="relative z-10 flex flex-col h-full justify-between">
            <h2 className="text-white font-bold text-lg sm:text-xl mb-4">
              Especialistas em escala na Shopee.
              <span className="block text-white/90 text-sm sm:text-base font-normal mt-2">
                Dominamos os algoritmos e as estratégias de conversão para colocar
                seus produtos no topo das buscas. Gestão operacional completa
                para transformar cliques em vendas diárias e garantir sua alta
                performance no marketplace que mais cresce no Brasil.
              </span>
            </h2>

            <div className="flex justify-center items-end">
              <Image
                src="/celular-roi.png"
                width={500}
                height={500}
                alt="Celular"
                className="w-86 h-auto"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
