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

export type HeaderVariant = 'ecommerce' | 'marketing' | 'sobre' | 'cursos';

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

export function Header({ variant = 'ecommerce', data }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // LÓGICA PRINCIPAL:
  // Se vier dados da API (data), usa eles.
  // Se não, usa o JSON importado (headerConfig).
  const config = (data || headerConfig) as HeaderData;

  // Garante que links seja sempre um array seguro
  const navLinks = config.links || [];

  const theme = useMemo(() => {
    // Tenta pegar a variante do config. Se não existir, pega 'ecommerce'
    return config.variants[variant] || config.variants['ecommerce'];
  }, [variant, config]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      if (isScrolled !== scrolled) setScrolled(isScrolled)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  useEffect(() => {
    const handleResize = () => window.innerWidth >= 768 && setMenuOpen(false)
    const handleClickOutside = (e: MouseEvent) => {
      if (menuOpen && !document.getElementById("mobileMenu")?.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("click", handleClickOutside)
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("click", handleClickOutside)
    }
  }, [menuOpen])

  // Se por algum motivo o config estiver vazio (arquivo json corrompido), não renderiza
  if (!config) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out ${
        scrolled
          ? "bg-[#020202]/80 backdrop-blur-md border-b border-white/5 py-3"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="w-full px-6">
        <div className="flex items-center justify-between mx-auto max-w-7xl">

          {/* --- LOGO --- */}
          <div className="flex items-center gap-6">
            <Link href="/" aria-label="Home" className="flex items-center group">
              <Image
                src={config.general.logo}
                alt={config.general.logoAlt}
                width={150}
                height={50}
                priority 
                className="text-yellow-400 object-contain w-32 md:w-36 lg:w-40 transition-opacity group-hover:opacity-80"
                style={{ width: 'auto', height: 'auto' }}
              />
            </Link>

            {/* --- NAVEGAÇÃO DESKTOP --- */}
            <nav aria-label="Menu principal" className="hidden md:flex items-center gap-8 ml-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-all duration-300 relative group ${
                    pathname === link.href ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${theme.underline} transition-all duration-300 group-hover:w-full`}></span>
                </Link>
              ))}
            </nav>
          </div>

          {/* --- AÇÕES (DIREITA) --- */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/consultor-oficial" className="hidden lg:block opacity-70 hover:opacity-100 transition-opacity">
              <Image
                src={config.general.consultantBadge}
                alt="Consultor Oficial"
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </Link>

            <a
              href={config.general.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              aria-label={config.general.ctaText}
            >
              <div className={`absolute -inset-1 rounded-full opacity-40 blur-md transition duration-500 group-hover:opacity-70 ${theme.underline}`}></div>
              <button
                className={`relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full px-8 py-2 font-bold text-sm transition-all duration-300 hover:scale-105 ${theme.primary} ${theme.hoverBg} ${theme.textOnPrimary} ${theme.glow}`}
              >
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
                <span className="relative z-20 tracking-wide uppercase">{config.general.ctaText}</span>
              </button>
            </a>
          </div>

          {/* --- MENU HAMBURGER --- */}
          <Button
            size="icon"
            variant="ghost"
            aria-controls="mobileMenu"
            aria-expanded={menuOpen}
            aria-label="Abrir Menu"
            className="md:hidden text-white hover:bg-white/10"
            onClick={(e) => {
              e.stopPropagation()
              setMenuOpen(!menuOpen)
            }}
          >
            <Icon
              icon={menuOpen ? "solar:close-circle-linear" : "solar:hamburger-menu-outline"}
              className={`size-8 transition-colors ${menuOpen ? theme.accentText : "text-white"}`}
            />
          </Button>
        </div>
      </div>

      {/* --- MENU MOBILE --- */}
      <div
        id="mobileMenu"
        className={`absolute top-full left-0 w-full bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl overflow-hidden transition-all duration-500 ease-in-out md:hidden ${
          menuOpen ? "max-h-[500px] opacity-100 visible" : "max-h-0 opacity-0 invisible"
        }`}
      >
        <nav className="flex flex-col items-center py-10 space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-xl font-medium text-gray-300 transition-all duration-300 hover:tracking-wider ${theme.hoverText}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-6 w-full px-8 flex flex-col items-center gap-4">
            <Image src={config.general.consultantBadge} alt="Consultor" width={40} height={40} className="opacity-60" />
            <a
              href={config.general.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex justify-center"
              onClick={() => setMenuOpen(false)}
            >
              <Button className={`w-full h-12 rounded-full font-bold text-base shadow-lg ${theme.primary} ${theme.hoverBg} ${theme.textOnPrimary}`}>
                {config.general.ctaText.toUpperCase()}
              </Button>
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}