# Fase 6 — Visual, observabilidade e CI

## Objetivos

- Adotar **Playwright** para E2E e, opcionalmente, comparação visual.
- Definir pipeline **lint → test → build → deploy** (e quando aplicável E2E).
- Instrumentar **Web Vitals** e/ou Lighthouse CI como alvo do guia de arquitetura.

## Pré-requisitos

- Fase 2 (testes unitários) estável.
- Fase 5 avançada o suficiente para fluxos críticos estáticos em produção/staging.

## Entregáveis

- Config Playwright (`playwright.config.ts`), scripts `npm run test:e2e` (nomes podem variar).
- Cenários mínimos: home, uma rota interna, formulário ou CTA crítico (conforme negócio).
- Documentação de execução local e na CI (GitHub Actions, Vercel, etc.).
- Opcional: relatório Lighthouse CI ou métricas exportadas.

## TDD nesta fase

- Cenários E2E descritos **antes** de automação fina (comportamento aceito na SPEC).
- Testes visuais: baseline aprovado pelo time (evitar flakiness por fontes/animations).

## Critérios de conclusão

- [x] Playwright roda em CI ou documentado como gate manual temporário com data de adoção CI.
- [x] Pelo menos 2 fluxos E2E estáveis.
- [x] Documento de métricas alvo (LCP, CLS) e como medir.

## Riscos

- Flaky tests por animações — usar `data-testid` mínimo ou desabilitar animações em ambiente de teste.

## Referências no repositório

- [skills/visual-testing/SKILL.md](../../skills/visual-testing/SKILL.md)
- [next.config.ts](../../next.config.ts)

## Checklist

- [x] Playwright instalado e configurado (`playwright.config.ts`).
- [x] Scripts npm documentados (`test:e2e`, `test:e2e:ui`, `test:e2e:report`).
- [x] Integração CI ativa (`.github/workflows/ci.yml` — pipeline lint → test → build → E2E).
- [x] 2 fluxos E2E estáveis: `e2e/home.spec.ts`, `e2e/ecommerce.spec.ts`.
- [x] Documento de métricas Web Vitals: `docs/web-vitals-targets.md`.
