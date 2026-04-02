"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";

import { IParceiro } from "@/interface/parceiro/IParceiro";
import CartaoParceiro from "./cartaoParceiro";

interface Props {
  items: IParceiro[];
}

export default function CarrosselParceiros({ items }: Props) {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section className="w-full flex items-center justify-center py-12 md:py-20">
      <div className="max-w-2xl w-full px-4 relative">
        <Swiper
          modules={[Navigation]}
          speed={600}
          spaceBetween={16}
          slidesPerView={1.1}
          centeredSlides
          loop={false}
          grabCursor
          navigation={{
            nextEl: ".btn-next",
            prevEl: ".btn-prev",
          }}
          breakpoints={{
            640: {
              slidesPerView: 1.2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 80,
            },
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          className="rounded-[2rem] overflow-visible"
        >
          {items.map((p, index) => (
            <SwiperSlide key={`${p.id}-${index}`} className="flex justify-center">
              <CartaoParceiro
                id={p.id}
                nome={p.nome}
                cargo={p.cargo}
                depoimento={p.depoimento}
                img_principal={p.img_principal}
                img_nome={p.img_nome}
                img_nome_alt={p.img_nome_alt}
                img_logo={p.img_logo}
                img_logo_alt={p.img_logo_alt}
                img_principal_alt=""
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* BOTÃO ESQUERDA */}
        <button
          className={`btn-prev absolute left-2 md:left-0 top-1/2 -translate-y-1/2 z-40 p-3 md:p-4 bg-white/5 backdrop-blur-md rounded-full border border-white/10 transition-all duration-300 md:-translate-x-1/2 hover:bg-white/10 hover:border-white/20 ${
            isBeginning ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="rotate-180 text-white"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>

        {/* BOTÃO DIREITA */}
        <button
          className={`btn-next absolute right-2 md:right-0 top-1/2 -translate-y-1/2 z-40 p-3 md:p-4 bg-white/5 backdrop-blur-md rounded-full border border-white/10 transition-all duration-300 md:translate-x-1/2 hover:bg-white/10 hover:border-white/20 ${
            isEnd ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          display: none !important;
        }
      `}</style>
    </section>
  );
}
