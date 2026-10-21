import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const OG_SIZE = { width: 1200, height: 630 };

// Same buckeye mark as components/Logo.tsx, inlined because ImageResponse can't render React components that use Tailwind.
export function LogoSvg({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <path d="M27 4c5 0 9 3 9 3s-3 6-9 7c-3 .5-6-1-6-1s1-9 6-9z" fill="#24804a" />
      <circle cx="18" cy="23" r="14" fill="#5a341a" />
      <ellipse cx="15" cy="27" rx="7" ry="5.5" fill="#d9b48a" />
      <circle cx="22" cy="17" r="2.5" fill="#8a5530" />
    </svg>
  );
}

/** Branded 1200×630 share card with a page-specific eyebrow and headline. */
export function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  const titleSize = title.length > 48 ? 64 : title.length > 32 ? 76 : 88;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #0f3a21 0%, #17532f 55%, #1d6a3d 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", background: "#fbf7f0", borderRadius: 24, padding: 8 }}>
            <LogoSvg size={64} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 38, fontWeight: 800, lineHeight: 1 }}>Buckeye</div>
            <div style={{ fontSize: 18, letterSpacing: 5, color: "#d6ecdd", marginTop: 6 }}>WASTE &amp; RECYCLING</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              fontSize: 26,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 3,
              color: "#13201a",
              background: "#f3ebdd",
              borderRadius: 999,
              padding: "8px 22px",
            }}
          >
            {eyebrow}
          </div>
          <div style={{ display: "flex", fontSize: titleSize, fontWeight: 800, lineHeight: 1.05, marginTop: 24, maxWidth: 1040 }}>
            {title}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28 }}>
          <div style={{ display: "flex", color: "#d6ecdd" }}>Valet trash · Can-to-curb · Bin cleaning · Junk removal</div>
          <div style={{ display: "flex", fontWeight: 700, background: "#d9731f", borderRadius: 999, padding: "10px 24px" }}>
            {site.domain}
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
