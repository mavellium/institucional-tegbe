"use client";

import { cn } from "@/lib/utils";

interface TexturaProps {
  src?: string;
  opacity?: number;
  className?: string;
  misturar?: boolean;
}

export default function Textura({
  src = "/textura.svg",
  opacity = 0.05,
  className,
  misturar = false,
}: TexturaProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none z-[100]",
        misturar && "mix-blend-overlay",
        className
      )}
      style={{
        opacity,
        backgroundImage: `url('${src}')`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}