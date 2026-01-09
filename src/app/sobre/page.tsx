import videoConfig from "@/json/Video2/sobreConfig.json";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Schema from "@/components/Schema";
import { ChamadaAcao } from "@/components/ChamadaAcao";
import Cards from "@/components/Cards";
import { Empresas } from "@/components/Empresas";
import Historia from "@/components/ExploreDetails/Historia";
import Sobre from "@/components/Sobre";
import AnosMercado from "@/components/Expertise/AnosMercado";
import Metricas from "@/components/Resultados/Metricas";
import { SociosCrescimento } from "@/components/SociosCrescimento";
import Video2 from "@/components/Video2";
import Localizacao from "@/components/Localizacao";
import { fetchComponentData } from "@/lib/api";

// 1. Wrapper para dados de Forms (Estrutura plana: { values: [] })
// Usado para Historia, Metricas, Localizacao
async function getFormData(slug: string) {
    try {
        const res = await fetch(`https://tegbe-dashboard.vercel.app/api/tegbe-institucional/form/${slug}`, { 
            next: { revalidate: 60 } 
        });
        if (!res.ok) throw new Error('Falha no fetch');
        return res.json();
    } catch (error) {
        console.warn(`[SobrePage] Erro ao carregar form ${slug}.`);
        return { values: [] };
    }
}

// 2. Wrapper para dados de Componentes (Estrutura aninhada: { data: { ... } })
// Usado para Empresas, CTA, etc.
async function getSafeData(slug: string) {
  try {
    const res = await fetchComponentData(slug);
    return res;
  } catch (error) {
    console.warn(`[SobrePage] Erro ao carregar dados de ${slug}. Usando fallback.`);
    return { data: null };
  }
}

export default async function SobrePage() {
    // 3. PERFORMANCE: 5 Requests em Paralelo
    const [
        historiaResponse, 
        empresasResponse, 
        ctaResponse, // Endpoint: call-to-action
        metricasResponse,
        localizacaoResponse
    ] = await Promise.all([
        getFormData('historia'),    
        getSafeData('empresas'),    
        getSafeData('call-to-action'), 
        getFormData('metricas'),
        getFormData('localizacao')
    ]);

    // 4. Extração e Tratamento
    const historiaData = historiaResponse?.values || [];
    const metricasData = metricasResponse?.values || [];
    const localizacaoData = localizacaoResponse?.values || [];
    
    // Extraindo dados específicos da variante 'sobre'
    // O fallback '|| null' protege o componente caso o endpoint falhe ou o nó não exista
    const empresasData = empresasResponse?.data?.sobre || null;
    const ctaData = ctaResponse?.data?.sobre || null;

    return (
        <>
            <Schema
                data={{
                    "@context": "https://schema.org",
                    "@type": "Service",
                    name: "Sobre a Tegbe",
                    provider: {
                        "@type": "Organization",
                        name: "Tegbe",
                    },
                }}
            />

            <Header variant="sobre" />
            
            {/* Se SociosCrescimento for estático, ok. Se precisar de dados, adicione aqui */}
            <SociosCrescimento variant="sobre" />
            
            <Sobre />
            
            <Video2 config={videoConfig} />
            
            <Cards variant="sobre" />
            
            {/* Componentes Data-Driven */}
            <Historia data={historiaData} />
            
            <Empresas variant="sobre" data={empresasData} />
            
            <AnosMercado />
            
            <Metricas data={metricasData} />
            
            <Localizacao data={localizacaoData} />
            
            <ChamadaAcao variant="sobre" data={ctaData} />
            
            <Footer variant="sobre" />
        </>
    );
}