"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

interface ProgressMetricProps {
  value: number;
  max: number;
  icon?: string;
  animate?: boolean;
}

export default function ProgressMetric({
  value,
  max,
  icon = "/logo_icone4.svg",
  animate = true
}: ProgressMetricProps) {

  const progressRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const [count, setCount] = useState(0);

  const percentage = (value / max) * 100;

  useEffect(() => {

    if (!animate) {
      setCount(value);
      return;
    }

    const obj = { val: 0 };

    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: "power3.out",
      onUpdate: () => {
        setCount(Math.floor(obj.val));
      }
    });

    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${percentage}%`,
        duration: 2,
        ease: "power3.out"
      });
    }

    if (thumbRef.current) {
      gsap.to(thumbRef.current, {
        left: `${percentage}%`,
        xPercent: -50,
        duration: 2,
        ease: "power3.out"
      });
    }

  }, [value, percentage, animate]);

  return (

    <div className="bg-white/80 backdrop-blur rounded-2xl p-10 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 space-y-12">

      <div className="relative w-full">

        <div className="h-[14px] w-full rounded-full bg-[#E7E7E7]" />

        <div
          ref={progressRef}
          className="absolute top-0 left-0 h-[14px] rounded-full bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A]"
        />

        <div
          ref={thumbRef}
          className="absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-[#2A2A2A] to-[#0F0F0F] border border-[#3A3A3A] shadow-[0_10px_25px_rgba(0,0,0,0.35)] flex items-center justify-center"
        >

          <Image
            src={icon}
            alt="progress"
            width={24}
            height={24}
          />

        </div>

      </div>

      <div className="flex justify-between items-end">

        <span className="text-gray-400 text-sm font-semibold">
          0
        </span>

        <span className="text-4xl md:text-4xl font-bold text-[#0A0A0A] tracking-tight">
          {count.toLocaleString("pt-BR")}
        </span>

        <span className="text-gray-400 text-sm font-semibold">
          {max / 1000}K
        </span>

      </div>

    </div>

  );
}