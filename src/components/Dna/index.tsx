"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Icon } from '@iconify/react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Registrar o plugin ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function Dna() {
    const cards = [
        { id: 1, image: "/equipe.png" },
        { id: 2, image: "/equipe.png" },
        { id: 3, image: "/equipe.png" }, // Adicione imagens reais se tiver
        { id: 4, image: "/equipe.png" },
    ];

    const [isPlaying, setIsPlaying] = useState(true);
    const [swiperInstance, setSwiperInstance] = useState<any>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        if (typeof window !== "undefined") {
            setWindowWidth(window.innerWidth);
            const handleResize = () => setWindowWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    // Dimensões dos dots
    const getDotDimensions = () => {
        if (windowWidth < 1024) {
            // Mobile - dots horizontais
            return {
                width: (index: number) => activeIndex === index ? '32px' : '10px',
                height: () => '10px',
            };
        } else {
            // Desktop - dots verticais
            return {
                width: () => '10px',
                height: (index: number) => activeIndex === index ? '32px' : '10px',
            };
        }
    };

    const dotDimensions = getDotDimensions();

    const handlePlayPause = () => {
        if (!swiperInstance) return;
        if (isPlaying) {
            swiperInstance.autoplay.stop();
        } else {
            swiperInstance.autoplay.start();
        }
        setIsPlaying(!isPlaying);
    };

    const goToSlide = (index: number) => {
        if (swiperInstance) {
            swiperInstance.slideTo(index);
        }
    };

    const handleSlideChange = (swiper: any) => {
        setActiveIndex(swiper.activeIndex);
    };

    // Animação GSAP
    useGSAP(() => {
        if (!sectionRef.current) return;
        const cardsEl = sectionRef.current.querySelectorAll('.swiper-slide');

        gsap.set(cardsEl, { opacity: 0, y: 30 });

        const animation = gsap.to(cardsEl, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
                markers: false,
            }
        });

        return () => {
            animation.kill();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, { dependencies: [], scope: sectionRef });

    if (!isClient) return null;

    return (
        <section
            ref={sectionRef}
            className="py-24 w-full flex flex-col justify-center items-center bg-[#050505] px-5 relative overflow-hidden"
            id="dna"
        >
            {/* Background Glow Sutil (Opcional - Estilo Mavellium) */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container flex flex-col justify-center relative z-10">
                
                {/* Texto Intro */}
                <div className="flex flex-col items-center text-center w-full mb-12 text-white">
                    <div className="mb-4 px-3 py-1 rounded-full border border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                        <span className="text-xs font-semibold text-[#FFCC00] tracking-wider uppercase">
                             DNA DE PERFORMANCE
                        </span>
                    </div>
                    <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl mb-6 leading-tight max-w-4xl text-white">
                        Sua operação guiada por quem entende o <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFCC00] to-yellow-600">DNA do Mercado Livre.</span>
                    </h1>

                    <h2 className="text-base sm:text-lg text-gray-400 font-light leading-relaxed max-w-3xl">
                        Esqueça os "hacks" temporários. Ser liderado por um <strong className="text-white font-medium">Consultor Oficial Certificado</strong> significa estratégia baseada em dados diretos da fonte. 
                        Nós jogamos com o manual de regras debaixo do braço para garantir a segurança e a escala da sua conta.
                    </h2>
                </div>

                {/* Container Principal: Swiper (Esq) + Controles (Dir) */}
                <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl mx-auto gap-8 lg:gap-12">
                    
                    {/* 1. SWIPER (Agora vem primeiro no código = Esquerda no Desktop) */}
                    <div className="w-full lg:w-4/5 overflow-visible">
                        <Swiper
                            modules={[Autoplay]}
                            onSwiper={setSwiperInstance}
                            onSlideChange={handleSlideChange}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            direction="vertical"
                            slidesPerView={1}
                            spaceBetween={20}
                            centeredSlides={true}
                            className="w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] rounded-2xl"
                        >
                            {cards.map((card, index) => (
                                <SwiperSlide key={card.id} className="overflow-hidden rounded-2xl group">
                                    <motion.div
                                        onClick={() => goToSlide(index)}
                                        className="w-full h-full relative cursor-pointer"
                                    >
                                        <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl border border-white/5">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                                            <Image
                                                src={card.image}
                                                fill
                                                className="object-cover object-center w-full h-full rounded-2xl transition-transform duration-700 group-hover:scale-105"
                                                alt={`Equipe Tegbe ${index + 1}`}
                                            />
                                        </div>
                                    </motion.div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    
                    {/* 2. CONTROLES (Agora vem depois = Direita no Desktop) */}
                    <div className="w-full lg:w-auto flex lg:flex-col flex-row items-center justify-center gap-6">
                        
                        {/* Dots de Navegação */}
                        <div className={`flex ${windowWidth < 1024 ? 'flex-row' : 'flex-col'} gap-3 bg-[#1A1A1A] border border-white/5 px-4 py-4 lg:px-4 lg:py-4 rounded-full justify-center items-center shadow-lg`}>
                            {cards.map((_, index) => (
                                <button
                                    key={index}
                                    aria-label="Botão de navegação do carrossel"
                                    onClick={() => goToSlide(index)}
                                    className={`transition-all duration-500 focus:outline-none rounded-full ${
                                        index === activeIndex
                                            ? "bg-[#FFCC00] shadow-[0_0_10px_#FFCC00]"  // Ativo: Amarelo com Glow
                                            : "bg-gray-600 hover:bg-gray-400"  // Inativo
                                    }`}
                                    style={{
                                        width: dotDimensions.width(index),
                                        height: dotDimensions.height(index),
                                    }}
                                ></button>
                            ))}
                        </div>

                        {/* Botão Play/Pause */}
                        <div className="lg:mt-0">
                            <Button
                                aria-label={isPlaying ? "Pausar carrossel" : "Tocar carrossel"}
                                onClick={handlePlayPause}
                                className="flex items-center justify-center bg-[#1A1A1A] border border-white/10 text-white hover:bg-[#FFCC00] hover:text-black hover:border-[#FFCC00]
                                    rounded-full p-0 h-12 w-12 shadow-lg transition-all duration-300 group"
                            >
                                {isPlaying ? (
                                    <Icon icon="solar:pause-bold" className="w-5 h-5" />
                                ) : (
                                    <Icon icon="solar:play-bold" className="w-5 h-5" />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Conteúdo Final (Texto + CTA) */}
                <div className="container relative z-20 px-6 mt-16">
                    <div className="max-w-3xl mx-auto text-gray-400 text-center space-y-8">
                        <p className="text-base sm:text-lg font-light leading-relaxed">
                            Mas estratégia sem braço não gera lucro. Por isso, Doni formou uma <strong className="text-white font-medium">Tropa de Elite Operacional.</strong> Cada membro é especialista em um pilar vital: Tráfego, Design, Copy e Logística. 
                            Você não contrata apenas um consultor; você pluga seu negócio a um ecossistema que respira vendas 24h.
                        </p>
                        
                        <div className="flex justify-center pt-2">
                             <a
                                aria-label="Contratar meu time"
                                href="https://api.whatsapp.com/send?phone=5514991779502"
                                target="_blank"
                                className="group relative"
                            >
                                {/* Glow Effect */}
                                <div className="absolute -inset-1 bg-yellow-500 rounded-full opacity-20 blur group-hover:opacity-40 transition duration-200"></div>
                                
                                <Button aria-label="Contratar meu time" className="relative shadow-xl bg-[#FFCC00] text-black font-bold hover:bg-[#E6B800] text-base sm:text-lg transition-all duration-300 h-14 px-8 rounded-full flex items-center gap-2">
                                    CONTRATAR MEU TIME
                                    <Icon icon="lucide:arrow-right" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}