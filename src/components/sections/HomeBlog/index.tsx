"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import type { IBlogPost } from "@/interface/blog/IBlogPost";
import BlogPostCard from "@/features/blog/components/BlogPostCard";
import { ArrowRight, ArrowLeft, BookOpen, TrendingUp } from "lucide-react";
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
      "Dicas, estratégias e tendências do mundo do e-commerce e marketing digital para alavancar seu negócio.",
    textoBotao: data?.textoBotao || "Ver todos os artigos",
  };

  return (
    <section className="relative py-20 md:py-32 bg-[#FFCC00] overflow-hidden">
      {/* FUNDO: texto decorativo grande */}
      <div className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none select-none">
        <span className="text-[160px] sm:text-[220px] md:text-[300px] font-black text-black/[0.04] tracking-[-0.05em] uppercase leading-none pr-4 whitespace-nowrap">
          BLOG
        </span>
      </div>

      {/* FUNDO: grid de pontos */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* FUNDO: arco decorativo canto superior esquerdo */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full border-[48px] border-black/[0.06] pointer-events-none" />

      {/* FUNDO: arco decorativo canto inferior direito */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-40 -right-40 w-[480px] h-[480px] rounded-full border-[2px] border-dashed border-black/10 pointer-events-none"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10">
          {/* ESQUERDA */}
          <div className="max-w-2xl">
            {/* TÍTULO */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.05]"
            >
              {content.titulo}
            </motion.h2>

            {/* DESCRIÇÃO */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              viewport={{ once: true }}
              className="mt-4 text-[#1E293B]/70 text-base md:text-lg max-w-xl leading-relaxed"
            >
              {content.descricao}
            </motion.p>
          </div>

          {/* DIREITA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-start lg:items-end gap-4 shrink-0"
          >
            {/* CONTAGEM */}
            <div className="inline-flex items-center gap-2 bg-black/10 text-[#0F172A] text-xs font-bold px-4 py-2 rounded-full">
              <TrendingUp size={13} />
              {posts.length} artigo{posts.length !== 1 ? "s" : ""} publicado
              {posts.length !== 1 ? "s" : ""}
            </div>

            {/* CTA */}
            <Link
              href="/blog"
              className="shrink-0 inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-blue-900 text-white text-base font-bold hover:bg-blue-800/50 transition-all group shadow-[0_8px_20px_rgba(0,100,255,0.25)] hover:shadow-[0_12px_30px_rgba(0,100,255,0.35)] hover:-translate-y-0.5"
            >
              {content.textoBotao}
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* LINHA DIVISÓRIA */}
        <div className="w-full h-px bg-black/15 mb-10" />

        {/* CARROSSEL */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
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
              1280: { slidesPerView: 3.5, spaceBetween: 28 },
              1536: { slidesPerView: 4, spaceBetween: 28 },
            }}
            className="!overflow-visible"
          >
            {posts.map((post) => (
              <SwiperSlide key={post.id} className="h-auto !flex">
                <div className="w-full h-full transition-transform duration-500 hover:-translate-y-2">
                  <BlogPostCard post={post} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* NAVEGAÇÃO */}
        <div className="flex items-center justify-between mt-12">
          {/* LINHA + BOTÕES */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block w-12 h-px bg-black/20" />
            <button
              className="blog-swiper-prev w-12 h-12 rounded-full bg-black text-[#FFCC00] flex items-center justify-center hover:bg-black/80 transition-all shadow-md group active:scale-95"
              aria-label="Slide anterior"
            >
              <ArrowLeft size={18} className="group-active:-translate-x-0.5 transition-transform" />
            </button>
            <button
              className="blog-swiper-next w-12 h-12 rounded-full bg-black text-[#FFCC00] flex items-center justify-center hover:bg-black/80 transition-all shadow-md group active:scale-95"
              aria-label="Próximo slide"
            >
              <ArrowRight size={18} className="group-active:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* DICA DE SCROLL */}
          <span className="text-xs font-semibold text-black/40 uppercase tracking-widest hidden sm:block">
            Arraste para explorar
          </span>
        </div>
      </div>
    </section>
  );
}
