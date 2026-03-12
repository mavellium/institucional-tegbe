"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";

const socials = [
  { icon: "ph:youtube-logo-fill", link: "#" },
  { icon: "ph:facebook-logo-fill", link: "#" },
  { icon: "ph:instagram-logo-fill", link: "#" },
  { icon: "ph:linkedin-logo-fill", link: "#" },
];

export function TrabalheConosco() {
  return (
    <section className="bg-[#F7F6F3] py-24">

      <div className="max-w-6xl mx-auto px-6">

        {/* HERO */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* TEXTO */}
          <div className="space-y-6">

            <span className="text-sm text-[#0a0a0a] text-[18px] font-medium">
              Quer construir sua carreira na G4?
            </span>

            <h2 className="text-4xl lg:text-5xl font-medium text-[#0a0a0a] leading-tight">
              Trabalhe conosco
            </h2>

            <p className="text-lg text-[#0a0a0a] leading-relaxed max-w-md">
              Se você quer crescer ao lado de empreendedores que
              constroem negócios relevantes, conheça nossas
              oportunidades.
            </p>

            <button
              className="
              mt-4
              bg-[#FFC72C]
              hover:bg-[#F2CB5E]
              text-black
              font-semibold
              px-8
              py-3
              rounded-lg
              transition
            "
            >
              Conheça nossas vagas
            </button>

          </div>

          {/* IMAGEM */}
          <div className="relative w-full h-[320px] lg:h-[340px] rounded-xl overflow-hidden">

            <Image
              src="/doni.jpg"
              alt="Equipe G4"
              fill
              className="object-cover"
            />

          </div>

        </div>

        {/* DIVIDER */}
        <div className="my-16 border-t border-black/10" />

        {/* SOCIAL */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

          <div>

            <span className="text-sm text-[#0a0a0a] text-[16px]">
              Mantenha-se atualizado
            </span>

            <h3 className="text-4xl font-medium text-[#0a0a0a] mt-1">
              Acompanhe nossas mídias
            </h3>

          </div>

          <div className="flex gap-5">

            {socials.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="
                w-12
                h-12
                rounded-full
                bg-black/60
                flex
                items-center
                justify-center
                text-white
                hover:scale-105
                transition
                "
              >
                <Icon icon={item.icon} className="text-xl" />
              </a>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}