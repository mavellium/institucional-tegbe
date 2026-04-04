"use client";

import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IButton } from "@/interface/button/IButton";
import { StepsList } from "./passosList";
import { StepVisualizer } from "./passosVisualizador";
import { StepCTA } from "./passosCta";
import { RichTextItem } from "@/types/richText.type";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface Passos {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface ApiResponse {
  subtype: RichTextItem[];
  values: Passos[];
  button: IButton;
}

export default function Steps({ data }: { data: ApiResponse | null }) {
  const [activeStep, setActiveStep] = useState<Passos | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const stepButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data?.values?.length) {
      setActiveStep(data.values[0]);
    }
  }, [data]);

  useGSAP(
    () => {
      if (!data || !sectionRef.current) return;

      gsap.from(leftColumnRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.from(rightColumnRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: 0.4,
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
      });

      stepButtonsRef.current.forEach((button, index) => {
        if (!button) return;
        gsap.fromTo(
          button,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: 0.08 * index,
            scrollTrigger: { trigger: leftColumnRef.current, start: "top 80%" },
          }
        );
      });
    },
    { dependencies: [data], scope: sectionRef }
  );

  const handleStepChange = (step: Passos) => {
    if (!activeStep || step.id === activeStep.id || !data) return;

    setActiveStep(step);
    setImageLoaded(false);

    if (imageContainerRef.current) {
      gsap.to(imageContainerRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
      });
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    gsap.fromTo(
      imageContainerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.4 }
    );
  };

  useEffect(() => {
    if (!activeStep) return;
    const timer = setTimeout(() => {
      if (!imageLoaded) handleImageLoad();
    }, 300);
    return () => clearTimeout(timer);
  }, [activeStep]);

  if (!data || !activeStep) return null;

  return (
    <section ref={sectionRef} className="w-full py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          className="
            relative 
            lg:rounded-3xl 
            lg:bg-white/80 lg:backdrop-blur-xl 
            lg:border lg:border-slate-200/60
            lg:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
            lg:overflow-hidden
            lg:p-12 xl:p-16 /* <-- Ajuste de padding para não espremer tanto */
          "
        >
          <div
            className="hidden lg:block pointer-events-none absolute inset-0 rounded-3xl 
              bg-gradient-to-br from-yellow-100/40 via-transparent to-transparent opacity-60"
          />

          {/* Conteúdo */}
          <div className="relative z-10 flex flex-col gap-8 lg:gap-16">
            {/* AQUI: Aumentei o gap entre as colunas no desktop para dar aquele respiro da imagem 1 */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 xl:gap-32 items-start lg:items-center">
              {/* Coluna da Esquerda (Textos e Botões) */}
              <div className="w-full lg:w-[45%] xl:w-1/2">
                <StepsList
                  type={"E-commerce"}
                  subtype={data.subtype}
                  steps={data.values}
                  activeStep={activeStep}
                  onStepChange={handleStepChange}
                  containerRef={leftColumnRef}
                  registerButtonRef={(el, index) => {
                    if (stepButtonsRef.current) {
                      stepButtonsRef.current[index] = el;
                    }
                  }}
                />
              </div>

              {/* Coluna da Direita (Imagem Desktop) */}
              <div className="hidden lg:flex w-full lg:w-[55%] xl:w-1/2 justify-end">
                <StepVisualizer
                  activeStep={activeStep}
                  containerRef={rightColumnRef}
                  imageContainerRef={imageContainerRef}
                  onImageLoad={handleImageLoad}
                />
              </div>
            </div>

            {data.button && (
              <div className="mt-4 lg:mt-0 w-full flex justify-center">
                <StepCTA buttonData={data.button} containerRef={ctaRef} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
