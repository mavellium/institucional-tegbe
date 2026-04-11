import Image from "next/image";
import Link from "next/link";
import type { IBlogPost } from "@/interface/blog/IBlogPost";

interface FeaturedPostProps {
  post: IBlogPost;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <section className="container mx-auto px-4 md:px-8 py-10">
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden bg-white/5">
          {post.image && (
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-4">
              {post.category?.name && (
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#FFCC00]">
                  {post.category.name}
                </span>
              )}
              <span className="text-white/30">—</span>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50">
                Destaque
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.1] max-w-3xl">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="mt-3 text-gray-300 text-lg max-w-2xl line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>
            )}
            <div className="mt-5 flex items-center gap-3 text-sm text-gray-400">
              <span>{post.authorName}</span>
              <span className="text-white/20">·</span>
              <span>{post.readingTime} min de leitura</span>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
