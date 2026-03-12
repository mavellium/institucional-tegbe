"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  alt: string;
}

export default function FotoCarrossel({ images, alt }: Props) {

  const [current, setCurrent] = useState(0);

  useEffect(() => {

    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4500);

    return () => clearInterval(timer);

  }, [images.length]);

  return (

    <div
      className="
      relative
      aspect-[4/5]
      rounded-[32px]
      overflow-hidden
      bg-black
      border border-white/10
      shadow-[0_60px_120px_rgba(0,0,0,0.7)]
      group
      "
    >

      {/* glow amarelo */}
      <div
        className="
        absolute
        inset-0
        opacity-0
        group-hover:opacity-100
        transition-opacity
        duration-500
        pointer-events-none
        bg-[radial-gradient(circle_at_center,rgba(255,199,44,0.25),transparent_65%)]
        "
      />

      {images.map((src, index) => (

        <div
          key={index}
          className={`
          absolute inset-0
          transition-opacity duration-1000
          ${current === index ? "opacity-100" : "opacity-0"}
          `}
        >

          <Image
            src={src}
            alt={alt}
            fill
            className="
            object-cover
            scale-[1.02]
            transition-transform
            duration-[6000ms]
            group-hover:scale-[1.06]
            "
            unoptimized
          />

        </div>

      ))}

      {/* overlay cinematográfico */}
      <div
        className="
        absolute inset-0
        bg-gradient-to-t
        from-black
        via-black/40
        to-black/10
        "
      />

      vignette
      <div
        className="
        absolute inset-0
        bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.65))]
        pointer-events-none
        "
      />

      {/* navegação */}
      {images.length > 1 && (

        <div
          className="
          absolute
          bottom-6
          left-1/2
          -translate-x-1/2
          flex
          gap-3
          "
        >

          {images.map((_, i) => (

            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="
              relative
              h-[6px]
              rounded-full
              transition-all
              duration-300
              "
            >

              <span
                className={`
                block
                h-full
                rounded-full
                transition-all
                duration-300
                ${current === i
                  ? "w-10 bg-[#FFC72C] shadow-[0_0_12px_rgba(255,199,44,0.7)]"
                  : "w-3 bg-white/40 hover:bg-white/70"}
                `}
              />

            </button>

          ))}

        </div>

      )}

    </div>

  );

}