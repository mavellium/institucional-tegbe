"use client";

import { TestimonialItem } from "@/types/testimonial.type";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface Props {
  item: TestimonialItem;
}

export default function CompanyCard({ item }: Props) {
  return (
    <motion.div
      // 1. Adicionado o 'flex' aqui para o wrapper esticar junto com os irmãos
      className="flex-shrink-0 w-[85vw] sm:w-[340px] md:w-[380px] cursor-grab active:cursor-grabbing flex"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        // 2. Adicionado o 'w-full' para preencher a largura do flex acima
        className="w-full h-full bg-[#111111] border border-white/5 hover:border-[#FFCC00]/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-colors duration-300 group shadow-2xl relative overflow-hidden"
      >
        
        {/* GLOW */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* HEADER */}
        <div>
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="w-14 h-14 flex-shrink-0 rounded-full bg-gray-800 overflow-hidden border border-white/10 group-hover:border-[#FFCC00]/30 transition-colors">
              <img
                src={item.logo || "/placeholder-logo.png"}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#FFCC00] transition-colors">
                {item.name}
              </h3>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                {item.description}
              </p>
            </div>
          </div>

          {/* RESULT */}
          <div className="mb-6 relative z-10">
            <p className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              {item.result}
            </p>
          </div>
        </div>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 mt-auto relative z-10">
          {item.tags.map((tag) => (
            <span
              key={tag.value}
              className="text-[10px] sm:text-xs font-medium px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/5"
            >
              {tag.value}
            </span>
          ))}
        </div>

        {/* ICON DECORATIVO */}
        <div className="absolute top-6 right-6 text-gray-800 group-hover:text-[#FFCC00]/20 transition-colors z-0">
          <TrendingUp className="w-8 h-8 opacity-50" />
        </div>
      </div>
    </motion.div>
  );
}