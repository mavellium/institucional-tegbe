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
}

export interface CTAContent {
  text: string;
  url: string;
  description: string;
}

// Interface específica para o conteúdo do Flywheel
export interface FlywheelContent {
  title: string;
  description: string;
  subtitle?: string;
  benefits: string[];
  phases: Array<{
    title: string;
    color: string;
  }>;
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface VariantContent {
  header: HeaderContent;
  services: Service[];
  cta: CTAContent;
  flywheel?: FlywheelContent; // Opcional, com tipo específico
}