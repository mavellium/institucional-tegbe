import { Header } from "@/components/layout/Header";
import Schema from "@/components/layout/Schema";
import { Footer } from "@/components/layout/Footer";
import HomeFormacoes from "@/components/sections/HomeFormacoes";
import PorqueAprender from "@/components/sections/PorqueAprender";
import Formacoes from "@/components/sections/ListaFormacoes";
import CasesCarousel from "@/components/sections/CarrosselCases";
import GaleriaFotos from "@/components/sections/GaleriaFotos";
import Expertise from "@/components/sections/Expertise";
import ComparacaoConcorrentes from "@/components/sections/ComparacaoConcorrentes";
import Faq from "@/components/sections/Faq";
import Localizacao2 from "@/components/sections/LocalizacaoCursos";
import Preco from "@/components/sections/Preco";
import Meta from "@/components/sections/Meta";
import Video from "@/components/sections/VideoAdaptivo";
import { getJanusContent } from "@/lib/api";

export const revalidate = 60;

export default async function FormacoesPage() {
  const formacoesContent = await getJanusContent("formacoes");

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
        <HomeFormacoes data={(formacoesContent["headline-formacoes"] ?? {}) as any} />
        <PorqueAprender data={(formacoesContent["porque-aprender"] ?? {}) as any} />
        <Video
          data={(formacoesContent["video-formacoes"] ?? {}) as any}
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
          data={(formacoesContent["meta-alunos"] ?? {}) as any}
          type="Meta de Formações"
          theme={{
            background: "#0a0a0a",
            primary: "#FFD700",
            text: "#fafafa",
          }}
        />
        <Formacoes />
        <CasesCarousel data={(formacoesContent["cases-alunos"] ?? {}) as any} />
        <GaleriaFotos data={(formacoesContent["galeria-formacoes"] ?? {}) as any} />
        <Expertise data={(formacoesContent["porque-fazer-o-curso"] ?? {}) as any} />
        <Localizacao2 data={(formacoesContent["localizacoes"] ?? {}) as any} />
        <ComparacaoConcorrentes data={(formacoesContent["comparacao"] ?? {}) as any} />
        <Preco data={(formacoesContent["preco-formacoes"] ?? {}) as any} />
        <Faq data={(formacoesContent["faq-formacoes"] ?? {}) as any} />
      </main>
      <Footer variant="formacoes" />
    </>
  );
}
