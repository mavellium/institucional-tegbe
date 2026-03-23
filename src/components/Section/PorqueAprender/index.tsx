"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

import { useApi } from "@/hooks/useApi";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button/button";
import Paragrafo from "@/components/ui/paragrafo";
import { RichTextItem } from "@/types/richText.type";
import RichText from "@/components/ui/rich/richText";
import { IButton } from "@/interface/button/IButton";
import { motion } from "framer-motion";
import Link from "next/link";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/* =========================
   INTERFACES
========================= */
interface PorqueAprenderData {
    theme: { accentColor: string; secondaryColor: string };
    badge: string;
    features: Array<{ icon: string; label: string }>;
    title: RichTextItem[];
    paragraphs: RichTextItem[][];
}
/* =========================
   COMPONENT
========================= */
export default function PorqueAprender() {
    const sectionRef = useRef<HTMLElement>(null);

    const { data } = useApi<PorqueAprenderData>("porque-aprender");

    useGSAP(() => {
        if (!data) return;

        gsap.from(".reveal-text-p", {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
            },
        });
    }, { scope: sectionRef, dependencies: [data] });

    if (!data) {
        return (
            <section
                ref={sectionRef}
                className="py-24 bg-[#020202] min-h-[600px] flex items-center justify-center"
            >
                <div className="w-8 h-8 border-2 border-white/10 border-t-[#FFD700] rounded-full animate-spin" />
            </section>
        );
    }

    const accent = data.theme?.accentColor || "#FFD700";

    return (
        <section
            ref={sectionRef}
            className="py-24 w-full bg-[#020202] px-6 relative border-t border-white/5 overflow-hidden"
        >
            {/* BACKGROUND FX */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

            <div
                className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.03]"
                style={{ backgroundColor: accent }}
            />
            <div
                className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-[100px] opacity-[0.03]"
                style={{ backgroundColor: accent }}
            />

            {/* CONTAINER */}
            <div className="max-w-5xl mx-auto relative z-10 text-center flex flex-col items-center">

                {/* BADGE */}
                <div
                    className="reveal-text-p mb-8 flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md"
                    style={{
                        borderColor: `${accent}33`,
                        backgroundColor: `${accent}0D`,
                    }}
                >
                    <span className="relative flex h-2 w-2">
                        <span
                            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                            style={{ backgroundColor: accent }}
                        />
                        <span
                            className="relative inline-flex rounded-full h-2 w-2"
                            style={{ backgroundColor: accent }}
                        />
                    </span>

                    <span
                        className="text-[11px] font-bold tracking-[0.2em] uppercase"
                        style={{ color: accent }}
                    >
                        {data.badge}
                    </span>
                </div>

                {/* HEADING */}
                <Heading color="white" align="center" className="reveal-text-p font-bold text-3xl md:text-6xl leading-tight tracking-tight text-white max-w-4xl mb-6">
                    <RichText content={data.title} />
                </Heading>

                {/* PARÁGRAFOS */}
                <div className="reveal-text-p max-w-3xl space-y-4 sm:space-y-6 mb-12">
                    {data.paragraphs.map((paragraph, i) => (
                        <Paragrafo
                            key={i}
                            className="text-gray-400 text-[15px] sm:text-[16px] md:text-[19px] font-light"
                            align="center"
                        >
                            <RichText content={paragraph} />
                        </Paragrafo>
                    ))}
                </div>

                {/* FEATURES */}
                <div className="reveal-text-p flex flex-wrap justify-center gap-4 md:gap-6">
                    {data.features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm hover:border-white/10 transition"
                        >
                            <Icon
                                icon={feature.icon}
                                className="text-xl"
                                style={{ color: accent }}
                            />
                            <span className="text-sm text-gray-300">
                                {feature.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}