import { fetchCms } from "@/core/api/client";
import type { IBlogPost } from "@/interface/blog/IBlogPost";
import type { IBlogCategory } from "@/interface/blog/IBlogCategory";
import type { IBlogTag } from "@/interface/blog/IBlogTag";
import type {
  IBlogPaginatedResponse,
  IBlogPaginationMeta,
} from "@/interface/blog/IBlogPaginatedResponse";

// Revalida o blog com mais frequência para novos posts aparecerem logo
const BLOG_REVALIDATE = 60;

// --- Shapes brutas retornadas pela API ---

interface RawTag {
  tag: IBlogTag;
}

interface RawBlogPost extends Omit<IBlogPost, "tags"> {
  tags: RawTag[];
}

// --- Mappers defensivos (suportam variações na shape da resposta) ---

function mapPost(raw: RawBlogPost): IBlogPost {
  return {
    ...raw,
    tags: raw.tags?.map((t) => (t.tag ? t.tag : (t as unknown as IBlogTag))) ?? [],
  };
}

const emptyMeta: IBlogPaginationMeta = {
  total: 0,
  page: 1,
  limit: 12,
  totalPages: 1,
  hasNext: false,
  hasPrev: false,
};

function mapListResponse(raw: unknown): IBlogPaginatedResponse {
  if (!raw || typeof raw !== "object") return { data: [], meta: emptyMeta };
  const r = raw as Record<string, unknown>;

  // A API retorna { posts: [], pagination: {} }
  // Mas suporta também { data: [], meta: {} } para robustez
  const posts = Array.isArray(r.posts)
    ? (r.posts as RawBlogPost[])
    : Array.isArray(r.data)
      ? (r.data as RawBlogPost[])
      : [];

  const pag = (r.pagination ?? r.meta ?? {}) as Partial<IBlogPaginationMeta>;

  return {
    data: posts.map(mapPost),
    meta: { ...emptyMeta, ...pag },
  };
}

// --- API pública do serviço ---

export interface BlogPostsParams {
  page?: string;
  limit?: string;
  categoryId?: string;
  tagId?: string;
  status?: "PUBLISHED" | "DRAFT" | "ARCHIVED";
  featured?: string;
}

export async function fetchBlogPosts(
  params: BlogPostsParams = {}
): Promise<IBlogPaginatedResponse | null> {
  const clean: Record<string, string> = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") clean[k] = v;
  }
  const { data } = await fetchCms<unknown>("blog/posts", {
    params: clean,
    revalidate: BLOG_REVALIDATE,
  });
  if (!data) return null;
  return mapListResponse(data);
}

export async function fetchBlogPost(slug: string): Promise<IBlogPost | null> {
  // Tentativa 1: lookup direto pelo slug/id na URL
  const { data: direct } = await fetchCms<unknown>(`blog/posts/${slug}`, {
    revalidate: BLOG_REVALIDATE,
  });

  if (direct && typeof direct === "object" && "id" in direct) {
    // Pode vir como { post: {...} } ou diretamente como o objeto
    const r = direct as Record<string, unknown>;
    const raw = (r.post ?? r.data ?? direct) as RawBlogPost;
    return mapPost(raw);
  }

  // Tentativa 2 (fallback): a API usa [id] UUID, não slug
  // Busca na listagem completa e encontra pelo slug
  const list = await fetchBlogPosts({ limit: "50", status: "PUBLISHED" });
  return list?.data?.find((p) => p.slug === slug) ?? null;
}

export async function fetchBlogCategories(): Promise<IBlogCategory[]> {
  const { data } = await fetchCms<IBlogCategory[]>("blog/categories", {
    revalidate: BLOG_REVALIDATE,
  });
  return Array.isArray(data) ? data : [];
}

export async function fetchBlogTags(): Promise<IBlogTag[]> {
  const { data } = await fetchCms<IBlogTag[]>("blog/tags", {
    revalidate: BLOG_REVALIDATE,
  });
  return Array.isArray(data) ? data : [];
}

export async function fetchRelatedPosts(
  currentSlug: string,
  categoryId?: string
): Promise<IBlogPost[]> {
  const params: BlogPostsParams = { limit: "4", status: "PUBLISHED" };
  if (categoryId) params.categoryId = categoryId;
  const result = await fetchBlogPosts(params);
  return (result?.data ?? []).filter((p) => p.slug !== currentSlug).slice(0, 3);
}
