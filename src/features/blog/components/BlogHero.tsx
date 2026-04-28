import type { IBlogHero } from "@/interface/blog/IBlogHero";

interface BlogHeroProps {
  data?: IBlogHero | null;
}

export default function BlogHero({ data }: BlogHeroProps) {
  const c = data?.conteudo;
  const badge = c?.badge ?? "Blog Tegbe";
  const title = c?.title ?? "Insights de";
  const titleHighlight = c?.titleHighlight ?? "E-commerce";
  const description =
    c?.description ??
    "Estratégias, cases e tendências para escalar suas vendas nos principais marketplaces.";

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-white border-b border-gray-100 overflow-hidden">
      {/* Glow sutil usando o gradiente da marca */}
      <div className="absolute -top-20 right-0 w-[500px] h-[400px] bg-gradient-to-bl from-[#0894ff]/8 via-[#FFCC00]/5 to-transparent blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[250px] bg-[#FFCC00]/6 blur-[80px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFCC00] mb-6">
          <span className="text-[10px] font-black tracking-[0.3em] uppercase text-black">
            {badge}
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[0.95] tracking-tight">
          {title}
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #FFEB3B 0%, #FFCC00 100%)",
            }}
          >
            {titleHighlight}
          </span>
        </h1>
        <p className="mt-6 text-[#86868b] text-lg max-w-xl leading-relaxed">{description}</p>
      </div>
    </section>
  );
}
