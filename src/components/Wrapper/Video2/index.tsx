import { HeroVideoView } from "@/components/Section/HeroVideoView";
import { VideoSection } from "@/enums/video.enum";
import { RichTextItem } from "@/types/richText.type";

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

interface HeroContent {
  videoSrc: string;
  title: RichTextItem[];
  subtitle: RichTextItem[];
}

const mockData: HeroContent = {
  videoSrc: "",

  title: [
    { type: "text", value: "Transforme o seu ", font:"bold" },
    { type: "highlight", value: "futuro", color: "#F9396F", serif:false, italic:false, font:"bold" },
  ],

  subtitle: [
    {
      type: "text",
      value:
        "",
    },
  ],
};

export default async function Video2({ slug, section, theme }: Props) {
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/${slug}`;

  let content: HeroContent = mockData;
  let style: any = {};

  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 300 },
    });

    if (response.ok) {
      const data = await response.json();

      const sectionKey = section ?? VideoSection.Marketing;

      const sectionData = data?.[sectionKey] ?? data;

      content = {
        videoSrc: sectionData?.content?.videoSrc ?? mockData.videoSrc,
        title: sectionData?.content?.title ?? mockData.title,
        subtitle: sectionData?.content?.subtitle ?? mockData.subtitle,
      };

      style = sectionData?.style ?? {};
    }
  } catch (error) {
    console.warn("API falhou, usando mockData:", error);
  }

  const heroProps = {
    videoSrc: content.videoSrc,

    title: content.title,

    subtitle: content.subtitle,

    accentColor:
      theme?.accentColor ??
      style?.accentColor ??
      "#FFC72C",

    gradientFrom:
      theme?.gradientFrom ??
      style?.gradientFrom ??
      "#FFC72C",

    gradientTo:
      theme?.gradientTo ??
      style?.gradientTo ??
      "#F59E0B",

    videoOpacity:
      theme?.videoOpacity ??
      style?.videoOpacity ??
      0.65,

    startMuted:
      theme?.startMuted ??
      style?.startMuted ??
      true,
  };

  return <HeroVideoView {...heroProps} />;
}