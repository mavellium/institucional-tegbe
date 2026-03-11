"use client";

import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center min-h-[720px] w-full bg-[#0A0A0A] overflow-hidden">

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

      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
            backgroundImage: "url('/noise.svg')",
            backgroundRepeat: "repeat",
        }}
        />

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center text-center gap-10 px-6">

        {/* Logo */}
        <Image
          src="/logo.svg"
          alt="Tegbe"
          width={420}
          height={200}
          priority
          className="object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
        />

        {/* Tagline */}
        <p className="text-[#FFCC00] text-3xl md:text-4xl italic font-light tracking-wide">
          para quem quer mais.
        </p>

      </div>

      {/* Watermark */}
      <div className="absolute bottom-[-40px] whitespace-nowrap opacity-[0.025] select-none pointer-events-none">
        <span className="text-white text-[260px] font-extrabold tracking-widest uppercase">
          TEGBE
        </span>
      </div>

      {/* Fade bottom para próxima seção */}
      <div className="absolute bottom-0 w-full h-[120px] bg-gradient-to-t from-[#0A0A0A] to-transparent" />

    </section>
  );
};

export default Hero;