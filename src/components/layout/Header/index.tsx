"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button/button";
import { Icon } from "@iconify/react";
import phXLight from "@iconify/icons-ph/x-light";
import phListLight from "@iconify/icons-ph/list-light";
import AnnouncementBar from "../AnnouncementBar";

export interface HeaderData {
  general: {
    logo: string;
    logoAlt: string;
    consultantBadge: string;
    ctaLink: string;
    ctaText: string;
  };
  links: Array<{
    name: string;
    href: string;
  }>;
  announcementBar?: {
    enabled: boolean;
    styles: {
      variant: "default" | "warning";
      position: string;
      className: string;
      fullWidth: boolean;
      customTextColor: string | null;
      customBackgroundColor: string | null;
    };
    content: {
      icon: string;
      text: string;
      linkUrl: string;
      linkText: string;
      showIcon: boolean;
    };
    behavior?: {
      autoClose?: number;
      persistent?: boolean;
    };
  };
}

interface HeaderProps {
  variant?: "default" | "marketing";
}

export function Header({ variant = "default" }: HeaderProps) {
  const [data, setData] = useState<HeaderData | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // DETECTA SE ESTÁ NA PÁGINA DE BLOG
  const isBlogPage = pathname.startsWith("/blog");

  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://janus.mavellium.com.br/api/tegbe-institucional/header"
        );
        const result = await response.json();
        // Injeta o link do Blog caso o CMS ainda não o tenha
        if (result?.links && !result.links.some((l: { href: string }) => l.href === "/blog")) {
          result.links = [...result.links, { name: "Blog", href: "/blog" }];
        }
        setData(result);
      } catch (error) {
        console.error("Erro ao carregar dados do Header:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fundo branco = topo do blog sem menu aberto
  const isWhiteHeader = isBlogPage && !scrolled && !menuOpen;

  // LÓGICA DE TEMAS E CORES
  const theme = useMemo(() => {
    return {
      primary: variant === "marketing" ? "bg-[#E31B63]" : "bg-[#FFCC00]",
      hoverBg: variant === "marketing" ? "hover:bg-[#FF1758]" : "hover:bg-[#FFDB15]",
      textOnPrimary: variant === "marketing" ? "text-white" : "text-black",
      underline: variant === "marketing" ? "bg-[#E31B63]" : "bg-[#FFCC00]",

      // Cor do texto dos links: cinza escuro no header branco, cinza claro no dark
      textColor: isWhiteHeader ? "text-gray-500" : "text-white/70",
      textActive: isWhiteHeader ? "text-gray-900" : "text-white",
      textHover: isWhiteHeader ? "hover:text-gray-900" : "hover:text-white",

      // Hover do botão mobile: escuro no branco, claro no dark
      iconHoverBg: isWhiteHeader ? "hover:bg-black/5" : "hover:bg-white/5",

      // Logo: mantém original no dark; adiciona brightness(0) no branco para logo clara ficar visível
      logoFilter: isWhiteHeader ? "brightness-0" : "",
    };
  }, [variant, isWhiteHeader]);

  const headerStyles = useMemo(() => {
    if (menuOpen) return "bg-[#050505] py-5 border-b border-white/10";

    if (isBlogPage && !scrolled) {
      return "bg-white py-6 border-b border-white/80 shadow-sm";
    }

    return scrolled
      ? "bg-black/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-lg"
      : "bg-transparent py-6 border-b border-transparent";
  }, [scrolled, menuOpen, isBlogPage]);

  if (!data) return null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-500 ease-in-out ${headerStyles}`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* LOGO */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="flex items-center group transition-transform active:scale-95"
                onClick={() => setMenuOpen(false)}
              >
                <Image
                  src={data.general.logo}
                  alt={data.general.logoAlt}
                  width={160}
                  height={40}
                  priority
                  className={`w-28 sm:w-32 md:w-36 lg:w-40 h-auto object-contain transition-all duration-300 ${theme.logoFilter}`}
                />
              </Link>
            </div>

            {/* NAVEGAÇÃO DESKTOP */}
            <nav className="hidden xl:flex items-center gap-x-8">
              {data.links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium tracking-tight transition-all duration-300 relative group 
                      ${isActive ? theme.textActive : theme.textColor} ${theme.textHover}`}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-1 left-0 w-0 h-[1.5px] ${theme.underline} transition-all duration-300 group-hover:w-full ${isActive ? "w-full" : ""}`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* AÇÕES */}
            <div className="flex items-center gap-3 sm:gap-6">
              <Link
                href={data.general.ctaLink}
                target="_blank"
                className="hidden sm:block group relative"
              >
                <div
                  className={`absolute -inset-0.5 rounded-full opacity-30 blur-sm transition duration-500 group-hover:opacity-60 ${theme.underline}`}
                />
                <button
                  className={`relative inline-flex h-9 lg:h-11 items-center justify-center rounded-full px-5 lg:px-8 py-2 font-bold text-[10px] lg:text-xs tracking-[0.1em] transition-all duration-300 hover:scale-105 ${theme.primary} ${theme.textOnPrimary} ${theme.hoverBg}`}
                >
                  <span className="relative z-20 uppercase">{data.general.ctaText}</span>
                </button>
              </Link>

              {/* MENU MOBILE */}
              <Button
                ref={menuButtonRef}
                size="icon"
                variant="ghost"
                className={`xl:hidden rounded-full z-[110] transition-colors ${theme.iconHoverBg}`}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {/* Cor aplicada direto no Icon para não ser sobrescrita pelo variant ghost */}
                <Icon
                  icon={menuOpen ? phXLight : phListLight}
                  className={`size-8 transition-colors ${isWhiteHeader ? "text-gray-800" : "text-white"}`}
                />
              </Button>
            </div>
          </div>
        </div>

        {/* MENU MOBILE OVERLAY */}
        {menuOpen && (
          <div className="fixed inset-0 xl:hidden z-[99]">
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <div
              ref={menuRef}
              className="absolute top-0 left-0 right-0 w-full h-screen bg-[#050505] flex flex-col items-center pt-24 pb-12"
            >
              <nav className="flex flex-col items-center space-y-8 px-6 w-full">
                {data.links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-3xl font-light tracking-tighter text-white/70 hover:text-white transition-all"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-10 flex flex-col items-center gap-8 w-full max-w-xs">
                  <div className="h-[1px] w-12 bg-white/20" />
                  <Link
                    href={data.general.ctaLink}
                    className={`w-full text-center py-4 rounded-full font-bold uppercase tracking-widest text-sm ${theme.primary} ${theme.textOnPrimary} ${theme.hoverBg}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {data.general.ctaText}
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Announcement Bar */}
      {data.announcementBar?.enabled && (
        <AnnouncementBar
          text={data.announcementBar.content.text}
          linkText={data.announcementBar.content.linkText}
          linkUrl={data.announcementBar.content.linkUrl}
          variant={data.announcementBar.styles.variant}
          className={`${data.announcementBar.styles.className || "top-20"} ${data.announcementBar.styles.position === "fixed" ? "fixed" : "absolute"}`}
        />
      )}
    </>
  );
}
