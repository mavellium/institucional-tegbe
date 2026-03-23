"use client";

import { cn } from "@/lib/utils";

type TextVariant =
  | "body"
  | "muted"
  | "lead"
  | "small"
  | "caption";

interface TextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  className?: string;
  as?: React.ElementType;
  color?: string;
}

const variants = {
  body: "text-[17px] leading-[1.75] font-light text-[#0A0A0A]",
  lead: "text-[20px] leading-[1.7] font-light text-[#0A0A0A]",
  muted: "text-[17px] leading-[1.75] font-light text-[#666]",
  small: "text-sm text-gray-500",
  caption: "text-xs text-gray-400",
};

export default function Text({
  children,
  variant = "body",
  color = "#0A0A0A",
  className,
  as: Component = "p",
}: TextProps) {
  return (
    <Component
      className={cn(
        variants[variant],
        className
      )}
      style={{ color }}
    >
      {children}
    </Component>
  );
}