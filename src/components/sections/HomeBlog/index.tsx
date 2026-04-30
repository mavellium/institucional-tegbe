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
    titulo: data?.titulo || "Conteúdo que gera resultado",
    descricao:
      data?.descricao ||
      "Dicas, estratégias e tendências do mundo do e-commerce e marketing digital para alavancar seu negócio.",
    textoBotao: data?.textoBotao || "Ver todos os artigos",
  };

  return (
    <section className="relative py-20 md:py-32 bg-[#FFCC00] overflow-hidden">
      {/* ELEMENTOS DE FUNDO PARA PREENCHER ESPAÇOS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Círculo decorativo grande */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute -top-24 -right-24 w-96 h-96 bg-[#F5C200] rounded-full blur-3xl opacity-60"
        />
        {/* Padrão de pontos (Dots) */}
        <div
          className="absolute top-10 left-10 w-32 h-32 opacity-20"
          style={{
            backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
            backgroundSize: "12px 12px",
          }}
        />
        {/* Forma abstrata inferior */}
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-12 -left-12 w-64 h-64 border-[32px] border-[#E6B800] rounded-full opacity-30"
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8">
        {/* HEADER DA SEÇÃO */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="max-w-3xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.1]"
            >
              {content.titulo}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="mt-6 text-[#1E293B]/80 text-lg md:text-xl max-w-2xl leading-relaxed font-medium"
            >
              {content.descricao}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link
              href="/blog"
              className="shrink-0 inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#0F172A] text-white text-base font-bold hover:bg-black transition-all group shadow-xl hover:shadow-2xl"
            >
              {content.textoBotao}
              <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* CARROSSEL COM ANIMAÇÃO DE ENTRADA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="relative"
        >
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
            }}
            className="!overflow-visible"
          >
            {posts.map((post) => (
              <SwiperSlide key={post.id} className="h-auto !flex">
                <div className="w-full h-full transition-transform duration-500 hover:-translate-y-3">
                  <BlogPostCard post={post} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* CONTROLES */}
        <div className="flex items-center justify-center gap-4 mt-16">
          <button
            className="blog-swiper-prev w-14 h-14 rounded-xl border-2 border-[#0F172A]/10 bg-white/10 backdrop-blur-sm flex items-center justify-center text-[#0F172A] hover:bg-[#0F172A] hover:text-white transition-all disabled:opacity-20 shadow-sm group"
            aria-label="Slide anterior"
          >
            <ArrowRight
              size={24}
              className="rotate-180 group-active:-translate-x-1 transition-transform"
            />
          </button>

          <button
            className="blog-swiper-next w-14 h-14 rounded-xl border-2 border-[#0F172A]/10 bg-white/10 backdrop-blur-sm flex items-center justify-center text-[#0F172A] hover:bg-[#0F172A] hover:text-white transition-all disabled:opacity-20 shadow-sm group"
            aria-label="Próximo slide"
          >
            <ArrowRight size={24} className="group-active:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
