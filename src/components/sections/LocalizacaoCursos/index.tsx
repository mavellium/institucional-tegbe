"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { sanitizeFormHtml } from "@/core/security";

import Heading from "@/components/ui/heading";
import Paragrafo from "@/components/ui/paragrafo";
import { IButton } from "@/interface/button/IButton";
import { RichTextItem } from "@/types/richText.type";
import RichText from "@/components/ui/rich/richText";

interface Location {
  id: string | number;
  city: string;
  role: string;
  description: string;
  features: string[];
  address: string;
  mapLink: string;
  images: string[];
}

interface LocationsConfig {
  theme: { accentColor: string };
  header: {
    badge: string;
    title: RichTextItem[];
    subtitle: RichTextItem[];
  };
  locations: Location[];
  button: IButton;
}

export default function LocationsSection({ data }: { data: LocationsConfig | null }) {
  const [activeLoc, setActiveLoc] = useState<Location | null>(data?.locations[0] ?? null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // sync activeLoc when data arrives

  useEffect(() => {
    if (data && !activeLoc) {
      setActiveLoc(data.locations[0]);
    }
  }, [data, activeLoc]);

  const handleCtaClick = (e: React.MouseEvent) => {
    if (data?.button?.action === "form") {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  if (!data || !activeLoc) {
    return (
      <div className="h-[700px] bg-[#020202] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const accent = data.theme?.accentColor || "#FFFFFF";

  return (
    <>
      <section className="relative py-24 bg-[#050505] overflow-hidden font-sans border-t border-white/5">
        {/* BG */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

        <div className="container px-4 md:px-6 relative z-10 max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="flex flex-col items-center text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
              <span className="text-[10px] tracking-[0.2em] text-white/70 uppercase">
                {data.header.badge}
              </span>
            </motion.div>

            <Heading color="#FFF" align="center" size="lg" className="text-white mb-4">
              <RichText content={data.header.title} />
            </Heading>

            <Paragrafo color="#FFF" align="center" className="text-gray-400 max-w-lg">
              <RichText content={data.header.subtitle} />
            </Paragrafo>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white/[0.02] rounded-[2.5rem] border border-white/10 overflow-hidden backdrop-blur-2xl shadow-2xl">
            {/* SIDEBAR */}
            <div className="lg:col-span-4 flex flex-col border-r border-white/10 bg-black/20">
              <div className="p-6 border-b border-white/5">
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
                  Unidades Operacionais
                </span>
              </div>

              <div className="flex flex-col">
                {data.locations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setActiveLoc(loc)}
                    className={`relative p-8 text-left transition-all duration-500 ${
                      activeLoc.id === loc.id ? "bg-white/[0.05]" : "hover:bg-white/[0.02]"
                    }`}
                  >
                    <Heading
                      size="sm"
                      color="#FFF"
                      className={activeLoc.id === loc.id ? "text-white" : "text-gray-500"}
                    >
                      {loc.city}
                    </Heading>

                    <Paragrafo color="#FFF" className="text-xs mt-1">
                      {loc.role}
                    </Paragrafo>
                  </button>
                ))}
              </div>

              {/* ADDRESS */}
              <div className="mt-auto p-8 border-t border-white/5">
                <Paragrafo color="#FFF" className="text-xs text-gray-400">
                  {activeLoc.address}
                </Paragrafo>

                <Link
                  href={activeLoc.mapLink}
                  target="_blank"
                  className="inline-flex items-center gap-2 text-[11px] font-bold text-white uppercase mt-4"
                >
                  Abrir no Google Maps
                  <Icon icon="ph:arrow-up-right" />
                </Link>
              </div>
            </div>

            {/* VISOR DE IMERSÃO (CARROSSEL) */}
            <div className="lg:col-span-8 relative h-[450px] lg:h-[650px] bg-[#020202]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLoc.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full w-full"
                >
                  <Swiper
                    modules={[Pagination, Autoplay, EffectFade, Navigation]}
                    effect="fade"
                    speed={1000}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    navigation={{ nextEl: ".s-next", prevEl: ".s-prev" }}
                    className="h-full w-full location-swiper"
                  >
                    {activeLoc.images.map((img, i) => (
                      <SwiperSlide key={i}>
                        <div className="relative h-full w-full overflow-hidden">
                          <Image
                            src={img}
                            alt={activeLoc.city}
                            fill
                            className="object-cover transition-transform duration-[15s] scale-105 group-hover:scale-110"
                            priority={i === 0}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* NAV CONTROLS - EXCLUSIVIDADE MAVELLIUM */}
                  <div className="absolute bottom-8 right-8 z-30 flex gap-3">
                    <button className="s-prev w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-black/40 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-300">
                      <Icon icon="ph:caret-left-bold" className="w-5 h-5" />
                    </button>
                    <button className="s-next w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-black/40 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-300">
                      <Icon icon="ph:caret-right-bold" className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <style jsx global>{`
              .location-swiper .swiper-pagination-bullet {
                background: white !important;
                opacity: 0.2;
                width: 8px;
                height: 8px;
              }
              .location-swiper .swiper-pagination-bullet-active {
                opacity: 1;
                width: 24px;
                border-radius: 4px;
                transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
              }
              .location-swiper .swiper-pagination {
                bottom: 32px !important;
                left: 32px !important;
                text-align: left !important;
                width: auto !important;
              }
            `}</style>
          </div>

          {/* CTA (SEU DESIGN ORIGINAL, SÓ TROCOU ESTRUTURA) */}
          <div className="mt-20 text-center">
            {data.button.action === "form" ? (
              <button
                onClick={handleCtaClick}
                className="inline-flex items-center gap-6 px-12 py-6 rounded-full bg-white text-black font-bold uppercase text-[10px] tracking-[0.2em] hover:scale-105 hover:bg-gray-100 transition-all active:scale-95 shadow-2xl shadow-white/5"
              >
                {data.button.label}
                {data.button.icon && <Icon icon={data.button.icon} className="w-4 h-4" />}
              </button>
            ) : (
              <Link
                href={data.button.link || "#"}
                target={data.button.target || "_self"}
                className="inline-flex items-center gap-6 px-12 py-6 rounded-full bg-white text-black font-bold uppercase text-[10px] tracking-[0.2em] hover:scale-105 hover:bg-gray-100 transition-all active:scale-95 shadow-2xl shadow-white/5"
              >
                {data.button.label}
                {data.button.icon && <Icon icon={data.button.icon} className="w-4 h-4" />}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* MODAL */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {data.button.action === "form" && isModalOpen && data.button.form_html && (
              <motion.div
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
                onClick={() => setIsModalOpen(false)}
              >
                <motion.div
                  className="bg-white p-6 rounded-2xl max-w-lg w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: sanitizeFormHtml(data.button.form_html),
                    }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
