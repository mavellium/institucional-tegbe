import { VideoSection } from "@/enums/video.enum";

export type AnimationSectionData = {
    style: Record<string, any>;
    content: {
        badge: string;
        title: string;
        videoSrc?: string;
    };
};

export type HeroSectionData = {
    // Estilos que podem vir da API ou serem sobrescritos pelo tema
    style?: {
        accentColor?: string;
        gradientFrom?: string;
        gradientTo?: string;
        videoOpacity?: number;
        startMuted?: boolean;
    };
    content: {
        line1: string;
        line2: {
            prefix?: string;
            highlight: string;
            suffix?: string;
        };
        subline?: string;
        videoSrc?: string;
    };
};

export type VideoPayload = {
    defaultSection?: VideoSection;
    metadata?: {
        assets: {
            video_url: string;
        };
    };
} & {
    [K in VideoSection]: 
        K extends VideoSection.Marketing 
            ? HeroSectionData 
            : AnimationSectionData; // para as demais seções
};