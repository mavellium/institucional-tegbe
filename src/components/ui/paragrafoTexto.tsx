"use client";

import Text from "./texto";
import { cn } from "@/lib/utils";

interface ParagrafoTextoProps {
  content: string;
  className?: string;
  paragraphClassName?: string;
}

export default function ParagrafoTexto({
  content,
  className,
  paragraphClassName,
}: ParagrafoTextoProps) {
  const paragraphs = content.split(".  ");

  return (
    <div className={cn("space-y-7", className)}>
      {paragraphs.map((para, i) => {
        const text = para.trim();
        if (!text) return null;

        return (
          <Text key={i} className={paragraphClassName}>
            {text}
            {text.endsWith(".") ? "" : "."}
          </Text>
        );
      })}
    </div>
  );
}