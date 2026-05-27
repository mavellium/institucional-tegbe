import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Schema from "@/components/layout/Schema";
import { Equipe } from "@/components/sections/Equipe";
import Passos from "@/components/sections/Passos";
import ConsultorOficial from "@/components/sections/ServiceFlow/CertifiedSection";
import Video from "@/components/sections/VideoAdaptivo";
import HeroCarrossel from "@/components/sections/HeroCarrossel";
import Logos from "@/components/sections/Logos";
import { Imagem } from "@/components/sections/Imagem";
import { SideBySideSection } from "@/components/sections/SideBySide";
import { Clientes } from "@/components/sections/Clientes";
import Carrossel from "@/components/sections/CarrosselServicos";
import { getJanusContent } from "@/lib/api";

export const revalidate = 60;

export default async function EcommercePage() {
  const [ecommerceContent, sobreContent, homeContent] = await Promise.all([
    getJanusContent("ecommerce"),
    getJanusContent("sobre"),
    getJanusContent("home"),
  ]);

  return (
    <>
      <Schema
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "E-commerce",
          description: "Consultoria especializada em e-commerce para escalar vendas online. Estratégia, tráfego pago, marketplaces, CRM e performance digital com foco em resultados reais.",
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

      <Header />
      <HeroCarrossel
        data={((ecommerceContent["hero-carrossel-ecommerce"] ?? {}) as any)?.items}
        type="HeroEcommerce"
        corFundo="#020202"
        corDestaque="#FFCC00"
        textoFundo="ECOMMERCE"
        navGradienteFrom="#FFCC00"
        navGradienteTo="#FFB800"
        navAccent="#FFDB4D"
        corIcone="black"
      />
      <Logos data={(ecommerceContent["logos-ecommerce"] ?? {}) as any} />
      <Carrossel data={(ecommerceContent["servicos-ecommerce"] ?? {}) as any} />
      <Video
        data={(ecommerceContent["video-ecommerce"] ?? {}) as any}
        theme={{
          backgroundColor: "#FFFFFF",
          textColor: "#020202",
          accentColor: "#FFD700",
          badgeBg: "rgba(255,215,0,0.1)",
          badgeBorder: "rgba(255,215,0,0.3)",
          badgeText: "#B8860B",
        }}
        showTexture={true}
        textureOpacity={0.05}
        textureSrc="/textura.svg"
      />
      <Logos data={(ecommerceContent["logos-ecommerce"] ?? {}) as any} />
      <Passos data={(sobreContent["passos"] ?? {}) as any} />
      <Clientes data={(homeContent["clientes"] ?? {}) as any} />
      <Carrossel
        data={(ecommerceContent["plataformas-ecommerce"] ?? {}) as any}
        showTexture
        textureOpacity={0.5}
        textureSrc="/textura.svg"
        backgroundColor="#0a0a0a"
      />
      <ConsultorOficial data={(sobreContent["consultoria-oficial"] ?? {}) as any} />
      <Imagem data={(ecommerceContent["imagem-ecommerce"] ?? {}) as any} variant="ecommerce" />
      <Equipe data={(sobreContent["equipe"] ?? {}) as any} />
      <SideBySideSection
        type="AgendarReuniao"
        data={(ecommerceContent["agendar-reuniao-ecommerce"] ?? {}) as any}
      />

      <Footer />
    </>
  );
}
