import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Schema from "@/components/layout/Schema";
import { getSafeData } from "@/core/api/getSafeData";
import Hero from "@/components/sections/Hero";

// Seções below-the-fold — lazy loaded para otimizar FCP
const QuemSomos = dynamic(
  () => import("@/components/sections/QuemSomos").then((mod) => ({ default: mod.QuemSomos })),
  {}
);
const OQueSomos = dynamic(
  () => import("@/components/sections/OQueSomos").then((mod) => ({ default: mod.OQueSomos })),
  {}
);
const Meta = dynamic(() => import("@/components/sections/Meta"), {});
const Carrossel = dynamic(() => import("@/components/sections/CarrosselEspecialistas"), {});
const Localizacao = dynamic(() => import("@/components/sections/LocalizacaoSobre"), {});
const SideBySideSection = dynamic(
  () =>
    import("@/components/sections/SideBySide").then((mod) => ({ default: mod.SideBySideSection })),
  {}
);

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

  // Preload da imagem LCP (logo do hero sobre)
  const lcpImageUrl = (heroData as any)?.logo?.src;

  return (
    <>
      {lcpImageUrl && (
        <link
          rel="preload"
          as="image"
          href={`/_next/image?url=${encodeURIComponent(lcpImageUrl)}&w=640&q=75`}
          imageSrcSet={`/_next/image?url=${encodeURIComponent(lcpImageUrl)}&w=256&q=75 256w, /_next/image?url=${encodeURIComponent(lcpImageUrl)}&w=384&q=75 384w, /_next/image?url=${encodeURIComponent(lcpImageUrl)}&w=640&q=75 640w`}
          imageSizes="(min-width: 768px) 420px, (min-width: 640px) 280px, 220px"
          fetchPriority="high"
        />
      )}
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
