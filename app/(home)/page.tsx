import Link from "next/link";
import { Header } from "@/app/features/home/components/header";
import { HomeFeature } from "@/app/features/home/page";
import { WebProjects } from "@/app/features/home/components/web-projects";
import { LatestBlog } from "@/app/features/home/components/latest-blog";
import { Footer } from "@/app/features/home/components/footer";

export const metadata = {
  title: "Karl Nestor Buensalida — Portfolio",
  description:
    "Full-stack developer crafting modern web experiences. Explore my work, blog, and more.",
};

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-start pt-20 md:pt-40 pb-32 overflow-hidden bg-background text-foreground transition-colors duration-300">
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

      {/* Hero */}
      <HomeFeature />

      {/* Web Development Projects */}
      <WebProjects />

      {/* Latest Blog */}
      <LatestBlog />

      {/* Footer */}
      <Footer />
    </main>
  );
}
