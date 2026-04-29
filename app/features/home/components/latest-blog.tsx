import Image from "next/image";
import Link from "next/link";

const blogPosts = [
  {
    title: "Solana Superteam Philippines Ecosystem Call in Bicol 🍻",
    date: "April 9, 2024 (2y ago)",
    image: "/placeholder-blog1.png", // Replace with real image path
    href: "#",
  },
  {
    title: "Solana Superteam Philippines Makes Waves in Sorsogon! 🌊",
    date: "April 8, 2024 (2y ago)",
    image: "/placeholder-blog2.png", // Replace with real image path
    href: "#",
  },
];

export function LatestBlog() {
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
        {blogPosts.map((post, index) => (
          <Link
            href={post.href}
            key={index}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-white/5 transition-colors hover:bg-white/10"
          >
            {/* Image */}
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-6">
              <span className="mb-3 text-xs font-semibold text-cyan-400">
                {post.date}
              </span>
              <h3 className="mb-6 text-lg font-bold leading-snug text-foreground">
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
