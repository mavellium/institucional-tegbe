'use client';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import CartaoParceiro from './cartaoParceiro';

export default function CarrosselParceiros() {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const parceiros = [
    { 
      id: 1, 
      nome: "João Branco", 
      cargo: "Ex-CMO do McDonald's",
      depoimento: (
        <p>
          Top 10 profissionais de marketing no Brasil pela Forbes. 
          Considerado <span className="font-bold text-gray-800">CMO mais eficaz do país pela Scopen</span>
        </p>
      ),
      img_principal: "/dev/foto_card.avif", 
      img_nome: "/dev/foto_nome_card.avif", 
      img_nome_alt: "Ferrero",
      img_logo: "/dev/foto_logo_card.avif",
      img_logo_alt: "McDonald's"
    },
    { 
      id: 2, 
      nome: "Vinícius", 
      cargo: "Estrategista de Growth",
      depoimento: (
        <p>
          Especialista em escala acelerada. Ajudou a consolidar a presença digital 
          de grandes players com <span className="font-bold text-gray-800">foco total em conversão</span>.
        </p>
      ),
      img_principal: "/path-to-vinicius.png", 
      img_nome: "/path-to-logo-text-2.png", 
      img_nome_alt: "Nome Empresa",
      img_logo: "/path-to-logo-2.png",
      img_logo_alt: "Logo Empresa"
    },
    { 
      id: 3, 
      nome: "Marcio", 
      cargo: "Diretor Comercial",
      depoimento: (
        <p>
          Líder em operações de vendas complexas. Implementou processos que 
          geraram <span className="font-bold text-gray-800">crescimento de 3 dígitos em tempo recorde</span>.
        </p>
      ),
      img_principal: "/path-to-marcio.png", 
      img_nome: "/path-to-logo-text-3.png", 
      img_nome_alt: "Nome Empresa",
      img_logo: "/path-to-logo-3.png",
      img_logo_alt: "Logo Empresa"
    },
  ];

  return (
    <section className="w-full min-h-[500px] flex items-center justify-center py-20">
      <div className="max-w-2xl w-full px-4 relative"> 
        
        <Swiper
          modules={[Navigation]}
          speed={600}
          spaceBetween={100}
          slidesPerView={1}
          centeredSlides={true}
          loop={false}
          allowTouchMove={false}
          navigation={{
            nextEl: '.btn-next',
            prevEl: '.btn-prev',
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          className="rounded-[2rem] overflow-hidden" 
        >
          {parceiros.map((p) => (
            <SwiperSlide key={p.id} className="flex justify-center">
              <CartaoParceiro 
                nome={p.nome} 
                cargo={p.cargo}
                depoimento={p.depoimento}
                img_principal={p.img_principal} 
                img_nome={p.img_nome} 
                img_nome_alt={p.img_nome_alt} 
                img_logo={p.img_logo}
                img_logo_alt={p.img_logo_alt}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Botão Esquerda */}
        <button 
          className={`btn-prev absolute left-0 top-1/2 -translate-y-1/2 z-40 p-4 bg-white rounded-full shadow-lg border border-gray-100 transition-all duration-300 -translate-x-1/2 ${
            isBeginning ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rotate-180 text-gray-700">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>

        {/* Botão Direita */}
        <button 
          className={`btn-next absolute right-0 top-1/2 -translate-y-1/2 z-40 p-4 bg-white rounded-full shadow-lg border border-gray-100 translate-x-1/2 transition-all duration-300 ${
            isEnd ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>

      </div>

      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev { display: none !important; }
      `}</style>
    </section>
  );
}