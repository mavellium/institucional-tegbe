# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

There are no automated tests configured in this project.

## Architecture Overview

This is a **Next.js 16 institutional website** for Tegbe, a Mercado Livre & Shopee e-commerce consultancy. It uses the **App Router** with a hybrid SSR + client-side data fetching approach.

### Tech Stack

- **Framework**: Next.js 16 + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/postcss`), custom Satoshi font
- **Animation**: Framer Motion, GSAP + `@gsap/react`
- **Carousels**: Embla Carousel, Swiper
- **Icons**: Lucide React, Iconify

### CMS Integration

All dynamic content comes from a headless CMS at `https://janus.mavellium.com.br/api/tegbe-institucional/`. The base URL is configured via:

```
NEXT_PUBLIC_API_URL=https://janus.mavellium.com.br/api/tegbe-institucional
```

There are two data fetching patterns:

1. **Server-side** (page files, `async` components): `fetch()` with `{ next: { revalidate: 3600 } }`. Uses `getSafeData()` wrapper from `src/lib/api.ts` for graceful fallback on errors.

2. **Client-side** (interactive components): `useApi<T>(endpoint)` hook from `src/hooks/useApi.ts`. Resolves URLs via `resolveApiUrl()` — supports absolute URLs, relative paths, or just a slug appended to `NEXT_PUBLIC_API_URL`.

The `next.config.ts` proxies `/api-tegbe/*` → `https://janus.mavellium.com.br/api/*` to avoid CORS issues.

### Directory Structure

- `src/app/` — Next.js App Router pages: `/`, `/ecommerce`, `/marketing`, `/formacoes`, `/sobre`, `/dev`
- `src/components/Section/` — Full-page section components (49+ sections, one per feature area)
- `src/components/web/` — Generic/shared web components and sub-components
- `src/components/ui/` — Reusable atomic UI components (button, card, badge, avatar, rich text, etc.)
- `src/components/Wrapper/` — Layout wrapper components
- `src/hooks/` — Custom React hooks (`useApi.ts`)
- `src/lib/` — Utilities and API helpers (`api.ts`)
- `src/types/` — TypeScript type aliases
- `src/interface/` — TypeScript interfaces (prefixed with `I`, e.g. `IButton`)
- `src/enums/` — TypeScript enums
- `src/json/` — Static fallback/default JSON data organized by section
- `src/mock/` — Mock data for development

### Component Pattern

Section components in `src/components/Section/` follow this pattern:

1. Accept a typed interface (e.g., `ExpertiseData`) and/or an `endpoint` prop
2. Fetch data client-side with `useApi<T>(endpoint)` or receive pre-fetched data as props
3. Render with Tailwind CSS, animate with Framer Motion or GSAP

Page files (`src/app/*/page.tsx`) typically:

1. Fetch multiple endpoints in parallel with `Promise.all()`
2. Use `getSafeData()` to handle fetch failures gracefully
3. Pass fetched data as props to `"use client"` section components

### Path Alias

`@/*` maps to `./src/*` — use this for all internal imports.

### Images

Remote images are served from:

- `oaaddtqd6pehgldz.public.blob.vercel-storage.com` (Vercel Blob)
- `tegbe-cdn.b-cdn.net` (BunnyCDN)

Always use Next.js `<Image>` component for remote images.
