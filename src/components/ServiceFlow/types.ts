export type ServiceFlowVariant = 'home' | 'ecommerce' | 'marketing' | 'sobre';

export interface ServiceFlowProps {
  variant?: ServiceFlowVariant;
}

export interface ServiceTheme {
  background: string;
  text: {
    primary: string;
    secondary: string;
    card: string;
    title: string;
  };
  card: {
    background: string;
    border: string;
    hover: string;
    wideBackground: string;
  };
  accent: string;
  badge: {
    background: string;
    color: string;
  };
}

export interface Service {
  step: string;
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  wide: boolean;
  visualType: string;
}

export interface HeaderContent {
  preTitle: string;
  title: string;
  subtitle: string;
  gradientTitle?: string;
  // Novos campos para marketing
  badge?: string;
  highlighted?: string;
  description?: string;
}

export interface CTAContent {
  text: string;
  url: string;
  description: string;
  // Novos campos para marketing
  primary?: {
    text: string;
    url: string;
  };
  secondary?: {
    text: string;
    url: string;
  };
}

// Interface específica para o conteúdo do Flywheel
export interface FlywheelContent {
  title: string;
  description: string;
  subtitle?: string;
  benefits?: string[];
  phases?: Array<{
    title: string;
    color: string;
  }>;
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  // Novo campo para imagem
  image?: string;
}

// Interface para estatísticas de marketing
export interface StatItem {
  value: string;
  label: string;
}

export interface VariantContent {
  header: HeaderContent;
  services: Service[];
  cta: CTAContent;
  flywheel?: FlywheelContent; // Opcional, com tipo específico
  // Novo campo para estatísticas (usado em marketing)
  stats?: StatItem[];
}

// Interface para feature items do bottom bar (marketing)
export interface FeatureItem {
  icon: string;
  title: string;
  desc: string;
}