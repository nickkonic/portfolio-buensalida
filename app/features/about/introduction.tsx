import { Calendar, Mail, ChevronRight } from "lucide-react";
import Link from "next/link";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export function Introduction() {
    return (
        <section id="introduction" className="scroll-mt-32">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 backdrop-blur-sm transition-colors hover:bg-blue-500/20 cursor-pointer">
                <Calendar className="h-4 w-4" />
                Schedule a call
                <div className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-background/20 text-foreground">
                    <ChevronRight className="h-3 w-3" />
                </div>
            </div>

            <h1 className="mb-2 text-5xl font-bold tracking-tight md:text-6xl lg:text-[4.5rem] leading-[1.1]">
                Karl Nestor<br />Buensalida
            </h1>
            <h2 className="mb-6 text-2xl font-normal text-muted-foreground md:text-3xl">
                Software Engineer
            </h2>

            <div className="mb-8 flex flex-wrap gap-3">
                <Link href="#" className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-foreground/10 hover:text-foreground">
                    <GithubIcon className="h-4 w-4" />
                    GitHub
                </Link>
                <Link href="#" className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-foreground/10 hover:text-foreground">
                    <LinkedinIcon className="h-4 w-4" />
                    LinkedIn
                </Link>
                <Link href="#" className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-foreground/10 hover:text-foreground">
                    <Mail className="h-4 w-4" />
                    Email
                </Link>
            </div>

            <p className="max-w-3xl text-base leading-relaxed text-foreground/80 md:text-lg">
                Aspiring Software Developer with experience in full-stack web development, system design, UI/UX, and QA. Built WordPress sites, contributed to management systems, and handled server maintenance. Proficient in Python, TypeScript, React, Angular, Next.js, Node.js, and MySQL. Active in blockchain and startup tech seminars.
            </p>
        </section>
    );
}
