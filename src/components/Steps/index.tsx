'use client'

import { useState, useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registrar o plugin ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    id: 1,
    title: 'Aprender',
    subtitle: 'Do zero ao primeiro faturamento.',
    description:
      'Validamos seu nicho e construímos sua base. Ideal para quem busca segurança no primeiro passo.',
    image: '/steps1.png',
  },
  {
    id: 2,
    title: 'Começar',
    subtitle: 'Sua operação pronta para o jogo.',
    description:
      'Setup operacional completo. Criamos seus anúncios, produzimos fotografias que geram desejo e configuramos seus canais de venda para começar a faturar hoje.',
    image: '/steps1.png',
  },
  {
    id: 3,
    title: 'Estruturar',
    subtitle: 'Organize o caos. Escale com segurança.',
    description:
      'Gestão de processos e integração 360º. Para quem já vende, mas precisa de braço operacional para gerenciar estoque, pedidos e atendimento sem perder o fôlego.',
    image: '/steps1.png',
  },
  {
    id: 4,
    title: 'Performar',
    subtitle: 'Máxima eficiência e lucratividade.',
    description:
      'O nível de elite do E-commerce. Otimização agressiva de margem, tráfego pago de alta performance e domínio de Share of Shelf em marketplaces.',
    image: '/steps1.png',
  },
]

export default function Steps() {
  const [activeStep, setActiveStep] = useState(steps[0])
  
  // Referências para animações
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftColumnRef = useRef<HTMLDivElement>(null)
  const rightColumnRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const stepButtonsRef = useRef<HTMLButtonElement[]>([])

  // Inicializar a animação do primeiro step
  useEffect(() => {
    // Resetar o primeiro botão para estado ativo
    const firstButton = stepButtonsRef.current[0]
    if (firstButton) {
      gsap.set(firstButton, { scale: 1.02 })
    }
  }, [])

  // Animação de entrada da seção
  useGSAP(() => {
    if (!sectionRef.current) return

    // Reset das animações
    gsap.set([leftColumnRef.current, rightColumnRef.current], {
      opacity: 0,
      y: 50
    })

    // Animar coluna esquerda
    const leftAnimation = gsap.to(leftColumnRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      }
    })

    // Animar coluna direita com atraso
    const rightAnimation = gsap.to(rightColumnRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      }
    })

    // Animar cada botão individualmente
    const stepButtons = stepButtonsRef.current.filter(Boolean)
    stepButtons.forEach((button, index) => {
      gsap.set(button, { 
        opacity: 0, 
        x: -30,
        scale: index === 0 ? 1.02 : 1 // Primeiro botão já começa ativo
      })
      
      gsap.to(button, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        delay: 0.1 * index,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: leftColumnRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        }
      })
    })

    return () => {
      leftAnimation.kill()
      rightAnimation.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, { dependencies: [], scope: sectionRef })

  // Animação de troca de step
  const handleStepChange = (step: typeof steps[0]) => {
    if (step.id === activeStep.id) return
    
    // Animação de saída do conteúdo atual
    gsap.to([imageRef.current, titleRef.current, descriptionRef.current], {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        // Voltar o botão anterior ao normal
        const prevButton = stepButtonsRef.current[activeStep.id - 1]
        if (prevButton) {
          gsap.to(prevButton, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          })
        }
        
        // Atualizar o step ativo
        setActiveStep(step)
        
        // Animar o botão ativo com pulso
        const activeButton = stepButtonsRef.current[step.id - 1]
        if (activeButton) {
          gsap.to(activeButton, {
            scale: 1.02,
            duration: 0.4,
            ease: "back.out(1.7)"
          })
        }
        
        // Animação de entrada do novo conteúdo
        setTimeout(() => {
          gsap.set([imageRef.current, titleRef.current, descriptionRef.current], {
            opacity: 0,
            y: -20
          })
          
          const enterAnimation = gsap.timeline()
          
          enterAnimation.to(imageRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
          })
          
          enterAnimation.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            delay: 0.1,
            ease: "power2.out"
          }, "-=0.3")
          
          enterAnimation.to(descriptionRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            delay: 0.1,
            ease: "power2.out"
          }, "-=0.2")
        }, 50)
      }
    })
  }

  // Função para armazenar referências dos botões
  const setStepButtonRef = (el: HTMLButtonElement | null, index: number) => {
    if (el) {
      stepButtonsRef.current[index] = el
    }
  }

  return (
    <section 
      ref={sectionRef}
      className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto my-12 md:my-20 bg-[#F4F4F4]"
    >
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        {/* ESQUERDA – Steps */}
        <div ref={leftColumnRef} className="w-full lg:w-1/2 opacity-0">
          <p className="tracking-wide text-lg sm:text-xl mb-2 text-black">
            E-commerce
          </p>

          <h1 className="font-bold text-2xl sm:text-4xl md:text-5xl mb-8 leading-tight text-black">
            Em qual estágio está a sua ambição no digital?
          </h1>

          <div className="flex flex-col gap-4">
            {steps.map(step => (
              <button
                key={step.id}
                ref={(el) => setStepButtonRef(el, step.id - 1)}
                onClick={() => handleStepChange(step)}
                className={`text-left p-5 rounded-xl border transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg
                  ${
                    activeStep.id === step.id
                      ? 'bg-white border-blue-500 shadow-lg'
                      : 'bg-transparent border-gray-200 hover:bg-white'
                  }
                `}
              >
                <h1 className="font-bold text-base text-black">
                  {step.title}
                </h1>
                <p className="text-sm text-gray-600">
                  {step.subtitle}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* DIREITA – Conteúdo dinâmico */}
        <div ref={rightColumnRef} className="w-full lg:w-1/2 flex flex-col items-center text-center opacity-0">
          <div className="relative w-full max-w-[420px] sm:max-w-[480px] md:max-w-[520px] 
            h-[280px] sm:h-[320px] md:h-[380px] lg:h-[420px] mb-6">
            <img
              ref={imageRef}
              src={activeStep.image}
              className="absolute inset-0 w-full h-full object-contain"
              alt={activeStep.title}
            />
          </div>

          <h2 
            ref={titleRef}
            className="font-bold text-xl sm:text-2xl mb-3 text-black"
          >
            {activeStep.subtitle}
          </h2>

          <p 
            ref={descriptionRef}
            className="text-sm sm:text-base text-gray-700 max-w-md"
          >
            {activeStep.description}
          </p>
        </div>
      </div>
    </section>
  )
}