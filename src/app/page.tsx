import { Dna, DnaInputData } from "@/components/Dna";
import Ecommerce, { EcommerceInputData } from "@/components/Ecommerce";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Headline } from "@/components/Headline";
import Logos from "@/components/Logos";
import News, { NewsInputData } from "@/components/News";
import { Roi, defaultRoiData } from '@/components/Roi';
import Schema from "@/components/Schema";
import { Setors, SetorsApiData } from "@/components/Setors";
import Steps from "@/components/Steps";
import {
  fetchComponentData,
  StepData,
} from "@/lib/api";

// Função Wrapper Segura para o Fetch
async function getSafeData(slug: string) {
  try {
    const res = await fetchComponentData(slug);
    return res;
  } catch (error) {
    console.warn(`[Page] Erro ao carregar dados de ${slug}. Usando fallback.`);
    return { data: null };
  }
}

export default async function Home() {
  const [
    stepsResponse,
    ecommerceResponse,
    setorsResponse,
    logosResponse,
    headlineResponse,
    dnaResponse,
    newsResponse,
  ] = await Promise.all([
    getSafeData('steps'),
    getSafeData('ecommerce'),
    getSafeData('setors'),
    getSafeData('logos'),
    getSafeData('headline'),
    getSafeData('dna'),
    getSafeData('casos-sucesso'),
  ]);

  // --- TRANSFORMAÇÃO: STEPS ---
  const transformStepsData = (apiData: any): StepData[] => {
    if (!apiData) return [];

    if (Array.isArray(apiData)) {
      return apiData.map((item: any, index: number) => ({
        id: item.id || index + 1,
        title: item.title || item.nome || `Step ${index + 1}`,
        subtitle: item.subtitle || item.subtitulo || '',
        description: item.description || item.descricao || '',
        image: item.image || item.imagem || '/steps1.png'
      }));
    }

    if (typeof apiData === 'object') {
      const arrayKeys = Object.keys(apiData).filter(key => Array.isArray(apiData[key]));
      if (arrayKeys.length > 0) {
        return apiData[arrayKeys[0]].map((item: any, index: number) => ({
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

  const stepsData = transformStepsData(stepsResponse.data);

  // --- TRANSFORMAÇÃO: ECOMMERCE ---
  const ecommerceData: EcommerceInputData | undefined = ecommerceResponse.data ? {
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
    cards: Array.isArray(ecommerceResponse.data.cards) 
      ? ecommerceResponse.data.cards.map((card: any, index: number) => ({
          id: card.id || index + 1,
          numero: card.numero || String(index + 1),
          titulo: card.titulo || card.title,
          descricao: card.descricao || card.description,
          visivel: card.visivel !== undefined ? card.visivel : true,
        }))
      : []
  } : undefined;

  // --- TRANSFORMAÇÃO: SETORS ---
  let setorsData: SetorsApiData | undefined = undefined;

  if (setorsResponse.data) {
    if (Array.isArray(setorsResponse.data)) {
      setorsData = {
        title: "Por que centralizar a operação está",
        highlightedText: "travando",
        afterText: " o seu crescimento?",
        cards: setorsResponse.data.map((card: any) => ({
          id: card.id,
          image: card.image,
          title: card.title
        }))
      };
    } else {
      setorsData = {
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
      };
    }
  }

  // --- TRANSFORMAÇÃO: LOGOS ---
  const logosData = Array.isArray(logosResponse.data) ?
    logosResponse.data.map((item: any, index: number) => ({
      id: item.id || index + 1,
      src: item.logo || item.src || item.image || `/logo${(index % 4) + 1}.svg`,
      alt: item.name || item.alt || `Logo ${index + 1}`,
      width: item.width || 100,
      height: item.height || 100,
      url: item.url || item.link,
    })) : [];

  // --- TRANSFORMAÇÃO: HEADLINE ---
  const headlineData = headlineResponse.data || undefined;

  // --- TRANSFORMAÇÃO: DNA ---
  let dnaData: DnaInputData | undefined = undefined;
  if (dnaResponse.data) {
    const rawData = dnaResponse.data;
    // Tenta pegar de 'values' (padrão) ou usa o objeto direto ou array direto
    const actualContent = (rawData.values && Array.isArray(rawData.values)) 
        ? rawData.values[0] 
        : (Array.isArray(rawData) ? rawData[0] : rawData);
        
    if (actualContent) {
      dnaData = actualContent;
    }
  }

  // --- TRANSFORMAÇÃO: NEWS (CASOS DE SUCESSO) ---
  let newsData: NewsInputData | undefined = undefined;
  if (newsResponse.data && Array.isArray(newsResponse.data)) {
    newsData = {
      items: newsResponse.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        logo: item.logo || "",
        description: item.description,
        result: item.result,
        tags: item.tags || []
      }))
    };
  }

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
        <Setors data={setorsData} />
        
        <Roi data={defaultRoiData} />
        <Dna data={dnaData} />
        
        <News data={newsData} />
      </main>
      <Footer />
    </>
  );
}