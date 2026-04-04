"use client";

import Heading from "@/components/ui/heading";
import Link from "next/link";
import { Button } from "@/components/ui/button/button";
import { RichTextItem } from "@/types/richText.type";
import RichText from "@/components/ui/rich/richText";
import ServiceCard from "@/components/ui/serviceCard";
import { ServiceA, ServiceTheme } from "@/types/service.type";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Textura from "@/components/ui/textura";
import { IButton } from "@/interface/button/IButton";

export interface ServiceProps {
  data: IService | null;
  backgroundColor?: string;
  backgroundImage?: string;
  showTexture?: boolean;
  textureOpacity?: number;
  textureSrc?: string;
}

interface IService {
  header: {
    preTitle?: string;
    title?: RichTextItem[];
    subtitle?: string;
    colorTitle?: string;
  };
  services: ServiceA[];
  button?: IButton;
}

export default function Carrossel({
  data,
  backgroundColor,
  backgroundImage,
  showTexture,
  textureOpacity = 0.08,
  textureSrc,
}: ServiceProps) {
  if (!data) return null;
  const { header, services, button } = data;
  const shouldCenter = services.length <= 3;
  const theme: ServiceTheme = {
    badge: {
      background: "bg-gray-100",
    },
  };

  return (
    <section
      // 1. Padding vertical dinâmico (menor no mobile, maior no desktop)
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        backgroundColor: backgroundColor || undefined,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* TEXTURA */}
      {showTexture && (
        <Textura
          misturar
          opacity={textureOpacity}
          src={textureSrc}
          className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        />
      )}

      {/* HEADER */}
      {/* Ajustei as margens laterais para não encostar nas bordas no mobile */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center mb-10 md:mb-16">
        {header.preTitle && (
          <p className="text-sm md:text-base font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
            {header.preTitle}
          </p>
        )}

        {header.title && (
          <Heading
            align="center"
            as="h2"
            // Removido o md:text-left para manter alinhado com o container
            className="mb-4"
            color={header.colorTitle ? header.colorTitle : "#0a0a0a"}
          >
            <RichText content={header.title} />
          </Heading>
        )}

        {header.subtitle && (
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            {header.subtitle}
          </p>
        )}
      </div>

      {/* CARROSSEL */}
      {/* Largura máxima controlada para não espalhar demais em telas ultrawide */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8">
        <Swiper
          // 2. Breakpoints mais detalhados para transições suaves
          breakpoints={{
            320: { slidesPerView: 1.2, spaceBetween: 16 },
            640: { slidesPerView: 2.2, spaceBetween: 20 },
            768: { slidesPerView: 2.8, spaceBetween: 24 }, // Adicionado tablet
            1024: { slidesPerView: 3.2, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
          className={`mySwiper !overflow-visible !pt-4 !pb-12 md:!pb-16 ${
            shouldCenter ? "md:[&>.swiper-wrapper]:!justify-center" : ""
          }`}
        >
          {services.map((service) => (
            // 3. Adicionado !flex para que os cards estiquem e fiquem com a mesma altura
            <SwiperSlide key={service.id} className="h-auto !flex">
              <div className="w-full h-full">
                {" "}
                {/* Garante o preenchimento interno */}
                <ServiceCard service={service} theme={theme} variant="ecommerce" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* CTA */}
      {button && button.action === "link" && (
        <div className="relative z-10 flex justify-center mt-4 md:mt-8 px-4">
          <Link href={button.link} target={button.target ?? "_self"} className="w-full sm:w-auto">
            {/* O botão ocupará a largura total no mobile e o tamanho natural a partir do sm */}
            <Button className="w-full sm:w-auto px-8 py-6 text-base">{button.label}</Button>
          </Link>
        </div>
      )}
    </section>
  );
}
