"use client";

import { useRef, useState, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Feature {
  id: string;
  step: string;
  title: string;
  description: string;
  image: string;
}

const Historia = () => {
  const [activeFeature, setActiveFeature] = useState(-1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentDesktopImage, setCurrentDesktopImage] = useState("/images/tegbe-origin.jpg");
  const [currentMobileImage, setCurrentMobileImage] = useState("/images/tegbe-origin.jpg");

  const sectionRef = useRef<HTMLDivElement>(null);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);
  const descriptionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const desktopImageContainerRef = useRef<HTMLDivElement>(null);
  const mobileImageContainerRef = useRef<HTMLDivElement>(null);
  const mobileTextContainerRef = useRef<HTMLDivElement>(null);
  const previousActiveFeatureRef = useRef<number>(-1);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const features: Feature[] = [
    {
      id: "1",
      step: "2022",
      title: "O Inconformismo",
      description: "Nascemos da frustração. Vimos o mercado queimando verba em 'hacks' que não funcionavam. Decidimos que a Tegbe seria guiada por uma única bússola: o ROI do cliente.",
      image: "/images/tegbe-origin.jpg"
    },
    {
      id: "2",
      step: "2023",
      title: "A Virada de Chave",
      description: "Abandonamos o feeling. Implementamos nossa stack proprietária de GA4 + Server Side Tracking. Paramos de adivinhar e começamos a prever resultados com precisão cirúrgica.",
      image: "/images/tegbe-data.jpg"
    },
    {
      id: "3",
      step: "2024",
      title: "Ecossistema Completo",
      description: "Não bastava apenas tráfego. Integramos Design de Conversão e CRM. A Tegbe deixou de ser uma agência de ads para se tornar um braço de Growth completo.",
      image: "/images/tegbe-team.jpg"
    },
    {
      id: "4",
      step: "2025",
      title: "A Era da IA",
      description: "Implementamos agentes autônomos para análise de dados e otimização de campanhas em tempo real. O que levava dias, agora fazemos em minutos.",
      image: "/images/tegbe-ai.jpg"
    },
    {
      id: "5",
      step: "Futuro",
      title: "Escala Infinita",
      description: "Nosso objetivo agora é verticalizar. Criar soluções específicas para nichos de alta performance, mantendo a boutique na estratégia e a máquina na execução.",
      image: "/images/tegbe-future.jpg"
    }
  ];

  const animateImageTransition = (
    containerRef: React.RefObject<HTMLDivElement | null>,
    newImage: string,
    setImage: (img: string) => void
  ) => {
    const container = containerRef.current;
    if (!container) {
      setImage(newImage);
      return;
    }

    gsap.killTweensOf(container);

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(container, { clearProps: "all" });
      }
    });

    tl.to(container, {
      opacity: 0,
      scale: 1.02,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => setImage(newImage)
    })
    .to(container, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "power2.out"
    }, "+=0.05");
  };

  useEffect(() => {
    if (activeFeature !== previousActiveFeatureRef.current) {
      const newImage = activeFeature >= 0 ? features[activeFeature].image : features[0].image;
      animateImageTransition(desktopImageContainerRef, newImage, setCurrentDesktopImage);
      animateImageTransition(mobileImageContainerRef, newImage, setCurrentMobileImage);
      previousActiveFeatureRef.current = activeFeature;
    }
  }, [activeFeature, features]);

  useLayoutEffect(() => {
    if (!buttonsContainerRef.current || !sectionRef.current) return;

    const buttons = buttonsContainerRef.current.querySelectorAll('.feature-button');
    const imagePanel = sectionRef.current.querySelector('.image-panel');
    
    gsap.set(buttons, { opacity: 0, x: -40 });
    gsap.set(imagePanel, { opacity: 0, x: 40, scale: 0.95 });

    timelineRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      }
    });

    timelineRef.current
      .to(buttons, {
        opacity: 1,
        x: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out"
      })
      .to(imagePanel, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.9,
        ease: "power3.out"
      }, "-=0.5");

      timelineRef.current.add(() => {
          if (activeFeature === -1) handleFeatureChange(0);
      }, "-=0.2");

    return () => {
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, []);

  const handleFeatureChange = (index: number) => {
    if (isTransitioning || index === activeFeature) return;
    setIsTransitioning(true);
    
    if (activeFeature !== -1 && descriptionsRef.current[activeFeature]) {
      gsap.to(descriptionsRef.current[activeFeature], {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      });
    }

    setActiveFeature(index);

    setTimeout(() => {
      if (descriptionsRef.current[index]) {
        gsap.fromTo(descriptionsRef.current[index],
          { height: 0, opacity: 0 },
          {
            height: "auto",
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => setIsTransitioning(false)
          }
        );
      } else {
          setIsTransitioning(false);
      }
    }, 250);
  };

  const handleNavigation = (direction: 'prev' | 'next') => {
    if (isTransitioning) return;
    const current = activeFeature === -1 ? 0 : activeFeature;
    let newIndex;
    if (direction === 'next') {
      newIndex = (current + 1) % features.length;
    } else {
      newIndex = (current - 1 + features.length) % features.length;
    }
    handleFeatureChange(newIndex);
  };

  const handleMobileNav = (direction: 'prev' | 'next') => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      const current = activeFeature === -1 ? 0 : activeFeature;
      const newIndex = direction === 'next' 
        ? (current + 1) % features.length 
        : (current - 1 + features.length) % features.length;

      gsap.to(mobileTextContainerRef.current, {
          y: -15, opacity: 0, duration: 0.25, ease: "power2.in",
          onComplete: () => {
              setActiveFeature(newIndex);
              gsap.fromTo(mobileTextContainerRef.current,
                  { y: 15, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", onComplete: () => setIsTransitioning(false) }
              );
          }
      });
  };

  return (
    <section ref={sectionRef} className="bg-[#F5F5F7] py-24 px-6 relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-gray-200/80 to-transparent rounded-full blur-[120px] pointer-events-none opacity-60" />

      <div className="mx-auto relative max-w-[1400px]">
        
        <div className="mb-12 md:mb-16 section-header">
            <h4 className="text-[#0071E3] font-bold tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-[#0071E3]"></span>
                Linha do Tempo
            </h4>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#1d1d1f] tracking-tight">
            A Evolução da Eficiência
            </h1>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden lg:flex flex-row overflow-hidden rounded-[40px] shadow-2xl shadow-black/20 bg-[#111111] border border-white/10 h-[650px] relative z-10">
          
          {/* Lado Esquerdo: Navegação */}
          <div className="w-[40%] p-10 flex flex-col relative bg-[#111111]">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#0071E3] via-[#0071E3]/50 to-transparent"></div>

            {/* AQUI ESTÁ A CORREÇÃO: Classes utilitárias do Tailwind para esconder o scrollbar em todos os navegadores */}
            <div className="flex-1 overflow-y-auto pr-4 py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div ref={buttonsContainerRef} className="flex flex-col space-y-2">
                {features.map((feature, index) => {
                  const isActive = activeFeature === index;
                  return (
                    <button
                      key={feature.id}
                      onClick={() => handleFeatureChange(index)}
                      disabled={isTransitioning}
                      className={`feature-button group w-full text-left transition-all duration-500 ease-out border-l-[3px] pl-6 py-5 relative rounded-r-2xl outline-none
                        ${isActive 
                          ? "border-[#0071E3] bg-gradient-to-r from-[#0071E3]/10 to-transparent" 
                          : "border-white/10 hover:border-white/30 hover:bg-white/[0.02]"
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`text-sm font-mono font-bold tracking-wider transition-colors duration-300 ${isActive ? "text-[#0071E3]" : "text-gray-500 group-hover:text-gray-400"}`}>
                            {feature.step}
                        </span>
                        <h3 className={`font-semibold text-xl transition-colors duration-300 ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
                            {feature.title}
                        </h3>
                      </div>

                      <div
                        ref={(el) => { descriptionsRef.current[index] = el }}
                        className="overflow-hidden"
                        style={{ height: 0, opacity: 0 }}
                      >
                        <p className="text-gray-400 mt-4 text-sm leading-relaxed font-light pr-6 pl-12 border-l border-white/10">
                            {feature.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            
            <div className="pt-6 mt-4 border-t border-white/10 flex justify-between items-center">
                <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Navegue pela história</span>
                <div className="flex gap-3">
                    <Button variant="ghost" onClick={() => handleNavigation('prev')} disabled={isTransitioning} className="text-white hover:bg-white/10 hover:text-[#0071E3] rounded-full h-11 w-11 p-0 border border-white/10 transition-all active:scale-95 disabled:opacity-50">
                        <Icon icon="ph:arrow-left-bold" width="18" />
                    </Button>
                    <Button variant="ghost" onClick={() => handleNavigation('next')} disabled={isTransitioning} className="text-white hover:bg-white/10 hover:text-[#0071E3] rounded-full h-11 w-11 p-0 border border-white/10 transition-all active:scale-95 disabled:opacity-50">
                        <Icon icon="ph:arrow-right-bold" width="18" />
                    </Button>
                </div>
            </div>
          </div>

          {/* Lado Direito: Visual */}
          <div className="w-[60%] relative bg-[#1a1a1a] image-panel overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-transparent to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent z-10 pointer-events-none" />
            
            <div 
              ref={desktopImageContainerRef}
              className="w-full h-full relative transform-gpu"
            >
                <Image
                  src={currentDesktopImage}
                  alt={activeFeature >= 0 ? features[activeFeature].title : "Tegbe História"}
                  fill
                  className="object-cover opacity-90" 
                  priority
                />
            </div>

            <div className="absolute bottom-8 right-8 z-20 flex flex-col items-end gap-2">
                <div className="px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg shadow-lg flex items-center gap-3">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider leading-none mb-1">Marco Atual</span>
                        <span className="text-sm text-white font-bold leading-none">
                            {activeFeature >= 0 ? features[activeFeature].step : features[0].step}
                        </span>
                    </div>
                    <div className="h-8 w-[1px] bg-white/20"></div>
                    <span className="text-xs text-[#0071E3] font-bold flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0071E3] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0071E3]"></span>
                        </span>
                        Validado
                    </span>
                </div>
            </div>
          </div>
        </div>

        {/* MOBILE LAYOUT */}
        <div className="lg:hidden bg-[#111111] rounded-[32px] overflow-hidden shadow-xl border border-white/10 relative z-10">
          <div className="relative aspect-[4/3] w-full bg-[#1a1a1a]">
            <div ref={mobileImageContainerRef} className="w-full h-full relative transform-gpu">
                <Image
                  src={currentMobileImage}
                  alt={activeFeature >= 0 ? features[activeFeature].title : "Feature"}
                  fill
                  className="object-cover opacity-90"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-transparent" />
          </div>

          <div className="p-6 relative -mt-16 z-10">
             <div className="flex justify-between items-start mb-6">
                <span className="px-3 py-1.5 bg-[#0071E3]/10 border border-[#0071E3]/30 text-[#0071E3] rounded-full text-xs font-mono font-bold tracking-wider backdrop-blur-sm shadow-sm">
                    {activeFeature >= 0 ? features[activeFeature].step : features[0].step}
                </span>
                <div className="flex gap-2 mt-1">
                    <button onClick={() => handleMobileNav('prev')} disabled={isTransitioning} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/5 flex items-center justify-center text-white active:scale-95 transition-all disabled:opacity-50">
                        <Icon icon="ph:caret-left-bold" width="20" />
                    </button>
                    <button onClick={() => handleMobileNav('next')} disabled={isTransitioning} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/5 flex items-center justify-center text-white active:scale-95 transition-all disabled:opacity-50">
                        <Icon icon="ph:caret-right-bold" width="20" />
                    </button>
                </div>
             </div>

             <div ref={mobileTextContainerRef} className="min-h-[160px]">
                <h3 className="text-2xl font-bold text-white mb-3">
                    {activeFeature >= 0 ? features[activeFeature].title : features[0].title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed font-light">
                    {activeFeature >= 0 ? features[activeFeature].description : features[0].description}
                </p>
             </div>

             <div className="flex justify-center items-center gap-3 mt-6 pt-6 border-t border-white/10">
                {features.map((_, i) => (
                    <button 
                        key={i}
                        onClick={() => !isTransitioning && handleFeatureChange(i)}
                        className={`rounded-full transition-all duration-500 ease-out ${
                            i === activeFeature 
                                ? "w-8 h-1.5 bg-[#0071E3]" 
                                : "w-1.5 h-1.5 bg-gray-700 hover:bg-gray-500"
                        }`}
                        aria-label={`Ir para o passo ${i + 1}`}
                    />
                ))}
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Historia;