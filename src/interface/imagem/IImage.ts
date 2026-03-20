export interface IImage {
  imagem: string; // Corrigir para src depois
  alt: string;

  width?: number;
  height?: number;
  fill?: boolean;

  sizes?: string;

  priority?: boolean;

  quality?: number;

  className?: string;

  blurDataURL?: string;
}