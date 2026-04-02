# Performance — Otimização FCP & LCP (Mobile)

**Diagnóstico base (PageSpeed, 02/04/2026):** FCP 5.8s · LCP 10.9s · TBT 60ms · CLS 0 · Score 59
**Meta:** FCP ~1.5–2.2s · LCP ~2.0–3.0s · Score 90+

## Status das fases

| Fase | Documento                                                          | Foco                        | Status    |
| ---- | ------------------------------------------------------------------ | --------------------------- | --------- |
| 1    | [phase-01-lcp-hero-fix.md](./phase-01-lcp-hero-fix.md)             | LCP: hero image             | concluído |
| 2    | [phase-02-critical-path.md](./phase-02-critical-path.md)           | FCP: preconnect, fonts, GTM | concluído |
| 3    | [phase-03-lazy-loading.md](./phase-03-lazy-loading.md)             | FCP/JS: lazy load seções    | concluído |
| 4    | [phase-04-image-optimization.md](./phase-04-image-optimization.md) | Imagens: Next Image + AVIF  | concluído |
| 5    | [phase-05-iconify-bundle.md](./phase-05-iconify-bundle.md)         | Ícones: bundlar above-fold  | concluído |

## Ordem de execução

As fases são independentes entre si, mas a ordem recomendada maximiza impacto incremental:

```
Fase 1 (LCP hero) → Fase 2 (critical path) → Fase 3 (lazy load) → Fase 4 (imagens) → Fase 5 (iconify)
```

Fase 1 e 2 podem ser feitas em paralelo. Fase 4 e 5 também.

## Referências

- [Web Vitals targets](../web-vitals-targets.md)
- [Architecture guidelines](../architecture-guidelines.md)
- [PageSpeed Insights — Home mobile](https://pagespeed.web.dev/analysis?url=https://tegbe.com.br)
