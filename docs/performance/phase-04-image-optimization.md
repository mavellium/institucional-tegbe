# Fase 4 — Imagens: Next.js Image + AVIF

## Objetivos

- Substituir tags `<img>` raw por `<Image>` do Next.js nos componentes que servem imagens do CDN.
- Habilitar formato AVIF no `next.config.ts` para redução de ~30% no tamanho das imagens.
- Configurar `qualities` para eliminar warning do PageSpeed.
- **Impacto estimado:** -3 a -4 MiB de bandwidth total, LCP indireto (menos competição de banda).

## Pré-requisitos

- Nenhum. Pode ser executada em paralelo com Fase 5.

## Diagnóstico

O PageSpeed identifica 5.414 KiB de imagens do `tegbe-cdn.b-cdn.net` que:

- São servidas como PNG (sem conversão para WebP/AVIF)
- São 1116x1485px mas exibidas em 691x845 (oversized)
- Usam tag `<img>` raw ao invés de Next.js `<Image>` — sem otimização automática

O CDN `tegbe-cdn.b-cdn.net` já está nos `remotePatterns` do `next.config.ts`, então `<Image>` funcionará imediatamente.

## Entregáveis

### 1. Habilitar AVIF + quality no next.config

**Arquivo:** `next.config.ts`

Adicionar ao bloco `images`:

```ts
images: {
  formats: ['image/avif', 'image/webp'],
  qualities: [75, 90],
  remotePatterns: [
    // ... patterns existentes
  ],
},
```

### 2. ServiceCard — raw img → Next.js Image

**Arquivo:** `src/components/ui/serviceCard.tsx` (linha 29)

Antes:

```tsx
<img
  src={service.image}
  alt={service.title}
  className="w-full h-full object-cover object-bottom transition-transform duration-700 ease-out group-hover:scale-105"
/>
```

Depois:

```tsx
import Image from "next/image";

<Image
  src={service.image}
  alt={service.title}
  fill
  sizes="(min-width: 768px) 33vw, 100vw"
  className="object-cover object-bottom transition-transform duration-700 ease-out group-hover:scale-105"
  loading="lazy"
/>;
```

**Nota:** O parent `<div>` já tem `className="absolute inset-0 w-full h-full overflow-hidden"` — compatível com `fill`.

### 3. Marketplaces — raw img → Next.js Image

**Arquivo:** `src/components/web/marketplaces.tsx` (linha 129)

Antes:

```tsx
<img
  src={mp.src}
  alt={`${mp.name} background`}
  className="w-full h-full object-cover object-bottom transition-transform duration-700 ease-out group-hover:scale-105 opacity-60 group-hover:opacity-80"
/>
```

Depois:

```tsx
<Image
  src={mp.src}
  alt={`${mp.name} background`}
  fill
  sizes="(min-width: 640px) 280px, 100vw"
  className="object-cover object-bottom transition-transform duration-700 ease-out group-hover:scale-105 opacity-60 group-hover:opacity-80"
  loading="lazy"
/>
```

O import de `Image` já existe no arquivo (linha 6) — apenas precisa usar.

### 4. Outros componentes com raw img (menor prioridade)

| Componente     | Arquivo                                              | Prioridade                |
| -------------- | ---------------------------------------------------- | ------------------------- |
| CompanyCard    | `src/components/ui/company/companyCard.tsx` (L31-35) | Média                     |
| RichBlock      | `src/components/ui/rich/richBlock.tsx` (L50-54)      | Média                     |
| CartaoParceiro | `src/components/ui/cartaoParceiro.tsx` (L20, 42, 45) | Baixa (já usa AVIF local) |

Estes podem ser convertidos na mesma fase ou deixados para depois — impacto menor que ServiceCard e Marketplaces.

## Critérios de conclusão

- [ ] `next.config.ts` tem `formats: ['image/avif', 'image/webp']` e `qualities: [75, 90]`.
- [ ] `serviceCard.tsx` usa `<Image>` do Next.js com `fill`, `sizes`, `loading="lazy"`.
- [ ] `marketplaces.tsx` usa `<Image>` do Next.js com `fill`, `sizes`, `loading="lazy"`.
- [ ] `npm run build` passa sem erros.
- [ ] `npm run test:e2e` — 20 testes verdes.
- [ ] Imagens renderizam corretamente (visual check).
- [ ] No DevTools Network, imagens são servidas como AVIF/WebP (não PNG).

## Riscos

- **URLs dinâmicas do CMS:** Se alguma URL de imagem não estiver no `remotePatterns`, Next.js vai dar erro. Todas as URLs conhecidas são de `tegbe-cdn.b-cdn.net` (já configurado).
- **Aspect ratio:** `fill` requer que o parent tenha posicionamento relativo e dimensões definidas. Verificar que os containers pai têm `relative` e dimensões (ambos ServiceCard e Marketplaces já têm).

## Arquivos afetados

| Arquivo                                     | Mudança                        |
| ------------------------------------------- | ------------------------------ |
| `next.config.ts`                            | `formats` + `qualities`        |
| `src/components/ui/serviceCard.tsx`         | `<img>` → `<Image>`            |
| `src/components/web/marketplaces.tsx`       | `<img>` → `<Image>`            |
| `src/components/ui/company/companyCard.tsx` | `<img>` → `<Image>` (opcional) |
| `src/components/ui/rich/richBlock.tsx`      | `<img>` → `<Image>` (opcional) |

## Checklist

- [x] `next.config.ts` — `formats: ['image/avif', 'image/webp']` e `qualities: [75, 90]`
- [x] `serviceCard.tsx` — `<img>` → `<Image fill sizes="(min-width: 768px) 33vw, 100vw" loading="lazy">`
- [x] `marketplaces.tsx` — `<img>` → `<Image fill sizes="(min-width: 640px) 280px, 100vw" loading="lazy">`
- [ ] `companyCard.tsx` — não feito (opcional, menor impacto)
- [ ] `richBlock.tsx` — não feito (opcional, menor impacto)
- [x] Build passa
- [x] E2E passa (20/20)
- [ ] Visual check das imagens — pendente (requer browser)
- [ ] DevTools confirma AVIF/WebP — pendente (requer deploy)
