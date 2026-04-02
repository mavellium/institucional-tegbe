import { describe, it, expect } from "vitest";
import { sanitizeHtml, sanitizeFormHtml, sanitizeText } from "./sanitize";

// ─── sanitizeHtml (rich text do CMS: títulos, badges, subtítulos) ───────────

describe("sanitizeHtml", () => {
  it("preserva tags inline permitidas (span, strong, em, br, a)", () => {
    const input = '<span class="text-yellow">Tegbe</span> — <strong>líder</strong>';
    const result = sanitizeHtml(input);
    expect(result).toContain("<span");
    expect(result).toContain("<strong>");
  });

  it("remove tags script", () => {
    const input = '<script>alert("xss")</script><span>ok</span>';
    const result = sanitizeHtml(input);
    expect(result).not.toContain("<script");
    expect(result).toContain("<span>ok</span>");
  });

  it("remove atributos on* (onerror, onclick, etc.)", () => {
    const input = '<span onclick="alert(1)">text</span>';
    const result = sanitizeHtml(input);
    expect(result).not.toContain("onclick");
    expect(result).toContain("text");
  });

  it("remove javascript: em href de links", () => {
    const input = '<a href="javascript:alert(1)">click</a>';
    const result = sanitizeHtml(input);
    expect(result).not.toContain("javascript:");
  });

  it("remove iframes", () => {
    const input = '<iframe src="https://evil.com"></iframe><b>ok</b>';
    const result = sanitizeHtml(input);
    expect(result).not.toContain("<iframe");
    expect(result).toContain("<b>ok</b>");
  });

  it("remove tags style inline maliciosas", () => {
    const input = '<div style="background:url(javascript:alert(1))">hi</div>';
    const result = sanitizeHtml(input);
    expect(result).not.toContain("javascript:");
  });

  it("retorna string vazia para input null/undefined", () => {
    expect(sanitizeHtml(null as unknown as string)).toBe("");
    expect(sanitizeHtml(undefined as unknown as string)).toBe("");
    expect(sanitizeHtml("")).toBe("");
  });

  it("preserva HTML entities", () => {
    const input = "Preço &amp; qualidade";
    const result = sanitizeHtml(input);
    expect(result).toContain("&amp;");
  });

  it("remove tags object e embed", () => {
    const input = '<object data="evil.swf"></object><embed src="evil.swf"><p>ok</p>';
    const result = sanitizeHtml(input);
    expect(result).not.toContain("<object");
    expect(result).not.toContain("<embed");
    expect(result).toContain("<p>ok</p>");
  });

  it("remove SVG com onload", () => {
    const input = '<svg onload="alert(1)"><circle r="10"/></svg>';
    const result = sanitizeHtml(input);
    expect(result).not.toContain("onload");
  });
});

// ─── sanitizeFormHtml (form_html do CMS: formulários embutidos) ─────────────

describe("sanitizeFormHtml", () => {
  it("preserva tags de formulário (form, input, button, textarea, select, label)", () => {
    const input =
      '<form action="https://forms.example.com"><input type="email" name="email"><button type="submit">Enviar</button></form>';
    const result = sanitizeFormHtml(input);
    expect(result).toContain("<form");
    expect(result).toContain("<input");
    expect(result).toContain("<button");
  });

  it("remove script dentro de form_html", () => {
    const input = '<form><script>steal(document.cookie)</script><input type="text"></form>';
    const result = sanitizeFormHtml(input);
    expect(result).not.toContain("<script");
    expect(result).toContain("<input");
  });

  it("remove atributos on* em elementos de formulário", () => {
    const input = '<form onsubmit="evil()"><input onfocus="evil()"></form>';
    const result = sanitizeFormHtml(input);
    expect(result).not.toContain("onsubmit");
    expect(result).not.toContain("onfocus");
  });

  it("preserva atributos de formulário seguros (action, method, name, type, placeholder)", () => {
    const input =
      '<form action="https://api.com/submit" method="post"><input type="text" name="nome" placeholder="Seu nome"></form>';
    const result = sanitizeFormHtml(input);
    expect(result).toContain('action="https://api.com/submit"');
    expect(result).toContain('method="post"');
    expect(result).toContain('placeholder="Seu nome"');
  });
});

// ─── sanitizeText (texto puro, sem HTML nenhum) ────────────────────────────

describe("sanitizeText", () => {
  it("remove todas as tags HTML, mantendo só o texto", () => {
    const input = '<b>bold</b> and <script>alert("xss")</script>';
    const result = sanitizeText(input);
    expect(result).not.toContain("<");
    expect(result).not.toContain(">");
    expect(result).not.toContain("<script");
    expect(result).not.toContain("<b>");
  });

  it("retorna string vazia para input vazio/null", () => {
    expect(sanitizeText("")).toBe("");
    expect(sanitizeText(null as unknown as string)).toBe("");
  });

  it("preserva texto normal sem alteração", () => {
    expect(sanitizeText("Consultoria Tegbe")).toBe("Consultoria Tegbe");
  });
});
