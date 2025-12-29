"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

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

export function Footer() {
  useSmoothScroll();

  return (
    <footer className="w-full flex flex-col justify-center items-center pt-20 pb-10 px-6 bg-[#020202] border-t border-white/10 relative overflow-hidden">
      
      {/* Background Decorativo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none opacity-40" />

      <div className="w-full max-w-7xl relative z-10">
        
        {/* --- NOVO LOCAL: BARRA DE CREDIBILIDADE (Topo do Footer) --- */}
        <a href="consultor-certificado">
        <div className="flex flex-col md:flex-row justify-between items-center bg-white/5 border border-white/5 rounded-2xl p-6 mb-16 gap-6 relative overflow-hidden group">
            {/* Efeito Glow no Hover da Barra */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFCC00]/0 via-[#FFCC00]/5 to-[#FFCC00]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            
            <div className="flex items-center gap-4 relative z-10">
                <div className="bg-white p-2 rounded-lg h-14 w-20 flex items-center justify-center shadow-lg">
                    <Image 
                        src="/logo-consultoria.svg" 
                        alt="Selo Oficial"
                        width={80}
                        height={50}
                        className="w-auto h-full object-contain"
                    />
                </div>
                <div>
                    <h1 className="text-white font-bold text-lg leading-none">Consultoria Certificada</h1>
                    <p className="text-gray-400 text-sm mt-1">Selo oficial de qualidade e segurança Mercado Livre.</p>
                </div>
            </div>

            <div className="flex gap-4 relative z-10">
                 {/* Mini Badges extras (Opcional - dá volume) */}
                 <div className="flex flex-col items-center">
                    <span className="text-[#FFCC00] font-bold text-xl">+100M</span>
                    <span className="text-[10px] text-gray-500 uppercase">Gerenciados</span>
                 </div>
                 <div className="w-px h-10 bg-white/10"></div>
                 <div className="flex flex-col items-center">
                    <span className="text-[#FFCC00] font-bold text-xl">Top 1%</span>
                    <span className="text-[10px] text-gray-500 uppercase">Performance</span>
                 </div>
            </div>
        </div>
        </a>


        <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-center sm:text-start">
          
          {/* --- COLUNA 1: Identidade (Agora mais limpa) --- */}
          <div className="flex flex-col items-center sm:items-start space-y-6">
            <Image 
              src="/tegbe-logo-footer.svg" 
              alt="Tegbe Consultoria" 
              width={150} 
              height={50} 
              className="w-32 sm:w-40 brightness-0 invert" 
            />
            <p className="text-sm text-gray-400 leading-relaxed max-w-[260px]">
              Aceleradora de E-commerce. Transformamos operação técnica em lucro real através de dados e estratégia.
            </p>
            <div className="flex gap-3 pt-2">
              <SocialLink icon="mdi:instagram" href="https://www.instagram.com/tegbecoomerce" />
              <SocialLink icon="ic:baseline-facebook" href="#" />
              <SocialLink icon="mdi:linkedin" href="#" />
            </div>
          </div>

          {/* --- COLUNA 2: Navegação --- */}
          <div className="flex flex-col items-center sm:items-start space-y-5">
            <h1 className="font-bold text-base text-white">Navegação</h1>
            <nav className="flex flex-col space-y-3">
              {['Home', 'E-commerce', 'Marketing', 'Sobre'].map((item) => (
                <a 
                  key={item} 
                  href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/[^a-z0-9]/g, '')}`} 
                  className="text-sm text-gray-500 hover:text-[#FFCC00] hover:translate-x-1 transition-all duration-200"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* --- COLUNA 3: Expertise --- */}
          <div className="flex flex-col items-center sm:items-start space-y-5">
            <h1 className="font-bold text-base text-white">Expertise</h1>
            <nav className="flex flex-col space-y-3">
              <FooterLink text="Gestão Full Commerce" />
              <FooterLink text="Consultoria Oficial" />
              <FooterLink text="Ads & Performance" />
              <FooterLink text="Design & Branding" />
            </nav>
          </div>

          {/* --- COLUNA 4: Contato --- */}
<div className="flex flex-col items-center sm:items-start space-y-5">
  <h1 className="font-bold text-base text-white">Fale Conosco</h1>
  <div className="flex flex-col items-center sm:items-start space-y-4">
    
    {/* E-mail */}
    <a href="mailto:contato@tegbe.com.br" className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group">
      <div className="p-2 rounded-full bg-white/5 text-[#FFCC00] flex-shrink-0">
        <Icon icon="solar:letter-linear" />
      </div>
      <span className="group-hover:underline decoration-[#FFCC00] underline-offset-4">contato@tegbe.com.br</span>
    </a>

    {/* WhatsApp */}
    <a 
      href="https://api.whatsapp.com/send?phone=5514988281001" 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group"
    >
      <div className="p-2 rounded-full bg-white/5 text-[#FFCC00] flex-shrink-0">
        <Icon icon="solar:phone-calling-linear" />
      </div>
      <span className="group-hover:underline decoration-[#FFCC00] underline-offset-4">(14) 98828-1001</span>
    </a>

    {/* Endereço / Google Maps */}
    <a 
      href="https://maps.app.goo.gl/kSVQ6X936GNNu8WZ8" 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors group text-center sm:text-left"
    >
      <div className="p-2 rounded-full bg-white/5 text-[#FFCC00] flex-shrink-0 mt-0.5">
        <Icon icon="solar:map-point-linear" />
      </div>
      <span className="group-hover:underline decoration-[#FFCC00] underline-offset-4">
        R. Santos Dumont, 133 - Ferraropolis<br/>
        Garça - SP, 17400-074<br/>
        <span className="text-xs opacity-70">Atendimento Nacional</span>
      </span>
    </a>

  </div>
</div>

          
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent my-12" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-600">
          <div className="text-center md:text-left order-2 md:order-1 flex flex-col gap-1">
            <p>© {new Date().getFullYear()} Tegbe. Todos os direitos reservados.</p>
            <p>CNPJ: 48.802.866/0001-42</p>
          </div>

          <div className="flex items-center gap-3 order-1 md:order-2 bg-[#0A0A0A] px-5 py-2.5 rounded-full border border-white/5 hover:border-[#FFCC00]/30 transition-all cursor-pointer group shadow-lg">
            <span className="text-gray-500 font-medium group-hover:text-gray-300 transition-colors text-[10px] uppercase tracking-wider">Desenvolvido por</span>
            <Image
              src="/mavellium-logo-footer.svg" 
              alt="Mavellium"
              width={80}
              height={25}
              className="opacity-60 group-hover:opacity-100 transition-opacity brightness-0 invert" 
            />
          </div>
      </div>
    </footer>
  );
}

function SocialLink({ icon, href }: { icon: string, href: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-2.5 rounded-full bg-white/5 hover:bg-[#FFCC00] hover:text-black hover:-translate-y-1 transition-all duration-300 border border-white/5"
        >
            <Icon icon={icon} className="size-5 text-gray-400 group-hover:text-black transition-colors" />
        </a>
    )
}

function FooterLink({ text }: { text: string }) {
    return (
        <a href="#" className="text-sm text-gray-500 hover:text-[#FFCC00] transition-colors flex items-center gap-2 group">
            <span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-[#FFCC00] transition-colors"></span>
            {text}
        </a>
    )
}