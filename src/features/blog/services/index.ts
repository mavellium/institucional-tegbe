import { janus } from "@/lib/janus";
import type { Post } from "janus-sdk";
import type { IBlogPost } from "@/interface/blog/IBlogPost";
import type { IBlogCategory } from "@/interface/blog/IBlogCategory";
import type { IBlogTag } from "@/interface/blog/IBlogTag";
import type { IBlogPaginatedResponse, IBlogPaginationMeta } from "@/interface/blog/IBlogPaginatedResponse";

function mapPost(post: Post): IBlogPost {
  return {
    id: post.slug,
    slug: post.slug,
    title: post.title,
    subtitle: post.subtitle ?? "",
    image: post.coverImage ?? "",
    excerpt: post.description ?? post.subtitle ?? "",
    body: post.htmlBody ?? "",
    status: "PUBLISHED",
    featured: false,
    readingTime: post.readingTimeMinutes ?? 0,
    authorName: post.author?.name ?? "",
    author: { id: "", name: post.author?.name ?? "" },
    seoTitle: post.title,
    seoDescription: post.description ?? "",
    seoKeywords: post.tags?.map((t) => t.name).join(", ") ?? "",
    category: post.category ?? { id: "", name: "", slug: "" },
    tags: post.tags?.map((t) => ({ id: t.slug, name: t.name, slug: t.slug })) ?? [],
    publishedAt: post.publishedAt ?? "",
    createdAt: post.publishedAt ?? "",
    updatedAt: post.publishedAt ?? "",
  };
}

const emptyMeta: IBlogPaginationMeta = {
  total: 0, page: 1, limit: 12, totalPages: 1, hasNext: false, hasPrev: false,
};

export interface BlogPostsParams {
  page?: string;
  limit?: string;
  categoryId?: string;
  tagId?: string;
  status?: "PUBLISHED" | "DRAFT" | "ARCHIVED";
  featured?: string;
}

export async function fetchBlogPosts(params: BlogPostsParams = {}): Promise<IBlogPaginatedResponse | null> {
  try {
    const posts = await janus.getPosts({
      limit: params.limit ? Number(params.limit) : 50,
      categoryId: params.categoryId,
    });
    const mapped = posts.map(mapPost);
    return {
      data: mapped,
      meta: { ...emptyMeta, total: mapped.length, totalPages: Math.max(1, Math.ceil(mapped.length / 12)) },
    };
  } catch {
    return null;
  }
}

export async function fetchBlogPost(slug: string): Promise<IBlogPost | null> {
  try {
    const post = await janus.getPost(slug);
    return post ? mapPost(post) : null;
  } catch {
    return null;
  }
}

export async function fetchBlogCategories(): Promise<IBlogCategory[]> {
  try {
    const cats = await janus.getCategories();
    return cats.map((c) => ({ id: c.id, name: c.name, slug: c.slug, description: c.description ?? undefined }));
  } catch {
    return [];
  }
}

export async function fetchBlogTags(): Promise<IBlogTag[]> {
  try {
    const tags = await janus.getTags();
    return tags.map((t) => ({ id: t.id, name: t.name, slug: t.slug, description: t.description ?? undefined }));
  } catch {
    return [];
  }
}

export async function fetchRelatedPosts(currentSlug: string, categoryId?: string): Promise<IBlogPost[]> {
  try {
    const posts = await janus.getPosts({ limit: 4, categoryId });
    return posts.filter((p) => p.slug !== currentSlug).slice(0, 3).map(mapPost);
  } catch {
    return [];
  }
}
