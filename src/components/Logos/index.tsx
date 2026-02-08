"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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
        
        console.log(`📡 [${variant}] Buscando logos de: ${endpoint}`);
        
        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log(`📦 [${variant}] Resposta completa da API:`, JSON.stringify(result, null, 2));
        
        // PARA VARIANTE CURSOS - estrutura específica
        if (variant === 'cursos') {
          console.log(`🔍 [${variant}] Processando estrutura específica de cursos...`);
          
          // Verifica se temos a estrutura aninhada: result.values.values
          if (result && result.values && result.values.values && Array.isArray(result.values.values)) {
            console.log(`✅ [${variant}] Encontrado array de logos em result.values.values`);
            
            const formattedLogos: LogosApiData[] = result.values.values
              .filter((item: any) => item.image && item.image.trim() !== '')
              .map((item: any, index: number) => ({
                id: item.id || `curso-logo-${index}`,
                src: item.image,
                alt: item.name || "Logo Curso Parceiro",
                width: 150,
                height: 100,
                url: item.url || item.website || '#'
              }));
            
            console.log(`🎉 [${variant}] Logos processadas:`, formattedLogos);
            setApiLogos(formattedLogos);
          } 
          // Verifica se temos a estrutura direta: result.values (array)
          else if (result && result.values && Array.isArray(result.values)) {
            console.log(`✅ [${variant}] Encontrado array de logos em result.values`);
            
            const formattedLogos: LogosApiData[] = result.values
              .filter((item: any) => item.image && item.image.trim() !== '')
              .map((item: any, index: number) => ({
                id: item.id || `curso-logo-${index}`,
                src: item.image,
                alt: item.name || "Logo Curso",
                width: 150,
                height: 100,
                url: item.url || item.website || '#'
              }));
            
            setApiLogos(formattedLogos);
          }
          // Tenta encontrar logos em qualquer lugar da estrutura
          else if (result && result.values) {
            console.log(`🔍 [${variant}] Explorando estrutura completa em busca de logos...`);
            
            // Função recursiva para buscar arrays de logos
            const findLogosInObject = (obj: any): any[] => {
              if (!obj) return [];
              
              if (Array.isArray(obj)) {
                // Verifica se este array tem itens com campo 'image'
                const logos = obj.filter(item => item && item.image && typeof item.image === 'string');
                if (logos.length > 0) {
                  console.log(`🔍 [${variant}] Encontrado array de logos com ${logos.length} itens`);
                  return logos;
                }
                return [];
              }
              
              if (typeof obj === 'object') {
                for (const key in obj) {
                  const result = findLogosInObject(obj[key]);
                  if (result.length > 0) return result;
                }
              }
              
              return [];
            };
            
            const foundLogos = findLogosInObject(result);
            if (foundLogos.length > 0) {
              const formattedLogos: LogosApiData[] = foundLogos
                .map((item: any, index: number) => ({
                  id: item.id || `found-logo-${index}`,
                  src: item.image,
                  alt: item.name || item.title || `Logo ${index + 1}`,
                  width: 150,
                  height: 100,
                  url: item.url || item.website || item.link || '#'
                }));
              
              console.log(`✅ [${variant}] Logos encontradas na estrutura:`, formattedLogos);
              setApiLogos(formattedLogos);
            } else {
              console.warn(`⚠️ [${variant}] Nenhuma logo encontrada na estrutura`);
              setApiLogos([]);
            }
          } else {
            console.warn(`⚠️ [${variant}] Formato inesperado para cursos`);
            setApiLogos([]);
          }
        } 
        // PARA VARIANTE DEFAULT (ecommerce) - estrutura original
        else {
          console.log(`🔍 [${variant}] Processando estrutura padrão...`);
          
          if (result && result.values && Array.isArray(result.values)) {
            const formattedLogos: LogosApiData[] = result.values
              .filter((item: any) => item.image && item.image.trim() !== '')
              .map((item: any) => ({
                id: item.id,
                src: item.image,
                alt: item.name || "Logo Ecommerce",
                width: 150,
                height: 100,
                url: item.url || item.website
              }));
            
            setApiLogos(formattedLogos);
          } else {
            console.warn(`⚠️ [${variant}] Formato inesperado ou dados vazios`);
            setApiLogos([]);
          }
        }
      } catch (error) {
        console.error(`❌ [${variant}] Erro ao carregar logos:`, error);
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
    logo && 
    logo.src && 
    typeof logo.src === 'string' && 
    logo.src.trim() !== '' && 
    logo.alt && 
    typeof logo.alt === 'string' && 
    logo.alt.trim() !== ''
  );

  // DEBUG: Logs detalhados
  useEffect(() => {
    console.log(`📊 [${variant}] Status:`, {
      loading,
      error,
      totalLogos: logos.length,
      validLogos: validLogos.length,
      logosData: logos
    });
  }, [variant, loading, error, logos, validLogos]);

  // Configurações por variante
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
    },
    cursos: {
      bgColor: "bg-black",
      gradientFrom: "from-black",
      gradientTo: "to-transparent",
      logoHeight: "h-14 md:h-24",
      logoOpacity: "opacity-70",
      logoFilter: "grayscale",
      sectionPadding: "py-24",
      animationDuration: 30,
    }
  };

  const config = variantConfig[variant];

  // Se ainda estiver carregando, mostra um loader simples
  if (loading && !data) {
    return (
      <div className={`${config.sectionPadding} ${config.bgColor} flex justify-center items-center`}>
        <div className="text-gray-500">Carregando logos...</div>
      </div>
    );
  }

  // Se houver erro, mostra mensagem
  if (error && !data) {
    console.warn(`Erro no componente Logos (${variant}):`, error);
    return (
      <div className={`${config.sectionPadding} ${config.bgColor} flex justify-center items-center`}>
        <div className="text-red-500 text-sm">Erro ao carregar logos</div>
      </div>
    );
  }

  // Se não houver logos válidas, mostra debug detalhado
  if (validLogos.length === 0) {
    console.log(`⚠️ [${variant}] Nenhuma logo válida encontrada`);
    console.log(`📝 [${variant}] Dados recebidos:`, {
      apiLogos,
      logos,
      validLogos
    });
    
    // Para debug, você pode mostrar um fallback
    return (
      <div className={`${config.sectionPadding} ${config.bgColor} flex justify-center items-center`}>
        <div className="text-center">
          <div className="text-gray-500 mb-2">Nenhuma logo encontrada</div>
          <div className="text-xs text-gray-400">
            Variante: {variant} | API Logos: {apiLogos.length} | Total itens: {logos.length}
          </div>
        </div>
      </div>
    );
  }

  // Multiplicação para garantir fluidez
  const marqueeLogos = [...validLogos, ...validLogos, ...validLogos, ...validLogos, ...validLogos, ...validLogos];

  const handleLogoClick = (logo: LogosApiData) => {
    if (logo.url && logo.url !== '#') {
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

        {/* Linha de logos */}
        <div className="flex w-full">
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
                key={`logo-${logo.id}-${index}`}
                className="flex-shrink-0 px-8 md:px-16 group cursor-pointer"
                onClick={() => handleLogoClick(logo)}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width || 150}
                  height={logo.height || 100}
                  className={`w-auto ${config.logoHeight} object-contain ${config.logoFilter} ${config.logoOpacity} hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-105`}
                  onError={(e) => {
                    console.warn(`Erro ao carregar imagem: ${logo.src}`);
                    e.currentTarget.style.display = 'none';
                  }}
                  onLoad={() => {
                    console.log(`✅ Imagem carregada: ${logo.alt}`);
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