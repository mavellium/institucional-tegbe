"use client";

import Heading from "@/components/ui/heading";
import Link from "next/link";
import { Button } from "../ui/button/button";
import { RichTextItem } from "@/types/richText.type";
import RichText from "../ui/rich/richText";
import ServiceCard from "../ui/serviceCard";
import { ServiceA, ServiceTheme } from "../../types/service.type";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Textura from "@/components/ui/textura";

export interface ServiceProps {
  content: {
    header: {
      preTitle?: string;
      title?: RichTextItem[];
      subtitle?: string;
      colorTitle?: string;
    };
    services: ServiceA[];
    button?: {
      label: string;
      link: string;
      target?: "_self" | "_blank";
      action?: "link";
    };
  };

  // 🔥 Background config
  backgroundColor?: string;
  backgroundImage?: string;

  // 🔥 Texture config
  showTexture?: boolean;
  textureOpacity?: number;
  textureSrc?: string;
}



export default function Service({
  content,
  backgroundColor,
  backgroundImage,
  showTexture,
  textureOpacity = 0.08,
  textureSrc
}: ServiceProps) {
  const { header, services, button } = content;
  const shouldCenter = services.length <= 3;
  const theme: ServiceTheme = {
    badge: {
      background: "bg-gray-100"
    }
  };

  return (
    <section
      className="py-24 relative overflow-hidden"
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
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center mb-16">
        {header.preTitle && (
          <p className="text-sm font-medium text-muted-foreground mb-4">
            {header.preTitle}
          </p>
        )}

        {header.title && (
          <Heading as="h2" className="mb-4" color={header.colorTitle ? header.colorTitle : "#0a0a0a"}>
            <RichText content={header.title} />
          </Heading>
        )}

        {header.subtitle && (
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {header.subtitle}
          </p>
        )}
      </div>

      {/* CARROSSEL */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-32">
        <Swiper
          spaceBetween={24}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2.3 },
            1024: { slidesPerView: 3.5 },
            1280: { slidesPerView: 4.2 },
          }}
          className={`mySwiper ${shouldCenter ? 'is-centered' : ''} !overflow-visible !pt-8 !pb-16 `}
        >
          {services.map((service) => (
            <SwiperSlide key={service.id} className="h-auto">
              <ServiceCard
                service={service}
                theme={theme}
                variant="ecommerce"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* CTA */}
      {button && (
        <div className="relative z-10 flex justify-center mt-12">
          <Link href={button.link} target={button.target ?? "_self"}>
            <Button>
              {button.label}
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}