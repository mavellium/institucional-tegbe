"use client";

import { cn } from "@/lib/utils";

interface TexturaProps {
  /** URL da imagem de fundo (local `/...` ou remota permitida no `next.config`). */
  src?: string;
  /** Gradiente CSS ou várias camadas (`backgroundImage`). Tem prioridade sobre `src` quando os dois existem. */
  backgroundImage?: string;
  opacity?: number;
  className?: string;
  misturar?: boolean;
  /** Ex.: `cover` + `backgroundRepeat="no-repeat"` para foto de fundo em tela cheia. */
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: "repeat" | "no-repeat" | "round" | "space";
}

export default function Textura({
  src,
  backgroundImage,
  opacity = 0.05,
  className,
  misturar = false,
  backgroundSize = "auto",
  backgroundPosition = "center",
  backgroundRepeat = "repeat",
}: TexturaProps) {
  const usesCssLayers = Boolean(backgroundImage);
  const resolvedRepeat = backgroundRepeat;
  const resolvedSize = backgroundSize;

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
        backgroundRepeat: resolvedRepeat,
        backgroundSize: resolvedSize,
        backgroundPosition,
      }}
    />
  );
}
