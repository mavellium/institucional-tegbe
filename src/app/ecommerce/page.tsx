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
import { Headline } from "@/components/Headline";
import { SectionImage } from "@/components/SectionImage";

export default function EcommercePage() {
    <Schema
        data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: "E-commerce",
            provider: {
                "@type": "Organization",
                name: "Tegbe",
            },
        }}
    />
    return (
        <>
            <Header />
            <Headline variant="ecommerce"/>
            {/* <Video /> */}
            <SellMore />
            <Cards variant="home" />
            <Animacao/>
            <Plataforms />
            <Logos />
            <Cards variant="ecommerce" />
            <SectionImage />
            <Equipe/>
            <Companys />
            <ChamadaAcao/>
            <Footer />
        </>
    );
}