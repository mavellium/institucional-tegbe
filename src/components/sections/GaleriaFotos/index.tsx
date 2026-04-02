"use client";

import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
  Variants,
  useInView,
} from "framer-motion";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { IButton } from "@/interface/button/IButton";

// Seus componentes de UI
import Heading from "@/components/ui/heading";
import RichText from "@/components/ui/rich/richText";
import Paragrafo from "@/components/ui/paragrafo";
import { Button } from "@/components/ui/button/button";
import { RichTextItem } from "@/types/richText.type";

const CARD_HEIGHT = 450;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

interface GalleryItem {
  id: string;
  alt: string;
  image: string;
}

type GaleriaPayload = {
  data: GalleryItem[];
  textContent: {
    badge?: RichTextItem[];
    title?: RichTextItem[];
    description?: RichTextItem[];
    button?: IButton;
  };
};

interface GaleriaFotosProps {
  data?: GaleriaPayload | null;
}

function normalizeGalleryJson(json: unknown): GaleriaPayload | null {
  if (!json || typeof json !== "object") return null;
  const o = json as Record<string, unknown>;

  const texts = (o.textContent as GaleriaPayload["textContent"]) || {};

  if (Array.isArray(o.data)) {
    return { data: o.data as GalleryItem[], textContent: texts };
  }

  if (Array.isArray(o.values)) {
    const items: GalleryItem[] = (o.values as Record<string, unknown>[])
      .map((v, i) => ({
        id: String(v.id ?? i),
        alt: String(v.alt ?? v.name ?? "Galeria"),
        image: String(v.image ?? v.url ?? v.src ?? ""),
      }))
      .filter((item) => item.image);
    return { data: items, textContent: texts };
  }

  return null;
}

