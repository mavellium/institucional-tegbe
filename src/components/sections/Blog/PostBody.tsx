import Image from "next/image";
import Link from "next/link";
import { formatDate } from "janus-sdk";
import type { Post } from "janus-sdk";

interface PostBodyProps {
  post: Post;
}

export default function PostBody({ post }: PostBodyProps) {
  return (
    <article className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative pt-32 pb-16 border-b border-gray-200">
        {post.coverImage && (
          <div className="absolute inset-0">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover opacity-10"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-white" />
          </div>
        )}

        <div className="container px-4 md:px-6 max-w-3xl mx-auto relative z-10">
          {post.category && (
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a7200] mb-4 block">
              {post.category.name}
            </span>
          )}

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tighter leading-tight mb-4">
            {post.title}
          </h1>

          {post.subtitle && (
            <p className="text-gray-500 text-xl leading-relaxed mb-8">
              {post.subtitle}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>{post.author.name}</span>
            <span>·</span>
            {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
            {post.readingTimeMinutes && (
              <>
                <span>·</span>
                <span>{post.readingTimeMinutes} min de leitura</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container px-4 md:px-6 max-w-3xl mx-auto py-16">
        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-[#8a7200] prose-strong:text-gray-900 prose-img:rounded-2xl"
          dangerouslySetInnerHTML={{ __html: post.htmlBody }}
        />

        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link
            href="/blog"
            className="text-gray-400 hover:text-gray-900 transition-colors text-sm flex items-center gap-2"
          >
            ← Voltar ao blog
          </Link>
        </div>
      </div>
    </article>
  );
}
