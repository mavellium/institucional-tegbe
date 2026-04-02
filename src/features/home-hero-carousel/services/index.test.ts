import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchHeroSlides } from "./index";

vi.mock("@/core/api/getSafeData", () => ({
  getSafeData: vi.fn(),
}));

import { getSafeData } from "@/core/api/getSafeData";

describe("fetchHeroSlides", () => {
  beforeEach(() => vi.resetAllMocks());

  it("calls getSafeData with the correct slug", async () => {
    vi.mocked(getSafeData).mockResolvedValue([]);
    await fetchHeroSlides();
    expect(getSafeData).toHaveBeenCalledWith("hero-carrossel-home");
  });

  it("returns the slides array returned by getSafeData", async () => {
    const slides = [
      { id: 1, title: "Slide 1" },
      { id: 2, title: "Slide 2" },
    ];
    vi.mocked(getSafeData).mockResolvedValue(slides);
    const result = await fetchHeroSlides();
    expect(result).toEqual(slides);
  });

  it("returns empty array when getSafeData returns null (fetch error)", async () => {
    vi.mocked(getSafeData).mockResolvedValue(null);
    const result = await fetchHeroSlides();
    expect(result).toEqual([]);
  });

  it("returns empty array when getSafeData returns undefined", async () => {
    vi.mocked(getSafeData).mockResolvedValue(undefined as any);
    const result = await fetchHeroSlides();
    expect(result).toEqual([]);
  });
});
