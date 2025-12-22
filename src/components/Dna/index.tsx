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

// Registrar o plugin ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function Dna() {
    const cards = [
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

    function renderBoldText(text: string) {
        return text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
            if (part.startsWith("**") && part.endsWith("**")) {
                return (
                    <strong key={index} className="font-bold">
                        {part.replace(/\*\*/g, "")}
                    </strong>
                );
            }
            return part;
        });
    }

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

    // Atualizar o índice ativo quando o slide mudar
    const handleSlideChange = (swiper: any) => {
        setActiveIndex(swiper.activeIndex);
    };

    // Função para obter dimensões dos dots baseadas na largura da tela
    const getDotDimensions = (index: number) => {
        if (windowWidth >= 1024) {
            // Desktop - dots verticais
            return {
                width: index === activeIndex ? '8px' : '8px',
                height: index === activeIndex ? '32px' : '8px',
            };
        } else {
            // Mobile/Tablet - dots horizontais
            return {
                width: index === activeIndex ? '32px' : '8px',
                height: index === activeIndex ? '8px' : '8px',
            };
        }
    };

    // Animação GSAP para os slides
    useGSAP(() => {
        if (!sectionRef.current) return;

        const cards = sectionRef.current.querySelectorAll('.swiper-slide');

        // Configurar estado inicial
        gsap.set(cards, {
            opacity: 0,
            y: 30
        });

        // Animação com ScrollTrigger
        const animation = gsap.to(cards, {
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
            className="py-20 w-full flex flex-col justify-center items-center bg-black px-5"
            id="setors"
        >
            <div className="container flex flex-col justify-center">
                {/* Texto */}
                <div className="flex flex-col items-center text-center w-full mb-10 text-white">
                    <h1 className="font-bold text-2xl sm:text-4xl md:text-5xl mb-5 leading-tight max-w-4xl">
                        Sua operação guiada por quem entende o DNA do Mercado Livre.
                    </h1>

                    <h2 className="text-sm sm:text-base md:text-lg text-[#CCCCCE] font-medium leading-relaxed max-w-3xl">
                        Esqueça os "hacks" temporários e as teorias de palco. Ser liderado por um <strong className="text-white">Consultor
                        Oficial Certificado</strong> significa que sua estratégia não é baseada em "achismo",
                        Oficial Certificado significa que sua estratégia não é baseada em "achismo",
                        mas sim em dados diretos da fonte. Nós não tentamos adivinhar o algoritmo;
                        nós jogamos com o manual de regras debaixo do braço para garantir a segurança
                        e a escala da sua conta.
                    </h2>
                </div>

                {/* Container principal com Swiper e controles lado a lado */}
                <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl mx-auto gap-8 lg:gap-4">
                    {/* Swiper totalmente responsivo para todas as telas */}
                    <div className="w-full lg:w-4/5 overflow-visible">
                        <Swiper
                            modules={[Autoplay]}
                            onSwiper={setSwiperInstance}
                            onSlideChange={handleSlideChange}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            centeredSlides={true}
                            slidesPerView={0.85} // Mobile pequeno
                            spaceBetween={10}
                            breakpoints={{
                                // Mobile médio (sm)
                                640: {
                                    slidesPerView: 0.85,
                                    spaceBetween: 12,
                                    centeredSlides: true,
                                },
                                // Tablet (md)
                                768: {
                                    slidesPerView: 0.9,
                                    spaceBetween: 16,
                                    centeredSlides: true,
                                },
                                // Desktop pequeno (lg)
                                1024: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                    centeredSlides: false,
                                },
                                // Desktop médio (xl)
                                1280: {
                                    slidesPerView: 1,
                                    spaceBetween: 24,
                                    centeredSlides: false,
                                },
                                // Desktop grande (2xl)
                                1536: {
                                    slidesPerView: 1,
                                    spaceBetween: 28,
                                    centeredSlides: false,
                                },
                            }}
                            className="w-full"
                        >
                            {cards.map((card, index) => (
                                <SwiperSlide key={card.id} className="overflow-visible">
                                    <motion.div
                                        onClick={() => goToSlide(index)}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex flex-col items-center"
                                    >
                                        {/* Card principal - Altura responsiva para todas as telas */}
                                        <div className="relative overflow-hidden rounded-2xl shadow-md cursor-pointer 
                                            w-[90vw] xs:w-[92vw] sm:w-[92vw] md:w-[92vw] lg:w-full max-w-[900px] mx-auto">
                                            <img
                                                src={card.image}
                                                className="object-cover object-center w-full 
                                                    h-[280px] xs:h-[300px] sm:h-[340px] 
                                                    md:h-[380px] lg:h-[450px] xl:h-[520px] 2xl:h-[600px] 
                                                    rounded-2xl"
                                            />
                                        </div>
                                    </motion.div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Controles - Dots + Play/Pause em coluna vertical (desktop) ou horizontal (mobile) */}
                    <div className="w-full lg:w-auto flex lg:flex-col items-center justify-center mt-8 lg:mt-0 gap-4">
                        {/* Dots no estilo Nubank */}
                        <div className="flex lg:flex-col gap-2 bg-[#262629] px-4 py-4 rounded-full justify-center items-center">
                            {cards.map((_, index) => {
                                const dimensions = getDotDimensions(index);
                                return (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`transition-all duration-300 focus:outline-none ${index === activeIndex
                                            ? "bg-white"  // Ativo - preto
                                            : "bg-[#CCCCCE] hover:bg-white"  // Inativos
                                            }`}
                                        style={{
                                            width: dimensions.width,
                                            height: dimensions.height,
                                            borderRadius: '100px'
                                        }}
                                    ></button>
                                );
                            })}
                        </div>

                        {/* Botão Play/Pause padronizado */}
                        <div className="lg:mt-4">
                            <Button
                                onClick={handlePlayPause}
                                className="flex items-center justify-center bg-[#262629] backdrop-blur-md text-white hover:bg-[#151516]/30 
                                    rounded-full p-3 h-10 w-10 sm:w-10 sm:h-10 shadow-sm"
                            >
                                {isPlaying ? (
                                    <Icon icon="solar:pause-bold" className="w-5 h-5 sm:w-5 sm:h-5 text-white" />
                                ) : (
                                    <Icon icon="solar:play-bold" className="w-5 h-5 sm:w-5 sm:h-5 text-white" />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
                {/* Conteúdo */}
                <div className="container relative z-20 px-6 sm:px-10 md:px-16 mt-10">
                    <div
                        className="max-w-xl md:max-w-3xl mx-auto text-[#CCCCCE] text-center space-y-6 sm:space-y-8">
                        <p className="text-sm sm:text-base md:text-lg font-medium leading-relaxed">
                            Mas estratégia sem braço não gera lucro. Por isso, Doni formou uma <strong className="text-white">Tropa
                            de Elite Operacional.</strong> Cada membro da foto acima é especialista em um pilar
                            vital: Tráfego, Design, Copy e Logística. Você não contrata apenas um consultor;
                            você pluga seu negócio a um ecossistema de performance que respira Mercado Livre
                            24 horas por dia.</p>
                        <a
                            href="https://api.whatsapp.com/send?phone=5514991779502"
                            target="_blank"
                            className="flex gap-2 items-center justify-center mt-4"
                        >
                            <Button className="shadow-lg bg-[#0071E3] text-white hover:bg-[#2B3374] cursor-pointer 
                                text-sm sm:text-lg transition max-w-[400px] w-full h-12 rounded-full">
                                Falar com um Especialista
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}