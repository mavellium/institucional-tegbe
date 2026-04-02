# Fase 2 — Qualidade: Vitest, Testing Library, Prettier, Husky

## Objetivos

- Habilitar **TDD no repositório** com runner e scripts npm.
- Padronizar formatação e hooks locais (Prettier + Husky, conforme decisão do time).
- Primeiro teste **escrito antes** da lógica mínima que o satisfaz (prova de conceito TDD).

## Pré-requisitos

- Fase 1 concluída ou critérios de SPEC acordados.
- Node/npm compatível com Vitest e dependências escolhidas.

## Entregáveis

- `vitest.config.*` + setup Testing Library (jsdom se necessário).
- Scripts: `npm run test`, opcional `test:watch`, `test:coverage`.
- Prettier (`.prettierrc` ou equivalente) e integração com ESLint se desejado.
- Husky + lint-staged (opcional mas recomendado no guia de arquitetura).
- Documentação: comandos neste README da migration e em `package.json`.

## TDD nesta fase

1. Escrever um teste que falha (ex.: utilitário mínimo ou contrato de módulo a criar).
2. Implementar o mínimo para verde.
3. Refatorar.

**Não** adicionar lógica de negócio nova sem teste correspondente após esta fase.

## Critérios de conclusão

- [x] `npm run test` executa com sucesso na CI/local (7/7 testes verdes).
- [x] Pelo menos um teste significativo (não só snapshot vazio) mergeado — `src/hooks/useApi.test.ts` (7 casos de `resolveApiUrl`).
- [x] `npm run lint` e `npm run build` continuam passando — arquivos adicionados pela Fase 2 introduzem zero erros; 252 avisos pré-existentes no codebase (não introduzidos nesta fase).

## Riscos

- Config Vitest + Next.js/App Router: pode exigir `environment` ou mocks; documentar no código ou wiki curta.

## Referências no repositório

- [package.json](../../package.json)
- [eslint.config.mjs](../../eslint.config.mjs) ou config ESLint existente

## Checklist

- [x] Vitest + @testing-library/react instalados e configurados (`vitest.config.ts`, `src/test/setup.ts`).
- [x] Script `test` no package.json (também `test:watch`, `test:coverage`, `format`).
- [x] Prettier aplicável ao `src/` (`.prettierrc`, `.prettierignore`).
- [x] Husky/lint-staged configurados (`.husky/pre-commit` executa `lint-staged` no pre-commit).

## Artefatos entregues

| Arquivo                      | Descrição                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------ |
| `vitest.config.ts`           | Configuração Vitest: jsdom + globals + alias `@`                               |
| `src/test/setup.ts`          | Setup global: `@testing-library/jest-dom`                                      |
| `src/hooks/useApi.test.ts`   | 7 testes de `resolveApiUrl` (prova de conceito TDD)                            |
| `.prettierrc`                | Configuração Prettier (semi, singleQuote, tabWidth, trailingComma, printWidth) |
| `.prettierignore`            | Ignora `node_modules`, `.next`, `out`, `build`, `public`                       |
| `.husky/pre-commit`          | Hook pre-commit: executa `lint-staged`                                         |
| `package.json` (scripts)     | `test`, `test:watch`, `test:coverage`, `format`, `prepare`                     |
| `package.json` (lint-staged) | ESLint + Prettier em `src/**/*.{ts,tsx}`; Prettier em `*.{json,md,yaml,yml}`   |
