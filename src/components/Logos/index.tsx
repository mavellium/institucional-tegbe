"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Interface para os dados da API
export interface LogosApiData {
  id: number;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  url?: string;
}

interface LogosProps {
  data?: LogosApiData[];
}

// Logos padrão (fallback)
const defaultLogos: LogosApiData[] = [
  { id: 1, src: "/logo1.svg", alt: "Logo 1", width: 100, height: 100 },
  { id: 2, src: "/logo2.svg", alt: "Logo 2", width: 75, height: 100 },
  { id: 3, src: "/logo3.svg", alt: "Logo 3", width: 75, height: 100 },
  { id: 4, src: "/logo4.svg", alt: "Logo 4", width: 75, height: 100 },
];

export default function Logos({ data }: LogosProps) {
  // Usar dados da API ou fallback
  const logos = data && data.length > 0 ? data : defaultLogos;
  
  // Triplicamos a lista para garantir o loop infinito perfeito em telas ultra-wide
  const marqueeLogos = [...logos, ...logos, ...logos];

  // Função para lidar com clique no logo
  const handleLogoClick = (logo: LogosApiData) => {
    if (logo.url) {
      window.open(logo.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="py-24 bg-gray-100 overflow-hidden relative">
      
      {/* --- MÁSCARA DE FADE --- */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-100 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-100 to-transparent z-10 pointer-events-none" />

      <div className="flex w-full">
        <motion.div
          className="flex items-center"
          initial={{ x: 0 }}
          animate={{ x: "-33.33%" }} // Move 1/3 do total (já que temos 3 conjuntos de logos)
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 40, // Mantendo a elegância lenta
            ease: "linear",
          }}
        >
          {marqueeLogos.map((logo, index) => (
            <div 
              key={`${logo.id}-${index}`}
              // Espaçamento generoso entre logos
              className="flex-shrink-0 pr-20 md:pr-44 group cursor-pointer"
              onClick={() => handleLogoClick(logo)}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 100}
                height={logo.height || 100}
                // AQUI ESTÁ A MUDANÇA: h-14 (Mobile) e h-24 (Desktop)
                // Isso deixa os logos bem robustos na tela.
                className="w-auto h-14 md:h-24 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-105"
                // Desativa a otimização do Next.js para imagens do domínio vercel-storage.com
                unoptimized={logo.src.includes('vercel-storage.com')}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}