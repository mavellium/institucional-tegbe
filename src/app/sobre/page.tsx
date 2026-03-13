import { Header } from "@/components/Section/Header";
import { Footer } from "@/components/Section/Footer";
import Schema from "@/components/Section/Schema";
import { fetchComponentData } from "@/lib/api";
import { QuemSomos } from "@/components/web/quemSomos";
import { OQueSomos } from "@/components/web/oQueSomos";
import { MetaAlunos } from "@/components/web/metaAlunos";
import { CarrosselEspecialistas } from "@/components/web/carrosselEspecialistas";
import { SideBySideSection } from "@/components/web/generics/sideBySideSection";
import Hero from "@/components/web/hero";
import Localizacao from "@/components/web/localizacao";

// 1. Centralização de Configurações
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const REVALIDATE_TIME = 3600; // Otimizado: 1 hora (60s é muito pouco para página 'sobre')

// 2. Fetcher Único Otimizado (Evita repetição de código)
async function getPageData(slug: string, isComponent = false) {
    try {
        if (isComponent) {
            const res = await fetchComponentData(slug);
            // Sanitização profunda para evitar erros de serialização (Client Components)
            return JSON.parse(JSON.stringify(res?.data?.sobre || null));
        }
        
        const res = await fetch(`${API_URL}/${slug}`, {
            next: { revalidate: REVALIDATE_TIME }
        });
        
        if (!res.ok) return [];
        const json = await res.json();
        return JSON.parse(JSON.stringify(json?.values || []));
    } catch (e) {
        console.error(`[SobrePage] Erro em ${slug}:`, e);
        return isComponent ? null : [];
    }
}

export const localizacaoFake = [
  {
    id: "1",
    alt: "Escritório Tegbe em Garça",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c",
    title: "Nosso QG estratégico fica em Garça, São Paulo.",
    description:
      "É daqui que coordenamos projetos, estratégias e operações digitais que impactam empresas em todo o Brasil. Nossa estrutura é enxuta, estratégica e totalmente conectada."
  },
  {
    id: "2",
    alt: "Ambiente de trabalho da equipe",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    title: "Nosso QG estratégico fica em Garça, São Paulo.",
    description:
      "É daqui que coordenamos projetos, estratégias e operações digitais que impactam empresas em todo o Brasil. Nossa estrutura é enxuta, estratégica e totalmente conectada."
  },
  {
    id: "3",
    alt: "Time trabalhando em projetos digitais",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72",
    title: "Nosso QG estratégico fica em Garça, São Paulo.",
    description:
      "É daqui que coordenamos projetos, estratégias e operações digitais que impactam empresas em todo o Brasil. Nossa estrutura é enxuta, estratégica e totalmente conectada."
  }
];

export default async function SobrePage() {
    // 3. Execução em Paralelo (All-or-Nothing Treatment)
    // Buscamos apenas o que é essencial para o carregamento inicial
    const [
        localizacaoData,
        metricasData,
        empresasData,
        ctaData
    ] = await Promise.all([
        getPageData('localizacao'),
        getPageData('metricas'),
        getPageData('empresas', true),
        getPageData('call-to-action', true)
    ]);

    return (
        <>
            <Schema
                data={{
                    "@context": "https://schema.org",
                    "@type": "AboutPage",
                    "mainEntity": {
                        "@type": "Organization",
                        "name": "Tegbe",
                        "url": "https://tegbe.com.br",
                        "logo": "https://tegbe.com.br/logo.png",
                        "description": "Agência de performance especializada em e-commerce e escala de resultados.",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Garça",
                            "addressRegion": "SP",
                            "addressCountry": "BR"
                        }
                    }
                }}
            />

            <Header />
            <main>
                <Hero/>
                <QuemSomos /> 
                <OQueSomos />
                <MetaAlunos  />
                <CarrosselEspecialistas />
                <Localizacao data={localizacaoFake} />
                <SideBySideSection 
                    type={"trabalheConosco"}
                    data={{
                        "hero": {
                            "tag": "Quer construir sua carreira na Tegbe?",
                            "title": "Trabalhe conosco",
                            "description": "Se você quer crescer ao lado de empreendedores que constroem negócios relevantes, conheça nossas oportunidades.",
                            "button": {
                            "label": "Conheça nossas vagas",
                            "link": "/carreiras"
                            },
                            "image": {
                            "src": "/doni.jpg",
                            "alt": "Equipe G4"
                            }
                        },
                        "social": {
                            "tag": "Mantenha-se atualizado",
                            "title": "Acompanhe nossas mídias",
                            "items": [
                            { "icon": "ph:youtube-logo-fill", "link": "#" },
                            { "icon": "ph:facebook-logo-fill", "link": "#" },
                            { "icon": "ph:instagram-logo-fill", "link": "#" },
                            { "icon": "ph:linkedin-logo-fill", "link": "#" }
                            ]
                        }
                    }}
                />
            </main>
            <Footer />
        </>
    );
}