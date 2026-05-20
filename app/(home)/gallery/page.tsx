import { Header } from "@/app/features/home/components/header";
import { Footer } from "@/app/features/home/components/footer";
import { GalleryCards } from "@/app/features/gallery/gallery-cards";

export const metadata = {
  title: "Gallery — Karl Nestor Buensalida",
  description: "A visual archive of hackathons, workshop training, student leadership events, and developer community activities.",
};

export default function GalleryPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-start pt-28 md:pt-36 pb-36 overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* Ambient glow blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-violet-600/15 blur-[100px]"
      />

      {/* Header Navigation */}
      <Header />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl px-8 md:px-12 flex flex-col items-center mb-16">
        <GalleryCards />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
