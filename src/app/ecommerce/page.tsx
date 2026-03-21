import { Header } from "@/components/Section/Header";
import { Footer } from "@/components/web/footer";
import Schema from "@/components/Section/Schema";
import { Equipe } from "@/components/Section/Equipe";
import { fetchComponentData } from "@/lib/api";
import Passos from "@/components/Section/Passos";
import ConsultorOficial from "@/components/Section/ServiceFlow/CertifiedSection";
import Video from "@/components/Wrapper/Video";
import { VideoSection } from "@/enums/video.enum";
import HeroCarrossel from "@/components/web/generics/heroCarrossel";
import { HeroSlide } from "@/types/heroSlide.type";
import Logos from "@/components/web/logos";
import { Imagem } from "@/components/Section/SectionImage";
import { SideBySideSection } from "@/components/web/generics/sideBySideSection";
import { Clientes } from "@/components/web/clientes";
import Carrossel from "@/components/web/carrossel";

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
                endpoint="hero-carrossel-ecommerce"
                type="HeroEcommerce"
                corFundo="#020202"
                corDestaque="#FFCC00"
                textoFundo="ECOMMERCE"
                navGradienteFrom="#FFCC00"
                navGradienteTo="#FFB800"
                navAccent="#FFDB4D"
                corIcone="black"
            />
            <Logos endpoint="logos-ecommerce" />
            <Carrossel endpoint="servicos-ecommerce" />
            <Video
                endpoint="video-ecommerce"
                theme={{
                    backgroundColor: "#FFFFFF",
                    textColor: "#020202",
                    accentColor: "#FFD700",
                    badgeBg: "rgba(255,215,0,0.1)",
                    badgeBorder: "rgba(255,215,0,0.3)",
                    badgeText: "#B8860B",
                }}

                showTexture={true}
                textureOpacity={0.05}
                textureSrc="/textura.svg"
            />
            <Logos endpoint="logos-ecommerce" />
            <Passos />
            <Clientes endpoint={"clientes"} />
            <Carrossel
                endpoint={"plataformas-ecommerce"}
                showTexture
                textureOpacity={.5}
                textureSrc="/textura.svg"
                backgroundColor="#0a0a0a" />
            <ConsultorOficial />
            <Imagem variant="ecommerce" endpoint={"imagem-ecommerce"} />

            <Equipe />
            <SideBySideSection
                type={"AgendarReuniao"}
                data={{
                    hero: {
                        tag: "Ficou com dúvida?",
                        title: [
                            { type: "text", value: "Agende uma reunião" }
                        ],
                        description: [
                            {
                                type: "text",
                                value: "Ainda restou alguma dúvida agende já uma reunião com um de nossos consultores.",
                            },
                        ],
                        button: {
                            label: "Agendar Reunião",
                            link: "/reuniao",
                            target: "_blank",
                            variant: "default",
                            action: "link"
                        },
                    },
                    imagem: {
                        imagem: "/doni.jpg",
                        alt: "Equipe Tegbe",
                    },
                    social: {
                        tag: "Mantenha-se atualizado",
                        title: [
                            { type: "text", value: "Acompanhe nossas mídias" }
                        ],
                        items: [
                            { icon: "mdi:youtube", link: "#" },
                            { icon: "mdi:facebook", link: "#" },
                            { icon: "mdi:instagram", link: "#" },
                            { icon: "mdi:linkedin", link: "#" },
                        ],
                    },
                }} endpoint={"agendar-reuniao-ecommerce"}
            />

            <Footer />
        </>
    );
}