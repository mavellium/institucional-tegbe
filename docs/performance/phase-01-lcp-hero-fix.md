# Fase 1 — LCP: Corrigir Hero Image

## Objetivos

- Eliminar o bloqueio de animação que esconde o elemento LCP (hero image) com `opacity: 0`.
- Garantir que o browser receba `fetchpriority="high"` e `sizes` correto na imagem do primeiro slide.
- Injetar `<link rel="preload" as="image">` server-side para que o download comece durante parsing do HTML.
- **Impacto estimado:** -3 a -5s no LCP.

## Pré-requisitos

- Nenhum. Esta fase pode ser iniciada imediatamente.

## Diagnóstico

O elemento LCP é a imagem do hero carousel (`<Image priority fill>`). Problemas identificados:

1. A imagem está dentro de `motion.div` com `initial={{ opacity: 0, scale: 0.95, x: 20 }}` e `transition.delay: 0.3s` — o browser descobre o conteúdo do pixel tarde.
2. Falta a prop `sizes` no `<Image>` — sem ela, o browser não sabe qual srcset usar e baixa uma versão grande demais.
3. O CSS `drop-shadow-2xl` na Image causa um composite layer extra que atrasa o paint.
4. Não há `<link rel="preload" as="image">` no HTML — a imagem só é descoberta após hydration do React.

## Entregáveis

### 1. Remover animação do slide 0

**Arquivo:** `src/components/ui/heroCarrossel/heroSlideImage.tsx`

Quando `priority={true}` (slide 0):

- Renderizar `<Image>` dentro de um `<div>` simples ao invés de `<motion.div>`
- Sem `initial={{ opacity: 0 }}`, sem `delay`
- Adicionar `sizes="(min-width: 1024px) 60vw, 100vw"`
- Remover `drop-shadow-2xl` do `<Image>` className

Quando `priority={false}` (slides 1+):

- Manter a animação atual com `motion.div`

### 2. Preload da imagem LCP

**Arquivo:** `src/app/page.tsx`

A page já faz `fetchHeroSlides()` server-side. Usar a URL do primeiro slide para injetar preload no `<head>`:

```tsx
// Opção: componente que injeta preload no head
function HeroImagePreload({ imageUrl }: { imageUrl: string }) {
  return <link rel="preload" as="image" href={imageUrl} fetchPriority="high" />;
}
```

Aplicar também em `src/app/ecommerce/page.tsx` (usa o mesmo HeroCarrossel).

## Critérios de conclusão

- [ ] Slide 0 do hero renderiza instantaneamente (sem fade-in de opacity).
- [ ] `<Image>` do slide 0 tem `sizes` e `fetchpriority="high"` no HTML renderizado.
- [ ] Preload link presente no `<head>` do HTML server-rendered.
- [ ] `drop-shadow-2xl` removido da Image (ou movido para wrapper).
- [ ] `npm run build` passa sem erros.
- [ ] `npm run test:e2e` — 20 testes verdes.
- [ ] LCP no Chrome DevTools Performance < 5s em throttle mobile.

## Riscos

- Visual: o slide 0 perde a animação de entrada. Decisão já validada com o time.
- O preload URL depende da resposta do CMS — se o CMS estiver lento, o preload ajuda menos (mas não piora).

## Arquivos afetados

| Arquivo                                              | Mudança                                                      |
| ---------------------------------------------------- | ------------------------------------------------------------ |
| `src/components/ui/heroCarrossel/heroSlideImage.tsx` | Condicional: div simples vs motion.div baseado em `priority` |
| `src/app/page.tsx`                                   | Injetar preload link para hero image                         |
| `src/app/ecommerce/page.tsx`                         | Injetar preload link para hero image                         |

## Checklist

- [x] `heroSlideImage.tsx` — slide 0 sem motion.div (renderiza em `<div>` simples)
- [x] `heroSlideImage.tsx` — `sizes="(min-width: 1024px) 60vw, 100vw"` adicionado ao Image
- [x] `heroSlideImage.tsx` — `drop-shadow-2xl` removido
- [x] `page.tsx` (home) — `<link rel="preload" as="image" fetchPriority="high">` injetado com `heroSlides?.[0]?.image`
- [x] `page.tsx` (ecommerce) — mesmo preload injetado com `heroSlidesData?.[0]?.image`
- [x] Build passa
- [x] E2E passa (20/20)
- [ ] LCP medido antes/depois — pendente (requer deploy + PageSpeed)
