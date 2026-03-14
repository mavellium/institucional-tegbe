"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

// --- DADOS DO CARROSSEL ---
const slides = [
    {
        id: 1,
        tag: "PROGRAMA PRESENCIAL",
        title: "TEGBE GESTÃO E ESTRATÉGIA",
        description: "Construa estratégias sólidas para escalar sua empresa com segurança e velocidade",
        subtext: "Aprenda com líderes de mercado a dominar estratégias e decisões claras que geram resultados em apenas 4 dias.",
        ctaText: "Conheça agora o programa",
        ctaLink: "#",
        image: "/doni.jpg", // Substitua pelo caminho da sua imagem
    },
    {
        id: 2,
        tag: "IMERSÃO ONLINE",
        title: "TEGBE GROWTH EXTREMO",
        description: "Dobre o faturamento da sua empresa utilizando as táticas do Vale do Silício",
        subtext: "Acelere suas vendas com frameworks práticos e validados pelas maiores empresas do mundo.",
        ctaText: "Garantir minha vaga",
        ctaLink: "#",
        image: "/doni.jpg",
    },
];

export default function HeroCarousel() {
    // Configuração do Embla com Autoplay
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 6000, stopOnInteraction: true }),
    ]);

    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi, setSelectedIndex]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    return (
        <section className="relative w-full bg-[#051121] overflow-hidden text-white group">
            {/* Background estilizado com logo sutil (opcional, como na imagem) */}
            <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
                {/* Aqui você pode colocar uma marca d'água gigante da logo */}
            </div>

            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex touch-pan-y">
                    {slides.map((slide, index) => {
                        const isActive = index === selectedIndex;

                        return (
                            <div className="flex-[0_0_100%] min-w-0 relative" key={slide.id}>
                                <div className="container mx-auto px-6 lg:px-16 py-16 lg:py-24 flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[600px]">

                                    {/* Lado Esquerdo: Textos e CTA */}
                                    <div className="w-full lg:w-1/2 z-10 flex flex-col items-center lg:items-start gap-6">
                                        {/* Animações encadeadas baseadas no estado 'isActive' */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                                            transition={{ duration: 0.5, delay: 0.1 }}
                                            className="inline-block px-5 py-1.5 border border-[#4a5f78] rounded-full text-xs font-semibold tracking-[0.15em] text-gray-300 uppercase text-center lg:text-left"
                                        >
                                            {slide.tag}
                                        </motion.div>

                                        <motion.h1
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            className="text-4xl lg:text-5xl xl:text-6xl font-serif font-medium leading-[1.1] text-center lg:text-left"
                                        >
                                            {slide.title}
                                        </motion.h1>

                                        <motion.div
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: isActive ? 1 : 0, width: isActive ? "100px" : 0 }}
                                            transition={{ duration: 0.6, delay: 0.3 }}
                                            className="h-[2px] bg-gradient-to-r from-[#7d2738] to-transparent mx-auto lg:mx-0"
                                        />

                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                                            transition={{ duration: 0.5, delay: 0.4 }}
                                            className="text-2xl lg:text-3xl font-light text-gray-200 leading-snug text-center lg:text-left"
                                        >
                                            {slide.description}
                                        </motion.p>

                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                                            transition={{ duration: 0.5, delay: 0.5 }}
                                            className="text-sm lg:text-base text-gray-400 max-w-lg text-center lg:text-left"
                                        >
                                            {slide.subtext}
                                        </motion.p>

                                        <motion.a
                                            href={slide.ctaLink}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                                            transition={{ duration: 0.5, delay: 0.6 }}
                                            className="mt-4 px-8 py-4 bg-[#d9415f] hover:bg-[#7d2738] transition-all duration-300 text-white font-bold rounded shadow-[0_0_20px_rgba(255, 84, 118,0.3)] hover:shadow-[0_0_30px_rgba(255, 84, 118,0.5)] transform hover:-translate-y-1 text-sm uppercase tracking-wider mx-auto lg:mx-0"
                                        >
                                            {slide.ctaText}
                                        </motion.a>
                                    </div>

                                    {/* Lado Direito: Imagem */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, x: 20 }}
                                        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.95, x: isActive ? 0 : 20 }}
                                        transition={{ duration: 0.7, delay: 0.3, type: "spring" }}
                                        className="w-full lg:w-1/2 relative flex justify-end items-end h-[400px] lg:h-[600px]"
                                    >
                                        <Image
                                            src={slide.image}
                                            alt={slide.title}
                                            fill
                                            className="object-contain object-bottom drop-shadow-2xl"
                                            priority={index === 0}
                                        />
                                    </motion.div>

                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* --- NAVEGAÇÃO CUSTOMIZADA --- */}
            <button
                onClick={scrollPrev}
                className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#d9415f] text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#7d2738] hover:scale-110 z-20 shadow-lg"
                aria-label="Slide anterior"
            >
                <ChevronLeft size={24} />
            </button>

            <button
                onClick={scrollNext}
                className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#d9415f] text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#7d2738] hover:scale-110 z-20 shadow-lg"
                aria-label="Próximo slide"
            >
                <ChevronRight size={24} />
            </button>

            {/* --- PAGINAÇÃO (Dots) --- */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => emblaApi?.scrollTo(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${i === selectedIndex ? "bg-[#d9415f] w-8" : "bg-white/30 w-2 hover:bg-white/50"
                            }`}
                        aria-label={`Ir para o slide ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}