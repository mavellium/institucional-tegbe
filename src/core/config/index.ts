/**
 * Configuração central da data layer — fonte única de verdade.
 *
 * Variáveis de ambiente:
 *   NEXT_PUBLIC_API_URL  URL base da API do CMS, sem barra final.
 *                        Ex.: https://tegbe-dashboard.vercel.app/api/tegbe-institucional
 *
 * Fallback: URL pública do dashboard Tegbe (usada em dev sem .env ou em CI).
 */
export const API_BASE_URL =
  (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "") ||
  "https://tegbe-dashboard.vercel.app/api/tegbe-institucional";

/** Tempo de revalidação ISR padrão (segundos). Alinhado ao ciclo de publicação do CMS. */
export const REVALIDATE_SECONDS = 3600;
