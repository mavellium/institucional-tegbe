import { janus } from "@/lib/janus";
import type { Post } from "@/lib/janus-sdk";
import type { IBlogPost } from "@/interface/blog/IBlogPost";
import type { IBlogCategory } from "@/interface/blog/IBlogCategory";
import type { IBlogTag } from "@/interface/blog/IBlogTag";
import type {
  IBlogPaginatedResponse,
  IBlogPaginationMeta,
} from "@/interface/blog/IBlogPaginatedResponse";

// ─── Mapper: SDK Post → IBlogPost ────────────────────────────────────────────

function sdkPostToIBlogPost(p: Post): IBlogPost {
  return {
    id: p.slug,
    title: p.title,
    subtitle: p.subtitle ?? "",
    slug: p.slug,
    image: p.coverImage,
    excerpt: p.subtitle ?? p.description ?? "",
    body: p.htmlBody,
    status: "PUBLISHED",
    featured: false,
    readingTime: p.readingTimeMinutes,
    authorName: p.author.name,
    author: { id: p.author.name, name: p.author.name },
    seoTitle: p.title,
    seoDescription: p.subtitle ?? p.description ?? "",
    seoKeywords: "",
    category: p.category,
    tags: p.tags.map((t) => ({ id: t.slug, name: t.name, slug: t.slug })),
    publishedAt: p.publishedAt,
    createdAt: p.publishedAt,
    updatedAt: p.publishedAt,
  };
}

const emptyMeta: IBlogPaginationMeta = {
  total: 0,
  page: 1,
  limit: 50,
  totalPages: 1,
  hasNext: false,
  hasPrev: false,
};

// ─── BlogPostsParams (mantém compatibilidade com o contrato anterior) ─────────

export interface BlogPostsParams {
  page?: string;
  limit?: string;
  categoryId?: string;
  tagId?: string;
  status?: "PUBLISHED" | "DRAFT" | "ARCHIVED";
  featured?: string;
  search?: string;
}

// ─── API pública do serviço ───────────────────────────────────────────────────

export async function fetchBlogPosts(
  params: BlogPostsParams = {}
): Promise<IBlogPaginatedResponse | null> {
  try {
    const posts = await janus.getPosts({
      limit: params.limit ? Number(params.limit) : 50,
      page: params.page ? Number(params.page) : undefined,
      categoryId: params.categoryId,
      search: params.search,
    });

    const mapped = posts.map(sdkPostToIBlogPost);
    const total = mapped.length;
    const limit = params.limit ? Number(params.limit) : 50;

    return {
      data: mapped,
      meta: {
        ...emptyMeta,
        total,
        limit,
        totalPages: Math.max(1, Math.ceil(total / limit)),
        hasNext: false,
        hasPrev: false,
      },
    };
  } catch {
    return null;
  }
}

export async function fetchBlogPost(slug: string): Promise<IBlogPost | null> {
  const post = await janus.getPost(slug);
  if (!post) return null;
  return sdkPostToIBlogPost(post);
}

export async function fetchBlogCategories(): Promise<IBlogCategory[]> {
  const cats = await janus.getCategories();
  return cats.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description ?? undefined,
  }));
}

export async function fetchBlogTags(): Promise<IBlogTag[]> {
  const tags = await janus.getTags();
  return tags.map((t) => ({
    id: t.id,
    name: t.name,
    slug: t.slug,
    description: t.description ?? undefined,
  }));
}

export async function fetchRelatedPosts(
  currentSlug: string,
  categoryId?: string
): Promise<IBlogPost[]> {
  if (!categoryId) {
    const posts = await janus.getPosts({ limit: 4 });
    return posts
      .filter((p) => p.slug !== currentSlug)
      .slice(0, 3)
      .map(sdkPostToIBlogPost);
  }
  const related = await janus.getRelatedPosts(categoryId, currentSlug);
  return related.map(sdkPostToIBlogPost);
}
