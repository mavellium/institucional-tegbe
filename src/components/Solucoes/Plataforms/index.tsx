'use client'

import { useState, useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { Icon } from '@iconify/react'

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ItemPlataforma {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

interface ApiResponse {
  id: string;
  type: string;    // Tag (se houver no dashboard)
  subtype: string; // Título Principal
  values: ItemPlataforma[];
}

export default function Plataforms() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [activeStep, setActiveStep] = useState<ItemPlataforma | null>(null);
  const [loading, setLoading] = useState(true);

  // Referências para animações
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftColumnRef = useRef<HTMLDivElement>(null)
  const rightColumnRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const stepButtonsRef = useRef<(HTMLButtonElement | null)[]>([])

  // --- FETCH DINÂMICO ---
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/api-tegbe/tegbe-institucional/json/plataformas');
        const result: ApiResponse = await response.json();
        
        if (result.values && result.values.length > 0) {
          setData(result);
          setActiveStep(result.values[0]);
        }
      } catch (error) {
        console.error("Mavellium Engine - Erro ao carregar plataformas:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Animação de entrada (Sincronizada com Loading)
  useGSAP(() => {
    if (loading || !data || !sectionRef.current) return;

    gsap.set([leftColumnRef.current, rightColumnRef.current], { opacity: 0, y: 50 });

    gsap.to(leftColumnRef.current, {
      opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
    });

    gsap.to(rightColumnRef.current, {
      opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
    });

    stepButtonsRef.current.forEach((button, index) => {
      if (!button) return;
      gsap.fromTo(button, 
        { opacity: 0, x: -30 },
        { 
          opacity: 1, x: 0, duration: 0.6, delay: 0.1 * index,
          scrollTrigger: { trigger: leftColumnRef.current, start: "top 80%" }
        }
      );
    });
  }, { dependencies: [loading, data], scope: sectionRef });

  const handleStepChange = (step: ItemPlataforma) => {
    if (!activeStep || step.id === activeStep.id || !data) return;

    const prevIndex = data.values.findIndex(s => s.id === activeStep.id);
    const nextIndex = data.values.findIndex(s => s.id === step.id);

    gsap.to([imageRef.current, titleRef.current, descriptionRef.current], {
      opacity: 0, y: 20, duration: 0.3, ease: "power2.in",
      onComplete: () => {
        if (stepButtonsRef.current[prevIndex]) {
            gsap.to(stepButtonsRef.current[prevIndex], { scale: 1, duration: 0.3 });
        }
        setActiveStep(step);
        if (stepButtonsRef.current[nextIndex]) {
            gsap.to(stepButtonsRef.current[nextIndex], { scale: 1.02, duration: 0.4, ease: "back.out(1.7)" });
        }
        setTimeout(() => {
          gsap.set([imageRef.current, titleRef.current, descriptionRef.current], { opacity: 0, y: -20 });
          const tl = gsap.timeline();
          tl.to(imageRef.current, { opacity: 1, y: 0, duration: 0.5 });
          tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.4 }, "-=0.3");
          tl.to(descriptionRef.current, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2");
        }, 50);
      }
    });
  }

  if (loading || !data || !activeStep) return null;

  return (
    <section ref={sectionRef} className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto my-12 md:my-20 bg-[#F4F4F4]">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        
        {/* ESQUERDA – Conteúdo Dinâmico */}
        <div ref={leftColumnRef} className="w-full lg:w-1/2">
          {data.type && (
            <p className="tracking-wide text-lg mb-2 text-blue-600 font-bold uppercase">
              {data.type}
            </p>
          )}

          <h1 className="font-bold text-2xl sm:text-4xl md:text-5xl mb-8 leading-tight text-black">
            {data.subtype}
          </h1>

          <div className="flex flex-col gap-4">
            {data.values.map((step, index) => (
              <button
                key={step.id}
                ref={(el) => { stepButtonsRef.current[index] = el }}
                onClick={() => handleStepChange(step)}
                className={`text-left p-5 rounded-xl border transition-all duration-300 transform
                  ${activeStep.id === step.id
                    ? 'bg-white border-blue-500 shadow-lg scale-[1.02]'
                    : 'bg-transparent border-gray-200 hover:bg-white'
                  }
                `}
              >
                <h1 className="font-bold text-base text-black">{step.title}</h1>
                <p className="text-sm text-gray-600">{step.subtitle}</p>
              </button>
            ))}
          </div>
        </div>

        {/* DIREITA – Visual Dinâmico */}
        <div ref={rightColumnRef} className="w-full lg:w-1/2 flex flex-col items-center text-center">
          <div className="relative w-full max-w-[420px] h-[280px] md:h-[420px] mb-6">
            <Image
              ref={imageRef}
              fill
              src={activeStep.image}
              className="object-contain"
              alt={activeStep.title}
              priority
            />
          </div>

          <h2 ref={titleRef} className="font-bold text-xl sm:text-2xl mb-3 text-black">
            {activeStep.subtitle}
          </h2>

          <p ref={descriptionRef} className="text-sm sm:text-base text-gray-700 max-w-md leading-relaxed">
            {activeStep.description}
          </p>
        </div>
      </div>
      {/* CTA */}
            <div className="reveal-text flex flex-col items-center mt-12">
              <a
                aria-label="Entre em contato pelo WhatsApp"
                href="https://api.whatsapp.com/send?phone=5514991779502"
                target="_blank"
                rel="noopener noreferrer"
                className={`
                            group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all duration-300
                            hover:scale-105 bg-black text-white shadow-lg hover:shadow-2xl
                          `}
              >
                <span>Quero Estruturar e Escalar Meu Negócio</span>
                <Icon
                  icon="lucide:arrow-right"
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
    </section>
  )
}