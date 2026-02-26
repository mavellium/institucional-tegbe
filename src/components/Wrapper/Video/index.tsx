import { HeroVideoView } from "../../Section/HeroVideoView";

interface Props {
    variant?: "home" | "ecommerce" | "marketing" | "sobre";
    slug: string;
}

export default async function HeroVideoWrapper({ variant = "marketing", slug }: Props) {
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/${slug}`;

    try {
        const response = await fetch(API_URL, {
            next: { revalidate: 3600 }
        });

        if (!response.ok) throw new Error(`Erro ao carregar dados do slug: ${slug}`);

        const data = await response.json();

        return <HeroVideoView
            videoSrc={data.metadata.assets.video_url}
            line1={data.content.headline.line_1}
            line2={data.content.headline.line_2}
            subline={data.content.headline.subline}
        />;

    } catch (error) {
        console.error(`Fetch Error [${slug}]:`, error);
        return null;
    }
}