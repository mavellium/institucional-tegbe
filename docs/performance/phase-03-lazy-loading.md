# Fase 3 — FCP/JS: Lazy Load de Seções Abaixo do Hero

## Objetivos

- Reduzir o bundle JS inicial carregando seções below-the-fold sob demanda com `next/dynamic`.
- Diminuir o tempo de parse/execute de JavaScript no primeiro carregamento.
- **Impacto estimado:** -1 a -2s no FCP, redução de ~200+ KiB no JS bundle inicial.

## Pré-requisitos

- Recomendado após Fases 1 e 2, mas pode ser feita independentemente.

## Diagnóstico

Todas as seções da Home são importadas estaticamente e renderizadas no primeiro carregamento, mesmo que o usuário só veja o hero no viewport inicial. Isso inclui carrosséis pesados (Embla, Swiper), vídeo, GSAP, e dezenas de componentes que geram JS no bundle.

## Entregáveis

### 1. Home page — lazy load seções

**Arquivo:** `src/app/page.tsx`

Substituir imports estáticos por `next/dynamic` para todas as seções abaixo do HeroCarousel:

```tsx
import dynamic from "next/dynamic";

// Hero e Header permanecem estáticos (above-the-fold)
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import HeroCarousel from "@/features/home-hero-carousel/components/HeroCarrossel";

// Seções below-the-fold — lazy loaded
const MostrarSolucoes = dynamic(() => import("@/components/sections/HomeCards"), { ssr: false });
const Marketplaces = dynamic(() => import("@/components/web/marketplaces"), { ssr: false });
const SectionMarketing = dynamic(() => import("@/components/sections/BannerMarketing"), {
  ssr: false,
});
const SectionFormacoes = dynamic(() => import("@/components/sections/SectionFormacoes"), {
  ssr: false,
});
const Ferramentas = dynamic(() => import("@/components/web/ferramentas"), { ssr: false });
const CtaDuvidas = dynamic(() => import("@/components/web/ctaDuvidas"), { ssr: false });
const FaqHome = dynamic(() => import("@/components/sections/FaqHome"), { ssr: false });
```

**Nota:** `ssr: false` significa que esses componentes não são renderizados no servidor — apenas no client após hydration. Isso é aceitável porque estão below-the-fold e não impactam SEO (conteúdo principal está no hero + metadata).

### 2. Ecommerce page

**Arquivo:** `src/app/ecommerce/page.tsx`

Mesma abordagem: manter Header + HeroCarrossel estáticos, lazy load o resto:

- Logos, CarrosselServicos, VideoAdaptivo, Passos, Clientes, ConsultorOficial, Imagem, Equipe, SideBySideSection

### 3. Marketing page

**Arquivo:** `src/app/marketing/page.tsx`

Lazy load: PorqueATegbe, VideoAdaptivo, MarketingInteligente, SolucoesMarketing, Parceiro, Meta, CarrosselEspecialistas, SideBySideSection

### 4. Formacoes page

**Arquivo:** `src/app/formacoes/page.tsx`

Lazy load tudo abaixo do HomeFormacoes: PorqueAprender, Video, Meta, Formacoes, CasesCarousel, GaleriaFotos, Expertise, LocalizacaoCursos, ComparacaoConcorrentes, Preco, Faq

### 5. Sobre page

**Arquivo:** `src/app/sobre/page.tsx`

Lazy load tudo abaixo do Hero: QuemSomos, OQueSomos, Meta, Carrossel, Localizacao, SideBySideSection

## Considerações importantes

- **Export default obrigatório:** `next/dynamic` funciona com `default export`. Verificar que todos os componentes lazy-loaded exportam default. Se usam named exports (ex: `export { Clientes }`), será necessário um wrapper: `dynamic(() => import("...").then(mod => mod.Clientes))`.
- **Data fetching:** Os `Promise.all` de `getSafeData` continuam rodando server-side normalmente. Os dados são passados como props aos componentes dinâmicos — isso funciona com `next/dynamic`.
- **Scroll rápido:** Pode haver um breve flash antes de uma seção carregar. Para seções com altura fixa conhecida, considerar `loading` skeleton com `min-height`.

## Critérios de conclusão

- [ ] Seções below-the-fold usam `next/dynamic` em todas as 5 pages.
- [ ] Hero + Header carregam estaticamente (above-the-fold intacto).
- [ ] `npm run build` passa — verificar que bundle size do first-load JS diminuiu.
- [ ] `npm run test:e2e` — 20 testes verdes.
- [ ] Visual check: scroll funciona sem glitches perceptíveis.

## Riscos

- **Named exports:** Componentes com named export precisam de `.then(mod => mod.ComponentName)`. Verificar cada um.
- **Data props:** Componentes com `ssr: false` recebem props do server component pai normalmente — sem problemas.
- **SEO below-fold:** Conteúdo dinâmico não será no HTML inicial. Para o Google, isso é aceitável — o conteúdo principal (hero, metadata, schema) já está server-rendered.

## Arquivos afetados

| Arquivo                      | Mudança               |
| ---------------------------- | --------------------- |
| `src/app/page.tsx`           | 7 imports → dynamic   |
| `src/app/ecommerce/page.tsx` | ~10 imports → dynamic |
| `src/app/marketing/page.tsx` | ~8 imports → dynamic  |
| `src/app/formacoes/page.tsx` | ~11 imports → dynamic |
| `src/app/sobre/page.tsx`     | ~6 imports → dynamic  |

## Checklist

- [x] `page.tsx` (home) — 7 seções com `next/dynamic`: MostrarSolucoes, Marketplaces, SectionMarketing, SectionFormacoes, Ferramentas, CtaDuvidas, FaqHome
- [x] `page.tsx` (ecommerce) — 9 seções com `next/dynamic`: Logos, Carrossel, Video, Passos, Clientes, ConsultorOficial, Imagem, Equipe, SideBySideSection
- [x] `page.tsx` (marketing) — 8 seções com `next/dynamic`; adicionado `<main>` (estava faltando)
- [x] `page.tsx` (formacoes) — 11 seções com `next/dynamic`; HomeFormacoes estático (acima do fold)
- [x] `page.tsx` (sobre) — 6 seções com `next/dynamic`; Hero estático
- [x] Named exports tratados com `.then(mod => ({ default: mod.Name }))`: Clientes, Imagem, Equipe, SideBySideSection, QuemSomos, OQueSomos
- [x] `ssr: false` removido (não permitido em Server Components no App Router — `dynamic()` sem opções ainda code-splita)
- [x] Build passa
- [x] E2E passa (20/20)
- [ ] Visual check em mobile — pendente (requer dispositivo real ou emulação)
