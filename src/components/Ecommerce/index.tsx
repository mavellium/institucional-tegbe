'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- 1. INTERFACES (Definições Estritas para uso interno) ---
interface JsonCard {
  id: number;
  numero: string;
  titulo: string;
  descricao: string;
  visivel: boolean;
  classes: string;
}

interface JsonImagem {
  src: string;
  alt: string;
  visivel: boolean;
  classes: string;
  tamanhos: { mobile: string; desktop: string };
  dimensoes: { maxLargura: string; mobileAltura: string; tabletAltura: string; desktopAltura: string };
  qualidade: number;
}

interface JsonTexto {
  texto: string;
  visivel: boolean;
  classes: string;
  destaque?: string;
}

interface JsonConfig {
  animacao: any;
  layout: any;
  espacamento: any;
  cores: any;
}

// Interface COMPLETA (Interna)
export interface EcommerceJsonData {
  id: string;
  titulo: JsonTexto;
  heading: JsonTexto;
  subtitulo: JsonTexto;
  imagem: JsonImagem;
  cards: JsonCard[];
  configuracoes: JsonConfig;
}

// --- 2. INTERFACES DE ENTRADA (Permite dados parciais da API/Page) ---
// Isso resolve o erro de tipagem no page.tsx
export interface EcommerceInputData {
  id?: string;
  titulo?: Partial<JsonTexto>;
  heading?: Partial<JsonTexto>;
  subtitulo?: Partial<JsonTexto>;
  imagem?: Partial<JsonImagem>;
  cards?: Partial<JsonCard>[];
  configuracoes?: Partial<JsonConfig>;
}

interface EcommerceProps {
  data?: EcommerceInputData; // Aceita dados parciais agora
}

// --- 3. DADOS PADRÃO (Fallback) ---
const defaultEcommerceData: EcommerceJsonData = {
  id: "diagnostico-section",
  titulo: {
    texto: "Diagnóstico",
    visivel: true,
    classes: "tracking-wide text-lg sm:text-xl mb-2 font-medium"
  },
  heading: {
    texto: "Onde sua operação",
    destaque: "aperta?",
    visivel: true,
    classes: "font-bold text-3xl sm:text-4xl md:text-5xl mb-6 leading-tight max-w-4xl"
  },
  subtitulo: {
    texto: "Seja para quem está dando o primeiro passo ou para quem já domina os canais de venda, a complexidade não deve ser um freio. Se identifique abaixo e veja como a Tegbe é o motor que faltava.",
    visivel: true,
    classes: "text-base sm:text-lg text-gray-600 font-medium leading-relaxed max-w-3xl"
  },
  imagem: {
    src: "/ipad.png",
    alt: "Dashboard Tegbe no iPad",
    visivel: true,
    classes: "object-contain pointer-events-none drop-shadow-2xl",
    tamanhos: {
      mobile: "303px",
      desktop: "470px"
    },
    qualidade: 75,
    dimensoes: {
      maxLargura: "520px",
      mobileAltura: "420px",
      tabletAltura: "520px",
      desktopAltura: "650px"
    }
  },
  cards: [],
  configuracoes: {
    animacao: {
      habilitada: true,
      duracao: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        start: "top 75%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      },
      sequencia: {
        titulo: { delay: 0 },
        heading: { delay: -0.3 },
        subtitulo: { delay: -0.3 },
        imagem: { delay: -0.2, duracao: 0.7, ease: "back.out(1.3)" },
        cards: {
          card1: { delay: -0.1 },
          card2: { delay: -0.4 },
          card3: { delay: -0.4 }
        }
      },
      hover: {
        escala: 1.03,
        duracao: 0.3
      }
    },
    layout: {
      grid: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      gap: "gap-8",
      container: "max-w-6xl"
    },
    espacamento: {
      secao: "my-12 md:my-20",
      texto: "mb-12",
      imagem: "mb-16"
    },
    cores: {
      fundo: "bg-[#F4F4F4]",
      texto: "text-black",
      destaque: "#FFCC00",
      textoSecundario: "text-gray-600",
      card: {
        fundo: "bg-white",
        numero: {
          normal: "text-gray-400",
          hover: "text-[#FFCC00]"
        },
        circulo: {
          normal: "bg-gray-100",
          hover: "bg-[#FFCC00]/20"
        }
      }
    }
  }
};

