"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Icon } from "@iconify/react";

import Heading from "../../ui/heading";
import RichText from "../../ui/rich/richText";
import { CardEspecialista } from "../../ui/card/cardEspecialista";

import { RichTextItem } from "@/types/richText.type";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useApi } from "@/hooks/useApi";

/* ---------------- TYPES ---------------- */

export interface EspecialistaItem {
  nome: string;
  sobrenome: string;
  cargo: RichTextItem[];
  imagem: string;
  corSobrenome?: string;
}

export interface CarrosselEspecialistasData {
  header: {
    title: RichTextItem[];
  };
  especialistas: EspecialistaItem[];
}

/* ---------------- COMPONENT ---------------- */

export default function CarrosselEspecialistas() {

  const { data } = useApi<CarrosselEspecialistasData>("carrossel-de-especialistas");
  if (!data) return null;

  return (
    <section className="bg-[#0A0A0A] py-16 overflow-hidden selection:bg-[#B38E5D]/30">
      <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-8 xl:px-16">
        
        {/* HEADER */}
        <div className="text-center mb-10 md:mb-16">
          <Heading
            as="h2"
            size="p"
            className="text-xl sm:text-2xl md:text-4xl"
            color="#FFFFFF"
            align="center"
          >
            <RichText content={data.header.title} />
          </Heading>
        </div>

        {/* SLIDER */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1.15}
            loop
            autoplay={{ delay: 5000 }}
            navigation={{
              nextEl: ".especialistas-next",
              prevEl: ".especialistas-prev"
            }}
            pagination={{
              clickable: true,
              el: ".especialistas-pagination"
            }}
            breakpoints={{
              640: { slidesPerView: 1.6, centeredSlides: true },
              768: { slidesPerView: 2.3, centeredSlides: true },
              1024: { slidesPerView: 3, centeredSlides: true },
              1280: { slidesPerView: 4, centeredSlides: false }
            }}
          >
            {data.especialistas.map((esp, i) => (
              <SwiperSlide key={i}>
                <CardEspecialista
                  nome={esp.nome}
                  sobrenome={esp.sobrenome}
                  imagem={esp.imagem}
                  cargo={esp.cargo}
                  corSobrenome={esp.corSobrenome? esp.corSobrenome : "#F1D95D"}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* NAVIGATION */}
          <button className="especialistas-prev absolute left-[-40px] top-1/2 -translate-y-1/2 hidden md:flex">
            <Icon icon="ph:caret-left-light" className="text-4xl text-white/50" />
          </button>

          <button className="especialistas-next absolute right-[-40px] top-1/2 -translate-y-1/2 hidden md:flex">
            <Icon icon="ph:caret-right-light" className="text-4xl text-white/50" />
          </button>
        </div>

        <div className="especialistas-pagination flex justify-center gap-3 mt-8 md:mt-12" />
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #ffffff !important;
          opacity: 0.1 !important;
          width: 6px !important;
          height: 6px !important;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          opacity: 1 !important;
          background: #C5A47E !important;
          transform: scale(1.4);
        }
      `}</style>
    </section>
  );
}