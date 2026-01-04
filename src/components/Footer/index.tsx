"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

// --- TIPAGEM ---
// 1. Adicionado 'cursos' à tipagem
type FooterVariant = 'ecommerce' | 'marketing' | 'sobre' | 'cursos';

interface FooterProps {
  variant?: FooterVariant; // Default: 'ecommerce'
}

// --- CONFIGURAÇÃO DE ESTILOS (THEME) ---
const themeConfig = {
  ecommerce: {
    primary: "text-[#FFCC00]",
    hoverText: "hover:text-[#FFCC00]",
    decoration: "decoration-[#FFCC00]",
    bgHover: "hover:bg-[#FFCC00]",
    borderHover: "hover:border-[#FFCC00]/30",
    glowGradient: "from-[#FFCC00]/0 via-[#FFCC00]/5 to-[#FFCC00]/0",
    glowAmbient: "bg-[#FFCC00]/5",
    iconBg: "text-[#FFCC00]",
    iconHoverText: "group-hover:text-black", 
    iconHoverBg: "group-hover:bg-[#FFCC00]",
    topBorder: "border-white/10"
  },
  marketing: {
    primary: "text-[#E31B63]",
    hoverText: "hover:text-[#E31B63]",
    decoration: "decoration-[#E31B63]",
    bgHover: "hover:bg-[#E31B63]",
    borderHover: "hover:border-[#E31B63]/30",
    glowGradient: "from-[#E31B63]/0 via-[#E31B63]/10 to-[#E31B63]/0",
    glowAmbient: "bg-[#E31B63]/10",
    iconBg: "text-[#E31B63]",
    iconHoverText: "group-hover:text-white", 
    iconHoverBg: "group-hover:bg-[#E31B63]",
    topBorder: "border-rose-900/20"
  },
  sobre: {
    primary: "text-[#0071E3]",
    hoverText: "hover:text-[#0071E3]",
    decoration: "decoration-[#0071E3]",
    bgHover: "hover:bg-[#0071E3]",
    borderHover: "hover:border-[#0071E3]/30",
    glowGradient: "from-[#0071E3]/0 via-[#0071E3]/10 to-[#0071E3]/0",
    glowAmbient: "bg-[#0071E3]/10",
    iconBg: "text-[#0071E3]",
    iconHoverText: "group-hover:text-white",
    iconHoverBg: "group-hover:bg-[#0071E3]",
    topBorder: "border-blue-900/20"
  },
  // 2. Configuração do tema 'cursos' (Gold/Dark)
  cursos: {
    primary: "text-[#FFD700]", // Dourado Ouro
    hoverText: "hover:text-[#FFD700]",
    decoration: "decoration-[#FFD700]",
    bgHover: "hover:bg-[#FFD700]",
    borderHover: "hover:border-[#FFD700]/30",
    glowGradient: "from-[#FFD700]/0 via-[#FFD700]/10 to-[#FFD700]/0",
    glowAmbient: "bg-[#FFD700]/5",
    iconBg: "text-[#FFD700]",
    iconHoverText: "group-hover:text-black", // Texto preto no hover dourado para contraste
    iconHoverBg: "group-hover:bg-[#FFD700]",
    topBorder: "border-[#FFD700]/20"
  }
};

// --- CONFIGURAÇÃO DE CONTEÚDO ---
const contentConfig = {
  ecommerce: {
    badgeImage: "/logo-consultoria.svg",
    badgeTitle: "Consultoria Certificada",
    badgeDesc: "Selo oficial de qualidade e segurança Mercado Livre.",
    stats1: { val: "+100M", label: "Gerenciados" },
    stats2: { val: "Top 1%", label: "Performance" },
    columnTitle: "Expertise",
    links: ["Gestão Full Commerce", "Consultoria Oficial", "Ads & Performance", "Design & Branding"],
    email: "contato@tegbe.com.br",
    desc: "Aceleradora de E-commerce. Transformamos operação técnica em lucro real através de dados e estratégia."
  },
  marketing: {
    badgeImage: "/logo-kommo.svg", 
    badgeTitle: "Kommo Gold Partner",
    badgeDesc: "Especialistas certificados em CRM e Automação.",
    stats1: { val: "+40", label: "Implantações" },
    stats2: { val: "24/7", label: "Suporte IA" },
    columnTitle: "Soluções",
    links: ["Implementação CRM", "Tráfego de Elite", "Automação com IA", "Business Intelligence"],
    email: "comercial@tegbe.com.br",
    desc: "Engenharia de Vendas. Transformamos tráfego em receita previsível através de CRM, Dados e IA."
  },
  sobre: {
    badgeImage: "/logo-tegbe-simbolo.svg", 
    badgeTitle: "Cultura de Excelência",
    badgeDesc: "Growth Partners focados em Equity e Governança.",
    stats1: { val: "2020", label: "Fundação" },
    stats2: { val: "Senior", label: "Equipe" },
    columnTitle: "Institucional",
    links: ["Nossa História", "Manifesto", "Carreiras", "Imprensa"],
    email: "institucional@tegbe.com.br",
    desc: "Não somos uma agência. Somos o braço direito estratégico que constrói o futuro da sua operação."
  },
  // 3. Conteúdo para 'cursos' (TegPro)
  cursos: {
    badgeImage: "/logo-tegbe-simbolo.svg", // Reutilizando símbolo ou icone de 'academy' se tiver
    badgeTitle: "TegPro Academy",
    badgeDesc: "Onde a teoria morre e a prática escala.",
    stats1: { val: "+1.2k", label: "Alunos" },
    stats2: { val: "4.9", label: "Avaliação" },
    columnTitle: "Ensino",
    links: ["Todos os Cursos", "Mentoria Black", "Comunidade", "Login Aluno"],
    email: "suporte@tegbe.com.br",
    desc: "Não ensinamos o que lemos. Ensinamos o que vivemos. O campo de batalha transformado em método."
  }
};

