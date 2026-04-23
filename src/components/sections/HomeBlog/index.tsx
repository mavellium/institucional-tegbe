// @/components/sections/HomeBlog.tsx
"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import type { IBlogPost } from "@/interface/blog/IBlogPost";
import BlogPostCard from "@/features/blog/components/BlogPostCard";
import { ArrowRight } from "lucide-react";

interface HomeBlogProps {
  posts: IBlogPost[];
  data?: {
    label?: string;
    titulo?: string;
    descricao?: string;
    textoBotao?: string;
  };
}

export default function HomeBlog({ posts, data }: HomeBlogProps) {
  if (!posts.length) return null;

  // Fallbacks para garantir que o componente não quebre e mantenha o SEO
  const content = {
    label: data?.label || "Blog",
    titulo: data?.titulo || "Conteúdo que gera resultadooo",
    descricao:
      data?.descricao ||
      "Dicas, estratégias e tendências do mundo do e-commerce e marketing digital.",
    textoBotao: data?.textoBotao || "Ver todos os artigos",
  };

  return (
    <section className="py-16 md:py-24 bg-[#f6f6f6] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Header Dinâmico */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-14">
          <div>
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#856a00] bg-[#FFCC00]/15 px-2.5 py-1 rounded-full inline-block mb-3">
              {content.label}
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">
              {content.titulo}
            </h2>
            <p className="mt-3 text-gray-500 text-sm md:text-base max-w-lg leading-relaxed">
              {content.descricao}
            </p>
          </div>
          <Link
            href="/blog"
            className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-[#FFCC00] transition-colors group"
          >
            {content.textoBotao}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Carrossel */}
        <Swiper
          modules={[Navigation, A11y]}
          navigation={{
            nextEl: ".blog-swiper-next",
            prevEl: ".blog-swiper-prev",
          }}
          breakpoints={{
            320: { slidesPerView: 1.1, spaceBetween: 16 },
            540: { slidesPerView: 1.6, spaceBetween: 20 },
            768: { slidesPerView: 2.2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 3.4, spaceBetween: 28 },
            1536: { slidesPerView: 4, spaceBetween: 28 },
          }}
          className="!overflow-visible !pb-2"
        >
          {posts.map((post) => (
            <SwiperSlide key={post.id} className="h-auto !flex">
              <div className="w-full h-full">
                <BlogPostCard post={post} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navegação custom */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            className="blog-swiper-prev w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-[#FFCC00] hover:text-gray-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
            aria-label="Slide anterior"
          >
            <ArrowRight size={16} className="rotate-180" />
          </button>
          <button
            className="blog-swiper-next w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-[#FFCC00] hover:text-gray-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
            aria-label="Próximo slide"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
