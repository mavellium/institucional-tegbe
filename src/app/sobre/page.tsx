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
import { getJanusContent } from "@/lib/api";

export const revalidate = 60;

export default async function SobrePage() {
  const [sobreContent, formacoesContent] = await Promise.all([
    getJanusContent("sobre"),
    getJanusContent("formacoes"),
  ]);

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
        <QuemSomos data={(sobreContent["quem-somos"] ?? {}) as any} />
        <OQueSomos data={(sobreContent["o-que-somos"] ?? {}) as any} />
        <Meta
          data={(formacoesContent["meta-alunos"] ?? {}) as any}
          type="Meta de Alunos"
        />
        <Carrossel
          type="Carrossel de Especialistas"
          data={(sobreContent["carrossel-de-especialistas"] ?? {}) as any}
        />
        <Localizacao data={(sobreContent["localizacao"] ?? {}) as any} />
        <SideBySideSection
          type="trabalheConosco"
          data={(sobreContent["trabalhar-conosco"] ?? {}) as any}
        />
      </main>
      <Footer />
    </>
  );
}
