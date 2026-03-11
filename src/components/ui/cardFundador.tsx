"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";

interface CardFundadorProps {
  data?: {
    name: string;
    role: string;
    image: string;
    socials: { icon: string; link: string }[];
    companies: { logo: string; name: string }[];
  };
}

export default function CardFundador({ data }: CardFundadorProps) {
  const funder = data || {
    name: "Donizete Caetano",
    role: "Fundador da Tegbe • Especialista em Escala",
    image: "/doni.jpg",
    socials: [
      { icon: "ph:instagram-logo", link: "#" },
      { icon: "ph:linkedin-logo", link: "#" },
    ],
    // Adicionei os marketplaces que você pediu aqui
    companies: [
      { logo: "simple-icons:mercadopago", name: "Mercado Livre" },
      { logo: "simple-icons:amazon", name: "Amazon" },
      { logo: "simple-icons:shopee", name: "Shopee" },
    ],
  };

  return (
    <div className="w-full lg:w-[420px] relative group">
      {/* BACKGROUND GLOW */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700]/20 to-transparent rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

      <div className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* IMAGEM */}
        <div className="relative aspect-square w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-20" />
          
          <Image
            src={funder.image}
            alt={funder.name}
            fill
            className="object-cover object-top group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out z-10"
          />

          <div className="absolute top-4 right-4 z-30 mix-blend-overlay">
             <span className="text-white text-5xl font-black opacity-20 vertical-text select-none uppercase tracking-tighter">
                Tegbe
             </span>
          </div>
        </div>

        {/* CONTEÚDO */}
        <div className="p-8 pt-2">

          <div className="mb-6">
            <h4 className="text-white text-3xl font-bold mb-1 mt-5 tracking-tight">
              {funder.name}
            </h4>
            <p className="text-gray-500 text-sm font-medium">
              {funder.role}
            </p>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-[#FFD700]/50 via-white/10 to-transparent mb-6" />

          <div className="flex flex-col gap-6">

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] text-gray-600 uppercase font-bold tracking-widest w-full mb-1">Expertise em:</span>
              {funder.companies.map((co, i) => (
                <span 
                  key={i} 
                  title={co.name} 
                  className="bg-white/[0.03] p-2 rounded-lg border border-white/5 hover:border-[#FFD700]/50 hover:bg-[#FFD700]/5 transition-all duration-300 group/icon"
                >
                  <Icon 
                    icon={co.logo} 
                    className="text-gray-500 text-2xl group-hover/icon:text-white transition-colors" 
                  />
                </span>
              ))}
            </div>

            <div className="flex items-center mt-2">           
            
               <div className="flex flex-wrap items-center gap-3">
                <span className="text-[10px] text-gray-600 uppercase font-bold tracking-widest w-full mb-1">Conecte-se em:</span>
                {funder.socials.map((social, i) => (
                  <a
                    key={i}
                    href={social.link}
                    className="bg-white/[0.03] p-2 rounded-lg border border-white/5 hover:border-[#FFD700]/50 hover:bg-[#FFD700]/5 transition-all duration-300 group/icon"
                  >
                    <Icon icon={social.icon} className="text-gray-500 text-xl group-hover/icon:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </div>
  );
}