"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Heading from "./heading";
import RichText from "./rich/richText";
import Paragrafo from "./paragrafo";
import { Icon } from "@iconify/react";
import { CourseModule } from "../web/formacoes";

interface Props {
  module: CourseModule;
  index: number;
  accent: string;
}

export default function ModuleCard({ module, index, accent }: Props) {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-120px",
  });

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.08,
      }}
      className={`relative flex flex-col md:flex-row items-center gap-8 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* CARD */}
      <div className="w-full md:w-1/2">
        <div
          className="group relative p-8 rounded-2xl bg-[#0A0A0A] border border-white/5 shadow-xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
          style={{
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          }}
        >
          {/* 🔥 HOVER BORDER */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              border: `1px solid ${accent}`,
              boxShadow: `0 0 20px ${accent}40`,
            }}
          />

          {/* 🔥 GLOW INTERNO */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at top left, ${accent}1A, transparent)`,
            }}
          />

          {/* 🔥 NÚMERO (CORRIGIDO) */}
          <div className="absolute top-4 right-4 text-5xl font-black text-white/[0.05] select-none pointer-events-none">
            {module.id}
          </div>

          {/* CONTENT */}
          <div className="relative z-10">
            <span
              className="text-[10px] font-bold uppercase tracking-widest mb-2 block"
              style={{ color: accent }}
            >
              {module.phase}
            </span>

            <Heading as="h3" size="md" color="#FFFFFF" className="mb-4">
              <RichText content={module.title} />
            </Heading>

            <Paragrafo color="#9CA3AF" className="text-sm mb-6">
              <RichText content={module.description} />
            </Paragrafo>

            <div className="flex flex-wrap gap-2">
              {module.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-[9px] uppercase bg-white/5 border border-white/10 text-gray-500 rounded transition-colors group-hover:text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ICON */}
      <div
        className="w-12 h-12 flex items-center justify-center rounded-full border bg-[#020202] transition-all duration-500 group-hover:scale-110"
        style={{ borderColor: `${accent}4D` }}
      >
        <Icon
          icon={module.icon}
          className="w-5 h-5"
          style={{ color: accent }}
        />
      </div>

      <div className="hidden md:block w-1/2" />
    </motion.div>
  );
}