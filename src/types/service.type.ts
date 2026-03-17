export interface ServiceA {
  id: string;
  step: string;
  title: string;
  description: string;
  image: string;
  descColor?: string;
  titleColor?: string;
  color?: string;
  visualType?: string;
  wide?: boolean;
  visualBg?: string;
}

export interface ServiceTheme {
  badge: {
    background: string;
  };
}