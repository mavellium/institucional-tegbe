# Fase 5 — Ícones: Bundlar Iconify Above-the-Fold

## Objetivos

- Eliminar chamadas HTTP runtime para `api.iconify.design` nos componentes above-the-fold.
- Pré-bundlar ícones usados no Header, AnnouncementBar e Footer usando pacotes `@iconify/icons-*`.
- **Impacto estimado:** -100 a -300ms no FCP, eliminação de dependência de API externa para render inicial.

## Pré-requisitos

- Preconnect para `api.iconify.design` já adicionado na Fase 2 (mitiga o problema até esta fase ser concluída).

## Diagnóstico

O site usa `@iconify/react` em 51 componentes. Por padrão, `<Icon icon="ph:x-light" />` faz uma chamada HTTP para `api.iconify.design` para buscar o SVG data do ícone em runtime. Nos componentes above-the-fold (Header, AnnouncementBar), isso bloqueia a renderização visual dos ícones.

A solução é importar os ícones como dados estáticos dos pacotes `@iconify/icons-*`, que são bundlados no JS build time — zero HTTP requests.

## Entregáveis

### 1. Instalar pacotes de ícones

```bash
npm install @iconify/icons-ph @iconify/icons-solar @iconify/icons-mdi @iconify/icons-logos
```

Instalar apenas os pacotes dos icon sets usados above-the-fold. Verificar quais sets são usados no Header/Footer com grep antes de instalar.

### 2. Header — bundlar ícones

**Arquivo:** `src/components/layout/Header/index.tsx`

Identificar todos os ícones usados (ex: `"ph:x-light"`, `"ph:list-light"`) e substituir:

Antes:

```tsx
import { Icon } from "@iconify/react";

<Icon icon="ph:x-light" />
<Icon icon="ph:list-light" />
```

Depois:

```tsx
import { Icon } from "@iconify/react";
import phXLight from "@iconify/icons-ph/x-light";
import phListLight from "@iconify/icons-ph/list-light";

<Icon icon={phXLight} />
<Icon icon={phListLight} />
```

### 3. AnnouncementBar — bundlar ícones

**Arquivo:** `src/components/layout/AnnouncementBar.tsx`

Mesma abordagem: identificar ícones e substituir strings por imports estáticos.

### 4. Footer — bundlar ícones

**Arquivo:** `src/components/layout/Footer/index.tsx`

Footer é below-the-fold mas aparece em todas as páginas. Bundlar seus ícones reduz chamadas API em page loads subsequentes.

### 5. Componentes below-the-fold (opcional)

Os 40+ outros componentes podem continuar usando strings (`"icon-name"`) com runtime API. O preconnect da Fase 2 mitiga o custo. Migrar todos de uma vez seria muito trabalho com pouco ganho incremental.

## Critérios de conclusão

- [ ] Pacotes `@iconify/icons-*` necessários instalados.
- [ ] Header usa imports estáticos para todos os ícones.
- [ ] AnnouncementBar usa imports estáticos.
- [ ] Footer usa imports estáticos.
- [ ] `npm run build` passa sem erros.
- [ ] `npm run test:e2e` — 20 testes verdes.
- [ ] No DevTools Network, nenhum request para `api.iconify.design` durante render above-the-fold.

## Riscos

- **Nome dos ícones:** Os nomes dos imports (`@iconify/icons-ph/x-light`) podem diferir do formato string (`"ph:x-light"`). Verificar na [documentação do Iconify](https://icon-sets.iconify.design/).
- **Bundle size:** Cada ícone bundlado adiciona ~200-500 bytes ao JS. Para 10-15 ícones above-the-fold, isso é ~5 KiB — muito menor que uma HTTP request.
- **Tree-shaking:** Importar de `@iconify/icons-ph/x-light` (deep import) garante tree-shaking. Não importar o pacote inteiro.

## Arquivos afetados

| Arquivo                                     | Mudança                                                        |
| ------------------------------------------- | -------------------------------------------------------------- |
| `package.json`                              | Adicionar `@iconify/icons-*` (devDependencies ou dependencies) |
| `src/components/layout/Header/index.tsx`    | Imports estáticos de ícones                                    |
| `src/components/layout/AnnouncementBar.tsx` | Imports estáticos de ícones                                    |
| `src/components/layout/Footer/index.tsx`    | Imports estáticos de ícones                                    |

## Checklist

- [x] Grep ícones usados: Header usa `"ph:x-light"` e `"ph:list-light"`; AnnouncementBar e Footer recebem `icon` como prop dinâmica (não podem ser bundlados)
- [x] Instalado `@iconify/icons-ph` (apenas Phosphor é necessário para o Header)
- [x] Header — `phXLight` e `phListLight` importados estaticamente; `<Icon icon={menuOpen ? phXLight : phListLight}>`
- [ ] AnnouncementBar — ícone vem como prop do CMS, não é possível bundlar sem mudar a API
- [ ] Footer — ícones `mdi:instagram`, `solar:*` etc. são passados como strings via props; deixados para fase futura
- [x] Build passa
- [x] E2E passa (20/20)
- [ ] DevTools confirma ausência de request para `api.iconify.design` no load do Header — pendente (requer browser)

### Observação sobre AnnouncementBar e Footer

Esses componentes recebem `icon` como `string` via props do CMS. Para bundlá-los completamente seria necessário criar um mapa estático de ícones ou mudar a interface da API. Isso é escopo de uma fase futura se necessário.
