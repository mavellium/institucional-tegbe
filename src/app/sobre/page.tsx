'use client';

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Video from "@/components/Video";
import SellMore from "@/components/SellMore";
import Plataforms from "@/components/Steps/Plataforms";
import Logos from "@/components/Logos";
import Cards2 from "@/components/Cards/Cards2";
import Companys from "@/components/News/Companys";
import { Footer } from "@/components/Footer";
import Schema from "@/components/Schema";
import Equipe from "@/components/Equipe";
import ChamadaAcao from "@/components/ChamadaAcao";
import Cards from "@/components/Cards";
import Animacao from "@/components/Animacao";
import AgenciasFalham from "@/components/Equipe/AgenciasFalham";
import Cards3 from "@/components/Cards/Cards3";
import ExploreDetails from "@/components/ExploreDetails";
import Empresas from "@/components/Equipe/Empresas";
import Expertise from "@/components/Expertise";
import SociosCrecimento from "@/components/Equipe/SociosCrecimento";
import Historia from "@/components/ExploreDetails/Historia";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Cards4 from "@/components/Cards/Cards4";

export default function EcommercePage() {
    <Schema
        data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Sobre",
            provider: {
                "@type": "Organization",
                name: "Tegbe",
            },
        }}
    />

    const sectionRef = useRef(null);

    useGSAP(() => {
        gsap.from(".reveal-text", {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
            },
        });
    }, { scope: sectionRef });
    return (
        <>
            <Header />
            <section className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#020202] selection:bg-yellow-500/30 pt-[80px]">

                {/* --- CAMADA 1: Atmosfera & Profundidade --- */}

                {/* Grid sutil para dar ar "Tech" (Opcional, mas adiciona textura) */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

                {/* Spotlight Central - Foca o olhar no centro da tela */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] opacity-40 mix-blend-screen pointer-events-none" />

                {/* --- CAMADA 2: Conteúdo --- */}
                <SociosCrecimento />
            </section>

            <Video />
            <section
                ref={sectionRef}
                className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#F4F4F4] pt-[80px] pb-[20px]"
            >
                {/* Luzes de Fundo - Mantidas sutis */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#0071E3]/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="container max-w-5xl relative z-10">
                    <div className="flex flex-col items-center text-center w-full">

                        {/* Badge Minimalista */}
                        <div className="reveal-text mb-6 flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/5">
                            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#0071E3] to-[#00a2ff] animate-pulse"></span>
                            <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">
                                Método Validado Tegbe
                            </span>
                        </div>

                        <h1 className="reveal-text font-bold text-3xl sm:text-5xl md:text-5xl mb-6 leading-tight tracking-tight text-black max-w-4xl">
                            Bastidores de quem  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] to-[#00a2ff]">vive o jogo.</span>
                        </h1>

                        <div className="reveal-text max-w-4xl text-center md:text-start space-y-5 mb-10">
                            <p className="text-lg md:text-xl text-black-900 font-light leading-relaxed">
                                Fundada por Donizete Caetano, a Tegbe não é um experimento. É a consolidação de anos gerenciando orçamentos de alta responsabilidade.
                            </p>
                            <p className="text-lg md:text-xl text-black-900 font-light leading-relaxed">
                                Vimos de perto o que funciona e, principalmente,
                                onde as empresas queimam dinheiro. Criamos a estrutura
                                que gostaríamos de contratar: transparente, técnica e
                                implacável na busca por resultados. Aqui, tratamos o
                                seu orçamento com o mesmo respeito e rigor que tratamos
                                o nosso próprio capital.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Cards4 />
            <Historia />
            <Empresas />
            <Expertise />
            <Companys />
            <ChamadaAcao />
            <Footer />
        </>
    );
}