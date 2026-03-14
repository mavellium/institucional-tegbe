"use client";

import { cn } from "@/lib/utils";
import { HeadingFont, HeadingLevel, HeadingSize } from "@/types/formatacaoText.type";

interface HeadingProps {
  children: React.ReactNode;
  as?: HeadingLevel;
  size?: HeadingSize;
  className?: string;
  color?: string;
  font?: HeadingFont;
}

const sizes = {
  sm: "text-[20px] leading-[1.3]",
  md: "text-[28px] leading-[1.2]",
  lg: "text-[32px] lg:text-[48px] leading-[1.1]",
  xl: "text-[40px] lg:text-[64px] leading-[1.05]",
  p: ""
};

export default function Heading({
  children,
  as: Component = "h2",
  size = "lg",
  className,
  color = '#0A0A0A',
  font = 'medium'
}: HeadingProps) {
  return (
    <Component
      className={cn(
        `tracking-tight font-[${font}] text-[${color}]`,
        className,
        sizes[size],
      )}
    >
      {children}
    </Component>
  );
}