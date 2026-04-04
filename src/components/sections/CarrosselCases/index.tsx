"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Icon } from "@iconify/react";

export default function CasesCarousel({ data: apiRaw }: { data: any }) {
  const data = useMemo(() => {
    if (!apiRaw) return null;
    const res = apiRaw?.data?.testimonials ? apiRaw.data : apiRaw?.testimonials ? apiRaw : null;
    return res;
  }, [apiRaw]);

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Detecção se a seção inteira está na tela
  const isSectionInView = useInView(sectionRef, { margin: "-20% 0px" });

  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);

  // Inicializa o primeiro vídeo como ativo APENAS no mobile
  useEffect(() => {
    if (data?.testimonials?.length > 0 && !activeVideoId) {
      // Verifica se a tela é menor que 768px (Mobile)
      if (window.innerWidth < 768) {
        setActiveVideoId(data.testimonials[0].id);
      }
    }
  }, [data, activeVideoId]);

  // Espião de Scroll: Descobre qual vídeo está no meio da tela e ativa ele
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const track = e.currentTarget;
    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;

    let closestId: string | null = null;
    let minDistance = Infinity;

    // Procura todos os cards e vê qual está mais perto do centro da tela
    const cards = track.querySelectorAll(".carousel-card");
    cards.forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(trackCenter - cardCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestId = card.getAttribute("data-id");
      }
    });

    // Se encontrou um novo card no centro, ativa ele automaticamente
    if (closestId) {
      setActiveVideoId((prev) => {
        if (prev !== closestId) {
          setIsManuallyPaused(false); // Dá play automático no novo vídeo central
          return closestId;
        }
        return prev;
      });
    }
  };

  const toggleVideo = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    if (activeVideoId === id) {
      // Se clicou no vídeo já ativo, apenas pausa ou despausa
      setIsManuallyPaused(!isManuallyPaused);
    } else {
      // Se clicou num vídeo lateral, ativa ele e centraliza na tela
      setActiveVideoId(id);
      setIsManuallyPaused(false);
      e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  };

  if (!data?.testimonials) return null;

  const handleNext = () => {
    if (trackRef.current) {
      const scrollAmount = window.innerWidth < 768 ? window.innerWidth * 0.8 : 380 + 40;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (trackRef.current) {
      const scrollAmount = window.innerWidth < 768 ? window.innerWidth * 0.8 : 380 + 40;
      trackRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 bg-[#000] overflow-hidden selection:bg-[#f5df36]/30"
    >
      <div className="container mx-auto px-4 md:px-6 relative">
        {/* HEADER */}
        <div className="mb-16 md:mb-20 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#f5df36]/20 bg-[#f5df36]/5 mb-6 md:mb-8"
          >
            <span className="w-1.5 h-1.5 bg-[#f5df36] rounded-full animate-pulse" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#f5df36] font-bold">
              {data.badge}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-6xl font-semibold text-white tracking-tighter mb-4 md:mb-6 max-w-4xl leading-tight"
          >
            {data.titulo}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-base sm:text-lg md:text-xl font-light max-w-2xl leading-relaxed"
          >
            {data.subtitulo}
          </motion.p>
        </div>

        {/* CAROUSEL CONTAINER */}
        <div className="relative">
          {/* CONTROLS */}
          <div className="hidden md:flex absolute -top-16 right-4 gap-3 z-30">
            <button onClick={handlePrev} className="nav-btn">
              <Icon icon="ph:arrow-left-light" />
            </button>
            <button onClick={handleNext} className="nav-btn">
              <Icon icon="ph:arrow-right-light" />
            </button>
          </div>

          {/* TRACK - Com evento onScroll detectando mudanças */}
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="flex gap-6 md:gap-10 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 px-4 sm:px-8 md:px-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="md:hidden shrink-0 w-[5vw]" />

            {data?.testimonials?.map((item: any) => {
              const isThisActive = activeVideoId === item.id;
              // Regra: Ativo E Não pausado manualmente E Seção visível na tela
              const isPlaying = isThisActive && !isManuallyPaused && isSectionInView;

              // Só escurece o vídeo se já existir um vídeo ativo e NÃO for este.
              const isDimmed = activeVideoId !== null && !isThisActive;
              // Mantém o tamanho original se nenhum estiver ativo ainda.
              const cardScale = activeVideoId === null || isThisActive ? "scale(1)" : "scale(0.96)";

              return (
                <div
                  key={item.id}
                  data-id={item.id}
                  onClick={(e) => toggleVideo(item.id, e)}
                  className="carousel-card snap-center shrink-0 w-[80vw] sm:w-[350px] transition-all duration-500 ease-out cursor-pointer"
                >
                  <div
                    style={{
                      transform: cardScale,
                      opacity: isDimmed ? 0.4 : 1,
                      filter: isDimmed ? "grayscale(80%)" : "grayscale(0%)",
                    }}
                    className="w-full h-[60vh] sm:h-[550px] relative rounded-3xl md:rounded-[40px] overflow-hidden bg-[#111] border border-white/10 shadow-2xl transition-all duration-500"
                  >
                    {item.type === "video" && (
                      <div className="relative w-full h-full group">
                        <video
                          src={item.src}
                          poster={item.poster}
                          playsInline
                          loop
                          muted={!isThisActive}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          ref={(el) => {
                            if (!el) return;
                            if (isPlaying) {
                              el.play().catch(() => {});
                            } else {
                              el.pause();
                            }
                          }}
                        />

                        {/* Shadow Overlays */}
                        <div
                          className={`absolute inset-0 bg-black/40 transition-opacity duration-700 ${
                            isPlaying ? "opacity-0" : "opacity-100"
                          }`}
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                        {/* INFO */}
                        <AnimatePresence>
                          {!isPlaying && (
                            <motion.div
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end z-10 pointer-events-none"
                            >
                              <p className="text-base md:text-lg font-light text-white/90 leading-snug mb-4 md:mb-6 line-clamp-4">
                                &quot;{item.description}&quot;
                              </p>
                              <div className="flex flex-col">
                                <span className="text-[#f5df36] text-[10px] md:text-[11px] font-bold tracking-widest uppercase mb-1">
                                  {item.clientName}
                                </span>
                                <span className="text-gray-400 text-[10px] uppercase tracking-tighter">
                                  {item.clientRole}
                                </span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* PLAY BUTTON (Agora é só visual, pois o clique está no card inteiro) */}
                        <div
                          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40
                            w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-500 pointer-events-none
                            ${
                              isPlaying
                                ? "bg-white/5 opacity-0 backdrop-blur-md"
                                : "bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl opacity-100 scale-100 group-hover:scale-110"
                            }`}
                        >
                          <Icon
                            icon={isPlaying ? "ph:pause-fill" : "ph:play-fill"}
                            className={`text-xl md:text-2xl ${
                              isPlaying ? "text-white" : "text-[#f5df36]"
                            }`}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="md:hidden shrink-0 w-[5vw]" />
          </div>

          {/* Controles Mobile */}
          <div className="md:hidden flex justify-center gap-4 mt-6">
            <button onClick={handlePrev} className="nav-btn">
              <Icon icon="ph:arrow-left-light" />
            </button>
            <button onClick={handleNext} className="nav-btn">
              <Icon icon="ph:arrow-right-light" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .nav-btn {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 99px;
          background: #0a0a0a;
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #fff;
          font-size: 1.25rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @media (min-width: 768px) {
          .nav-btn {
            width: 48px;
            height: 48px;
          }
        }
        .nav-btn:hover {
          background: #f5df36;
          color: #000;
          border-color: #f5df36;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}
