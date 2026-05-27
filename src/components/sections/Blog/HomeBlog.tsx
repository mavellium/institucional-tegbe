import Link from "next/link";
import type { Post } from "janus-sdk";
import PostCard from "./PostCard";

interface HomeBlogTexto {
  label?: string;
  titulo?: string;
  descricao?: string;
  textoBotao?: string;
}

interface HomeBlogData {
  "blog texto"?: HomeBlogTexto;
}

interface HomeBlogProps {
  data?: HomeBlogData;
  posts?: Post[];
  accentColor?: string;
}

export default function HomeBlog({ data, posts = [], accentColor = "#f5df36" }: HomeBlogProps) {
  const texto = data?.["blog texto"];

  if (!texto && !posts.length) return null;

  const visiblePosts = posts.slice(0, 3);

  return (
    <section className="py-24 bg-[#050505] border-t border-white/5">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            {texto?.label && (
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
                style={{
                  borderColor: `${accentColor}33`,
                  backgroundColor: `${accentColor}0D`,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: accentColor }}
                >
                  {texto.label}
                </span>
              </div>
            )}
            {texto?.titulo && (
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tighter">
                {texto.titulo}
              </h2>
            )}
            {texto?.descricao && (
              <p className="text-zinc-400 mt-3 max-w-xl">{texto.descricao}</p>
            )}
          </div>

          {texto?.textoBotao && (
            <Link
              href="/blog"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-sm text-white hover:bg-white/5 transition-colors"
            >
              {texto.textoBotao} →
            </Link>
          )}
        </div>

        {/* Posts */}
        {visiblePosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visiblePosts.map((post) => (
              <PostCard key={post.slug} post={post} accentColor={accentColor} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
