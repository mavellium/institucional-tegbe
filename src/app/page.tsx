import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Schema from "@/components/layout/Schema";
import HeroCarousel from "@/features/home-hero-carousel/components/HeroCarrossel";
import { fetchHeroSlides } from "@/features/home-hero-carousel/services";
import { getSafeData } from "@/core/api/getSafeData";
import { fetchCms } from "@/core/api/client";
import { fetchBlogPosts } from "@/features/blog/services";

// Imports Dinâmicos
const MostrarSolucoes = dynamic(() => import("@/components/sections/HomeCards"));
const Marketplaces = dynamic(() => import("@/components/web/marketplaces"));
const SectionMarketing = dynamic(() => import("@/components/sections/BannerMarketing"));
const SectionFormacoes = dynamic(() => import("@/components/sections/SectionFormacoes"));
const Ferramentas = dynamic(() => import("@/components/web/ferramentas"));
const CtaDuvidas = dynamic(() => import("@/components/web/ctaDuvidas"));
const FaqHome = dynamic(() => import("@/components/sections/FaqHome"));
const HomeBlog = dynamic(() => import("@/components/sections/HomeBlog"));

export default async function Home() {
  // Fetch paralelo de todos os recursos do CMS
  const [
    heroSlides,
    solucoesData,
    marketplacesData,
    redesSociaisData,
    formacoesHomeData,
    ferramentasData,
    ctaDuvidasData,
    faqHomeData,
    blogPostsResult,
  ] = await Promise.all([
    fetchHeroSlides(),
    getSafeData("solucoes-home"),
    getSafeData("marketplaces"),
    getSafeData("redes-sociais"),
    fetchCms("json/formacoes-home", { revalidate: 10 }).then((r) => r.data),
    getSafeData("json/ferramentas"),
    getSafeData("duvida-cta"),
    getSafeData("faq-home"),
    fetchBlogPosts({ limit: "12", status: "PUBLISHED" }),
  ]);

  const blogPosts = blogPostsResult?.data ?? [];

  // Fetch direto com URL absoluta — evita qualquer variação do API_BASE_URL no ambiente
  const homeBlogRaw = await fetch(
    "https://janus.mavellium.com.br/api/tegbe-institucional/json/home-blog",
    { next: { revalidate: 10, tags: ["cms:home-blog"] } }
  )
    .then((r) => (r.ok ? r.json() : null))
    .catch(() => null);

  const blogSection = (homeBlogRaw?.["blog texto"] ?? undefined) as
    | {
        label?: string;
        titulo?: string;
        descricao?: string;
        textoBotao?: string;
      }
    | undefined;

  // Otimização LCP: Preload da imagem do primeiro slide
  const lcpImageUrl = heroSlides?.[0]?.image;

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
          name: "Sua solução completa em vendas",
          description:
            "Serviços especializados em consultoria de e-commerce e marketing digital pela agência Tegbe.",
          provider: {
            "@type": "Organization",
            name: "Tegbe",
            url: "https://tegbe.com.br",
            logo: "https://tegbe.com.br/logo.png",
          },
        }}
      />

      <Header />

      <main>
        <HeroCarousel
          slides={heroSlides}
          corDestaque="#cfba19"
          textoFundo="TEGBE"
          navAccent="#f5df36"
          loop={true}
          autoplayDelay={9000}
        />

        <MostrarSolucoes data={solucoesData as any} />
        <Marketplaces data={marketplacesData as any} />
        <SectionMarketing data={redesSociaisData as any} />
        <SectionFormacoes data={formacoesHomeData as any} />
        <Ferramentas data={ferramentasData as any} />
        <CtaDuvidas data={ctaDuvidasData as any} />
        <FaqHome data={faqHomeData as any} />

        {/* Passando posts e textos dinâmicos do CMS */}
        <HomeBlog posts={blogPosts} data={blogSection} />
      </main>

      <Footer />
    </>
  );
}
