'use client';

import { Header } from "@/components/Header";
import SellMore from "@/components/SellMore";
import Plataforms from "@/components/Steps/Plataforms";
import Logos from "@/components/Logos";
import { Companys } from "@/components/Companys";
import { Footer } from "@/components/Footer";
import Schema from "@/components/Schema";
import { Equipe } from "@/components/Equipe";
import { ChamadaAcao } from "@/components/ChamadaAcao";
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
            <SectionImage variant="ecommerce" />
            <Equipe variant="ecommerce"/>
            <Companys variant="ecommerce" />
            <ChamadaAcao variant="ecommerce" />
            <Footer />
        </>
    );
}