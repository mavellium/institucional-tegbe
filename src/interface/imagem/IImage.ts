export interface IImage {
  src: string; 
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