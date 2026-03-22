"use client"

import { useState, useEffect } from "react"
import { Sparkles } from "lucide-react"
import Flywheel from "@/components/ui/flywheel"
import Heading from "@/components/ui/heading"
import RichText from "@/components/ui/rich/richText"
import Paragrafo from "@/components/ui/paragrafo"
import { RichTextItem } from "@/types/richText.type"
import { IButton } from "@/interface/button/IButton"
import Textura from "../ui/textura"
import CTAButton from "../ui/ctaButton"
import { useApi } from "@/hooks/useApi"

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

const mockData: Content = {
  badge: [{ type: "text", value: "Marketing Inteligente" }],
  title: [{ type: "text", value: "Título padrão" }],
  description: [{ type: "text", value: "Descrição padrão" }],
  stats: [],
  button: { action: "link", label: "Saiba mais", link: "#" },
}

export default function MarketingInteligente() {
  const { data: apiData, loading, error } = useApi<Content>("marketing-inteligente")
  const [content, setContent] = useState<Content>(mockData)

  useEffect(() => {
    if (loading) return
    if (error || !apiData) {
      setContent(mockData)
    } else {
      setContent(apiData)
    }
  }, [apiData, loading, error])

  const { badge, title, description, stats, button } = content

  const [isModalOpen, setIsModalOpen] = useState(false)

  if (loading) {
    return (
      <section className="relative min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#E31B63] border-t-transparent rounded-full animate-spin" />
      </section>
    )
  }

  return (
    <>
      <section className="relative min-h-screen bg-white flex items-center overflow-hidden py-24">

        <Textura />

        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#E31B63]/6 blur-[140px] rounded-full" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#FF0F43]/6 blur-[140px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-6 w-full">

          <div className="grid lg:grid-cols-2 gap-20 items-center">

            <div className="space-y-8">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-[#E31B63]" />
                <span className="text-xs text-gray-600 font-bold tracking-widest uppercase">
                  <RichText content={badge} />
                </span>
              </div>

              <Heading as="h1" size="xl" font="black" className="text-[#0a0a0a] max-w-xl">
                <RichText content={title} />
              </Heading>

              <Paragrafo className="text-gray-600 max-w-lg text-lg">
                <RichText content={description} />
              </Paragrafo>

              <div className="flex flex-wrap gap-12 pt-4">
                {stats.map((stat, i) => (
                  <div key={i}>
                    <Heading as="h3" size="lg" font="bold" className="text-[#0a0a0a]">
                      {stat.value}
                    </Heading>
                    <span className="text-[10px] text-[#E31B63] uppercase tracking-[0.2em] font-bold mt-1 block">
                      <RichText content={stat.label} />
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <CTAButton button={button} onOpenForm={() => setIsModalOpen(true)} />
              </div>

            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-[#E31B63]/10 blur-[120px] rounded-full animate-pulse" />
              <Flywheel />
            </div>

          </div>

        </div>

      </section>
    </>
  )
}