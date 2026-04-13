import { Suspense } from "react";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Schema from "@/components/layout/Schema";
import { fetchBlogPosts, fetchBlogCategories, fetchBlogTags } from "@/features/blog/services";
import BlogHero from "@/features/blog/components/BlogHero";
import BlogFilters from "@/features/blog/components/BlogFilters";
import BlogGrid from "@/features/blog/components/BlogGrid";
import BlogPagination from "@/features/blog/components/BlogPagination";
import type { IBlogPaginationMeta } from "@/interface/blog/IBlogPaginatedResponse";

export const metadata: Metadata = {
  title: "Blog | Tegbe Consultoria",
  description:
    "Artigos, cases e estratégias sobre e-commerce, Mercado Livre e Shopee para escalar suas vendas online.",
};

const PAGE_SIZE = 12;

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    categories?: string;
    tags?: string;
    search?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page = "1", categories, tags, search } = await searchParams;

  const categoryIds = categories ? categories.split(",").filter(Boolean) : [];
  const tagIds = tags ? tags.split(",").filter(Boolean) : [];

  const [postsResult, categoriesData, tagsData] = await Promise.all([
    // Busca todos os posts publicados — filtragem feita client-side para suportar múltiplos filtros
    fetchBlogPosts({ limit: "100", status: "PUBLISHED" }),
    fetchBlogCategories(),
    fetchBlogTags(),
  ]);

  // Filtragem client-side (server-side no Next, mas sem depender da API para multi-filtro)
  let filtered = postsResult?.data ?? [];

  if (categoryIds.length > 0) {
    filtered = filtered.filter((p) => p.category && categoryIds.includes(p.category.id));
  }

  if (tagIds.length > 0) {
    filtered = filtered.filter((p) => p.tags?.some((t) => tagIds.includes(t.id)));
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.excerpt?.toLowerCase().includes(q) ||
        p.authorName?.toLowerCase().includes(q)
    );
  }

  // Paginação client-side
  const currentPageNum = Math.max(1, Number(page) || 1);
  const totalFiltered = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / PAGE_SIZE));
  const safePage = Math.min(currentPageNum, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const gridPosts = filtered.slice(start, start + PAGE_SIZE);

  const paginationMeta: IBlogPaginationMeta = {
    total: totalFiltered,
    page: safePage,
    limit: PAGE_SIZE,
    totalPages,
    hasNext: start + PAGE_SIZE < totalFiltered,
    hasPrev: safePage > 1,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog Tegbe",
    description: "Insights de e-commerce, Mercado Livre e Shopee",
    url: "https://tegbe.com.br/blog",
  };

  return (
    <>
      <Schema data={jsonLd} />
      <Header />
      <main className="min-h-screen bg-[#f6f6f6]">
        <BlogHero />
        <Suspense fallback={null}>
          <BlogFilters
            categories={categoriesData}
            tags={tagsData}
            activeCategories={categoryIds}
            activeTags={tagIds}
            activeSearch={search}
          />
        </Suspense>
        <BlogGrid posts={gridPosts} />
        <BlogPagination
          meta={paginationMeta}
          currentPage={safePage}
          categories={categories}
          tags={tags}
          search={search}
        />
      </main>
      <Footer />
    </>
  );
}
