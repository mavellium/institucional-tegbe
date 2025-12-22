'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registrar o plugin ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Ecommerce() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLParagraphElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLHeadingElement>(null)
  const ipadRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  // Função para armazenar referências dos cards
  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      cardsRef.current[index] = el
    }
  }

  // Animação de entrada da seção em sequência
  useGSAP(() => {
    if (!sectionRef.current) return

    // Reset das animações - esconder todos os elementos
    gsap.set([titleRef.current, headingRef.current, subtitleRef.current, ipadRef.current, ...cardsRef.current], {
      opacity: 0,
      y: 50
    })

    // Criar uma timeline para a sequência de animações
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      }
    })

    // Sequência de animações
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    })
    .to(headingRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3") // Começa 0.3s antes do término da animação anterior
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3")
    .to(ipadRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "back.out(1.3)"
    }, "-=0.2")
    .to(cardsRef.current[0], {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.1")
    .to(cardsRef.current[1], {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    .to(cardsRef.current[2], {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")

    // Adicionar animação de hover com GSAP para mais suavidade
    cardsRef.current.forEach(card => {
      if (!card) return
      
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.03,
          duration: 0.3,
          ease: "power2.out"
        })
      })
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
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
      className="flex flex-col w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto my-8 md:my-16 bg-[#F4F4F4]"
    >
      {/* Texto */}
      <div className="flex flex-col items-center text-center w-full mb-10 text-black">
        <p 
          ref={titleRef}
          className="tracking-wide text-lg sm:text-xl mb-2 opacity-0"
        >
          E-commerce
        </p>

        <h1 
          ref={headingRef}
          className="font-bold text-2xl sm:text-4xl md:text-5xl mb-5 leading-tight max-w-4xl opacity-0"
        >
          Em qual estágio está a sua ambição no digital?
        </h1>

        <h2 
          ref={subtitleRef}
          className="text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-3xl opacity-0"
        >
          Seja para quem está dando o primeiro passo ou para quem já domina
          os canais de venda, a complexidade do e-commerce não deve ser um
          freio para o seu crescimento. Se você se identifica com uma das
          situações abaixo, a Tegbe é o motor que faltava na sua operação.
        </h2>
      </div>

      {/* iPad */}
      <div 
        ref={ipadRef}
        className="relative w-full max-w-[420px] sm:max-w-[480px] md:max-w-[520px] h-[420px] sm:h-[520px] md:h-[650px] mx-auto mb-12 opacity-0"
      >
        <img
          src="/ipad.png"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          alt="iPad frame"
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto text-black">
        
        <div 
          ref={(el) => setCardRef(el, 0)}
          className="bg-white p-6 rounded-xl shadow-lg border-2 border-transparent hover:border-blue-500 transition opacity-0"
        >
          <h3 className="font-bold text-base mb-4">
            Deseja começar do zero?
          </h3>
          <p className="font-medium text-sm sm:text-base">
            Você tem o produto, nós temos o mapa. Criamos sua presença digital do absoluto zero, com a estratégia de quem sabe onde o lucro está.
          </p>
        </div>

        <div 
          ref={(el) => setCardRef(el, 1)}
          className="bg-white p-6 rounded-xl shadow-lg border-2 border-transparent hover:border-blue-500 transition opacity-0"
        >
          <h3 className="font-bold text-base mb-4">
            Já vende no Mercado Livre ou Shopee?
          </h3>
          <p className="font-medium text-sm sm:text-base">
            Se as vendas estagnaram ou a operação se tornou um caos, nós entramos com a inteligência e o braço operacional para destravar o seu próximo nível de faturamento.
          </p>
        </div>

        <div 
          ref={(el) => setCardRef(el, 2)}
          className="bg-white p-6 rounded-xl shadow-lg border-2 border-transparent hover:border-blue-500 transition opacity-0"
        >
          <h3 className="font-bold text-base mb-4">
            Precisa de performance profissional?
          </h3>
          <p className="font-medium text-sm sm:text-base">
            Sua estrutura existe, mas falta eficiência. Otimizamos seus anúncios, sua logística e sua margem para que cada centavo investido retorne com escala.
          </p>
        </div>

      </div>
    </section>
  )
}