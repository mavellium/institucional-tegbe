import { IParceiro } from "@/interface/parceiro/IParceiro";

export default function CartaoParceiro({
  nome, 
  cargo, 
  depoimento, 
  img_principal, 
  img_nome, 
  img_nome_alt, 
  img_logo, 
  img_logo_alt
}: IParceiro) {
  return (
    <div className="flex w-full max-w-[850px] bg-white/[0.03] border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-md shadow-2xl transition-colors duration-300 hover:bg-white/[0.05] group font-sans">
      
      {/* Lado Esquerdo: Imagem do Parceiro */}
      <div className="relative w-[35%] min-w-[250px] overflow-hidden">
        <img 
          src={img_principal}
          alt={nome} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Overlay gradiente suave para mesclar a imagem com o fundo escuro do card */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#020202]/40" />
      </div>

      {/* Lado Direito: Conteúdo */}
      <div className="w-[65%] p-10 flex flex-col justify-center relative">
        <h2 className="text-3xl font-medium text-white">{nome}</h2>
        <p className="text-[#E31B63] text-sm mt-1 font-medium tracking-wide uppercase">{cargo}</p>

        <div className="mt-6 space-y-4 pr-4 text-white/70 leading-relaxed text-base">
          {depoimento}
        </div>

        <hr className="my-8 border-white/10" />

        {/* Logos de Autoridade */}
        <div className="flex items-center gap-8 opacity-60 transition-opacity duration-300 group-hover:opacity-100">
          {img_nome && (
            <img src={img_nome} alt={img_nome_alt || 'Logo 1'} className="h-8 object-contain filter brightness-0 invert" />
          )}
          {img_logo && (
            <img src={img_logo} alt={img_logo_alt || 'Logo 2'} className="h-10 object-contain filter brightness-0 invert" />
          )}
        </div>
      </div>
    </div>
  );
}