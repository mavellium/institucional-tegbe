import Image from "next/image";
import Link from "next/link";
import type { IBlogPost } from "@/interface/blog/IBlogPost";

interface BlogPostHeaderProps {
  post: IBlogPost;
}

export default function BlogPostHeader({ post }: BlogPostHeaderProps) {
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <header className="pt-24 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-8 pt-8 pb-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Link href="/blog" className="hover:text-[#0071e3] transition-colors">
            Blog
          </Link>
          {post.category?.name && (
            <>
              <span className="text-gray-200">/</span>
              <Link
                href={`/blog?category=${post.category.id}`}
                className="hover:text-[#0071e3] transition-colors"
              >
                {post.category.name}
              </Link>
            </>
          )}
        </nav>

        {/* Categoria badge */}
        {post.category?.name && (
          <span className="inline-block mb-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#FFCC00]/15 text-[#856a00]">
            {post.category.name}
          </span>
        )}

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.05] max-w-full">
          {post.title}
        </h1>

        {post.subtitle && (
          <p className="mt-4 text-xl text-[#86868b] max-w-full leading-relaxed">{post.subtitle}</p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-400">
          {post.authorName && <span className="font-medium text-gray-700">{post.authorName}</span>}
          {publishedDate && (
            <>
              <span className="text-gray-200">·</span>
              <time dateTime={post.publishedAt}>{publishedDate}</time>
            </>
          )}
          {post.readingTime > 0 && (
            <>
              <span className="text-gray-200">·</span>
              <span>{post.readingTime} min de leitura</span>
            </>
          )}
        </div>

        {post.tags?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/blog?tag=${tag.id}`}
                className="text-xs px-3 py-1 rounded-full border border-gray-200 bg-white text-gray-500 hover:border-[#0071e3]/40 hover:text-[#0071e3] hover:bg-[#0071e3]/5 transition-colors"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      {post.image && (
        <div className="container mx-auto px-4 md:px-8 pb-12">
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      )}
    </header>
  );
}
