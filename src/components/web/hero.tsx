"use client";

import Image from "next/image";
import Textura from "../ui/textura";

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center min-h-[592px] w-full bg-[#0A0A0A] overflow-hidden">

      {/* Radial glow */}
      <div className="absolute top-[-250px] w-[900px] h-[900px] bg-[#FFCC00]/10 blur-[200px] rounded-full" />

      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "90px 90px",
          }}
        />
      </div>

      <Textura misturar opacity={0.15}/>

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center text-center gap-10 px-6">

        {/* Logo */}
        <Image
          src="/logo.svg"
          alt="Tegbe"
          width={420}
          height={200}
          priority
          className="object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)] z-10000"
        />

        {/* Tagline */}
       

      </div>
       <p className="absolute bottom-10 z-10 text-[#F1D95D] text-3xl md:text-4xl italic font-medium tracking-wide font-serif">
          para quem quer mais.
        </p>

      {/* Watermark */}
      <div className="absolute right-[-30px] bottom-[-130px] whitespace-nowrap opacity-[0.025] select-none pointer-events-none">
        <span className="text-white text-[260px] font-medium tracking-[-0.04em] uppercase ">
          QUER MAIS
        </span>
      </div>

      {/* Fade bottom para próxima seção */}
      <div className="absolute bottom-0 w-full h-[120px] bg-gradient-to-t from-[#0A0A0A] to-transparent" />

    </section>
  );
};

export default Hero;