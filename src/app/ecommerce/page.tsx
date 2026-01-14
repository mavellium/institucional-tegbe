import { Header } from "@/components/Header";
import SellMore from "@/components/SellMore";
import Logos from "@/components/Logos";
import { Companys } from "@/components/Companys";
import { Footer } from "@/components/Footer";
import Schema from "@/components/Schema";
import { Equipe } from "@/components/Equipe";
import { ChamadaAcao } from "@/components/ChamadaAcao";
import Animacao from "@/components/Animacao";
import { Headline } from "@/components/Headline";
import { SectionImage } from "@/components/SectionImage";
import { fetchComponentData } from "@/lib/api";
import Plataforms from "@/components/Solucoes/Plataforms";
import Passos from "@/components/Passos";
import ServiceFlow from "@/components/ServiceFlow";
import CertifiedSection from "@/components/ServiceFlow/CertifiedSection";

async function getSafeData(slug: string) {
    try {
        const res = await fetchComponentData(slug);

        // Verificação baseada em existência, evitando o erro de propriedade 'status'
        if (!res || !res.data) {
            console.warn(`[Tegbe Build] Dados não encontrados para: ${slug}`);
            return { data: null };
        }

        return res;
    } catch (error) {
        return { data: null };
    }
}

export default async function EcommercePage() {
    // PERFORMANCE: Busca paralela
    const [
        headlineRes,
        companyRes,
        ctaRes,
        equipeRes,
        stepsRes
    ] = await Promise.all([
        getSafeData('headline'),
        getSafeData('company'),
        getSafeData('call-to-action'),
        getSafeData('equipe'),
        fetch('https://tegbe-dashboard.vercel.app/api/tegbe-institucional/form/steps', { next: { revalidate: 3600 } })
            .then(res => res.ok ? res.json() : [])
            .catch(() => [])
    ]);

    // Extração Segura (Null Coalescing)
    const headlineData = headlineRes?.data ?? null;
    const companysData = companyRes?.data?.ecommerce ?? null;
    const ctaData = ctaRes?.data?.ecommerce ?? null;
    const equipeData = equipeRes?.data?.ecommerce ?? null;

    // Tratamento para garantir que steps seja sempre um Array
    const stepsData = Array.isArray(stepsRes) ? stepsRes : (stepsRes?.steps || []);

    const data = await fetch('https://tegbe-dashboard.vercel.app/api/tegbe-institucional/json/hero-images').then(res => res.json());

    return (
        <>
            <Schema
                data={{
                    "@context": "https://schema.org",
                    "@type": "Service",
                    name: "E-commerce",
                    description: "Consultoria especializada em e-commerce para escalar vendas online. Estratégia, tráfego pago, marketplaces, CRM e performance digital com foco em resultados reais.",
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

            {headlineData && <Headline variant="ecommerce" />}

            {/* <SellMore /> */}
            <ServiceFlow variant="home" />

            <Passos />

            {/* <Animacao /> */}
            <Plataforms />
            <Logos />
            <CertifiedSection />
            <SectionImage variant="ecommerce" apiData={data} />

            <Equipe variant="ecommerce" data={equipeData} />
            <Companys variant="ecommerce" data={companysData} />
            <ChamadaAcao variant="ecommerce" data={ctaData} />

            <Footer />
        </>
    );
}