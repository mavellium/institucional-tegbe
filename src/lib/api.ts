interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export async function fetchComponentData(componentName: string): Promise<ApiResponse> {
  try {
    const response = await fetch(
      `https://tegbe-dashboard.vercel.app/api/tegbe-institucional/${componentName}`,
      {
        next: { revalidate: 0 } // Cache de 1 hora
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error(`Error fetching data for ${componentName}:`, error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
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