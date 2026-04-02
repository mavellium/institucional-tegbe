import { fetchCms } from "@/core/api/client";

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * @deprecated Delega para `fetchCms` de `@/core/api/client`.
 * Migre chamadas diretas para `fetchCms` ou `getSafeData` conforme SPEC de cada feature.
 * Mantido por compatibilidade com páginas legadas (ex.: ecommerce/page.tsx).
 */
export async function fetchComponentData(componentName: string): Promise<ApiResponse> {
  const { data, error } = await fetchCms(componentName);
  if (error) {
    console.error(`[fetchComponentData] ${componentName}:`, error);
    return { success: false, error };
  }
  return { success: true, data };
}

// Tipos para os componentes
export interface StepData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface EcommerceData {
  // Defina conforme a estrutura da API
  title?: string;
  description?: string;
  items?: Array<{
    id: number;
    title: string;
    description: string;
    icon?: string;
  }>;
}

export interface SetorData {
  id: number;
  name: string;
  description: string;
  icon?: string;
}

export interface NewsData {
  id: number;
  title: string;
  description: string;
  date: string;
  image?: string;
}

export interface LogoData {
  id: number;
  name: string;
  logo: string;
  url?: string;
}

export interface HeadlineData {
  title: string;
  subtitle: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface DnaData {
  title: string;
  description: string;
  items?: Array<{
    id: number;
    title: string;
    description: string;
  }>;
}

export interface SectionImageData {
  title: string;
  description: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
}
