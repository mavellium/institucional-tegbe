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
import Historia from "@/components/ExploreDetails/Historia";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Cards4 from "@/components/Cards/Cards4";
import Sobre from "@/components/Sobre";
import Empresas2 from "@/components/Empresas2";
import AnosMercado from "@/components/Expertise/AnosMercado";
import Metricas from "@/components/News/Metricas";
import ChamadaAcao2 from "@/components/ChamadaAcao2";
import SociosCrescimento from "@/components/Equipe/SociosCrescimento";
import Video2 from "@/components/Video2";

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
            <Header variant="sobre" />
            <section className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#020202] selection:bg-yellow-500/30 pt-[80px]">

                {/* --- CAMADA 1: Atmosfera & Profundidade --- */}

                {/* Grid sutil para dar ar "Tech" (Opcional, mas adiciona textura) */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

                {/* Spotlight Central - Foca o olhar no centro da tela */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] opacity-40 mix-blend-screen pointer-events-none" />

                {/* --- CAMADA 2: Conteúdo --- */}
                <SociosCrescimento />
            </section>
            <Sobre/>
            <Video2 />
            <Cards4 />
            <Historia />
            <Empresas2 />
            <AnosMercado />
            <Metricas />
            <ChamadaAcao2 />
            <Footer variant="sobre" />
        </>
    );
}