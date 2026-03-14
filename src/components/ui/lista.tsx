"use client";

import { ReactNode } from "react";
import Text from "./texto";
import { cn } from "@/lib/utils";

interface ListaTextoProps {
  items: ReactNode[];
  ordered?: boolean;
  className?: string;
  itemClassName?: string;
}

export default function Lista({
  items,
  ordered = false,
  className,
  itemClassName,
}: ListaTextoProps) {

  const Tag = ordered ? "ol" : "ul";

  return (
    <Tag
      className={cn(
        "space-y-3 pl-5",
        ordered ? "list-decimal" : "list-disc",
        className
      )}
    >
      {items.map((item, i) => (
        <li key={i}>
          <Text className={cn("leading-[1.8]", itemClassName)}>
            {item}
          </Text>
        </li>
      ))}
    </Tag>
  );
}