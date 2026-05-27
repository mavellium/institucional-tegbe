import type { Post } from "janus-sdk";
import PostCard from "./PostCard";

interface PostGridProps {
  posts: Post[];
  accentColor?: string;
}

export default function PostGrid({ posts, accentColor }: PostGridProps) {
  if (!posts.length) {
    return (
      <div className="text-center text-zinc-500 py-20">
        Nenhum artigo publicado ainda.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} accentColor={accentColor} />
      ))}
    </div>
  );
}
