"use client";

import { onLCP, type Metric } from "web-vitals";
import { useEffect } from "react";

export default function WebVitals() {
  useEffect(() => {
    onLCP((metric) => {
      console.log("LCP:", metric.value);

      if ("attribution" in metric) {
        console.log("Elemento:", (metric as any).attribution?.element);
      }
    });
  }, []);

  return null;
}