function useSmoothScroll() {
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');
    const handleClick = (e: Event) => {
      e.preventDefault();
      const target = (e.currentTarget as HTMLAnchorElement).getAttribute("href");
      if (!target) return;
      const element = document.querySelector(target);
      if (!element) return;
      element.scrollIntoView({ behavior: "smooth" });
    };
    links.forEach((link) => link.addEventListener("click", handleClick));
    return () => {
      links.forEach((link) => link.removeEventListener("click", handleClick));
    };
  }, []);
}

export function Footer({ variant = 'ecommerce' }: FooterProps) {
  useSmoothScroll();
  
  const theme = themeConfig[variant];
  const content = contentConfig[variant];

  return (
    <footer className={`w-full flex flex-col justify-center items-center pt-20 pb-10 px-6 bg-[#020202] border-t ${theme.topBorder} relative overflow-hidden`}>
      
      {/* Background Decorativo Dinâmico */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none opacity-40 ${theme.glowAmbient}`} />

      <div className="w-full max-w-7xl relative z-10">
        
        {/* --- BARRA DE AUTORIDADE (BADGE) --- */}
        <a aria-label="verificação" href="#">
          <div className={`flex flex-col md:flex-row justify-between items-center bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 mb-16 gap-6 relative overflow-hidden group hover:border-opacity-50 transition-colors ${theme.borderHover}`}>
              
              {/* Glow Animado no Hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${theme.glowGradient} translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000`} />
              
              <div className="flex items-center gap-4 relative z-10">
                  <div className="bg-white p-2 rounded-lg h-14 w-20 flex items-center justify-center shadow-lg">
                      <Image 
                          src={content.badgeImage} 
                          alt={content.badgeTitle}
                          width={80}
                          height={50}
                          className="w-auto h-full object-contain"
                      />
                  </div>
                  <div>
                      <h1 className={`font-bold text-lg leading-none text-white transition-colors ${theme.hoverText}`}>
                        {content.badgeTitle}
                      </h1>
                      <p className="text-gray-400 text-sm mt-1">{content.badgeDesc}</p>
                  </div>
              </div>

              <div className="flex gap-4 relative z-10">
                   <div className="flex flex-col items-center">
                      <span className={`font-bold text-xl ${theme.primary}`}>{content.stats1.val}</span>
                      <span className="text-[10px] text-gray-500 uppercase">{content.stats1.label}</span>
                   </div>
                   <div className="w-px h-10 bg-white/10"></div>
                   <div className="flex flex-col items-center">
                      <span className={`font-bold text-xl ${theme.primary}`}>{content.stats2.val}</span>
                      <span className="text-[10px] text-gray-500 uppercase">{content.stats2.label}</span>
                   </div>
              </div>
          </div>
        </a>

        <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-center sm:text-start">
          
          {/* --- COLUNA 1: Marca --- */}
          <div className="flex flex-col items-center sm:items-start space-y-6">
            <Image 
              src="/tegbe-logo-footer.svg" 
              alt="Tegbe" 
              width={150} 
              height={50} 
              className="w-32 sm:w-40 brightness-0 invert" 
            />
            <p className="text-sm text-gray-400 leading-relaxed max-w-[260px]">
              {content.desc}
            </p>
            <div className="flex gap-3 pt-2">
              <SocialLink variant={variant} icon="mdi:instagram" href={`https://instagram.com/tegbecoomerce`} />
              <SocialLink variant={variant} icon="mdi:linkedin" href="#" />
              <SocialLink variant={variant} icon="mdi:youtube" href="#" />
            </div>
          </div>

          {/* --- COLUNA 2: Navegação --- */}
          <div className="flex flex-col items-center sm:items-start space-y-5">
            <h1 className="font-bold text-base text-white">Navegação</h1>
            <nav className="flex flex-col space-y-3">
              {['Home', 'E-commerce', 'Marketing', 'Cursos', 'Sobre'].map((item) => (
                <a 
                  key={item} 
                  href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/[^a-z0-9]/g, '')}`} 
                  className={`text-sm text-gray-500 hover:translate-x-1 transition-all duration-200 ${theme.hoverText}`}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* --- COLUNA 3: Expertise Dinâmica --- */}
          <div className="flex flex-col items-center sm:items-start space-y-5">
            <h1 className="font-bold text-base text-white">{content.columnTitle}</h1>
            <nav className="flex flex-col space-y-3">
              {content.links.map((text) => (
                <FooterLink key={text} text={text} variant={variant} />
              ))}
            </nav>
          </div>

          {/* --- COLUNA 4: Contato --- */}
          <div className="flex flex-col items-center sm:items-start space-y-5">
            <h1 className="font-bold text-base text-white">Fale Conosco</h1>
            <div className="flex flex-col items-center sm:items-start space-y-4">
              
              {/* E-mail */}
              <a href={`mailto:${content.email}`} className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group">
                <div className={`p-2 rounded-full bg-white/5 flex-shrink-0 transition-colors ${theme.iconBg} ${theme.iconHoverBg} ${theme.iconHoverText}`}>
                  <Icon icon="solar:letter-linear" />
                </div>
                <span className={`group-hover:underline underline-offset-4 ${theme.decoration}`}>{content.email}</span>
              </a>

              {/* WhatsApp */}
              <a
                href="https://api.whatsapp.com/send?phone=5514991779502" 
                target="_blank" 
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group">
                <div className={`p-2 rounded-full bg-white/5 flex-shrink-0 transition-colors ${theme.iconBg} ${theme.iconHoverBg} ${theme.iconHoverText}`}>
                  <Icon icon="solar:phone-calling-linear" />
                </div>
                <span className={`group-hover:underline underline-offset-4 ${theme.decoration}`}>(14) 99177-9502</span>
              </a>

              {/* Endereço */}
              <a
                href="#" 
                target="_blank" 
                className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors group text-center sm:text-left"
              >
                <div className={`p-2 rounded-full bg-white/5 flex-shrink-0 mt-0.5 transition-colors ${theme.iconBg} ${theme.iconHoverBg} ${theme.iconHoverText}`}>
                  <Icon icon="solar:map-point-linear" />
                </div>
                <span className={`group-hover:underline underline-offset-4 ${theme.decoration}`}>
                  R. Santos Dumont, 133<br/>
                  Garça - SP<br/>
                  <span className="text-xs opacity-70">Operação Global</span>
                </span>
              </a>

            </div>
          </div>
          
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-600">
          <div className="text-center md:text-left order-2 md:order-1 flex flex-col gap-1">
            <p>© {new Date().getFullYear()} Tegbe. Todos os direitos reservados.</p>
            <p>CNPJ: 48.802.866/0001-42</p>
          </div>

          <div className={`flex items-center gap-3 order-1 md:order-2 bg-[#0A0A0A] px-5 py-2.5 rounded-full border border-white/5 transition-all cursor-pointer group shadow-lg ${theme.borderHover}`}>
            <span className="text-gray-500 font-medium group-hover:text-gray-300 transition-colors text-[10px] uppercase tracking-wider">Powered by</span>
            <Image
              src="/mavellium-logo-footer.svg" 
              alt="Mavellium"
              width={80}
              height={25}
              className="opacity-60 group-hover:opacity-100 transition-opacity brightness-0 invert" 
            />
          </div>
      </div>
      </div>
    </footer>
  );
}

// --- SUBCOMPONENTES INTERNOS ---

function SocialLink({ icon, href, variant }: { icon: string, href: string, variant: FooterVariant }) {
    const theme = themeConfig[variant];
    return (
        <a
            aria-label={icon}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group p-2.5 rounded-full bg-white/5 hover:-translate-y-1 transition-all duration-300 border border-white/5 ${theme.bgHover} ${theme.iconHoverText}`}
        >
            <Icon icon={icon} className="size-5 text-gray-400 group-hover:text-inherit transition-colors" />
        </a>
    )
}

function FooterLink({ text, variant }: { text: string, variant: FooterVariant }) {
    const theme = themeConfig[variant];
    return (
        <a aria-label={text} href="#" className={`text-sm text-gray-500 transition-colors flex items-center gap-2 group ${theme.hoverText}`}>
            <span className={`w-1 h-1 rounded-full bg-gray-700 transition-colors ${theme.bgHover}`}></span>
            {text}
        </a>
    )
}