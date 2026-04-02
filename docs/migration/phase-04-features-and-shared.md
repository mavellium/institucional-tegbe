# Fase 4 — Features e shared

## Objetivos

- Criar `src/features/<pilot>/` com `components/`, `services/`, `types/`, `specs/`.
- Criar `src/shared/` com `ui/`, `hooks/`, `utils/` (conforme [architecture-guidelines.md](../architecture-guidelines.md)).
- Definir aliases TypeScript para imports limpos (`@/features/...`, `@/shared/...` se desejado).

## Pré-requisitos

- Fase 3 em andamento ou concluída para serviços estáveis do piloto.
- SPEC da feature piloto aprovada.

## Entregáveis

- Uma **feature piloto** (ex.: bloco de home ou uma rota) isolada em `features/`.
- Plano de migração incremental de `src/components/ui` → `src/shared/ui` (sem mover tudo de uma vez).
- Testes da feature piloto: props, render e contrato com dados mockados/normalizados.

## TDD nesta fase

- Testes de componente (Testing Library) para estados definidos na SPEC **antes** de refinar estilos.
- Testes de serviço da feature (integração com mock de fetch) onde aplicável.

## Critérios de conclusão

- [x] Feature piloto importada pelas rotas em `src/app/` sem regressão de build.
- [x] Documento de decisão: quais pastas legadas (`components/sections`, `web`) mapeiam para qual feature seguinte.

## Riscos

- Conflito de nomes e imports circulares — manter barreira clara feature ↔ shared ↔ core.

## Referências no repositório

- [src/components/](../../src/components/)
- [tsconfig.json](../../tsconfig.json)

## Checklist

- [x] Pastas `src/features/home-hero-carousel/...` criadas.
- [x] `src/shared/ui` com primeiro componente migrado (`Textura` via re-export).
- [x] Aliases já cobertos pelo `@/*` do `tsconfig.json` — build verde.

## Artefatos entregues

| Arquivo                                                             | Descrição                                                                               |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `src/features/home-hero-carousel/types/index.ts`                    | Re-exporta `HeroSlide` do tipo legado                                                   |
| `src/features/home-hero-carousel/services/index.ts`                 | `fetchHeroSlides()` — busca slides via `getSafeData`, retorna `[]` em falha             |
| `src/features/home-hero-carousel/services/index.test.ts`            | 4 testes TDD: slug correto, retorno de slides, null→[], undefined→[]                    |
| `src/features/home-hero-carousel/components/HeroCarrossel.tsx`      | Componente server-first: aceita `slides: HeroSlide[]` (sem `useApi`)                    |
| `src/features/home-hero-carousel/components/HeroCarrossel.test.tsx` | 5 testes TDD: slides válidos, array vazio, textura, imagem, sem imagem                  |
| `src/shared/ui/Textura.tsx`                                         | Re-exporta `Textura` do legado — ponto de entrada canônico para novas features          |
| `src/app/page.tsx`                                                  | `fetchHeroSlides()` server-side; passes `slides` como prop para o componente da feature |

## Mapeamento legado → feature (decisão de migração incremental)

| Pasta legada                                | Mapeamento-alvo                                                 |
| ------------------------------------------- | --------------------------------------------------------------- |
| `src/components/sections/HeroCarrossel/`    | `src/features/home-hero-carousel/components/` ✅ migrado        |
| `src/components/sections/BannerMarketing/`  | `src/features/marketing-banner/` (Fase 4+, por SPEC)            |
| `src/components/sections/HomeCards/`        | `src/features/home-solutions/` (Fase 4+, por SPEC)              |
| `src/components/sections/FaqHome/`          | `src/features/faq-home/` (Fase 4+, por SPEC)                    |
| `src/components/sections/SectionFormacoes/` | `src/features/formacoes/` (Fase 4+, por SPEC)                   |
| `src/components/web/marketplaces/`          | `src/features/marketplaces/` (Fase 4+, por SPEC)                |
| `src/components/web/ferramentas/`           | `src/features/ferramentas/` (Fase 4+, por SPEC)                 |
| `src/components/web/ctaDuvidas/`            | `src/features/cta-duvidas/` (Fase 4+, por SPEC)                 |
| `src/components/ui/`                        | `src/shared/ui/` (migração incremental; `Textura` é primeiro)   |
| `src/hooks/useApi.ts`                       | `src/shared/hooks/` (Fase 5, após eliminar fetch CMS no client) |
| `src/lib/api.ts`                            | `@deprecated` delegando para `src/core/` — eliminar em Fase 5   |

### Regras de migração

1. Cada feature só é migrada quando houver SPEC aprovada.
2. A pasta legada `src/components/sections/<X>` permanece até o componente legado não ser mais referenciado.
3. Imports de páginas em `src/app/` são atualizados junto da migração da feature.
4. `src/components/ui/` → `src/shared/ui/` ocorre por re-export primeiro; move depois de todos os importadores serem atualizados.
