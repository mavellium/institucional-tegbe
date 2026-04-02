# Segurança CMS — O que o frontend aceita

Documento de referência para review de PRs que envolvem conteúdo do CMS.
Fase 7 — Segurança (`core/security`).

---

## Princípios

1. **Todo HTML dinâmico do CMS é sanitizado** antes de ser renderizado via `dangerouslySetInnerHTML`.
2. **Segredos nunca vazam para o client** — apenas env vars com `NEXT_PUBLIC_` são acessíveis.
3. **Payloads inválidos retornam null** — a data layer (`fetchCms`, `getSafeData`) nunca lança exceção.

---

## Módulo `src/core/security`

| Função                              | Uso                                       | O que permite                                                                                                                                                                                                               | O que bloqueia                                                                                          |
| ----------------------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `sanitizeHtml(html)`                | Títulos, badges, subtítulos, textos ricos | `span, strong, b, em, i, u, br, a, p, small, sub, sup, mark` + atributos `class, style, href, target, rel, id`                                                                                                              | `script, iframe, object, embed, svg, math, style` (tag) + todos atributos `on*` + `javascript:` em href |
| `sanitizeFormHtml(html)`            | `form_html` de formulários embutidos      | Tudo de `sanitizeHtml` + `form, input, button, textarea, select, option, label, fieldset, legend, div, h1-h6, ul, ol, li, img` + atributos de formulário (`action, method, name, type, value, placeholder, required`, etc.) | `script, iframe, object, embed, svg, math` + todos atributos `on*`                                      |
| `sanitizeText(text)`                | Campos que devem ser texto puro           | Nenhuma tag HTML                                                                                                                                                                                                            | Tudo (remove todas as tags)                                                                             |
| `validatePayload(data, validator?)` | Borda da data layer                       | Objetos e arrays                                                                                                                                                                                                            | `null, undefined, string, number, boolean`                                                              |
| `isNonEmptyString(value)`           | Validação de campos obrigatórios          | Strings com conteúdo (pós-trim)                                                                                                                                                                                             | `null, undefined, ""`, strings só com espaços                                                           |
| `isValidUrl(value)`                 | Validação de URLs do CMS                  | `http:, https:, mailto:, tel:`                                                                                                                                                                                              | `javascript:, data:, vbscript:`, strings inválidas                                                      |

---

## Campos do CMS e tipo de sanitização aplicada

### Rich text (sanitizeHtml)

| Componente            | Campo                            | Exemplo de conteúdo                     |
| --------------------- | -------------------------------- | --------------------------------------- |
| ChamadaAcao           | `data.badge.text`                | `<span class="text-yellow">NOVO</span>` |
| ChamadaAcao           | `data.title`                     | `Sua solução <strong>completa</strong>` |
| ChamadaAcao           | `data.subtitle`                  | Texto com `<br>` e `<span>`             |
| Empresas/header       | `data.title`                     | Título com `<span>` colorido            |
| HeadlineHome          | `content.titulo.tituloPrincipal` | Título principal da home                |
| HeadlineHome          | `content.subtitulo`              | Subtítulo com HTML inline               |
| SociosCrescimento     | `data.header.title`              | Título com `<span>`                     |
| Expertise/AnosMercado | `data.content.details`           | Texto com `<strong>`                    |

### Formulários (sanitizeFormHtml)

| Componente             | Campo                   | Descrição                        |
| ---------------------- | ----------------------- | -------------------------------- |
| ComparacaoConcorrentes | `data.button.form_html` | Formulário embutido (modal)      |
| ComoFazemos            | `data.cta.form_html`    | Formulário CTA (modal)           |
| Expertise              | `button.form_html`      | Formulário por expertise (modal) |
| Preco                  | `activeFormHtml`        | Formulário de plano selecionado  |
| Empresas/modal         | `html` (prop)           | Formulário de empresa (modal)    |
| LocalizacaoCursos      | `data.button.form_html` | Formulário de curso (modal)      |

### JSON-LD (não sanitizado — seguro por construção)

| Componente       | Campo                    | Motivo                                 |
| ---------------- | ------------------------ | -------------------------------------- |
| layout.tsx       | `JSON.stringify(jsonLd)` | Gerado no servidor com dados estáticos |
| Schema/index.tsx | `JSON.stringify(data)`   | Gerado no servidor com dados estáticos |

---

## Checklist de review para PRs com conteúdo CMS

- [ ] Novo uso de `dangerouslySetInnerHTML` está protegido com `sanitizeHtml` ou `sanitizeFormHtml`?
- [ ] Campos de URL do CMS validados com `isValidUrl` se usados em `href` ou `src`?
- [ ] Payload do CMS validado na borda (via `getSafeData` / `validatePayload`)?
- [ ] Nenhum segredo (API key, token) exposto em variável sem prefixo `NEXT_PUBLIC_`?
- [ ] Componente RichText/RichContent usado em vez de `dangerouslySetInnerHTML` quando possível?

---

## Bibliotecas

- **isomorphic-dompurify** (wrapper isomórfico do DOMPurify) — sanitização HTML, funciona em SSR e client.
