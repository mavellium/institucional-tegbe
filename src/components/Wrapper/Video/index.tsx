import AnimationVideoView from "@/components/Section/AnimationVideoView";
import { HeroVideoView } from "../../Section/HeroVideoView";

export enum Variant {
    Static = "static",
    Animation = "animation",
}

interface Props {
    variant?: Variant;
    slug: string;
}

export default async function HeroVideoWrapper({ variant, slug }: Props) {
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/${slug}`;

    try {
        const response = await fetch(API_URL);

        if (!response.ok) throw new Error(`Erro ao carregar dados do slug: ${slug}`);

        const data = await response.json();
        if (variant === Variant.Static)
            return <HeroVideoView
                videoSrc={data.metadata.assets.video_url}
                line1={data.content.headline.line_1}
                line2={data.content.headline.line_2}
                subline={data.content.headline.subline}
            />;
        if (variant === Variant.Animation)
            return <AnimationVideoView
                badge={data.content.badge}
                title={data.content.title}
                videoSrc={data.metadata.assets.video_url}
                startMuted={data.metadata.assets.start_muted}
            />;
    } catch (error) {
        console.error(`Fetch Error [${slug}]:`, error);
        return null;
    }
}