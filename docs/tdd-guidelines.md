# Diretrizes TDD — projeto Tegbe

Complementa [architecture-guidelines.md](./architecture-guidelines.md) e o [ROADMAP-PLAN](./migration/ROADMAP-PLAN.md). Para agentes: siga também [rules/tdd-rules.mdc](../rules/tdd-rules.mdc).

## Princípio

O projeto é **orientado a TDD**: para trabalho coberto por SPEC, o fluxo padrão é **teste antes do código** (red → green → refactor).

## Ciclo red-green-refactor

1. **Red:** escrever um teste que descreve o comportamento desejado e **falha** (porque ainda não há implementação ou está incorreta).
2. **Green:** implementar o **mínimo** necessário para o teste passar.
3. **Refactor:** melhorar legibilidade e estrutura **sem** mudar comportamento; testes devem permanecer verdes.

## Integração com SDD

1. A SPEC define contexto, contrato de dados, estados de UI e **critérios de teste** / aceitação.
2. Traduzir critérios em casos de teste **antes** de escrever código de produção.
3. Skills listadas na SPEC (especialmente `testing`) orientam profundidade e tipo de teste — arquivos em `skills/<slug>/SKILL.md`.

## O que testar primeiro (ordem sugerida)

1. **Regras puras** e normalização (funções sem UI): testes unitários rápidos.
2. **Contratos da data layer** (resposta → modelo de UI): unitário ou integração com fetch mockado.
3. **Componentes:** comportamento visível ao usuário (Testing Library: queries acessíveis).
4. **Fluxos críticos:** E2E ou visual (Playwright), conforme Fase 6 do roadmap.

## Mocks

- Prefira mocks **na fronteira** (HTTP, módulos externos), não detalhes internos de implementação.
- Evite mocks desnecessários que acoplem o teste à estrutura interna do componente.

## Estados a cobrir (quando aplicável)

- Loading, sucesso, erro (e vazio), alinhado à skill **testing** e à SPEC.

## Exceções (fora de TDD estrito)

Acordar com o time e registrar quando possível (commit/PR):

- Correções **triviais** sem mudança de comportamento (typo, formatação, rename de símbolo local).
- **Hotfix** emergencial: merge com retrospectiva — SPEC e testes em seguimento imediato.

## Ferramentas-alvo

- **Vitest** + **Testing Library** (unit/integration de componentes e utilitários).
- **Playwright** (E2E e regressão visual), após Fase 6.

Até a Fase 2 concluída, documente critérios de teste na SPEC mesmo sem runner no repo; após Fase 2, testes devem existir no código.

## Checklist rápido antes de abrir PR

- [ ] Existe teste novo ou atualizado para o comportamento alterado?
- [ ] Testes falhavam antes da implementação (evidência de TDD) ou mudança foi classificada como exceção?
- [ ] CI local: `npm run test` (quando disponível) + `npm run lint` + `npm run build` para mudanças relevantes.
