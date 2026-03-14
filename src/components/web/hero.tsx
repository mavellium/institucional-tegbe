"use client";

import Image from "next/image";
import Textura from "../ui/textura";

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center min-h-[520px] md:min-h-[592px] w-full bg-[#0A0A0A] overflow-hidden">

  <div className="absolute top-[-180px] md:top-[-250px] w-[600px] h-[600px] md:w-[900px] md:h-[900px] bg-[#FFCC00]/10 blur-[200px] rounded-full" />

  <div className="absolute inset-0 opacity-[0.06]">
    <div
      className="h-full w-full"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "70px 70px",
      }}
    />
  </div>

  <div className="relative z-10 flex flex-col items-center text-center gap-8 px-6">

    <Image
      src="/logo.svg"
      alt="Tegbe"
      width={320}
      height={150}
      priority
      className="w-[220px] sm:w-[280px] md:w-[420px] object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
    />

  </div>

  <p className="absolute bottom-10 px-6 z-10 text-[#F1D95D] text-xl sm:text-2xl md:text-4xl italic font-medium tracking-wide font-serif text-center">
    para quem quer mais.
  </p>

  <div className="absolute right-[-40px] md:right-[-30px] bottom-[-80px] md:bottom-[-130px] whitespace-nowrap opacity-[0.025] select-none pointer-events-none">
    <span className="text-white text-[120px] md:text-[260px] font-medium tracking-[-0.04em] uppercase">
      QUER MAIS
    </span>
  </div>

  <div className="absolute bottom-0 w-full h-[80px] md:h-[120px] bg-gradient-to-t from-[#0A0A0A] to-transparent" />

</section>
  );
};

export default Hero;