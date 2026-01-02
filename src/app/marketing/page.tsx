'use client';

import { Header } from "@/components/Header";
import Video from "@/components/Video";
import Schema from "@/components/Schema";
import { ChamadaAcao } from "@/components/ChamadaAcao";
import Cards from "@/components/Cards";
import AgenciasFalham from "@/components/AgenciasFalham";
import ExploreDetails from "@/components/ExploreDetails";
import Expertise from "@/components/Expertise";
import { Companys } from "@/components/Companys";
import { Empresas } from "@/components/Empresas";
import { Footer } from "@/components/Footer";
import { Headline } from "@/components/Headline";
import { SectionImage } from "@/components/SectionImage";
import NaoEParaVoce from "@/components/NaoEParaVoce";
import { Equipe } from "@/components/Equipe";

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
            <NaoEParaVoce />
            <Expertise />
            <SectionImage variant="marketing" />
            <Equipe variant="marketing" />
            <Companys variant="marketing" />
            <ChamadaAcao variant="marketing" />
            <Footer variant="marketing" />
        </>
    );
}