"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Heading from "@/components/ui/heading";
import { FeatureSectionData } from "@/interface/feature/IFeatureSection";
import { mockData } from "@/mock/feature.mock";
import Paragrafo from "@/components/ui/paragrafo";
import { motion, AnimatePresence } from "framer-motion";
import CTAButton from "@/components/ui/button/ctaButton";
import RichText from "@/components/ui/rich/richText";
import Textura from "@/components/ui/textura";

export default function Solucoes({ data: dataProp }: { data: FeatureSectionData | null }) {
  const data = dataProp ?? mockData;
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
  }, [data]);

  const feature = data.items[active];

  return (
    <section className="relative z-0 py-16 md:py-24 bg-[#0A0A0A] px-6 text-white overflow-hidden">
      <Textura misturar opacity={0.1} src="/textura.svg" className="z-0" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* HEADER */}
        <div className="mb-20 text-center lg:text-left">
          {data.header.subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Paragrafo
                color="#fff"
                align="center"
                className="md:text-left text-[#E31B63] text-sm font-bold uppercase tracking-[0.2em] mb-4"
              >
                <RichText content={data.header.subtitle} />
              </Paragrafo>
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Heading
              as="h2"
              align="center"
              className="md:text-left text-4xl md:text-5xl font-medium tracking-tight"
              color="white"
            >
              <RichText content={data.header.title} />
            </Heading>
          </motion.div>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-12 gap-10 md:gap-16 items-start relative">
          {/* LISTA CLEAN */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {data.items.map((item, index) => {
              const isActive = active === index;

              return (
                <button
                  key={item.id}
                  onClick={() => setActive(index)}
                  className={`
                    relative w-full text-left p-5 rounded-2xl transition-all duration-300 ease-out group border
                    ${
                      isActive
                        ? "bg-white/[0.04] border-white/10 shadow-lg"
                        : "bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/5"
                    }
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-[#E31B63] rounded-r-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {item.icon && (
                        <div
                          className={`
                          p-3 rounded-xl transition-all duration-300 flex items-center justify-center
                          ${
                            isActive
                              ? "bg-[#E31B63]/10 text-[#E31B63]"
                              : "bg-white/[0.03] text-white/40 group-hover:bg-white/[0.06] group-hover:text-white/70"
                          }
                        `}
                        >
                          <Icon icon={item.icon} className="w-6 h-6" />
                        </div>
                      )}

                      <Heading as="h3" size="md" className="text-xl font-medium">
                        <span
                          className={`transition-colors duration-300 ${isActive ? "!text-white" : "!text-white/60 group-hover:!text-white"}`}
                        >
                          <RichText content={item.title} />
                        </span>
                      </Heading>
                    </div>

                    <div
                      className={`
                      transition-transform duration-300 flex-shrink-0
                      ${isActive ? "rotate-180 text-[#E31B63]" : "text-white/20 group-hover:text-white/50"}
                    `}
                    >
                      <Icon icon="lucide:chevron-down" className="w-5 h-5" />
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="pl-16 pt-2 pb-1">
                          <Paragrafo
                            color="#fff"
                            className="text-white/60 text-base leading-relaxed pr-4"
                          >
                            <RichText content={item.description} />
                          </Paragrafo>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          {/* IMAGEM COM CROSSFADE BLUR */}
          <div className="lg:col-span-7 relative h-full">
            <div className="sticky top-32 w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-white/5 border border-white/5 ring-1 ring-white/10 shadow-2xl backdrop-blur-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={feature.image}
                    alt="Solução Tegbe"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/30 to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* CTA */}
        {data.button && (
          <div className="flex justify-center mt-12 md:mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CTAButton button={data.button} />
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
