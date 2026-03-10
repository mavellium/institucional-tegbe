interface CartaoParceiroProps {
  nome: string;
  cargo: string;
  depoimento: React.ReactNode;
  img_principal: string;
  img_nome: string;
  img_nome_alt: string;
  img_logo: string;
  img_logo_alt: string;
}

export default function CartaoParceiro({
  nome, 
  cargo, 
  depoimento, 
  img_principal, 
  img_nome, 
  img_nome_alt, 
  img_logo, 
  img_logo_alt
}: CartaoParceiroProps) {
  return (
    <div className="flex max-w-2xl bg-white rounded-[2rem] overflow-hidden shadow-lg font-sans">
      {/* Lado Esquerdo: Imagem do Parceiro */}
      <div className="relative w-1/3 min-w-[200px]">
        <img 
          src={img_principal}
          alt={nome} 
          className="h-full w-full object-cover"
        />
      </div>

      {/* Lado Direito: Conteúdo */}
      <div className="w-2/3 p-8 flex flex-col justify-center">
        <h2 className="text-3xl font-medium text-gray-800">{nome}</h2>
        <p className="text-gray-500 text-sm mt-1 mb-6">{cargo}</p>

        <div className="space-y-4 pr-8 text-gray-600 leading-snug">
          {depoimento}
        </div>

        <hr className="my-8 border-gray-200" />

        {/* Logos de Autoridade */}
        <div className="flex items-center justify-between grayscale">
          <img src={img_nome} alt={img_nome_alt} className="h-8 opacity-20" />
          <img src={img_logo} alt={img_logo_alt} className="h-12 mr-3" />
        </div>
      </div>
    </div>
  );
}