"use client";

import { useRef } from "react";
import { Icon } from "@iconify/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    step: "01",
    id: "seo",
    title: "SEO de Conversão",
    description: "Não criamos apenas anúncios, criamos máquinas de vendas. Títulos e descrições otimizados para que o cliente te encontre e compre sem hesitar.",
    icon: "lucide:search-code",
    color: "#0071E3",
    wide: false 
  },
  {
    step: "02",
    id: "ads",
    title: "Tráfego que Dá Lucro",
    description: "Gestão de Ads focada em ROI. Colocamos seu investimento onde o retorno é certo, acelerando o giro de estoque e multiplicando suas vendas.",
    icon: "lucide:trending-up",
    color: "#0071E3",
    wide: false 
  },
  {
    step: "03",
    id: "blindagem",
    title: "Operação Blindada",
    description: "Cuidamos da sua reputação para que nada pare o seu crescimento. No Mercado Livre e na Shopee, medalha no peito é sinônimo de mais dinheiro no bolso.",
    icon: "lucide:shield-check",
    color: "#FFD700", 
    wide: true 
  }
];

export default function ServiceFlow() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Título
    gsap.from(".section-title", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 90%", 
      },
    });

    // Cards
    gsap.from(".service-card", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

  }, { scope: containerRef });

  return (
    // ALTERAÇÃO 1: Fundo agora é bg-[#f4f4f4]
    <section ref={containerRef} className="py-24 bg-[#f4f4f4] px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* CABEÇALHO */}
        <div className="mb-16 text-center section-title will-change-transform">
          <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight mb-4">
            Como fazemos você vender
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Metodologia validada em mais de R$ 40 milhões faturados.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`
                service-card relative overflow-hidden rounded-[2rem] p-8 border border-gray-200/50 group
                will-change-transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1
                ${service.wide 
                  ? 'md:col-span-2 bg-white' // ALTERAÇÃO 2: Card Wide Branco Puro
                  : 'md:col-span-1 bg-white' // ALTERAÇÃO 3: Card Normal Branco Puro
                }
              `}
            >
              {/* Número de Fundo */}
              <span className="absolute right-6 top-6 text-6xl font-black text-gray-100 group-hover:text-gray-50 transition-colors duration-500 select-none">
                {service.step}
              </span>

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  {/* Ícone Wrapper (Fundo cinza claro para destacar no branco) */}
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm bg-gray-50 transition-transform duration-500 group-hover:scale-110"
                    style={{ color: service.color }}
                  >
                    {service.icon && <Icon icon={service.icon} width="28" height="28" />}
                  </div>

                  <h3 className="text-2xl font-bold text-black mb-3 w-11/12 md:w-3/4">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-base font-medium">
                    {service.description}
                  </p>
                </div>

                {/* Área Visual (Mockup/Medalha) */}
                <div className="mt-8 h-32 w-full rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                   {service.wide ? '🏆 [Área da Medalha 3D]' : '📈 [Gráfico de Performance]'}
                </div>
              </div>

              {/* Borda Inferior Animada */}
              <div 
                className="absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full transition-all duration-700 ease-out"
                style={{ backgroundColor: service.color }} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}