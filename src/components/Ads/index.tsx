import { Icon } from "@iconify/react";
import { Button } from "../ui/button";
import { Ads2 } from "../Ads2";

export function Ads() {
  return (
    <>
    <section
      className="
        relative w-full flex flex-col justify-start items-center overflow-hidden bg-white h-[350vh] py-36 sm:py-30">
      {/* Imagem de fundo */}
      <div className="absolute inset-0 z-0">
        <img
          src="/ads-bg.png"
          alt="Background"
          className="w-full h-full object-cover lg:object-top"
        />
      </div>

      {/* Efeito de escurecido (gradiente inferior) */}
      <div className="absolute inset-0 z-10" />

      {/* Conteúdo */}
      <div className="container relative z-20">
        <div
          className="max-w-xl md:max-w-[400px] text-black text-start space-y-6 sm:space-y-8 hidden md:hidden lg:block mt-40">
          <h1
            className="font-heading font-semibold tracking-tight text-2xl sm:text-4xl md:text-4xl lg:text-5xl leading-tight">
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
      <div className="flex justify-center items-end h-full z-20">
            <a
              href="https://api.whatsapp.com/send?phone=5514991779502"
              target="_blank"
              className="flex gap-2 items-center justify-center mt-4"
            >
              <Button className="shadow-lg bg-[#0071E3] text-white hover:bg-[#2B3374] cursor-pointer text-sm sm:text-lg transition max-w-[400px] w-full h-12 px-10 rounded-full">
                Falar com um Especialista
              </Button>
            </a>
        </div>
    </section>
    </>
  );
}
