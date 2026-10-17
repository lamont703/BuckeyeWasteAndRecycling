import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name}: valet trash and trash can service in Columbus, OH`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0f3a21 0%, #1d6a3d 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 36, background: "#5a341a", display: "flex", alignItems: "flex-end", justifyContent: "flex-start", padding: 10 }}>
            <div style={{ width: 34, height: 26, borderRadius: 17, background: "#d9b48a" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 40, fontWeight: 800 }}>Buckeye</div>
            <div style={{ fontSize: 20, letterSpacing: 4, color: "#d6ecdd" }}>WASTE &amp; RECYCLING</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>Never take the trash out again.</div>
          <div style={{ fontSize: 32, marginTop: 24, color: "#f3ebdd" }}>
            Valet trash · Can-to-curb · Bin cleaning · Junk removal
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#d6ecdd" }}>
          <div>{site.region}</div>
          <div style={{ color: "#ffffff", fontWeight: 700 }}>{site.domain}</div>
        </div>
      </div>
    ),
    size,
  );
}
