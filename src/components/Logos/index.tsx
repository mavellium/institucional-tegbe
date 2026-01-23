"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

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
  variant?: 'default' | 'cursos';
  title?: string;
  subtitle?: string;
  showBadge?: boolean;
  badgeText?: string;
  badgeIcon?: string;
}

export default function Logos({ 
  data, 
  variant = 'default',
  showBadge = false,
  badgeText = "Parcerias Oficiais",
  badgeIcon = "ph:handshake-fill"
}: LogosProps) {
  const [apiLogos, setApiLogos] = useState<LogosApiData[]>([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH DOS DADOS DO ENDPOINT ---
  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const response = await fetch('/api-tegbe/tegbe-institucional/form/logos-ecommerce');
        const result = await response.json();
        
        if (result.values) {
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

  // Configurações por variante
  const variantConfig = {
    default: {
      bgColor: "bg-gray-100",
      textColor: "text-gray-900",
      subtitleColor: "text-gray-600",
      gradientFrom: "from-gray-100",
      gradientTo: "to-transparent",
      logoHeight: "h-14 md:h-24",
      logoOpacity: "opacity-60",
      logoFilter: "grayscale",
      sectionPadding: "py-24",
      animationDuration: 30,
      showHeader: true
    },
    cursos: {
      bgColor: "bg-black",
      textColor: "text-white",
      subtitleColor: "text-gray-300",
      gradientFrom: "from-black",
      gradientTo: "to-transparent",
      logoHeight: "h-12 md:h-16",
      logoOpacity: "opacity-70",
      logoFilter: "grayscale",
      sectionPadding: "py-16 md:py-20",
      animationDuration: 25,
      showHeader: false
    }
  };

  const config = variantConfig[variant];

  // Se ainda estiver carregando ou não houver logos, não renderiza para não quebrar o layout
  if (loading && !data) return null;
  if (logos.length === 0) return null;

  // Multiplicação para garantir fluidez
  const marqueeLogos = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos];

  const handleLogoClick = (logo: LogosApiData) => {
    if (logo.url) {
      window.open(logo.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className={`${config.sectionPadding} ${config.bgColor} overflow-hidden relative`}>

      {/* Container da animação */}
      <div className="relative">
        {/* --- MÁSCARA DE FADE --- */}
        <div className={`absolute inset-y-0 left-0 w-32 bg-gradient-to-r ${config.gradientFrom} to-transparent z-10 pointer-events-none`} />
        <div className={`absolute inset-y-0 right-0 w-32 bg-gradient-to-l ${config.gradientFrom} to-transparent z-10 pointer-events-none`} />

        {/* Primeira linha (da esquerda para direita) */}
        <div className="flex w-full mb-8 md:mb-12">
          <motion.div
            className="flex items-center"
            initial={{ x: 0 }}
            animate={{ x: "-50%" }} 
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: config.animationDuration,
              ease: "linear",
            }}
          >
            {[...marqueeLogos].map((logo, index) => (
              <div 
                key={`first-${logo.id}-${index}`}
                className="flex-shrink-0 px-8 md:px-16 group cursor-pointer"
                onClick={() => handleLogoClick(logo)}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width || (variant === 'cursos' ? 120 : 150)}
                  height={logo.height || (variant === 'cursos' ? 80 : 100)}
                  className={`w-auto ${config.logoHeight} object-contain ${config.logoFilter} ${config.logoOpacity} hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-105`}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Segunda linha (da direita para esquerda) - apenas para cursos */}
        {variant === 'cursos' && (
          <div className="flex w-full mt-8 md:mt-12">
            <motion.div
              className="flex items-center"
              initial={{ x: "-50%" }}
              animate={{ x: 0 }} 
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: config.animationDuration,
                ease: "linear",
              }}
            >
              {[...marqueeLogos].reverse().map((logo, index) => (
                <div 
                  key={`second-${logo.id}-${index}`}
                  className="flex-shrink-0 px-8 md:px-16 group cursor-pointer"
                  onClick={() => handleLogoClick(logo)}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width || 120}
                    height={logo.height || 80}
                    className={`w-auto ${config.logoHeight} object-contain ${config.logoFilter} ${config.logoOpacity} hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-105`}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}