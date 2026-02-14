import { Header } from "@/components/Section/Header";
import { Footer } from "@/components/Section/Footer";
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

export default async function Home() {
  return (
    <>
      <Schema
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Consultoria e Estratégias de E-commerce e Marketing Digital",
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
        <Headline /> 
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