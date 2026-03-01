import AnimationVideoView from "@/components/Section/AnimationVideoView";
import { HeroVideoView } from "@/components/Section/HeroVideoView"; // Ajuste o path conforme sua pasta
import { VideoSection } from "@/enums/video";

interface Props {
    slug: string;
    section?: VideoSection;
    theme: any;
    // Adicionamos uma prop opcional para forçar a variante se desejar
    viewVariant?: 'animation' | 'hero';
}

export default async function HeroVideoWrapper({ slug, section, theme, viewVariant }: Props) {
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/${slug}`;

    try {
        const response = await fetch(API_URL, { next: { revalidate: 3600 } });
        if (!response.ok) {
            throw new Error(`Erro ao carregar dados do slug: ${slug}`);
        }

        const data = await response.json();

        // 🔒 REGRA DE SELEÇÃO DE SEÇÃO
        const sectionKey: VideoSection =
            section ??
            data.defaultSection ??
            VideoSection.Cursos;

        const sectionData = data[sectionKey];

        if (!sectionData?.content) return null;

        const { content } = sectionData;
        const videoUrl = content.videoSrc || data.metadata?.assets?.video_url;

        // --- LÓGICA DE DECISÃO DE COMPONENTE ---
        // Decidimos com base na prop passada ou em algum campo vindo da API (ex: content.type)
        const activeVariant = viewVariant || content.type || 'animation';

        if (activeVariant === 'hero') {
            return (
                <HeroVideoView
                    videoSrc={videoUrl}
                    // Mapeamento focado em conversão e vendas
                    line1={content.line1 || "Estratégia para"}
                    line2={content.line2 || {
                        prefix: "Você",
                        highlight: "Vender Mais",
                        suffix: "com a Tegbe"
                    }}
                    subline={content.subline || "Transformamos tecnologia em faturamento real"}
                    accentColor={theme?.colors?.primary}
                    gradientFrom={theme?.colors?.gradientFrom}
                    gradientTo={theme?.colors?.gradientTo}
                    startMuted={true}
                />
            );
        }

        // --- RETORNO PADRÃO (AnimationVideoView) ---
        return (
            <AnimationVideoView
                badge={content.badge || "Tegbe Performance"}
                title={content.title || "Venda mais com nossas soluções digitais"}
                videoSrc={videoUrl}
                startMuted={false}
                variant="sobre"
                theme={theme}
            />
        );

    } catch (error) {
        console.error(`Fetch Error [${slug}]:`, {
            message: error instanceof Error ? error.message : error,
        });
        return null;
    }
}