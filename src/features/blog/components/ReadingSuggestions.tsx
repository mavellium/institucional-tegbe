import type { IBlogPost } from "@/interface/blog/IBlogPost";
import BlogPostCard from "./BlogPostCard";

interface ReadingSuggestionsProps {
  posts: IBlogPost[];
}

export default function ReadingSuggestions({ posts }: ReadingSuggestionsProps) {
  if (!posts.length) return null;

  return (
    <section className="border-t border-gray-100 bg-[#f6f6f6]">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="flex items-end gap-3 mb-10">
          <div>
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#856a00] bg-[#FFCC00]/15 px-2.5 py-1 rounded-full inline-block mb-3">
              Continue lendo
            </p>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              Artigos relacionados
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
