"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Interface atualizada para aceitar string no ID
export interface LogosApiData {
  id: string | number;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  url?: string;
}

interface LogosProps {
  data?: LogosApiData[];
}

// Novos dados integrados (Mercado Livre & Shopee)
const defaultLogos: LogosApiData[] = [
  { 
    id: "logos-ecommerce-0", 
    src: "https://oaaddtqd6pehgldz.public.blob.vercel-storage.com/1767659970226-logo1.svg", 
    alt: "Mercado Livre", 
    width: 150, // Dimensões base para aspect ratio
    height: 100 
  },
  { 
    id: "logos-ecommerce-1767659973232", 
    src: "https://oaaddtqd6pehgldz.public.blob.vercel-storage.com/1767659999428-logo4.svg", 
    alt: "Shopee", 
    width: 150, 
    height: 100 
  }
];

export default function Logos({ data }: LogosProps) {
  // Usar dados da API ou fallback
  const logos = data && data.length > 0 ? data : defaultLogos;
  
  // Como temos poucos logos (2), multiplicamos mais vezes para garantir fluidez na tela larga
  // 6 repetições garante que a tela sempre esteja cheia antes do loop reiniciar
  const marqueeLogos = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos];

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
          // Como aumentamos a multiplicação do array, ajustamos o movimento
          // Se temos 6 conjuntos e queremos mover 1/6 (um ciclo completo visual), usamos -16.66%
          // Mas para o loop "infinito" perfeito com 6 repetições visualmente contínuas, 
          // moveremos -50% se dobrarmos a lista total logicamente, ou mantemos a lógica simples:
          // A lógica mais segura para poucos itens é criar uma lista gigante e mover devagar.
          animate={{ x: "-50%" }} 
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 30, // Velocidade ajustada para os novos logos
            ease: "linear",
          }}
        >
          {/* Duplicamos a lista 'marqueeLogos' inteira visualmente para garantir o loop sem corte */}
          {[...marqueeLogos, ...marqueeLogos].map((logo, index) => (
            <div 
              key={`${logo.id}-${index}`}
              // Espaçamento generoso entre logos
              className="flex-shrink-0 pr-20 md:pr-44 group cursor-pointer"
              onClick={() => handleLogoClick(logo)}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 150}
                height={logo.height || 100}
                // Classes de estilo e hover
                className="w-auto h-14 md:h-24 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-105"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}