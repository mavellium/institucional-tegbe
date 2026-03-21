"use client";

import React from "react";
import { motion } from "framer-motion";

const marketplaces = [
  { name: "Mercado Livre", color: "#FFE600", textColor: "#333", initials: "ML" },
  { name: "Shopee", color: "#EE4D2D", textColor: "#fff", initials: "SH" },
  { name: "Amazon", color: "#FF9900", textColor: "#fff", initials: "AZ" },
  { name: "Magalu", color: "#0086FF", textColor: "#fff", initials: "MG" },
  { name: "Americanas", color: "#E60014", textColor: "#fff", initials: "AM" },
  { name: "Shein", color: "#222", textColor: "#fff", initials: "SN" },
  { name: "AliExpress", color: "#E62E04", textColor: "#fff", initials: "AE" },
  { name: "Casas Bahia", color: "#0047BA", textColor: "#fff", initials: "CB" },
];

const duplicated = [...marketplaces, ...marketplaces];

export default function EcommerceSection() {
  return (
    <section id="ecommerce" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 bg-blue-100 text-blue-700">
            E-COMMERCE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Venda nos Maiores Marketplaces do Brasil
          </h2>
          <p className="text-muted-foreground text-lg">
            Conectamos o seu negócio às maiores plataformas de vendas online. Alcance milhões de compradores com a estratégia certa.
          </p>
        </div>

        {/* Carrossel com duas linhas */}
        <div className="rounded-2xl border border-border/50 bg-card shadow-sm overflow-hidden py-8">
          {/* Linha 1 — da esquerda para direita */}
          <div className="overflow-hidden relative mb-6">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-card to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-card to-transparent z-10" />
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
              className="flex gap-5 w-max"
            >
              {duplicated.map((mp, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.08, y: -3 }}
                  className="flex items-center gap-3 bg-muted/50 rounded-xl px-5 py-3 border border-border/40 cursor-default flex-shrink-0"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shadow-sm"
                    style={{ backgroundColor: mp.color, color: mp.textColor }}
                  >
                    {mp.initials}
                  </div>
                  <span className="text-sm font-semibold text-foreground whitespace-nowrap">{mp.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Linha 2 — da direita para esquerda */}
          <div className="overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-card to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-card to-transparent z-10" />
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
              className="flex gap-5 w-max"
            >
              {duplicated.map((mp, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.08, y: -3 }}
                  className="flex items-center gap-3 bg-muted/50 rounded-xl px-5 py-3 border border-border/40 cursor-default flex-shrink-0"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shadow-sm"
                    style={{ backgroundColor: mp.color, color: mp.textColor }}
                  >
                    {mp.initials}
                  </div>
                  <span className="text-sm font-semibold text-foreground whitespace-nowrap">{mp.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Botão CTA */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
          >
            Comece a Vender Agora
          </a>
        </div>
      </div>
    </section>
  );
}