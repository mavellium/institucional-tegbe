'use client';

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Video from "@/components/Video";
import Schema from "@/components/Schema";
import ChamadaAcao from "@/components/MKT/ChamadaAcao";
import Cards from "@/components/Cards";
import Animacao from "@/components/Animacao";
import AgenciasFalham from "@/components/Equipe/AgenciasFalham";
import ExploreDetails from "@/components/ExploreDetails";
import Expertise from "@/components/Expertise";
import Equipe from "@/components/MKT/Equipe";
import Companys from "@/components/MKT/Companys";
import { Empresas } from "@/components/Empresas";
import { Footer } from "@/components/Footer";
import { Headline } from "@/components/Headline";
import { SectionImage } from "@/components/SectionImage";
import { SociosCrescimento } from "@/components/SociosCrescimento";

export default function marketing() {
    <Schema
        data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Marketing",
            provider: {
                "@type": "Organization",
                name: "Tegbe",
            },
        }}
    />
    return (
        <>
            <Header variant="marketing" />
            <Headline variant="marketing" />
            <AgenciasFalham />
            <Video />
            <Cards variant="marketing" />
            <ExploreDetails />
            <Empresas variant="marketing" />
            <SociosCrescimento variant="marketing" />
            <Expertise />
            <SectionImage variant="marketing"/>
            <Equipe />
            <Companys />
            <ChamadaAcao />
            <Footer variant="marketing" />
        </>
    );
}