export interface ILogo {
  id: string;

  image: string;
  alt: string;

  name?: string;
  category?: string;
  description?: string;

  width?: number;
  height?: number;

  className?: string;
}