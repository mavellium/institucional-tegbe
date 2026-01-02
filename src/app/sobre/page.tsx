'use client';

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Schema from "@/components/Schema";
import { ChamadaAcao } from "@/components/ChamadaAcao";
import Cards from "@/components/Cards";
import { Empresas } from "@/components/Empresas";
import Historia from "@/components/ExploreDetails/Historia";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Sobre from "@/components/Sobre";
import AnosMercado from "@/components/Expertise/AnosMercado";
import Metricas from "@/components/News/Metricas";
import { SociosCrescimento } from "@/components/SociosCrescimento";
import Video2 from "@/components/Video2";
import Localizacao from "@/components/Localizacao";

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
            <Localizacao />
            <ChamadaAcao variant="sobre" />
            <Footer variant="sobre" />
        </>
    );
}