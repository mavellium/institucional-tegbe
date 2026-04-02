# Web Vitals — Métricas alvo (Tegbe)

Documento de referência para metas de performance do site institucional.
Fase 6 — Visual, Observabilidade e CI.

---

## Métricas Core Web Vitals

| Métrica                   | Sigla | Alvo (bom) | Limite (precisa melhorar) | Crítico   |
| ------------------------- | ----- | ---------- | ------------------------- | --------- |
| Largest Contentful Paint  | LCP   | ≤ 2,5 s    | 2,5 s – 4,0 s             | > 4,0 s   |
| Cumulative Layout Shift   | CLS   | ≤ 0,1      | 0,1 – 0,25                | > 0,25    |
| Interaction to Next Paint | INP   | ≤ 200 ms   | 200 ms – 500 ms           | > 500 ms  |
| First Contentful Paint    | FCP   | ≤ 1,8 s    | 1,8 s – 3,0 s             | > 3,0 s   |
| Time to First Byte        | TTFB  | ≤ 800 ms   | 800 ms – 1800 ms          | > 1800 ms |

> Referência: [web.dev/vitals](https://web.dev/vitals/) — thresholds do Google (2024).

---

## Como medir

### Localmente (via `web-vitals` — já instalado)

O pacote `web-vitals` já está nas dependências do projeto. Para coletar métricas em desenvolvimento, adicione ao layout ou a uma página específica:

```ts
import { onLCP, onCLS, onINP, onFCP, onTTFB } from "web-vitals";

onLCP(console.log);
onCLS(console.log);
onINP(console.log);
onFCP(console.log);
onTTFB(console.log);
```

> Remova antes de enviar para produção ou envie para um endpoint de analytics.

### Lighthouse CLI (manual / CI)

```bash
# Instalar globalmente (uma vez)
npm install -g lighthouse

# Medir a home (servidor local rodando em :3000)
lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html --only-categories=performance

# Ver resultado
open ./lighthouse-report.html
```

Score alvo Lighthouse Performance: **≥ 85** em desktop, **≥ 70** em mobile.

### PageSpeed Insights (produção)

Usar [PageSpeed Insights](https://pagespeed.web.dev/) na URL de produção (`https://tegbe.com.br`) para coleta de dados de campo (CrUX).

### Lighthouse CI (opcional — integração futura)

Para automatizar no pipeline, adicionar ao [`.github/workflows/ci.yml`](../.github/workflows/ci.yml):

```yaml
- name: Run Lighthouse CI
  uses: treosh/lighthouse-ci-action@v11
  with:
    urls: |
      http://localhost:3000
      http://localhost:3000/ecommerce
    uploadArtifacts: true
    temporaryPublicStorage: true
```

---

## Pontos de atenção no projeto

| Item                                    | Impacto  | Recomendação                                                       |
| --------------------------------------- | -------- | ------------------------------------------------------------------ |
| Carousels com Framer Motion / GSAP      | CLS, LCP | Reservar espaço com `min-height` antes do mount                    |
| Imagens remotas (Vercel Blob, BunnyCDN) | LCP      | Usar `priority` no `<Image>` hero; definir `width`/`height`        |
| Fontes (Satoshi custom)                 | FCP, CLS | Usar `font-display: swap`; pré-carregar com `<link rel="preload">` |
| Fetch de CMS em SSR (revalidate 3600)   | TTFB     | Monitorar tempo de resposta do dashboard; usar ISR com fallback    |

---

## Processo de revisão

- Medir **antes** de merges significativos na `main`.
- Registrar variações de LCP/CLS em PRs que alteram hero, imagens ou animações.
- Critério de bloqueio de merge (futuro): LCP > 4 s ou CLS > 0,25 em Lighthouse CI.
