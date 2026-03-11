import { Header } from "@/components/Section/Header";
import { Footer } from "@/components/Section/Footer";
import Schema from "@/components/Section/Schema";
import { fetchComponentData } from "@/lib/api";
import { QuemSomos } from "@/components/web/quemSomos";
import { OQueSomos } from "@/components/web/oQueSomos";
import { MetaAlunos } from "@/components/web/metaAlunos";
import Localizacao from "@/components/Section/Localizacao";
import { CarrosselEspecialistas } from "@/components/web/carrosselEspecialistas";
import { TrabalheConosco } from "@/components/web/trabalheConosco";
import { ExplicarLogo } from "@/components/web/explicarLogo";
import Hero from "@/components/web/hero";

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
                <Localizacao data={localizacaoData} />
                <CarrosselEspecialistas />
                <TrabalheConosco/>
            </main>
            <Footer />
        </>
    );
}