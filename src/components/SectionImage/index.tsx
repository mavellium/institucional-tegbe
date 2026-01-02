"use client";
import Image from "next/image";

// --- TIPAGEM ---
type SectionImageVariant = 'home' | 'ecommerce' | 'marketing';

interface SectionImageProps {
  variant?: SectionImageVariant;
  customImage?: string;
  customAlt?: string;
}

// --- CONFIGURAÇÃO BASE ---
const baseConfig = {
  image: {
    home: "/Imagem.png",
    ecommerce: "/Imagem.png",
    marketing: "/Imagem.png",
  },
  alt: {
    home: "Background - Consultoria Oficial Mercado Livre",
    ecommerce: "Background - Gestão de E-commerce e Vendas Online",
    marketing: "Background - Marketing, CRM e Automação",
  },
  objectPosition: {
    home: "object-right sm:object-top md:object-center lg:object-center",
    ecommerce: "object-center",
    marketing: "object-left sm:object-center",
  }
};

const gradientConfig = {
  home: "absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/40 to-transparent sm:from-black/70 sm:via-black/30 sm:to-transparent md:from-black/60 md:via-black/20 md:to-transparent lg:from-black/60 lg:via-transparent lg:to-transparent",
  ecommerce: "absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/50 to-transparent sm:from-black/70 sm:via-black/40 sm:to-transparent md:from-black/60 md:via-black/30 md:to-transparent",
  marketing: "absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-black/45 to-transparent sm:from-black/70 sm:via-black/35 sm:to-transparent md:from-black/65 md:via-black/25 md:to-transparent"
};

const heightConfig = {
  home: "min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] xl:min-h-[800px] 2xl:min-h-[900px]",
  ecommerce: "min-h-[350px] sm:min-h-[450px] md:min-h-[550px] lg:min-h-[650px] xl:min-h-[750px] 2xl:min-h-[850px]",
  marketing: "min-h-[380px] sm:min-h-[480px] md:min-h-[580px] lg:min-h-[680px] xl:min-h-[780px] 2xl:min-h-[880px]"
};

export function SectionImage({ 
  variant = 'home', 
  customImage, 
  customAlt 
}: SectionImageProps) {
  
  const imageSrc = customImage || baseConfig.image[variant];
  const imageAlt = customAlt || baseConfig.alt[variant];
  
  // Determina se deve usar priority ou loading lazy
  const isHome = variant === 'home';
  
  return (
    <section className={`relative w-full flex flex-col overflow-hidden ${heightConfig[variant]}`}>
      {/* Imagem de fundo */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className={`w-full h-full object-cover ${baseConfig.objectPosition[variant]}`}
          priority={isHome}
          loading={isHome ? undefined : "lazy"}
        />
      </div>

      {/* Gradiente */}
      <div className={gradientConfig[variant]} />
    </section>
  );
}