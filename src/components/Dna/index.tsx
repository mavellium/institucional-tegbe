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

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// --- INTERFACES DE ENTRADA (FLEXÍVEL - VEM DA API) ---
export interface DnaInputData {
    id?: string;
    badge?: string | { texto: string; classes: string; visivel: boolean; corTexto: string; classesTexto: string };
    titulo?: string | { texto: string; destaque: string; visivel: boolean; classes: string; gradiente: string };
    subtitulo?: string | { texto: string; classes: string; visivel: boolean };
    paragrafoFinal?: string | { texto: string; classes: string; visivel: boolean };
    textoIntroducao?: string; // Campo extra para compatibilidade
    
    botao?: { 
        link: string; icone: string; texto: string; visivel: boolean; ariaLabel: string;
        classes: { glow: string; botao: string; container: string } 
    };
    cards?: Array<{ id: number | string; alt?: string; image?: string; imagem?: string }>;
    configuracoes?: {
        layout?: { classes: string; container: string };
        animacao?: { habilitada: boolean; duracao: number; ease: string; scrollTrigger: any };
        swiper?: { direcao: string; autoplay: any; dimensoes: any };
    };
    efeitos?: any;
    controles?: any;
}

// --- INTERFACES INTERNAS (ESTRITAS - O QUE O COMPONENTE USA) ---
interface StrictBadge { texto: string; classes: string; visivel: boolean; corTexto: string; classesTexto: string; }
interface StrictTitulo { texto: string; destaque: string; visivel: boolean; classes: string; gradiente: string; }
interface StrictTexto { texto: string; classes: string; visivel: boolean; }

interface DnaProps {
    data?: DnaInputData;
}

