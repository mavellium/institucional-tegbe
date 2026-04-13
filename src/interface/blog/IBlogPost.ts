import type { IBlogAuthor } from "./IBlogAuthor";
import type { IBlogCategory } from "./IBlogCategory";
import type { IBlogTag } from "./IBlogTag";

export interface IBlogPost {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  image: string;
  excerpt: string;
  body: string;
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED";
  featured: boolean;
  readingTime: number;
  authorName: string;
  author: IBlogAuthor;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  category: IBlogCategory;
  tags: IBlogTag[];
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}
