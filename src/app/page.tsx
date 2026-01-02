
import { Dna } from "@/components/Dna";
import Ecommerce from "@/components/Ecommerce";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Headline } from "@/components/Headline";
import Logos from "@/components/Logos";
import News from "@/components/News";
import { Roi, defaultRoiData } from '@/components/Roi';
import Schema from "@/components/Schema";
import { SectionImage } from "@/components/SectionImage";
import { Setors } from "@/components/Setors";
import Steps from "@/components/Steps";
import Image from "next/image";

export default function Home() {
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
  return (
    <>
      <Header></Header>
      <main>
        <Headline></Headline>
        <Logos></Logos>
        <Steps></Steps>
        <Ecommerce></Ecommerce>
        <Setors></Setors>
        <Roi data={defaultRoiData} />
        <SectionImage></SectionImage>
        <Dna></Dna>
        <News></News>
      </main>
      <Footer></Footer>
    </>
  );
}
