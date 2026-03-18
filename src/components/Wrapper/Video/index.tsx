// AnimationVideoWrapper.tsx
import AnimationVideoView from "@/components/Section/AnimationVideoView";
import { HeroVideoView } from "@/components/Section/HeroVideoView";
import { VideoSection } from "@/enums/video.enum";

interface Props {
    slug: string;
    section?: VideoSection;
    theme: any;
    viewVariant?: 'animation' | 'hero';
    showTexture?: boolean;
    textureOpacity?: number;
    textureSrc?: string;
}

export default async function AnimationVideoWrapper({ 
    slug, 
    section, 
    theme, 
    viewVariant,
    showTexture,
    textureOpacity,
    textureSrc
}: Props) {
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/${slug}`;

    try {
        const response = await fetch(API_URL, { next: { revalidate: 3600 } });
        if (!response.ok) {
            throw new Error(`Erro ao carregar dados do slug: ${slug}`);
        }

        const data = await response.json();

        const sectionKey: VideoSection =
            section ??
            data.defaultSection ??
            VideoSection.Cursos;

        const sectionData = data[sectionKey];

        if (!sectionData?.content) return null;

        const { content } = sectionData;
        const videoUrl = content.videoSrc || data.metadata?.assets?.video_url;

        const activeVariant = viewVariant || content.type || 'animation';

        if (activeVariant === 'hero') {
            return (
                <HeroVideoView
                    videoSrc={videoUrl}
                    title={content.title}
                    subtitle={content.subtitle}
                    accentColor={theme?.colors?.primary}
                    gradientFrom={theme?.colors?.gradientFrom}
                    gradientTo={theme?.colors?.gradientTo}
                    startMuted={true}
                />
            );
        }

        return (
            <div className="relative w-full justify-center items-center h-full">
                <AnimationVideoView
                    badge={content.badge || "Tegbe Performance"}
                    title={content.title || "Venda mais com nossas soluções digitais"}
                    videoSrc={videoUrl}
                    startMuted={false}
                    variant="sobre"
                    theme={theme}
                    // 🔹 ADICIONADO AQUI: Repassando as props para a View final
                    showTexture={showTexture}
                    textureOpacity={textureOpacity}
                    textureSrc={textureSrc}
                />
            </div>
        );

    } catch (error) {
        console.error(`Fetch Error [${slug}]:`, {
            message: error instanceof Error ? error.message : error,
        });
        return null;
    }
}