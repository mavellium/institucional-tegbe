# Fase 7 — Segurança (core/security)

## Objetivos

- Criar `src/core/security` (ou equivalente) com **sanitização** de HTML rico vindos do CMS.
- **Validar** formato de payloads na borda da data layer (schemas leves ou validação manual tipada).
- Garantir que segredos e dados sensíveis não vazem para o client.

## Pré-requisitos

- Fase 3: ponto único de entrada de dados do CMS identificado.
- Lista de campos HTML/rich text no projeto (ex.: componentes em [src/components/ui/rich](../../src/components/ui/rich)).

## Entregáveis

- Funções de sanitização testadas (TDD: casos com tags permitidas/proibidas).
- Validação de payload para slugs críticos (falha → fallback seguro ou null).
- Documentação de o que o CMS pode enviar e o que o frontend aceita.

## TDD nesta fase

- Testes unitários: strings maliciosas, aninhamento, atributos `on*`, `javascript:` em links, etc.
- Testes de contrato: resposta inválida não derruba a página inteira.

## Critérios de conclusão

- [x] Todo HTML dinâmico do CMS passa por camada aprovada antes de `dangerouslySetInnerHTML` (se inevitável) ou substituir por renderer seguro.
- [x] Checklist de review de segurança em PRs com conteúdo CMS.

## Riscos

- Sanitização agressiva demais quebra layout — alinhar com UI preservation e testes visuais.

## Referências no repositório

- [skills/security/SKILL.md](../../skills/security/SKILL.md)
- Rich text e CMS: `src/components/ui/rich/`
- Documentação de segurança CMS: [docs/cms-security.md](../cms-security.md)

## Checklist

- [x] Módulo `core/security` criado (`src/core/security/sanitize.ts`, `validate.ts`, `index.ts`).
- [x] Testes de sanitização e validação mergeados (39 testes em `sanitize.test.ts` + `validate.test.ts`).
- [x] Revisão de usos de `dangerouslySetInnerHTML` no repo — todos protegidos com `sanitizeHtml` ou `sanitizeFormHtml` (exceto JSON-LD que é seguro por construção).
