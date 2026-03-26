"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { LogosApiData, LogosProps, VARIANT_CONFIGS } from "@/types/logos.type";
import LogoItem from "@/components/ui/logoItem";
import { useApi } from "@/hooks/useApi";
import { ILogo } from "@/interface/imagem/ILogo";

export default function Logos({ variant = "default", endpoint }: LogosProps) {
  const config = VARIANT_CONFIGS[variant];
  const singleSetRef = useRef<HTMLDivElement>(null);
  const [setWidth, setSetWidth] = useState(0);

  // 🔹 Pega os dados da API
  const { data, loading } = useApi<LogosApiData>(endpoint);

  // 🔹 Garante que sempre teremos um array de logos
  const logos: ILogo[] = data?.values?.map((item) => ({
    ...item,
    alt: item.alt || item.name || item.description || "Logo",
  })) ?? [];

  // 🔹 Calcula a largura do conjunto de logos (para animação)
  useEffect(() => {
    if (!logos.length) return;

    const timer = setTimeout(() => {
      if (singleSetRef.current) {
        setSetWidth(singleSetRef.current.scrollWidth);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [logos]);

  if (loading || !logos.length) return null;

  const duration = setWidth / config.speed || 20;

  return (
    <section className={`py-24 ${config.bgColor} overflow-hidden relative`}>
      {/* Gradientes laterais */}
      <div
        className={`absolute inset-y-0 left-0 w-32 bg-gradient-to-r ${config.gradientFrom} to-transparent z-10 pointer-events-none`}
      />
      <div
        className={`absolute inset-y-0 right-0 w-32 bg-gradient-to-l ${config.gradientFrom} to-transparent z-10 pointer-events-none`}
      />

      <div className="relative overflow-hidden">
        {/* Medição da largura real */}
        <div
          ref={singleSetRef}
          className="flex items-center invisible absolute"
          aria-hidden="true"
        >
          {logos.map((logo: ILogo, i: number) => (
            <LogoItem key={`measure-${i}`} logo={logo} config={config} />
          ))}
        </div>

        {/* Marquee animado */}
        <motion.div
          className="flex items-center"
          style={{ width: "max-content" }}
          animate={{ x: [0, -setWidth] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration,
          }}
        >
          {[...logos, ...logos, ...logos].map((logo: ILogo, i: number) => (
            <LogoItem key={`logo-${i}`} logo={logo} config={config} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}