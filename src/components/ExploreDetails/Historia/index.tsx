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

// Interface compatível com o JSON da API
export interface TimelineItem {
  id: string;
  step: string;
  title: string;
  description: string;
  image: string;
}

interface HistoriaData {
  header: { badge: string; title: string; subtitle: string; };
  timeline: TimelineItem[];
}

const Historia = ({ endpoint = "https://tegbe-dashboard.vercel.app/api/tegbe-institucional/historia" }) => {
  const [data, setData] = useState<HistoriaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeFeature, setActiveFeature] = useState(0); // Começa no 0 para evitar vácuo
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const [currentDesktopImage, setCurrentDesktopImage] = useState("");
  const [currentMobileImage, setCurrentMobileImage] = useState("");

  const sectionRef = useRef<HTMLDivElement>(null);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);
  const descriptionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const desktopImageContainerRef = useRef<HTMLDivElement>(null);
  const mobileImageContainerRef = useRef<HTMLDivElement>(null);
  const mobileTextContainerRef = useRef<HTMLDivElement>(null);
  const previousActiveFeatureRef = useRef<number>(-1);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // 1. Fetch de Dados
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(endpoint);
        const json = await res.json();
        if (json && json.timeline) {
          setData(json);
          setCurrentDesktopImage(json.timeline[0].image);
          setCurrentMobileImage(json.timeline[0].image);
        }
      } catch (err) {
        console.error("Erro na API:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);

  // Função de transição de imagem original
  const animateImageTransition = (
    containerRef: React.RefObject<HTMLDivElement | null>,
    newImage: string,
    setImage: (img: string) => void
  ) => {
    const container = containerRef.current;
    if (!container || !newImage) {
      setImage(newImage);
      return;
    }

    gsap.killTweensOf(container);
    const tl = gsap.timeline({
      onComplete: () => { gsap.set(container, { clearProps: "all" }); }
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

  // Efeito para troca de slide
  useEffect(() => {
    if (data && activeFeature !== previousActiveFeatureRef.current) {
      const newImage = data.timeline[activeFeature]?.image || "";
      animateImageTransition(desktopImageContainerRef, newImage, setCurrentDesktopImage);
      animateImageTransition(mobileImageContainerRef, newImage, setCurrentMobileImage);
      previousActiveFeatureRef.current = activeFeature;
    }
  }, [activeFeature, data]);

  // Animação de Entrada
  useLayoutEffect(() => {
    if (loading || !data || !buttonsContainerRef.current || !sectionRef.current) return;

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
      .to(buttons, { opacity: 1, x: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" })
      .to(imagePanel, { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: "power3.out" }, "-=0.5");

    return () => { if (timelineRef.current) timelineRef.current.kill(); };
  }, [loading, data]);

  const handleFeatureChange = (index: number) => {
    if (isTransitioning || index === activeFeature || !data) return;
    setIsTransitioning(true);
    
    if (descriptionsRef.current[activeFeature]) {
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
    if (isTransitioning || !data) return;
    const current = activeFeature;
    const newIndex = direction === 'next' 
      ? (current + 1) % data.timeline.length 
      : (current - 1 + data.timeline.length) % data.timeline.length;
    handleFeatureChange(newIndex);
  };

  const handleMobileNav = (direction: 'prev' | 'next') => {
      if (isTransitioning || !data) return;
      setIsTransitioning(true);
      const current = activeFeature;
      const newIndex = direction === 'next' 
        ? (current + 1) % data.timeline.length 
        : (current - 1 + data.timeline.length) % data.timeline.length;

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

  if (loading || !data) return (
    <div className="h-[600px] flex items-center justify-center bg-[#F5F5F7]">
      <div className="w-10 h-10 border-2 border-[#FFD700] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <section ref={sectionRef} className="bg-[#F5F5F7] py-24 px-6 relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-gray-200/80 to-transparent rounded-full blur-[120px] pointer-events-none opacity-60" />

      <div className="mx-auto relative max-w-[1400px]">
        
        <div className="mb-12 md:mb-16 section-header">
            <h4 className="text-[#FFD700] font-bold tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-[#FFD700]"></span>
                {data.header.badge}
            </h4>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#1d1d1f] tracking-tight">
                {data.header.title}
            </h1>
        </div>

        {/* DESKTOP LAYOUT - EXATAMENTE O SOLICITADO */}
        <div className="hidden lg:flex flex-row overflow-hidden rounded-[40px] shadow-2xl shadow-black/20 bg-[#111111] border border-white/10 h-[650px] relative z-10">
          
          {/* Lado Esquerdo: Navegação */}
          <div className="w-[40%] p-10 flex flex-col relative bg-[#111111]">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FFD700] via-[#FFD700]/50 to-transparent"></div>

            <div className="flex-1 overflow-y-auto pr-4 py-4 scrollbar-hide">
              <div ref={buttonsContainerRef} className="flex flex-col space-y-2">
                {data.timeline.map((item, index) => {
                  const isActive = activeFeature === index;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleFeatureChange(index)}
                      disabled={isTransitioning}
                      className={`feature-button group w-full text-left transition-all duration-500 ease-out border-l-[3px] pl-6 py-5 relative rounded-r-2xl outline-none
                        ${isActive 
                          ? "border-[#FFD700] bg-gradient-to-r from-[#FFD700]/10 to-transparent" 
                          : "border-white/10 hover:border-white/30 hover:bg-white/[0.02]"
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`text-sm font-mono font-bold tracking-wider transition-colors duration-300 ${isActive ? "text-[#FFD700]" : "text-gray-500 group-hover:text-gray-400"}`}>
                            {item.step}
                        </span>
                        <h3 className={`font-semibold text-xl transition-colors duration-300 ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
                            {item.title}
                        </h3>
                      </div>

                      <div
                        ref={(el) => { descriptionsRef.current[index] = el }}
                        className="overflow-hidden"
                        style={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                      >
                        <p className="text-gray-400 mt-4 text-sm leading-relaxed font-light pr-6 pl-12 border-l border-white/10">
                            {item.description}
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
                    <Button variant="ghost" onClick={() => handleNavigation('prev')} disabled={isTransitioning} className="text-white hover:bg-white/10 hover:text-[#FFD700] rounded-full h-11 w-11 p-0 border border-white/10 transition-all active:scale-95 disabled:opacity-50">
                        <Icon icon="ph:arrow-left-bold" width="18" />
                    </Button>
                    <Button variant="ghost" onClick={() => handleNavigation('next')} disabled={isTransitioning} className="text-white hover:bg-white/10 hover:text-[#FFD700] rounded-full h-11 w-11 p-0 border border-white/10 transition-all active:scale-95 disabled:opacity-50">
                        <Icon icon="ph:arrow-right-bold" width="18" />
                    </Button>
                </div>
            </div>
          </div>

          {/* Lado Direito: Visual */}
          <div className="w-[60%] relative bg-[#1a1a1a] image-panel overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-transparent to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent z-10 pointer-events-none" />
            
            <div ref={desktopImageContainerRef} className="w-full h-full relative transform-gpu">
                {currentDesktopImage && (
                  <Image
                    src={currentDesktopImage}
                    alt={data.timeline[activeFeature]?.title || "Tegbe"}
                    fill
                    className="object-cover opacity-90" 
                    priority
                    unoptimized
                  />
                )}
            </div>

            <div className="absolute bottom-8 right-8 z-20 flex flex-col items-end gap-2">
                <div className="px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg shadow-lg flex items-center gap-3">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider leading-none mb-1">Marco Atual</span>
                        <span className="text-sm text-white font-bold leading-none">
                            {data.timeline[activeFeature]?.step}
                        </span>
                    </div>
                    <div className="h-8 w-[1px] bg-white/20"></div>
                    <span className="text-xs text-[#FFD700] font-bold flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD700] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFD700]"></span>
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
                {currentMobileImage && (
                  <Image
                    src={currentMobileImage}
                    alt="Mobile Step"
                    fill
                    className="object-cover opacity-90"
                    unoptimized
                  />
                )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-transparent" />
          </div>

          <div className="p-6 relative -mt-16 z-10">
             <div className="flex justify-between items-start mb-6">
                <span className="px-3 py-1.5 bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] rounded-full text-xs font-mono font-bold tracking-wider backdrop-blur-sm shadow-sm">
                    {data.timeline[activeFeature]?.step}
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
                    {data.timeline[activeFeature]?.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed font-light">
                    {data.timeline[activeFeature]?.description}
                </p>
             </div>

             <div className="flex justify-center items-center gap-3 mt-6 pt-6 border-t border-white/10">
                {data.timeline.map((_, i) => (
                    <button 
                        key={i}
                        onClick={() => !isTransitioning && handleFeatureChange(i)}
                        className={`rounded-full transition-all duration-500 ease-out ${
                            i === activeFeature 
                                ? "w-8 h-1.5 bg-[#FFD700]" 
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