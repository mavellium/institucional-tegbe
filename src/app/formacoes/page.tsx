import videoConfig from "@/json/Video2/cursoConfig.json";
import { Header } from "@/components/Header";
import Schema from "@/components/Schema";
import { Footer } from "@/components/Footer";
import Expertise from "@/components/Expertise";
import HeadlineCurso from "@/components/HeadlineCurso";
import PorqueAprender from "@/components/PorqueAprender";
import Video2 from "@/components/Video2";
import Cursos from "@/components/Cursos";
import CasesCarousel from "@/components/Carrossel";
import GaleriaFotos from "@/components/GaleriaFotos";
import ComparacaoConcorrentes from "@/components/ComparacaoConcorrentes";
import Preco from "@/components/Preco";
import Faq from "@/components/Faq";
import Localizacao2 from "@/components/Localizacao2";
import { fetchComponentData } from "@/lib/api";
import Logos from "@/components/Logos";

// 1. Wrapper para dados de FORMS (.../form/slug)
async function getFormData(slug: string) {
    try {
        const res = await fetch(`https://tegbe-dashboard.vercel.app/api/tegbe-institucional/form/${slug}`, {
            next: { revalidate: 60 }
        });
        if (!res.ok) throw new Error('Falha no fetch form');
        return res.json();
    } catch (error) {
        return { values: [] };
    }
}

// 2. Wrapper para dados de JSON (.../json/slug) - ESSENCIAL PARA FAQ E CONCORRENTES
async function getJsonData(slug: string) {
    try {
        const res = await fetch(`https://tegbe-dashboard.vercel.app/api/tegbe-institucional/json/${slug}`, {
            next: { revalidate: 60 }
        });
        if (!res.ok) throw new Error(`Falha no fetch json ${slug}`);
        return res.json();
    } catch (error) {
        console.warn(`[CursosPage] Erro ao carregar json ${slug}.`);
        return null;
    }
}

// 3. Wrapper Genérico para Componentes
async function getSafeData(slug: string) {
    try {
        const res = await fetchComponentData(slug);
        return res;
    } catch (error) {
        console.warn(`[CursosPage] Erro ao carregar dados de ${slug}. Usando fallback.`);
        return { data: null };
    }
}

export default async function CursosPage() {
    // 4. Fetch Paralelo - ADICIONADO logosResponse
    const [
        whyLearnResponse,
        testimonialsResponse,
        galleryResponse,
        expertiseResponse,
        comparisonResponse,
        faqResponse, // Dados do FAQ
        logosResponse // Dados dos logos para cursos
    ] = await Promise.all([
        getSafeData('porque-aprender'),
        getSafeData('alunos'),
        getFormData('gallery'),
        getSafeData('expertise-curso'),
        getJsonData('concorrentes'),
        getJsonData('faq-curso'),
        getJsonData('logos-curso') // NOVO: Endpoint para logos de cursos
    ]);

    // 5. Extração
    const whyLearnData = whyLearnResponse?.data || null;
    const testimonialsData = testimonialsResponse?.data || null;
    const galleryData = galleryResponse?.values || [];
    const expertiseData = expertiseResponse?.data || null;

    // Para getJsonData, pegamos a resposta direta (pois o JSON não tem wrapper "data")
    const comparisonData = comparisonResponse || null;
    const faqData = faqResponse || null;
    const logosData = logosResponse || null;

    return (
        <>
            <Schema
                data={{
                    "@context": "https://schema.org",
                    "@type": "Service",
                    name: "Cursos e Treinamentos",
                    description: "Cursos práticos de marketing digital, e-commerce e marketplaces. Aprenda com especialistas da Tegbe e aplique estratégias reais para vender mais online.",
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
            <HeadlineCurso />
            <PorqueAprender />
            <Video2 variant="cursos" />
            
            {/* Componente Logos com dados do endpoint logos-curso */}
            <Logos 
                variant="cursos" 
                data={logosData} 
            />
            
            <Cursos />
            <CasesCarousel data={testimonialsData} />
            <GaleriaFotos data={galleryData} />

            <Expertise variant="cursos" />

            <Localizacao2 />

            <ComparacaoConcorrentes data={comparisonData} />

            <Faq data={faqData} />

            <Footer variant="cursos" />
        </>
    );
}

// data={[
//     {
//       id: "1",
//       alt: "Evento Tegbe",
//       image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
//       span: "row-span-2"
//     },
//     {
//       id: "2",
//       alt: "Workshop",
//       image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w-800&auto=format&fit=crop",
//       span: "row-span-1"
//     },
//     // Adicione mais itens...
//   ]}