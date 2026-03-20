import { ILogo } from "@/interface/imagem/ILogo";


export interface LogosApiData {
  values: ILogo[]
}

export interface LogosProps {
  variant?: 'default' | 'cursos' | 'marketing';
  endpoint: string
}

export const VARIANT_CONFIGS = {
  default: {
    bgColor: "bg-gray-100",
    gradientFrom: "from-gray-100",
    logoHeight: "h-10 md:h-16",
    logoOpacity: "opacity-60",
    logoFilter: "grayscale",
    speed: 100, // Pixels por segundo (mais fácil de controlar)
  },
  cursos: {
    bgColor: "bg-black",
    gradientFrom: "from-black",
    logoHeight: "h-10 md:h-16",
    logoOpacity: "opacity-70",
    logoFilter: "grayscale",
    speed: 80,
  },
  marketing: {
    bgColor: "bg-transparent",
    gradientFrom: "from-black",
    logoHeight: "h-10 md:h-16",
    logoOpacity: "opacity-70",
    logoFilter: "grayscale",
    speed: 80,
  },
};