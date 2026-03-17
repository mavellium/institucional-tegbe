"use client";

import Heading from "@/components/ui/heading";
import Link from "next/link";
import { Button } from "../ui/button/button";
import { RichTextItem } from "@/types/richText.type";
import RichText from "../ui/rich/richText";
import ServiceCard from "../ui/serviceCard";
import { ServiceA, ServiceTheme } from "../../types/service.type";

// 1. Importações obrigatórias do Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export interface ServiceProps {
  content: {
    header: {
      preTitle?: string;
      title?: RichTextItem[];
      subtitle?: string;
    };
    services: ServiceA[];
    button?: {
      label: string;
      link: string;
      target?: "_self" | "_blank";
      action?: "link";
    };
  };
}

export default function Service({ content }: ServiceProps) {
  const { header, services, button } = content;

  const theme: ServiceTheme = {
    badge: {
      background: "bg-gray-100"
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">

      {/* HEADER (Mantido com limite de largura) */}
      <div className="max-w-6xl mx-auto px-6 text-center mb-16">
        {header.preTitle && (
          <p className="text-sm font-medium text-muted-foreground mb-4">
            {header.preTitle}
          </p>
        )}

        {header.title && (
          <Heading as="h2" className="mb-4">
            <RichText content={header.title} />
          </Heading>
        )}

        {header.subtitle && (
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {header.subtitle}
          </p>
        )}
      </div>

      <div className="w-full px-6 md:px-12 lg:px-32">
        <Swiper
          spaceBetween={24}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2.3 },
            1024: { slidesPerView: 3.5 },
            1280: { slidesPerView: 4.2 },
          }}
  
          className="!overflow-visible !pt-8 !pb-16"
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
        <div className="flex justify-center mt-12">
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