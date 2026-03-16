import { Header } from "@/components/Section/Header";
import { Footer } from "@/components/web/footer";
import Schema from "@/components/Section/Schema";
import { fetchComponentData } from "@/lib/api";
import { QuemSomos } from "@/components/web/quemSomos";
import { OQueSomos } from "@/components/web/oQueSomos";
import { SideBySideSection } from "@/components/web/generics/sideBySideSection";
import Hero from "@/components/web/hero";
import Localizacao from "@/components/web/localizacao";
import Meta from "@/components/web/generics/meta";
import CarrosselEspecialistas from "@/components/web/generics/carrosselEspecialistas";

export default async function SobrePage() {

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
                <Hero />
                <QuemSomos /> {/* Pronto */}
                <OQueSomos /> {/* Pronto */}
                <Meta data={{
                    header: {
                        title: [
                            { type: "text", value: "Qual é a principal " },
                            { type: "highlight", value: "meta", color: "#FFC72C" },
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
                            { type: "highlight", value: "especialistas", color: "#F1D95D" }
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
                        },

                        {
                            nome: "Marcelo",
                            sobrenome: "Camargo",
                            cargo: [
                                { type: "text", value: "Ex-diretor Nacional da Ambev e Labatt Breweries." }
                            ],
                            imagem: "/doni.jpg"
                        },

                        {
                            nome: "Fabíola",
                            sobrenome: "Overrath",
                            cargo: [
                                { type: "text", value: "Cofundadora do Edubank e Ex-Diretora de Pessoas da Ambev." }
                            ],
                            imagem: "/doni.jpg"
                        },

                        {
                            nome: "Tomás",
                            sobrenome: "Duarte",
                            cargo: [
                                { type: "text", value: "CEO e co-fundador da Track.co." }
                            ],
                            imagem: "/doni.jpg"
                        },

                        {
                            nome: "Donizete",
                            sobrenome: "Caetano",
                            cargo: [
                                { type: "text", value: "Fundador da Tegbe e Especialista em Escala de E-commerce." }
                            ],
                            imagem: "/doni.jpg"
                        }
                    ]
                }
                } /> {/* Pronto */}
                <Localizacao /> {/* Pronto */}
                <SideBySideSection
                    type={"trabalheConosco"}
                    data={{
                        hero: {
                            tag: "Quer construir sua carreira na Tegbe?",
                            title: [
                                { type: "text", value: "Trabalhe conosco" }
                            ],
                            description: [
                                {
                                    type: "text",
                                    value:
                                        "Se você quer crescer ao lado de empreendedores que constroem negócios relevantes, conheça nossas oportunidades.",
                                },
                            ],
                            button: {
                                label: "Conheça nossas vagas",
                                link: "/carreiras",
                                target: "_blank",
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
                /> {/* Pronto */}
            </main>
            <Footer />
        </>
    );
}