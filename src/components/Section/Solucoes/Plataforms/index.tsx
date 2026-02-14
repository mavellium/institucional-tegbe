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
  cta?: {
    text: string;
    url: string;
    description?: string;
  };
}

export default function Plataforms() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [activeStep, setActiveStep] = useState<ItemPlataforma | null>(null);
  const [loading, setLoading] = useState(true);
  const [ctaData, setCtaData] = useState({
    text: "Quero Estruturar e Escalar Meu Negócio",
    url: "https://api.whatsapp.com/send?phone=5514991779502",
    description: "Integração completa de plataformas para escalar seus resultados."
  });

  // Referências para animações
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftColumnRef = useRef<HTMLDivElement>(null)
  const rightColumnRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const stepButtonsRef = useRef<(HTMLButtonElement | null)[]>([])
  const ctaRef = useRef<HTMLDivElement>(null)

  // --- FETCH DINÂMICO ---
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/api-tegbe/tegbe-institucional/json/plataformas');
        const result: ApiResponse = await response.json();
        
        if (result) {
          setData(result);
          
          // Define o primeiro item como ativo
          if (result.values && result.values.length > 0) {
            setActiveStep(result.values[0]);
          }
          
          // Define os dados do CTA (da API ou fallback)
          if (result.cta) {
            setCtaData({
              text: result.cta.text,
              url: result.cta.url,
              description: result.cta.description || "Integração completa de plataformas para escalar seus resultados."
            });
          }
        }
      } catch (error) {
        console.error("Mavellium Engine - Erro ao carregar plataformas:", error);
        // Fallback para dados estáticos em caso de erro
        const fallbackData: ApiResponse = {
          id: "fallback-plataformas",
          type: "Plataformas",
          subtype: "Plataformas que utilizamos para escalar seu negócio",
          values: [
            {
              id: 1,
              title: "Meta Ads",
              subtitle: "Gestão de Tráfego Pago",
              description: "Criamos e gerenciamos campanhas no Facebook e Instagram para alcançar seu público-alvo.",
              image: "/images/meta-ads.png"
            },
            {
              id: 2,
              title: "Google Ads",
              subtitle: "Publicidade no Google",
              description: "Anúncios no Google Search, Display e YouTube para capturar intenção de compra.",
              image: "/images/google-ads.png"
            }
          ],
          cta: {
            text: "Quero Estruturar e Escalar Meu Negócio",
            url: "https://api.whatsapp.com/send?phone=5514991779502",
            description: "Integração completa de plataformas para escalar seus resultados."
          }
        };
        setData(fallbackData);
        setActiveStep(fallbackData.values[0]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Animação de entrada (Sincronizada com Loading)
  useGSAP(() => {
    if (loading || !data || !sectionRef.current) return;

    // Reset para animações limpas
    gsap.set([leftColumnRef.current, rightColumnRef.current, ctaRef.current], { 
      opacity: 0, 
      y: 50 
    });

    // Animação da coluna esquerda
    gsap.to(leftColumnRef.current, {
      opacity: 1, 
      y: 0, 
      duration: 0.8, 
      ease: "power2.out",
      scrollTrigger: { 
        trigger: sectionRef.current, 
        start: "top 75%" 
      }
    });

    // Animação da coluna direita
    gsap.to(rightColumnRef.current, {
      opacity: 1, 
      y: 0, 
      duration: 0.8, 
      delay: 0.2, 
      ease: "power2.out",
      scrollTrigger: { 
        trigger: sectionRef.current, 
        start: "top 75%" 
      }
    });

    // Animação dos botões
    stepButtonsRef.current.forEach((button, index) => {
      if (!button) return;
      gsap.fromTo(button, 
        { opacity: 0, x: -30 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.6, 
          delay: 0.1 * index,
          scrollTrigger: { 
            trigger: leftColumnRef.current, 
            start: "top 80%" 
          }
        }
      );
    });

    // Animação do CTA
    gsap.to(ctaRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.4,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%"
      }
    });

  }, { dependencies: [loading, data], scope: sectionRef });

  const handleStepChange = (step: ItemPlataforma) => {
    if (!activeStep || step.id === activeStep.id || !data) return;

    const prevIndex = data.values.findIndex(s => s.id === activeStep.id);
    const nextIndex = data.values.findIndex(s => s.id === step.id);

    gsap.to([imageRef.current, titleRef.current, descriptionRef.current], {
      opacity: 0, 
      y: 20, 
      duration: 0.3, 
      ease: "power2.in",
      onComplete: () => {
        if (stepButtonsRef.current[prevIndex]) {
            gsap.to(stepButtonsRef.current[prevIndex], { 
              scale: 1, 
              duration: 0.3 
            });
        }
        setActiveStep(step);
        if (stepButtonsRef.current[nextIndex]) {
            gsap.to(stepButtonsRef.current[nextIndex], { 
              scale: 1.02, 
              duration: 0.4, 
              ease: "back.out(1.7)" 
            });
        }
        setTimeout(() => {
          gsap.set([imageRef.current, titleRef.current, descriptionRef.current], { 
            opacity: 0, 
            y: -20 
          });
          const tl = gsap.timeline();
          tl.to(imageRef.current, { 
            opacity: 1, 
            y: 0, 
            duration: 0.5 
          });
          tl.to(titleRef.current, { 
            opacity: 1, 
            y: 0, 
            duration: 0.4 
          }, "-=0.3");
          tl.to(descriptionRef.current, { 
            opacity: 1, 
            y: 0, 
            duration: 0.4 
          }, "-=0.2");
        }, 50);
      }
    });
  }

  // Loading State
  if (loading) {
    return (
      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto my-12 md:my-20 bg-[#F4F4F4] min-h-[500px] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  // Error State
  if (!data || !activeStep) {
    return (
      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto my-12 md:my-20 bg-[#F4F4F4] p-8">
        <p className="text-center text-gray-600">Erro ao carregar os dados das plataformas. Por favor, tente novamente.</p>
      </section>
    );
  }

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

      {/* CTA Dinâmico */}
      <div ref={ctaRef} className="reveal-text flex flex-col items-center mt-12">
        <a
          aria-label="Entre em contato pelo WhatsApp"
          href={ctaData.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all duration-300
            hover:scale-105 bg-black text-white shadow-lg hover:shadow-2xl
          `}
        >
          <span>{ctaData.text}</span>
          <Icon
            icon="lucide:arrow-right"
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
        {ctaData.description && (
          <p className="mt-4 text-[10px] font-medium tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-blue-500"></span>
            {ctaData.description}
          </p>
        )}
      </div>
    </section>
  )
}