"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";
import SocialLink from "@/components/ui/socialLink";

export type FooterVariant = 'ecommerce' | 'marketing' | 'sobre' | 'cursos';

interface FooterProps {
  variant?: FooterVariant;
  initialData?: any;
}

// Tema local — design desacoplado do CMS
const neutralTheme = {
  topBorder:     "border-white/[0.06]",
  hoverText:     "hover:text-white",
  iconBg:        "bg-white/5",
  iconHoverBg:   "hover:bg-white/10",
  iconHoverText: "hover:text-white",
  borderHover:   "hover:border-white/20",
  bgHover:       "group-hover:bg-white",
  decoration:    "decoration-white/30",
};

const themeMap: Record<FooterVariant, typeof neutralTheme> = {
  ecommerce: neutralTheme,
  sobre:     neutralTheme,
  cursos:    neutralTheme,
  marketing: {
    topBorder:     "border-pink-500/20",
    hoverText:     "hover:text-pink-400",
    iconBg:        "bg-pink-500/10",
    iconHoverBg:   "hover:bg-pink-500/20",
    iconHoverText: "hover:text-pink-400",
    borderHover:   "hover:border-pink-500/30",
    bgHover:       "group-hover:bg-pink-500",
    decoration:    "decoration-pink-500/50",
  },
};

function FooterSkeleton() {
  return (
    <footer className="w-full bg-[#020202] border-t border-white/[0.06] pt-20 pb-10 px-6">
      <div className="w-full max-w-7xl mx-auto py-20 animate-pulse">
        <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="h-8 w-32 bg-white/5 rounded-md" />
              <div className="h-3 w-full bg-white/5 rounded-md" />
              <div className="h-3 w-3/4 bg-white/5 rounded-md" />
              <div className="h-3 w-5/6 bg-white/5 rounded-md" />
              <div className="h-3 w-2/3 bg-white/5 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export function Footer({ variant = 'ecommerce', initialData }: FooterProps) {
  const [footerConfig, setFooterConfig] = useState<any>(initialData);
  const [loading, setLoading] = useState(!initialData);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (!initialData) {
      fetch("https://januscms.com.br/api/v1/content/tegbe/footer")
        .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
        .then((json) => {
          const data = json?.schema?.content ?? json?.content ?? json;
          setFooterConfig(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [initialData]);

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

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const theme = themeMap[variant];

  const content = useMemo(() => {
    if (!footerConfig?.content) return null;
    return footerConfig.content[variant] || footerConfig.content.ecommerce;
  }, [footerConfig, variant]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (loading || !footerConfig || !content) {
    return <FooterSkeleton />;
  }

  return (
    <footer id="footer" className={`w-full flex flex-col justify-center items-center pt-20 pb-10 px-6 bg-[#020202] border-t ${theme.topBorder} relative overflow-hidden`}>

      {/* Glow ambiente apenas no marketing */}
      {variant === 'marketing' && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none opacity-[0.15] bg-pink-600" />
      )}

      <div className="w-full max-w-7xl py-20 relative z-10">
        <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1.5fr_1.5fr] text-center sm:text-start">

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
              <SocialLink icon="mdi:instagram" href={footerConfig.general.socials.instagram} />
              <SocialLink icon="mdi:linkedin" href={footerConfig.general.socials.linkedin} />
              <SocialLink icon="mdi:youtube" href={footerConfig.general.socials.youtube} />
            </div>
          </div>

          {/* COLUNA 2: Navegação */}
          <div className="flex flex-col items-center sm:items-start space-y-5">
            <h2 className="text-[11px] font-semibold uppercase tracking-widest text-white/40">Navegação</h2>
            <nav aria-label="Navegação principal" className="flex flex-col space-y-3">
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
            <h2 className="text-[11px] font-semibold uppercase tracking-widest text-white/40">{content.columnTitle}</h2>
            <nav aria-label={content.columnTitle} className="flex flex-col space-y-3">
              {content.links.map((text: string) => (
                <FooterLink key={text} text={text} theme={theme} />
              ))}
            </nav>
          </div>

          {/* COLUNA 4: Contato */}
          <div className="flex flex-col items-center sm:items-start space-y-5">
            <h2 className="text-[11px] font-semibold uppercase tracking-widest text-white/40">Fale Conosco</h2>
            <div className="flex flex-col items-center sm:items-start space-y-4">
              <ContactItem theme={theme} icon="solar:letter-linear" text={content.email} href={`mailto:${content.email}`} />
              <ContactItem theme={theme} icon="solar:phone-calling-linear" text={footerConfig.general.phone} href={footerConfig.general.whatsappLink} external />
              <ContactItem theme={theme} icon="solar:map-point-linear" text={footerConfig.general.address} href={footerConfig.general.mapsLink} isAddress />
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

      {/* Botão Voltar ao Topo */}
      <button
        onClick={scrollToTop}
        aria-label="Voltar ao topo"
        className={`fixed bottom-8 right-8 z-50 p-3.5 rounded-full text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ${
          variant === 'marketing'
            ? 'bg-gradient-to-r from-[#d9415f] to-[#9e2e44]'
            : 'bg-zinc-800 border border-white/10 hover:bg-zinc-700 hover:border-white/20'
        } ${
          showScrollTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <Icon icon="solar:arrow-up-linear" className="w-5 h-5" />
      </button>
    </footer>
  );
}

function ContactItem({ theme, icon, text, href, isAddress, external }: any) {
  if (isAddress) {
    return (
      <Link
        href={href ?? `https://maps.google.com/?q=${encodeURIComponent(text)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors group"
      >
        <div className={`p-2 rounded-full flex-shrink-0 transition-colors ${theme.iconBg} ${theme.iconHoverBg} ${theme.iconHoverText}`}>
          <Icon icon={icon} />
        </div>
        <span className={`whitespace-pre-line leading-relaxed group-hover:underline underline-offset-4 ${theme.decoration}`}>
          {text}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors group"
    >
      <div className={`p-2 rounded-full flex-shrink-0 transition-colors ${theme.iconBg} ${theme.iconHoverBg} ${theme.iconHoverText}`}>
        <Icon icon={icon} />
      </div>
      <span className={`group-hover:underline underline-offset-4 ${theme.decoration}`}>
        {text}
      </span>
    </Link>
  );
}

function FooterLink({ text, theme }: any) {
  return (
    <Link href="#" className={`text-sm text-gray-500 transition-all duration-200 flex items-center gap-2 group hover:translate-x-1 ${theme.hoverText}`}>
      <span className={`w-1.5 h-1.5 rounded-full bg-gray-700 flex-shrink-0 transition-colors ${theme.bgHover}`} />
      {text}
    </Link>
  );
}
