import { Header } from "@/components/Header";
import SellMore from "@/components/SellMore";
import Logos from "@/components/Logos";
import { Companys } from "@/components/Companys";
import { Footer } from "@/components/Footer";
import Schema from "@/components/Schema";
import { Equipe } from "@/components/Equipe";
import { ChamadaAcao } from "@/components/ChamadaAcao";
import Cards from "@/components/Cards";
import Animacao from "@/components/Animacao";
import { Headline } from "@/components/Headline";
import { SectionImage } from "@/components/SectionImage";
import { fetchComponentData } from "@/lib/api";
import Plataforms from "@/components/Solucoes/Plataforms";
import Passos from "@/components/Passos";

// Função Wrapper Segura para o Fetch
async function getSafeData(slug: string) {
  try {
    const res = await fetchComponentData(slug);
    return res;
  } catch (error) {
    console.warn(`[EcommercePage] Erro ao carregar dados de ${slug}. Usando fallback.`);
    return { data: null };
  }
}

export default async function EcommercePage() {
    // 1. PERFORMANCE: Buscando todos os dados necessários em paralelo
    const [
        headlineRes, 
        companyRes, 
        ctaRes, 
        equipeRes,
        stepsRes // Novo endpoint solicitado
    ] = await Promise.all([
        getSafeData('headline'),
        getSafeData('company'),
        getSafeData('call-to-action'),
        getSafeData('equipe'),
        // Buscamos diretamente do endpoint fornecido
        fetch('https://tegbe-dashboard.vercel.app/api/tegbe-institucional/form/steps')
            .then(res => res.ok ? res.json() : { steps: [] })
            .catch(() => ({ steps: [] }))
    ]);

    // 2. Extração Segura
    const headlineData = headlineRes?.data ?? null;
    const companysData = companyRes?.data?.ecommerce ?? null;
    const ctaData = ctaRes?.data?.ecommerce ?? null;
    const equipeData = equipeRes?.data?.ecommerce ?? null;
    
    // Extração dos passos (ajuste o caminho conforme a estrutura do JSON retornado)
    const stepsData = stepsRes?.steps || stepsRes || [];

    return (
        <>
            <Schema
                data={{
                    "@context": "https://schema.org",
                    "@type": "Service",
                    name: "E-commerce",
                    provider: {
                        "@type": "Organization",
                        name: "Tegbe",
                    },
                }}
            />
            
            <Header variant="ecommerce" />
            
            {headlineData && <Headline data={headlineData} variant="ecommerce" />}
            
            <SellMore />
            <Cards variant="home" />
            
            {/* Agora o componente Passos recebe dados reais da API */}
            <Passos steps={stepsData} />
            
            <Animacao/>
            <Plataforms />
            <Logos />
            <Cards variant="ecommerce" />
            <SectionImage variant="ecommerce" />
            
            <Equipe variant="ecommerce" data={equipeData} />
            <Companys variant="ecommerce" data={companysData} />
            <ChamadaAcao variant="ecommerce" data={ctaData} />
            
            <Footer />
        </>
    );
}