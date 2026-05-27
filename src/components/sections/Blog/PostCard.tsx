import Image from "next/image";
import Link from "next/link";
import { formatDate } from "janus-sdk";
import type { Post } from "janus-sdk";

interface PostCardProps {
  post: Post;
  accentColor?: string;
}

export default function PostCard({ post, accentColor = "#c9a800" }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white border border-gray-200 rounded-3xl overflow-hidden hover:border-gray-300 hover:shadow-md transition-all duration-300"
    >
      {post.coverImage && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}

      <div className="flex flex-col flex-1 p-6 gap-3">
        {post.category && (
          <span
            className="text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ color: accentColor }}
          >
            {post.category.name}
          </span>
        )}

        <h3 className="text-gray-900 font-semibold text-lg leading-snug line-clamp-2 group-hover:text-gray-600 transition-colors">
          {post.title}
        </h3>

        {post.subtitle && (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
            {post.subtitle}
          </p>
        )}

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
          <span className="text-gray-400 text-xs">{post.author.name}</span>
          {post.publishedAt && (
            <span className="text-gray-400 text-xs">{formatDate(post.publishedAt)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
