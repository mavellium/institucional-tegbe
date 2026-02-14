"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const logos = [
  { src: "/logo1.svg", alt: "Logo 1", width: 100, height: 100 },
  { src: "/logo2.svg", alt: "Logo 2", width: 75, height: 100 },
  { src: "/logo3.svg", alt: "Logo 3", width: 75, height: 100 },
  { src: "/logo4.svg", alt: "Logo 4", width: 75, height: 100 },
];

// Triplicamos a lista para garantir o loop infinito perfeito em telas ultra-wide
const marqueeLogos = [...logos, ...logos, ...logos];

export default function Logos() {
  return (
    <section className="py-24 overflow-hidden relative">
      
      {/* --- MÁSCARA DE FADE --- */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-100 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-100 to-transparent z-10 pointer-events-none" />

      <div className="flex w-full">
        <motion.div
          className="flex items-center"
          initial={{ x: "-33.33%" }} // Inicia deslocado para a esquerda
          animate={{ x: 0 }} // Move para a posição original
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 40, // Mantendo a elegância lenta
            ease: "linear",
          }}
        >
          {marqueeLogos.map((logo, index) => (
            <div 
              key={index} 
              // Espaçamento generoso entre logos
              className="flex-shrink-0 pr-20 md:pr-44 group cursor-pointer"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                // AQUI ESTÁ A MUDANÇA: h-14 (Mobile) e h-24 (Desktop)
                // Isso deixa os logos bem robustos na tela.
                className="w-auto h-14 md:h-24 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-105"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}