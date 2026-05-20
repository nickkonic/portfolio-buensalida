"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, ChevronRight } from "lucide-react";
import { blogPosts } from "@/app/lib/blog-data";

interface ReadBlogProps {
  id: string;
}

export function ReadBlog({ id }: ReadBlogProps) {
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-6">
        <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          The article you are trying to view does not exist or has been moved.
        </p>
        <Link
          href="/blog"
          className="inline-flex h-10 items-center justify-center rounded-full bg-foreground px-6 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
        >
          Return to Blog
        </Link>
      </div>
    );
  }

  // A very clean, robust, zero-dependency helper to parse basic markdown in blogs
  const renderMarkdown = (text: string) => {
    const lines = text.split("\n");
    let inList = false;
    let listItems: string[] = [];
    let inCode = false;
    let codeBlock: string[] = [];
    let codeLang = "";
    const elements: React.ReactNode[] = [];

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      // Fenced Code Block
      if (trimmed.startsWith("```")) {
        if (inCode) {
          // Close code block
          inCode = false;
          elements.push(
            <div key={`code-${idx}`} className="relative my-8 w-full overflow-hidden rounded-xl border border-border/60 bg-[#0d0e15] shadow-lg">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-border/20 bg-white/5 text-[11px] font-mono text-muted-foreground/80">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span>{codeLang || "code"}</span>
              </div>
              {/* Code text */}
              <pre className="p-5 overflow-x-auto text-[13px] font-mono leading-relaxed text-cyan-300/95 scrollbar-thin">
                <code>{codeBlock.join("\n")}</code>
              </pre>
            </div>
          );
          codeBlock = [];
          codeLang = "";
        } else {
          // Open code block
          inCode = true;
          codeLang = trimmed.slice(3) || "code";
        }
        return;
      }

      if (inCode) {
        codeBlock.push(line);
        return;
      }

      // Handle lists
      if (trimmed.startsWith("- ")) {
        if (!inList) {
          inList = true;
          listItems = [];
        }
        listItems.push(trimmed.slice(2));
        return;
      } else if (inList && trimmed === "") {
        // flush list
        inList = false;
        elements.push(
          <ul key={`list-${idx}`} className="my-6 ml-6 list-disc space-y-3 text-muted-foreground/90 leading-relaxed text-[15px]">
            {listItems.map((item, lIdx) => (
              <li key={lIdx} className="pl-1">
                {parseInlineMarkdown(item)}
              </li>
            ))}
          </ul>
        );
        listItems = [];
      } else if (inList && !trimmed.startsWith("- ")) {
        // continue list or flush
        inList = false;
        elements.push(
          <ul key={`list-${idx}`} className="my-6 ml-6 list-disc space-y-3 text-muted-foreground/90 leading-relaxed text-[15px]">
            {listItems.map((item, lIdx) => (
              <li key={lIdx} className="pl-1">
                {parseInlineMarkdown(item)}
              </li>
            ))}
          </ul>
        );
        listItems = [];
      }

      // Headings
      if (trimmed.startsWith("### ")) {
        elements.push(
          <h3 key={`h3-${idx}`} className="text-2xl font-bold tracking-tight text-foreground mt-10 mb-4 first:mt-0 font-heading">
            {parseInlineMarkdown(trimmed.slice(4))}
          </h3>
        );
      } else if (trimmed.startsWith("#### ")) {
        elements.push(
          <h4 key={`h4-${idx}`} className="text-lg font-bold tracking-tight text-foreground/90 mt-8 mb-3 font-heading">
            {parseInlineMarkdown(trimmed.slice(5))}
          </h4>
        );
      } else if (trimmed === "---") {
        elements.push(
          <hr key={`hr-${idx}`} className="my-10 border-border/30" />
        );
      } else if (trimmed !== "") {
        // Paragraph
        elements.push(
          <p key={`p-${idx}`} className="my-5 text-[15px] leading-relaxed text-muted-foreground/90 font-normal">
            {parseInlineMarkdown(trimmed)}
          </p>
        );
      }
    });

    // Flush trailing lists
    if (inList) {
      elements.push(
        <ul key={`list-end`} className="my-6 ml-6 list-disc space-y-3 text-muted-foreground/90 leading-relaxed text-[15px]">
          {listItems.map((item, lIdx) => (
            <li key={lIdx} className="pl-1">
              {parseInlineMarkdown(item)}
            </li>
          ))}
        </ul>
      );
    }

    return elements;
  };

  // Inline formatting like **bold** or `code`
  const parseInlineMarkdown = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    let currentText = text;
    let keyIdx = 0;

    while (currentText) {
      const boldMatch = currentText.match(/\*\*(.*?)\*\*/);
      const codeMatch = currentText.match(/`(.*?)`/);

      const matches = [
        { match: boldMatch, type: "bold", index: boldMatch?.index ?? Infinity },
        { match: codeMatch, type: "code", index: codeMatch?.index ?? Infinity },
      ].filter((m) => m.match);

      if (matches.length === 0) {
        parts.push(<React.Fragment key={keyIdx++}>{currentText}</React.Fragment>);
        break;
      }

      // Sort by earliest match
      matches.sort((a, b) => a.index - b.index);
      const first = matches[0];
      const matchText = first.match![0];
      const innerText = first.match![1];
      const index = first.index;

      if (index > 0) {
        parts.push(
          <React.Fragment key={keyIdx++}>
            {currentText.slice(0, index)}
          </React.Fragment>
        );
      }

      if (first.type === "bold") {
        parts.push(
          <strong key={keyIdx++} className="font-bold text-foreground">
            {innerText}
          </strong>
        );
      } else if (first.type === "code") {
        parts.push(
          <code key={keyIdx++} className="px-1.5 py-0.5 rounded bg-white/5 font-mono text-xs text-cyan-300 border border-white/5">
            {innerText}
          </code>
        );
      }

      currentText = currentText.slice(index + matchText.length);
    }

    return parts;
  };

  return (
    <article className="w-full max-w-3xl px-6 md:px-8 relative z-10">
      {/* Back Button */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 mb-10 text-sm text-muted-foreground/80 hover:text-foreground transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to articles</span>
      </Link>

      {/* Hero Banner */}
      <div className="relative mb-10 w-full overflow-hidden rounded-2xl border border-border/40 aspect-[21/9] shadow-md">
        <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-95`} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0c_1px,transparent_1px)] bg-[size:24px_24px] mix-blend-overlay" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Article Header Metadata */}
      <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-cyan-400 mb-4 uppercase tracking-wider">
        <span className="flex items-center gap-1.5">
          <Tag className="h-3.5 w-3.5 stroke-[2]" />
          {post.category}
        </span>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Calendar className="h-3.5 w-3.5 stroke-[2]" />
          {post.date}
        </span>
      </div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.15] tracking-tight text-foreground mb-8 font-heading">
        {post.title}
      </h1>

      {/* Subdescription box */}
      <div className="p-5 rounded-xl border border-indigo-500/20 bg-indigo-500/5 text-muted-foreground/90 italic leading-relaxed text-[15px] mb-12">
        {post.description}
      </div>

      {/* Body Content */}
      <div className="mt-8 select-text">
        {renderMarkdown(post.content)}
      </div>

      {/* Bottom Separator & Back navigation */}
      <div className="mt-16 pt-8 border-t border-border/30 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          Karl Nestor Buensalida — Blog
        </span>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <span>All articles</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

export default ReadBlog;
