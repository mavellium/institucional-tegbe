"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"

// IMPORTAÇÃO DIRETA DO JSON (Sua fonte de verdade)
import headerConfig from "@/json/Header/config.json"

// --- TIPAGEM ---

export type HeaderVariant = 'default' | 'marketing';

interface ThemeConfig {
  primary: string;
  hoverBg: string;
  textOnPrimary: string;
  accentText: string;
  hoverText: string;
  border: string;
  glow: string;
  underline: string;
}

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
  variants: Record<string, ThemeConfig>; // Alterado para string para aceitar o JSON flexível
}

interface HeaderProps {
  variant?: HeaderVariant;
  data?: HeaderData | null; // Dados opcionais vindos da API
}

export function Header({ variant = 'default', data }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const config = (data || headerConfig) as HeaderData;
  const navLinks = config.links || [];

  const theme = useMemo(() => {
    return config.variants[variant] || config.variants['ecommerce'];
  }, [variant, config]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock scroll quando menu mobile estiver aberto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [menuOpen])

  const logoStyle = useMemo(() => {
    return variant === 'marketing' ? "brightness-0 invert" : "";
  }, [variant]);

  if (!config) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-500 ease-in-out ${
        scrolled
          ? "bg-black/40 backdrop-blur-xl border-b border-white/5 py-3"
          : "bg-transparent border-b border-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between gap-4">

          {/* --- LOGO --- */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group transition-transform active:scale-95">
              <Image
                src={config.general.logo}
                alt={config.general.logoAlt}
                width={160}
                height={40}
                priority 
                // A mágica acontece aqui: logoStyle injeta a classe de branco se for marketing
                className={`w-28 sm:w-32 md:w-36 lg:w-40 h-auto object-contain transition-all duration-300 group-hover:opacity-80 ${logoStyle}`}
              />
            </Link>
          </div>

          {/* --- RESTANTE DO CÓDIGO (Navegação, CTA, Mobile Menu...) --- */}
          {/* Mantenha exatamente como a versão anterior que ajustamos para o iPad */}
          
          <nav aria-label="Menu principal" className="hidden xl:flex items-center gap-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium tracking-tight transition-all duration-300 relative group ${
                  pathname === link.href ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-[1.5px] ${theme.underline} transition-all duration-300 group-hover:w-full`}></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-6">
            <Link href="/consultor-oficial" className="hidden md:block opacity-60 hover:opacity-100 transition-all hover:scale-110">
              <Image
                src={config.general.consultantBadge}
                alt="Consultor Oficial"
                width={36}
                height={36}
                className={`w-8 h-8 lg:w-9 lg:h-9`}
              />
            </Link>

            <a
              href={config.general.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block group relative"
            >
              <div className={`absolute -inset-0.5 rounded-full opacity-30 blur-sm transition duration-500 group-hover:opacity-60 ${theme.underline}`}></div>
              <button
                className={`relative inline-flex h-9 lg:h-11 items-center justify-center overflow-hidden rounded-full px-5 lg:px-8 py-2 font-bold text-[10px] lg:text-xs tracking-[0.1em] transition-all duration-300 hover:scale-105 active:scale-95 ${theme.primary} ${theme.hoverBg} ${theme.textOnPrimary} border border-white/10`}
              >
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
                <span className="relative z-20 uppercase">{config.general.ctaText}</span>
              </button>
            </a>

            <Button
              size="icon"
              variant="ghost"
              className="xl:hidden text-white hover:bg-white/5 rounded-full"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon
                icon={menuOpen ? "ph:x-light" : "ph:list-light"}
                className={`size-7 transition-all duration-300 ${menuOpen ? 'rotate-90' : 'rotate-0'}`}
              />
            </Button>
          </div>
        </div>
      </div>

      {/* --- MENU MOBILE / TABLET OVERLAY --- */}
      <div
        className={`fixed inset-0 top-[60px] w-full bg-black/95 backdrop-blur-2xl z-[-1] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] xl:hidden ${
          menuOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-full opacity-0 invisible"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full space-y-8 pb-20">
          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              href={link.href}
              style={{ transitionDelay: `${i * 50}ms` }}
              className={`text-3xl font-light tracking-tighter text-white/70 transition-all hover:text-white hover:tracking-normal ${
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <div className={`pt-10 flex flex-col items-center gap-6 transition-all duration-700 delay-300 ${menuOpen ? "opacity-100" : "opacity-0"}`}>
             <div className="h-[1px] w-12 bg-white/20" />
             <a
              href={config.general.ctaLink}
              className="text-sm uppercase tracking-[0.2em] font-bold text-white py-4 px-10 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all"
              onClick={() => setMenuOpen(false)}
            >
              {config.general.ctaText}
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}