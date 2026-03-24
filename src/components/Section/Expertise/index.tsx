"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import Link from "next/link";

// Hooks
import { useApi } from "@/hooks/useApi";
import { IButton } from "@/interface/button/IButton";
import { RichTextItem } from "@/types/richText.type";

// UI
import Heading from "@/components/ui/heading";
import RichText from "@/components/ui/rich/richText";
import Paragrafo from "@/components/ui/paragrafo";
import { Button } from "@/components/ui/button/button";

// --- INTERFACE ---
export interface ExpertiseData {
  theme: {
    accentColor: string;
    secondaryColor: string;
  };
  header: {
    badgeIcon: string;
    badgeText: string;
    title: RichTextItem[];
  };
  visual: {
    imageSrc: string;
    imageAlt: string;
    floatingCard: {
      icon: string;
      title: string;
      subtitle: string;
    };
  };
  content: {
    paragraphs: RichTextItem[][];
  };
  button: IButton;
}

interface ExpertiseProps {
  endpoint: string;
}

export default function Expertise({ endpoint }: ExpertiseProps) {
  const { data, loading } = useApi<ExpertiseData>(endpoint);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCtaClick = (e: React.MouseEvent) => {
    if (data?.button?.action === "form") {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  if (loading || !data) {
    return (
      <div className="h-[70vh] bg-[#020202] flex items-center justify-center">
        <Icon
          icon="eos-icons:loading"
          className="w-10 h-10 text-[#E31B63] animate-spin"
        />
      </div>
    );
  }

  const { theme, header, visual, content, button } = data;

  return (
    <>
      <section className="relative py-24 px-4 sm:px-8 lg:px-10 bg-[#020202] flex justify-center items-center border-t border-white/5 overflow-hidden font-sans">
        
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[120px] pointer-events-none opacity-10 transition-colors duration-1000"
          style={{ backgroundColor: theme.accentColor }}
        />

        <div className="mx-auto relative max-w-[1400px] z-10 flex flex-col items-center">

          {/* BADGE */}
          <div
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-opacity-10 backdrop-blur-md"
            style={{
              borderColor: `${theme.accentColor}4D`,
              backgroundColor: `${theme.accentColor}1A`,
            }}
          >
            <Icon
              icon={header.badgeIcon}
              className="w-5 h-5"
              style={{ color: theme.accentColor }}
            />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white">
              {header.badgeText}
            </span>
          </div>

          {/* TITLE */}
          <Heading align="center" color="#fff" className="mb-12 text-center text-white max-w-4xl text-4xl md:text-6xl font-bold">
            <RichText content={header.title} />
          </Heading>

          {/* IMAGE */}
          <div className="relative rounded-3xl overflow-hidden w-full max-w-[1200px] group border border-white/10 bg-[#0A0A0A]">
            <Image
              src={visual.imageSrc}
              alt={visual.imageAlt}
              width={1376}
              height={774}
              className="w-full h-auto object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-70" />

            <div
              className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-xl hidden sm:flex items-center gap-4"
              style={{ borderColor: `${theme.accentColor}33` }}
            >
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: theme.accentColor }}
              >
                <Icon icon={visual.floatingCard.icon} className="w-6 h-6 text-black" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">
                  {visual.floatingCard.title}
                </p>
                <p className="text-xs" style={{ color: theme.accentColor }}>
                  {visual.floatingCard.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* TEXT */}
          <div className="mt-16 max-w-4xl text-center flex flex-col gap-6 px-5">
            {content.paragraphs.map((paragraph, i) => (
              <Paragrafo align="center"  color="#fff" key={i} className="text-gray-300 text-lg md:text-xl">
                <RichText content={paragraph} />
              </Paragrafo>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 flex justify-center">
            {button.action === "form" ? (
              <Button onClick={handleCtaClick}>
                {button.label}
              </Button>
            ) : (
              <Link href={button.link || "#"}>
                <Button>
                  {button.label}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* MODAL */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isModalOpen && button.action === "form" && (
              <motion.div
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80"
                onClick={() => setIsModalOpen(false)}
              >
                <motion.div
                  className="bg-zinc-900 p-8 rounded-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  {button.form_html ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: button.form_html }}
                    />
                  ) : (
                    <p>Formulário não configurado</p>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}