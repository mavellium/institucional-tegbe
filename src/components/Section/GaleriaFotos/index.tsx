"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { resolveApiUrl } from "@/hooks/useApi";

// --- CONFIGURAÇÕES DO STACK ---
const CARD_HEIGHT = 400;
const CARD_GAP = 12;

interface GalleryItem {
  id: string;
  alt: string;
  image: string;
}

type GaleriaPayload = {
  data: GalleryItem[];
  textContent: {
    badge?: { icon?: string; text?: string };
    title?: { line1?: string; line2?: string; highlightWords?: string };
    description?: string;
  };
};

interface GaleriaFotosProps {
  data?: GaleriaPayload | null;
  /** Ex.: `/api-tegbe/tegbe-institucional/form/gallery` — tem prioridade sobre `data` quando definido */
  endpoint?: string;
}

function normalizeGalleryJson(json: unknown): GaleriaPayload | null {
  if (!json || typeof json !== "object") return null;
  const o = json as Record<string, unknown>;

  if (Array.isArray(o.data)) {
    return {
      data: o.data as GalleryItem[],
      textContent: (o.textContent as GaleriaPayload["textContent"]) || {},
    };
  }

  if (Array.isArray(o.values)) {
    const items: GalleryItem[] = (o.values as Record<string, unknown>[]).map(
      (v, i) => ({
        id: String(v.id ?? i),
        alt: String(v.alt ?? v.name ?? "Galeria"),
        image: String(v.image ?? v.url ?? v.src ?? ""),
      })
    ).filter((item) => item.image);
    return {
      data: items,
      textContent: (o.textContent as GaleriaPayload["textContent"]) || {},
    };
  }

  return null;
}

