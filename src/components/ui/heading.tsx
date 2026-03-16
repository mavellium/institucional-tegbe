"use client";

import { cn } from "@/lib/utils";
import {
  HeadingAlign,
  HeadingFont,
  HeadingLevel,
  HeadingSize,
} from "@/types/formatacaoText.type";

interface HeadingProps {
  children: React.ReactNode;
  as?: HeadingLevel;
  size?: HeadingSize;
  align?: HeadingAlign;
  className?: string;
  color?: string;
  font?: HeadingFont;
}

const sizes = {
  sm: "text-[20px] leading-[1.3]",
  md: "text-[28px] leading-[1.2]",
  lg: "text-[32px] lg:text-[48px] leading-[1.1]",
  xl: "text-[40px] lg:text-[64px] leading-[1.05]",
  p: "",
};

const aligns: Record<HeadingAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const fonts: Record<HeadingFont, string> = {
  light: "font-light",
  regular: "font-normal",
  medium: "font-medium",
  bold: "font-bold",
  black: "font-black",
};

export default function Heading({
  children,
  as: Component = "h2",
  size = "lg",
  align = "left",
  className,
  color = "#0A0A0A",
  font = "medium"
}: HeadingProps) {
  return (
    <Component
      className={cn(
        "tracking-tight",
        sizes[size],
        aligns[align],
        fonts[font],
        className
      )}
      style={{ color }}
    >
      {children}
    </Component>
  );
}