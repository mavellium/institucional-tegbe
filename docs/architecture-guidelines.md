# Diretrizes de arquitetura — site institucional Tegbe

Este documento define a **arquitetura-alvo**, a **governança de desenvolvimento** (SDD + Skills + TDD) e o **fluxo de dados** com o CMS. Serve de base para planejar refatorações e novas features.

Complementa `CLAUDE.md` na raiz. Para o que já existe hoje no disco (pastas legadas, `useApi`, ausência de testes), ver [Apêndice: estado atual vs alvo](#apêndice-estado-atual-do-repositório-vs-arquitetura-alvo).

---

## Visão geral

O projeto é um **frontend Next.js** integrado a um **CMS proprietário** via API externa.

A arquitetura existe para garantir:

- **Performance** de alto nível (Core Web Vitals otimizados)
- **Desacoplamento** total entre frontend e CMS
- **Escalabilidade** por feature
- **Padronização** estrutural e visual
- **Preservação** da identidade visual existente
- **Desenvolvimento** orientado por especificação (**SDD**) e testes (**TDD**)
- **Execução** automatizada via agentes de IA

---

## Preservação de UI com correção estrutural

O design atual é a **referência visual oficial**, mas não é dogma: preservamos a **intenção visual** e corrigimos **falhas estruturais**.

### Classificação de componentes

Antes de qualquer intervenção, classificar o componente:

| Estado           | Ação                         |
| ---------------- | ---------------------------- |
| **Stable**       | Preservar                    |
| **Inconsistent** | Padronizar entre seções      |
| **Broken**       | Corrigir (pode reestruturar) |
| **Legacy**       | Refatorar com cautela        |

### Regras

- Manter a intenção visual original
- Corrigir falhas de responsividade
- Eliminar inconsistências entre seções
- Melhorar acessibilidade quando necessário

### Restrições

- Não redesenhar sem justificativa clara
- Não alterar hierarquia de conteúdo sem necessidade
- Não modificar identidade visual (cores, tom, marca)

### Validação

- Testes de regressão visual
- Validação cross-device
- Comparação antes/depois

---

## SDD — Spec Driven Development

Todo desenvolvimento parte de uma **SPEC** estruturada. **Nenhum código** é criado sem:

- Contexto definido
- Regras explícitas
- Contrato de dados
- Estados de UI
- Critérios de teste
- Skills associadas
- **UI Contract** definido

### Estrutura obrigatória da SPEC (modelo)

```yaml
feature: nome_da_feature

ui_contract:
  type: strict
  reference: current_layout

component_state: stable | inconsistent | broken | legacy

skills:
  - performance
  - data-fetching
  - responsiveness
  - testing
  # demais conforme necessidade (ver Skills do projeto)
```

Exemplo de amarração feature ↔ skills:

```yaml
feature: Home Hero

skills:
  - performance
  - data-fetching
  - responsiveness
  - testing
  - ui-preservation
```

---

## Skills (camada de execução)

Skills são **capacidades reutilizáveis** que agentes e humanos aplicam de forma consistente. Cada skill define regras, boas práticas, estratégias técnicas e critérios de validação.

### Estrutura de uma skill (modelo)

```yaml
skill: nome

description: descrição

rules:
  - regra 1
  - regra 2

applies_to:
  - components
  - hooks
  - services

output:
  - código
  - testes
```

### Skills do projeto

Arquivos executáveis: cada skill em `skills/<slug>/SKILL.md` na raiz do repositório (índice: [skills/README.md](../skills/README.md)).

1. **Testing** — Todo componente relevante deve ter testes; cobrir loading, success e error; evitar mocks desnecessários. Ferramentas-alvo: Vitest, Testing Library, Playwright.

2. **Performance** — Minimizar JS no client; priorizar Server Components; otimizar imagens. Checagens: LCP, TBT, tamanho de bundle.

3. **Data fetching** — Fetch **centralizado** na camada de dados; cache com `revalidate`; normalização e tratamento de erros. **Alvo**: a UI não acessa a API do CMS diretamente — apenas consome dados já obtidos/transformados no servidor (ou via serviços dedicados). Padrões-alvo: service layer, normalização.

4. **Responsiveness** — Mobile-first; breakpoints padronizados; componentes adaptáveis.

5. **Accessibility** — HTML semântico; navegação por teclado; ARIA quando necessário.

6. **Security** — Sanitizar HTML vindos do CMS; não expor dados sensíveis; validar payloads.

7. **Code quality** — Tipagem forte; componentes pequenos e coesos; evitar duplicação desnecessária.

8. **UI preservation** — Preservar intenção visual; corrigir quebras e responsividade; padronizar inconsistências. **Não** redesenhar; **não** alterar estrutura sem necessidade. **Exceção**: componentes **broken** podem ser reestruturados.

9. **Visual testing** — Snapshot/comparação visual quando aplicável; bloquear mudanças não intencionais. Ferramenta-alvo: Playwright (ou stack equivalente aprovada pelo time).

---

## Relação SPEC ↔ Skills e execução por agentes

Fluxo obrigatório:

**SPEC → Skills → testes (TDD, antes do código) → Agente → implementação → refatoração**

Regras:

1. O agente (ou desenvolvedor) lê a SPEC.
2. Identifica as skills listadas.
3. Aplica as regras dessas skills.
4. Gera testes primeiro (TDD), depois código e refatoração, alinhados aos critérios da SPEC.

---

## TDD — Test Driven Development

- Testes são **derivados da SPEC**.
- Código é escrito para **satisfazer os testes**.
- **Nenhuma** implementação relevante sem critério de validação acordado.

**Fluxo operacional (teste antes do código):** para trabalho coberto por SPEC, seguir red → green → refactor: escrever ou ajustar testes **antes** da implementação de produção (exceto exceções triviais acordadas). Detalhes e exceções: [tdd-guidelines.md](./tdd-guidelines.md). Regras para agentes: [rules/tdd-rules.mdc](../rules/tdd-rules.mdc).

Tipos de teste (conforme aplicável à feature):

- Unitário
- Integração
- E2E
- Visual
- Performance

---

## Regra suprema

**Sem SPEC → sem SKILL (aplicável) → sem TESTE → sem CÓDIGO.**

(Exceções mínimas: correções triviais acordadas com o time, hotfix com retrospectiva de SPEC.)

---

## Princípios da arquitetura

### Server-first

Por padrão, o máximo possível roda no **servidor** (RSC, dados, transformação).

### Desacoplamento do CMS

A **UI** não conhece URLs nem contratos brutos do CMS: apenas tipos e dados já normalizados pela **data layer**.

### Separação de responsabilidades

| Camada | Função                               |
| ------ | ------------------------------------ |
| UI     | Renderização                         |
| Data   | Fetch, cache, normalização, erros    |
| Core   | Infra, config, segurança transversal |

### Arquitetura por feature

Features **isoladas** e escaláveis (componentes, serviços, tipos e specs por domínio).

---

## Stack tecnológica (alvo)

| Área        | Escolha-alvo                                     |
| ----------- | ------------------------------------------------ |
| Core        | Next.js (App Router), React, TypeScript (strict) |
| Estilização | Tailwind CSS, design tokens                      |
| Data        | Fetch centralizado, cache/`revalidate`, services |
| Performance | `next/image`, `dynamic`, Suspense                |
| Testes      | Vitest, Testing Library, Playwright              |
| Qualidade   | ESLint, Prettier, Husky (git hooks)              |

O repositório pode ainda não incluir todas as ferramentas da tabela; a adoção é **incremental** conforme roadmap.

---

## Estrutura de pastas (alvo)

```
src/
  app/                    # rotas App Router

  features/               # uma pasta por feature/domínio
    <feature>/
      components/
      services/           # chamadas CMS, normalização
      types/
      specs/              # SPECs em YAML/Markdown

  shared/
    ui/                   # design system / primitives
    hooks/
    utils/
    skills/               # opcional: artefatos extras (skills de projeto ficam na raiz /skills)

  core/
    api/                  # client HTTP, config de base URL
    config/
    security/             # sanitização, validação de payload
```

Mapeamento conceitual durante a migração:

- `shared/ui` absorve o papel de gran parte de `components/ui` atual.
- `features/*` concentra o que hoje está espalhado em `components/sections`, `components/web` e parte de `layout` específica de feature.

---

## Fluxo de dados

```
CMS
  ↓
Data layer (fetch, cache, normalização, erros)
  ↓
Server Component (tipado)
  ↓
UI
```

### Data layer (responsabilidades)

- Centralizar fetch ao CMS
- Aplicar política de cache (`revalidate`, etc.)
- Normalizar dados para contratos estáveis da UI
- Tratar erros de forma previsível (fallback, null-safe)

### Renderização

- **Server Components** — padrão.
- **Client Components** — apenas onde há interação, estado local do browser ou APIs do client inevitáveis.
- **ISR / revalidate** — alinhado ao ciclo de publicação do CMS.

---

## Integração CMS (referência técnica)

Até a migração completa para services em `core/` e `features/*/services`, o repositório pode continuar usando:

- `NEXT_PUBLIC_API_URL` — prefixo da API institucional, **sem** barra final.
- `next.config.ts` — rewrite `/api-tegbe/:path*` → API do dashboard (mitigação de CORS).
- Hosts de imagem em `images.remotePatterns` (Vercel Blob, Bunny CDN, etc.).

A **direção** é: novas features passam pela data layer; código legado que usa `useApi` ou `fetch` espalhado deve ser migrado conforme SPEC.

---

## Performance (metas)

- **LCP** menor que 2,5 s (alvo)
- **CLS** menor que 0,1
- **TBT** baixo
- **Fetch inicial de dados do CMS no client** — zero no estado-alvo (hoje ainda há exceções; ver apêndice)

Instrumentação-alvo: Web Vitals, Lighthouse CI (quando o pipeline estiver configurado).

---

## Responsividade e design system

- Mobile-first; breakpoints padronizados no Tailwind/tokens.
- Tokens e componentes base compartilhados em `shared/ui`.
- Correção de inconsistências entre seções sem redesenho.

---

## Segurança

- Sanitizar HTML rico vindo do CMS antes de renderizar.
- Não expor segredos ou dados sensíveis no client.
- Validar formato dos payloads na borda da data layer.

---

## SEO

- Manter JSON-LD via componente de schema (hoje em `src/components/layout/Schema`) nas páginas que exigem rich results.
- Não degradar hierarquia de headings nem conteúdo semestral por mudanças de layout.

---

## Deploy e governança (alvo)

- Pipeline: **lint → test → build → deploy**
- Hospedagem: Vercel (Edge quando aplicável)
- Code review obrigatório; controle de regressão visual nas mudanças de UI

---

## Comandos atuais do repositório

```bash
npm run dev    # desenvolvimento
npm run build  # build de produção
npm run start  # servir build
npm run lint   # ESLint
```

Conforme o tooling de testes for adicionado, este bloco deve incluir `npm run test`, `test:e2e`, etc.

---

## Roadmap de migração

Planejamento incremental da arquitetura-alvo (fases, TDD, dependências):

- **Plano mestre:** [migration/ROADMAP-PLAN.md](./migration/ROADMAP-PLAN.md)
- **Índice e status das fases:** [migration/README.md](./migration/README.md)
- **Skills (`SKILL.md` por pasta):** [skills/README.md](../skills/README.md)
- **Template de SPEC:** [specs/TEMPLATE.spec.yaml](./specs/TEMPLATE.spec.yaml)

| Fase | Documento                                                                              |
| ---- | -------------------------------------------------------------------------------------- |
| 1    | [phase-01-governance-and-specs.md](./migration/phase-01-governance-and-specs.md)       |
| 2    | [phase-02-quality-tooling.md](./migration/phase-02-quality-tooling.md)                 |
| 3    | [phase-03-core-data-layer.md](./migration/phase-03-core-data-layer.md)                 |
| 4    | [phase-04-features-and-shared.md](./migration/phase-04-features-and-shared.md)         |
| 5    | [phase-05-remove-client-cms-fetch.md](./migration/phase-05-remove-client-cms-fetch.md) |
| 6    | [phase-06-visual-observability-ci.md](./migration/phase-06-visual-observability-ci.md) |
| 7    | [phase-07-security.md](./migration/phase-07-security.md)                               |

Detalhes operacionais ficam nos docs de fase e no plano mestre; este guia permanece a visão arquitetural consolidada.

---

## Manutenção deste documento

Atualize este arquivo quando:

- Mudar a estrutura de pastas-alvo ou o fluxo SPEC/Skills/TDD.
- Adotar novas ferramentas (Vitest, Playwright, Husky).
- Alterar política de dados (ex.: eliminar último fetch de CMS no client).

---

## Apêndice: estado atual do repositório vs arquitetura alvo

Use esta seção para **planejar** migrações; ela descreve o código como está **agora**, não o ideal.

| Aspecto                      | Estado atual (resumo)                                                                                                                                                          | Direção                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| Pastas                       | `src/app/`, `src/components/{layout,sections,web,ui}/`, `src/components/Section/` (legado), `src/hooks/`, `src/lib/`, `src/interface/`, `src/types/`, `src/json/`, `src/mock/` | Evoluir para `features/`, `shared/`, `core/` conforme SPECs                                |
| Dados CMS                    | `fetchComponentData` em `src/lib/api.ts`; `getSafeData` local em páginas; **também** `useApi` + `resolveApiUrl` em vários client components                                    | Centralizar na data layer; reduzir/eliminar fetch de CMS no client para conteúdo de página |
| Testes                       | Não configurados no `package.json`                                                                                                                                             | Introduzir Vitest / Testing Library / Playwright + pipeline                                |
| Prettier / Husky             | Não documentados como padrão no repo                                                                                                                                           | Adicionar conforme governança                                                              |
| SPECs em `features/*/specs/` | Ainda não existem como artefato versionado                                                                                                                                     | Criar por feature quando iniciar SDD formal                                                |

Rotas atuais em `src/app/`: `/`, `/ecommerce`, `/marketing`, `/formacoes`, `/sobre`, `/dev`.

---

## Diretriz final

O sistema opera em três camadas obrigatórias (no processo-alvo):

1. **SDD (Spec-first)** — define _o quê_ será feito.
2. **Skills** — define _como_ será feito.
3. **TDD** — garante que _funciona_ e permanece correto.
