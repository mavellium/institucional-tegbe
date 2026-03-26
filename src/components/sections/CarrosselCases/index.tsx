"use client";

import { useRef, useState, useMemo, useLayoutEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { useApi } from "@/hooks/useApi";

export default function CasesCarousel() {
  const { data: apiRaw, loading } = useApi<any>("cases-alunos");

  const data = useMemo(() => {
    if (!apiRaw) return null;
    // Garante que só retornamos o objeto se ele realmente contiver os depoimentos
    const res = apiRaw?.data?.testimonials ? apiRaw.data : (apiRaw?.testimonials ? apiRaw : null);
    return res;
  }, [apiRaw]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState(0);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 80, damping: 20 });
  const STEP = 380;

  useLayoutEffect(() => {
    if (trackRef.current && wrapperRef.current) {
      setWidth(trackRef.current.scrollWidth - wrapperRef.current.offsetWidth);
    }
  }, [data]);

  if (loading || !data?.testimonials) {
    return (
      <section className="py-24 flex justify-center items-center bg-[#000]">
        <div className="w-8 h-8 border-t-2 border-[#f5df36] rounded-full animate-spin" />
      </section>
    );
  }

  const toggleVideo = (id: string) => {
    setActiveVideoId(prev => (prev === id ? null : id));
  };

  return (
    <section className="py-32 bg-[#000] overflow-hidden selection:bg-[#f5df36]/30">
      <div className="container mx-auto px-6 relative">

        {/* HEADER */}
        <div className="mb-20 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#f5df36]/20 bg-[#f5df36]/5 mb-8"
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
            className="text-4xl md:text-6xl font-semibold text-white tracking-tighter mb-6 max-w-4xl"
          >
            {data.titulo}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl font-light max-w-2xl leading-relaxed"
          >
            {data.subtitulo}
          </motion.p>
        </div>

        {/* CAROUSEL CONTAINER */}
        <div className="relative">
          {/* CONTROLS - Apple Minimalist */}
          <div className="absolute -top-16 right-4 flex gap-3 z-30">
            <button onClick={() => x.set(Math.min(x.get() + STEP, 0))} className="nav-btn">
              <Icon icon="ph:arrow-left-light" />
            </button>
            <button onClick={() => x.set(Math.max(x.get() - STEP, -width))} className="nav-btn">
              <Icon icon="ph:arrow-right-light" />
            </button>
          </div>

          <motion.div ref={wrapperRef} className="cursor-grab active:cursor-grabbing overflow-visible">
            <motion.div
              ref={trackRef}
              drag="x"
              dragConstraints={{ left: -width, right: 0 }}
              style={{ x: springX }}
              className="flex gap-10 w-max px-4"
            >
              {data?.testimonials?.map((item: any) => {
                const isThisActive = activeVideoId === item.id;
                const isAnythingActive = activeVideoId !== null;
                const isDimmed = isAnythingActive && !isThisActive;

                return (
                  <motion.div
                    key={item.id}
                    animate={{
                      scale: isThisActive ? 1.02 : 1,
                      opacity: isDimmed ? 0.3 : 1,
                      filter: isDimmed ? "blur(4px) grayscale(100%)" : "blur(0px) grayscale(0%)"
                    }}
                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                    className="w-[350px] h-[550px] flex-shrink-0 relative rounded-[40px] overflow-hidden bg-[#0a0a0a] border border-white/10"
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
                          ref={el => { if (el) isThisActive ? el.play() : el.pause(); }}
                        />

                        {/* Shadow Overlays */}
                        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-700 ${isThisActive ? 'opacity-0' : 'opacity-100'}`} />
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

                        {/* INFO - Desaparece se ativo */}
                        <AnimatePresence>
                          {!isThisActive && (
                            <motion.div
                              exit={{ opacity: 0, y: 20 }}
                              className="absolute inset-0 p-10 flex flex-col justify-end z-10"
                            >
                              <p className="text-lg font-light text-white/90 leading-tight mb-6 line-clamp-4">
                                "{item.description}"
                              </p>
                              <div className="flex flex-col">
                                <span className="text-[#f5df36] text-[11px] font-bold tracking-widest uppercase mb-1">
                                  {item.clientName}
                                </span>
                                <span className="text-gray-500 text-[10px] uppercase tracking-tighter">
                                  {item.clientRole}
                                </span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* PLAY BUTTON - Estilo Apple Glass */}
                        <button
                          onClick={() => toggleVideo(item.id)}
                          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40
                            w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500
                            ${isThisActive
                              ? "bg-white/5 opacity-0 hover:opacity-100 backdrop-blur-md"
                              : "bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl opacity-100 hover:scale-110"
                            }`}
                        >
                          <Icon
                            icon={isThisActive ? "ph:pause-fill" : "ph:play-fill"}
                            className={`text-2xl ${isThisActive ? 'text-white' : 'text-[#f5df36]'}`}
                          />
                        </button>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .nav-btn {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 99px;
          background: #0a0a0a;
          border: 1px solid rgba(255,255,255,0.08);
          color: #fff;
          font-size: 1.25rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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