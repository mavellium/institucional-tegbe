"use client";

import AnimationVideoView from "@/components/sections/AnimationVideoView";
import { HeroVideoView } from "@/components/sections/HeroVideoView";
import { useApi } from "@/hooks/useApi";
import { RichTextItem } from "@/types/richText.type";

interface Props {
  endpoint?: string;
  data?: IResponse;
  theme: any;
  viewVariant?: "animation" | "hero";
  showTexture?: boolean;
  textureOpacity?: number;
  textureSrc?: string;
}

interface IVideo {
  type?: "animation" | "hero";
  badge?: string;
  title?: RichTextItem[];
  subtitle?: RichTextItem[];
  videoSrc?: string;
}

export interface IResponse {
  video: IVideo;
}

export default function AnimationVideoWrapper({
  endpoint = "",
  data: dataProp,
  theme,
  viewVariant,
  showTexture,
  textureOpacity,
  textureSrc,
}: Props) {
  const { data: fetched, loading } = useApi<IResponse>(dataProp ? "" : endpoint);
  const data = dataProp ?? fetched;

  if (loading || !data?.video) return null;

  const video = data.video;

  const videoUrl = video.videoSrc;
  const activeVariant = viewVariant || video.type || "animation";

  
  if (!videoUrl) return null;

  if (activeVariant === "hero") {
    return (
      <HeroVideoView
        videoSrc={videoUrl}
        title={video.title || []}
        subtitle={video.subtitle || []}
        accentColor={theme?.colors?.primary}
        gradientFrom={theme?.colors?.gradientFrom}
        gradientTo={theme?.colors?.gradientTo}
        startMuted
      />
    );
  }

  return (
    <div className="relative w-full justify-center items-center h-full">
      <AnimationVideoView
        badge={video.badge || ""}
        title={video.title || ""}
        videoSrc={videoUrl}
        startMuted={false}
        variant="sobre"
        theme={theme}
        showTexture={showTexture}
        textureOpacity={textureOpacity}
        textureSrc={textureSrc}
      />
    </div>
  );
}