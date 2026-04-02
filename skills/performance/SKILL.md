---
skill: performance
description: Minimizar custo de JS no client e otimizar carregamento
---

## Rules

- Preferir Server Components; Client apenas para interação inevitável.
- Usar `next/image` com tamanhos e hosts corretos (`remotePatterns`).
- Lazy load de módulos pesados (`dynamic`) quando a SPEC permitir.
- Medir impacto: LCP, TBT, tamanho de bundle após mudanças grandes.

## applies_to

- components
- pages / layouts
- assets

## output

- Código + nota de verificação (local ou CI) quando aplicável

## validation

- Build sem regressão gritante; metas do guia (LCP, CLS) como referência
