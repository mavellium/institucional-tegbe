"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Icon } from "@iconify/react";

import Heading from "../ui/heading";
import RichText from "../ui/richText";
import { CardEspecialista } from "../ui/cardEspecialista";

import { RichTextItem } from "@/types/richText.type";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/* ---------------- TYPES ---------------- */

type CarrosselEspecialistasData = {
  header: {
    title: RichTextItem[];
  };

  especialistas: {
    nome: string;
    sobrenome: string;
    cargo: RichTextItem[];
    imagem: string;
  }[];
};

/* ---------------- MOCK DATA ---------------- */

const mockData: { especialistas: CarrosselEspecialistasData } = {
  especialistas: {

    header: {
      title: [
        { type: "text", value: "E nesse processo reunimos vários " },
        { type: "highlight", value: "especialistas", color: "#F1D95D" }
      ]
    },

    especialistas: [
      {
        nome: "Rafael",
        sobrenome: "Milagre",
        cargo: [
          { type: "text", value: "Fundador da Viver de AI, professor de IA na ESPM e mentor do TEGBE." }
        ],
        imagem: "/doni.jpg"
      },

      {
        nome: "Marcelo",
        sobrenome: "Camargo",
        cargo: [
          { type: "text", value: "Ex-diretor Nacional da Ambev e Labatt Breweries." }
        ],
        imagem: "/doni.jpg"
      },

      {
        nome: "Fabíola",
        sobrenome: "Overrath",
        cargo: [
          { type: "text", value: "Cofundadora do Edubank e Ex-Diretora de Pessoas da Ambev." }
        ],
        imagem: "/doni.jpg"
      },

      {
        nome: "Tomás",
        sobrenome: "Duarte",
        cargo: [
          { type: "text", value: "CEO e co-fundador da Track.co." }
        ],
        imagem: "/doni.jpg"
      },

      {
        nome: "Donizete",
        sobrenome: "Caetano",
        cargo: [
          { type: "text", value: "Fundador da Tegbe e Especialista em Escala de E-commerce." }
        ],
        imagem: "/doni.jpg"
      }
    ]
  }
};

/* ---------------- COMPONENT ---------------- */

export function CarrosselEspecialistas() {

  const data = mockData.especialistas;

  return (

    <section className="bg-[#0A0A0A] py-16 overflow-hidden selection:bg-[#B38E5D]/30">

      <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-16">

        {/* HEADER */}

        <div className="text-center mb-16">

          <Heading
            as="h2"
            size="p"
            className="text-2xl md:text-4xl tracking-tight"
            color="#FFFFFF"
          >
            <RichText content={data.header.title} />
          </Heading>

        </div>

        {/* SLIDER */}

        <div className="relative">

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
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
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1280: { slidesPerView: 4 }
            }}
          >

            {data.especialistas.map((esp, i) => (

              <SwiperSlide key={i}>

                <CardEspecialista
                  nome={esp.nome}
                  sobrenome={esp.sobrenome}
                  imagem={esp.imagem}
                  cargo={esp.cargo}
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

        <div className="especialistas-pagination flex justify-center gap-3 mt-12" />

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