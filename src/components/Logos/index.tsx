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
  variant?: 'default' | 'cursos';
}

export default function Logos({ 
  data, 
  variant = 'default'
}: LogosProps) {
  const [apiLogos, setApiLogos] = useState<LogosApiData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- FETCH DOS DADOS DO ENDPOINT ---
  useEffect(() => {
    const fetchLogos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Endpoint específico para cursos se for a variante cursos
        const endpoint = variant === 'cursos' 
          ? '/api-tegbe/tegbe-institucional/form/logos-curso'
          : '/api-tegbe/tegbe-institucional/form/logos-ecommerce';
        
        console.log(`📡 Buscando logos de: ${endpoint}`);
        
        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('📦 Resposta da API:', result);
        
        // Verificação segura: result.values deve existir E ser um array
        if (result && result.values && Array.isArray(result.values)) {
          const formattedLogos: LogosApiData[] = result.values
            .filter((item: any) => item.image && item.image.trim() !== '') // Filtra itens com imagem vazia
            .map((item: any) => ({
              id: item.id,
              src: item.image,
              alt: item.name || (variant === 'cursos' ? "Logo Curso" : "Logo Ecommerce"),
              width: variant === 'cursos' ? 150 : 150, // Mesma largura para ambas as variantes
              height: variant === 'cursos' ? 100 : 100, // Mesma altura para ambas as variantes
              url: item.url || item.website
            }));
          setApiLogos(formattedLogos);
        } else {
          console.warn('⚠️ Formato inesperado ou dados vazios:', result);
          setApiLogos([]);
        }
      } catch (error) {
        console.error(`❌ Erro ao carregar logos da API (${variant}):`, error);
        setError(`Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        setApiLogos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLogos();
  }, [variant]);

  // Define quais logos usar (Prioridade para a prop 'data', depois API)
  const logos = (data && data.length > 0) ? data : apiLogos;
  
  // Filtra logos para garantir que tenham src e alt válidos
  const validLogos = logos.filter(logo => 
    logo.src && 
    logo.src.trim() !== '' && 
    logo.alt && 
    logo.alt.trim() !== ''
  );

  // Configurações por variante - CURSOS agora usa a mesma estrutura do DEFAULT
  const variantConfig = {
    default: {
      bgColor: "bg-gray-100",
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
      // Mesma estrutura da variante default
      bgColor: "bg-black", // Agora usa cinza igual ao default
      gradientFrom: "from-black",
      gradientTo: "to-transparent",
      logoHeight: "h-14 md:h-24", // Mesma altura
      logoOpacity: "opacity-60", // Mesma opacidade
      logoFilter: "grayscale", // Mesmo filtro
      sectionPadding: "py-24", // Mesmo padding
      animationDuration: 30, // Mesma duração da animação
      showHeader: true // Agora mostra header também
    }
  };

  const config = variantConfig[variant];

  // Se ainda estiver carregando, mostra um loader simples
  if (loading && !data) {
    return (
      <div className={`${config.sectionPadding} ${config.bgColor} flex justify-center items-center`}>
        <div className="text-gray-500">Carregando...</div>
      </div>
    );
  }

  // Se houver erro, logamos mas não mostramos nada
  if (error && !data) {
    console.warn(`Erro no componente Logos (${variant}):`, error);
    return null;
  }

  // Se não houver logos válidos, não renderiza
  if (validLogos.length === 0) {
    console.log(`ℹ️ Nenhum logo válido disponível para ${variant}`);
    console.log('Logos brutos:', logos);
    console.log('Logos válidos:', validLogos);
    return null;
  }

  // Multiplicação para garantir fluidez - mesma quantidade de repetições
  const marqueeLogos = [...validLogos, ...validLogos, ...validLogos, ...validLogos, ...validLogos, ...validLogos];

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

        {/* Primeira linha (da esquerda para direita) - MESMA PARA AMBAS AS VARIANTES */}
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
            {marqueeLogos.map((logo, index) => (
              <div 
                key={`first-${logo.id}-${index}`}
                className="flex-shrink-0 px-8 md:px-16 group cursor-pointer"
                onClick={() => handleLogoClick(logo)}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width || 150} // Tamanho padrão para ambas as variantes
                  height={logo.height || 100} // Tamanho padrão para ambas as variantes
                  className={`w-auto ${config.logoHeight} object-contain ${config.logoFilter} ${config.logoOpacity} hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-105`}
                  onError={(e) => {
                    // Fallback em caso de erro no carregamento da imagem
                    console.warn(`Erro ao carregar imagem: ${logo.src}`);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>
        </div>
    </section>
  );
}