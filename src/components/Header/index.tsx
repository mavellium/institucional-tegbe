"use client"

import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"
import Image from "next/image"
import { useState, useEffect } from "react"

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Detecta scroll para ajustar a transparência/borda
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Fecha o menu quando a tela aumenta para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Fecha ao clicar fora
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
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-2"
          : "bg-transparent border-b border-transparent py-4"
          }`}
      >
        <div className="w-full px-6">
          <div className="flex items-center justify-between mx-auto max-w-7xl">

            {/* --- LOGO --- */}
            <div className="flex items-center gap-6">
              <a aria-label="logo" href="/" className="flex items-center group">
                <Image
                  src="/logo-tegbe-header.svg"
                  alt="Tegbe Logo"
                  width={150}
                  height={50}
                  className="brightness-0 invert object-contain w-32 md:w-40 transition-opacity group-hover:opacity-80"
                />
              </a>

              {/* --- NAVEGAÇÃO DESKTOP --- */}
              <nav
                aria-label="Menu de navegação desktop"
                className="hidden md:flex items-center gap-8 ml-8">
                <a
                  aria-label="Home"
                  href="/"
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
                >
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFCC00] transition-all group-hover:w-full"></span>
                </a>
                <a
                  aria-label="E-commerce"
                  href="/ecommerce"
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
                >
                  E-commerce
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFCC00] transition-all group-hover:w-full"></span>
                </a>
                <a
                  aria-label="Marketing"
                  href="/marketing"
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
                >
                  Marketing
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFCC00] transition-all group-hover:w-full"></span>
                </a>
                <a
                  aria-label="Sobre"
                  href="/sobre"
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
                >
                  Sobre
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFCC00] transition-all group-hover:w-full"></span>
                </a>
              </nav>
            </div>

            {/* --- AÇÕES (DIREITA) --- */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              {/* Badge Consultor (Opcional - Mantive pois dá autoridade) */}
              <a href="consultor-oficial" className="hidden lg:block">
                <Image
                  src="/logo-consultoria.svg"
                  alt="Consultor Oficial"
                  width={40}
                  height={40}
                  className="opacity-80 hover:opacity-100 transition-opacity"
                />
              </a>

              <a
                aria-label="Agendar Diagnóstico"
                href="https://api.whatsapp.com/send?phone=5514991779502"
                target="_blank"
                className="group relative overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                {/* Borda Animada (Opcional - dá um ar muito tech) */}
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* O Botão em si - Responsivo */}
                <button aria-label="Agendar Diagnóstico" className="relative inline-flex h-9 md:h-10 items-center justify-center overflow-hidden rounded-full bg-[#FFCC00] px-4 md:px-6 lg:px-8 py-2 font-bold text-black transition-all duration-300 hover:bg-[#ffdb4d] hover:scale-105 group-hover:shadow-[0_0_20px_rgba(255,204,0,0.4)] text-xs md:text-sm lg:text-base">

                  {/* Efeito de Luz Passante (Shimmer) */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent z-10" />

                  <span className="relative z-20 flex items-center gap-2 whitespace-nowrap">
                    {/* Texto adaptado para diferentes telas */}
                    <span className="hidden lg:inline tracking-wide">AGENDAR DIAGNÓSTICO</span>
                    <span className="lg:hidden tracking-wide">DIAGNÓSTICO</span>
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
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              className="md:hidden text-white hover:bg-white/10"
              onClick={(e) => {
                e.stopPropagation()
                setMenuOpen(!menuOpen)
              }}
            >
              <Icon
                icon={menuOpen ? "solar:close-circle-linear" : "solar:hamburger-menu-outline"}
                className="size-7 text-[#FFCC00]"
              />
            </Button>
          </div>
        </div>

        {/* --- MENU MOBILE (Slide Down Dark) --- */}
        <div
          id="mobileMenu"
          className={`absolute top-full left-0 w-full bg-[#050505] border-b border-white/10 shadow-2xl overflow-hidden transition-all duration-500 ease-in-out md:hidden
        ${menuOpen ? "max-h-[400px] opacity-100 visible" : "max-h-0 opacity-0 invisible"}`}
        >
          <nav
            aria-label="Menu de navegação móvel"
            className="flex flex-col items-center py-8 space-y-6">
            <a
              aria-label="Home"
              href="/"
              className="text-lg font-medium text-gray-300 hover:text-[#FFCC00] hover:tracking-wider transition-all duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </a>
            <a
              aria-label="E-commerce"
              href="/ecommerce"
              className="text-lg font-medium text-gray-300 hover:text-[#FFCC00] hover:tracking-wider transition-all duration-300"
              onClick={() => setMenuOpen(false)}
            >
              E-commerce
            </a>
            <a
              aria-label="Marketing"
              href="/marketing"
              className="text-lg font-medium text-gray-300 hover:text-[#FFCC00] hover:tracking-wider transition-all duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Marketing
            </a>
            <a
              aria-label="Sobre"
              href="/sobre"
              className="text-lg font-medium text-gray-300 hover:text-[#FFCC00] hover:tracking-wider transition-all duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Sobre
            </a>

            <div className="pt-4 w-full px-8">
              <a
                aria-label="Agendar Diagnóstico"
                href="https://api.whatsapp.com/send?phone=5514991779502"
                target="_blank"
                className="w-full flex justify-center"
                onClick={() => setMenuOpen(false)}
              >
                <Button aria-label="Agendar Diagnóstico" className="w-full shadow-lg bg-[#FFCC00] text-black font-bold hover:bg-[#E6B800] h-12 rounded-full text-base">
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