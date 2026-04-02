import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Schema from "@/components/layout/Schema";
import { getSafeData } from "@/core/api/getSafeData";
import HeroCarrossel from "@/features/home-hero-carousel/components/HeroCarrossel";
import Logos from "@/components/sections/Logos";
import Carrossel from "@/components/sections/CarrosselServicos";
import Video from "@/components/sections/VideoAdaptivo";
import Passos from "@/components/sections/Passos";
import { Clientes } from "@/components/sections/Clientes";
import ConsultorOficial from "@/components/sections/ServiceFlow/CertifiedSection";
import { Imagem } from "@/components/sections/Imagem";
import { Equipe } from "@/components/sections/Equipe";
import { SideBySideSection } from "@/components/sections/SideBySide";
import type { HeroSlide } from "@/types/heroSlide.type";

export default async function EcommercePage() {
  const [
    heroSlidesData,
    logosData,
    servicosData,
    videoData,
    passosData,
    clientesData,
    plataformasData,
    consultorData,
    imagemData,
    equipeData,
    sideBySideData,
  ] = await Promise.all([
    getSafeData<HeroSlide[]>("hero-carrossel-ecommerce"),
    getSafeData("logos-ecommerce"),
    getSafeData("servicos-ecommerce"),
    getSafeData("video-ecommerce"),
    getSafeData("passos"),
    getSafeData("clientes"),
    getSafeData("plataformas-ecommerce"),
    getSafeData("consultoria-oficial"),
    getSafeData("imagem-ecommerce"),
    getSafeData("equipe"),
    getSafeData("agendar-reuniao-ecommerce"),
  ]);

  return (
    <>
      <Schema
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "E-commerce",
          description:
            "Consultoria especializada em e-commerce para escalar vendas online. Estratégia, tráfego pago, marketplaces, CRM e performance digital com foco em resultados reais.",
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
        <HeroCarrossel
          slides={heroSlidesData ?? []}
          corFundo="#020202"
          corDestaque="#FFCC00"
          textoFundo="ECOMMERCE"
          navGradienteFrom="#FFCC00"
          navGradienteTo="#FFB800"
          navAccent="#FFDB4D"
          corIcone="black"
        />
        <Logos data={logosData as any} />
        <Carrossel data={servicosData as any} />
        <Video
          data={videoData as any}
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
        <Logos data={logosData as any} />
        <Passos data={passosData as any} />
        <Clientes data={clientesData as any} />
        <Carrossel
          data={plataformasData as any}
          showTexture
          textureOpacity={0.5}
          textureSrc="/textura.svg"
          backgroundColor="#0a0a0a"
        />
        <ConsultorOficial data={consultorData as any} />
        <Imagem variant="ecommerce" data={imagemData as any} />
        <Equipe data={equipeData as any} />
        <SideBySideSection data={sideBySideData as any} />
      </main>

      <Footer />
    </>
  );
}
