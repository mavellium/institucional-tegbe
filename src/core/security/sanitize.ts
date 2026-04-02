import DOMPurify from "isomorphic-dompurify";

/**
 * Tags e atributos permitidos para rich text do CMS (títulos, badges, subtítulos).
 * Foco: inline formatting — sem blocos estruturais pesados.
 */
const RICH_TEXT_CONFIG = {
  ALLOWED_TAGS: [
    "span",
    "strong",
    "b",
    "em",
    "i",
    "u",
    "br",
    "a",
    "p",
    "small",
    "sub",
    "sup",
    "mark",
  ],
  ALLOWED_ATTR: ["class", "style", "href", "target", "rel", "id"],
  ALLOW_DATA_ATTR: false,
  FORBID_TAGS: ["script", "iframe", "object", "embed", "svg", "math", "style"],
  FORBID_ATTR: [
    "onerror",
    "onclick",
    "onload",
    "onfocus",
    "onblur",
    "onmouseover",
    "onsubmit",
    "onchange",
    "oninput",
  ],
};

/**
 * Tags e atributos permitidos para formulários do CMS (form_html).
 * Mais permissivo: precisa de form, input, button, etc.
 */
const FORM_HTML_CONFIG = {
  ALLOWED_TAGS: [
    // form elements
    "form",
    "input",
    "button",
    "textarea",
    "select",
    "option",
    "optgroup",
    "label",
    "fieldset",
    "legend",
    // inline formatting
    "span",
    "strong",
    "b",
    "em",
    "i",
    "br",
    "a",
    "p",
    "div",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "small",
    "ul",
    "ol",
    "li",
    "img",
  ],
  ALLOWED_ATTR: [
    "class",
    "style",
    "href",
    "target",
    "rel",
    "id",
    "action",
    "method",
    "name",
    "type",
    "value",
    "placeholder",
    "required",
    "disabled",
    "checked",
    "for",
    "min",
    "max",
    "maxlength",
    "pattern",
    "autocomplete",
    "src",
    "alt",
    "width",
    "height",
    "aria-label",
    "aria-describedby",
    "role",
  ],
  ALLOW_DATA_ATTR: true,
  FORBID_TAGS: ["script", "iframe", "object", "embed", "svg", "math"],
};

/**
 * Sanitiza HTML rico do CMS (títulos, badges, subtítulos, detalhes).
 * Remove tags perigosas e atributos on*, preserva inline formatting.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return "";
  return DOMPurify.sanitize(html, RICH_TEXT_CONFIG);
}

/**
 * Sanitiza HTML de formulários do CMS (form_html).
 * Mais permissivo que `sanitizeHtml`: permite form, input, button, etc.
 */
export function sanitizeFormHtml(html: string): string {
  if (!html) return "";
  return DOMPurify.sanitize(html, FORM_HTML_CONFIG);
}

/**
 * Escapa todo HTML de uma string — retorna texto puro.
 * Usar quando o campo não deve conter HTML algum.
 */
export function sanitizeText(text: string): string {
  if (!text) return "";
  return DOMPurify.sanitize(text, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
}
