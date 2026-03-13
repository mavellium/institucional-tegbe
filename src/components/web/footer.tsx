"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";
import SocialLink from "../ui/socialLink";

export type FooterVariant = 'ecommerce' | 'marketing' | 'sobre' | 'cursos';

interface FooterProps {
  variant?: FooterVariant;
  // Opcional: permitir passar os dados via props para evitar loading states no client
  initialData?: any; 
}

// Mapa de gradientes para cada variante (botão voltar ao topo)
const buttonGradientMap: Record<FooterVariant, string> = {
  ecommerce: 'from-[#FFCC00] to-[#a18208]',
  marketing: 'from-[#d9415f] to-[#9e2e44]', // vermelho marketing
  sobre: 'from-[#FFCC00] to-[#a18208]',
  cursos: 'from-[#FFCC00] to-[#a18208]',
};

export function Footer({ variant = 'ecommerce', initialData }: FooterProps) {
  const [footerConfig, setFooterConfig] = useState<any>(initialData);
  const [loading, setLoading] = useState(!initialData);

  // 1. Otimização de Busca (Client-side fallback)
  useEffect(() => {
    if (!initialData) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/footer`)
        .then((res) => res.json())
        .then((data) => {
          setFooterConfig(data);
          setLoading(false);
        })
        .catch((err) => console.error("Erro ao carregar footer:", err));
    }
  }, [initialData]);

  // 2. Smooth Scroll Otimizado (Event delegation)
  useEffect(() => {
    const handleScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        e.preventDefault();
        const id = anchor.getAttribute("href");
        if (id && id !== "#") {
          document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    document.addEventListener("click", handleScroll);
    return () => document.removeEventListener("click", handleScroll);
  }, []);

  // 3. Memoização de Estilos e Conteúdo
  const theme = useMemo(() => {
    if (!footerConfig) return null;
    return footerConfig.variants[variant] || footerConfig.variants.ecommerce;
  }, [footerConfig, variant]);

  const content = useMemo(() => {
    if (!footerConfig) return null;
    return footerConfig.content[variant] || footerConfig.content.ecommerce;
  }, [footerConfig, variant]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading || !footerConfig || !theme || !content) {
    return <div className="w-full h-20 bg-[#020202]" />; // Placeholder simples
  }

  // Gradiente do botão baseado na variant
  const buttonGradient = buttonGradientMap[variant] || buttonGradientMap.ecommerce;

  return (
    <footer className={`w-full flex flex-col justify-center items-center pt-20 pb-10 px-6 bg-[#020202] border-t ${theme.topBorder} relative overflow-hidden`}>
      
      {/* Background Decorativo */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none opacity-40 ${theme.glowAmbient}`} />

      <div className="w-full max-w-7xl py-20 relative z-10">
        <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-center sm:text-start">

          {/* COLUNA 1: Marca */}
          <div className="flex flex-col items-center sm:items-start space-y-6">
            <Image
              src={footerConfig.general.logo}
              alt="Tegbe"
              width={150}
              height={50}
              className="w-32 sm:w-40 brightness-0 invert object-contain"
              priority={false}
            />
            <p className="text-sm text-gray-400 leading-relaxed max-w-[260px]">
              {content.desc}
            </p>
            <div className="flex gap-3 pt-2">
              <SocialLink key={1} icon="mdi:instagram" href={footerConfig.general.socials.instagram} />
              <SocialLink key={2} icon="mdi:linkedin" href={footerConfig.general.socials.linkedin} />
              <SocialLink key={3} icon="mdi:youtube" href={footerConfig.general.socials.youtube} />
            </div>
          </div>

          {/* COLUNA 2: Navegação */}
          <div className="flex flex-col items-center sm:items-start space-y-5">
            <h2 className="font-bold text-base text-white">Navegação</h2>
            <nav className="flex flex-col space-y-3">
              {footerConfig.navigation.map((item: any) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm text-gray-500 hover:translate-x-1 transition-all duration-200 ${theme.hoverText}`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* COLUNA 3: Expertise */}
          <div className="flex flex-col items-center sm:items-start space-y-5">
            <h2 className="font-bold text-base text-white">{content.columnTitle}</h2>
            <nav className="flex flex-col space-y-3">
              {content.links.map((text: string) => (
                <FooterLink key={text} text={text} theme={theme} />
              ))}
            </nav>
          </div>

          {/* COLUNA 4: Contato */}
          <div className="flex flex-col items-center sm:items-start space-y-5">
            <h2 className="font-bold text-base text-white">Fale Conosco</h2>
            <div className="flex flex-col sm:items-start text-start space-y-4">
              <ContactItem theme={theme} icon="solar:letter-linear" text={content.email} href={`mailto:${content.email}`} />
              <ContactItem theme={theme} icon="solar:phone-calling-linear" text={footerConfig.general.phone} href={footerConfig.general.whatsappLink} />
              <ContactItem theme={theme} icon="solar:map-point-linear" text={footerConfig.general.address} href="#" isAddress />
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

        {/* Rodapé Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-600">
          <div className="text-center md:text-left order-2 md:order-1 flex flex-col gap-1">
            <p>© {new Date().getFullYear()} Tegbe. Venda mais conosco.</p>
            <p>CNPJ: {footerConfig.general.cnpj}</p>
          </div>

          <Link
            href="https://mavellium.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 order-1 md:order-2 bg-[#0A0A0A] px-5 py-2.5 rounded-full border border-white/5 transition-all group shadow-lg ${theme.borderHover}`}
          >
            <span className="text-gray-500 font-medium group-hover:text-gray-300 transition-colors text-[10px] uppercase tracking-wider">
              Powered by
            </span>
            <Image
              src='/mavellium-logo-footer.svg'
              alt="Mavellium"
              width={80}
              height={25}
              className="opacity-60 group-hover:opacity-100 transition-opacity brightness-0 invert"
            />
          </Link>
        </div>
      </div>

      {/* Botão Voltar ao Topo com gradiente dinâmico */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gradient-to-r ${buttonGradient} text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group`}
        aria-label="Voltar ao topo"
      >
        <Icon icon="solar:arrow-up-linear" className="w-5 h-5" />
      </button>
    </footer>
  );
}

function ContactItem({ theme, icon, text, href, isAddress }: any) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors group">
      <div className={`p-2 rounded-full bg-white/5 flex-shrink-0 transition-colors ${theme.iconBg} ${theme.iconHoverBg} ${theme.iconHoverText}`}>
        <Icon icon={icon} />
      </div>
      <span className={`group-hover:underline underline-offset-4 ${theme.decoration} ${isAddress ? 'whitespace-pre-line' : ''}`}>
        {text}
      </span>
    </Link>
  );
}

function FooterLink({ text, theme }: any) {
  return (
    <Link href="#" className={`text-sm text-gray-500 transition-colors flex items-center gap-2 group ${theme.hoverText}`}>
      <span className={`w-1.5 h-1.5 rounded-full bg-gray-700 transition-colors ${theme.bgHover}`}></span>
      {text}
    </Link>
  );
}