"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Icon } from "@iconify/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface Props {
  images: string[];
  alt: string;
}

export default function FotoCarrossel({ images, alt }: Props) {

  const [swiper, setSwiper] = useState<any>(null);

  if (!images?.length) return null;

  return (
    <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-black border border-white/10 shadow-[0_60px_120px_rgba(0,0,0,0.7)]">

      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false
        }}
        loop
        pagination={{ clickable: true }}
        onSwiper={setSwiper}
        className="h-full w-full"
      >
        {images.map((src, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full group">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover scale-[1.02] transition-transform duration-[6000ms] group-hover:scale-[1.06]"
                sizes="(max-width:768px) 100vw, 40vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,0.65))]" />

      {/* botão esquerda */}
      <button
        onClick={() => swiper?.slidePrev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition z-20"
      >
        <Icon icon="ph:caret-left-bold" className="text-xl" />
      </button>

      {/* botão direita */}
      <button
        onClick={() => swiper?.slideNext()}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition z-20"
      >
        <Icon icon="ph:caret-right-bold" className="text-xl" />
      </button>

    </div>
  );
}