import { Header } from "@/app/features/home/components/header";
import { Footer } from "@/app/features/home/components/footer";
import { ReadBlog } from "@/app/features/blog/[id]/read";
import { blogPosts } from "@/app/lib/blog-data";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);
  if (!post) {
    return {
      title: "Article Not Found — Karl Nestor Buensalida",
    };
  }
  return {
    title: `${post.title} — Karl Nestor",`,
    description: post.description,
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }));
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { id } = await params;
  const postExists = blogPosts.some((p) => p.id === id);

  if (!postExists) {
    notFound();
  }

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
      <div className="relative z-10 w-full flex flex-col items-center justify-start mb-16">
        <ReadBlog id={id} />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
