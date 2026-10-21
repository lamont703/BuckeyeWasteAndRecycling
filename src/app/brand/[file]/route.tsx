import { ImageResponse } from "next/og";
import { LogoSvg } from "@/lib/og";

// Square PNG logos for the web app manifest and the structured-data `logo` (Google needs a raster image).
const SIZES: Record<string, number> = { "logo-192.png": 192, "logo-512.png": 512 };

export function generateStaticParams() {
  return Object.keys(SIZES).map((file) => ({ file }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const size = SIZES[(await params).file];
  if (!size) return new Response("Not found", { status: 404 });
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#fbf7f0" }}>
        <LogoSvg size={Math.round(size * 0.8)} />
      </div>
    ),
    { width: size, height: size },
  );
}
