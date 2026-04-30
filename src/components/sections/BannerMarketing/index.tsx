"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Heading from "@/components/ui/heading";
import RichText from "@/components/ui/rich/richText";
import Textura from "@/components/ui/textura";
import { Button } from "@/components/ui/button/button";
import { RichTextItem } from "@/types/richText.type";
import { IButton } from "@/interface/button/IButton";

import {
  FaInstagram,
  FaTiktok,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaPinterestP,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import { FiSearch, FiX } from "react-icons/fi";
import Image from "next/image";

const ICON_MAP: Record<string, React.ElementType> = {
  Instagram: FaInstagram,
  TikTok: FaTiktok,
  Facebook: FaFacebookF,
  YouTube: FaYoutube,
  LinkedIn: FaLinkedinIn,
  Pinterest: FaPinterestP,
  WhatsApp: FaWhatsapp,
  "Twitter/X": FaXTwitter,
};

const BRAND_COLORS: Record<string, string> = {
  Instagram: "#E1306C",
  TikTok: "#000000",
  Facebook: "#1877F2",
  YouTube: "#FF0000",
  LinkedIn: "#0A66C2",
  Pinterest: "#E60023",
  WhatsApp: "#25D366",
  "Twitter/X": "#000000",
};

interface Social {
  name: string;
  gradient: string;
}

interface IMarketing {
  header: {
    preTitle?: string;
    title: RichTextItem[];
    subtitle: RichTextItem[];
  };
  socials: Social[];
  button?: IButton;
  videoFile?: {
    alt?: string;
    url?: string;
    videoSrc?: string;
  };
  modal?: {
    title?: string;
    searchPlaceholder?: string;
    image?: {
      url: string;
      alt?: string;
    };
  };
}

export default function MarketingSection({ data }: { data: IMarketing | null }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ctaRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setSearch("");
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const handleMouseDown = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        ctaRef.current &&
        !ctaRef.current.contains(e.target as Node)
      ) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [modalOpen, closeModal]);

  if (!data) return null;

  const { header, socials = [], button, videoFile, modal } = data;
  const videoSource = videoFile?.videoSrc;

  const filteredSocials = socials.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section
      id="marketing"
      className="relative min-h-[80vh] flex items-center justify-center py-32 overflow-hidden bg-black selection:bg-white selection:text-black"
    >
      {/* VIDEO BACKGROUND CONTAINER */}
      <div className="absolute inset-0 z-0">
        {videoSource ? (
          <>
            <video
              ref={videoRef}
              src={videoSource}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-60"
            />
            {/* Overlay para contraste */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          </>
        ) : (
          <div className="w-full h-full bg-neutral-900" />
        )}
        <Textura
          opacity={0.05}
          className="absolute inset-0 pointer-events-none mix-blend-overlay"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center">
        {/* HEADER */}
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          {header?.preTitle && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white mb-8 border border-white/20 backdrop-blur-md"
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">
                {header.preTitle}
              </span>
            </motion.div>
          )}

          {header?.title && (
            <Heading
              align="center"
              as="h2"
              className="text-5xl md:text-7xl font-black tracking-tight !text-white mb-8 leading-[1.1]"
            >
              <RichText content={header.title} />
            </Heading>
          )}

          {header?.subtitle && (
            <div className="text-lg md:text-2xl text-white/80 font-medium max-w-3xl leading-relaxed mb-12">
              <RichText content={header.subtitle} />
            </div>
          )}

          {/* CTA + MODAL */}
          {button && (
            <div className="relative z-20">
              <div ref={ctaRef} className="relative inline-block">
                <Button
                  variant={button.variant}
                  onClick={() => setModalOpen((prev) => !prev)}
                  className="h-16 px-12 text-lg font-bold bg-green-500 text-neutral-950 hover:bg-green-400 shadow-[0_10px_40px_rgba(34,197,94,0.3)] hover:shadow-[0_20px_50px_rgba(34,197,94,0.5)] transition-all hover:-translate-y-1 rounded-2xl"
                >
                  {button.label}
                </Button>

                <AnimatePresence>
                  {modalOpen && (
                    <motion.div
                      ref={modalRef}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="absolute bottom-[calc(100%+20px)] left-1/2 -translate-x-1/2 md:left-[calc(100%+20px)] md:bottom-0 md:translate-x-0 w-[320px] bg-white rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.4)] border border-neutral-100 z-50 overflow-hidden text-left"
                    >
                      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
                        <span className="text-base font-bold text-neutral-900">
                          {modal?.title ?? "Redes Sociais"}
                        </span>
                        <button
                          onClick={closeModal}
                          className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors"
                        >
                          <FiX size={18} className="text-neutral-500" />
                        </button>
                      </div>

                      {modal?.image?.url && (
                        <div className="relative w-full h-40 overflow-hidden">
                          <Image
                            src={modal.image.url}
                            alt={modal.image.alt ?? ""}
                            fill
                            className="object-cover"
                            sizes="320px"
                          />
                        </div>
                      )}

                      <div className="px-4 py-3 border-b border-neutral-100 bg-neutral-50/50">
                        <div className="flex items-center gap-2 bg-white border border-neutral-200 rounded-xl px-3 py-2.5">
                          <FiSearch size={16} className="text-neutral-400 shrink-0" />
                          <input
                            type="text"
                            placeholder={modal?.searchPlaceholder ?? "Pesquisar..."}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1 bg-transparent text-sm text-neutral-800 placeholder:text-neutral-400 outline-none"
                          />
                        </div>
                      </div>

                      <div className="overflow-y-auto max-h-72 p-2">
                        {filteredSocials.length > 0 ? (
                          filteredSocials.map((s) => {
                            const IconComponent = ICON_MAP[s.name] || FaInstagram;
                            const color = BRAND_COLORS[s.name] || "#000";
                            return (
                              <div
                                key={s.name}
                                className="flex items-center gap-4 px-3 py-3 hover:bg-neutral-50 rounded-xl transition-all cursor-pointer group"
                              >
                                <div
                                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                                  style={{ color, background: `${color}12` }}
                                >
                                  <IconComponent size={20} />
                                </div>
                                <span className="text-sm font-bold text-neutral-800">{s.name}</span>
                              </div>
                            );
                          })
                        ) : (
                          <div className="px-4 py-8 text-center text-sm text-neutral-400">
                            Nenhuma rede encontrada
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
