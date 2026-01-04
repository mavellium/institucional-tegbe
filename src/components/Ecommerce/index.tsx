'use client'

import { useRef, useState } from 'react' // Adicionei useState
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

// Registrar o plugin ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Interface para os dados da API
export interface EcommerceApiData {
  titulo?: {
    texto?: string;
    visivel?: boolean;
  };
  heading?: {
    texto?: string;
    destaque?: string;
    visivel?: boolean;
  };
  subtitulo?: {
    texto?: string;
    visivel?: boolean;
  };
  imagem?: {
    src?: string;
    alt?: string;
    visivel?: boolean;
  };
  cards?: Array<{
    id?: number;
    numero?: string;
    titulo?: string;
    descricao?: string;
    visivel?: boolean;
  }>;
}

interface EcommerceProps {
  data?: EcommerceApiData;
}

// Dados padrão (fallback)
const defaultEcommerceData = {
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
    src: "/ipad.png", // IMAGEM LOCAL
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
  cards: [
    {
      id: 1,
      numero: "1",
      titulo: "Deseja começar do zero?",
      descricao: "Você tem o produto, nós temos o mapa. Criamos sua presença digital do absoluto zero, com a estratégia de quem sabe onde o lucro está.",
      visivel: true,
      classes: "bg-white p-8 rounded-2xl shadow-lg border-2 border-transparent hover:border-[#FFCC00] transition-colors duration-300 opacity-0 group cursor-default"
    },
    {
      id: 2,
      numero: "2",
      titulo: "Já vende no ML ou Shopee?",
      descricao: "Se as vendas estagnaram ou a operação virou um caos, entramos com inteligência e braço operacional para destravar o próximo nível.",
      visivel: true,
      classes: "bg-white p-8 rounded-2xl shadow-lg border-2 border-transparent hover:border-[#FFCC00] transition-colors duration-300 opacity-0 group cursor-default"
    },
    {
      id: 3,
      numero: "3",
      titulo: "Precisa de alta performance?",
      descricao: "Sua estrutura existe, mas falta eficiência. Otimizamos anúncios, logística e margem para que cada centavo investido retorne com escala.",
      visivel: true,
      classes: "bg-white p-8 rounded-2xl shadow-lg border-2 border-transparent hover:border-[#FFCC00] transition-colors duration-300 opacity-0 group cursor-default"
    }
  ],
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

// Função para mesclar dados da API com padrão
const mergeWithDefault = (apiData?: EcommerceApiData) => {
  const defaultData = defaultEcommerceData;
  
  if (!apiData) return defaultData;

  // Mesclar dados
  const mergedData = {
    ...defaultData,
    titulo: {
      ...defaultData.titulo,
      ...(apiData.titulo?.texto && { texto: apiData.titulo.texto }),
      ...(apiData.titulo?.visivel !== undefined && { visivel: apiData.titulo.visivel }),
    },
    heading: {
      ...defaultData.heading,
      ...(apiData.heading?.texto && { texto: apiData.heading.texto }),
      ...(apiData.heading?.destaque && { destaque: apiData.heading.destaque }),
      ...(apiData.heading?.visivel !== undefined && { visivel: apiData.heading.visivel }),
    },
    subtitulo: {
      ...defaultData.subtitulo,
      ...(apiData.subtitulo?.texto && { texto: apiData.subtitulo.texto }),
      ...(apiData.subtitulo?.visivel !== undefined && { visivel: apiData.subtitulo.visivel }),
    },
    imagem: {
      ...defaultData.imagem,
      // Só usa a imagem da API se for uma URL válida e local
      src: (apiData.imagem?.src && (apiData.imagem.src.startsWith('/') || apiData.imagem.src.startsWith('http'))) 
        ? apiData.imagem.src 
        : defaultData.imagem.src,
      alt: apiData.imagem?.alt || defaultData.imagem.alt,
      visivel: apiData.imagem?.visivel !== undefined ? apiData.imagem.visivel : defaultData.imagem.visivel,
    },
    cards: defaultData.cards.map((defaultCard, index) => {
      const apiCard = apiData.cards?.[index];
      if (!apiCard) return defaultCard;
      
      return {
        ...defaultCard,
        ...(apiCard.numero && { numero: apiCard.numero }),
        ...(apiCard.titulo && { titulo: apiCard.titulo }),
        ...(apiCard.descricao && { descricao: apiCard.descricao }),
        ...(apiCard.visivel !== undefined && { visivel: apiCard.visivel }),
      };
    })
  };

  return mergedData;
};

// Função para verificar se é uma URL externa
const isExternalUrl = (url: string): boolean => {
  return url.startsWith('http://') || url.startsWith('https://');
};

export default function Ecommerce({ data }: EcommerceProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLParagraphElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLHeadingElement>(null)
  const ipadRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  
  // Estado para controlar erro de imagem
  const [imageError, setImageError] = useState(false);

  // Usar dados mesclados (API + padrão)
  const ecommerceData = mergeWithDefault(data);
  
  // Destructuring dos dados
  const { 
    titulo, 
    heading, 
    subtitulo, 
    imagem, 
    cards, 
    configuracoes 
  } = ecommerceData;

  // Função para armazenar referências dos cards
  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      cardsRef.current[index] = el
    }
  }

  // Animação de entrada da seção em sequência
  useGSAP(() => {
    if (!sectionRef.current || !configuracoes.animacao.habilitada) return

    // Reset das animações
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

    // Sequência de animações dinâmicas
    tl.to(titleRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: configuracoes.animacao.duracao, 
      ease: configuracoes.animacao.ease 
    })
    .to(headingRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: configuracoes.animacao.duracao, 
      ease: configuracoes.animacao.ease 
    }, configuracoes.animacao.sequencia.heading.delay)
    .to(subtitleRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: configuracoes.animacao.duracao, 
      ease: configuracoes.animacao.ease 
    }, configuracoes.animacao.sequencia.subtitulo.delay)
    .to(ipadRef.current, { 
      opacity: 1, 
      y: 0, 
      duration: configuracoes.animacao.sequencia.imagem.duracao, 
      ease: configuracoes.animacao.sequencia.imagem.ease 
    }, configuracoes.animacao.sequencia.imagem.delay)
    .to(cardsRef.current[0], { 
      opacity: 1, 
      y: 0, 
      duration: configuracoes.animacao.duracao, 
      ease: configuracoes.animacao.ease 
    }, configuracoes.animacao.sequencia.cards.card1.delay)
    .to(cardsRef.current[1], { 
      opacity: 1, 
      y: 0, 
      duration: configuracoes.animacao.duracao, 
      ease: configuracoes.animacao.ease 
    }, configuracoes.animacao.sequencia.cards.card2.delay)
    .to(cardsRef.current[2], { 
      opacity: 1, 
      y: 0, 
      duration: configuracoes.animacao.duracao, 
      ease: configuracoes.animacao.ease 
    }, configuracoes.animacao.sequencia.cards.card3.delay)

    // Hover dinâmico para os cards
    cardsRef.current.forEach(card => {
      if (!card) return
      
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { 
          scale: configuracoes.animacao.hover.escala, 
          duration: configuracoes.animacao.hover.duracao, 
          ease: configuracoes.animacao.ease 
        })
      })
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { 
          scale: 1, 
          duration: configuracoes.animacao.hover.duracao, 
          ease: configuracoes.animacao.ease 
        })
      })
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, { dependencies: [], scope: sectionRef })

  return (
    <section 
      ref={sectionRef}
      className={`flex flex-col w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto ${configuracoes.espacamento.secao} ${configuracoes.cores.fundo}`}
    >
      {/* Texto */}
      <div className={`flex flex-col items-center text-center w-full ${configuracoes.espacamento.texto} ${configuracoes.cores.texto}`}>
        {titulo.visivel && (
          <p 
            ref={titleRef}
            className={`${titulo.classes} opacity-0`}
          >
            {titulo.texto}
          </p>
        )}

        {heading.visivel && (
          <h1 
            ref={headingRef}
            className={`${heading.classes} opacity-0`}
          >
            {heading.texto}{" "}
            <span className="text-[#FFCC00]">{heading.destaque}</span>
          </h1>
        )}

        {subtitulo.visivel && (
          <h2 
            ref={subtitleRef}
            className={`${subtitulo.classes} opacity-0`}
          >
            {subtitulo.texto}
          </h2>
        )}
      </div>

      {/* Imagem */}
      {imagem.visivel && (
        <div 
          ref={ipadRef}
          className={`relative w-full max-w-[420px] sm:max-w-[480px] md:max-w-[${imagem.dimensoes.maxLargura}] h-[${imagem.dimensoes.mobileAltura}] sm:h-[${imagem.dimensoes.tabletAltura}] md:h-[${imagem.dimensoes.desktopAltura}] mx-auto ${configuracoes.espacamento.imagem} opacity-0`}
        >
          <Image
            src={imagem.src}
            fill
            className={imagem.classes}
            alt={imagem.alt}
            sizes={`(max-width: 768px) ${imagem.tamanhos.mobile}, ${imagem.tamanhos.desktop}`}
            quality={imagem.qualidade}
            onError={() => setImageError(true)}
            unoptimized={isExternalUrl(imagem.src) || imageError}
          />
        </div>
      )}

      {/* Cards */}
      <div className={`grid ${configuracoes.layout.grid} ${configuracoes.layout.gap} w-full ${configuracoes.layout.container} mx-auto ${configuracoes.cores.texto}`}>
        {cards.filter(card => card.visivel).map((card, index) => (
          <div 
            key={card.id}
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
            <h1 className="font-bold text-lg mb-3 leading-tight">
              {card.titulo}
            </h1>
            <p className="font-medium text-gray-600 text-sm sm:text-base leading-relaxed">
              {card.descricao}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}