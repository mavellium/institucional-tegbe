import videoConfig from "@/json/Video2/sobreConfig.json";
import { Header } from "@/components/Section/Header";
import { Footer } from "@/components/Section/Footer";
import Schema from "@/components/Section/Schema";
import { ChamadaAcao } from "@/components/Section/ChamadaAcao";
import { Empresas } from "@/components/Section/Empresas";
import Historia from "@/components/Section/ExploreDetails/Historia";
import Sobre from "@/components/Section/Sobre";
import AnosMercado from "@/components/Section/Expertise/AnosMercado";
import Metricas from "@/components/Section/Resultados/Metricas";
import { SociosCrescimento } from "@/components/Section/SociosCrescimento";
import Video2 from "@/components/Section/Video2";
import Localizacao from "@/components/Section/Localizacao";
import { fetchComponentData } from "@/lib/api";
import ServiceFlow from "@/components/Section/ServiceFlow";

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
                    description: "Conheça a Tegbe: agência de marketing digital e performance especializada em e-commerce, estratégia, dados e crescimento real de negócios.",
                    provider: {
                        "@type": "Organization",
                        name: "Tegbe",
                        description: "Agência de marketing digital e consultoria especializada em transformar presença online em resultados reais de vendas, especializada em e-commerce e performance digital.",
                        url: "https://tegbe.com.br",
                        logo: "https://tegbe.com.br/logo.png",
                        contactPoint: [{
                            "@type": "ContactPoint",
                            contactType: "customer support",
                            telephone: "+55 14 98828-1001",
                            email: "contato@tegbe.com.br",
                            availableLanguage: "Portuguese"
                        }],
                        address: {
                            "@type": "PostalAddress",
                            streetAddress: "R. Santos Dumont, 133, Ferrarópolis",
                            addressLocality: "Garça",
                            addressRegion: "SP",
                            postalCode: "17400-074",
                            addressCountry: "BR"
                        },
                        sameAs: [
                            "https://www.instagram.com/agenciategbe",
                            "https://www.facebook.com/TegbeSolucoes",
                            "https://www.linkedin.com/company/tegbe/"
                        ]
                    },
                    areaServed: {
                        "@type": "Place",
                        address: {
                            "@type": "PostalAddress",
                            addressLocality: "Garça",
                            addressRegion: "SP",
                            addressCountry: "BR"
                        }
                    },
                }}
            />

            <Header />

            <SociosCrescimento variant="sobre" />
            <Sobre />
            <Video2 variant="sobre" />
            <ServiceFlow variant="sobre" />
            <Historia />
            <Empresas variant="sobre" data={empresasData} />
            <AnosMercado />
            <Metricas />
            <Localizacao data={localizacaoData} />
            <ChamadaAcao variant="sobre" data={ctaData} />

            <Footer variant="sobre" />
        </>
    );
}