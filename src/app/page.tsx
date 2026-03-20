import { Header } from "@/components/Section/Header";
import { Footer } from "@/components/web/footer";
import Schema from "@/components/Section/Schema";
import Dores from "@/components/Section/Dores";
import ComoFazemos from "@/components/Section/ComoFazemos";
import Solucoes from "@/components/Section/Solucoes";
import Metricas from "@/components/Section/Metricas";
import RedirectEcommerce from "@/components/Section/RedirectEcommerce";
import RedirectMarketing from "@/components/Section/RedirectMarketing";
import RedirectTegpro from "@/components/Section/RedirectTegpro";
import Resultados from "@/components/Section/Resultados";
import RedirectSobre from "@/components/Section/RedirectSobre";
import FaqHome from "@/components/Section/FaqHome";
import UltimaChamadaAcao from "@/components/Section/UltimaChamadaAcao";
import Headline from "@/components/Wrapper/Headline";
import { HeroSlide } from "@/types/heroSlide.type";
import HeroCarousel from "@/components/web/generics/heroCarrossel";

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
          endpoint=""
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
        <Dores />
        <ComoFazemos />
        <Solucoes />
        <Metricas />

        <RedirectEcommerce />
        <RedirectMarketing />
        <RedirectTegpro />

        <Resultados />
        <RedirectSobre />
        <FaqHome />
        <UltimaChamadaAcao />
      </main>

      <Footer />
    </>
  );
}