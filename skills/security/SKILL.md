---
skill: security
description: Dados do CMS e fronteira da data layer seguros
---

## Rules

- Sanitizar HTML rico antes de renderizar; evitar XSS.
- Validar payloads na entrada da data layer; rejeitar formatos inesperados com fallback seguro.
- Não expor segredos no client; env vars públicas apenas com prefixo adequado.

## applies_to

- core/security
- rich text / CMS fields
- services

## output

- Funções de sanitização/validação + testes

## validation

- Testes com payloads maliciosos e inválidos; revisão de `dangerouslySetInnerHTML`
