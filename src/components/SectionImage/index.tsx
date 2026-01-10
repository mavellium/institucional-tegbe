"use client";
import Image from "next/image";

// --- TIPAGEM DO JSON DO ENDPOINT ---
interface ApiData {
  alt: Record<string, string>;
  image: Record<string, string>;
  objectPosition: Record<string, string>;
}

type SectionImageVariant = 'home' | 'ecommerce' | 'marketing';

interface SectionImageProps {
  variant: SectionImageVariant;
  apiData: ApiData; // O JSON que você postou entra aqui
  customImage?: string;
  customAlt?: string;
}

// Configurações visuais fixas (Design System Mavellium)
const styleConfig = {
  gradient: {
    home: "absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/40 to-transparent sm:from-black/70 sm:via-black/30 sm:to-transparent md:from-black/60 md:via-black/20 md:to-transparent lg:from-black/60 lg:via-transparent lg:to-transparent",
    ecommerce: "absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/50 to-transparent sm:from-black/70 sm:via-black/40 sm:to-transparent md:from-black/60 md:via-black/30 md:to-transparent",
    marketing: "absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-black/45 to-transparent sm:from-black/70 sm:via-black/35 sm:to-transparent md:from-black/65 md:via-black/25 md:to-transparent"
  },
  height: {
    home: "min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] xl:min-h-[800px] 2xl:min-h-[900px]",
    ecommerce: "min-h-[350px] sm:min-h-[450px] md:min-h-[550px] lg:min-h-[650px] xl:min-h-[750px] 2xl:min-h-[850px]",
    marketing: "min-h-[380px] sm:min-h-[480px] md:min-h-[580px] lg:min-h-[680px] xl:min-h-[780px] 2xl:min-h-[880px]"
  }
};

export function SectionImage({ 
  variant = 'home', 
  apiData,
  customImage, 
  customAlt 
}: SectionImageProps) {
  
  // Extração segura dos dados baseada na variante
  const imageSrc = customImage || apiData.image[variant];
  const imageAlt = customAlt || apiData.alt[variant] || "Mavellium Background";
  const objectPos = apiData.objectPosition[variant] || "object-center";
  
  const isHome = variant === 'home';

  return (
    <section className={`relative w-full flex flex-col overflow-hidden ${styleConfig.height[variant]}`}>
      {/* Imagem de fundo dinâmica */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="100vw"
          className={`w-full h-full object-cover ${objectPos}`}
          priority={isHome}
          loading={isHome ? undefined : "lazy"}
          quality={90}
        />
      </div>

      {/* Camada de Gradiente Estilizada */}
      <div className={styleConfig.gradient[variant]} />
    </section>
  );
}