"use client";

import { cn } from "@/lib/utils";

interface TexturaProps {
  src?: string;               // imagem de fundo
  backgroundImage?: string;   // permite passar gradientes ou múltiplos layers
  opacity?: number;
  className?: string;
  misturar?: boolean;
}

export default function Textura({
  src,
  backgroundImage,
  opacity = 0.05,
  className,
  misturar = false,
}: TexturaProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none z-[1]",
        misturar && "mix-blend-overlay",
        className
      )}
      style={{
        opacity,
        backgroundImage: backgroundImage
          ? backgroundImage
          : src
          ? `url('${src}')`
          : undefined,
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
      }}
    />
  );
}