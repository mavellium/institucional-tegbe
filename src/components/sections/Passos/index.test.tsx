import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Steps from "./index";
import type { ApiResponse } from "./index";

// Mocks pesados
vi.mock("@gsap/react", () => ({ useGSAP: vi.fn() }));
vi.mock("gsap", () => ({
  default: {
    registerPlugin: vi.fn(),
    from: vi.fn(),
    fromTo: vi.fn(),
    timeline: vi.fn(() => ({ to: vi.fn() })),
  },
}));
vi.mock("gsap/ScrollTrigger", () => ({ ScrollTrigger: {} }));
vi.mock("./passosList", () => ({ StepsList: () => <div data-testid="steps-list" /> }));
vi.mock("./passosVisualizador", () => ({
  StepVisualizer: () => <div data-testid="steps-visualizer" />,
}));
vi.mock("./passosCta", () => ({ StepCTA: () => <div data-testid="steps-cta" /> }));

const makeData = (): ApiResponse => ({
  subtype: [{ type: "text", value: "E-commerce" }],
  values: [
    { id: 1, title: "Passo 1", subtitle: "Sub 1", description: "Desc 1", image: "/img1.jpg" },
    { id: 2, title: "Passo 2", subtitle: "Sub 2", description: "Desc 2", image: "/img2.jpg" },
  ],
  button: { action: "link", label: "Ver mais", link: "#" },
});

describe("Steps (Passos)", () => {
  it("renders nothing when data is null", () => {
    const { container } = render(<Steps data={null} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders StepsList and StepVisualizer when data is provided", () => {
    render(<Steps data={makeData()} />);
    expect(screen.getByTestId("steps-list")).toBeTruthy();
    expect(screen.getByTestId("steps-visualizer")).toBeTruthy();
  });

  it("renders CTA when data has button", () => {
    render(<Steps data={makeData()} />);
    expect(screen.getByTestId("steps-cta")).toBeTruthy();
  });
});
