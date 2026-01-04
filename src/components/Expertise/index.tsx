'use client'
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Button } from "../ui/button";

export default function MarketingExpertise() {
  return (
    // MUDANÇA 1: Fundo Dark (#020202) com textura
    <section className="relative py-24 px-4 sm:px-8 lg:px-10 bg-[#020202] flex justify-center items-center border-t border-white/5 overflow-hidden">

      {/* Texture Noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      {/* MUDANÇA 2: Luz Ambiental VERMELHA (Marketing/Sangue) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#E31B63]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto relative max-w-[1400px] z-10 flex flex-col items-center">

        {/* BADGE: Autoridade Técnica */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-500/30 bg-rose-900/10 backdrop-blur-md shadow-[0_0_15px_rgba(227,27,99,0.1)]">
          <Icon icon="mdi:code-json" className="text-[#E31B63] w-5 h-5" />
          <span className="text-[11px] md:text-xs font-bold tracking-[0.2em] text-rose-100 uppercase">
            DNA Tegbe
          </span>
        </div>

        {/* TÍTULO */}
        <h1 className="mb-12 text-center font-bold text-white text-[28px] sm:text-[36px] md:text-[50px] leading-[1.1] max-w-4xl tracking-tight">
          Não somos uma agência criativa. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0F43] to-[#E31B63] drop-shadow-[0_0_25px_rgba(227,27,99,0.4)]">
            Somos Engenheiros de Receita.
          </span>
        </h1>

        {/* IMAGEM - Moldura Vermelha Sutil */}
        <div className="relative rounded-3xl overflow-hidden flex justify-center w-full max-w-[1200px] group border border-white/10 bg-[#0A0A0A]">

          {/* Brilho Vermelho na borda ao passar o mouse */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#E31B63]/40 rounded-3xl transition-colors duration-500 z-20 pointer-events-none"></div>

          {/* Foto Corporativa / Time / Dashboard */}
          <Image
            src="/15anos-image.png"
            alt="Engenharia de Vendas Tegbe"
            width={1376}
            height={774}
            className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.01] transition-all duration-700"
          />

          {/* Overlay Gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-70"></div>

          {/* Floating Card: Diferencial Competitivo */}
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-black/80 backdrop-blur-md border border-rose-500/20 p-4 rounded-xl hidden sm:flex items-center gap-4">
            <div className="bg-[#E31B63] p-2 rounded-lg">
              <Icon icon="mdi:chart-box" className="text-white w-6 h-6" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Foco em Lucro Líquido</p>
              <p className="text-rose-400 text-xs">Métricas de vaidade ignoradas</p>
            </div>
          </div>
        </div>

        {/* TEXTO FINAL */}
        <div className="mt-16 max-w-4xl text-center flex flex-col gap-6 px-5">
          <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed">
            Enquanto o mercado brinca de fazer posts bonitos, nós construímos <strong className="text-white">ecossistemas de vendas</strong>.
          </p>

          <p className="text-gray-400 text-base md:text-lg font-light max-w-3xl mx-auto">
            Como parceiros <strong className="text-white">Kommo Gold</strong> e especialistas em tráfego de alta intenção, unimos a precisão dos dados com a tecnologia de CRM. O resultado? Sua empresa para de depender da sorte e começa a ter <strong className="text-white border-b border-[#E31B63]">previsibilidade de caixa.</strong>
          </p>
        </div>

        {/* CTA - Botão Vermelho (Estilo Marketing/Tegbe) */}
        <div className="mt-12 flex justify-center">
          <a aria-label="conhecer metodologia" href="https://api.whatsapp.com/send?phone=5514991779502&text=Quero%20conhecer%20melhor%20a%20metodologia%20de%20crescimento%20da%20Tegbe." target="_blank"
            rel="noopener noreferrer" className="group relative">

            {/* Glow Vermelho atrás do botão */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FF0F43] to-[#990033] rounded-full opacity-40 blur-md group-hover:opacity-70 transition duration-500"></div>

            <button aria-label="Conhecer metodologia" className="relative bg-[#E31B63] hover:bg-[#ff1758] text-white px-12 py-4 rounded-full font-bold text-sm md:text-base uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] shadow-[0_0_20px_rgba(227,27,99,0.3)] flex items-center gap-3 border border-white/10">
              Conhecer a Metodologia
              <Icon icon="lucide:arrow-right" className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
            </button>
          </a>
        </div>

      </div>
    </section>
  );
}