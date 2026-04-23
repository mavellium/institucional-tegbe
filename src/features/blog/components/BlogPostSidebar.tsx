import Link from "next/link";
import type { IBlogPost } from "@/interface/blog/IBlogPost";
import { extractHeadings } from "@/features/blog/utils/toc";
import BlogToc from "./BlogToc";

interface BlogPostSidebarProps {
  post: IBlogPost;
}

export default function BlogPostSidebar({ post }: BlogPostSidebarProps) {
  const tocItems = extractHeadings(post.body ?? "");

  return (
    <aside className="hidden lg:block self-start sticky top-28">
      <div className="space-y-5">
        {tocItems.length > 0 && <BlogToc items={tocItems} />}

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
