"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  { icon: "ph:microphone-fill", link: "#", label: "Podcast" },
  { icon: "ph:youtube-logo-fill", link: "#", label: "YouTube" },
  { icon: "ph:facebook-logo-fill", link: "#", label: "Facebook" },
  { icon: "ph:instagram-logo-fill", link: "#", label: "Instagram" },
  { icon: "ph:linkedin-logo-fill", link: "#", label: "LinkedIn" },
];

export function TrabalheConosco() {
  return (
    <section className="bg-[#FAF9F6] py-20 lg:py-28 border-t border-black/5">
      <div className="max-w-6xl mx-auto px-6 space-y-24">
        
        {/* PARTE SUPERIOR: TRABALHE CONOSCO */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* TEXTO */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <span className="text-[10px] font-bold tracking-[0.3em] text-[#0D1E2D] uppercase opacity-60">
              Quer construir sua carreira na Tegbe?
            </span>
            
            <h2 className="text-4xl lg:text-5xl font-serif text-[#0D1E2D] tracking-tight">
              Trabalhe conosco
            </h2>

            <p className="text-[#1A2B3C]/70 text-base leading-relaxed max-w-md mx-auto lg:mx-0">
              Se você quer crescer ao lado de estrategistas que constroem negócios relevantes, conheça nossas oportunidades.
            </p>

            <div className="pt-4">
              <Button 
                className="bg-[#B38E5D] hover:bg-[#0D1E2D] text-white rounded-sm px-10 py-7 uppercase tracking-[0.2em] text-[11px] font-bold transition-all duration-500 border-none shadow-lg shadow-black/5"
              >
                Conheça nossas vagas
              </Button>
            </div>
          </div>

          {/* IMAGEM COM MODO G4 (BORDA ARREDONDADA E IMPACTO) */}
          <div className="flex-1 w-full relative aspect-[16/9] lg:aspect-square max-h-[400px] overflow-hidden rounded-xl shadow-2xl">
            <Image 
              src="/doni.jpg" // Aqui você coloca a foto do time da Tegbe
              alt="Time Tegbe"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* DIVISOR SUTIL */}
        <div className="h-px w-full bg-black/5" />

        {/* PARTE INFERIOR: MÍDIAS SOCIAIS */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-bold tracking-[0.3em] text-[#B38E5D] uppercase">
              Mantenha-se atualizado
            </span>
            <h3 className="text-3xl font-serif text-[#0D1E2D] tracking-tight">
              Acompanhe nossas mídias
            </h3>
          </div>

          {/* ÍCONES SOCIAIS (ESTILO CÍRCULO DOURADO) */}
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.link}
                aria-label={social.label}
                className="w-12 h-12 rounded-full bg-[#B38E5D]/10 text-[#B38E5D] flex items-center justify-center hover:bg-[#B38E5D] hover:text-white transition-all duration-300 group"
              >
                <Icon icon={social.icon} className="text-xl group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}