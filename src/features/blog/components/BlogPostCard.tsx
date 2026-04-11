import Image from "next/image";
import Link from "next/link";
import type { IBlogPost } from "@/interface/blog/IBlogPost";

interface BlogPostCardProps {
  post: IBlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
    >
      <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(min-width: 1280px) 384px, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        )}
        {post.featured && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-[#FFCC00] text-black shadow-sm">
            Destaque
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 mb-3">
          {post.category?.name && (
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase px-2 py-0.5 rounded-full bg-[#FFCC00]/15 text-[#856a00]">
              {post.category.name}
            </span>
          )}
          {post.readingTime > 0 && (
            <span className="text-[10px] text-gray-400 ml-auto">{post.readingTime} min</span>
          )}
        </div>

        <h3 className="text-gray-900 font-bold text-[1rem] leading-snug tracking-tight group-hover:text-[#0071e3] transition-colors duration-200 line-clamp-2">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="mt-2 text-[#86868b] text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
        )}

        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-xs text-gray-400">{post.authorName}</span>
          <span className="text-xs font-semibold text-[#0071e3] group-hover:underline">
            Ler mais →
          </span>
        </div>
      </div>
    </Link>
  );
}
