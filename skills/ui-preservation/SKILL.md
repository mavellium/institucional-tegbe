---
skill: ui-preservation
description: Manter intenção visual e identidade; corrigir só o necessário
---

## Rules

- Classificar componente: stable | inconsistent | broken | legacy (ver architecture-guidelines).
- Preservar intenção visual; padronizar inconsistências entre seções.
- Corrigir responsividade e quebras; melhorar a11y sem redesenhar.
- **Não** redesenhar; **não** mudar hierarquia de conteúdo sem justificativa na SPEC.
- **Broken** pode ser reestruturado com validação visual.

## applies_to

- components
- sections

## output

- Alterações visuais mínimas e justificadas

## validation

- Comparação antes/depois; revisão de pares; visual tests quando existirem
