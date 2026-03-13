"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import SocialLink from "./socialLink";

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
    image: "/teste2.png",
    socials: [
      { icon: "ph:instagram-logo", link: "#" },
      { icon: "ph:linkedin-logo", link: "#" },
    ],
    companies: [
      { logo: "simple-icons:mercadopago", name: "Mercado Livre" },
      { logo: "simple-icons:amazon", name: "Amazon" },
      { logo: "simple-icons:shopee", name: "Shopee" },
    ],
  };

  return (

    <div className="relative w-[350px] group">

      {/* glow */}
      <div className="absolute -inset-[1px] rounded-[22px] bg-[#C9A646]/20 blur-xl opacity-0 group-hover:opacity-40 transition duration-700"/>

      <div className="relative h-full bg-[#0A0A0A] rounded-[12px] overflow-hidden flex flex-col">

        {/* FOTO */}
        <div className="relative h-[380px] w-full overflow-hidden">

          <Image
            src={funder.image}
            alt={funder.name}
            fill
            className="object-cover object-top "
          />



          {/* watermark */}
          <div className="absolute right-6 bottom-6 opacity-[0.07]">

          </div>

        </div>

        {/* CONTEÚDO */}
        <div className="flex-1 flex flex-col px-7 pt-6 pb-7">

          {/* nome */}
          <div>

            <h3 className="text-[#F1D95D] text-[26px] leading-tight font-semibold tracking-tight">
              {funder.name}
            </h3>

            <p className="text-white text-[14px] mt-1">
              {funder.role}
            </p>

          </div>

          {/* divider */}
          <div className="mt-6 mb-6 h-[1px] w-full bg-gradient-to-r from-[#C9A646]/40 via-white/10 to-transparent"/>

          <div>

            <div className="flex gap-3 mt-4">

              {funder.companies.map((co, i) => (

                <div
                  key={i}
                  className="flex items-center justify-center w-[42px] h-[42px] rounded-lg bg-white/[0.03] border border-white/5 hover:border-[#C9A646]/40 transition"
                >
                  <Icon
                    icon={co.logo}
                    className="text-white/70 text-[20px]"
                  />
                </div>

              ))}

            </div>

          </div>

          {/* socials */}
          <div className="mt-auto pt-7 flex gap-3">

            {funder.socials.map((item, index) => (

             <SocialLink
                             key={index}
                             icon={item.icon}
                             href={item.link}
                             variant="ecommerce"
                           />

            ))}

          </div>

        </div>

      </div>

    </div>

  );
}