import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import HeroCarrossel from "./HeroCarrossel";
import type { HeroSlide } from "../types";

// --- mocks de dependências pesadas ---

vi.mock("embla-carousel-react", () => ({
  default: () => [
    vi.fn(),
    {
      selectedScrollSnap: () => 0,
      on: vi.fn(),
      scrollPrev: vi.fn(),
      scrollNext: vi.fn(),
      scrollTo: vi.fn(),
    },
  ],
}));

vi.mock("embla-carousel-autoplay", () => ({ default: vi.fn(() => ({})) }));

vi.mock("@/components/ui/heroCarrossel/heroSlideContent", () => ({
  default: ({ slide }: { slide: HeroSlide }) => (
    <div data-testid="slide-content">{slide.title ?? "sem título"}</div>
  ),
}));

vi.mock("@/components/ui/heroCarrossel/heroSlideImage", () => ({
  default: ({ image }: { image: string }) => <div data-testid="slide-image">{image}</div>,
}));

vi.mock("@/components/ui/heroCarrossel/heroCarrosselNavigation", () => ({
  default: ({ scrollPrev, scrollNext }: { scrollPrev: () => void; scrollNext: () => void }) => (
    <nav>
      <button onClick={scrollPrev}>prev</button>
      <button onClick={scrollNext}>next</button>
    </nav>
  ),
}));

vi.mock("@/shared/ui/Textura", () => ({
  default: () => <div data-testid="textura" />,
}));

// ---

const makeSlides = (n: number): HeroSlide[] =>
  Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    title: `Slide ${i + 1}`,
    ctaText: `CTA ${i + 1}`,
    ctaLink: `https://example.com/${i + 1}`,
    image: `https://example.com/img${i + 1}.jpg`,
  }));

describe("HeroCarrossel (feature)", () => {
  beforeEach(() => vi.clearAllMocks());

  // TC-01 — Renderiza slides com dados válidos
  it("renders all slide contents when given a valid slides array", () => {
    render(<HeroCarrossel slides={makeSlides(3)} />);
    expect(screen.getAllByTestId("slide-content")).toHaveLength(3);
    expect(screen.getByText("Slide 1")).toBeTruthy();
    expect(screen.getByText("Slide 2")).toBeTruthy();
    expect(screen.getByText("Slide 3")).toBeTruthy();
  });

  // TC-04 — Array vazio: não lança e exibe mensagem de fallback
  it("renders fallback message when slides array is empty", () => {
    render(<HeroCarrossel slides={[]} />);
    expect(screen.queryAllByTestId("slide-content")).toHaveLength(0);
    expect(screen.getByText(/nenhum slide/i)).toBeTruthy();
  });

  // Textura deve ser renderizada
  it("renders the Textura overlay", () => {
    render(<HeroCarrossel slides={makeSlides(1)} />);
    expect(screen.getByTestId("textura")).toBeTruthy();
  });

  // TC-07 — CTA: slide com imagem renderiza heroSlideImage
  it("renders slide image when slide has image prop", () => {
    render(<HeroCarrossel slides={makeSlides(1)} />);
    expect(screen.getByTestId("slide-image")).toBeTruthy();
  });

  // Slide sem imagem não renderiza heroSlideImage
  it("does not render slide image when slide has no image", () => {
    const slides: HeroSlide[] = [{ id: 1, title: "Sem imagem" }];
    render(<HeroCarrossel slides={slides} />);
    expect(screen.queryByTestId("slide-image")).toBeNull();
  });
});
