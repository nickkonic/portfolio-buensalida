import { Header } from "@/app/features/home/components/header";
import { Footer } from "@/app/features/home/components/footer";
import { WorkCards } from "@/app/features/work/work-cards";

export const metadata = {
  title: "Work — Karl Nestor Buensalida",
  description: "Explore my web development projects and technical work.",
};

export default function WorkPage() {
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
      <div className="relative z-10 w-full max-w-5xl px-8 flex flex-col items-start text-left mb-16">
        <h1 className="font-heading mb-12 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Web Development Projects
        </h1>
        
        <WorkCards />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
