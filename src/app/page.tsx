import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Schema from "@/components/layout/Schema";
import HeroCarousel from "@/components/sections/HeroCarrossel";
import SectionMarketing from "@/components/sections/BannerMarketing";
import MostrarSolucoes from "@/components/sections/HomeCards";
import Marketplaces from "@/components/web/marketplaces";
import SectionFormacoes from "@/components/sections/SectionFormacoes";
import Ferramentas from "@/components/web/ferramentas";
import CtaDuvidas from "@/components/web/ctaDuvidas";
import FaqHome from "@/components/sections/FaqHome";
import HomeBlog from "@/components/sections/Blog/HomeBlog";
import { getJanusContent } from "@/lib/api";
import { janus } from "@/lib/janus";

export const revalidate = 60;

export default async function Home() {
  const [homeContent, marketingContent, blogContent, recentPosts] = await Promise.all([
    getJanusContent("home"),
    getJanusContent("marketing"),
    getJanusContent("blog"),
    janus.getPosts({ limit: 3 }),
  ]);

  return (
    <>
      <Schema
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Sua solução completa em vendas",
          description: "Serviços especializados em consultoria de e-commerce, gestão de marketplaces como Mercado Livre e Shopee, tráfego pago, CRM e estratégias digitais para aumentar vendas online, oferecidos pela agência Tegbe.",
          serviceType: [
            "Consultoria e Gestão de Marketplaces",
            "Gestão de Tráfego Pago",
            "Estratégias de Marketing Digital"
          ],
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
          offers: {
            "@type": "Offer",
            name: "Diagnóstico e Consultoria de E-commerce",
            description: "Sessão de diagnóstico e consultoria para e-commerce e gestão de marketplaces para identificar oportunidades comerciais e estratégicas.",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "BRL",
              price: "Sob consulta"
            }
          }
        }}
      />

      <Header />

      <main>
        <HeroCarousel
          data={((homeContent["hero-carrossel-home"] ?? {}) as any)?.items}
          type="HeroHome"
          corDestaque="#cfba19"
          textoFundo="TEGBE"
          navGradienteFrom="#f5df36"
          navGradienteTo="#f5df36"
          navAccent="#f5df36"
          corIcone="white"
          loop={true}
          autoplayDelay={6000}
        />
        <MostrarSolucoes data={(homeContent["solucoes-home"] ?? {}) as any} />
        <Marketplaces data={(homeContent["marketplaces"] ?? {}) as any} />
        <SectionMarketing data={(homeContent["redes-sociais"] ?? {}) as any} />
        <SectionFormacoes data={(homeContent["formacoes-home"] ?? {}) as any} />
        <Ferramentas data={(marketingContent["ferramentas"] ?? {}) as any} />
        <CtaDuvidas data={(homeContent["duvida-cta"] ?? {}) as any} />
        <FaqHome data={(homeContent["faq-home"] ?? {}) as any} />
        <HomeBlog
          data={(blogContent["home-blog"] ?? {}) as any}
          posts={recentPosts}
          accentColor="#cfba19"
        />
      </main>

      <Footer />
    </>
  );
}
