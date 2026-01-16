"use client";

import { useEffect } from "react";

export default function LCPObserver() {
  useEffect(() => {
    const po = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        console.log("LCP Entry:", entry);
        // Type assertion to access 'element' property
        console.log("Elemento:", (entry as PerformanceEntry & { element?: Element }).element); // aqui deve aparecer
      }
    });

    po.observe({ type: "largest-contentful-paint", buffered: true });

    return () => po.disconnect();
  }, []);

  return null;
}
