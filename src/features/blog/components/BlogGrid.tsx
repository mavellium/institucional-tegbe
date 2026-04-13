import type { IBlogPost } from "@/interface/blog/IBlogPost";
import BlogPostCard from "./BlogPostCard";

interface BlogGridProps {
  posts: IBlogPost[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  if (!posts.length) {
    return (
      <section className="container mx-auto px-4 md:px-8 py-20 text-center">
        <p className="text-[#86868b] text-lg">Nenhum artigo encontrado com esses filtros.</p>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 md:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
