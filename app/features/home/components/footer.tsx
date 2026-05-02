import Link from "next/link";
import { Mail } from "lucide-react";

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

export function Footer() {
  return (
    <footer className="absolute bottom-8 w-full max-w-5xl px-8 flex items-center justify-between text-sm text-foreground/70">
      <div className="flex items-center font-medium">
        <span>&copy; 2026 / Karl Nestor Buensalida</span>
      </div>
      
      <div className="flex items-center gap-6">
        <Link 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="transition-colors hover:text-foreground"
        >
          <GithubIcon className="h-[18px] w-[18px]" />
          <span className="sr-only">GitHub</span>
        </Link>
        <Link 
          href="https://linkedin.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="transition-colors hover:text-foreground"
        >
          <LinkedinIcon className="h-[18px] w-[18px]" />
          <span className="sr-only">LinkedIn</span>
        </Link>
        <Link 
          href="mailto:example@gmail.com" 
          className="transition-colors hover:text-foreground"
        >
          <Mail className="h-[18px] w-[18px] stroke-[1.5]" />
          <span className="sr-only">Email</span>
        </Link>
      </div>
    </footer>
  );
}
