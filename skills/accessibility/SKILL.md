---
skill: accessibility
description: HTML semântico e uso correto de ARIA
---

## Rules

- Headings em ordem lógica; landmarks quando útil (`main`, `nav`, `footer`).
- Foco visível; interativos acessíveis por teclado.
- ARIA só quando semântica HTML não basta; evitar `aria-*` redundante.
- Imagens: `alt` significativo; decorativas com alt vazio.

## applies_to

- components
- forms
- carousels / dialogs

## output

- Marcação acessível + testes quando possível (RTL ou axe em CI futuro)

## validation

- Smoke manual teclado; critérios na SPEC atendidos
