"use client";

import { ReactNode } from "react";
import Text from "./texto";
import { cn } from "@/lib/utils";
import { HeadingAlign } from "@/types/formatacaoText.type";

interface ParagrafoTextoProps {
  children: ReactNode;
  className?: string;
  align?: HeadingAlign;
  color?: string;
}

const aligns: Record<HeadingAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export default function Paragrafo({
  children,
  className,
  color,
  align = "left",
}: ParagrafoTextoProps) {
  return (
    <Text color={color} className={cn("leading-[1.8]", className, aligns[align],)}>
      {children}
    </Text>
  );
}