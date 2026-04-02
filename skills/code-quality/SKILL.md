---
skill: code-quality
description: TypeScript rigoroso e componentes coesos
---

## Rules

- Tipagem explícita nas fronteiras (props, retornos de serviço).
- Componentes pequenos; extrair quando arquivo crescer demais.
- Evitar duplicação: preferir shared/feature antes de copiar.
- `npm run lint` sem novos erros.

## applies_to

- components
- hooks
- utils

## output

- Código limpo + testes quando comportamento muda

## validation

- ESLint; build TypeScript sem erros
