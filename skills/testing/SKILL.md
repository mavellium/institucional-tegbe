---
skill: testing
description: Garantir cobertura de testes alinhada à SPEC, com TDD
---

## Rules

- Ordem **TDD**: critérios e `test_cases` na SPEC → escrever testes que falham → implementar → refatorar.
- Cobrir, quando aplicável: loading, sucesso, erro e estado vazio.
- Evitar mocks desnecessários; mockar fronteiras (HTTP, tempo, storage).
- Componentes: priorizar queries acessíveis (Testing Library).

## applies_to

- components
- hooks
- services / data layer

## output

- Código de teste + código de produção mínimo para verde

## validation

- `npm run test` passa; novos comportamentos têm asserções explícitas

## Ferramentas-alvo

- Vitest, Testing Library, Playwright (E2E/visual conforme fase)
