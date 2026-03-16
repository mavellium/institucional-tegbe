"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { LogosApiData, LogosProps, VARIANT_CONFIGS } from "@/types/logos.type";
import { extractLogosFromAPI } from "@/utils/logos.utils";
import LogoItem from "../ui/logoItem";

export default function Logos({ data, variant = 'default' }: LogosProps) {
  const [apiLogos, setApiLogos] = useState<LogosApiData[]>([]);
  const [loading, setLoading] = useState(true);
  const [setWidth, setSetWidth] = useState(0);
  
  const singleSetRef = useRef<HTMLDivElement>(null);
  const config = VARIANT_CONFIGS[variant];

  // Fetch de dados
  useEffect(() => {
    if (data && data.length > 0) {
      setLoading(false);
      return;
    }

    const fetchLogos = async () => {
      try {
        const endpoints = {
          cursos: '/api-tegbe/tegbe-institucional/form/logos-curso',
          marketing: '/api-tegbe/tegbe-institucional/form/logos-marketing',
          default: '/api-tegbe/tegbe-institucional/form/logos-ecommerce'
        };
        const response = await fetch(endpoints[variant]);
        const result = await response.json();
        setApiLogos(extractLogosFromAPI(result));
      } catch (error) {
        console.error("Erro ao carregar logos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogos();
  }, [variant, data]);

  const validLogos = useMemo(() => {
    const list = (data && data.length > 0) ? data : apiLogos;
    return list.filter(l => l?.src && l?.alt);
  }, [data, apiLogos]);

  // Medição da largura de um único set de logos
  useEffect(() => {
    if (validLogos.length > 0) {
      const timer = setTimeout(() => {
        if (singleSetRef.current) setSetWidth(singleSetRef.current.scrollWidth);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [validLogos]);

  if (loading && !data) return <div className={`py-20 text-center ${config.bgColor}`}>Carregando...</div>;
  if (validLogos.length === 0) return null;

  // Calculamos a duração baseada na largura real / velocidade desejada
  const duration = setWidth / config.speed;

  return (
    <section className={`py-24 ${config.bgColor} overflow-hidden relative`}>
      {/* Máscaras Laterais */}
      <div className={`absolute inset-y-0 left-0 w-32 bg-gradient-to-r ${config.gradientFrom} to-transparent z-10 pointer-events-none`} />
      <div className={`absolute inset-y-0 right-0 w-32 bg-gradient-to-l ${config.gradientFrom} to-transparent z-10 pointer-events-none`} />

      <div className="relative overflow-hidden">
        {/* Container invisível para medir o tamanho de um set real */}
        <div ref={singleSetRef} className="flex items-center invisible absolute" aria-hidden="true">
          {validLogos.map((logo, i) => <LogoItem key={`m-${i}`} logo={logo} config={config} />)}
        </div>

        {/* O Marquee Real - Duplicamos o array apenas o suficiente para o loop */}
        <motion.div
          className="flex items-center"
          style={{ width: 'max-content' }}
          animate={{ x: [0, -setWidth] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: duration || 20,
          }}
        >
          {/* Duplicamos o set 3 vezes para garantir que nunca falte imagem na tela durante o reset do X */}
          {[...validLogos, ...validLogos, ...validLogos].map((logo, index) => (
            <LogoItem key={`logo-${index}`} logo={logo} config={config} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}