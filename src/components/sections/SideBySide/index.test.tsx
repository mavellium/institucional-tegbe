import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SideBySideSection } from "./index";
import type { SideBySideSectionData } from "./index";

vi.mock("next/image", () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));
vi.mock("next/link", () => ({
  default: ({ href, children }: any) => <a href={href}>{children}</a>,
}));
vi.mock("@/components/ui/socialLink", () => ({
  default: ({ href }: { href: string }) => <a href={href}>social</a>,
}));

const makeData = (): SideBySideSectionData => ({
  hero: {
    tag: "Tag hero",
    title: [{ type: "text", value: "Título" }],
    description: [{ type: "text", value: "Descrição" }],
    button: { action: "link", label: "CTA", link: "/cta", target: "_self", variant: "default" },
  },
  social: {
    tag: "Social",
    title: [{ type: "text", value: "Redes" }],
    items: [{ icon: "instagram", link: "https://instagram.com" }],
  },
  imagem: { src: "", alt: "imagem" },
});

describe("SideBySideSection", () => {
  it("renders nothing when data is null", () => {
    const { container } = render(<SideBySideSection data={null} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders hero tag when data is provided", () => {
    render(<SideBySideSection data={makeData()} />);
    expect(screen.getByText("Tag hero")).toBeTruthy();
  });

  it("renders CTA button when data has button with action link", () => {
    render(<SideBySideSection data={makeData()} />);
    expect(screen.getByRole("link", { name: "CTA" })).toBeTruthy();
  });
});
