import { Mail } from "lucide-react";
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

interface IntroductionProps {
    name: string;
    title: string;
    bio: string;
    githubUrl?: string;
    linkedinUrl?: string;
    email?: string;
}

export function Introduction({
    name,
    title,
    bio,
    githubUrl,
    linkedinUrl,
    email,
}: IntroductionProps) {
    const formattedName = name.includes(" ") ? (
        <>
            {name.substring(0, name.lastIndexOf(" "))}
            <br />
            {name.substring(name.lastIndexOf(" ") + 1)}
        </>
    ) : name;

    return (
        <section id="introduction" className="scroll-mt-32">
            <h1 className="mb-2 text-5xl font-bold tracking-tight md:text-6xl lg:text-[4.5rem] leading-[1.1]">
                {formattedName}
            </h1>
            <h2 className="mb-6 text-2xl font-normal text-muted-foreground md:text-3xl">
                {title}
            </h2>

            <div className="mb-8 flex flex-wrap gap-3">
                {githubUrl && (
                    <Link
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-foreground/10 hover:text-foreground"
                    >
                        <GithubIcon className="h-4 w-4" />
                        GitHub
                    </Link>
                )}
                {linkedinUrl && (
                    <Link
                        href={linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-foreground/10 hover:text-foreground"
                    >
                        <LinkedinIcon className="h-4 w-4" />
                        LinkedIn
                    </Link>
                )}
                {email && (
                    <Link
                        href={`mailto:${email}`}
                        className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-foreground/10 hover:text-foreground"
                    >
                        <Mail className="h-4 w-4" />
                        Email
                    </Link>
                )}
            </div>

            <p className="max-w-3xl text-base leading-relaxed text-foreground/80 md:text-lg whitespace-pre-line">
                {bio}
            </p>
        </section>
    );
}
