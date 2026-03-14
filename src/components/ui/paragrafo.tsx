"use client";

import { ReactNode } from "react";
import Text from "./texto";
import { cn } from "@/lib/utils";

interface ParagrafoTextoProps {
  children: ReactNode;
  className?: string;
}

export default function Paragrafo({
  children,
  className,
}: ParagrafoTextoProps) {
  return (
    <Text className={cn("leading-[1.8]", className)}>
      {children}
    </Text>
  );
}