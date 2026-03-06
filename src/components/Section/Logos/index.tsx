"use client";

import { useState, useEffect, useRef, useMemo } from "react";
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

export default function Logos({ data, variant = 'default' }: LogosProps) {
  const [apiLogos, setApiLogos] = useState<LogosApiData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [setWidth, setSetWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [marqueeLogos, setMarqueeLogos] = useState<LogosApiData[]>([]);

  const singleSetRef = useRef<HTMLDivElement>(null);

  // --- FETCH DOS DADOS DO ENDPOINT ---
  useEffect(() => {
    const fetchLogos = async () => {
      try {
        setLoading(true);
        setError(null);

        const endpoint =
          variant === 'cursos'
            ? '/api-tegbe/tegbe-institucional/form/logos-curso'
            : '/api-tegbe/tegbe-institucional/form/logos-ecommerce';

        console.log(`📡 [${variant}] Buscando logos de: ${endpoint}`);

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(`📦 [${variant}] Resposta completa:`, result);

        let extractedLogos: LogosApiData[] = [];

        if (variant === 'cursos') {
          extractedLogos = extractCursosLogos(result);
        } else {
          extractedLogos = extractEcommerceLogos(result);
        }

        console.log(`🎉 [${variant}] Logos extraídas:`, extractedLogos);
        setApiLogos(extractedLogos);
      } catch (error) {
        console.error(`❌ [${variant}] Erro ao carregar logos:`, error);
        setError(error instanceof Error ? error.message : 'Erro desconhecido');
        setApiLogos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLogos();
  }, [variant]);

  // Função auxiliar para extrair logos de cursos
  const extractCursosLogos = (result: any): LogosApiData[] => {
    // Tenta encontrar em result.values.values
    if (result?.values?.values && Array.isArray(result.values.values)) {
      return result.values.values
        .filter((item: any) => item?.image)
        .map((item: any, index: number) => ({
          id: item.id || `curso-logo-${index}`,
          src: item.image,
          alt: item.name || "Logo Curso Parceiro",
          width: 150,
          height: 100,
          url: item.url || item.website || '#',
        }));
    }
    // Tenta result.values (array)
    if (result?.values && Array.isArray(result.values)) {
      return result.values
        .filter((item: any) => item?.image)
        .map((item: any, index: number) => ({
          id: item.id || `curso-logo-${index}`,
          src: item.image,
          alt: item.name || "Logo Curso",
          width: 150,
          height: 100,
          url: item.url || item.website || '#',
        }));
    }
    // Busca recursiva (fallback)
    const found = findLogosInObject(result);
    if (found.length > 0) {
      return found.map((item: any, index: number) => ({
        id: item.id || `found-logo-${index}`,
        src: item.image,
        alt: item.name || item.title || `Logo ${index + 1}`,
        width: 150,
        height: 100,
        url: item.url || item.website || item.link || '#',
      }));
    }
    return [];
  };

  // Função auxiliar para extrair logos de ecommerce (agora mais robusta)
  const extractEcommerceLogos = (result: any): LogosApiData[] => {
    // Possíveis locais onde o array de logos pode estar
    const possibleArrays = [
      result?.values,           // estrutura antiga
      result?.data,             // estrutura comum em APIs
      result,                   // array direto
    ];

    for (const arr of possibleArrays) {
      if (Array.isArray(arr) && arr.length > 0) {
        // Verifica se os itens têm a propriedade 'image'
        const logos = arr.filter((item: any) => item?.image);
        if (logos.length > 0) {
          return logos.map((item: any) => ({
            id: item.id,
            src: item.image,
            alt: item.name || "Logo Ecommerce",
            width: 150,
            height: 100,
            url: item.url || item.website || '#',
          }));
        }
      }
    }

    // Se não encontrou, tenta busca recursiva
    const found = findLogosInObject(result);
    if (found.length > 0) {
      return found.map((item: any, index: number) => ({
        id: item.id || `ecommerce-logo-${index}`,
        src: item.image,
        alt: item.name || item.title || `Logo ${index + 1}`,
        width: 150,
        height: 100,
        url: item.url || item.website || item.link || '#',
      }));
    }

    return [];
  };

  // Busca recursiva por qualquer objeto que tenha a propriedade 'image'
  const findLogosInObject = (obj: any): any[] => {
    if (!obj) return [];
    if (Array.isArray(obj)) {
      // Verifica se este array tem itens com campo 'image'
      const logos = obj.filter(item => item && item.image && typeof item.image === 'string');
      if (logos.length > 0) return logos;
      // Procura dentro de cada item do array
      for (const item of obj) {
        const result = findLogosInObject(item);
        if (result.length > 0) return result;
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

  // Define quais logos usar (prioridade para a prop 'data')
  const logos = (data && data.length > 0) ? data : apiLogos;

  // 🔹 MEMORIZA validLogos PARA EVITAR RECRIAÇÃO DESNECESSÁRIA
  const validLogos = useMemo(() => {
    return logos.filter(
      (logo) =>
        logo &&
        logo.src &&
        typeof logo.src === 'string' &&
        logo.src.trim() !== '' &&
        logo.alt &&
        typeof logo.alt === 'string' &&
        logo.alt.trim() !== ''
    );
  }, [logos]);

  // Log para debug
  useEffect(() => {
    console.log(`📊 [${variant}] Status final:`, {
      loading,
      error,
      totalLogos: logos.length,
      validLogos: validLogos.length,
    });
  }, [variant, loading, error, logos, validLogos]);

  // Atualiza a largura da viewport e configura listener de resize
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize(); // valor inicial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mede a largura do conjunto original (apenas quando validLogos muda)
  useEffect(() => {
    if (validLogos.length === 0) return;

    // Pequeno atraso para garantir que o DOM esteja pronto
    const timeout = setTimeout(() => {
      if (singleSetRef.current) {
        const width = singleSetRef.current.scrollWidth;
        setSetWidth(width);
        console.log(`📏 Largura do conjunto original: ${width}px`);
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [validLogos]);

  // Calcula as duplicações necessárias sempre que setWidth, viewportWidth ou validLogos mudarem
  useEffect(() => {
    if (setWidth === 0 || viewportWidth === 0 || validLogos.length === 0) return;

    // Queremos que a largura total seja pelo menos 2x a viewport para garantir fluidez
    const minTotalWidth = viewportWidth * 2;
    const copiesNeeded = Math.ceil(minTotalWidth / setWidth) + 1; // +1 para segurança
    const finalCopies = Math.min(copiesNeeded, 20); // Limite razoável

    console.log(`🔄 Necessárias ${finalCopies} cópias (setWidth=${setWidth}, viewport=${viewportWidth})`);

    const newMarqueeLogos = Array(finalCopies).fill(validLogos).flat();
    setMarqueeLogos(newMarqueeLogos);
  }, [setWidth, viewportWidth, validLogos]);

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
      speed: 880, // pixels por segundo (ajustável)
    },
    cursos: {
      bgColor: "bg-black",
      gradientFrom: "from-black",
      gradientTo: "to-transparent",
      logoHeight: "h-14 md:h-24",
      logoOpacity: "opacity-70",
      logoFilter: "grayscale",
      sectionPadding: "py-24",
      speed: 40, // mais lento para cursos
    },
  };

  const config = variantConfig[variant];

  // Calcula a duração da animação com base na largura total e velocidade desejada
  const totalWidth = setWidth * (marqueeLogos.length / validLogos.length); // largura total do marquee
  const duration = totalWidth / config.speed; // tempo para percorrer uma largura completa

  // Estados de carregamento e erro
  if (loading && !data) {
    return (
      <div className={`${config.sectionPadding} ${config.bgColor} flex justify-center items-center`}>
        <div className="text-gray-500">Carregando logos...</div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className={`${config.sectionPadding} ${config.bgColor} flex justify-center items-center`}>
        <div className="text-red-500 text-sm">Erro ao carregar logos</div>
      </div>
    );
  }

  if (validLogos.length === 0) {
    return (
      <div className={`${config.sectionPadding} ${config.bgColor} flex justify-center items-center`}>
        <div className="text-center text-gray-400">
          <p>Nenhuma logo disponível no momento.</p>
          <p className="text-xs mt-2">Variante: {variant}</p>
        </div>
      </div>
    );
  }

  const handleLogoClick = (logo: LogosApiData) => {
    if (logo.url && logo.url !== '#') {
      window.open(logo.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className={`${config.sectionPadding} ${config.bgColor} overflow-hidden relative`}>
      <div className="relative">
        {/* Máscaras de fade nas laterais */}
        <div className={`absolute inset-y-0 left-0 w-32 bg-gradient-to-r ${config.gradientFrom} to-transparent z-10 pointer-events-none`} />
        <div className={`absolute inset-y-0 right-0 w-32 bg-gradient-to-l ${config.gradientFrom} to-transparent z-10 pointer-events-none`} />

        {/* Container da animação */}
        <div className="overflow-hidden">
          {/* Conjunto invisível para medição (apenas uma cópia) */}
          <div
            ref={singleSetRef}
            className="flex items-center invisible absolute"
            aria-hidden="true"
          >
            {validLogos.map((logo, index) => (
              <div key={`measure-${logo.id}-${index}`} className="flex-shrink-0 px-8 md:px-16">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width || 150}
                  height={logo.height || 100}
                  className={`w-auto ${config.logoHeight} object-contain`}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
            ))}
          </div>

          {/* Marquee animado */}
          {marqueeLogos.length > 0 && (
            <motion.div
              className="flex items-center"
              style={{ width: 'max-content' }}
              initial={{ x: 0 }}
              animate={{ x: -setWidth }} // move exatamente a largura de uma cópia
              transition={{
                repeat: Infinity,
                repeatType: 'loop',
                duration: duration,
                ease: 'linear',
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
                  />
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}