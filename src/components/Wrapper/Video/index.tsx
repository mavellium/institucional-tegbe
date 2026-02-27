import AnimationVideoView from "@/components/Section/AnimationVideoView";
import { VideoSection } from "@/enums/video";

interface Props {
    slug: string;
    section?: VideoSection;
    theme: object
}

export default async function HeroVideoWrapper({ slug, section,theme }: Props) {
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/${slug}`;

    console.log("ENV TEST:", API_URL);

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Erro ao carregar dados do slug: ${slug}`);
        }

        const data = await response.json();

        // 🔒 REGRA FIXA PARA ESSE JSON
        const sectionKey: VideoSection =
            section ??
            data.defaultSection ??
            VideoSection.Cursos;

        const sectionData = data[sectionKey];

        if (!sectionData?.content) return null;

        return (
            <AnimationVideoView
                badge={sectionData.content.badge}
                title={sectionData.content.title}
                videoSrc={
                    sectionData.content.videoSrc ||
                    data.metadata.assets.video_url
                }
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