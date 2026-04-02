---
skill: data-fetching
description: Centralizar acesso ao CMS na data layer com cache e contratos estáveis
---

## Rules

- UI **não** chama URL do CMS diretamente no estado-alvo; consome dados via serviços/`core` ou props de RSC.
- Política de cache: `revalidate` explícito e documentado por endpoint.
- Normalizar respostas para tipos estáveis da UI; erros previsíveis (null-safe, fallback).
- Migração: uma SPEC por conjunto de slugs ou rota.

## applies_to

- services
- core/api
- server pages

## output

- Serviços tipados + testes de contrato

## validation

- Testes de normalização e falha; páginas não quebram com resposta vazia
