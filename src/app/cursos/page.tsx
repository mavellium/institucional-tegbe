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
    // 4. Fetch Paralelo
    const [
        whyLearnResponse,
        testimonialsResponse,
        galleryResponse,
        expertiseResponse,
        comparisonResponse,
        faqResponse // Dados do FAQ
    ] = await Promise.all([
        getSafeData('porque-aprender'),
        getSafeData('alunos'),
        getFormData('gallery'),
        getSafeData('expertise-curso'),
        getJsonData('concorrentes'), // Usa getJsonData
        getJsonData('faq-curso')    // <--- Usa getJsonData com o slug 'faq-curso'
    ]);

    // 5. Extração
    const whyLearnData = whyLearnResponse?.data || null;
    const testimonialsData = testimonialsResponse?.data || null;
    const galleryData = galleryResponse?.values || [];
    const expertiseData = expertiseResponse?.data || null;
    
    // Para getJsonData, pegamos a resposta direta (pois o JSON não tem wrapper "data")
    const comparisonData = comparisonResponse || null;
    const faqData = faqResponse || null;

    return (
        <>
            <Schema
                data={{
                    "@context": "https://schema.org",
                    "@type": "Service",
                    name: "Cursos e Treinamentos",
                    provider: {
                        "@type": "Organization",
                        name: "Tegbe",
                    },
                }}
            />
            
            <Header variant="cursos" />
            <HeadlineCurso/>
            <PorqueAprender data={whyLearnData} />
            <Video2 config={videoConfig}/>
            <Cursos/>
            <CasesCarousel data={testimonialsData} />
            <GaleriaFotos data={galleryData} />
            <Localizacao2/>
            
            <Expertise config={expertiseData}/>
            
            <ComparacaoConcorrentes data={comparisonData}/>

            <Faq data={faqData}/>
            
            <Footer variant="cursos" />
        </>
    );
}