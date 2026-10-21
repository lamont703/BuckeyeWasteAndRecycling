import { allPages, ogImagePath } from "@/data/pages";
import { renderOgImage } from "@/lib/og";

// One prerendered share image per page in the registry, e.g. /og/home, /og/valet-trash, /og/service-area/dublin.
export function generateStaticParams() {
  return allPages.map((p) => ({ slug: ogImagePath(p.path).split("/").slice(2) }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = allPages.find((p) => ogImagePath(p.path) === `/og/${slug.join("/")}`);
  if (!page) return new Response("Not found", { status: 404 });
  return renderOgImage({ eyebrow: page.ogEyebrow, title: page.ogTitle });
}
