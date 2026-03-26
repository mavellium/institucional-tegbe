import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Schema from "@/components/layout/Schema";
import Dores from "@/components/sections/Dores";
import ComoFazemos from "@/components/sections/ComoFazemos";
import Solucoes from "@/components/sections/Solucoes";
import Metricas from "@/components/sections/Metricas";
import RedirectEcommerce from "@/components/sections/RedirectEcommerce";
import RedirectMarketing from "@/components/sections/RedirectMarketing";
import RedirectTegpro from "@/components/sections/RedirectTegpro";
import Resultados from "@/components/sections/Resultados";
import RedirectSobre from "@/components/sections/RedirectSobre";
import FaqHome from "@/components/sections/FaqHome";
import UltimaChamadaAcao from "@/components/sections/UltimaChamadaAcao";
import Headline from "@/components/sections/HeadlineServer";
import { HeroSlide } from "@/types/heroSlide.type";
import HeroCarousel from "@/components/sections/HeroCarrossel";
import HomeCards from "@/components/sections/HomeCards";
import SectionMarketing from "@/components/sections/BannerMarketing";
import SectionEcommerce from "@/components/sections/BannerEcommerce";
import SectionFormacoes from "@/components/sections/BannerFormacoes";
import SectionFerramentas from "@/components/sections/Ferramentas";

export default async function Home() {
  const mockSlides: HeroSlide[] = [
    {
      id: 1,
      tag: "SOLUÇÕES INTEGRADAS",
      title: "Transforme sua empresa com a Tegbe",
      description: "Estratégia, tecnologia e performance para escalar negócios.",
      subtext: "Mais de 10 anos de experiência no mercado digital.",
      ctaText: "Conheça nossas soluções",
      ctaLink: "/solucoes",
      image: "/home-hero-1.jpg", // substitua pela imagem desejada
    },
    {
      id: 2,
      tag: "SOLUÇÕES INTEGRADAS",
      title: "Sua solução completa em vendas",
      description: "Estratégia, tecnologia e performance para escalar negócios.",
      subtext: "Mais de 10 anos de experiência no mercado digital.",
      ctaText: "Fale com um especialista",
      ctaLink: "/contato",
      image: "/home-hero-2.jpg",
    },
  ];
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
          endpoint="hero-carrossel-ecommerce"
          type="HeroHome"
          corDestaque="#cfba19"      // cor de destaque (botões, textos)
          textoFundo="TEGBE"         // texto de fundo sutil
          navGradienteFrom="#f5df36"
          navGradienteTo="#f5df36"
          navAccent="#f5df36"
          corIcone="white"
          loop={true}
          autoplayDelay={6000}
        />
        <HomeCards />
        <SectionEcommerce />
        <SectionMarketing />
        <SectionFormacoes />
        <SectionFerramentas />
        {/* <ComoFazemos />
        <Solucoes />
        <Metricas />

        <RedirectEcommerce />
        <RedirectMarketing />
        <RedirectTegpro />

        <Resultados />
        <RedirectSobre />
        <FaqHome />
        <UltimaChamadaAcao /> */}
      </main>

      <Footer />
    </>
  );
}