import Schema from "@/components/layout/Schema";
import { Footer } from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Parceiro from "@/components/sections/Parceiro";
import { SideBySideSection } from "@/components/sections/SideBySide";
import PorqueATegbe from "@/components/sections/PorqueATegbe";
import MarketingInteligente from "@/components/sections/MarketingInteligente";
import Meta from "@/components/sections/Meta";
import Carrossel from "@/components/sections/CarrosselEspecialistas";
import HeroCarrossel from "@/components/sections/HeroCarrossel";
import Video from "@/components/sections/VideoAdaptivo";
import Solucoes from "@/components/sections/SolucoesMarketing";
import { getJanusContent } from "@/lib/api";

export const revalidate = 60;

export default async function MarketingPage() {
  const [marketingContent, homeContent] = await Promise.all([
    getJanusContent("marketing"),
    getJanusContent("home"),
  ]);

  return (
    <>
      <Schema
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Marketing Digital e Performance",
          description: "A Tegbe oferece serviços de marketing digital e performance, com foco em tráfego pago, estratégia, dados e conversão. A atuação é orientada por métricas, tecnologia e metodologia própria, ajudando empresas a estruturarem e escalarem suas operações digitais de forma previsível e sustentável.",
          provider: {
            "@type": "Organization",
            name: "Tegbe",
            description: "Agência de marketing digital e consultoria especializada em transformar presença online em resultados reais de vendas, especializada em e-commerce e performance digital.",
            url: "https://tegbe.com.br",
            logo: "https://tegbe.com.br/logo.png",
            contactPoint: [{
              "@type": "ContactPoint",
              contactType: "customer support",
              telephone: "+55 14 98828-1001",
              email: "contato@tegbe.com.br",
              availableLanguage: "Portuguese"
            }],
            address: {
              "@type": "PostalAddress",
              streetAddress: "R. Santos Dumont, 133, Ferrarópolis",
              addressLocality: "Garça",
              addressRegion: "SP",
              postalCode: "17400-074",
              addressCountry: "BR"
            },
            sameAs: [
              "https://www.instagram.com/agenciategbe",
              "https://www.facebook.com/TegbeSolucoes",
              "https://www.linkedin.com/company/tegbe/"
            ]
          },
          areaServed: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Garça",
              addressRegion: "SP",
              addressCountry: "BR"
            }
          },
        }}
      />
      <Navbar variant="marketing" />
      <HeroCarrossel
        data={((marketingContent["hero-carrossel-marketing"] ?? {}) as any)?.items}
        type="Hero Marketing"
        corDestaque="#f9265e"
        textoFundo="MARKETING"
      />
      <PorqueATegbe data={(marketingContent["agencias-falham"] ?? {}) as any} />
      <Video
        data={(marketingContent["video-marketing"] ?? {}) as any}
        viewVariant="hero"
        theme={{
          accentColor: "#f9265e",
          gradientFrom: "#ff0400",
          gradientTo: "#f9396f",
          videoOpacity: 0.8,
          startMuted: true,
        }}
      />
      <MarketingInteligente data={(marketingContent["marketing-inteligente"] ?? {}) as any} />
      <Solucoes data={(marketingContent["solucoes"] ?? {}) as any} />
      <Parceiro data={(homeContent["parceiros"] ?? {}) as any} />
      <Meta data={(marketingContent["meta-marketing"] ?? {}) as any} type="Meta de Marketing" />
      <Carrossel
        type="Carrossel de Funcionários"
        data={(marketingContent["carrossel-de-funcionarios"] ?? {}) as any}
      />
      <SideBySideSection
        type="AgendarReuniao"
        data={(marketingContent["agendar-reuniao-marketing"] ?? {}) as any}
      />
      <Footer variant="marketing" />
    </>
  );
}
