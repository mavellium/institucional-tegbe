import { Header } from "@/components/Section/Header";
import Schema from "@/components/Section/Schema";
import { Footer } from "@/components/web/footer";
import HomeFormacoes from "@/components/web/homeFormacoes";
import PorqueAprender from "@/components/Section/PorqueAprender";
import Video2 from "@/components/Section/Video2";
import Logos from "@/components/web/logos";
import Cursos from "@/components/Section/Cursos";
import CasesCarousel from "@/components/Section/Carrossel";
import GaleriaFotos from "@/components/Section/GaleriaFotos";
import Expertise from "@/components/Section/Expertise";
import ComparacaoConcorrentes from "@/components/Section/ComparacaoConcorrentes";
import Faq from "@/components/Section/Faq";
import Localizacao2 from "@/components/Section/Localizacao2";
import Preco from "@/components/Section/Preco";
import Meta from "@/components/web/generics/meta";
import { SideBySideSection } from "@/components/web/generics/sideBySideSection";


export default function FormacoesPage() {
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
        <HomeFormacoes />
        <PorqueAprender variant="cursos" />
        <Video2 variant="cursos" />
        <Logos variant="cursos" endpoint="json/logos-curso" />
        <Meta
          type="Meta de Formações"
          endpoint={`meta-alunos`}
        />
        <Cursos />
        <CasesCarousel endpoint={`alunos`} />
        <GaleriaFotos endpoint="form/gallery" />
        <Expertise variant="cursos" />
        <Localizacao2 />
        <ComparacaoConcorrentes endpoint="json/comparison" />
        <Preco />
        <Faq endpoint="json/faq-curso" />
        <SideBySideSection
          type="AgendarReuniao"
          endpoint={`agendar-reuniao-cursos`}
        />
      </main>
      <Footer variant="cursos" />
    </>
  );
}
