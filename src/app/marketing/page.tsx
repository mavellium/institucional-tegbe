import Schema from "@/components/Section/Schema";
import Feature from "@/components/web/feature";
import { Footer } from "@/components/web/footer";
import Navbar from "@/components/web/navbar";
import Video2 from "@/components/Wrapper/Video2";
import { VideoSection } from "@/enums/video.enum";
import Parceiro from "@/components/web/parceiro";
import HeroCarousel from "@/components/web/generics/heroCarrossel";
import { SideBySideSection } from "@/components/web/generics/sideBySideSection";
import { HeroSlide } from "@/types/heroSlide.type";
import PorqueATegbe from "@/components/web/porqueATegbe";
import MarketingInteligente from "@/components/web/marketingInteligente";
import { parceiroSectionMock } from "@/mock/parceiroSection.mock";
import Meta from "@/components/web/generics/meta";
import Carrossel from "@/components/web/generics/carrosselEspecialistas";
import HeroCarrossel from "@/components/web/generics/heroCarrossel";

export default async function MarketingPage() {
    const mockSlides: HeroSlide[] = [
        {
            id: 1,
            tag: "PROGRAMA PRESENCIAL",
            title: "TEGBE GESTÃO E ESTRATÉGIA",
            description: "Construa estratégias sólidas para escalar sua empresa",
            subtext: "Aprenda com líderes de mercado em apenas 4 dias.",
            ctaText: "Conheça agora",
            ctaLink: "#",
            image: "/exemplo_carrossel.png",
        },
        {
            id: 2,
            tag: "IMERSÃO ONLINE",
            title: "TEGBE GROWTH EXTREMO",
            description: "Dobre o faturamento da sua empresa",
            subtext: "Táticas do Vale do Silício aplicáveis imediatamente.",
            ctaText: "Garantir minha vaga",
            ctaLink: "#",
            image: "/exemplo_carrossel.png",
        },
    ];

    <HeroCarousel slides={mockSlides} type="home" />

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
            <Navbar variant="marketing" />
            <HeroCarrossel
                slides={mockSlides}
                type={"HeroMarketing"}

                corDestaque="#f9265e"
                textoFundo="MARKETING"
            />
            <PorqueATegbe />
            <Video2
                slug="video-marketing"
                section={VideoSection.Marketing}
                theme={{
                    accentColor: "#f9265e",
                    gradientFrom: "#ff0400",
                    gradientTo: "#f9396f",
                    videoOpacity: 0.8,
                    startMuted: true,
                }}

            />
            <MarketingInteligente
                content={{
                    badge: [{ type: "text", value: "Marketing Inteligente" }],
                    title: [{ type: "text", value: "Aumente suas vendas com estratégia" }],
                    description: [{ type: "text", value: "Criamos sistemas de marketing que escalam negócios." }],
                    stats: [
                        {
                            value: "+120%",
                            label: [{ type: "text", value: "crescimento médio" }]
                        }
                    ],
                    button: {
                        action: "link",
                        label: "Falar com especialista",
                        link: "/contato",
                        variant: "marketing"
                    }
                }}
            />
            <Feature />
            <Parceiro data={parceiroSectionMock} />
            <Meta endpoint="meta-marketing" type={"Meta de Marketing"} />
            <Carrossel type={"Carrossel de Funcionários"} endpoint={"carrossel-de-funcionarios"} />
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
                            variant: "marketing",
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
                }} endpoint={"agendar-reuniao-marketing"}
            />
            <Footer variant="marketing" />
        </>
    );
}