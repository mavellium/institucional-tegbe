import Schema from "@/components/Section/Schema";
import Feature from "@/components/web/feature";
import { Footer } from "@/components/web/footer";
import { fetchComponentData } from "@/lib/api";
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
import CarrosselEspecialistas from "@/components/web/generics/carrosselEspecialistas";
import HeroCarrossel from "@/components/web/generics/heroCarrossel";

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
            <Meta data={{
                header: {
                    title: [
                        { type: "text", value: "Qual é a principal " },
                        { type: "highlight", value: "meta", color: "#F9396F" },
                        { type: "text", value: " da Tegbe?" }
                    ],

                    subtitle: [
                        { type: "text", value: "Gerar ", size: 18 },
                        { type: "bold", value: "R$ 100 milhões em novas receitas", size: 18 },
                        { type: "text", value: " através dos nossos parceiros até 2030.", size: 18 }
                    ]
                },

                progress: {
                    current: 1500,
                    target: 1500,
                    max: 5000
                },

                footer: [
                    { type: "text", value: "resultados gerados até agora pela " },
                    { type: "bold", value: "#geraçãotegbe", },
                ]
            }} />
            <CarrosselEspecialistas data={{
                header: {
                    title: [
                        { type: "text", value: "E nesse processo reunimos vários " },
                        { type: "highlight", value: "especialistas", color: "#F9396F" }
                    ]
                },

                especialistas: [
                    {
                        nome: "Rafael",
                        sobrenome: "Milagre",
                        cargo: [
                            { type: "text", value: "Fundador da Viver de AI, professor de IA na ESPM e mentor do TEGBE." }
                        ],
                        imagem: "/doni.jpg",
                        corSobrenome: "#F9396F"
                    },

                    {
                        nome: "Marcelo",
                        sobrenome: "Camargo",
                        cargo: [
                            { type: "text", value: "Ex-diretor Nacional da Ambev e Labatt Breweries." }
                        ],
                        imagem: "/doni.jpg",
                        corSobrenome: "#F9396F"
                    },

                    {
                        nome: "Fabíola",
                        sobrenome: "Overrath",
                        cargo: [
                            { type: "text", value: "Cofundadora do Edubank e Ex-Diretora de Pessoas da Ambev." }
                        ],
                        imagem: "/doni.jpg",
                        corSobrenome: "#F9396F"
                    },

                    {
                        nome: "Tomás",
                        sobrenome: "Duarte",
                        cargo: [
                            { type: "text", value: "CEO e co-fundador da Track.co." }
                        ],
                        imagem: "/doni.jpg",
                        corSobrenome: "#F9396F"
                    },

                    {
                        nome: "Donizete",
                        sobrenome: "Caetano",
                        cargo: [
                            { type: "text", value: "Fundador da Tegbe e Especialista em Escala de E-commerce." }
                        ],
                        imagem: "/doni.jpg",
                        corSobrenome: "#F9396F"
                    }
                ]
            }
            } />
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
                                value:
                                    "Ainda restou alguma dúvida agende já uma reunião com um de nossos consultores.",
                            },
                        ],
                        button: {
                            label: "Agendar Reunião",
                            link: "/reuniao",
                            target: "_blank",
                            variant: "marketing",
                            action: "link"
                        },
                        image: {
                            src: "/doni.jpg",
                            alt: "Equipe Tegbe",
                        },
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
                }}
            />
            <Footer variant="marketing" />
        </>
    );
}