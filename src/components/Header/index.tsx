"use client"

import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"
import Image from "next/image"
import { useState, useEffect } from "react"

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)

  // Detecta scroll para ajustar a transparência/borda
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Detecta tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    
    setWindowWidth(window.innerWidth)
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

  // Função para scroll suave
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = windowWidth < 768 ? 60 : 80 
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    if (sectionId === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      scrollToSection(sectionId)
    }
    setMenuOpen(false)
  }

  // Texto responsivo para o botão CTA
  const getButtonText = () => {
    if (windowWidth < 1024) {
      return "DIAGNÓSTICO"
    } else if (windowWidth < 1280) {
      return "AGENDAR"
    }
    return "AGENDAR DIAGNÓSTICO"
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-black/90 backdrop-blur-md border-b border-white/10 py-2 md:py-3" 
          : "bg-transparent border-b border-transparent py-3 md:py-4"
      }`}
    >
      <div className="w-full px-4 sm:px-6">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          
          {/* --- LOGO --- */}
          <div className="flex items-center gap-4 md:gap-6">
            <a href="/" className="flex items-center group">
              <Image
                src="/logo-tegbe-header.svg"
                alt="Tegbe Logo"
                width={120}
                height={40}
                className="object-contain w-28 sm:w-32 md:w-36 lg:w-40 transition-opacity group-hover:opacity-80"
              />
            </a>
            
            {/* --- NAVEGAÇÃO DESKTOP --- */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 ml-4 lg:ml-8">
              {[
                { name: "Home", id: "/" },
                { name: "Sobre", id: "sobre" },
                { name: "Soluções", id: "solucoes" },
                { name: "Cases", id: "cases" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.id === "/" ? "/" : `#${item.id}`}
                  className="text-xs lg:text-sm font-medium text-gray-400 hover:text-white transition-colors relative group whitespace-nowrap"
                  onClick={(e) => handleNavClick(e, item.id)}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFCC00] transition-all group-hover:w-full"></span>
                </a>
              ))}
            </nav>
          </div>

          {/* --- AÇÕES (DIREITA) --- */}
          <div className="hidden md:flex items-center gap-3 lg:gap-6">
            {/* Badge Consultor */}
            <Image 
              src="/logo-consultoria.svg" 
              alt="Consultor Oficial" 
              width={32}
              height={32}
              className="opacity-80 hover:opacity-100 transition-opacity w-8 h-8 lg:w-10 lg:h-10"
            />

            {/* Botão CTA Responsivo */}
            <a
              href="https://api.whatsapp.com/send?phone=5514991779502"
              target="_blank"
              className="group relative overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              {/* Borda Animada */}
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Botão Responsivo */}
              <button className="relative inline-flex h-9 md:h-10 lg:h-11 items-center justify-center overflow-hidden rounded-full bg-[#FFCC00] px-3 md:px-4 lg:px-6 xl:px-8 py-2 font-bold text-black transition-all duration-300 hover:bg-[#ffdb4d] hover:scale-105 group-hover:shadow-[0_0_20px_rgba(255,204,0,0.4)]">
                
                {/* Efeito de Luz Passante */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent z-10" />
                
                <span className="relative z-20 flex items-center gap-1 md:gap-2">
                  <Icon icon="ic:baseline-whatsapp" className="size-4 md:size-5" />
                  <span className="text-xs md:text-sm lg:text-base font-medium tracking-tight md:tracking-wide whitespace-nowrap">
                    {getButtonText()}
                  </span>
                </span>
              </button>
            </a>
          </div>

          {/* --- BOTÃO HAMBURGER MOBILE --- */}
          <Button
            size="icon"
            variant="ghost"
            className="md:hidden text-white hover:bg-white/10 p-2"
            onClick={(e) => {
              e.stopPropagation()
              setMenuOpen(!menuOpen)
            }}
          >
            <Icon
              icon={menuOpen ? "solar:close-circle-linear" : "solar:hamburger-menu-outline"}
              className="size-6 sm:size-7 text-[#FFCC00]"
            />
          </Button>
        </div>
      </div>

      {/* --- MENU MOBILE --- */}
      <div
        id="mobileMenu"
        className={`absolute top-full left-0 w-full bg-[#050505] border-b border-white/10 shadow-2xl overflow-hidden transition-all duration-500 ease-in-out md:hidden
        ${menuOpen ? "max-h-[400px] opacity-100 visible" : "max-h-0 opacity-0 invisible"}`}
      >
        <nav className="flex flex-col items-center py-6 sm:py-8 space-y-5 sm:space-y-6">
          {[
            { name: "Home", id: "/" },
            { name: "Sobre", id: "sobre" },
            { name: "Soluções", id: "solucoes" },
            { name: "Cases", id: "cases" },
          ].map((item) => (
             <a
              key={item.name}
              href={item.id === "/" ? "/" : `#${item.id}`}
              className="text-base sm:text-lg font-medium text-gray-300 hover:text-[#FFCC00] hover:tracking-wider transition-all duration-300"
              onClick={(e) => handleNavClick(e, item.id)}
            >
              {item.name}
            </a>
          ))}

          {/* Badge Consultor Mobile */}
          <div className="pt-2">
            <Image 
              src="/logo-consultoria.svg" 
              alt="Consultor Oficial" 
              width={48}
              height={48}
              className="opacity-80"
            />
          </div>

          {/* Botão WhatsApp Mobile */}
          <div className="pt-2 sm:pt-4 w-full px-6 sm:px-8">
            <a
              href="https://api.whatsapp.com/send?phone=5514991779502"
              target="_blank"
              className="w-full flex justify-center"
              onClick={() => setMenuOpen(false)}
            >
              <Button className="w-full shadow-lg bg-[#FFCC00] text-black font-bold hover:bg-[#E6B800] h-12 sm:h-14 rounded-full text-base sm:text-lg">
                <Icon icon="ic:baseline-whatsapp" className="size-5 sm:size-6 mr-2" />
                Fale com a gente
              </Button>
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}