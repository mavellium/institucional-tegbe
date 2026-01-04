'use client';

import videoConfig from "@/json/Video2/cursoConfig.json";
import expertiseConfig from "@/json/Expertise/cursosConfig.json"
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
import { SectionImage } from "@/components/SectionImage";
import NaoEParaVoce from "@/components/NaoEParaVoce";
import { Equipe } from "@/components/Equipe";
import HeadlineCurso from "@/components/HeadlineCurso";
import PorqueAprender from "@/components/PorqueAprender";
import Video2 from "@/components/Video2";
import Cursos from "@/components/Cursos";
import Carrossel from "@/components/Carrossel";
import GaleriaFotos from "@/components/GaleriaFotos";
import ComparacaoConcorrentes from "@/components/ComparacaoConcorrentes";
import Preco from "@/components/Preco";
import Faq from "@/components/Faq";

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
            <Header variant="cursos" />
            <HeadlineCurso/>
            <PorqueAprender />
            <Video2 config={videoConfig}/>
            <Cursos/>
            <Carrossel/>
            <GaleriaFotos/>
            <Expertise config={expertiseConfig}/>
            <ComparacaoConcorrentes/>
            <Preco/>
            <Faq/>
            <Footer variant="cursos" />
        </>
    );
}