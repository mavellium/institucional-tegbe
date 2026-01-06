'use client'

import { useState, useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

// Registrar o plugin ScrollTrigger apenas no cliente
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Interface para tipagem estrita
interface Step {
    id: string;
    image: string;
    title: string;
    subtitle: string;
    description: string;
}

const steps: Step[] = [
    {
        id: "venda-mais-ecommerce-0",
        image: "https://oaaddtqd6pehgldz.public.blob.vercel-storage.com/1767642104987-2.png",
        title: "Case 40k",
        subtitle: "R$40.000,00 de faturamento em 90 dias",
        description: "Em apenas 90 dias, estruturamos uma operação que saltou para R$ 40.000,00 de faturamento e mais de 650 vendas. Escala real para quem busca resultados sólidos."
    },
    {
        id: "venda-mais-ecommerce-1767642138009",
        image: "https://oaaddtqd6pehgldz.public.blob.vercel-storage.com/1767642157453-000.jpg",
        title: "Case 12k",
        subtitle: "Sua operação pronta para o jogo.",
        description: "Setup operacional completo. Criamos seus anúncios, produzimos fotografias que geram desejo e configuramos seus canais de venda para começar a faturar hoje."
    }
]

export default function SellMore() {
    const [activeStep, setActiveStep] = useState<Step>(steps[0])

    // Referências para animações
    const sectionRef = useRef<HTMLDivElement>(null)
    const leftColumnRef = useRef<HTMLDivElement>(null)
    const rightColumnRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const descriptionRef = useRef<HTMLParagraphElement>(null)
    const stepButtonsRef = useRef<(HTMLButtonElement | null)[]>([])

    // Inicializar a animação do primeiro step
    useEffect(() => {
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
        const validButtons = stepButtonsRef.current.filter((btn): btn is HTMLButtonElement => btn !== null)
        
        validButtons.forEach((button, index) => {
            gsap.set(button, {
                opacity: 0,
                x: -30,
                scale: index === 0 ? 1.02 : 1 // Primeiro botão já começa ativo visualmente
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
    const handleStepChange = (step: Step) => {
        if (step.id === activeStep.id) return

        // Encontrar índices baseados no array steps, não no ID
        const prevIndex = steps.findIndex(s => s.id === activeStep.id)
        const nextIndex = steps.findIndex(s => s.id === step.id)

        // Animação de saída do conteúdo atual
        gsap.to([imageRef.current, titleRef.current, descriptionRef.current], {
            opacity: 0,
            y: 20,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                // Voltar o botão anterior ao normal
                const prevButton = stepButtonsRef.current[prevIndex]
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
                const activeButton = stepButtonsRef.current[nextIndex]
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

    // Função para armazenar referências dos botões usando o índice do array
    const setStepButtonRef = (el: HTMLButtonElement | null, index: number) => {
        stepButtonsRef.current[index] = el
    }

    return (
        <section
            ref={sectionRef}
            className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto my-12 md:my-20 bg-[#F4F4F4]"
        >
            <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
                {/* ESQUERDA – Steps */}
                <div ref={leftColumnRef} className="w-full lg:w-1/2 opacity-0">
                    <p className="tracking-wide text-lg sm:text-lg mb-2 text-black font-bold">
                        Venda mais
                    </p>

                    <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl mb-8 leading-tight text-black">
                        Onde muitos veem dificuldade,
                        nossos parceiros encontram lucro.
                    </h1>

                    <div className="flex flex-col gap-4">
                        {steps.map((step, index) => (
                            <button
                                aria-label={step.title}
                                key={step.id}
                                ref={(el) => setStepButtonRef(el, index)}
                                onClick={() => handleStepChange(step)}
                                className={`text-left p-5 rounded-xl border transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg
                  ${activeStep.id === step.id
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
                        <Image
                            ref={imageRef}
                            fill
                            src={activeStep.image}
                            className="absolute inset-0 w-full h-full object-contain"
                            alt={activeStep.title}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={activeStep.id === steps[0].id} // Prioriza carregamento da 1ª imagem
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