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

export const metadata: Metadata = {
  title: "Blog | Tegbe Consultoria",
  description:
    "Artigos, cases e estratégias sobre e-commerce, Mercado Livre e Shopee para escalar suas vendas online.",
};

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    tag?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page = "1", category, tag } = await searchParams;

  const [postsResult, categories, tags] = await Promise.all([
    fetchBlogPosts({
      page,
      limit: "12",
      categoryId: category,
      tagId: tag,
      status: "PUBLISHED",
    }),
    fetchBlogCategories(),
    fetchBlogTags(),
  ]);

  const gridPosts = postsResult?.data ?? [];

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
            categories={categories}
            tags={tags}
            activeCategory={category}
            activeTag={tag}
          />
        </Suspense>
        <BlogGrid posts={gridPosts} />
        {postsResult?.meta && (
          <BlogPagination
            meta={postsResult.meta}
            currentPage={Number(page)}
            category={category}
            tag={tag}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
