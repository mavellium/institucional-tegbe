import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CtaDuvidas from "./ctaDuvidas";
import type { CtaDuvidasData } from "./ctaDuvidas";

vi.mock("framer-motion", () => ({
  motion: new Proxy(
    {},
    {
      get:
        (_t, tag) =>
        ({ children, ...props }: any) => {
          const Tag = tag as string;
          return <Tag {...props}>{children}</Tag>;
        },
    }
  ),
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

const makeData = (): CtaDuvidasData => ({
  title: [{ type: "text", value: "Tem dúvidas?" }],
  description: [{ type: "text", value: "Fale com a gente." }],
  button: { label: "Falar agora", link: "https://wa.me/test" },
});

describe("CtaDuvidas", () => {
  // TC: renderiza nada quando data é null
  it("renders nothing when data is null", () => {
    const { container } = render(<CtaDuvidas data={null} />);
    expect(container.firstChild).toBeNull();
  });

  // TC: renderiza botão com link quando data é fornecido
  it("renders CTA link button when data is provided", () => {
    render(<CtaDuvidas data={makeData()} />);
    const link = screen.getByRole("link", { name: /falar agora/i });
    expect(link).toBeTruthy();
    expect(link.getAttribute("href")).toBe("https://wa.me/test");
  });
});
