'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

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

    // Reset das animações
    gsap.set([titleRef.current, headingRef.current, subtitleRef.current, ipadRef.current, ...cardsRef.current], {
      opacity: 0,
      y: 50
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      }
    })

    // Sequência de animações
    tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
      .to(headingRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
      .to(ipadRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "back.out(1.3)" }, "-=0.2")
      .to(cardsRef.current[0], { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.1")
      .to(cardsRef.current[1], { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
      .to(cardsRef.current[2], { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")

    // Hover via GSAP
    cardsRef.current.forEach(card => {
      if (!card) return
      
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { scale: 1.03, duration: 0.3, ease: "power2.out" })
      })
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { scale: 1, duration: 0.3, ease: "power2.out" })
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
      className="flex flex-col w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto my-12 md:my-20 bg-[#F4F4F4]"
    >
      {/* Texto */}
      <div className="flex flex-col items-center text-center w-full mb-12 text-black">
        <p 
          ref={titleRef}
          className="tracking-wide text-lg sm:text-xl mb-2 font-medium opacity-0"
        >
          Diagnóstico
        </p>

        <h1 
          ref={headingRef}
          className="font-bold text-3xl sm:text-4xl md:text-5xl mb-6 leading-tight max-w-4xl opacity-0"
        >
          Onde sua operação <span className="text-[#FFCC00]">aperta?</span>
        </h1>

        <h2 
          ref={subtitleRef}
          className="text-base sm:text-lg text-gray-600 font-medium leading-relaxed max-w-3xl opacity-0"
        >
          Seja para quem está dando o primeiro passo ou para quem já domina
          os canais de venda, a complexidade não deve ser um freio.
          Se identifique abaixo e veja como a Tegbe é o motor que faltava.
        </h2>
      </div>

      {/* iPad */}
      <div 
        ref={ipadRef}
        className="relative w-full max-w-[420px] sm:max-w-[480px] md:max-w-[520px] h-[420px] sm:h-[520px] md:h-[650px] mx-auto mb-16 opacity-0"
      >
        <Image
          src="/ipad.png"
          fill
          className="object-contain pointer-events-none drop-shadow-2xl"
          alt="Dashboard Tegbe no iPad"
          sizes="(max-width: 768px) 303px, 470px"
          quality={75}
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto text-black">
        
        {/* Card 1 */}
        <div 
          ref={(el) => setCardRef(el, 0)}
          className="bg-white p-8 rounded-2xl shadow-lg border-2 border-transparent hover:border-[#FFCC00] transition-colors duration-300 opacity-0 group cursor-default"
        >
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#FFCC00]/20 transition-colors">
             <span className="font-bold text-gray-400 group-hover:text-[#FFCC00]">1</span>
          </div>
          <h1 className="font-bold text-lg mb-3 leading-tight">
            Deseja começar do zero?
          </h1>
          <p className="font-medium text-gray-600 text-sm sm:text-base leading-relaxed">
            Você tem o produto, nós temos o mapa. Criamos sua presença digital do absoluto zero, com a estratégia de quem sabe onde o lucro está.
          </p>
        </div>

        {/* Card 2 */}
        <div 
          ref={(el) => setCardRef(el, 1)}
          className="bg-white p-8 rounded-2xl shadow-lg border-2 border-transparent hover:border-[#FFCC00] transition-colors duration-300 opacity-0 group cursor-default"
        >
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#FFCC00]/20 transition-colors">
             <span className="font-bold text-gray-400 group-hover:text-[#FFCC00]">2</span>
          </div>
          <h1 className="font-bold text-lg mb-3 leading-tight">
            Já vende no ML ou Shopee?
          </h1>
          <p className="font-medium text-gray-600 text-sm sm:text-base leading-relaxed">
            Se as vendas estagnaram ou a operação virou um caos, entramos com inteligência e braço operacional para destravar o próximo nível.
          </p>
        </div>

        {/* Card 3 */}
        <div 
          ref={(el) => setCardRef(el, 2)}
          className="bg-white p-8 rounded-2xl shadow-lg border-2 border-transparent hover:border-[#FFCC00] transition-colors duration-300 opacity-0 group cursor-default"
        >
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#FFCC00]/20 transition-colors">
             <span className="font-bold text-gray-400 group-hover:text-[#FFCC00]">3</span>
          </div>
          <h1 className="font-bold text-lg mb-3 leading-tight">
            Precisa de alta performance?
          </h1>
          <p className="font-medium text-gray-600 text-sm sm:text-base leading-relaxed">
            Sua estrutura existe, mas falta eficiência. Otimizamos anúncios, logística e margem para que cada centavo investido retorne com escala.
          </p>
        </div>

      </div>
    </section>
  )
}