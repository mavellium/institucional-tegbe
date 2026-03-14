"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import SocialLink from "./socialLink";
import RichText from "./richText";
import { RichTextItem } from "@/types/richText.type";

interface CardFundadorProps {
  data?: {
    name: RichTextItem[];
    role: RichTextItem[];
    image: string;
    socials: { icon: string; link: string }[];
    companies: { logo: string; name: string }[];
  };
}

function richTextToPlainText(content: RichTextItem[]) {
  return content
    .filter(item => "value" in item)
    .map(item => item.value)
    .join(" ");
}

export default function CardFundador({ data }: CardFundadorProps) {

  const funder = data || {
    name: [{ type: "text", value: "Donizete" }],
    role: [{ type: "text", value: "Fundador da Tegbe • Especialista em Escala" }],
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
    <div className="relative w-full max-w-[350px] mx-auto group">

      {/* glow */}
      <div className="absolute -inset-[1px] rounded-[22px] bg-[#C9A646]/20 blur-xl opacity-0 group-hover:opacity-40 transition duration-700" />

      <div className="relative h-full bg-[#0A0A0A] rounded-[16px] overflow-hidden flex flex-col">

        {/* FOTO */}
        <div className="relative w-full overflow-hidden rounded-t-[16px]">
          <Image
            src={funder.image}
            alt={richTextToPlainText(funder.name)}
            width={420}
            height={350}
            className="object-cover object-top"
          />
        </div>

        {/* CONTEÚDO */}
        <div className="flex-1 flex flex-col px-5 sm:px-6 pt-5 pb-6 sm:pb-7">

          {/* nome */}
          <div>
            <h3 className="text-[#F1D95D] text-[22px] sm:text-[26px] leading-tight font-semibold tracking-tight">
              <RichText content={funder.name} />
            </h3>

            <p className="text-white text-[13px] sm:text-[14px] mt-1">
              <RichText content={funder.role} />
            </p>
          </div>

          {/* divider */}
          <div className="mt-4 sm:mt-6 mb-4 sm:mb-6 h-[1px] w-full bg-gradient-to-r from-[#C9A646]/40 via-white/10 to-transparent" />

          {/* empresas */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mt-2 sm:mt-4">
            {funder.companies.map((co, i) => (
              <div
                key={i}
                className="flex items-center justify-center w-[38px] sm:w-[42px] h-[38px] sm:h-[42px] rounded-lg bg-white/[0.03] border border-white/5 hover:border-[#C9A646]/40 transition"
                title={co.name}
              >
                <Icon
                  icon={co.logo}
                  className="text-white/70 text-[18px] sm:text-[20px]"
                />
              </div>
            ))}
          </div>

          {/* socials */}
          <div className="mt-auto pt-5 sm:pt-7 flex gap-2 sm:gap-3">
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