// --- 4. FUNÇÃO DE MERGE (Robustez) ---
const mergeWithDefault = (apiData?: EcommerceInputData): EcommerceJsonData => {
  if (!apiData) return defaultEcommerceData;

  // Lógica de merge profundo manual para garantir segurança
  return {
    id: apiData.id || defaultEcommerceData.id,
    
    titulo: {
      ...defaultEcommerceData.titulo,
      ...apiData.titulo,
    },
    
    heading: {
      ...defaultEcommerceData.heading,
      ...apiData.heading,
    },
    
    subtitulo: {
      ...defaultEcommerceData.subtitulo,
      ...apiData.subtitulo,
    },
    
    imagem: {
      ...defaultEcommerceData.imagem,
      ...apiData.imagem,
      // Garante que sub-objetos não se percam se não vierem na API
      tamanhos: { ...defaultEcommerceData.imagem.tamanhos, ...(apiData.imagem?.tamanhos || {}) },
      dimensoes: { ...defaultEcommerceData.imagem.dimensoes, ...(apiData.imagem?.dimensoes || {}) },
    },
    
    // Configurações: Mescla profunda
    configuracoes: {
        ...defaultEcommerceData.configuracoes,
        ...apiData.configuracoes,
        cores: { ...defaultEcommerceData.configuracoes.cores, ...(apiData.configuracoes?.cores || {}) },
        animacao: { ...defaultEcommerceData.configuracoes.animacao, ...(apiData.configuracoes?.animacao || {}) },
        layout: { ...defaultEcommerceData.configuracoes.layout, ...(apiData.configuracoes?.layout || {}) },
        espacamento: { ...defaultEcommerceData.configuracoes.espacamento, ...(apiData.configuracoes?.espacamento || {}) },
    },

    // Cards: Mapeamento inteligente
    cards: (apiData.cards && apiData.cards.length > 0)
      ? apiData.cards.map((card, index) => ({
          // Valores padrão para um card genérico se faltar dado
          id: card?.id || index + 1,
          numero: card?.numero || String(index + 1),
          titulo: card?.titulo || "",
          descricao: card?.descricao || "",
          visivel: card?.visivel !== undefined ? card.visivel : true,
          classes: card?.classes || "bg-white p-8 rounded-2xl shadow-lg border-2 border-transparent hover:border-[#FFCC00] transition-colors duration-300 opacity-0 group cursor-default"
        }))
      : defaultEcommerceData.cards
  };
};

