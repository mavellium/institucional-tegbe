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
import {
  fetchComponentData,
  StepData,
  EcommerceData,
  SetorData,
  NewsData,
  // Remova a importação do LogoData antigo
  DnaData,
  // SectionImageData
} from "@/lib/api";

// Esta é uma página Server Component por padrão no Next.js 13+ App Router
export default async function Home() {
  // Buscar dados para todos os componentes em paralelo
  const [
    stepsResponse,
    ecommerceResponse,
    setorsResponse,
    // newsResponse,
    logosResponse,
    headlineResponse,
    // dnaResponse,
    // sectionImageResponse
  ] = await Promise.all([
    fetchComponentData('steps'),
    fetchComponentData('ecommerce'),
    fetchComponentData('setors'),
    // fetchComponentData('news'),
    fetchComponentData('logos'),
    fetchComponentData('headline'),
    // fetchComponentData('dna'),
    // fetchComponentData('sectionimage')
  ]);

  // Função para transformar dados da API para o formato esperado pelo componente Steps
  const transformStepsData = (apiData: any): StepData[] => {
    if (!apiData) return [];

    // Se for array, mapeia diretamente
    if (Array.isArray(apiData)) {
      return apiData.map((item: any, index: number) => ({
        id: item.id || index + 1,
        title: item.title || item.nome || `Step ${index + 1}`,
        subtitle: item.subtitle || item.subtitulo || '',
        description: item.description || item.descricao || '',
        image: item.image || item.imagem || '/steps1.png'
      }));
    }

    // Se for objeto, procura por arrays dentro
    if (typeof apiData === 'object') {
      const arrayKeys = Object.keys(apiData).filter(key => Array.isArray(apiData[key]));
      if (arrayKeys.length > 0) {
        const firstArray = apiData[arrayKeys[0]];
        return firstArray.map((item: any, index: number) => ({
          id: item.id || index + 1,
          title: item.title || item.nome || `Step ${index + 1}`,
          subtitle: item.subtitle || item.subtitulo || '',
          description: item.description || item.descricao || '',
          image: item.image || item.imagem || '/steps1.png'
        }));
      }
    }

    return [];
  };

  // Transformar dados para cada componente
  const stepsData = transformStepsData(stepsResponse.data);

  // Transformação dos dados da API
  const ecommerceData = ecommerceResponse.data ? {
    titulo: {
      texto: ecommerceResponse.data.titulo?.texto,
      visivel: ecommerceResponse.data.titulo?.visivel,
    },
    heading: {
      texto: ecommerceResponse.data.heading?.texto,
      destaque: ecommerceResponse.data.heading?.destaque,
      visivel: ecommerceResponse.data.heading?.visivel,
    },
    subtitulo: {
      texto: ecommerceResponse.data.subtitulo?.texto,
      visivel: ecommerceResponse.data.subtitulo?.visivel,
    },
    imagem: {
      src: ecommerceResponse.data.imagem?.src,
      alt: ecommerceResponse.data.imagem?.alt,
      visivel: ecommerceResponse.data.imagem?.visivel,
    },
    cards: ecommerceResponse.data.cards?.map((card: any, index: number) => ({
      id: card.id || index + 1,
      numero: card.numero || String(index + 1),
      titulo: card.titulo || card.title,
      descricao: card.descricao || card.description,
      visivel: card.visivel !== undefined ? card.visivel : true,
    }))
  } : undefined;

  const setorsData = setorsResponse.data ? {
    title: setorsResponse.data.title,
    highlightedText: setorsResponse.data.highlightedText,
    afterText: setorsResponse.data.afterText,
    cards: setorsResponse.data.cards?.map((card: any, index: number) => ({
      id: card.id || index + 1,
      image: card.image || card.imagem || `/growth-${(index % 4) + 1}.png`,
      title: card.title || card.titulo,
    })),
    controls: setorsResponse.data.controls,
    colors: setorsResponse.data.colors,
  } : undefined;

  // const newsData = newsResponse.data as NewsData[];

  // Para logos, usamos a interface do componente diretamente
  const logosData = logosResponse.data ?
    logosResponse.data.map((item: any, index: number) => ({
      id: item.id || index + 1,
      src: item.logo || item.src || item.image || `/logo${(index % 4) + 1}.svg`,
      alt: item.name || item.alt || `Logo ${index + 1}`,
      width: item.width || 100,
      height: item.height || 100,
      url: item.url || item.link,
    })) : [];

  // Para os outros componentes, você pode criar interfaces similares
  const headlineData = headlineResponse.data as any; // Ou crie uma interface específica
  // const dnaData = dnaResponse.data as DnaData;
  // const sectionImageData = sectionImageResponse.data as SectionImageData;

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
        <Headline data={headlineData} />
        <Logos data={logosData} />
        <Steps steps={stepsData} />
        <Ecommerce data={ecommerceData} />
        <Setors data={setorsData}/>
        <Roi data={defaultRoiData} />
        {/* <SectionImage data={sectionImageData} /> */}
        <Dna />
        <News />
      </main>
      <Footer />
    </>
  );
}