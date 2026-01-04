import { Header } from "@/components/Header";
import expertiseConfig from "@/json/Expertise/marketingConfig.json";
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
import { fetchComponentData } from "@/lib/api";

// Função Wrapper Segura para o Fetch
async function getSafeData(slug: string) {
  try {
    const res = await fetchComponentData(slug);
    return res;
  } catch (error) {
    console.warn(`[MarketingPage] Erro ao carregar dados de ${slug}. Usando fallback.`);
    return { data: null };
  }
}

export default async function MarketingPage() {
    // 1. Busca os dados do Headline (Variante Marketing será aplicada via prop)
    const headlineResponse = await getSafeData('headline');

    return (
        <>
            <Schema
                data={{
                    "@context": "https://schema.org",
                    "@type": "Service",
                    name: "Marketing Digital e Performance",
                    provider: {
                        "@type": "Organization",
                        name: "Tegbe",
                    },
                }}
            />
            
            {/* Header com a cor Rosa (Marketing) */}
            <Header variant="marketing" />
            
            {/* Headline consumindo API + Variante Marketing */}
            <Headline data={headlineResponse.data} variant="marketing" />
            
            <AgenciasFalham />
            <Video />
            <Cards variant="marketing" />
            <ExploreDetails />
            <Empresas variant="marketing" />
            <NaoEParaVoce />
            <Expertise config={expertiseConfig}/>
            <SectionImage variant="marketing" />
            <Equipe variant="marketing" />
            <Companys variant="marketing" />
            <ChamadaAcao variant="marketing" />
            <Footer variant="marketing" />
        </>
    );
}