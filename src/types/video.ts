import { VideoSection } from "@/enums/video";

export type AnimationSectionData = {
    style: Record<string, any>;
    content: {
        badge: string;
        title: string;
        videoSrc?: string;
    };
};

export type AnimationPayload = {
    defaultSection?: VideoSection;
} & Record<VideoSection, AnimationSectionData>;