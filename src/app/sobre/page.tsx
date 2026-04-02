import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Schema from "@/components/layout/Schema";
import { getSafeData } from "@/core/api/getSafeData";
import { QuemSomos } from "@/components/sections/QuemSomos";
import { OQueSomos } from "@/components/sections/OQueSomos";
import { SideBySideSection } from "@/components/sections/SideBySide";
import Hero from "@/components/sections/Hero";
import Localizacao from "@/components/sections/LocalizacaoSobre";
import Meta from "@/components/sections/Meta";
import Carrossel from "@/components/sections/CarrosselEspecialistas";

export default async function SobrePage() {
  const [
    heroData,
    quemSomosData,
    oQueSomosData,
    metaData,
    carrosselData,
    localizacaoData,
    sideBySideData,
  ] = await Promise.all([
    getSafeData("inicio"),
    getSafeData("quem-somos"),
    getSafeData("o-que-somos"),
    getSafeData("meta-alunos"),
    getSafeData("carrossel-de-especialistas"),
    getSafeData("localizacao"),
    getSafeData("trabalhar-conosco"),
  ]);

  return (
    <>
      <Schema
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          mainEntity: {
            "@type": "Organization",
            name: "Tegbe",
            url: "https://tegbe.com.br",
            logo: "https://tegbe.com.br/logo.png",
            description:
              "Agência de performance especializada em e-commerce e escala de resultados.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Garça",
              addressRegion: "SP",
              addressCountry: "BR",
            },
          },
        }}
      />

      <Header />
      <main>
        <Hero data={heroData as any} />
        <QuemSomos data={quemSomosData as any} />
        <OQueSomos data={oQueSomosData as any} />
        <Meta data={metaData as any} type="Meta de Alunos" />
        <Carrossel data={carrosselData as any} />
        <Localizacao data={localizacaoData as any} />
        <SideBySideSection data={sideBySideData as any} />
      </main>
      <Footer />
    </>
  );
}
