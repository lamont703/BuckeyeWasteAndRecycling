// Runs before React hydrates, so the pixel catches errors and timings from the very start.
import { onNavigationStart, startPixel } from "@/lib/pixel";

startPixel();

export function onRouterTransitionStart(_url: string, navigationType: "push" | "replace" | "traverse") {
  onNavigationStart(navigationType);
}
