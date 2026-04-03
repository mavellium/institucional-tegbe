import dynamic from "next/dynamic";
import Schema from "@/components/layout/Schema";
import { Footer } from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { getSafeData } from "@/core/api/getSafeData";
import HeroCarrossel from "@/features/home-hero-carousel/components/HeroCarrossel";
import type { HeroSlide } from "@/types/heroSlide.type";

// Seções below-the-fold — lazy loaded para otimizar FCP
const PorqueATegbe = dynamic(() => import("@/components/sections/PorqueATegbe"), {});
const Video = dynamic(() => import("@/components/sections/VideoAdaptivo"), {});
const MarketingInteligente = dynamic(
  () => import("@/components/sections/MarketingInteligente"),
  {}
);
const Solucoes = dynamic(() => import("@/components/sections/SolucoesMarketing"), {});
const Parceiro = dynamic(() => import("@/components/sections/Parceiro"), {});
const Meta = dynamic(() => import("@/components/sections/Meta"), {});
const Carrossel = dynamic(() => import("@/components/sections/CarrosselEspecialistas"), {});
const SideBySideSection = dynamic(
  () =>
    import("@/components/sections/SideBySide").then((mod) => ({ default: mod.SideBySideSection })),
  {}
);

export default async function MarketingPage() {
  const [
    heroSlidesData,
    porqueATegbeData,
    videoData,
    marketingInteligenteData,
    solucoesData,
    parceiroData,
    metaData,
    carrosselData,
    sideBySideData,
  ] = await Promise.all([
    getSafeData<HeroSlide[]>("hero-carrossel-marketing"),
    getSafeData("agencias-falham"),
    getSafeData("video-marketing"),
    getSafeData("marketing-inteligente"),
    getSafeData("solucoes"),
    getSafeData("parceiros"),
    getSafeData("meta-marketing"),
    getSafeData("carrossel-de-funcionarios"),
    getSafeData("agendar-reuniao-marketing"),
  ]);

  // Preload da imagem LCP (primeiro slide do hero)
  const lcpImageUrl = (heroSlidesData as HeroSlide[] | null)?.[0]?.image;

  return (
    <>
      {lcpImageUrl && (
        <link
          rel="preload"
          as="image"
          href={`/_next/image?url=${encodeURIComponent(lcpImageUrl)}&w=828&q=75`}
          imageSrcSet={`/_next/image?url=${encodeURIComponent(lcpImageUrl)}&w=384&q=75 384w, /_next/image?url=${encodeURIComponent(lcpImageUrl)}&w=640&q=75 640w, /_next/image?url=${encodeURIComponent(lcpImageUrl)}&w=750&q=75 750w, /_next/image?url=${encodeURIComponent(lcpImageUrl)}&w=828&q=75 828w, /_next/image?url=${encodeURIComponent(lcpImageUrl)}&w=1080&q=75 1080w`}
          imageSizes="(min-width: 1024px) 60vw, 100vw"
          fetchPriority="high"
        />
      )}
      <Schema
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Marketing Digital e Performance",
          description:
            "A Tegbe oferece serviços de marketing digital e performance, com foco em tráfego pago, estratégia, dados e conversão. A atuação é orientada por métricas, tecnologia e metodologia própria, ajudando empresas a estruturarem e escalarem suas operações digitais de forma previsível e sustentável.",
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
      <Navbar variant="marketing" />
      <main>
        <HeroCarrossel slides={heroSlidesData ?? []} corDestaque="#f9265e" textoFundo="MARKETING" />
        <PorqueATegbe data={porqueATegbeData as any} />
        <Video
          data={videoData as any}
          viewVariant="hero"
          theme={{
            accentColor: "#f9265e",
            gradientFrom: "#ff0400",
            gradientTo: "#f9396f",
            videoOpacity: 0.8,
            startMuted: true,
          }}
        />
        <MarketingInteligente data={marketingInteligenteData as any} />
        <Solucoes data={solucoesData as any} />
        <Parceiro data={parceiroData as any} />
        <Meta data={metaData as any} />
        <Carrossel data={carrosselData as any} />
        <SideBySideSection data={sideBySideData as any} />
      </main>
      <Footer variant="marketing" />
    </>
  );
}
