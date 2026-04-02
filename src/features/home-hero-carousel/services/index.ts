import { getSafeData } from "@/core/api/getSafeData";
import type { HeroSlide } from "../types";

const SLUG = "hero-carrossel-home";

/**
 * Busca os slides do carrossel principal da Home no CMS.
 * Retorna array vazio em caso de falha ou resposta vazia.
 */
export async function fetchHeroSlides(): Promise<HeroSlide[]> {
  const data = await getSafeData<HeroSlide[]>(SLUG);
  return data ?? [];
}
