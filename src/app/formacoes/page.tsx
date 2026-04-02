import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import Schema from "@/components/layout/Schema";
import { Footer } from "@/components/layout/Footer";
import { getSafeData } from "@/core/api/getSafeData";
import HomeFormacoes from "@/components/sections/HomeFormacoes";

// Seções below-the-fold — lazy loaded para otimizar FCP
const PorqueAprender = dynamic(() => import("@/components/sections/PorqueAprender"), {});
const Video = dynamic(() => import("@/components/sections/VideoAdaptivo"), {});
const Meta = dynamic(() => import("@/components/sections/Meta"), {});
const Formacoes = dynamic(() => import("@/components/sections/ListaFormacoes"), {});
const CasesCarousel = dynamic(() => import("@/components/sections/CarrosselCases"), {});
const GaleriaFotos = dynamic(() => import("@/components/sections/GaleriaFotos"), {});
const Expertise = dynamic(() => import("@/components/sections/Expertise"), {});
const Localizacao2 = dynamic(() => import("@/components/sections/LocalizacaoCursos"), {});
const ComparacaoConcorrentes = dynamic(
  () => import("@/components/sections/ComparacaoConcorrentes"),
  {}
);
const Preco = dynamic(() => import("@/components/sections/Preco"), {});
const Faq = dynamic(() => import("@/components/sections/Faq"), {});

export default async function FormacoesPage() {
  const [
    homeFormacoesData,
    porqueAprenderData,
    videoData,
    metaData,
    formacoesData,
    casesData,
    galeriaData,
    expertiseData,
    localizacaoData,
    comparacaoData,
    precoData,
    faqData,
  ] = await Promise.all([
    getSafeData("headline-formacoes"),
    getSafeData("porque-aprender"),
    getSafeData("video-formacoes"),
    getSafeData("meta-alunos"),
    getSafeData("formacoes"),
    getSafeData("cases-alunos"),
    getSafeData("galeria-formacoes"),
    getSafeData("porque-fazer-o-curso"),
    getSafeData("localizacoes"),
    getSafeData("comparacao"),
    getSafeData("preco-formacoes"),
    getSafeData("faq-formacoes"),
  ]);

  return (
    <>
      <Schema
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Cursos e Treinamentos",
          description:
            "Cursos práticos de marketing digital, e-commerce e marketplaces. Aprenda com especialistas da Tegbe e aplique estratégias reais para vender mais online.",
          provider: {
            "@type": "Organization",
            name: "Tegbe",
            description:
              "Agência de marketing digital e consultoria especializada em transformar presença online em resultados reais de vendas, especializada em e-commerce e performance digital.",
            url: "https://tegbe.com.br",
            logo: "https://tegbe.com.br/logo.png",
            contactPoint: [
              {
                "@type": "ContactPoint",
                contactType: "customer support",
                telephone: "+55 14 98828-1001",
                email: "contato@tegbe.com.br",
                availableLanguage: "Portuguese",
              },
            ],
            address: {
              "@type": "PostalAddress",
              streetAddress: "R. Santos Dumont, 133, Ferrarópolis",
              addressLocality: "Garça",
              addressRegion: "SP",
              postalCode: "17400-074",
              addressCountry: "BR",
            },
            sameAs: [
              "https://www.instagram.com/agenciategbe",
              "https://www.facebook.com/TegbeSolucoes",
              "https://www.linkedin.com/company/tegbe/",
            ],
          },
          areaServed: {
            "@type": "Place",
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
        <HomeFormacoes data={homeFormacoesData as any} />
        <PorqueAprender data={porqueAprenderData as any} />
        <Video
          data={videoData as any}
          theme={{
            backgroundColor: "#020202",
            textColor: "#fff",
            accentColor: "#FFD700",
            badgeBg: "rgba(255,215,0,0.1)",
            badgeBorder: "rgba(255,215,0,0.3)",
            badgeText: "#B8860B",
          }}
        />
        <Meta
          data={metaData as any}
          type="Meta de Formações"
          theme={{
            background: "#0a0a0a",
            primary: "#FFD700",
            text: "#fafafa",
          }}
        />
        <Formacoes data={formacoesData as any} />
        <CasesCarousel data={casesData as any} />
        <GaleriaFotos data={galeriaData as any} />
        <Expertise data={expertiseData as any} />
        <Localizacao2 data={localizacaoData as any} />
        <ComparacaoConcorrentes data={comparacaoData as any} />
        <Preco data={precoData as any} />
        <Faq data={faqData as any} />
      </main>
      <Footer variant="cursos" />
    </>
  );
}
