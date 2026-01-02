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
import Companys from "@/components/News/Companys";
import { Footer } from "@/components/Footer";
import Schema from "@/components/Schema";
import Equipe from "@/components/Equipe";
import ChamadaAcao from "@/components/ChamadaAcao";
import Cards from "@/components/Cards";
import Animacao from "@/components/Animacao";
import AgenciasFalham from "@/components/Equipe/AgenciasFalham";
import ExploreDetails from "@/components/ExploreDetails";
import { Empresas } from "@/components/Empresas";
import Expertise from "@/components/Expertise";
import Historia from "@/components/ExploreDetails/Historia";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Sobre from "@/components/Sobre";
import Empresas2 from "@/components/Empresas2";
import AnosMercado from "@/components/Expertise/AnosMercado";
import Metricas from "@/components/News/Metricas";
import ChamadaAcao2 from "@/components/ChamadaAcao2";
import { SociosCrescimento } from "@/components/SociosCrescimento";
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
            <SociosCrescimento variant="sobre" />
            <Sobre />
            <Video2 />
            <Cards variant="sobre" />
            <Historia />
            <Empresas variant="sobre" />
            <AnosMercado />
            <Metricas />
            <ChamadaAcao2 />
            <Footer variant="sobre" />
        </>
    );
}