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
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveStep(step);
        setImageLoaded(false);
      },
    });
    tl.to(imageContainerRef.current, { opacity: 0, scale: 0.95, duration: 0.25 });
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
        {/* CARD */}
        <div
          className="
      relative rounded-3xl 
      bg-white/80 backdrop-blur-xl 
      border border-slate-200/60
      shadow-[0_20px_60px_rgba(0,0,0,0.08)]
      p-8 md:p-12 lg:p-16
      overflow-hidden
    "
        >
          {/* Glow sutil (Apple touch) */}
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl 
        bg-gradient-to-br from-yellow-100/40 via-transparent to-transparent opacity-60"
          />

          {/* Conteúdo */}
          <div className="relative z-10 flex flex-col gap-16">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <StepsList
                type={"E-commerce"}
                subtype={data.subtype}
                steps={data.values}
                activeStep={activeStep}
                onStepChange={handleStepChange}
                containerRef={leftColumnRef}
                registerButtonRef={(el, index) => {
                  stepButtonsRef.current[index] = el;
                }}
              />

              <StepVisualizer
                activeStep={activeStep}
                containerRef={rightColumnRef}
                imageContainerRef={imageContainerRef}
                onImageLoad={handleImageLoad}
              />
            </div>

            {data.button && <StepCTA buttonData={data.button} containerRef={ctaRef} />}
          </div>
        </div>
      </div>
    </section>
  );
}
