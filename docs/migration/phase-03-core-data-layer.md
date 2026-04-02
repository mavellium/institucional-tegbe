# Fase 3 — Core e data layer

## Objetivos

- Introduzir `src/core/api`, `src/core/config` (e pastas relacionadas) para **centralizar** acesso ao CMS.
- Definir política de `revalidate`, URLs base e helpers tipo `getSafeData` reutilizáveis.
- **Normalizar** respostas para contratos estáveis consumidos pela UI.

## Pré-requisitos

- Fase 2 concluída (testes rodando).
- Mapeamento dos endpoints atuais: [src/lib/api.ts](../../src/lib/api.ts), usos de `fetch` em [src/app/](../../src/app/).

## Entregáveis

- Módulos em `src/core/` com fetch tipado e tratamento de erro previsível.
- Testes de **contrato/normalização** antes de substituir chamadas nas páginas.
- Migração incremental: páginas passam a usar `core` sem big-bang (por SPEC).

## TDD nesta fase

- Testes unitários para: montagem de URL, parsing, normalização, branches de erro.
- Mock de `fetch` nas bordas; não acoplar a detalhes de páginas.

## Critérios de conclusão

- [x] Pelo menos um fluxo real migrado para `core` com testes — `fetchComponentData` delega para `fetchCms`; 11 novos testes (client + getSafeData).
- [x] Env vars documentadas em `src/core/config/index.ts` (`NEXT_PUBLIC_API_URL`, `REVALIDATE_SECONDS`).
- [x] `fetchComponentData` em `src/lib/api.ts` marcado como `@deprecated` e delegando para `fetchCms` de `@/core/api/client`.

## Riscos

- Duplicação temporária entre `lib/api.ts` e `core/` — manter janela curta e SPEC por migração.

## Referências no repositório

- [src/lib/api.ts](../../src/lib/api.ts)
- [src/hooks/useApi.ts](../../src/hooks/useApi.ts)
- [next.config.ts](../../next.config.ts) (rewrites, imagens)

## Checklist

- [x] Estrutura `src/core/api/`, `src/core/config/` criada.
- [x] Testes para normalização e falhas de rede — `client.test.ts` (9 casos) e `getSafeData.test.ts` (4 casos).
- [x] Plano de substituição de `getSafeData` duplicado nas páginas — `getSafeData` canônico em `@/core/api/getSafeData`; páginas migram por SPEC (Fase 4+).

## Artefatos entregues

| Arquivo                            | Descrição                                                          |
| ---------------------------------- | ------------------------------------------------------------------ |
| `src/core/config/index.ts`         | `API_BASE_URL` (com fallback), `REVALIDATE_SECONDS`                |
| `src/core/api/client.ts`           | `buildUrl` + `fetchCms<T>` — fetch centralizado, nunca lança       |
| `src/core/api/getSafeData.ts`      | Wrapper `getSafeData<T>` — substitui helpers locais nas páginas    |
| `src/core/api/client.test.ts`      | 9 testes TDD: buildUrl (5) + fetchCms (4)                          |
| `src/core/api/getSafeData.test.ts` | 4 testes TDD: success, HTTP error, network error, empty slug       |
| `src/lib/api.ts`                   | `fetchComponentData` marcado `@deprecated`, delega para `fetchCms` |

## Estratégia de substituição do `getSafeData` duplicado

As páginas que têm `getSafeData` local (ex.: `ecommerce/page.tsx`) serão migradas
incrementalmente na Fase 4, conforme SPEC de cada feature. A substituição segue o padrão:

```ts
// Antes (legado — ecommerce/page.tsx)
import { fetchComponentData } from "@/lib/api";
async function getSafeData(slug: string) { ... }

// Depois (core)
import { getSafeData } from "@/core/api/getSafeData";
```
