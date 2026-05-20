"use client";

import Link from "next/link";
import { blogPosts } from "@/app/lib/blog-data";

export function BlogCards() {
  return (
    <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 md:gap-x-16 md:gap-y-20 w-full max-w-5xl">
      {blogPosts.map((post) => (
        <div key={post.id} className="group flex flex-col items-start w-full">
          {/* Card Premium Abstract Gradient Banner with SVG Mesh */}
          <div className="relative mb-6 w-full overflow-hidden rounded-2xl border border-border/40 aspect-[16/10] shadow-md transition-all duration-300">
            {/* The base gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-90 transition-transform duration-700 ease-out group-hover:scale-105`} />
            
            {/* SVG Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0c_1px,transparent_1px)] bg-[size:20px_20px] mix-blend-overlay" />
            
            {/* Radial ambient glow overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.4)_100%)] mix-blend-multiply" />
            
            {/* Glowing Category Pill overlay */}
            <div className="absolute bottom-6 left-6 z-10">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-white backdrop-blur-md shadow-sm">
                {post.category}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="mb-3 text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-indigo-400">
            {post.title}
          </h3>

          {/* Description */}
          <p className="mb-6 text-[14px] leading-relaxed text-muted-foreground/90 font-normal">
            {post.description}
          </p>

          {/* Metadata tags (Category & Time ago) */}
          <div className="mb-8 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-foreground/80 tracking-wide uppercase">
            <span className="text-cyan-400">{post.category}</span>
            <span className="text-muted-foreground">{post.date} ({post.dateAgo})</span>
          </div>

          {/* Actions */}
          <div className="mt-auto">
            <Link
              href={`/blog/${post.id}`}
              className="inline-flex h-9 items-center justify-center rounded-full bg-foreground px-5 text-xs font-semibold text-background transition-colors hover:bg-foreground/90"
            >
              Read Article
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BlogCards;
