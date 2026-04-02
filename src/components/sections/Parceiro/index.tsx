"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import Heading from "@/components/ui/heading";
import RichText from "@/components/ui/rich/richText";
import { Button } from "@/components/ui/button/button";
import CarrosselParceiros from "@/components/ui/carrosselParceiros";

import { IParceiroSection } from "@/interface/parceiro/IParceiroSection";

const mockData: IParceiroSection = {
  badge: [],
  title: [],
  description: [],
  parceiros: [],
  button: { action: "link", label: "", link: "#" },
  msgFinal: "",
};

export default function Parceiro({ data: dataProp }: { data: IParceiroSection | null }) {
  const data = dataProp ?? mockData;

  const button = data.button;

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-[#020202] relative overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#E31B63]/10 rounded-[100%] blur-[120px] pointer-events-none opacity-50" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-10 gap-3">
          {data.badge && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-[#E31B63] text-sm font-bold uppercase tracking-[0.2em] mb-1">
                <RichText content={data.badge} />
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Heading
              as="h2"
              size="xl"
              align="center"
              className="text-4xl md:text-5xl font-medium tracking-tight !text-white"
            >
              <RichText content={data.title} />
            </Heading>
          </motion.div>

          {data.description && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed mt-2">
                <RichText content={data.description} />
              </div>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="relative w-full"
        >
          <div className="absolute inset-y-0 left-0 w-8 md:w-24 bg-gradient-to-r from-[#020202] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 md:w-24 bg-gradient-to-l from-[#020202] to-transparent z-10 pointer-events-none" />

          <CarrosselParceiros items={data.parceiros} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col items-center mt-10"
        >
          {button?.action === "link" && (
            <Button asChild variant={button.variant}>
              <Link href={button.link} target={button.target}>
                {button.label}
              </Link>
            </Button>
          )}

          <div className="mt-5 flex items-center gap-2 text-white/50 bg-white/[0.03] px-4 py-2 rounded-full border border-white/5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31B63] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E31B63]"></span>
            </span>
            <p className="text-[11px] font-medium tracking-[0.15em] uppercase">{data.msgFinal}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
