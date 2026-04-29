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
      className="relative py-32 bg-neutral-50 selection:bg-neutral-900 selection:text-white"
    >
      <Textura opacity={0.03} className="absolute inset-0 pointer-events-none mix-blend-multiply" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          {header?.preTitle && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary mb-6 border border-primary/10"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest">{header.preTitle}</span>
            </motion.div>
          )}

          {header?.title && (
            <Heading
              align="center"
              as="h2"
              className="text-5xl md:text-6xl font-semibold tracking-tight text-neutral-900 mb-6 leading-tight"
            >
              <RichText content={header.title} />
            </Heading>
          )}

          {header?.subtitle && (
            <div className="text-lg md:text-xl text-neutral-500 font-normal max-w-2xl leading-relaxed">
              <RichText content={header.subtitle} />
            </div>
          )}
        </div>

        {/* VIDEO PLAYER COM LÓGICA DE PLAY/PAUSE DINÂMICO */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          // Ao entrar na tela: Play
          onViewportEnter={() => {
            videoRef.current?.play().catch(() => {});
          }}
          // Ao sair da tela: Pause
          onViewportLeave={() => {
            videoRef.current?.pause();
          }}
          // amount: 0.2 define que quando 20% do elemento sair/entrar, a ação dispara
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl mx-auto mb-16 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)] bg-black"
        >
          {videoSource ? (
            <div className="aspect-video w-full">
              <video
                ref={videoRef}
                src={videoSource}
                controls
                playsInline
                muted
                loop
                className="w-full h-full object-cover"
                title={videoFile?.alt}
              >
                Seu navegador não suporta a reprodução de vídeos.
              </video>
            </div>
          ) : (
            <div className="aspect-video w-full bg-neutral-100 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-neutral-400">
                <div className="w-16 h-16 rounded-full bg-neutral-200 flex items-center justify-center">
                  <FaYoutube size={28} />
                </div>
                <span className="text-sm">Vídeo não configurado no CMS</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* CTA + MODAL */}
        {button && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex justify-center mt-4 relative z-10"
          >
            <div ref={ctaRef} className="relative">
              <Button
                variant={button.variant}
                onClick={() => setModalOpen((prev) => !prev)}
                className="h-14 px-10 text-base font-medium shadow-lg hover:shadow-primary/20 transition-all hover:-translate-y-0.5"
              >
                {button.label}
              </Button>

              <AnimatePresence>
                {modalOpen && (
                  <motion.div
                    ref={modalRef}
                    initial={{ opacity: 0, x: -8, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -8, scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    className="absolute top-0 left-[calc(100%+12px)] w-72 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-neutral-100 z-50 overflow-hidden"
                  >
                    <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100">
                      <span className="text-sm font-semibold text-neutral-800">
                        {modal?.title ?? "Redes Sociais"}
                      </span>
                      <button
                        onClick={closeModal}
                        className="w-7 h-7 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors"
                      >
                        <FiX size={14} className="text-neutral-500" />
                      </button>
                    </div>

                    {modal?.image?.url && (
                      <div className="relative w-full h-36 overflow-hidden">
                        <Image
                          src={modal.image.url}
                          alt={modal.image.alt ?? ""}
                          fill
                          className="object-cover"
                          sizes="288px"
                        />
                      </div>
                    )}

                    <div className="px-3 py-2 border-b border-neutral-100">
                      <div className="flex items-center gap-2 bg-neutral-50 rounded-lg px-3 py-2">
                        <FiSearch size={14} className="text-neutral-400 shrink-0" />
                        <input
                          type="text"
                          placeholder={modal?.searchPlaceholder ?? "Pesquisar..."}
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="flex-1 bg-transparent text-sm text-neutral-700 placeholder:text-neutral-400 outline-none"
                        />
                      </div>
                    </div>

                    <div className="overflow-y-auto max-h-60 py-1">
                      {filteredSocials.length > 0 ? (
                        filteredSocials.map((s) => {
                          const IconComponent = ICON_MAP[s.name] || FaInstagram;
                          const color = BRAND_COLORS[s.name] || "#000";
                          return (
                            <div
                              key={s.name}
                              className="flex items-center gap-3 px-4 py-2.5 hover:bg-neutral-50 transition-colors cursor-default"
                            >
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                style={{ color, background: `${color}18` }}
                              >
                                <IconComponent size={16} />
                              </div>
                              <span className="text-sm font-medium text-neutral-800">{s.name}</span>
                            </div>
                          );
                        })
                      ) : (
                        <div className="px-4 py-6 text-center text-sm text-neutral-400">
                          Nenhuma rede encontrada
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
