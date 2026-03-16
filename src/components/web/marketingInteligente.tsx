"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"
import { Sparkles } from "lucide-react"
import { Icon } from "@iconify/react"
import Link from "next/link"

import Flywheel from "@/components/ui/flywheel"
import Heading from "@/components/ui/heading"
import RichText from "@/components/ui/rich/richText"
import Paragrafo from "@/components/ui/paragrafo"
import { Button } from "@/components/ui/button/button"

import { RichTextItem } from "@/types/richText.type"
import { IButton } from "@/interface/button/IButton"
import Textura from "../ui/textura"
import CTAButton from "../ui/ctaButton"

interface Stat {
  value: string
  label: RichTextItem[]
}

interface Content {
  badge: RichTextItem[]
  title: RichTextItem[]
  description: RichTextItem[]
  stats: Stat[]
  button: IButton
}

interface Props {
  content: Content
}

export default function MarketingInteligente({ content }: Props) {

  const { badge, title, description, stats, button } = content

  const [isModalOpen, setIsModalOpen] = useState(false)


  return (
    <>
      <section className="relative min-h-screen bg-white flex items-center overflow-hidden py-24">

        {/* textura */}

        <Textura />

        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#E31B63]/6 blur-[140px] rounded-full" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#FF0F43]/6 blur-[140px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-6 w-full">

          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* TEXTO */}

            <div className="space-y-8">

              {/* Badge */}

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-[#E31B63]" />

                <span className="text-xs text-gray-600 font-bold tracking-widest uppercase">
                  <RichText content={badge} />
                </span>
              </div>

              {/* Title */}

              <Heading
                as="h1"
                size="xl"
                font="black"
                className="text-[#0a0a0a] max-w-xl"
              >
                <RichText content={title} />
              </Heading>

              {/* Description */}

              <Paragrafo className="text-gray-600 max-w-lg text-lg">
                <RichText content={description} />
              </Paragrafo>

              {/* Stats */}

              <div className="flex flex-wrap gap-12 pt-4">

                {stats.map((stat, i) => (
                  <div key={i}>

                    <Heading
                      as="h3"
                      size="lg"
                      font="bold"
                      className="text-[#0a0a0a]"
                    >
                      {stat.value}
                    </Heading>

                    <span className="text-[10px] text-[#E31B63] uppercase tracking-[0.2em] font-bold mt-1 block">
                      <RichText content={stat.label} />
                    </span>

                  </div>
                ))}

              </div>

              {/* CTA */}

              <div className="pt-6">
                <CTAButton
                  button={button}
                  onOpenForm={() => setIsModalOpen(true)}
                />
              </div>

            </div>

            {/* VISUAL */}

            <div className="relative flex items-center justify-center">

              <div className="absolute inset-0 bg-[#E31B63]/10 blur-[120px] rounded-full animate-pulse" />

              <Flywheel />

            </div>

          </div>

        </div>

      </section>

      {/* MODAL */}

      {/* {button.action === "form" &&
        typeof document !== "undefined" &&
        createPortal(

          <AnimatePresence>

            {isModalOpen && (

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
                onClick={() => setIsModalOpen(false)}
              >

                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  className="relative bg-white rounded-2xl max-w-lg w-full p-8"
                  onClick={(e) => e.stopPropagation()}
                >

                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4"
                  >
                    <Icon
                      icon="solar:close-circle-linear"
                      className="w-6 h-6 text-gray-600"
                    />
                  </button>

                  {button.form_html ? (
                    <div dangerouslySetInnerHTML={{ __html: button.form_html }} />
                  ) : (
                    <Paragrafo className="text-gray-500">
                      Formulário não disponível.
                    </Paragrafo>
                  )}

                </motion.div>

              </motion.div>

            )}

          </AnimatePresence>,

          document.body
        )} */}

    </>
  )
}