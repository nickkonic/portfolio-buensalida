"use client";

import React from "react";
import { Introduction } from "@/app/features/about/introduction";
import { WorkExperience } from "@/app/features/about/work-experience";
import { Studies } from "@/app/features/about/studies";
import { TechnicalSkills, TechnicalSkill } from "@/app/features/about/technical-skills";

interface AboutPublicPreviewProps {
  name: string;
  title: string;
  bio: string;
  timezone: string;
  avatarUrl: string | null;
  githubUrl?: string;
  linkedinUrl?: string;
  email?: string;
  workExperiences: {
    company: string;
    role: string;
    date: string;
    bullets: string[];
  }[];
  studies: {
    school: string;
    degree: string;
  }[];
  technicalSkills?: TechnicalSkill[];
}

export function AboutPublicPreview({
  name,
  title,
  bio,
  timezone,
  avatarUrl,
  githubUrl,
  linkedinUrl,
  email,
  workExperiences,
  studies,
  technicalSkills = [],
}: AboutPublicPreviewProps) {
  const displayInitial = (name || "?").trim().charAt(0).toUpperCase() || "?";

  return (
    <div className="flex flex-col min-h-full rounded-2xl border border-border bg-card/10 shadow-xl overflow-hidden backdrop-blur-sm transition-all duration-300">
      {/* Viewport content */}
      <div className="relative flex-1 bg-background text-foreground transition-colors duration-300 p-6 md:p-8">
        {/* Ambient glow blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-indigo-600/5 blur-[80px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 h-[250px] w-[250px] rounded-full bg-violet-600/5 blur-[70px]"
        />

        <div className="relative z-10 mx-auto max-w-4xl pt-4 pb-12">
          {/* Main layout matching page.tsx but adapted in width and height */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[180px_1fr] md:gap-10">

            {/* Sidebar (left column) */}
            <aside className="flex flex-col items-center md:items-start shrink-0">
              <div className="mb-6 flex flex-col items-center md:items-start">
                {/* Avatar Image Frame */}
                <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-background bg-secondary shadow-xl">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={name || "Profile avatar"}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-muted-foreground">
                      {displayInitial}
                    </div>
                  )}
                </div>

                {/* Timezone */}
                <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-foreground/80">
                  <div className="h-4.5 w-4.5 rounded-full bg-[#f472b6] shadow-[0_0_8px_rgba(244,114,182,0.4)]" />
                  <span>{timezone}</span>
                </div>

                {/* Simulated Language Switchers */}
                <div className="mt-4 flex gap-1.5">
                  <button type="button" className="rounded-full border border-border bg-foreground/10 px-3 py-1 text-[11px] font-semibold text-foreground select-none cursor-default">English</button>
                  <button type="button" className="rounded-full border border-border bg-transparent px-3 py-1 text-[11px] font-medium text-muted-foreground select-none cursor-default">Tagalog</button>
                </div>
              </div>
            </aside>

            {/* Content (right column) */}
            <div className="flex flex-col gap-12 text-left">
              {/* Introduction Section */}
              <Introduction
                name={name}
                title={title}
                bio={bio}
                githubUrl={githubUrl}
                linkedinUrl={linkedinUrl}
                email={email}
              />

              {/* Separator line */}
              <div className="h-px w-full bg-border/40" />

              {/* Work Experience Section */}
              <WorkExperience experiences={workExperiences} />

              {/* Separator line */}
              <div className="h-px w-full bg-border/40" />

              {/* Studies Section */}
              <Studies studies={studies} />

              {/* Separator line */}
              <div className="h-px w-full bg-border/40" />

              {/* Technical Skills Section */}
              <TechnicalSkills skills={technicalSkills} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
