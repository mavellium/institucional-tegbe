import { Icon } from "@iconify/react";
import { Button } from "../ui/button";

export function Ads2() {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-10">
        <img
          src="/ads-bg2.png"
          alt="Background"
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Conteúdo */}
      <div className="container mx-auto min-h-[80vh] flex items-center px-6 sm:px-8 lg:px-12">
        <div className="max-w-xl text-black">
          <h1
            className="
              font-heading font-semibold tracking-tight leading-tight
              text-2xl
              sm:text-3xl
              md:text-4xl
              lg:text-4xl
            "
          >
            Enquanto você
            foca em ter o
            melhor produto,
            nós dominamos o
            algoritmo, os 
            anúncios e as
            regras do jogo
            para você vender
            todos os dias.
          </h1>
        </div>
      </div>
    </section>
  );
}
