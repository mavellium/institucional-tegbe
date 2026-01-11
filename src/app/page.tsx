import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Schema from "@/components/Schema";
import { Headline } from "@/components/Headline";
import Dores from "@/components/Dores";
import ComoFazemos from "@/components/ComoFazemos";
import Solucoes from "@/components/Solucoes";
import Metricas from "@/components/Metricas";
import RedirectEcommerce from "@/components/RedirectEcommerce";
import RedirectMarketing from "@/components/RedirectMarketing";
import RedirectTegpro from "@/components/RedirectTegpro";
import Resultados from "@/components/Resultados";
import RedirectSobre from "@/components/RedirectSobre";
import FaqHome from "@/components/FaqHome";
import UltimaChamadaAcao from "@/components/UltimaChamadaAcao";

// --- REMOVEMOS O GETSAFEDATA E O FETCHCOMPONENTDATA DAQUI ---
// Não queremos que a Home dependa de um slug que pode dar 404 e derrubar o site.

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
        {/* ESTRATÉGIA MAVELLIUM:
          Cada componente abaixo agora deve ter seu próprio useEffect e fetch interno.
          Isso evita que um erro de API em um componente quebre a página toda.
        */}
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