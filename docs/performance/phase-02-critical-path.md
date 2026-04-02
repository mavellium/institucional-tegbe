# Fase 2 — FCP: Preconnect, Fonts e GTM

## Objetivos

- Adicionar preconnect/dns-prefetch para origens externas críticas.
- Remover fontes Geist (Google Fonts) não utilizadas do critical path.
- Mover GTM para `lazyOnload` para liberar CPU/banda durante o carregamento inicial.
- **Impacto estimado:** -400ms a -1s no FCP.

## Pré-requisitos

- Nenhum. Pode ser executada em paralelo com a Fase 1.

## Diagnóstico

1. **Sem preconnect:** O browser resolve DNS e estabelece conexão com CDNs e APIs apenas quando encontra o primeiro recurso deles — tarde demais. PageSpeed estima economia de 330ms (Iconify) e 300ms (dashboard API).
2. **Geist fonts não usadas:** `layout.tsx` importa `Geist` e `Geist_Mono` de `next/font/google`, gerando preload + CSS no critical path. O site usa Satoshi em tudo — as variáveis CSS `--font-geist-sans` e `--font-geist-mono` nunca são referenciadas.
3. **GTM `afterInteractive`:** GTM + Clarity + gtag (~292 KiB JS) carregam logo após hydration, competindo com recursos visuais.

## Entregáveis

### 1. Preconnect hints

**Arquivo:** `src/app/preload-resources.tsx`

Adicionar antes dos font preloads:

```tsx
{/* Preconnect a origens externas */}
<link rel="preconnect" href="https://tegbe-cdn.b-cdn.net" />
<link rel="preconnect" href="https://api.iconify.design" crossOrigin="anonymous" />
<link rel="dns-prefetch" href="https://tegbe-dashboard.vercel.app" />
```

### 2. Remover Geist fonts

**Arquivo:** `src/app/layout.tsx`

- Remover `import { Geist, Geist_Mono } from "next/font/google"`
- Remover `const geistSans = Geist({...})` e `const geistMono = Geist_Mono({...})`
- No `<body>` className, remover `${geistSans.variable} ${geistMono.variable}`
- Manter: `antialiased bg-black text-white selection:bg-[#FFCC00] selection:text-black`

### 3. GTM para lazyOnload

**Arquivo:** `src/app/layout.tsx` (linha 162)

Mudar:

```tsx
<Script id="gtm-script" strategy="afterInteractive">
```

Para:

```tsx
<Script id="gtm-script" strategy="lazyOnload">
```

## Critérios de conclusão

- [ ] Preconnect tags presentes no HTML renderizado (`<link rel="preconnect" href="https://tegbe-cdn.b-cdn.net">`).
- [ ] Nenhuma referência a Geist/Geist_Mono no `layout.tsx`.
- [ ] Nenhum preload de Geist fonts no HTML renderizado.
- [ ] GTM com `strategy="lazyOnload"` no source.
- [ ] `npm run build` passa sem erros.
- [ ] `npm run test:e2e` — 20 testes verdes.
- [ ] Fontes Satoshi continuam carregando normalmente.

## Riscos

- **GTM lazyOnload:** Eventos dos primeiros ~2-3s não são trackeados. Aceitável para analytics gerais.
- **Remover Geist:** Se algum componente usar `font-family: var(--font-geist-sans)`, vai fallback para system font. Verificar grep antes de remover.

## Arquivos afetados

| Arquivo                         | Mudança                                |
| ------------------------------- | -------------------------------------- |
| `src/app/preload-resources.tsx` | Adicionar preconnect/dns-prefetch      |
| `src/app/layout.tsx`            | Remover Geist imports + GTM lazyOnload |

## Checklist

- [x] `preload-resources.tsx` — preconnect `tegbe-cdn.b-cdn.net`
- [x] `preload-resources.tsx` — preconnect `api.iconify.design` (crossOrigin="anonymous")
- [x] `preload-resources.tsx` — dns-prefetch `tegbe-dashboard.vercel.app`
- [x] `layout.tsx` — imports `Geist` e `Geist_Mono` removidos
- [x] `layout.tsx` — body className sem `${geistSans.variable} ${geistMono.variable}`
- [x] `layout.tsx` — GTM `strategy="lazyOnload"`
- [x] Grep confirma zero uso de `--font-geist` no codebase (só estava em layout.tsx)
- [x] Build passa
- [x] E2E passa (20/20)
