import { Header } from "@/components/Header";
import expertiseConfig from "@/json/Expertise/marketingConfig.json";
import Video from "@/components/Video";
import Schema from "@/components/Schema";
import { ChamadaAcao } from "@/components/ChamadaAcao";

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
import ServiceFlow from "@/components/ServiceFlow";

// 1. Wrapper para dados de Componentes (JSON Estruturado)
async function getSafeData(slug: string) {
    try {
        const res = await fetchComponentData(slug);
        return res;
    } catch (error) {
        console.warn(`[MarketingPage] Erro ao carregar dados de ${slug}. Usando fallback.`);
        return { data: null };
    }
}

// 2. Wrapper para dados de Formulário (Estrutura plana 'values')
async function getFormData(slug: string) {
    try {
        const res = await fetch(`https://tegbe-dashboard.vercel.app/api/tegbe-institucional/form/${slug}`, {
            next: { revalidate: 60 }
        });
        if (!res.ok) throw new Error('Falha no fetch');
        return res.json();
    } catch (error) {
        console.warn(`[MarketingPage] Erro ao carregar form ${slug}.`);
        return { values: [] };
    }
}

export default async function MarketingPage() {
    // 3. PERFORMANCE: Promise.all dispara 6 requisições em paralelo.
    // Zero Waterfall. O tempo de carregamento será ditado pela requisição mais lenta, não pela soma delas.
    const [
        headlineResponse,
        companyResponse,
        ctaResponse,
        equipeResponse,   // Endpoint: .../json/equipe (Seção "Why Tegbe")
        servicesResponse, // Endpoint: .../form/services
        empresasResponse  // Endpoint: .../json/empresas (Seção "Logos/Social Proof")
    ] = await Promise.all([
        getSafeData('headline'),
        getSafeData('company'),
        getSafeData('call-to-action'),
        getSafeData('equipe'),
        getFormData('services'),
        getSafeData('empresas')
    ]);

    // 4. Extração Cirúrgica dos Nós (Variante 'marketing')
    const companysData = companyResponse?.data?.marketing || null;
    const ctaData = ctaResponse?.data?.marketing || null;
    const equipeData = equipeResponse?.data?.marketing || null;     // Dados para <Equipe />
    const empresasData = empresasResponse?.data?.marketing || null; // Dados para <Empresas />

    // Extração do array de serviços
    const servicesData = servicesResponse?.values || [];
    const data = await fetch('https://tegbe-dashboard.vercel.app/api/tegbe-institucional/json/hero-images').then(res => res.json());

    return (
        <>
            <Schema
                data={{
                    "@context": "https://schema.org",
                    "@type": "Service",
                    name: "Marketing Digital e Performance",
                    description: "A Tegbe oferece serviços de marketing digital e performance, com foco em tráfego pago, estratégia, dados e conversão. A atuação é orientada por métricas, tecnologia e metodologia própria, ajudando empresas a estruturarem e escalarem suas operações digitais de forma previsível e sustentável.",
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

            <Header variant="marketing" />

            <Headline variant="marketing" />

            <AgenciasFalham />
            <Video />
            <ServiceFlow variant="marketing" />

            {/* Seção Deep Dive / Services */}
            <ExploreDetails features={servicesData} />

            {/* Seção Logos / Social Proof */}
            <Empresas variant="marketing" data={empresasData} />

            <NaoEParaVoce />
            <Expertise />
            <SectionImage variant="marketing" apiData={data} />

            {/* Seção Why Tegbe (Dados vindos de /json/equipe) */}
            <Equipe variant="marketing" data={equipeData} />

            {/* Seção Depoimentos / Track Record */}
            <Companys variant="marketing" data={companysData} />

            {/* Seção Final CTA */}
            <ChamadaAcao variant="marketing" data={ctaData} />

            <Footer variant="marketing" />
        </>
    );
}