import Image from "next/image";
import Link from "next/link";

const projects = [
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
];

export function WebProjects() {
  return (
    <section className="relative z-10 w-full max-w-5xl px-8 mt-32 flex flex-col items-start text-left">
      <h2 className="font-heading mb-12 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Web Development Projects
      </h2>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {projects.map((project, index) => (
          <div key={index} className="group flex flex-col items-start">
            {/* Image Container */}
            <div className="relative mb-6 w-full overflow-hidden rounded-xl border border-border/50 bg-white/5 aspect-[16/10]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <h3 className="mb-3 text-xl font-bold text-foreground">
              {project.title}
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="mb-8 flex flex-wrap gap-4 text-xs font-medium text-foreground/80">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            {/* Buttons */}
            <div className="mt-auto flex flex-wrap gap-4">
              <Link
                href={project.liveUrl}
                className="inline-flex h-10 items-center justify-center rounded-lg bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
              >
                View Live Demo
              </Link>
              <Link
                href={project.codeUrl}
                className="inline-flex h-10 items-center justify-center rounded-lg border border-border/50 bg-background/50 px-6 text-sm font-medium text-foreground transition-colors hover:bg-foreground/10"
              >
                View Code
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
