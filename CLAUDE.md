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

This is a **Next.js 16 institutional website** for Tegbe, a Mercado Livre & Shopee e-commerce consultancy. It uses the **App Router** with server-side rendering and ISR.

### Tech Stack

- **Framework**: Next.js 16 + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/postcss`), custom Satoshi font
- **Animation**: Framer Motion, GSAP + `@gsap/react`
- **Carousels**: Embla Carousel, Swiper
- **Icons**: Lucide React, Iconify (`@iconify/react` — use string icon names like `"ph:x-light"`, not icon object imports)

### CMS Integration

All dynamic content is served by the Janus CMS via the `janus-sdk` workspace package. The singleton client lives at `src/lib/janus.ts`.

**Environment variables** (`.env.local`):
```
JANUS_BASE_URL=https://januscms.com.br
JANUS_TENANT_ID=tegbe
JANUS_PROJECT_ID=d173e24c-ceca-49a1-868a-f53bb31e2791
```

**Page content** — one call per page, sections extracted from `content`:
```typescript
import { janus, getSection } from "@/lib/janus";

const page = await janus.getPage("home");           // GET /api/v1/content/tegbe/home
const heroData = getSection<HeroData>(page?.content, "hero-carrossel-home");
```

**Blog content** — via dedicated SDK methods:
```typescript
janus.getPosts({ limit: 12, status: "PUBLISHED" }) // returns { data: Post[], total, page, ... }
janus.getPost(slug)
janus.getPostSlugs()
janus.getRelatedPosts(slug)
janus.getCategories()
janus.getTags()
```

**Client-side layout components** (Header, Footer) fetch directly via `fetch()` to:
- `https://januscms.com.br/api/v1/content/tegbe/header`
- `https://januscms.com.br/api/v1/content/tegbe/footer`

Pattern: `if (!response.ok) return; const data = json?.content ?? json;`

**SDK Post → IBlogPost mapping**: `src/features/blog/services/index.ts` exports `sdkPostToIBlogPost()` which maps SDK field names (`coverImage`, `htmlBody`, `subtitle`, `author.name`, `readingTimeMinutes`) to the local `IBlogPost` interface.

### Directory Structure

- `src/app/` — Next.js App Router pages: `/`, `/ecommerce`, `/marketing`, `/formacoes`, `/sobre`, `/blog`
- `src/components/Section/` — Full-page section components
- `src/components/layout/` — Header, Footer, Navbar, AnnouncementBar
- `src/components/web/` — Generic/shared web components
- `src/components/ui/` — Reusable atomic UI components
- `src/features/` — Feature modules (blog, home-hero-carousel)
- `src/lib/` — Utilities: `janus.ts` (CMS client + `getSection` helper)
- `src/types/` — TypeScript type aliases
- `src/interface/` — TypeScript interfaces (prefixed with `I`)
- `src/enums/` — TypeScript enums
- `src/json/` — Static fallback/default JSON data organized by section
- `src/mock/` — Mock data for development

### Data Fetching Pattern

Page files (`src/app/*/page.tsx`):
1. Call `janus.getPage("page-slug")` once
2. Extract sections with `getSection<T>(page?.content, "section-key")` (returns `null` on missing)
3. Pass data as props to child components

Hero carousels: content is wrapped `{ items: HeroSlide[] }`, so extract `.items ?? []`.

### Path Alias

`@/*` maps to `./src/*` — use this for all internal imports.

### Images

Remote images are whitelisted in `next.config.ts` remotePatterns:

- `oaaddtqd6pehgldz.public.blob.vercel-storage.com` (Vercel Blob)
- `public.blob.vercel-storage.com`
- `tegbe-cdn.b-cdn.net` (BunnyCDN — Tegbe assets)
- `mavellium-janus.b-cdn.net` (BunnyCDN — Janus/blog images)
- `januscms.com.br`

Always use Next.js `<Image>` component for remote images.
