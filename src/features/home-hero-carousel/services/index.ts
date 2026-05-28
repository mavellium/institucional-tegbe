import { janus, getSection, getPageContent } from "@/lib/janus";
import type { HeroSlide } from "../types";

export async function fetchHeroSlides(): Promise<HeroSlide[]> {
  const page = await janus.getPage("home");
  const section = getSection<{ items?: HeroSlide[] }>(getPageContent(page), "hero-carrossel-home");
  return section?.items ?? [];
}
