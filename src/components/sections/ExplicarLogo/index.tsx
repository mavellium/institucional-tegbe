"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const valores = [
  {
    titulo: "Transformação",
    icon: "ph:arrows-clockwise-bold",
    cor: "#B38E5D",
    texto: "Vivemos o Beta Contínuo. Acreditamos que negócios e pessoas podem evoluir sempre. Ajustamos rotas, refinamos processos e ampliamos visão até que haja clareza, eficiência e confiança. Transformar é crescer de dentro para fora, fortalecendo a operação e quem está por trás dela."
  },
  {
    titulo: "Excelência",
    icon: "ph:crown-bold",
    cor: "#D4AF37",
    texto: "Excelência é escolher ser melhor todos os dias. É não se contentar com o suficiente quando sabemos que é possível fazer extraordinário. Levamos o nosso melhor para desenvolver o melhor do seu negócio e das suas pessoas. Refinamos, aprimoramos e elevamos padrões continuamente."
  },
  {
    titulo: "Growth",
    icon: "ph:chart-line-up-bold",
    cor: "#C5A47E",
    texto: "Crescimento é a consequência natural da evolução constante. Quando o negócio ganha estrutura e as pessoas ganham clareza e competência, a escala deixa de ser um risco e passa a ser um movimento calculado. Construímos expansão sustentável e legado duradouro."
  }
];

export function ExplicarLogo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".valor-card");

    cards.forEach((card: any, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        autoAlpha: 0,
        x: i % 2 === 0 ? -50 : 50,
        duration: 1,
        ease: "power4.out"
      });
    });

    // Animação da Logo ao fundo (Parallax sutil)
    gsap.to(".bg-logo", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      },
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-[#FAF9F6] py-24 lg:py-40 overflow-hidden">

      {/* LOGO DE FUNDO - AGORA USANDO IMAGEM */}
      <div className="bg-logo absolute inset-0 flex items-center justify-center opacity-[0.08] pointer-events-none select-none">
        <img
          src="/logo-tegbe-fundo.png"
          alt="Tegbe Logo Fundo"
          className="w-[800px] h-[800px] object-contain"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        <header className="text-center mb-24 space-y-4">
          <span className="text-[10px] font-bold tracking-[0.4em] text-[#B38E5D] uppercase">O DNA da Tegbe</span>
          <h2 className="text-4xl lg:text-6xl font-serif text-[#0D1E2D]">Nossos Pilares</h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {valores.map((item, i) => (
            <div
              key={i}
              className="valor-card group space-y-8 p-10 bg-white/50 border-yellow-500 backdrop-blur-sm border border-black/[0.03] rounded-2xl hover:bg-white hover:shadow-2xl transition-all duration-500"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundColor: `${item.cor}15`, color: item.cor }}
              >
                <Icon icon={item.icon} className="text-3xl" />
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-serif text-[#0D1E2D] flex items-center gap-3">
                  <span className="text-xs font-mono opacity-30">0{i + 1}</span>
                  {item.titulo}
                </h3>
                <div className="h-px w-12 bg-[#B38E5D] transition-all duration-500 group-hover:w-full" />
                <p className="text-[#1A2B3C]/70 text-sm leading-relaxed font-light">
                  {item.texto}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer da seção com frase de impacto */}
        <div className="mt-24 text-center">
          <p className="text-[#0D1E2D] font-serif italic text-xl opacity-60">
            "Não é apenas sobre vender, é sobre construir legados."
          </p>
        </div>
      </div>
    </section>
  );
}