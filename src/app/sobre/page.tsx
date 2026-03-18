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
                <QuemSomos /> {/* INTEGRADO */}
                <OQueSomos /> {/* INTEGRADO */}
                <Meta/> {/* INTEGRADO */}
                <CarrosselEspecialistas/> {/* INTEGRADO */}
                <Localizacao /> {/* INTEGRADO */}
                <SideBySideSection
                    type={"trabalheConosco"}
                    endpoint="trabalhar-conosco"
                /> {/* Pronto */}
            </main>
            <Footer />
        </>
    );
}