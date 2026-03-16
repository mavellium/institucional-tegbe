import { Header } from "@/components/Section/Header";
import { Companys } from "@/components/Section/Companys";
import { Footer } from "@/components/web/footer";
import Schema from "@/components/Section/Schema";
import { Equipe } from "@/components/Section/Equipe";
import { ChamadaAcao } from "@/components/Section/ChamadaAcao";
import { SectionImage } from "@/components/Section/SectionImage";
import { fetchComponentData } from "@/lib/api";
import Plataforms from "@/components/Section/Solucoes/Plataforms";
import Passos from "@/components/Section/Passos";
import ServiceFlow from "@/components/Section/ServiceFlow";
import CertifiedSection from "@/components/Section/ServiceFlow/CertifiedSection";
import Video from "@/components/Wrapper/Video";
import { VideoSection } from "@/enums/video.enum";
import HeroCarrossel from "@/components/web/generics/heroCarrossel";
import { HeroSlide } from "@/types/heroSlide.type";
import Logos from "@/components/web/logos";

async function getSafeData(slug: string) {
    try {
        const res = await fetchComponentData(slug);

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

    const mockSlides: HeroSlide[] = [
        {
            "id": 1,
            "tag": "CONSULTORIA OFICIAL MERCADO LIVRE",
            "title": "TEGBE GESTÃO E ESTRATÉGIA",
            "description": "É hora de construir uma operação profissional e escalar seus resultados.",
            "subtext": "Estratégia certificada para transformar sua conta em líder de categoria.",
            "ctaText": "QUERO ESCALAR AGORA!",
            "ctaLink": "https://wa.me/5514988281001",
            "image": "/exemplo_carrossel.png"
        },
        {
            "id": 2,
            "tag": "AGENDA ABERTA - MARÇO",
            "title": "ENGENHARIA DE VENDAS",
            "description": "Chega de 'tentar' vender online. Tenha um método prático e lucrativo.",
            "subtext": "Vagas limitadas para novos parceiros de consultoria este mês.",
            "ctaText": "FALAR COM ESPECIALISTA",
            "ctaLink": "https://wa.me/5514988281001",
            "image": "/exemplo_carrossel.png"
        }
    ];

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
            <HeroCarrossel
                slides={mockSlides}
                type="HeroEcommerce"
                corFundo="#020202"
                corDestaque="#FFCC00"
                textoFundo="ECOMMERCE"
                navGradienteFrom="#FFCC00"
                navGradienteTo="#FFB800"  
                navAccent="#FFDB4D"      
                corIcone="black"
            />
            <Logos />
            <ServiceFlow />
            <Video
                slug="video-sections"
                section={VideoSection.Ecommerce}
                theme={{
                    backgroundColor: "#FFFFFF",
                    textColor: "#020202",
                    accentColor: "#FFD700",
                    badgeBg: "rgba(255,215,0,0.1)",
                    badgeBorder: "rgba(255,215,0,0.3)",
                    badgeText: "#B8860B",
                }}

            />
            <Logos />
            <Passos />
            <Plataforms />

            <CertifiedSection />
            <SectionImage variant="ecommerce" apiData={data} />

            <Equipe variant="ecommerce" data={equipeData} />
            <Companys variant="ecommerce" data={companysData} />
            <ChamadaAcao variant="ecommerce" data={ctaData} />

            <Footer />
        </>
    );
}