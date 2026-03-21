"use client"
import React from "react";
import { motion } from "framer-motion";

// ======================
// Componentes locais
// ======================

function SectionWrapper({ id, className, children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`py-20 px-4 ${className || ""}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

function SectionHeadline({
  badge,
  title,
  subtitle,
  badgeColor = "bg-primary/10 text-primary",
}: {
  badge?: string;
  title: string;
  subtitle?: string;
  badgeColor?: string;
}) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      {badge && (
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${badgeColor}`}>
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{title}</h2>
      {subtitle && <p className="text-muted-foreground text-lg">{subtitle}</p>}
    </div>
  );
}

function CTAButton({ label, href }: { label: string; href: string }) {
  return (
    <div className="text-center mt-12">
      <a
        href={href}
        className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
      >
        {label}
      </a>
    </div>
  );
}

// ======================
// Dados e componente principal
// ======================

const socials = [
  { name: "Instagram", color: "#E4405F", icon: "IG" },
  { name: "TikTok", color: "#010101", icon: "TK" },
  { name: "Facebook", color: "#1877F2", icon: "FB" },
  { name: "YouTube", color: "#FF0000", icon: "YT" },
  { name: "LinkedIn", color: "#0A66C2", icon: "LI" },
  { name: "Pinterest", color: "#E60023", icon: "PT" },
  { name: "WhatsApp", color: "#25D366", icon: "WA" },
  { name: "X (Twitter)", color: "#1DA1F2", icon: "X" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function MarketingSection() {
  return (
    <SectionWrapper id="marketing" className="bg-muted/40">
      <SectionHeadline
        badge="MARKETING DIGITAL"
        title="Venda Através das Redes Sociais"
        subtitle="Estratégias personalizadas para cada plataforma. Transforme seguidores em clientes fiéis."
        badgeColor="bg-amber-100 text-amber-700"
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
      >
        {socials.map((s) => (
          <motion.div
            key={s.name}
            variants={item}
            whileHover={{ y: -4, scale: 1.05 }}
            className="flex flex-col items-center gap-3 bg-card rounded-xl p-5 border border-border/50 shadow-sm cursor-default"
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md"
              style={{ backgroundColor: s.color }}
            >
              {s.icon}
            </div>
            <span className="text-xs font-semibold text-foreground">{s.name}</span>
          </motion.div>
        ))}
      </motion.div>

      <CTAButton label="Criar Estratégia de Marketing" href="#" />
    </SectionWrapper>
  );
}