// --- COMPONENTE DE CARD INDIVIDUAL ---
function MobileStackCard({
  img,
  index,
  totalCards,
  scrollYProgress,
}: {
  img: GalleryItem;
  index: number;
  totalCards: number;
  scrollYProgress: any;
}) {
  const startRange = index / totalCards;
  const endRange = (index + 1) / totalCards;

  // Calcula a posição final ideal (centralizada com espaçamento)
  let finalY = (index - (totalCards - 1) / 2) * CARD_GAP;

  // Limita o deslocamento máximo para não ultrapassar a viewport
  // 35vh é um valor empírico; ajuste conforme necessário
  const MAX_DISPLACEMENT = 35; // em vh
  finalY = Math.min(finalY, MAX_DISPLACEMENT);
  finalY = Math.max(finalY, -MAX_DISPLACEMENT);

  const y = useTransform(scrollYProgress, [startRange, endRange], [600, finalY]);
  const scale = useTransform(
    scrollYProgress,
    [endRange, 1],
    [1, 1 - (totalCards - 1 - index) * 0.025]
  );
  const opacity = useTransform(scrollYProgress, [startRange, startRange + 0.03], [0, 1]);

  return (
    <motion.div
      style={{
        y,
        scale,
        opacity,
        position: "absolute",
        left: "50%",
        x: "-50%",
        zIndex: index,
      }}
      className="w-full max-w-[350px] px-4"
    >
      <div
        className="relative rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden bg-zinc-900"
        style={{ height: CARD_HEIGHT }}
      >
        <Image src={img.image} alt={img.alt} fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent flex items-end p-8">
          <span className="text-white font-bold text-lg uppercase tracking-widest">
            {img.alt}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// --- COMPONENTE MOBILE: STICKY STACK (COM OFFSET AJUSTADO) ---
// --- COMPONENTE MOBILE: STICKY STACK (COM FADE SUAVE NO FINAL E BOTÃO CONTROLADO) ---
// --- COMPONENTE MOBILE: STICKY STACK (COM SAÍDA ANTECIPADA E SEM INVASÃO) ---
// --- COMPONENTE MOBILE: STICKY STACK (COM FADE ANTECIPADO) ---
function MobileStack({ images, onLoadMore, hasMore }: { images: GalleryItem[]; onLoadMore: () => void; hasMore: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const totalCards = images.length;

  // Opacidade do container fixo: começa a desaparecer em 50% e atinge ZERO em 85% do progresso
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.9, 0.85, 1],
    [1, 1, 0, 0] // de 85% a 100% permanece 0
  );

  // Opacidade do botão: aparece entre 40% e 50%, desaparece entre 75% e 90%
  const buttonOpacity = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.85, 0.9],
    [0, 1, 1, 0]
  );

  // Pointer events: só quando opacidade > 0.1
  const pointerEvents = useTransform(opacity, (v) => (v > 0.1 ? "auto" : "none"));

  // Escala sutil (opcional)
  const scale = useTransform(
    scrollYProgress,
    [0.7, 0.9],
    [1, 0.95]
  );

  return (
    <div ref={containerRef} className="relative" style={{ height: `${totalCards * 100}vh` }}>
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          pointerEvents,
          opacity,
          scale,
        }}
        className="flex items-center justify-center"
      >
        {images.map((img, index) => (
          <MobileStackCard
            key={img.id}
            img={img}
            index={index}
            totalCards={totalCards}
            scrollYProgress={scrollYProgress}
          />
        ))}

        {hasMore && (
          <motion.div
            style={{ opacity: buttonOpacity }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50"
          >
            <button
              onClick={onLoadMore}
              className="group flex items-center gap-3 px-8 py-4 rounded-full border border-[#FFD700]/30 bg-black text-[#FFD700] font-bold hover:bg-[#FFD700] hover:text-black transition-all duration-300 shadow-lg"
            >
              <Icon icon="ph:plus-circle-fill" className="text-xl group-hover:rotate-90 transition-transform" />
              VER MAIS FOTOS
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

type GaleriaScrollBodyProps = {
  visibleImages: GalleryItem[];
  hasMore: boolean;
  texts: GaleriaPayload["textContent"];
  mounted: boolean;
  isMobile: boolean;
  imagesLength: number;
  visibleCount: number;
  onLoadMore: () => void;
};

/** Só monta depois que há imagens — evita useScroll com ref sem elemento no DOM (Motion). */
function GaleriaFotosScrollBody({
  visibleImages,
  hasMore,
  texts,
  mounted,
  isMobile,
  imagesLength,
  visibleCount,
  onLoadMore,
}: GaleriaScrollBodyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -180]);

  const renderTitle = () => {
    const { line1, line2, highlightWords } = texts.title || {};
    if (!line2 || !highlightWords) return <>{line1} <br /> {line2}</>;
    const wordsArray = highlightWords.split(",").map((w) => w.trim());
    const regex = new RegExp(`(${wordsArray.join("|")})`, "gi");
    return (
      <>
        {line1} <br />
        {line2.split(regex).map((part, i) =>
          wordsArray.some((w) => part.toLowerCase() === w.toLowerCase()) ? (
            <span
              key={i}
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#DBB46C] via-[#FFD700] to-[#B8860B]"
            >
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <section ref={containerRef} className="bg-[#020202] relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10 mx-auto py-12 md:py-24">
        {/* HEADER COM MARGEM INFERIOR REDUZIDA */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-16 max-w-3xl mx-auto">
          {texts.badge?.text && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FFD700]/20 bg-[#FFD700]/5 backdrop-blur-md mb-6">
              <Icon icon={texts.badge.icon || "ph:camera-fill"} className="text-[#FFD700] w-4 h-4" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#FFD700] uppercase">
                {texts.badge.text}
              </span>
            </div>
          )}
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            {renderTitle()}
          </h2>
          <p className="text-gray-400 text-lg font-light">{texts.description}</p>
        </div>

        {mounted && (
          <>
            {isMobile ? (
              // MOBILE: STICKY STACK (ativado mais cedo)
              <MobileStack
                images={visibleImages}
                onLoadMore={onLoadMore}
                hasMore={hasMore}
              />
            ) : (
              // DESKTOP: GRID COM PARALLAX
              <>
                <div className="grid grid-cols-3 gap-8 mb-32">
                  {[0, 1, 2].map((colIdx) => (
                    <motion.div
                      key={colIdx}
                      style={{ y: colIdx === 0 ? y1 : colIdx === 1 ? y2 : y3 }}
                      className={`flex flex-col gap-8 ${colIdx === 1 ? 'pt-24' : ''}`}
                    >
                      <AnimatePresence mode="popLayout">
                        {visibleImages.filter((_, i) => i % 3 === colIdx).map((img) => (
                          <motion.div
                            layout
                            key={img.id}
                            className="relative rounded-3xl overflow-hidden group border border-white/5 h-[400px]"
                          >
                            <Image
                              src={img.image}
                              alt={img.alt}
                              fill
                              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                              <span className="text-[#FFD700] text-xs font-bold tracking-widest uppercase">
                                {img.alt}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>

                {/* Botão "Ver mais" no desktop */}
                {hasMore && (
                  <div className="flex justify-center mt-10">
                    <button
                      onClick={onLoadMore}
                      className="group flex items-center gap-3 px-8 py-4 rounded-full border border-[#FFD700]/30 bg-black text-[#FFD700] font-bold hover:bg-[#FFD700] hover:text-black transition-all duration-300"
                    >
                      <Icon icon="ph:plus-circle-fill" className="text-xl group-hover:rotate-90 transition-transform" />
                      VER MAIS FOTOS ({hasMore ? imagesLength - visibleCount : 0} restantes)
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}

// --- COMPONENTE PRINCIPAL ---
export default function GaleriaFotos({ data: dataProp, endpoint }: GaleriaFotosProps) {
  const [mounted, setMounted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);
  const [fetched, setFetched] = useState<GaleriaPayload | null>(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!endpoint) {
      setFetched(null);
      return;
    }
    const url = resolveApiUrl(endpoint);
    if (!url) {
      setFetched(null);
      return;
    }
    let cancelled = false;
    fetch(url)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (cancelled || !json) return;
        setFetched(normalizeGalleryJson(json));
      })
      .catch(() => {
        if (!cancelled) setFetched(null);
      });
    return () => {
      cancelled = true;
    };
  }, [endpoint]);

  const data = fetched ?? dataProp ?? null;

  const { images, texts } = useMemo(() => {
    if (!data) return { images: [] as GalleryItem[], texts: {} as GaleriaPayload["textContent"] };
    return { images: data.data || [], texts: data.textContent || {} };
  }, [data]);

  const visibleImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, images.length));
  };

  if (!images.length) return null;

  return (
    <GaleriaFotosScrollBody
      visibleImages={visibleImages}
      hasMore={hasMore}
      texts={texts}
      mounted={mounted}
      isMobile={isMobile}
      imagesLength={images.length}
      visibleCount={visibleCount}
      onLoadMore={handleLoadMore}
    />
  );
}