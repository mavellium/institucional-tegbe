import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Schema from "@/components/layout/Schema";
import { fetchBlogPost, fetchRelatedPosts } from "@/features/blog/services";
import BlogPostHeader from "@/features/blog/components/BlogPostHeader";
import BlogPostBody from "@/features/blog/components/BlogPostBody";
import BlogPostSidebar from "@/features/blog/components/BlogPostSidebar";
import ReadingSuggestions from "@/features/blog/components/ReadingSuggestions";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);

  if (!post) {
    return { title: "Post não encontrado | Blog Tegbe" };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.seoKeywords,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.authorName ? [post.authorName] : undefined,
      images: post.image
        ? [{ url: post.image, width: 1200, height: 630, alt: post.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);

  if (!post) notFound();

  const relatedPosts = await fetchRelatedPosts(post.slug, post.category?.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    author: { "@type": "Person", name: post.authorName },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    publisher: {
      "@type": "Organization",
      name: "Tegbe",
      logo: {
        "@type": "ImageObject",
        url: "https://tegbe.com.br/logo.png",
      },
    },
  };

  return (
    <>
      <Schema data={jsonLd} />
      <Header />
      <main className="min-h-screen bg-[#f6f6f6]">
        {post.image && (
          <link
            rel="preload"
            as="image"
            href={`/_next/image?url=${encodeURIComponent(post.image)}&w=1200&q=75`}
          />
        )}
        <BlogPostHeader post={post} />
        <div className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-6 md:px-12 xl:px-20 py-14 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 xl:gap-16">
            <BlogPostBody body={post.body} />
            <BlogPostSidebar post={post} />
          </div>
        </div>
        <ReadingSuggestions posts={relatedPosts} />
      </main>
      <Footer />
    </>
  );
}
