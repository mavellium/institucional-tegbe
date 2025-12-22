import { Icon } from "@iconify/react";
import { Button } from "../ui/button";

export function SectionImage() {
  return (
    <section className="relative w-full flex flex-col overflow-hidden min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] xl:min-h-[800px] 2xl:min-h-[900px]">
      {/* Imagem de fundo */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Imagem.png"
          alt="Background"
          className="w-full h-full object-cover object-right sm:object-top md:object-center lg:object-center"
          loading="lazy"
        />
      </div>

      {/* Efeito de escurecido (gradiente inferior) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/40 to-transparent 
        sm:from-black/70 sm:via-black/30 sm:to-transparent
        md:from-black/60 md:via-black/20 md:to-transparent
        lg:from-black/60 lg:via-transparent lg:to-transparent" />
    </section>
  );
}