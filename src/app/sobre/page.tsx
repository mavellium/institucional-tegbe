import { Header } from "@/components/Section/Header";
import { Footer } from "@/components/web/footer";
import Schema from "@/components/Section/Schema";
import { fetchComponentData } from "@/lib/api";
import { QuemSomos } from "@/components/web/quemSomos";
import { OQueSomos } from "@/components/web/oQueSomos";
import { MetaAlunos } from "@/components/web/metaAlunos";
import { CarrosselEspecialistas } from "@/components/web/carrosselEspecialistas";
import { SideBySideSection } from "@/components/web/generics/sideBySideSection";
import Hero from "@/components/web/hero";
import Localizacao from "@/components/web/localizacao";

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
                <MetaAlunos /> {/* Pronto */}
                <CarrosselEspecialistas /> {/* Pronto */}
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