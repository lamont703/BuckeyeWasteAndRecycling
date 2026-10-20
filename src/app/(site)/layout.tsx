import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

// Full-site chrome. Ad landing pages live outside this group so they have no outbound nav.
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
