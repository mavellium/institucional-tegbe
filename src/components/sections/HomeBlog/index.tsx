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
import { motion } from "framer-motion";

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

  const content = {
    label: data?.label || "Blog",
    titulo: data?.titulo || "Conteúdo que gera resultado",
    descricao:
      data?.descricao ||
      "Dicas, estratégias e tendências do mundo do e-commerce e marketing digital.",
    textoBotao: data?.textoBotao || "Ver todos os artigos",
  };

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-[#FFCC00] to-[#F5C200] overflow-hidden">
      {/* Detalhe sutil de luz para dar profundidade ao gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2)_0%,transparent_50%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8">
        {/* HEADER DA SEÇÃO */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[11px] font-bold tracking-[0.25em] uppercase text-white bg-black/90 px-4 py-1.5 rounded-full inline-block mb-4 shadow-sm"
            >
              {content.label}
            </motion.p>

            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-[1.1]">
              {content.titulo}
            </h2>

            <p className="mt-4 text-gray-900/80 text-base md:text-lg max-w-lg leading-relaxed font-medium">
              {content.descricao}
            </p>
          </div>

          <Link
            href="/blog"
            className="shrink-0 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-black text-white text-sm font-bold hover:bg-gray-800 transition-all group shadow-lg shadow-black/10"
          >
            {content.textoBotao}
            <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* CARROSSEL */}
        <div className="relative">
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
              1280: { slidesPerView: 3.5, spaceBetween: 30 },
              1536: { slidesPerView: 4, spaceBetween: 30 },
            }}
            className="!overflow-visible"
          >
            {posts.map((post) => (
              <SwiperSlide key={post.id} className="h-auto !flex">
                <div className="w-full h-full transition-transform duration-300 hover:-translate-y-2">
                  <BlogPostCard post={post} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* CONTROLES DE NAVEGAÇÃO CUSTOMIZADOS */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            className="blog-swiper-prev w-12 h-12 rounded-full border border-black/10 bg-white/20 backdrop-blur-md flex items-center justify-center text-gray-900 hover:bg-white hover:text-black transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-sm group"
            aria-label="Slide anterior"
          >
            <ArrowRight
              size={20}
              className="rotate-180 group-active:-translate-x-1 transition-transform"
            />
          </button>

          <button
            className="blog-swiper-next w-12 h-12 rounded-full border border-black/10 bg-white/20 backdrop-blur-md flex items-center justify-center text-gray-900 hover:bg-white hover:text-black transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-sm group"
            aria-label="Próximo slide"
          >
            <ArrowRight size={20} className="group-active:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
