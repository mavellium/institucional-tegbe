"use client";

import { useRef } from "react";
import { Icon } from "@iconify/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// DADOS ALINHADOS COM O LAYOUT "CARDS(4).PNG"
const services = [
  {
    step: "01",
    id: "seo",
    title: "SEO de Conversão",
    description: "Não criamos apenas anúncios, criamos máquinas de vendas. Títulos e descrições otimizados para que o cliente te encontre e compre sem hesitar.",
    icon: "lucide:search-code", // Ou um ícone mais 'clean'
    color: "#0071E3",
    wide: false // Card Vertical
  },
  {
    step: "02",
    id: "ads",
    title: "Tráfego que Dá Lucro",
    description: "Gestão de Ads focada em ROI. Colocamos seu investimento onde o retorno é certo, acelerando o giro de estoque e multiplicando suas vendas.",
    icon: "lucide:trending-up",
    color: "#0071E3",
    wide: false // Card Vertical
  },
  {
    step: "03",
    id: "blindagem",
    title: "Operação Blindada",
    description: "Cuidamos da sua reputação para que nada pare o seu crescimento. No Mercado Livre e na Shopee, medalha no peito é sinônimo de mais dinheiro no bolso.",
    icon: "lucide:shield-check",
    color: "#FFD700", // Dourado para representar a Medalha
    wide: true // Card Horizontal (Base)
  }
];

export default function ServiceFlow() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Animação dos Cards
    gsap.from(".service-card", {
      opacity: 0,
      y: 40,
      stagger: 0.2, // Um pouco mais lento para dar peso
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
    });

    // Animação do Título
    gsap.from(".section-title", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      },
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 bg-white px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* CABEÇALHO */}
        <div className="mb-16 text-center section-title">
          <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight mb-4">
            Como fazemos você vender
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Metodologia validada em mais de R$ 40 milhões faturados.
          </p>
        </div>

        {/* GRID "2 COLUNAS + BASE" */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`
                service-card group relative overflow-hidden rounded-[2rem] p-8 border border-gray-100
                transition-all duration-500 hover:shadow-2xl hover:-translate-y-1
                ${service.wide ? 'md:col-span-2 bg-gradient-to-br from-gray-50 to-gray-100' : 'bg-gray-50'}
              `}
            >
              {/* Número de Fundo (Estilo Editorial) */}
              <span className="absolute right-6 top-6 text-6xl font-black text-gray-200 opacity-50 group-hover:opacity-20 transition-opacity">
                {service.step}
              </span>

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  {/* Ícone com Glow sutil */}
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 shadow-sm"
                    style={{ backgroundColor: 'white', color: service.color }}
                  >
                    <Icon icon={service.icon} width="28" />
                  </div>

                  <h3 className="text-2xl font-bold text-black mb-3 w-3/4">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-base">
                    {service.description}
                  </p>
                </div>

                {/* Área para Inserção das Imagens/Mockups Futuros */}
                {/* Aqui entrarão os gráficos e medalhas que discutimos */}
                <div className="mt-8 h-32 w-full rounded-xl bg-white/50 border border-gray-200/50 flex items-center justify-center text-gray-300 text-xs uppercase tracking-widest">
                   {service.wide ? '[Área da Medalha 3D]' : '[Área do Mockup UI]'}
                </div>
              </div>

              {/* Borda Inferior Colorida ao Hover */}
              <div 
                className="absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full transition-all duration-700 ease-out"
                style={{ backgroundColor: service.color }} 
              />
            </div>
          ))}
        </div>

        {/* CTA FINAL (Integrado ou separado, mantive separado para flexibilidade) */}
        {/* Nota: O CTA preto que você tinha pode ser um componente separado abaixo deste */}
        
      </div>
    </section>
  );
}