// --- MOBILE STACK (Totalmente Refatorado para CSS Sticky Nativo) ---
function MobileStack({
  images,
  onLoadMore,
  hasMore,
  texts,
}: {
  images: GalleryItem[];
  onLoadMore: () => void;
  hasMore: boolean;
  texts: any;
}) {
  return (
    <div className="flex flex-col items-center pb-12 w-full relative z-20">
      {/* CAMADA DAS CARTAS: Usando sticky nativo para empilhar sem quebrar o layout */}
      {images.map((img, i) => (
        <motion.div
          key={img.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="sticky w-full max-w-[350px] rounded-[2rem] shadow-[0_-10px_30px_rgba(0,0,0,0.6)] border border-white/10 overflow-hidden bg-zinc-900"
          style={{
            height: CARD_HEIGHT,
            // Cada carta trava um pouquinho mais para baixo que a anterior, criando o efeito baralho
            top: `calc(12vh + ${i * 16}px)`,
            marginBottom: "3rem", // Dá espaço para o scroll natural acontecer
            zIndex: i,
          }}
        >
          <Image
            src={img.image}
            alt={img.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 350px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8">
            <span className="text-white font-bold text-lg uppercase tracking-widest">
              {img.alt}
            </span>
          </div>
        </motion.div>
      ))}

      {/* BOTÃO CTA: No fluxo normal da página. Nunca vai bugar ou sobrepor. */}
      {hasMore && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="relative z-50 w-full flex justify-center mt-8 px-4"
        >
          <Button
            onClick={onLoadMore}
            // Design corrigido: Fundo escuro com texto branco. Amarelo apenas nos detalhes/hover.
            className="w-full max-w-[350px] py-7 rounded-full bg-zinc-900 border border-zinc-700 text-white hover:bg-[#FFD700] hover:text-black hover:border-[#FFD700] font-bold tracking-widest uppercase transition-all duration-300 shadow-xl"
          >
            {texts?.button?.icon && <Icon icon={texts.button.icon} className="mr-3 text-2xl" />}
            {texts?.button?.label || "Carregar Mais Fotos"}
          </Button>
        </motion.div>
      )}
    </div>
  );
}

// --- DESKTOP GRID COM INFINITE SCROLL ---
function GaleriaFotosScrollBody({
  visibleImages,
  hasMore,
  texts,
  mounted,
  isMobile,
  onLoadMore,
}: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const isBottomVisible = useInView(triggerRef, { margin: "0px 0px 400px 0px" });

  useEffect(() => {
    if (isBottomVisible && hasMore && !isMobile) {
      onLoadMore();
    }
  }, [isBottomVisible, hasMore, onLoadMore, isMobile]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -180]);

  return (
    <section ref={containerRef} className="bg-[#020202] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10 mx-auto py-12 md:py-24">
        {/* TEXTOS */}
        <div className="flex flex-col items-center text-center mb-16 max-w-4xl mx-auto z-20 relative">
          {texts?.badge && texts.badge.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FFD700]/20 bg-[#FFD700]/5 backdrop-blur-md mb-8"
            >
              <Icon icon="ph:camera-fill" className="text-[#FFD700] w-4 h-4" />
              <div className="text-[10px] font-bold tracking-[0.2em] text-[#FFD700] uppercase">
                <RichText content={texts.badge} />
              </div>
            </motion.div>
          )}

          {texts?.title && texts.title.length > 0 && (
            <div className="text-white mb-6 text-4xl md:text-5xl font-bold">
              <RichText content={texts.title} />
            </div>
          )}

          {texts?.description && texts.description.length > 0 && (
            <div className="text-gray-400 max-w-2xl text-lg">
              <RichText content={texts.description} />
            </div>
          )}
        </div>

        {mounted && (
          <>
            {isMobile ? (
              // Mobile stack atualizado para usar CSS nativo e não quebrar com cliques
              <MobileStack
                images={visibleImages}
                onLoadMore={onLoadMore}
                hasMore={hasMore}
                texts={texts}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-32">
                {[0, 1, 2].map((colIdx) => (
                  <motion.div
                    key={colIdx}
                    style={{ y: colIdx === 0 ? y1 : colIdx === 1 ? y2 : y3 }}
                    className={`flex flex-col gap-8 ${colIdx === 1 ? "md:pt-24" : ""}`}
                  >
                    <AnimatePresence>
                      {visibleImages
                        .filter((_: any, i: number) => i % 3 === colIdx)
                        .map((img: any) => (
                          <motion.div
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            key={img.id}
                            className="relative rounded-[2rem] overflow-hidden group border border-white/5 h-[450px] cursor-pointer bg-zinc-900"
                          >
                            <Image
                              src={img.image}
                              alt={img.alt}
                              fill
                              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-8">
                              <span className="text-[#FFD700] text-sm font-bold tracking-[0.2em] uppercase translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                {img.alt}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            )}

            {/* SENTINELA DO DESKTOP */}
            {hasMore && !isMobile && (
              <div ref={triggerRef} className="w-full h-20 flex items-center justify-center">
                <Icon
                  icon="eos-icons:loading"
                  className="text-[#FFD700] text-4xl animate-spin opacity-50"
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

// --- COMPONENTE PRINCIPAL ---
export default function GaleriaFotos({ data: dataProp }: GaleriaFotosProps) {
  const [mounted, setMounted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const data = useMemo(() => {
    if (dataProp) return normalizeGalleryJson(dataProp);
    return null;
  }, [dataProp]);

  const { images, texts } = useMemo(() => {
    if (!data) return { images: [], texts: {} as GaleriaPayload["textContent"] };
    return { images: data.data || [], texts: data.textContent || {} };
  }, [data]);

  const visibleImages = useMemo(() => {
    if (!mounted) return [];
    return images.slice(0, visibleCount);
  }, [images, visibleCount, mounted]);

  const hasMore = visibleCount < images.length;

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + 6, images.length));
  }, [images.length]);

  if (!images.length) return null;

  return (
    <GaleriaFotosScrollBody
      visibleImages={visibleImages}
      hasMore={hasMore}
      texts={texts}
      mounted={mounted}
      isMobile={isMobile}
      onLoadMore={handleLoadMore}
    />
  );
}
