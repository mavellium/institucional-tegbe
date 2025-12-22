"use client"

import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"
import Image from "next/image"
import { useState, useEffect } from "react"

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

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

  // Função para scroll suave
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 64 // Altura aproximada do header em pixels
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  // Handler para os links de navegação
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()

    // Se for a home, vai para o topo
    if (sectionId === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    } else {
      scrollToSection(sectionId)
    }

    // Fecha o menu mobile se estiver aberto
    setMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/20 border-border bg-[#FFE600]">
      <div className="w-full px-6">
        <div className="flex h-18 items-center justify-between mx-auto max-w-7xl">
          {/* Navegação Desktop */}
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center">
                <Image
                  src="/logo-tegbe-header.svg"
                  alt="Tegbe Logo"
                  width={50}
                  height={50}
                  className="object-contain sm:w-33 w-28 md:w-44"
                />
              </a>
            <nav className="hidden md:flex items-center gap-6">
              <a
                href="/"
                className="text-sm font-medium text-black hover:text-black transition"
                onClick={(e) => handleNavClick(e, "/")}
              >
                Home
              </a>
              <a
                href="#Solucoes"
                className="text-sm font-medium text-[#52525B] hover:text-black transition"
                onClick={(e) => handleNavClick(e, "Solucoes")}
              >
                Sobre
              </a>
              <a
                href="#Solucoes"
                className="text-sm font-medium text-[#52525B] hover:text-black transition"
                onClick={(e) => handleNavClick(e, "Solucoes")}
              >
                Soluções
              </a>
              <a
                href="#Solucoes"
                className="text-sm font-medium text-[#52525B] hover:text-black transition"
                onClick={(e) => handleNavClick(e, "Solucoes")}
              >
                Cases
              </a>
              <a
                href="#Solucoes"
                className="text-sm font-medium text-[#52525B] hover:text-black transition"
                onClick={(e) => handleNavClick(e, "Solucoes")}
              >
                Contato
              </a>
            </nav>
          </div>

          {/* Botão WhatsApp Desktop */}
          <div className="hidden md:flex">
            <a
              href="https://api.whatsapp.com/send?phone=5514991779502"
              target="_blank"
              className="flex gap-2 items-center"
            >
              <Button className="shadow-lg bg-white text-[#2B3374] hover:bg-[#2B3374] cursor-pointer hover:text-white transition h-10 rounded-full">
                <Icon icon="ic:baseline-whatsapp" width={28} height={28} className="items-center size-5" />
                Fale com a gente
              </Button>
            </a>
            <Image src="/logo-consultoria.svg" alt="WhatsApp Icon" width={50} height={50} className="ml-5 p-0.5" />
          </div>

          {/* Botão Mobile */}
          <Button
            size="icon"
            variant="ghost"
            className="md:hidden text-white"
            onClick={(e) => {
              e.stopPropagation()
              setMenuOpen(!menuOpen)
            }}
          >
            <Icon
              icon={menuOpen ? "solar:close-circle-linear" : "solar:hamburger-menu-outline"}
              className="size-6 text-black"
            />
          </Button>
        </div>
      </div>

      {/* Menu Mobile */}
      <div
        id="mobileMenu"
        className={`fixed top-16 left-0 w-full bg-white shadow-xl z-50 transform transition-all duration-300 md:hidden
    ${menuOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"}`}
      >
        <nav className="flex flex-col items-center py-6 space-y-5">
          <a
            href="/"
            className="text-lg font-medium text-black hover:text-[#008E52] transition"
            onClick={(e) => handleNavClick(e, "/")}
          >
            Home
          </a>
          <a
            href="#Solucoes"
            className="text-lg font-medium text-black hover:text-[#008E52] transition"
            onClick={(e) => handleNavClick(e, "Solucoes")}
          >
            Soluções
          </a>

          <a
            href="https://api.whatsapp.com/send?phone=5514991779502"
            target="_blank"
            className="flex gap-2 items-center"
            onClick={() => setMenuOpen(false)}
          >
            <Button className="shadow-lg  bg-[#2B3374] text-white hover:bg-white cursor-pointer hover:text-white transition h-10 rounded-full">
              <Icon icon="ic:baseline-whatsapp" width={28} height={28} className="items-center size-5" />
              Fale com a gente
            </Button>
          </a>
        </nav>
      </div>
    </header>
  )
}