// --- VISUAL PADRÃO ---
const VISUAL_DEFAULTS = {
    layout: {
        classes: "py-24 w-full flex flex-col justify-center items-center bg-[#050505] px-5 relative overflow-hidden",
        container: "container flex flex-col justify-center relative z-10"
    },
    textos: {
        badge: {
            classes: "mb-6 flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5",
            classesTexto: "text-[10px] font-bold tracking-[0.2em] uppercase",
            corTexto: "text-gray-400"
        } as StrictBadge,
        titulo: {
            classes: "font-bold text-3xl sm:text-5xl md:text-6xl mb-6 leading-tight tracking-tight text-white",
            gradiente: "from-[#FFD700] to-[#FDB931]"
        } as StrictTitulo,
        subtitulo: {
            classes: "text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto mb-8"
        } as StrictTexto,
        paragrafoFinal: {
            classes: "text-base text-gray-500 leading-relaxed font-light"
        } as StrictTexto
    },
    animacao: {
        habilitada: true,
        duracao: 0.8,
        ease: "power2.out",
        scrollTrigger: { start: "top 70%", end: "bottom 20%", toggleActions: "play none none reverse" }
    },
    swiper: {
        direcao: "vertical",
        autoplay: { delay: 5000, habilitado: true },
        dimensoes: { mobile: "h-[400px]", sm: "sm:h-[450px]", md: "md:h-[500px]", lg: "lg:h-[600px]" }
    },
    controles: {
        dots: {
            classesContainer: "flex gap-3 bg-[#1A1A1A] border border-white/5 px-4 py-4 lg:px-4 lg:py-4 rounded-full justify-center items-center shadow-lg",
            cores: { ativo: "bg-[#FFCC00] shadow-[0_0_10px_#FFCC00]", inativo: "bg-gray-600 hover:bg-gray-400" },
            dimensoes: { mobile: { ativo: "32px", inativo: "10px" }, desktop: { ativo: "32px", inativo: "10px" } }
        },
        playPause: {
            classesBotao: "flex items-center justify-center bg-[#1A1A1A] border border-white/10 text-white hover:bg-[#FFCC00] hover:text-black hover:border-[#FFCC00] rounded-full p-0 h-12 w-12 shadow-lg transition-all duration-300 group",
            classesIcone: "w-5 h-5",
            iconePause: "solar:pause-bold",
            iconePlay: "solar:play-bold"
        }
    },
    efeitos: {
        glow: { visivel: true, classes: "absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" },
        gradienteImagem: { classes: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" }
    }
};

export function Dna({ data }: DnaProps) {
    // 1. ADAPTADOR ESTRITO
    const rawData = data || {};

    const content = {
        // Cast explícito (as StrictBadge) diz ao TS: "Confia, isso aqui é um objeto completo"
        badge: (typeof rawData.badge === 'string' 
            ? { ...VISUAL_DEFAULTS.textos.badge, texto: rawData.badge, visivel: true }
            : (rawData.badge || { ...VISUAL_DEFAULTS.textos.badge, texto: "DNA", visivel: true })) as StrictBadge,

        titulo: (typeof rawData.titulo === 'string'
            ? { ...VISUAL_DEFAULTS.textos.titulo, texto: rawData.titulo, destaque: ".", visivel: true }
            : (rawData.titulo || { ...VISUAL_DEFAULTS.textos.titulo, texto: "", destaque: "", visivel: false })) as StrictTitulo,

        subtitulo: (typeof rawData.subtitulo === 'string'
            ? { ...VISUAL_DEFAULTS.textos.subtitulo, texto: rawData.subtitulo, visivel: true }
            : (rawData.subtitulo || { ...VISUAL_DEFAULTS.textos.subtitulo, texto: "", visivel: false })) as StrictTexto,
        
        paragrafoFinal: (rawData.textoIntroducao 
            ? { ...VISUAL_DEFAULTS.textos.paragrafoFinal, texto: rawData.textoIntroducao, visivel: true }
            : (rawData.paragrafoFinal || { ...VISUAL_DEFAULTS.textos.paragrafoFinal, texto: "", visivel: false })) as StrictTexto,

        cards: rawData.cards?.map(c => ({
            ...c,
            image: c.imagem || c.image || "/placeholder.png",
            alt: c.alt || "Imagem DNA"
        }))
    };

    const config = {
        layout: rawData.configuracoes?.layout || VISUAL_DEFAULTS.layout,
        animacao: rawData.configuracoes?.animacao || VISUAL_DEFAULTS.animacao,
        swiper: rawData.configuracoes?.swiper || VISUAL_DEFAULTS.swiper
    };

    const controles = {
        dots: rawData.controles?.dots || VISUAL_DEFAULTS.controles.dots,
        playPause: rawData.controles?.playPause || VISUAL_DEFAULTS.controles.playPause
    };

    const efeitos = rawData.efeitos || VISUAL_DEFAULTS.efeitos;
    const botao = rawData.botao;

    // Hooks
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

    const getDotDimensions = () => {
        const dim = controles.dots.dimensoes || VISUAL_DEFAULTS.controles.dots.dimensoes;
        if (windowWidth < 1024) {
            return {
                width: (index: number) => activeIndex === index ? dim.mobile.ativo : dim.mobile.inativo,
                height: () => '10px',
            };
        } else {
            return {
                width: () => '10px',
                height: (index: number) => activeIndex === index ? dim.desktop.ativo : dim.desktop.inativo,
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
        if (swiperInstance) swiperInstance.slideTo(index);
    };

    const handleSlideChange = (swiper: any) => {
        setActiveIndex(swiper.activeIndex);
    };

    useGSAP(() => {
        if (!sectionRef.current || !config.animacao.habilitada) return;
        const cardsEl = sectionRef.current.querySelectorAll('.swiper-slide');

        gsap.set(cardsEl, { opacity: 0, y: 30 });

        gsap.to(cardsEl, {
            opacity: 1,
            y: 0,
            duration: config.animacao.duracao,
            stagger: 0.1,
            ease: config.animacao.ease,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: config.animacao.scrollTrigger.start,
                end: config.animacao.scrollTrigger.end,
                toggleActions: config.animacao.scrollTrigger.toggleActions,
                markers: false,
            }
        });
    }, { dependencies: [data], scope: sectionRef });

    if (!isClient) return null;

    return (
        <section
            ref={sectionRef}
            className={config.layout.classes}
            id={rawData.id || "dna-section"}
        >
            {/* Background Glow */}
            {efeitos.glow?.visivel && (
                <div className={efeitos.glow.classes} />
            )}

            <div className={config.layout.container}>

                {/* Texto Intro */}
                <div className="flex flex-col items-center text-center w-full mb-12 text-white">
                    {content.badge.visivel && (
                        <div className={content.badge.classes}>
                            <span className={`${content.badge.corTexto} ${content.badge.classesTexto}`}>
                                {content.badge.texto}
                            </span>
                        </div>
                    )}

                    {content.titulo.visivel && (
                        <h1 className={content.titulo.classes}>
                            {content.titulo.texto}{" "}
                            <span className={`text-transparent bg-clip-text ${content.titulo.gradiente}`}>
                                {content.titulo.destaque}
                            </span>
                        </h1>
                    )}

                    {content.subtitulo.visivel && (
                        <h2
                            className={content.subtitulo.classes}
                            dangerouslySetInnerHTML={{ __html: content.subtitulo.texto }}
                        />
                    )}
                </div>

                {/* Container Principal (Swiper) */}
                {content.cards && content.cards.length > 0 && (
                    <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl mx-auto gap-8 lg:gap-12">

                        {/* Swiper */}
                        <div className="w-full lg:w-4/5 overflow-visible">
                            <Swiper
                                modules={[Autoplay]}
                                onSwiper={setSwiperInstance}
                                onSlideChange={handleSlideChange}
                                autoplay={{
                                    delay: config.swiper.autoplay.delay,
                                    disableOnInteraction: false,
                                }}
                                direction={config.swiper.direcao as "vertical" | "horizontal"}
                                slidesPerView={1}
                                spaceBetween={20}
                                centeredSlides={true}
                                className={`w-full ${config.swiper.dimensoes.mobile} ${config.swiper.dimensoes.sm} ${config.swiper.dimensoes.md} ${config.swiper.dimensoes.lg} rounded-2xl`}
                            >
                                {content.cards.map((card, index) => (
                                    <SwiperSlide key={card.id || index} className="overflow-hidden rounded-2xl group">
                                        <motion.div onClick={() => goToSlide(index)} className="w-full h-full relative cursor-pointer">
                                            <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl border border-white/5">
                                                <div className={efeitos.gradienteImagem?.classes} />
                                                <Image
                                                    src={card.image}
                                                    fill
                                                    className="object-cover object-center w-full h-full rounded-2xl transition-transform duration-700 group-hover:scale-105"
                                                    alt={card.alt || `Card ${index}`}
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                            </div>
                                        </motion.div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        {/* Controles */}
                        <div className="w-full lg:w-auto flex lg:flex-col flex-row items-center justify-center gap-6">
                            <div className={`${windowWidth < 1024 ? 'flex-row' : 'flex-col'} ${controles.dots.classesContainer}`}>
                                {content.cards.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`transition-all duration-500 focus:outline-none rounded-full ${index === activeIndex ? controles.dots.cores.ativo : controles.dots.cores.inativo}`}
                                        style={{ width: dotDimensions.width(index), height: dotDimensions.height(index) }}
                                    ></button>
                                ))}
                            </div>
                            <div className="lg:mt-0">
                                <Button onClick={handlePlayPause} className={controles.playPause.classesBotao}>
                                    {isPlaying ? (
                                        <Icon icon={controles.playPause.iconePause || "solar:pause-bold"} className={controles.playPause.classesIcone} />
                                    ) : (
                                        <Icon icon={controles.playPause.iconePlay || "solar:play-bold"} className={controles.playPause.classesIcone} />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Texto Final (Paragrafo/Botão) */}
                <div className="container relative z-20 px-6 mt-16">
                    <div className="max-w-3xl mx-auto text-gray-400 text-center space-y-8">
                        {content.paragrafoFinal.visivel && (
                            <p
                                className={content.paragrafoFinal.classes}
                                dangerouslySetInnerHTML={{ __html: content.paragrafoFinal.texto }}
                            />
                        )}
                        {botao?.visivel && (
                            <div className="flex justify-center pt-2">
                                <a href={botao.link} target="_blank" rel="noopener noreferrer" className={botao.classes.container}>
                                    <div className={botao.classes.glow}></div>
                                    <Button className={botao.classes.botao}>
                                        {botao.texto}
                                        <Icon icon={botao.icone} className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}