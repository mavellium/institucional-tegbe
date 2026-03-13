"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type SocialVariant =
  | "default"
  | "ecommerce"
  | "marketing"
  | "ghost"
    "dark";

type SocialSize = "sm" | "md" | "lg";

interface SocialLinkProps {
  icon: string;
  href: string;
  variant?: SocialVariant;
  size?: SocialSize;
  className?: string;
}

const variants = {
    default:
        "bg-white/5 border border-white/5 hover:bg-white/10 text-gray-400 hover:text-white",

    ecommerce:
        "bg-yellow-500/10 border border-yellow-500/20 hover:bg-yellow-500 text-yellow-400 hover:text-black",

    marketing:
        "bg-red-500/10 border border-red-500/20 hover:bg-red-500 text-red-400 hover:text-white",

    ghost:
        "bg-transparent border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white",
    
    dark:
        "bg-gray-400 border border-black/10 hover:bg-gray-500 text-white hover:text-white"   
};

const sizes = {
  sm: "p-2 [&>svg]:size-4",
  md: "p-2.5 [&>svg]:size-5",
  lg: "p-3 [&>svg]:size-6",
};

export default function SocialLink({
  icon,
  href,
  variant = "default",
  size = "md",
  className,
}: SocialLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group rounded-full transition-all duration-300 hover:-translate-y-1 flex items-center justify-center",
        variants[variant],
        sizes[size],
        className
      )}
    >
      <Icon icon={icon} className="transition-colors" />
    </Link>
  );
}