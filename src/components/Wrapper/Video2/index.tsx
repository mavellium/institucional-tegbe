import { HeroVideoView } from "@/components/Section/HeroVideoView";
import { VideoSection } from "@/enums/video";

interface HeroThemeProps {
  accentColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
  videoOpacity?: number;
  startMuted?: boolean;
}

interface Props {
  slug: string;
  section?: VideoSection;
  theme?: HeroThemeProps;
}

export default async function Video2({ slug, section, theme }: Props) {
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/${slug}`;
  console.log("Fetching:", API_URL);

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Erro ao carregar: ${slug}`);

    const data = await response.json();

    // Define a seção alvo (padrão: Hero)
    const sectionKey = section ?? VideoSection.Marketing;

    // 1. Verifica se a resposta tem a chave da seção
    let sectionData = data[sectionKey] ?? data; // fallback para o objeto inteiro

    // 2. Extrai o conteúdo (pode estar em 'content' ou diretamente)
    const content = sectionData.content ?? sectionData;

    // 3. Extrai o estilo (pode vir de 'style' ou do objeto raiz)
    const style = sectionData.style ?? {};

    // 4. Constrói as props para o HeroVideoView, mesclando:
    //    - valores do conteúdo
    //    - valores do style (vindos da API)
    //    - tema passado manualmente (prioridade máxima)
    const heroProps = {
      videoSrc: content.videoSrc ?? data.metadata?.assets?.video_url,
      line1: content.line1 || "Transforme seu",
      line2: content.line2 || { highlight: "futuro" },
      subline: content.subline,
      accentColor: theme?.accentColor ?? style.accentColor ?? "#E31B63",
      gradientFrom: theme?.gradientFrom ?? style.gradientFrom ?? "#FF0F43",
      gradientTo: theme?.gradientTo ?? style.gradientTo ?? "#B3002D",
      videoOpacity: theme?.videoOpacity ?? style.videoOpacity ?? 0.7,
      startMuted: theme?.startMuted ?? style.startMuted ?? true,
    };

    if (!heroProps.videoSrc) return null;

    return <HeroVideoView {...heroProps} />;
  } catch (error) {
    console.error("Erro no Video2:", error);
    return null;
  }
}