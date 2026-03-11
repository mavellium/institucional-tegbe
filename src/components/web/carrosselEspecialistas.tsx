"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Icon } from "@iconify/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CardEspecialista } from "../ui/cardEspecialista";

const especialistas = [
  {
    nome: "Rafael",
    sobrenome: "Milagre",
    cargo: "Fundador da Viver de AI, professor de IA na ESPM e mentor do G4.",
    imagem: "/doni.jpg",
  },
  {
    nome: "Marcelo",
    sobrenome: "Camargo",
    cargo: "Ex-diretor Nacional da Ambev e Labatt Breweries.",
    imagem: "/doni.jpg",
  },
  {
    nome: "Fabíola",
    sobrenome: "Overrath",
    cargo: "Cofundadora do Edubank e Ex-Diretora de Pessoas da Ambev.",
    imagem: "/doni.jpg",
  },
  {
    nome: "Tomás",
    sobrenome: "Duarte",
    cargo: "CEO e co-fundador da Track.co.",
    imagem: "/doni.jpg",
  },
  {
    nome: "Donizete",
    sobrenome: "Caetano",
    cargo: "Fundador da Tegbe e Especialista em Escala de E-commerce.",
    imagem: "/doni.jpg",
  },
];

export function CarrosselEspecialistas() {
  return (
    <section className="bg-[#0A0A0A] py-24 overflow-hidden selection:bg-[#B38E5D]/30">
      <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-16">

        {/* Título Estilo G4 */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-serif text-white tracking-tight">
            E nesse processo reunimos vários <span className="text-[#C5A47E] italic font-light">especialistas</span>
          </h2>
        </div>

        {/* Slider Container */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20} // Espaço entre os cards
            slidesPerView={1} // Mobile default
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{ clickable: true, el: ".swiper-pagination-custom" }}
            breakpoints={{
              // Tablet: 2 cards
              640: { slidesPerView: 2 },
              // Desktop Médio: 3 cards
              768: { slidesPerView: 3 },
              // Desktop Large: Exatamente 4 cards
              1280: { slidesPerView: 4 },
            }}
            className="mySwiper !static" // !static permite que as setas fiquem posicionadas em relação à seção
          >
            {especialistas.map((esp, index) => (
              <SwiperSlide key={index}>
                {/* h-full garante que todos os cards tenham a mesma altura */}
                <div className="h-full pb-4">
                  <CardEspecialista
                    nome={esp.nome}
                    sobrenome={esp.sobrenome}
                    cargo={esp.cargo}
                    imagem={esp.imagem}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Botões de Navegação (Posicionados para fora dos cards) */}
          <button className="swiper-button-prev-custom absolute left-[-40px] lg:left-[-50px] top-1/2 -translate-y-1/2 w-12 h-12 text-white/50 hover:text-[#C5A47E] transition-all z-30 disabled:opacity-0 hidden md:flex items-center justify-center">
            <Icon icon="ph:caret-left-light" className="text-4xl" />
          </button>
          <button className="swiper-button-next-custom absolute right-[-40px] lg:right-[-50px] top-1/2 -translate-y-1/2 w-12 h-12 text-white/50 hover:text-[#C5A47E] transition-all z-30 disabled:opacity-0 hidden md:flex items-center justify-center">
            <Icon icon="ph:caret-right-light" className="text-4xl" />
          </button>
        </div>

        {/* Dots Customizados */}
        <div className="swiper-pagination-custom flex justify-center gap-3 mt-12" />
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