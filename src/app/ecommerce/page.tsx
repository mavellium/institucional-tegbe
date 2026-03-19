import { Header } from "@/components/Section/Header";
import { Companys } from "@/components/Section/Companys";
import { Footer } from "@/components/web/footer";
import Schema from "@/components/Section/Schema";
import { Equipe } from "@/components/Section/Equipe";
import { ChamadaAcao } from "@/components/Section/ChamadaAcao";
import { fetchComponentData } from "@/lib/api";
import Passos from "@/components/Section/Passos";
import ConsultorOficial from "@/components/Section/ServiceFlow/CertifiedSection";
import Video from "@/components/Wrapper/Video";
import { VideoSection } from "@/enums/video.enum";
import HeroCarrossel from "@/components/web/generics/heroCarrossel";
import { HeroSlide } from "@/types/heroSlide.type";
import Logos from "@/components/web/logos";
import Service, { ServiceProps } from "@/components/web/service";
import { Imagem } from "@/components/Section/SectionImage";
import { SideBySideSection } from "@/components/web/generics/sideBySideSection";

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

const content: ServiceProps["content"] = {
    "header": {
        "preTitle": "As melhores soluções para seu e-commerce",
        "title": [
            { "type": "text", "value": "Tudo o que faltava para você " },
            { "type": "highlight", "value": "escalar seu e-commerce", "color": "#FFCC00" }
        ],
        "subtitle": "Seremos seu parceiro nessa jornada de crescimento no e-commerce"
    },
    "services": [
        {
            "id": "setup-infra",
            "step": "Passo 01",
            "color": "#0a0a0a",
            "titleColor": "#0a0a0a",
            "descColor": "#1d1d1d",
            "title": "Criação de Anúncios",
            "image": "/dev/teste-1.png", // Exemplo de imagem para Ads
            "description": "Anúncios que vendem de verdade. Nossa equipe faz o trabalho duro de criar imagens e textos que chamam a atenção e fazem o cliente clicar."
        },
        {
            "id": "logistica",
            "step": "Passo 02",
            "color": "#0071E3",
            "titleColor": "#e7e7e7",
            "descColor": "#ececec",
            "title": "Direcionamento Logístico",
            "image": "/dev/teste-2.png", // Exemplo de imagem para logística
            "description": "Prepare sua operação para o volume. Não adianta ter anúncio bom se a logística trava."
        },
        {
            "id": "growth-ads",
            "step": "Passo 03",
            "color": "#FF2D55",
            "titleColor": "#1D1D1F",
            "descColor": "#86868B",
            "title": "Gerenciamento de Publicidade",
            "image": "/dev/teste-3.png", // Exemplo de dashboard
            "description": "Gestão profissional do seu dinheiro. Cuidamos das suas campanhas com um único foco: colocar lucro no seu bolso."
        },
        {
            "id": "treinamento",
            "step": "Passo 04",
            "color": "#AF52DE",
            "titleColor": "#1D1D1F",
            "descColor": "#86868B",
            "title": "Treinamento Estratégico",
            "image": "/dev/teste-3.png",
            "description": "Nós ensinamos você a controlar o jogo. Garantindo que você tenha autonomia e visão clara do seu negócio."
        },
        {
            "id": "venda-onde-quiser",
            "step": "Passo 05",
            "color": "#34C759",
            "titleColor": "#000000",
            "descColor": "#A1A1A6",
            "title": "Venda onde quiser",
            "image": "/dev/teste-3.png",
            "description": "Sua marca nos maiores sites do Brasil. Colocamos seus anúncios para rodar com força no Mercado Livre, Shopee e Amazon."
        }
    ],
    "button": {
        "label": "Quero Estruturar e Escalar Meu Negócio",
        "link": "https://api.whatsapp.com/send?phone=5514991779502",
        "target": "_blank",
        "action": "link"
    }
};

const plataforms: ServiceProps["content"] = {
    "header": {
        "preTitle": "As melhores plataformas para seu e-commerce",
        "title": [
            { "type": "text", "value": "Plataformas que utilizamos para " },
            { "type": "highlight", "value": "escalar seu negócio", "color": "#FFCC00" }
        ],
        "colorTitle": "#fff"
    },
    "services": [
        {
            "id": "setup-infra",
            "color": "#0a0a0a",
            "titleColor": "#0a0a0a",
            "descColor": "#1d1d1d",
            "title": "Meta Ads",
            "image": "/dev/1.png",
            "description": "Criamos e gerenciamos campanhas no Facebook e Instagram para alcançar seu público-alvo."
        },
        {
            "id": "logistica",
            "color": "#0071E3",
            "titleColor": "#0a0a0a",
            "descColor": "#1d1d1d",
            "title": "Google Ads",
            "image": "/dev/2.png",
            "description": "Anúncios no Google Search, Display e YouTube para capturar intenção de compra."
        },
    ],
    "button": {
        "label": "Quero Estruturar e Escalar Meu Negócio",
        "link": "https://api.whatsapp.com/send?phone=5514991779502",
        "target": "_blank",
        "action": "link"
    }
};

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
            <Service content={content} />
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

                showTexture={true}
                textureOpacity={0.05}
                textureSrc="/textura.svg"
            />
            <Logos />
            <Passos />
            <Companys variant="ecommerce" data={companysData} />
            <Service
                content={plataforms}
                showTexture
                textureOpacity={.5}
                textureSrc="/textura.svg"
                backgroundColor="#0a0a0a" />
            <ConsultorOficial />
            <Imagem variant="ecommerce" endpoint={"imagem"} />

            <Equipe variant="ecommerce" data={equipeData} />
            {/* <ChamadaAcao variant="ecommerce" data={ctaData} /> */}
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