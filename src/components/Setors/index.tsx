"use client";

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Icon } from '@iconify/react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Interface para tipagem
interface CardData {
  id: number;
  image: string;
  title: string;
}

interface SetorsProps {
  data?: {
    title?: string;
    highlightedText?: string;
    cards?: CardData[];
    controls?: {
      showDots?: boolean;
      showPlayPause?: boolean;
      autoplay?: boolean;
      autoplaySpeed?: number;
    };
    colors?: {
      primary?: string;
      background?: string;
      text?: string;
    };
  };
}

export function Setors({ data }: SetorsProps = {}) {
  // Dados padrão ou personalizados
  const defaultCards: CardData[] = [
    {
      id: 1,
      image: "/growth-1.png",
      title: "**Fim do \"Acha que sabe\".** O algoritmo muda toda semana. Pare de testar na sorte. Aplicamos metodologias validadas de Consultoria Oficial para garantir que sua loja jogue com as regras certas e não seja penalizada.",
    },
    {
      id: 2,
      image: "/growth-2.png",
      title: "**Sua Hora Vale Ouro.** Você deve focar em estratégia, fornecedores e novos produtos. Deixe a \"guerra\" de cliques, atendimento, expedição e gestão de anúncios com quem respira isso 24h por dia.",
    },
    {
      id: 3,
      image: "/growth-3.png",
      title: "**Custo Fixo Inteligente.** Montar uma equipe interna de marketing, design e logística custa caro e dá dor de cabeça. Na Tegbe, você acessa um time multidisciplinar sênior por uma fração desse custo.",
    },
    {
      id: 4,
      image: "/growth-4.png",
      title: "**Padrão de Loja Oficial.** Fotos de celular e descrições genéricas matam sua margem. Elevamos sua marca com design profissional e copy persuasiva que transmitem autoridade e justificam seu preço.",
    },
  ];

  const cards = data?.cards || defaultCards;
  const title = data?.title || "Por que centralizar a operação está";
  const highlightedText = data?.highlightedText || "travando";
  const afterText = data?.title ? "" : " o seu crescimento?";
  const primaryColor = data?.colors?.primary || "#FFCC00";
  const backgroundColor = data?.colors?.background || "#F4F4F4";
  const textColor = data?.colors?.text || "#000000";
  
  const controlsConfig = {
    showDots: data?.controls?.showDots ?? true,
    showPlayPause: data?.controls?.showPlayPause ?? true,
    autoplay: data?.controls?.autoplay ?? true,
    autoplaySpeed: data?.controls?.autoplaySpeed ?? 5000,
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(controlsConfig.autoplay);
  const [isHovering, setIsHovering] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [descriptionHeight, setDescriptionHeight] = useState<number>(0);
  const swiperRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const desktopCardsRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  function renderBoldText(text: string) {
    return text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-bold" style={{ color: textColor }}>
            {part.replace(/\*\*/g, "")}
          </strong>
        );
      }
      return <span key={index} className="text-gray-600">{part}</span>;
    });
  }

  useEffect(() => {
    setIsClient(true);
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Atualizar altura da descrição quando o texto muda
  useEffect(() => {
    if (descriptionRef.current) {
      setDescriptionHeight(descriptionRef.current.offsetHeight);
    }
  }, [activeIndex, windowWidth]);

  const isMobile = windowWidth !== null && windowWidth < 768;

  // Autoplay Inteligente (Desktop)
  useEffect(() => {
    if (isMobile || !isPlaying || isHovering || !controlsConfig.autoplay) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    }, controlsConfig.autoplaySpeed);

    return () => clearInterval(interval);
  }, [isMobile, isPlaying, isHovering, cards.length, controlsConfig.autoplay, controlsConfig.autoplaySpeed]);

  // Controle Swiper (Mobile)
  useEffect(() => {
    if (!swiperRef.current || !isMobile) return;
    
    if (isPlaying && controlsConfig.autoplay) {
      swiperRef.current.autoplay?.start();
    } else {
      swiperRef.current.autoplay?.stop();
    }
  }, [isMobile, isPlaying, controlsConfig.autoplay]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    if (isMobile && swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  // Animação GSAP Desktop
  useGSAP(() => {
    if (!desktopCardsRef.current || isMobile) return;
    const cardsEl = desktopCardsRef.current.querySelectorAll('.desktop-card');
    gsap.set(cardsEl, { opacity: 0, y: 50, scale: 0.9 });

    const animation = gsap.to(cardsEl, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      }
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, { dependencies: [isMobile], scope: sectionRef });

  // Animação GSAP Mobile
  useGSAP(() => {
    if (!isMobile) return;
    const cardsEl = document.querySelectorAll('.mobile-card');
    gsap.set(cardsEl, { opacity: 0, y: 30 });

    const animation = gsap.to(cardsEl, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      }
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, { dependencies: [isMobile], scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="py-20 w-full flex flex-col justify-center items-center px-4"
      style={{ backgroundColor }}
      id="setors"
    >
      <div className="container flex flex-col justify-center items-center relative">
        
        {/* Título Centralizado */}
        <div className="text-center max-w-4xl mb-12">
          <h2 
            className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold leading-tight"
            style={{ color: textColor }}
          >
            {title}{' '}
            <span style={{ color: primaryColor }}>{highlightedText}</span>
            {afterText}
          </h2>
        </div>

        {/* 🟢 MOBILE - Swiper */}
        {isMobile && (
          <div className="w-full overflow-visible mb-8">
            <Swiper
              modules={[Autoplay]}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              autoplay={controlsConfig.autoplay ? { 
                delay: controlsConfig.autoplaySpeed, 
                disableOnInteraction: false 
              } : false}
              centeredSlides={true}
              slidesPerView={0.9}
              spaceBetween={16}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              className="w-full"
            >
              {cards.map((card, index) => (
                <SwiperSlide key={card.id} className="overflow-visible">
                  <motion.div
                    onClick={() => setActiveIndex(index)}
                    className="flex flex-col items-center mobile-card"
                  >
                    <div className="relative overflow-hidden rounded-2xl shadow-md cursor-pointer w-[92vw] max-w-[600px] mx-auto h-[340px] sm:h-[360px]">
                      <Image
                        src={card.image}
                        alt="Growth Tegbe"
                        fill
                        className="object-cover object-center rounded-2xl"
                      />
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 rounded-2xl flex flex-col items-start p-4 w-[95%]"
                    >
                      <h2 className="text-lg font-medium mb-3 p-5 leading-relaxed">
                        {renderBoldText(card.title)}
                      </h2>
                    </motion.div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* 🟣 DESKTOP */}
        {isClient && !isMobile && (
          <div 
            ref={desktopCardsRef} 
            className="flex justify-center flex-wrap gap-4 relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {cards.map((card, index) => {
              const isActive = index === activeIndex;
              const activeWidth = windowWidth < 1024 ? 260 : 420;
              const inactiveWidth = windowWidth < 1024 ? 140 : windowWidth < 1536 ? 160 : 320;

              return (
                <motion.div
                  key={card.id}
                  layout
                  className="flex flex-col items-center relative desktop-card"
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  style={{ minWidth: inactiveWidth }}
                >
                  <motion.div
                    layout
                    onClick={() => setActiveIndex(index)}
                    animate={{
                      opacity: isActive ? 1 : 0.5,
                      width: isActive ? activeWidth : inactiveWidth,
                      scale: isActive ? 1 : 0.98,
                      filter: isActive ? "grayscale(0%)" : "grayscale(100%)",
                    }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className={`relative cursor-pointer overflow-hidden rounded-4xl shadow-lg border-2 ${isActive ? "" : "border-transparent"}`}
                    style={isActive ? { borderColor: primaryColor } : {}}
                  >
                    <div className="relative w-full h-[600px]">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    {!isActive && <div className="absolute inset-0 bg-black/40 transition-colors duration-300" />}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Container da Descrição (Apenas Desktop) */}
        {!isMobile && (
          <div 
            ref={descriptionRef}
            className="w-full max-w-4xl mt-8 transition-all duration-300"
            style={{ minHeight: '80px' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl p-6 bg-white shadow-lg"
                style={{ borderLeft: `4px solid ${primaryColor}` }}
              >
                <h2 className="text-lg md:text-xl font-medium leading-relaxed">
                  {renderBoldText(cards[activeIndex].title)}
                </h2>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* 🔘 CONTROLES - Posicionamento Relativo */}
        <div 
          className="flex items-center justify-center gap-6 relative"
          style={{
            marginTop: isMobile ? '2rem' : '3rem',
            top: isMobile ? '0' : `${descriptionHeight > 100 ? '2rem' : '3rem'}`,
          }}
        >
          {/* Dots */}
          {controlsConfig.showDots && (
            <div 
              className="flex gap-3 bg-white border border-gray-200 h-14 px-6 rounded-full justify-center items-center shadow-lg"
              style={{ borderColor: `${primaryColor}30` }}
            >
              {cards.map((_, index) => (
                <button
                  key={index}
                  aria-label="Botão de navegação do carrossel"
                  onClick={() => goToSlide(index)}
                  className={`transition-all w-11 h-11 duration-300 rounded-full ${
                    index === activeIndex
                      ? "shadow-[0_0_10px_rgba(0,0,0,0.2)]"
                      : "hover:bg-gray-100"
                  }`}
                  style={{
                    width: index === activeIndex ? '32px' : '10px',
                    height: '10px',
                    backgroundColor: index === activeIndex ? primaryColor : '#D1D5DB',
                  }}
                />
              ))}
            </div>
          )}

          {/* Play/Pause */}
          {controlsConfig.showPlayPause && (
            <Button
              aria-label={isPlaying ? "Pausar carrossel" : "Tocar carrossel"}
              onClick={() => setIsPlaying((prev) => !prev)}
              className="flex items-center justify-center bg-white border text-gray-800 hover:text-black rounded-full h-14 w-14 shadow-lg transition-all duration-300"
              style={{
                borderColor: `${primaryColor}30`,
                backgroundColor: isPlaying ? `${primaryColor}20` : 'white',
                color: textColor,
              }}
            >
              {isPlaying ? (
                <Icon icon="solar:pause-bold" className="w-6 h-6" />
              ) : (
                <Icon icon="solar:play-bold" className="w-6 h-6" />
              )}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}