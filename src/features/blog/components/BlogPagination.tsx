import Link from "next/link";
import type { IBlogPaginationMeta } from "@/interface/blog/IBlogPaginatedResponse";

interface BlogPaginationProps {
  meta: IBlogPaginationMeta;
  currentPage: number;
  category?: string;
  tag?: string;
}

function buildUrl(page: number, category?: string, tag?: string): string {
  const params = new URLSearchParams();
  params.set("page", String(page));
  if (category) params.set("category", category);
  if (tag) params.set("tag", tag);
  return `/blog?${params.toString()}`;
}

export default function BlogPagination({ meta, currentPage, category, tag }: BlogPaginationProps) {
  if (meta.totalPages <= 1) return null;

  const pages = Array.from({ length: meta.totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="container mx-auto px-4 md:px-8 py-12 flex items-center justify-center gap-2"
      aria-label="Paginação do blog"
    >
      {meta.hasPrev && (
        <Link
          href={buildUrl(currentPage - 1, category, tag)}
          className="px-4 py-2 rounded-xl text-sm text-gray-500 border border-gray-200 bg-white hover:border-[#0071e3]/50 hover:text-[#0071e3] transition-colors shadow-sm"
        >
          ← Anterior
        </Link>
      )}

      {pages.map((p) => (
        <Link
          key={p}
          href={buildUrl(p, category, tag)}
          aria-current={p === currentPage ? "page" : undefined}
          className={
            p === currentPage
              ? "w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold bg-[#FFCC00] text-black shadow-sm"
              : "w-9 h-9 flex items-center justify-center rounded-xl text-sm text-gray-500 border border-gray-200 bg-white hover:border-[#FFCC00] hover:text-black hover:bg-[#FFCC00]/10 transition-colors"
          }
        >
          {p}
        </Link>
      ))}

      {meta.hasNext && (
        <Link
          href={buildUrl(currentPage + 1, category, tag)}
          className="px-4 py-2 rounded-xl text-sm text-gray-500 border border-gray-200 bg-white hover:border-[#0071e3]/50 hover:text-[#0071e3] transition-colors shadow-sm"
        >
          Próxima →
        </Link>
      )}
    </nav>
  );
}
