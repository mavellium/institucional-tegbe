interface BlogHeroData {
  conteudo?: {
    badge?: string;
    title?: string;
    titleHighlight?: string;
    description?: string;
  };
}

interface BlogHeroProps {
  data?: BlogHeroData;
}

export default function BlogHero({ data }: BlogHeroProps) {
  const c = data?.conteudo;

  return (
    <section className="relative pt-32 pb-20 bg-white overflow-hidden border-b border-gray-200">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#f5df36]/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container px-4 md:px-6 max-w-4xl mx-auto text-center relative z-10">
        {c?.badge && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c9a800]/30 bg-[#f5df36]/15 mb-8">
            <span className="w-1.5 h-1.5 bg-[#c9a800] rounded-full animate-pulse" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#8a7200] font-bold">
              {c.badge}
            </span>
          </div>
        )}

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tighter mb-6">
          {c?.title}{" "}
          {c?.titleHighlight && (
            <span className="text-[#c9a800]">{c.titleHighlight}</span>
          )}
        </h1>

        {c?.description && (
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {c.description}
          </p>
        )}
      </div>
    </section>
  );
}