export default function Ecommerce({ data }: EcommerceProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLParagraphElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLHeadingElement>(null)
  const ipadRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  
  const [imageError, setImageError] = useState(false);

  // Processar dados (Merge)
  const ecommerceData = mergeWithDefault(data);
  const { titulo, heading, subtitulo, imagem, cards, configuracoes } = ecommerceData;

  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) cardsRef.current[index] = el
  }

  // --- ANIMAÇÕES GSAP ---
  useGSAP(() => {
    if (!sectionRef.current || !configuracoes.animacao.habilitada) return

    gsap.set([titleRef.current, headingRef.current, subtitleRef.current, ipadRef.current, ...cardsRef.current], {
      opacity: 0,
      y: 50
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: configuracoes.animacao.scrollTrigger.start,
        end: configuracoes.animacao.scrollTrigger.end,
        toggleActions: configuracoes.animacao.scrollTrigger.toggleActions,
      }
    })

    tl.to(titleRef.current, { 
      opacity: 1, y: 0, duration: configuracoes.animacao.duracao, ease: configuracoes.animacao.ease 
    })
    .to(headingRef.current, { 
      opacity: 1, y: 0, duration: configuracoes.animacao.duracao, ease: configuracoes.animacao.ease 
    }, configuracoes.animacao.sequencia.heading.delay)
    .to(subtitleRef.current, { 
      opacity: 1, y: 0, duration: configuracoes.animacao.duracao, ease: configuracoes.animacao.ease 
    }, configuracoes.animacao.sequencia.subtitulo.delay)
    .to(ipadRef.current, { 
      opacity: 1, y: 0, duration: configuracoes.animacao.sequencia.imagem.duracao, ease: configuracoes.animacao.sequencia.imagem.ease 
    }, configuracoes.animacao.sequencia.imagem.delay)
    
    cards.forEach((_, index) => {
        const cardKey = `card${index + 1}` as keyof typeof configuracoes.animacao.sequencia.cards;
        // Check seguro se a config de sequencia existe para esse card
        const delay = (configuracoes.animacao.sequencia.cards && configuracoes.animacao.sequencia.cards[cardKey])
             ? configuracoes.animacao.sequencia.cards[cardKey].delay 
             : -0.2;
        
        // Check se o ref existe antes de animar
        if (cardsRef.current[index]) {
            tl.to(cardsRef.current[index], { 
                opacity: 1, y: 0, duration: configuracoes.animacao.duracao, ease: configuracoes.animacao.ease 
            }, delay)
        }
    });

    cardsRef.current.forEach(card => {
      if (!card) return
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { scale: configuracoes.animacao.hover.escala, duration: configuracoes.animacao.hover.duracao, ease: configuracoes.animacao.ease })
      })
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { scale: 1, duration: configuracoes.animacao.hover.duracao, ease: configuracoes.animacao.ease })
      })
    })

  }, { dependencies: [], scope: sectionRef })

  return (
    <section 
      ref={sectionRef}
      id={ecommerceData.id}
      className={`flex flex-col w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto ${configuracoes.espacamento.secao} ${configuracoes.cores.fundo}`}
    >
      <div className={`flex flex-col items-center text-center w-full ${configuracoes.espacamento.texto} ${configuracoes.cores.texto}`}>
        {titulo.visivel && (
          <p ref={titleRef} className={`${titulo.classes} opacity-0`}>
            {titulo.texto}
          </p>
        )}

        {heading.visivel && (
          <h1 ref={headingRef} className={`${heading.classes} opacity-0`}>
            {heading.texto}{" "}
            {heading.destaque && (
                <span style={{ color: configuracoes.cores.destaque }}>{heading.destaque}</span>
            )}
          </h1>
        )}

        {subtitulo.visivel && (
          <h2 ref={subtitleRef} className={`${subtitulo.classes} opacity-0`}>
            {subtitulo.texto}
          </h2>
        )}
      </div>

      {imagem.visivel && (
        <div 
          ref={ipadRef}
          className={`relative w-full mx-auto ${configuracoes.espacamento.imagem} opacity-0`}
          style={{
             maxWidth: imagem.dimensoes.maxLargura,
             height: imagem.dimensoes.desktopAltura
          }}
        >
          <div className="relative w-full h-[300px] sm:h-[420px] md:h-[520px] lg:h-[650px]">
            <Image
                src={imagem.src}
                fill
                className={imagem.classes}
                alt={imagem.alt}
                sizes={`(max-width: 768px) ${imagem.tamanhos.mobile}, ${imagem.tamanhos.desktop}`}
                quality={imagem.qualidade}
                onError={() => setImageError(true)}
                unoptimized={true}
            />
          </div>
        </div>
      )}

      <div className={`grid ${configuracoes.layout.grid} ${configuracoes.layout.gap} w-full ${configuracoes.layout.container} mx-auto ${configuracoes.cores.texto}`}>
        {cards.filter(card => card.visivel).map((card, index) => (
          <div 
            key={card.id || index}
            ref={(el) => setCardRef(el, index)}
            className={card.classes}
          >
              <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 transition-colors ${configuracoes.cores.card.circulo.normal} hover:${configuracoes.cores.card.circulo.hover}`}
            >
              <span
                className={`font-bold transition-colors ${configuracoes.cores.card.numero.normal} hover:${configuracoes.cores.card.numero.hover}`}
              >
                {card.numero}
              </span>
            </div>
            <h3 className="font-bold text-lg mb-3 leading-tight">
              {card.titulo}
            </h3>
            <p className="font-medium text-gray-600 text-sm sm:text-base leading-relaxed">
              {card.descricao}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}