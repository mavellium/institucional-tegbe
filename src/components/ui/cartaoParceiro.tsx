import { IParceiro } from "@/interface/parceiro/IParceiro";
import RichText from "./rich/richText";
import Image from "next/image";

export default function CartaoParceiro({
  nome,
  cargo,
  depoimento,
  img_principal,
  img_nome,
  img_nome_alt,
  img_logo,
  img_logo_alt,
}: IParceiro) {
  return (
    <div className="flex flex-col md:flex-row w-full max-w-[850px] bg-white/[0.03] border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-md shadow-2xl transition-colors duration-300 hover:bg-white/[0.05] group font-sans">
      {/* IMAGEM */}
      <div className="relative w-full md:w-[35%] aspect-[3/3] md:aspect-auto md:min-w-[250px] overflow-hidden">
        <Image
          src={img_principal}
          alt={nome}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 35vw"
          priority={false}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#020202]/60 via-transparent to-transparent md:to-[#020202]/40 pointer-events-none" />
      </div>

      {/* CONTEÚDO */}
      <div className="w-full md:w-[65%] p-6 md:p-10 flex flex-col justify-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-white">{nome}</h2>

        <p className="text-[#E31B63] text-xs sm:text-sm mt-1 font-medium tracking-wide uppercase">
          {cargo}
        </p>

        <div className="mt-4 md:mt-6 space-y-3 md:space-y-4 text-white/70 leading-relaxed text-sm sm:text-base">
          <RichText content={depoimento} />
        </div>

        <hr className="my-6 md:my-8 border-white/10" />

        {/* LOGOS */}
        <div className="flex flex-wrap items-center gap-4 md:gap-8 opacity-70 md:opacity-60 transition-opacity duration-300 group-hover:opacity-100">
          {img_nome && (
            <img
              src={img_nome}
              alt={img_nome_alt || "Logo 1"}
              className="h-6 md:h-8 object-contain filter brightness-0 invert"
            />
          )}

          {img_logo && (
            <img
              src={img_logo}
              alt={img_logo_alt || "Logo 2"}
              className="h-8 md:h-10 object-contain filter brightness-0 invert"
            />
          )}
        </div>
      </div>
    </div>
  );
}
