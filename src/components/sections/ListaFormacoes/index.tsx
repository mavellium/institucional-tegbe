"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import Link from "next/link";
import ModuleCard from "@/components/ui/moduleCard";
import { RichTextItem } from "@/types/richText.type";
import { IButton } from "@/interface/button/IButton";
import { Button } from "@/components/ui/button/button";
import Heading from "@/components/ui/heading";
import Paragrafo from "@/components/ui/paragrafo";
import RichText from "@/components/ui/rich/richText";

/* =========================
   TYPES
========================= */
export interface CourseModule {
  id: string;
  phase: string;
  title: RichTextItem[];
  description: RichTextItem[];
  tags: string[];
  icon: string;
}

interface ConfigData {
  theme: { accentColor: string; secondaryColor: string };
  header: {
    badge: string;
    title: RichTextItem[];
    subtitle: RichTextItem[];
  };
  modules: CourseModule[];
  button: IButton;
}

/* =========================
   COMPONENT
========================= */
export default function CourseModules({ data }: { data: ConfigData | null }) {
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true, margin: "200px" });

  if (!data) {
    return (
      <section
        ref={ref}
        className="py-24 bg-[#020202] min-h-[600px] flex items-center justify-center"
      >
        <div className="w-6 h-6 border-2 border-[#FFD700] border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  const accent = data.theme.accentColor;

  return (
    <section
      ref={ref}
      className="py-24 bg-[#020202] relative overflow-hidden border-t border-white/5"
    >
      {/* BG */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10 max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-20 space-y-6">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border backdrop-blur-md"
            style={{
              borderColor: `${accent}4D`,
              backgroundColor: `${accent}0D`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: accent }}
            />
            <span
              className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase"
              style={{ color: accent }}
            >
              {data.header.badge}
            </span>
          </div>

          {/* ✅ HEADING CORRETO */}
          <Heading size="xl" color="#FFFFFF">
            <RichText content={data.header.title} />
          </Heading>

          {/* ✅ PARAGRAFO CORRETO */}
          <Paragrafo color="#9CA3AF" className="max-w-2xl mx-auto text-lg">
            <RichText content={data.header.subtitle} />
          </Paragrafo>
        </div>

        {/* TIMELINE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="relative"
        >
          {/* LINHA */}
          <div className="absolute left-[28px] md:left-[50%] top-0 bottom-0 w-px bg-white/5 transform md:-translate-x-1/2 hidden md:block">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="w-full h-full"
              style={{
                background: `linear-gradient(to bottom, transparent, ${accent}, ${accent}, transparent)`,
                boxShadow: `0 0 10px ${accent}`,
                transformOrigin: "top",
              }}
            />
          </div>

          {/* MODULES */}
          <div className="space-y-16">
            {data.modules.map((module, index) => (
              <ModuleCard key={module.id} module={module} index={index} accent={accent} />
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <div className="flex justify-center mt-24">
          {data.button.action === "link" && (
            <Button className="px-8 py-4 uppercase tracking-widest text-xs font-bold w-fit">
              <Link href={data.button.link}>{data.button.label}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
