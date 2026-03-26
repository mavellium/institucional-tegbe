import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Schema from "@/components/layout/Schema";
import { QuemSomos } from "@/components/sections/QuemSomos";
import { OQueSomos } from "@/components/sections/OQueSomos";
import { SideBySideSection } from "@/components/sections/SideBySide";
import Hero from "@/components/sections/Hero";
import Localizacao from "@/components/sections/LocalizacaoSobre";
import Meta from "@/components/sections/Meta";
import Carrossel from "@/components/sections/CarrosselEspecialistas";

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
                <QuemSomos />
                <OQueSomos /> 
                <Meta endpoint="meta-alunos" type={"Meta de Alunos"}/>
                <Carrossel type={"Carrossel de Especialistas"} endpoint={"carrossel-de-especialistas"}/> 
                <Localizacao />
                <SideBySideSection
                    type={"trabalheConosco"}
                    endpoint="trabalhar-conosco"
                />
            </main>
            <Footer />
        </>
    );
}