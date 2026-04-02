# Fase 5 — Remover fetch de CMS no client (useApi)

## Objetivos

- Eliminar uso de [`useApi`](../../src/hooks/useApi.ts) para **conteúdo de página** vindo do CMS.
- Padrão alvo: **Server Component** busca dados (via `core`/services) e passa **props** para UI.
- Manter Client Components apenas para interação, sem carregar slug do CMS no `useEffect` inicial.

## Pré-requisitos

- Fase 4: feature piloto prova o padrão props server → UI.
- Inventário de consumidores de `useApi` (grep em `src/`).

## Entregáveis

- Lista de arquivos migrados e ordem sugerida (por rota ou por SPEC).
- Para cada migração: testes que descrevem dados esperados na UI **antes** de remover `useApi`.
- Deprecação documentada em `useApi` (comentário + link para este doc) até remoção final.

## TDD nesta fase

- Testes de integração leve ou RTL: “dado props X, UI mostra Y”.
- Regressão: estados loading/error se ainda existirem no client apenas para hidratação — preferir eliminar loading de dados CMS no client.

## Critérios de conclusão

- [ ] Zero usos de `useApi` para slugs institucionais de conteúdo (ou exceções explícitas documentadas na SPEC).
- [ ] Metas de performance do guia: reduzir fetch inicial no client.

## Riscos

- Componentes que precisam de atualização em tempo real do CMS — se existirem, tratar como exceção com SPEC dedicada.

## Referências no repositório

- [src/hooks/useApi.ts](../../src/hooks/useApi.ts)
- Páginas em [src/app/](../../src/app/)

## Checklist

- [x] Inventário `useApi` concluído — 38 consumidores identificados.
- [x] Cada consumidor migrado: `data: T | null` prop, `useApi` removido.
- [x] 5 páginas atualizadas com `Promise.all` + `getSafeData` server-side.
- [x] `useApi` marcado como `@deprecated` em `src/hooks/useApi.ts`.
- [x] Dead code migrado: `HeroCarrossel/index.tsx`, `web/solucoes.tsx`.
- [x] Build limpo — zero erros de TypeScript.
- [x] `resolveApiUrl` mantido no hook (sem novos consumidores diretos).

## Componentes migrados (38)

`BannerMarketing`, `CarrosselCases`, `CarrosselEspecialistas`, `CarrosselServicos`,
`Clientes`, `ComparacaoConcorrentes`, `Equipe`, `Expertise`, `Faq`, `FaqHome`,
`GaleriaFotos`, `Hero`, `HomeCards`, `HomeFormacoes`, `Imagem`, `ListaFormacoes`,
`LocalizacaoCursos`, `LocalizacaoSobre`, `Logos`, `MarketingInteligente`, `Meta`,
`OQueSomos`, `Parceiro`, `Passos`, `PorqueATegbe`, `PorqueAprender`, `Preco`,
`QuemSomos`, `SectionFormacoes`, `ServiceFlow/CertifiedSection`, `SideBySide`,
`SolucoesMarketing`, `VideoAdaptivo`, `ctaDuvidas`, `ferramentas`, `marketplaces`,
`HeroCarrossel` (dead code), `web/solucoes` (dead code).

## Páginas atualizadas

- `src/app/page.tsx` — Home (8 slugs)
- `src/app/ecommerce/page.tsx` — Ecommerce (11 slugs)
- `src/app/marketing/page.tsx` — Marketing (9 slugs)
- `src/app/sobre/page.tsx` — Sobre (7 slugs)
- `src/app/formacoes/page.tsx` — Formações (12 slugs)
