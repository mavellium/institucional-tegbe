"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";
import CardFundador from "@/components/ui/cardFundador";
import { Button } from "@/components/ui/button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function QuemSomos({ endpoint = `${process.env.NEXT_PUBLIC_API_URL}/socios` }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(endpoint);
        const json = await res.json();
        if (json && json.sobre) setData(json.sobre);
      } catch (error) {
        console.error("Erro Tegbe API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);

  useGSAP(() => {
    if (loading || !data) return;
    const tl = gsap.timeline({ scrollTrigger: { trigger: containerRef.current, start: "top 75%" } });
    tl.from(".animate-up", {
      y: 30,
      autoAlpha: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out"
    });
  }, { scope: containerRef, dependencies: [data, loading] });

  if (loading || !data) return (
    <div className="h-[600px] bg-[#FAF9F6] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#B38E5D] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <section ref={containerRef} className="bg-[#FAF9F6] py-20 lg:py-32 selection:bg-[#B38E5D]/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">


          <div className="lg:w-[60%] space-y-10">
            <header className="space-y-6">

              <div className="animate-up flex items-center gap-3">
                <div className="h-[1px] w-8 bg-[#B38E5D]" />
                <span className="text-[10px] font-bold tracking-[0.3em] text-[#B38E5D] uppercase">
                  {data.header.preTitle || "SOBRE NÓS"}
                </span>
              </div>

              <h2
                className="animate-up text-4xl lg:text-6xl font-serif text-[#0D1E2D] leading-[1.15] tracking-tight"
                dangerouslySetInnerHTML={{ __html: data.header.title }}
              />

              <div className="animate-up space-y-6 text-[#333] text-base lg:text-lg leading-relaxed font-normal max-w-[90%]">
                {data.header.subtitle.split('.  ').map((para: string, i: number) => {
                  const text = para.trim();
                  if (!text) return null;
                  return (
                    <p key={i} className="opacity-90">
                      {text}{text.endsWith('.') ? '' : '.'}
                    </p>
                  );
                })}
              </div>
            </header>

            <div className="animate-up pt-9 flex justify-center lg:justify-center w-full lg:max-w-[90%]">
              <Button
                size="lg"
                className="bg-[#0D1E2D] text-white hover:bg-[#B38E5D] rounded-full px-10 py-8 uppercase tracking-[0.2em] text-[11px] font-bold group transition-all duration-500 border-none shadow-lg shadow-black/5"
              >
                Conhecer o Método
                <Icon
                  icon="ph:arrow-right"
                  className="ml-2 size-5 group-hover:translate-x-2 transition-transform duration-300"
                />
              </Button>
            </div>
          </div>

          <div className="lg:w-[40%] w-full flex justify-center lg:justify-end lg:sticky lg:top-32">
            <div className="animate-up w-full max-w-[400px]">
              <CardFundador />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}