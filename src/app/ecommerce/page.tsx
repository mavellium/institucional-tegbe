import { Header } from "@/components/Header";
import SellMore from "@/components/SellMore";
import Logos from "@/components/Logos";
import { Companys } from "@/components/Companys";
import { Footer } from "@/components/Footer";
import Schema from "@/components/Schema";
import { Equipe } from "@/components/Equipe";
import { ChamadaAcao } from "@/components/ChamadaAcao";
import Animacao from "@/components/Animacao";
import { Headline } from "@/components/Headline";
import { SectionImage } from "@/components/SectionImage";
import { fetchComponentData } from "@/lib/api";
import Plataforms from "@/components/Solucoes/Plataforms";
import Passos from "@/components/Passos";
import ServiceFlow from "@/components/ServiceFlow";
import CertifiedSection from "@/components/ServiceFlow/CertifiedSection";

async function getSafeData(slug: string) {
  try {
    const res = await fetchComponentData(slug);
    
    // Verificação baseada em existência, evitando o erro de propriedade 'status'
    if (!res || !res.data) {
      console.warn(`[Tegbe Build] Dados não encontrados para: ${slug}`);
      return { data: null };
    }
    
    return res;
  } catch (error) {
    return { data: null };
  }
}

export default async function EcommercePage() {
    // PERFORMANCE: Busca paralela
    const [
        headlineRes, 
        companyRes, 
        ctaRes, 
        equipeRes,
        stepsRes 
    ] = await Promise.all([
        getSafeData('headline'),
        getSafeData('company'),
        getSafeData('call-to-action'),
        getSafeData('equipe'),
        fetch('https://tegbe-dashboard.vercel.app/api/tegbe-institucional/form/steps', { next: { revalidate: 3600 } })
            .then(res => res.ok ? res.json() : [])
            .catch(() => [])
    ]);

    // Extração Segura (Null Coalescing)
    const headlineData = headlineRes?.data ?? null;
    const companysData = companyRes?.data?.ecommerce ?? null;
    const ctaData = ctaRes?.data?.ecommerce ?? null;
    const equipeData = equipeRes?.data?.ecommerce ?? null;
    
    // Tratamento para garantir que steps seja sempre um Array
    const stepsData = Array.isArray(stepsRes) ? stepsRes : (stepsRes?.steps || []);

    const data = await fetch('https://tegbe-dashboard.vercel.app/api/tegbe-institucional/json/hero-images').then(res => res.json());

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
            <ServiceFlow variant="home"/>

            <Passos/>
            
            <Animacao/>
            <Plataforms />
            <Logos />
            <CertifiedSection/>
            <SectionImage variant="ecommerce" apiData={data}/>
            
            <Equipe variant="ecommerce" data={equipeData} />
            <Companys variant="ecommerce" data={companysData} />
            <ChamadaAcao variant="ecommerce" data={ctaData} />
            
            <Footer />
        </>
    );
}