"use client";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button/button";
import { SectionContent } from "@/types/testimonial.type";
import RichText from "../rich/richText";
import Link from "next/link";
import CompanyCarousel from "./companyCarousel";
import { Icon } from "@iconify/react";

interface Props {
  data: SectionContent;
}

export default function ClienteSection({ data }: Props) {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 md:px-8 bg-[#050505] relative overflow-hidden">
      
      {/* SPOTLIGHT DE FUNDO */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER PADRÃO */}
        <div className="mb-12 sm:mb-16">
          <Heading align="center">
            <RichText content={data.title} />
          </Heading>
        </div>

        {/* CAROUSEL */}
        <CompanyCarousel items={data.testimonials} />

        {/* CTA (BOTÃO) */}
        {data.button?.action === "link" && (
          <div className="flex flex-col items-center mt-12 sm:mt-16 reveal-text">
            <Button
              asChild
            //   className="group inline-flex items-center gap-3 px-8 py-7 sm:py-8 h-auto rounded-full font-bold transition-all duration-300 hover:scale-105 bg-white text-black hover:bg-white border-none shadow-lg hover:shadow-[0_0_25px_rgba(234,179,8,0.55)] cursor-pointer text-base sm:text-lg"
            >
              <Link
                href={data.button.link}
                target={data.button.target || "_blank"}
                rel="noopener noreferrer"
              >
                <span>{data.button.label}</span>
                <Icon
                  icon="lucide:arrow-right"
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}