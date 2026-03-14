"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
// Se ainda quiser manter o componente GSAP, ele não será mais usado; pode remover a importação
// import StickyStackGallery from "./StickyStackGallery";
// import StickyStackCard from "./StickyStackCard";

// --- TIPAGEM (mantida igual) ---
export interface GalleryItem {
  id: string;
  alt: string;
  image: string;
  span: string;
}

interface TextContent {
  cta?: {
    button?: string;
    cardTitle?: string;
    cardDescription?: string;
  };
  badge?: {
    icon?: string;
    text?: string;
  };
  title?: {
    line1?: string;
    line2?: string;
    highlightWords?: string;
  };
  description?: string;
}

interface GaleriaFotosProps {
  data: {
    data?: GalleryItem[];
    textContent?: TextContent;
  } | null | any;
}

// --- NOVO COMPONENTE PARA MOBILE (STICKY STACKING COM FRAMER-MOTION) ---

const CARD_HEIGHT = 400;      // altura do card
const CARD_GAP = 10;          // espaçamento entre cards na pilha final (ajuste conforme necessário)

function StickyStackCardsMobile({ images }: { images: GalleryItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const totalCards = images.length;

  // Controla se a seção deve estar fixa (enquanto dentro do intervalo)
  const isActive = useTransform(scrollYProgress, [0, 0.01, 0.99, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative" style={{ height: `${totalCards * 100}vh` }}>
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          pointerEvents: isActive ? 'auto' : 'none',
          opacity: isActive,
        }}
        className="flex items-center justify-center"
      >
        {images.map((image, index) => {
          const startRange = index / totalCards;
          const endRange = (index + 1) / totalCards;

          // Posição final centralizada: o card do meio fica com deslocamento 0
          const finalY = (index - (totalCards - 1) / 2) * CARD_GAP;

          const y = useTransform(
            scrollYProgress,
            [startRange, endRange],
            [600, finalY] // sobe de baixo até a posição centralizada
          );

          const scale = useTransform(
            scrollYProgress,
            [endRange, 1],
            [1, 1 - (totalCards - 1 - index) * 0.03]
          );

          const opacity = useTransform(
            scrollYProgress,
            [startRange, startRange + 0.02],
            [0, 1]
          );

          return (
            <motion.div
              key={image.id}
              style={{
                y,
                scale,
                opacity,
                position: 'absolute',
                top: '20%',        // centralizado verticalmente no início
                left: '50%',
                x: '-50%',
                zIndex: index,
              }}
              className="w-full max-w-md px-4"
            >
              <div
                className="relative rounded-3xl shadow-2xl border border-white/10 overflow-hidden"
                style={{ height: CARD_HEIGHT }}
              >
                <Image
                  src={image.image}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <span className="text-white font-bold text-lg">{image.alt}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

// --- COMPONENTE PRINCIPAL (modificado apenas na parte mobile) ---
export default function GaleriaFotos({ data }: GaleriaFotosProps) {
  const containerRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Parallax (apenas desktop)
  const { scrollYProgress } = useScroll({
    target: isClient ? containerRef : undefined,
    offset: ["start start", "end end"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const renderHighlightedText = (text: string, wordsToHighlight: string) => {
    if (!text || !wordsToHighlight) return text;
    const wordsArray = wordsToHighlight.split(',').map(word => word.trim());
    const regex = new RegExp(`(${wordsArray.join('|')})`, 'gi');
    return text.split(regex).map((part, index) => {
      if (wordsArray.some(word => part.toLowerCase() === word.toLowerCase())) {
        return (
          <span
            key={index}
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#DBB46C] via-[#FFD700] to-[#B8860B]"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const processData = (data: any): { images: GalleryItem[]; texts: TextContent } => {
    const result = { images: [] as GalleryItem[], texts: {} as TextContent };
    if (!data) return result;

    if (data.data && Array.isArray(data.data)) {
      result.images = data.data
        .map((item: any) => ({
          id: item.id || '',
          alt: item.alt || '',
          image: item.image || '',
          span: item.span || 'row-span-1',
        }))
        .filter((item: { image: any; }) => item.image);
    }

    if (data.textContent) {
      result.texts = data.textContent;
    }

    return result;
  };

  if (!isClient) {
    return (
      <section className="py-24 bg-[#020202] relative">
        <div className="container px-4 md:px-6 relative z-10 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 min-h-[800px]" />
        </div>
      </section>
    );
  }

  const { images, texts } = processData(data);

  const badgeText = texts?.badge?.text;
  const badgeIcon = texts?.badge?.icon;
  const titleLine1 = texts?.title?.line1;
  const titleLine2 = texts?.title?.line2;
  const highlightWords = texts?.title?.highlightWords;
  const description = texts?.description;
  const ctaButtonText = texts?.cta?.button;
  const ctaCardTitle = texts?.cta?.cardTitle;
  const ctaCardDescription = texts?.cta?.cardDescription;

  if (!images || images.length === 0) return null;

  const hasHeaderContent = badgeText || titleLine1 || titleLine2 || description;

  const col1 = images.slice(0, 3);
  const col2 = images.slice(3, 6);
  const col3 = images.slice(6, 9);

  return (
    <section ref={containerRef} className="py-24 bg-[#020202] relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10 mx-auto">
        {/* HEADER DINÂMICO (mantido igual) */}
        {hasHeaderContent && (
          <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
            {badgeText && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FFD700]/20 bg-[#FFD700]/5 backdrop-blur-md mb-6">
                <Icon icon={badgeIcon || "ph:users-three-fill"} className="text-[#FFD700] w-4 h-4" />
                <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#FFD700] uppercase">
                  {badgeText}
                </span>
              </div>
            )}

            {(titleLine1 || titleLine2) && (
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
                {titleLine1 && <>{titleLine1} <br /></>}
                {titleLine2 && renderHighlightedText(titleLine2, highlightWords || '')}
              </h2>
            )}

            {description && (
              <p className="text-gray-400 text-lg font-light leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}

        {/* RENDERIZAÇÃO CONDICIONAL: MOBILE vs DESKTOP */}
        {isMobile ? (
          // ----- NOVO: STICKY STACKING COM FRAMER-MOTION PARA MOBILE -----
          <StickyStackCardsMobile images={images} />
        ) : (
          /* ----- VERSÃO DESKTOP (masonry com parallax) ----- */
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 py-30 gap-4 md:gap-6 min-h-[800px] overflow-hidden mask-gradient-b">
              {/* COLUNA 1 */}
              <motion.div style={{ y: y1 }} className="flex flex-col gap-4 md:gap-6">
                {col1.map((img) => (
                  <div
                    key={img.id}
                    className={`relative rounded-2xl overflow-hidden group border border-white/5 hover:border-[#FFD700]/30 transition-all duration-500 ${
                      img.span === 'row-span-2' ? 'h-[400px]' : 'h-[250px]'
                    }`}
                  >
                    <Image
                      width={400}
                      height={250}
                      src={img.image}
                      alt={img.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">{img.alt}</span>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* COLUNA 2 */}
              <motion.div style={{ y: y2 }} className="flex flex-col gap-4 md:gap-6 pt-12 md:pt-24">
                {col2.map((img) => (
                  <div
                    key={img.id}
                    className={`relative rounded-2xl overflow-hidden group border border-white/5 hover:border-[#FFD700]/30 transition-all duration-500 ${
                      img.span === 'row-span-2' ? 'h-[450px]' : 'h-[300px]'
                    }`}
                  >
                    <Image
                      width={400}
                      height={300}
                      src={img.image}
                      alt={img.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">{img.alt}</span>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* COLUNA 3 */}
              <motion.div style={{ y: y3 }} className="hidden md:flex flex-col gap-4 md:gap-6">
                {col3.map((img) => (
                  <div
                    key={img.id}
                    className={`relative rounded-2xl overflow-hidden group border border-white/5 hover:border-[#FFD700]/30 transition-all duration-500 ${
                      img.span === 'row-span-3' ? 'h-[500px]' : 'h-[350px]'
                    }`}
                  >
                    <Image
                      width={400}
                      height={350}
                      src={img.image}
                      alt={img.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">{img.alt}</span>
                    </div>
                  </div>
                ))}

                {/* Card Extra de CTA (somente desktop) */}
                {(ctaCardTitle || ctaCardDescription) && (
                  <div className="relative rounded-2xl overflow-hidden bg-[#0A0A0A] border border-[#FFD700]/20 flex flex-col items-center justify-center p-6 text-center h-[300px] group cursor-pointer hover:bg-[#FFD700]/5 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-[#FFD700]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon icon="ph:plus-bold" className="text-[#FFD700] w-6 h-6" />
                    </div>
                    {ctaCardTitle && <h3 className="text-white font-bold text-lg mb-2">{ctaCardTitle}</h3>}
                    {ctaCardDescription && <p className="text-gray-500 text-xs">{ctaCardDescription}</p>}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Fade Bottom (desktop) */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#020202] to-transparent pointer-events-none z-20" />
          </>
        )}

        {/* CTA Button (mantido) */}
        {ctaButtonText && (
          <div className="relative z-30 flex justify-center -mt-10">
            <button className="px-8 py-3 rounded-full border border-white/10 bg-black/50 backdrop-blur-md text-white text-sm font-bold hover:bg-[#FFD700] hover:text-black hover:border-[#FFD700] transition-all duration-300">
              {ctaButtonText}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}