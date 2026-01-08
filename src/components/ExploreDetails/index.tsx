"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "../ui/button"; 
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Interface baseada no objeto "values" da API
export interface ServiceFeature {
  id: string;
  title: string;
  description: string;
  image: string; // A API retorna uma única imagem
  icon: string;
}

interface ExploreDetailsProps {
  features: ServiceFeature[];
}

const ExploreDetails = ({ features = [] }: ExploreDetailsProps) => {
  // Se não houver dados, não renderiza a seção para evitar erros
  if (!features || features.length === 0) return null;

  const [activeFeature, setActiveFeature] = useState(0); 
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Inicializa com a primeira imagem da API ou uma string vazia segura
  const [currentImage, setCurrentImage] = useState(features[0]?.image || "");
  
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const descriptionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);
  const mobileTextContainerRef = useRef<HTMLDivElement>(null);
  const desktopImageContainerRef = useRef<HTMLDivElement>(null);
  const mobileImageContainerRef = useRef<HTMLDivElement>(null);
  const previousActiveFeatureRef = useRef<number>(-1);

  // Efeito para sincronizar a imagem inicial quando os dados carregam
  useEffect(() => {
    if (features.length > 0 && previousActiveFeatureRef.current === -1) {
        setCurrentImage(features[0].image);
    }
  }, [features]);

  // Função para animar a transição de imagem
  const animateImageTransition = (
    containerRef: React.RefObject<HTMLDivElement | null>, 
    newImage: string,
    callback?: () => void
  ) => {
    const container = containerRef.current;
    if (!container) {
      setCurrentImage(newImage);
      callback?.();
      return;
    }

    gsap.to(container, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setCurrentImage(newImage); // Atualiza o estado único da imagem
        setTimeout(() => {
          gsap.to(container, {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            onComplete: callback
          });
        }, 50);
      }
    });
  };

  // Efeito de mudança de slide
  useEffect(() => {
    // Evita rodar na primeira renderização se já estiver setado
    if (previousActiveFeatureRef.current !== activeFeature) {
      const newImage = features[activeFeature]?.image || "";
      
      // Anima ambos os containers (Desktop e Mobile usam a mesma imagem da API por enquanto)
      animateImageTransition(desktopImageContainerRef, newImage);
      animateImageTransition(mobileImageContainerRef, newImage);
      
      previousActiveFeatureRef.current = activeFeature;
    }
  }, [activeFeature, features]);

  // Animação de entrada dos botões (ScrollTrigger)
  useEffect(() => {
    if (!buttonsContainerRef.current || features.length === 0) return;

    // Limpa animações anteriores para evitar conflitos em re-renders
    const buttons = buttonsContainerRef.current.querySelectorAll('.feature-button');
    gsap.killTweensOf(buttons);
    
    gsap.set(buttons, { opacity: 0, x: -30 });

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      onEnter: () => {
        gsap.to(buttons, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        });
      }
    });

    return () => trigger.kill();

  }, [features.length]);

  const resetButtonToInactive = (index: number) => {
    if (buttonsRef.current[index]) {
      gsap.to(buttonsRef.current[index], {
        backgroundColor: "rgba(255, 255, 255, 0.03)", 
        borderColor: "rgba(255, 255, 255, 0.05)",
        scale: 1,
        duration: 0.3
      });
    }
    if (descriptionsRef.current[index]) {
      gsap.to(descriptionsRef.current[index], {
        height: 0,
        opacity: 0,
        marginTop: 0,
        duration: 0.3
      });
    }
    const icon = buttonsRef.current[index]?.querySelector('.feature-icon');
    if(icon) gsap.to(icon, { color: "#6B7280", duration: 0.3 }); 
  };

  const handleFeatureChange = (index: number) => {
    if (isTransitioning || index === activeFeature) return;

    setIsTransitioning(true);
    
    if (activeFeature !== -1) resetButtonToInactive(activeFeature);

    setActiveFeature(index);

    if (buttonsRef.current[index]) {
      gsap.to(buttonsRef.current[index], {
        backgroundColor: "rgba(227, 27, 99, 0.1)", 
        borderColor: "#E31B63", 
        scale: 1.02,
        duration: 0.3,
        onComplete: () => setIsTransitioning(false)
      });
      
      const icon = buttonsRef.current[index]?.querySelector('.feature-icon');
      if(icon) gsap.to(icon, { color: "#E31B63", duration: 0.3 });
    }

    if (descriptionsRef.current[index]) {
      gsap.to(descriptionsRef.current[index], {
        height: "auto",
        opacity: 1,
        marginTop: 16,
        duration: 0.3
      });
    }
  };

  // Mobile Nav Logic
  const animateMobileTextTransition = (newIndex: number) => {
    if (!mobileTextContainerRef.current) return;
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveFeature(newIndex);
        gsap.fromTo(mobileTextContainerRef.current, 
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, onComplete: () => setIsTransitioning(false) }
        );
      }
    });
    tl.to(mobileTextContainerRef.current, { opacity: 0, y: -10, duration: 0.2 });
  };

  const handleMobileNavigation = (direction: 'prev' | 'next') => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    let newIndex = direction === 'next' 
      ? (activeFeature + 1) % features.length 
      : (activeFeature - 1 + features.length) % features.length;
    animateMobileTextTransition(newIndex);
  };

  // Inicialização visual do primeiro item (sem animação de entrada)
  useEffect(() => {
    // Pequeno delay para garantir que o DOM foi montado
    const timer = setTimeout(() => {
        if (buttonsRef.current[0] && activeFeature === 0) {
            gsap.set(buttonsRef.current[0], { 
                backgroundColor: "rgba(227, 27, 99, 0.1)", 
                borderColor: "#E31B63", 
                scale: 1.02 
            });
            const icon = buttonsRef.current[0]?.querySelector('.feature-icon');
            if(icon) gsap.set(icon, { color: "#E31B63" });
            
            if (descriptionsRef.current[0]) {
                gsap.set(descriptionsRef.current[0], { height: "auto", opacity: 1, marginTop: 16 });
            }
        }
    }, 100);
    return () => clearTimeout(timer);
  }, [features]); // Roda quando features mudam

  return (
    <section ref={sectionRef} className="py-24 bg-[#020202] px-6 relative border-t border-white/5">
      
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      <div className="mx-auto relative max-w-[1400px] z-10">
        
        <div className="mb-12 md:mb-16">
            <h2 className="text-sm font-bold text-[#E31B63] uppercase tracking-widest mb-3">
                Deep Dive
            </h2>
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              A anatomia da <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E31B63] to-[#FF0F43]">Escala.</span>
            </h1>
        </div>

        {/* --- DESKTOP LAYOUT --- */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
          
          <div className="col-span-4 sticky top-24">
            <div ref={buttonsContainerRef} className="flex flex-col space-y-3">
              {features.map((feature, index) => (
                <button
                  key={feature.id}
                  ref={(el) => { buttonsRef.current[index] = el }}
                  onClick={() => handleFeatureChange(index)}
                  className={`feature-button group w-full text-left p-6 rounded-2xl border transition-all duration-300
                    ${activeFeature === index 
                        ? "bg-[#E31B63]/10 border-[#E31B63]" 
                        : "bg-white/5 border-white/5 hover:bg-white/10"
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <h3 className={`font-bold text-lg flex items-center gap-3 transition-colors ${activeFeature === index ? "text-white" : "text-gray-400 group-hover:text-gray-200"}`}>
                        <Icon 
                            icon={feature.icon} 
                            className={`feature-icon w-6 h-6 transition-colors ${activeFeature === index ? "text-[#E31B63]" : "text-gray-600"}`} 
                        />
                        {feature.title}
                    </h3>
                    <Icon icon="lucide:chevron-right" className={`w-5 h-5 transition-all ${activeFeature === index ? "text-[#E31B63] opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`} />
                  </div>

                  <div
                    ref={(el) => { descriptionsRef.current[index] = el }}
                    className="overflow-hidden h-0 opacity-0"
                  >
                    <p className="text-sm text-gray-400 leading-relaxed font-light border-l border-[#E31B63]/30 pl-4">
                        {feature.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-8">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0A0A0A] shadow-2xl shadow-rose-900/10 aspect-video group">
              
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-[#E31B63] blur-[20px] opacity-50"></div>

              <div 
                ref={desktopImageContainerRef}
                className="w-full h-full relative"
              >
                {currentImage && (
                    <Image
                    src={currentImage}
                    alt="Tegbe Feature Dashboard"
                    fill
                    className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                    />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-60"></div>
              </div>

              <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                 <span className="text-xs font-mono text-gray-300">SYSTEM: ONLINE</span>
              </div>

            </div>
          </div>
        </div>

        {/* --- MOBILE LAYOUT --- */}
        <div className="lg:hidden bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden">
          <div className="aspect-[4/3] relative bg-black border-b border-white/5">
            <div 
              ref={mobileImageContainerRef}
              className="w-full h-full relative"
            >
              {currentImage && (
                  <Image
                    src={currentImage}
                    alt="Feature Mobile"
                    fill
                    className="object-cover"
                    unoptimized
                  />
              )}
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <Button onClick={() => handleMobileNavigation('prev')} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 p-0 flex items-center justify-center">
                    <Icon icon="lucide:arrow-left" className="text-white" />
                </Button>
                
                <span className="text-xs font-mono text-[#E31B63]">
                    {String(activeFeature + 1).padStart(2, '0')} / {String(features.length).padStart(2, '0')}
                </span>

                <Button onClick={() => handleMobileNavigation('next')} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 p-0 flex items-center justify-center">
                    <Icon icon="lucide:arrow-right" className="text-white" />
                </Button>
            </div>

            <div ref={mobileTextContainerRef} className="text-center min-h-[120px]">
                <h3 className="text-xl font-bold text-white mb-2 flex justify-center items-center gap-2">
                    <Icon icon={features[activeFeature].icon} className="text-[#E31B63]" />
                    {features[activeFeature].title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    {features[activeFeature].description}
                </p>
            </div>

            <div className="flex justify-center gap-2 mt-4">
                {features.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`h-1 rounded-full transition-all duration-300 ${activeFeature === idx ? "w-6 bg-[#E31B63]" : "w-1 bg-gray-700"}`}
                    />
                ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ExploreDetails;