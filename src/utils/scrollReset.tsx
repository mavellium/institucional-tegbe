"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);

    requestAnimationFrame(() => {
      window.scrollTo(0, 0);

      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
        if (typeof window !== "undefined" && ScrollTrigger) {
          ScrollTrigger.clearScrollMemory();
          ScrollTrigger.refresh();
        }
      }, 150);

      return () => clearTimeout(timer);
    });
  }, [pathname]);

  return null;
}
