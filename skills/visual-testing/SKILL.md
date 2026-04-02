---
skill: visual-testing
description: Regressão visual e E2E para fluxos críticos
---

## Rules

- Baselines aprovados pelo time; evitar flakiness (animações, fonts).
- Cenários críticos definidos na SPEC antes de automatizar.
- Bloquear merge em mudanças visuais não intencionais quando o pipeline estiver ativo.

## applies_to

- e2e
- ci

## output

- Testes Playwright (screenshots ou assertions de DOM estáveis)

## validation

- Playwright verde na CI ou processo manual documentado até CI existir
