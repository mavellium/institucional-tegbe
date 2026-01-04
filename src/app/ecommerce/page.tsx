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
import { fetchComponentData } from "@/lib/api";

// Função Wrapper Segura para o Fetch
async function getSafeData(slug: string) {
  try {
    const res = await fetchComponentData(slug);
    return res;
  } catch (error) {
    console.warn(`[EcommercePage] Erro ao carregar dados de ${slug}. Usando fallback.`);
    return { data: null };
  }
}

export default async function EcommercePage() {
    // 1. Busca os dados do Headline (que contém a variante 'ecommerce' no JSON)
    const headlineResponse = await getSafeData('headline');

    return (
        <>
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
            
            {/* Header com a cor Amarela */}
            <Header variant="ecommerce" />
            
            {/* Headline consumindo API + Variante */}
            <Headline data={headlineResponse.data} variant="ecommerce" />
            
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