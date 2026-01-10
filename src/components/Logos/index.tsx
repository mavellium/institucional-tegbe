"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Interface mantida conforme seu padrão
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

export default function Logos({ data }: LogosProps) {
  const [apiLogos, setApiLogos] = useState<LogosApiData[]>([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH DOS DADOS DO ENDPOINT ---
  useEffect(() => {
    const fetchLogos = async () => {
      try {
        // Usando o caminho do rewrite configurado para evitar NetworkError
        const response = await fetch('/api-tegbe/tegbe-institucional/form/logos-ecommerce');
        const result = await response.json();
        
        if (result.values) {
          // Mapeamento dos campos da API para a interface do componente
          const formattedLogos: LogosApiData[] = result.values.map((item: any) => ({
            id: item.id,
            src: item.image,
            alt: item.name || "Logo Ecommerce",
            width: 150,
            height: 100
          }));
          setApiLogos(formattedLogos);
        }
      } catch (error) {
        console.error("Erro ao carregar logos da API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogos();
  }, []);

  // Define quais logos usar (Prioridade para a prop 'data', depois API)
  const logos = (data && data.length > 0) ? data : apiLogos;

  // Se ainda estiver carregando ou não houver logos, não renderiza para não quebrar o layout
  if (loading && !data) return null;
  if (logos.length === 0) return null;

  // Multiplicação para garantir fluidez (Mantida sua lógica)
  const marqueeLogos = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos];

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
          animate={{ x: "-50%" }} 
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          }}
        >
          {/* Loop infinito com 2x marqueeLogos */}
          {[...marqueeLogos, ...marqueeLogos].map((logo, index) => (
            <div 
              key={`${logo.id}-${index}`}
              className="flex-shrink-0 pr-20 md:pr-44 group cursor-pointer"
              onClick={() => handleLogoClick(logo)}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 150}
                height={logo.height || 100}
                className="w-auto h-14 md:h-24 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-105"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}