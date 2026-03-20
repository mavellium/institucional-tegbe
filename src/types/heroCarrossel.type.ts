import { HeroSlide } from "./heroSlide.type";

export interface HeroCarrosselData {
    slides: HeroSlide[];
    // Configurações opcionais vindas da API
    type?: string;
    loop?: boolean;
    autoplayDelay?: number;
    corFundo?: string;
    corDestaque?: string;
    textoFundo?: string;
    navGradienteFrom?: string;
    navGradienteTo?: string;
    navAccent?: string;
    corIcone?: string;
}