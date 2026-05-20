import Link from "next/link";
import { blogPosts } from "@/app/lib/blog-data";

export function LatestBlog() {
  // Only display the first 2 latest posts on the homepage
  const latestPosts = blogPosts.slice(0, 2);

  return (
    <section className="relative z-10 w-full max-w-5xl px-8 mt-32 flex flex-col md:flex-row items-start justify-between gap-12">
      {/* Section Title */}
      <div className="w-full md:w-1/3">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:mt-4">
          Latest from<br />the blog
        </h2>
      </div>

      {/* Blog Cards */}
      <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {latestPosts.map((post, index) => (
          <Link
            href={`/blog/${post.id}`}
            key={index}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-white/5 transition-colors hover:bg-white/10"
          >
            {/* Abstract Gradient Cover with SVG Mesh */}
            <div className="relative aspect-video w-full overflow-hidden border-b border-border/30">
              <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-90 transition-transform duration-750 ease-out group-hover:scale-105`} />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0c_1px,transparent_1px)] bg-[size:16px_16px] mix-blend-overlay" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.3)_100%)] mix-blend-multiply" />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-6">
              <span className="mb-3 text-xs font-semibold text-cyan-400">
                {post.date} ({post.dateAgo})
              </span>
              <h3 className="mb-6 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-cyan-300">
                {post.title}
              </h3>

              <div className="mt-auto pt-4">
                <span className="text-sm font-semibold text-cyan-400 transition-colors group-hover:text-cyan-300">
                  Read more &rarr;
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
export default LatestBlog;
