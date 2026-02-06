"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"
import AnnouncementBar from "../AnnouncementBar"

// --- TIPAGEM ATUALIZADA ---
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
    enabled: boolean; // NOVO: Controla ativação/desativação
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
  variant?: 'default' | 'marketing';
}

export function Header({ variant = 'default' }: HeaderProps) {
  const [data, setData] = useState<HeaderData | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null)

  // 1. INTEGRAÇÃO COM O ENDPOINT
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://tegbe-dashboard.vercel.app/api/tegbe-institucional/header')
        const result = await response.json()
        
        // Validação para garantir estrutura correta
        if (result.announcementBar) {
          // Garante que 'enabled' existe (default para true se não definido)
          if (result.announcementBar.enabled === undefined) {
            result.announcementBar.enabled = true;
          }
          
          // Garante que 'behavior' existe
          if (!result.announcementBar.behavior) {
            result.announcementBar.behavior = {
              autoClose: 0,
              persistent: false
            };
          }
        }
        
        setData(result)
      } catch (error) {
        console.error("Erro ao carregar dados do Header:", error)
      }
    }
    fetchData()
  }, [])

  // 2. CONTROLE DE ESTADOS
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Fecha o menu ao pressionar ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [menuOpen])

  // Foco no primeiro item do menu quando aberto
  useEffect(() => {
    if (menuOpen && firstMenuItemRef.current) {
      // Pequeno delay para garantir a renderização
      setTimeout(() => {
        firstMenuItemRef.current?.focus()
      }, 100)
    }
  }, [menuOpen])

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node) && 
          menuButtonRef.current && !menuButtonRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen])

  // 3. CORES FIXAS (Bilateral Tegbe/Marketing - Padrão Mavellium)
  const theme = useMemo(() => {
    if (variant === 'marketing') {
      return {
        primary: "bg-[#E31B63]",
        hoverBg: "hover:bg-[#FF1758]",
        textOnPrimary: "text-white",
        underline: "bg-[#E31B63]",
        logoFilter: "brightness-0 invert"
      }
    }
    // Default / Ecommerce
    return {
      primary: "bg-[#FFCC00]",
      hoverBg: "hover:bg-[#FFDB15]",
      textOnPrimary: "text-black",
      underline: "bg-[#FFCC00]",
      logoFilter: ""
    }
  }, [variant]);

  const headerStyles = useMemo(() => {
    if (menuOpen) return "bg-[#050505] py-5 border-b border-white/10";
    return scrolled
      ? "bg-black/40 backdrop-blur-xl border-b border-white/5 py-3"
      : "bg-transparent border-b border-transparent py-6";
  }, [scrolled, menuOpen]);

  if (!data) return null;

  const handleMenuToggle = () => {
    const newState = !menuOpen
    setMenuOpen(newState)
    if (!newState) {
      menuButtonRef.current?.focus()
    }
  }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-500 ease-in-out ${headerStyles}`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between gap-4">

            {/* LOGO */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="flex items-center group transition-transform active:scale-95"
                onClick={() => setMenuOpen(false)}
                aria-label={`Ir para página inicial - ${data.general.logoAlt}`}
              >
                <Image
                  src={data.general.logo}
                  alt={data.general.logoAlt}
                  width={160}
                  height={40}
                  priority
                  className={`w-28 sm:w-32 md:w-36 lg:w-40 h-auto object-contain transition-all duration-300 group-hover:opacity-80 ${theme.logoFilter}`} />
              </Link>
            </div>

            {/* NAVEGAÇÃO DESKTOP */}
            <nav aria-label="Menu principal" className="hidden xl:flex items-center gap-x-8">
              {data.links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium tracking-tight transition-all duration-300 relative group ${pathname === link.href ? "text-white" : "text-gray-400 hover:text-white"}`}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-[1.5px] ${theme.underline} transition-all duration-300 group-hover:w-full`}></span>
                </Link>
              ))}
            </nav>

            {/* AÇÕES (CTA FIXO COM CORES DAS VARIANTES) */}
            <div className="flex items-center gap-3 sm:gap-6">
              

              <a
                href={data.general.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:block group relative"
                aria-label={data.general.ctaText}
              >
                <div className={`absolute -inset-0.5 rounded-full opacity-30 blur-sm transition duration-500 group-hover:opacity-60 ${theme.underline}`}></div>
                <button className={`relative inline-flex h-9 lg:h-11 items-center justify-center overflow-hidden rounded-full px-5 lg:px-8 py-2 font-bold text-[10px] lg:text-xs tracking-[0.1em] transition-all duration-300 hover:scale-105 active:scale-95 border border-white/10 ${theme.primary} ${theme.textOnPrimary} ${theme.hoverBg}`}>
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
                  <span className="relative z-20 uppercase">{data.general.ctaText}</span>
                </button>
              </a>

              {/* BOTÃO MENU MOBILE COM ARIA-LABEL CORRETO */}
              <Button
                ref={menuButtonRef}
                size="icon"
                variant="ghost"
                className="xl:hidden text-white hover:bg-white/5 rounded-full z-[110]"
                onClick={handleMenuToggle}
                aria-label={menuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                <Icon icon={menuOpen ? "ph:x-light" : "ph:list-light"} className="size-8 transition-all duration-300" />
              </Button>
            </div>
          </div>
        </div>

        {/* MENU MOBILE OVERLAY */}
        {menuOpen && (
          <div
            className="fixed inset-0 xl:hidden z-[99]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            {/* Backdrop escurecido */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true" />

            {/* Conteúdo do menu */}
            <div
              ref={menuRef}
              id="mobile-menu"
              className={`absolute top-0 left-0 right-0 w-full h-screen bg-[#050505] overflow-y-auto overscroll-contain flex flex-col items-center pt-24 pb-12 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
            >
              <h2 id="mobile-menu-title" className="sr-only">Menu de navegação</h2>

              <nav
                className="flex flex-col items-center space-y-8 px-6 w-full"
                aria-label="Navegação principal mobile"
              >
                {data.links.map((link, i) => (
                  <Link
                    key={link.name}
                    ref={i === 0 ? firstMenuItemRef : undefined}
                    href={link.href}
                    style={{ transitionDelay: menuOpen ? `${i * 70}ms` : "0ms" }}
                    className={`text-3xl font-light tracking-tighter text-white/70 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/30 focus:rounded-lg ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                    onClick={() => setMenuOpen(false)}
                    aria-current={pathname === link.href ? "page" : undefined}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className={`pt-10 flex flex-col items-center gap-8 w-full max-w-xs transition-all duration-700 delay-300 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                  <div className="h-[1px] w-12 bg-white/20" aria-hidden="true" />
                  <a
                    href={data.general.ctaLink}
                    className={`w-full text-center py-4 rounded-full font-bold uppercase tracking-widest text-sm border border-white/10 shadow-2xl shadow-white/5 focus:outline-none focus:ring-2 focus:ring-white/30 ${theme.primary} ${theme.textOnPrimary} ${theme.hoverBg}`}
                    onClick={() => setMenuOpen(false)}
                    aria-label={data.general.ctaText}
                  >
                    {data.general.ctaText}
                  </a>
                  <Link
                    href="/consultor-oficial"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Ver badge de consultor oficial"
                    className="focus:outline-none focus:ring-2 focus:ring-white/30 focus:rounded-lg"
                  >
                    <Image
                      src={data.general.consultantBadge}
                      alt="Badge de Consultor Oficial Tegbe"
                      width={40}
                      height={40}
                      className={`opacity-40 hover:opacity-100 transition-opacity`} />
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>
      
      {/* Espaço reservado para o Header fixo */}
      <div className="h-20 bg-black"></div>
      
      {/* Announcement Bar - APENAS SE ESTIVER HABILITADO */}
      {data.announcementBar?.enabled && (
        <AnnouncementBar 
          text={data.announcementBar.content.text}
          linkText={data.announcementBar.content.linkText}
          linkUrl={data.announcementBar.content.linkUrl}
          icon={data.announcementBar.content.icon}
          showIcon={data.announcementBar.content.showIcon}
          variant={data.announcementBar.styles.variant}
          fullWidth={data.announcementBar.styles.fullWidth}
          backgroundColor={data.announcementBar.styles.customBackgroundColor ?? undefined}
          textColor={data.announcementBar.styles.customTextColor ?? undefined}
          className={data.announcementBar.styles.className}
          autoClose={data.announcementBar.behavior?.autoClose ?? 0}
          persistent={data.announcementBar.behavior?.persistent ?? false}
        />
      )}
    </>
  )
}