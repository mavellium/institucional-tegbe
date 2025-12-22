import { Icon } from "@iconify/react";
import { Button } from "../ui/button";

export function Headline() {
  return (
    <section
      className="
        relative w-full flex flex-col justify-start items-center overflow-hidden bg-white h-screen py-36 sm:py-30">
      {/* Imagem de fundo */}
      <div className="absolute inset-0 z-0">
        <img
          src="/headline-bg.png"
          alt="Background"
          className="w-full h-full object-cover lg:object-center md:object-top"
        />
      </div>

      {/* Efeito de escurecido (gradiente inferior) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Conteúdo */}
      <div className="container relative z-20 px-6 sm:px-10 md:px-16">
        <div
          className="max-w-xl md:max-w-4xl mx-auto text-black text-center space-y-6 sm:space-y-8">
          <h1
            className="font-heading font-semibold tracking-tight text-2xl sm:text-4xl md:text-4xl lg:text-4xl leading-tight">
            Sua operação de E-commerce, do clique ao lucro.
          </h1>
          <p className="font-heading font-medium tracking-tight text-md sm:text-xl md:text-xl lg:text-2xl leading-tight">
            Fotografia, anúncios, gestão e escala. Enquanto nós operamos a complexidade, você foca no crescimento do seu negócio.</p>
            <a
              href="https://api.whatsapp.com/send?phone=5514991779502"
              target="_blank"
              className="flex gap-2 items-center justify-center mt-4"
            >
              <Button className="shadow-lg bg-[#0071E3] text-white hover:bg-[#2B3374] cursor-pointer text-sm sm:text-lg transition max-w-[400px] w-full h-12 rounded-full">
                Quero vender mais no E-commerce
              </Button>
            </a>
        </div>
      </div>
    </section>
  );
}
