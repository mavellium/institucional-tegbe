# Fase 1 — Governança e SPECs (SDD)

## Objetivos

- Formalizar o fluxo **SPEC → Skills → testes definidos → implementação (TDD)**.
- Definir onde versionar SPECs e convenções de nome.
- Garantir que toda feature relevante tenha template preenchido antes de código.

## Pré-requisitos

- Leitura de [architecture-guidelines.md](../architecture-guidelines.md) (SDD, regra suprema).
- Nenhuma dependência de tooling de teste (Fase 2).

## Entregáveis

- SPECs de exemplo ou piloto em `src/features/<feature>/specs/` **quando** a pasta `features/` existir (até lá: `docs/specs/` ou pasta acordada pelo time).
- Uso obrigatório de [TEMPLATE.spec.yaml](../specs/TEMPLATE.spec.yaml) como ponto de partida.
- Time alinhado: “sem SPEC com critérios de teste → sem implementação”.

## TDD nesta fase

- **Antes do código:** documentar na SPEC os `acceptance_criteria` e `test_cases` (comportamento esperado).
- Ainda **sem** runner: testes são especificados por escrito; execução automatizada começa na Fase 2.

## Critérios de conclusão

- [x] Template de SPEC adotado e referenciado no fluxo de PR/review.
- [x] Documento de governança (este + README) linkado no onboarding.
- [x] Pelo menos uma SPEC de referência preenchida (feature real ou fictícia).

## Riscos

- SPECs “vazias” virarem burocracia — mitigação: checklist mínimo no template.

## Referências no repositório

- [docs/specs/TEMPLATE.spec.yaml](../specs/TEMPLATE.spec.yaml)
- [skills/README.md](../../skills/README.md)
- [rules/architecture-rules.mdc](../../rules/architecture-rules.mdc)

## Checklist

- [x] Convenção de nome de arquivo SPEC (`feature-name.spec.yaml`).
- [x] Revisão de PR verifica presença de SPEC para mudanças de feature.

## SPEC piloto

- [home-hero-carousel.spec.yaml](../specs/home-hero-carousel.spec.yaml) — HeroCarrossel da Home (componente `legacy`, migração server-first planejada para Fases 3-4).
