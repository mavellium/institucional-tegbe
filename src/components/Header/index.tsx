"use client"

import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

// 1. Adicionei 'sobre' aqui
type HeaderVariant = 'ecommerce' | 'marketing' | 'sobre';

interface HeaderProps {
  variant?: HeaderVariant; 
}

// 2. Adicionei a configuração 'sobre' com o Azul Tegbe (#0071E3)
const variantConfig = {
  ecommerce: {
    primary: "bg-[#FFCC00]",
    hoverBg: "hover:bg-[#FFDB15]",
    textOnPrimary: "text-black", 
    accentText: "text-[#FFCC00]",
    hoverText: "group-hover:text-[#FFCC00]",
    border: "border-yellow-500/30",
    glow: "shadow-[0_0_20px_rgba(255,204,0,0.4)]",
    underline: "bg-[#FFCC00]"
  },
  marketing: {
    primary: "bg-[#E31B63]",
    hoverBg: "hover:bg-[#FF1758]",
    textOnPrimary: "text-white", 
    accentText: "text-[#E31B63]",
    hoverText: "group-hover:text-[#E31B63]",
    border: "border-rose-500/30",
    glow: "shadow-[0_0_20px_rgba(227,27,99,0.4)]",
    underline: "bg-[#E31B63]"
  },
  sobre: {
    primary: "bg-[#0071E3]", // Azul Institucional
    hoverBg: "hover:bg-[#2B8CFF]", // Azul mais claro no hover
    textOnPrimary: "text-white",
    accentText: "text-[#0071E3]",
    hoverText: "group-hover:text-[#0071E3]",
    border: "border-blue-500/30",
    glow: "shadow-[0_0_20px_rgba(0,113,227,0.4)]",
    underline: "bg-[#0071E3]"
  }
};

export function Header({ variant = 'ecommerce' }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname() 

  const theme = variantConfig[variant];

  // Detecta scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Responsividade
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Click Outside
  useEffect(() => {
    const handleClick = (e: any) => {
      if (!menuOpen) return
      if (!document.getElementById("mobileMenu")?.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  }, [menuOpen])

  return (
    <>
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
              <a aria-label="Tegbe Home" href="/" className="flex items-center group">
                <Image
                  src="/logo-tegbe-header.svg"
                  alt="Tegbe Logo"
                  width={150}
                  height={50}
                  className="brightness-0 invert object-contain w-32 md:w-36 lg:w-40 transition-opacity group-hover:opacity-80"
                />
              </a>

              {/* --- NAVEGAÇÃO DESKTOP --- */}
              <nav aria-label="Menu principal" className="hidden md:flex items-center gap-8 ml-8">
                {[
                  { name: "Home", href: "/" },
                  { name: "E-commerce", href: "/ecommerce" },
                  { name: "Marketing", href: "/marketing" },
                  { name: "Sobre", href: "/sobre" },
                ].map((link) => (
                  <a
                    key={link.name}
                    aria-label={link.name}
                    href={link.href}
                    className={`text-sm font-medium transition-all duration-300 relative group
                      ${pathname === link.href ? "text-white" : "text-gray-400 hover:text-white"}
                    `}
                  >
                    {link.name}
                    {/* Underline Animado com a Cor do Tema */}
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${theme.underline} transition-all duration-300 group-hover:w-full`}></span>
                  </a>
                ))}
              </nav>
            </div>

            {/* --- AÇÕES (DIREITA) --- */}
            <div className="hidden md:flex items-center gap-6">
              
              {/* Badge Consultor (Apenas Desktop Grande) */}
              <a href="consultor-oficial" className="hidden lg:block opacity-70 hover:opacity-100 transition-opacity">
                <Image
                  src="/logo-consultoria.svg"
                  alt="Consultor Oficial"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
              </a>

              {/* Botão CTA Principal */}
              <a
                aria-label="Agendar Diagnóstico"
                href="https://api.whatsapp.com/send?phone=5514991779502"
                target="_blank"
                className="group relative"
              >
                {/* Glow Effect atrás do botão (Cor do Tema) */}
                <div className={`absolute -inset-1 rounded-full opacity-40 blur-md transition duration-500 group-hover:opacity-70 ${theme.underline}`}></div>

                <button 
                  className={`
                    relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full px-8 py-2 
                    font-bold text-sm transition-all duration-300 hover:scale-105 
                    ${theme.primary} ${theme.hoverBg} ${theme.textOnPrimary} ${theme.glow}
                  `}
                >
                  {/* Shimmer Effect (Brilho passando) */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />

                  <span className="relative z-20 tracking-wide uppercase">
                    Agendar Diagnóstico
                  </span>
                </button>
              </a>
            </div>

            {/* --- BOTÃO HAMBURGER MOBILE --- */}
            <Button
              size="icon"
              variant="ghost"
              aria-controls="mobileMenu"
              aria-expanded={menuOpen}
              aria-label="Menu"
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
          className={`absolute top-full left-0 w-full bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl overflow-hidden transition-all duration-500 ease-in-out md:hidden
          ${menuOpen ? "max-h-[500px] opacity-100 visible" : "max-h-0 opacity-0 invisible"}`}
        >
          <nav className="flex flex-col items-center py-10 space-y-6">
             {[
                  { name: "Home", href: "/" },
                  { name: "E-commerce", href: "/ecommerce" },
                  { name: "Marketing", href: "/marketing" },
                  { name: "Sobre", href: "/sobre" },
             ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-xl font-medium text-gray-300 transition-all duration-300 hover:tracking-wider ${theme.hoverText}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </a>
             ))}

            <div className="pt-6 w-full px-8 flex flex-col items-center gap-4">
               {/* Logo Consultoria Mobile */}
               <Image src="/logo-consultoria.svg" alt="Consultor" width={40} height={40} className="opacity-60" />

               {/* CTA Mobile */}
              <a
                href="https://api.whatsapp.com/send?phone=5514991779502"
                target="_blank"
                className="w-full flex justify-center"
                onClick={() => setMenuOpen(false)}
              >
                <Button 
                    className={`w-full h-12 rounded-full font-bold text-base shadow-lg ${theme.primary} ${theme.hoverBg} ${theme.textOnPrimary}`}
                >
                  AGENDAR DIAGNÓSTICO
                </Button>
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}