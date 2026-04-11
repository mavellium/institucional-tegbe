import Link from "next/link";
import type { IBlogPost } from "@/interface/blog/IBlogPost";

interface BlogPostSidebarProps {
  post: IBlogPost;
}

export default function BlogPostSidebar({ post }: BlogPostSidebarProps) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28 space-y-5">
        {post.category?.name && (
          <div className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm">
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-gray-400 mb-3">
              Categoria
            </p>
            <Link
              href={`/blog?category=${post.category.id}`}
              className="inline-flex items-center gap-1.5 font-semibold text-[#856a00] bg-[#FFCC00]/15 px-3 py-1.5 rounded-full text-sm hover:bg-[#FFCC00]/25 transition-colors"
            >
              {post.category.name}
            </Link>
          </div>
        )}

        {post.tags?.length > 0 && (
          <div className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm">
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-gray-400 mb-3">
              Tags
            </p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/blog?tag=${tag.id}`}
                  className="text-xs px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-gray-600 hover:border-[#0071e3]/40 hover:text-[#0071e3] hover:bg-[#0071e3]/5 transition-colors"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA — Gradiente Amarelo Atualizado */}
        <div
          className="p-5 rounded-2xl text-white overflow-hidden relative shadow-md"
          style={{
            background: "linear-gradient(135deg, #FFEB3B 0%, #FFCC00 100%)",
          }}
        >
          {/* Overlay sutil para dar profundidade */}
          <div className="absolute inset-0 bg-black/5 rounded-2xl" />

          <div className="relative z-10">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/60 mb-2">
              Consultoria
            </p>
            <p className="text-sm leading-relaxed mb-5 font-bold text-gray-900">
              Quer escalar suas vendas no Mercado Livre e Shopee?
            </p>
            <Link
              href="https://wa.me/5514991779502"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-2.5 rounded-full bg-white text-gray-900 font-bold text-sm hover:bg-black hover:text-white transition-all duration-300 shadow-sm"
            >
              Falar com especialista
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
