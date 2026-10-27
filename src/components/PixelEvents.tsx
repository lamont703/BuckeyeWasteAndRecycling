"use client";

import { useReportWebVitals } from "next/web-vitals";
import { useEffect } from "react";
import { track } from "@/lib/pixel";

const reportVital: Parameters<typeof useReportWebVitals>[0] = (m) =>
  track("web_vital", { metric: m.name, value: Math.round(m.name === "CLS" ? m.value * 1000 : m.value), rating: m.rating, metric_id: m.id });

/** Core Web Vitals (LCP, INP, CLS, FCP, TTFB) for every page, sent through the pixel. */
export function WebVitals() {
  useReportWebVitals(reportVital);
  return null;
}

/** Fires one pixel event when a page renders, e.g. a 404 or a checkout success page. */
export function TrackOnView({ event, props }: { event: string; props?: Record<string, unknown> }) {
  useEffect(() => {
    track(event, props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);
  return null;
}
