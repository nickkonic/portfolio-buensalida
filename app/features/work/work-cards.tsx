"use client";

import Image from "next/image";
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  codeUrl?: string;
}

const projects: Project[] = [
  {
    title: "Supply Management System",
    description:
      "A comprehensive supply management system developed during my internship at Quanby Solution Inc. Features include inventory tracking, order management, and supplier management.",
    image: "/supply-management.png",
    tags: ["Angular", "PostgreSQL", "Prisma", "Express"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "Document Management System",
    description:
      "A demo system developed during OJT for efficient document handling and organization. Includes features for document upload, categorization, and search functionality.",
    image: "/document-management.png",
    tags: ["Angular", "Supabase", "Node.js", "PostgreSQL"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "QBYFI Website",
    description: "Designing the UI/UX for the QBYFI website.",
    image: "/qbyfi-website.png",
    tags: ["Figma"],
    liveUrl: "#",
  },
  {
    title: "CRIS System Maintenance",
    description:
      "Contributed to the maintenance and improvement of the Civil Registry Information System during my internship. Worked on Frontend enhancements.",
    image: "/cris-maintenance.png",
    tags: ["Next.js", "PostgreSQL", "Prisma", "Express"],
  },
  {
    title: "Albay Chamber of Commerce Website",
    description:
      "Developed a WordPress website for the Albay Chamber of Commerce and Industry, featuring business listings, news updates, and event management.",
    image: "/albay-chamber.png",
    tags: ["WordPress", "JavaScript"],
    liveUrl: "#",
  },
  {
    title: "PCIC Application QA Testing",
    description:
      "Conducted in-field quality assurance testing for the PCIC Application, ensuring functionality and user experience across different environments.",
    image: "/pcic-testing.png",
    tags: ["QA Testing", "Documentation", "Bug Tracking"],
  },
];

export function WorkCards() {
  return (
    <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 md:gap-x-16 md:gap-y-20 w-full max-w-5xl">
      {projects.map((project, index) => (
        <div key={index} className="group flex flex-col items-start w-full">
          {/* Card Image Container */}
          <div className="relative mb-6 w-full overflow-hidden rounded-2xl border border-border/40 bg-white/5 aspect-[16/10] transition-all duration-300 shadow-md">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority={index < 2}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>

          {/* Title */}
          <h3 className="mb-3 text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-indigo-400">
            {project.title}
          </h3>

          {/* Description */}
          <p className="mb-6 text-[14px] leading-relaxed text-muted-foreground/90 font-normal">
            {project.description}
          </p>

          {/* Tags */}
          <div className="mb-8 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-foreground/80 tracking-wide">
            {project.tags.map((tag) => (
              <span key={tag} className="transition-colors hover:text-foreground">
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          {(project.liveUrl || project.codeUrl) && (
            <div className="mt-auto flex flex-wrap gap-3">
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  className="inline-flex h-9 items-center justify-center rounded-full bg-foreground px-5 text-xs font-semibold text-background transition-colors hover:bg-foreground/90"
                >
                  View Live Demo
                </Link>
              )}
              {project.codeUrl && (
                <Link
                  href={project.codeUrl}
                  className="inline-flex h-9 items-center justify-center rounded-full border border-border/80 bg-background/40 backdrop-blur-sm px-5 text-xs font-semibold text-foreground transition-colors hover:bg-foreground/10"
                >
                  View Code
                </Link>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default WorkCards;
