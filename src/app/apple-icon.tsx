import { ImageResponse } from "next/og";
import { LogoSvg } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Home-screen icon for iPhone/iPad bookmarks.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#fbf7f0" }}>
        <LogoSvg size={140} />
      </div>
    ),
    size,
  );
}
