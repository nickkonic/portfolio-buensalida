"use client";

import React from "react";
import { AboutProfile } from "@/hooks/use-about";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Edit3,
  Globe,
  Mail,
  Calendar,
  Briefcase,
  GraduationCap,
  MapPin,
  Clock,
} from "lucide-react";

const Github = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const Linkedin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);


interface ViewProfileDetailsProps {
  profile: AboutProfile;
  onBack: () => void;
  onEdit: () => void;
}

export function ViewProfileDetails({ profile, onBack, onEdit }: ViewProfileDetailsProps) {
  return (
    <div className="mx-auto max-w-5xl rounded-2xl border border-border/85 bg-card/40 p-6 md:p-8 shadow-xl backdrop-blur-md">
      {/* Header Controls */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onBack}
            className="rounded-xl"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">View Profile</h1>
            <p className="text-sm text-muted-foreground">Detailed view and public layout mock of this profile</p>
          </div>
        </div>

        <Button
          onClick={onEdit}
          className="rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium flex items-center gap-2 shadow-[0_0_12px_rgba(99,102,241,0.3)]"
        >
          <Edit3 className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Card: Summary Metadata */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-border bg-background/50 rounded-2xl overflow-hidden shadow">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              {/* Avatar / Profile photo */}
              <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-muted shadow-md mb-4 bg-muted">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-indigo-500/10 text-indigo-400 font-bold text-3xl">
                    {profile.name.charAt(0)}
                  </div>
                )}
              </div>

              <h2 className="text-xl font-bold tracking-tight text-foreground">{profile.name}</h2>
              <p className="text-sm text-indigo-400 font-medium mt-1">{profile.title}</p>
              
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {profile.isActive ? (
                  <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                    Active Site Profile
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground border-border px-2.5 py-0.5 rounded-full text-xs font-medium">
                    Inactive Draft
                  </Badge>
                )}
              </div>

              <Separator className="my-6 bg-border/60" />

              {/* Specs */}
              <div className="w-full space-y-4 text-left text-sm">
                <div className="flex items-center gap-3 text-foreground/80">
                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="font-semibold text-xs text-muted-foreground">Location:</span>
                  <span className="ml-auto font-medium text-xs">Asia/Manila</span>
                </div>
                <div className="flex items-center gap-3 text-foreground/80">
                  <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="font-semibold text-xs text-muted-foreground">Timezone:</span>
                  <span className="ml-auto font-medium text-xs">{profile.timezone}</span>
                </div>
              </div>

              <Separator className="my-6 bg-border/60" />

              {/* Connections list */}
              <div className="w-full space-y-3">
                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors p-2 rounded-xl border border-border/40 bg-secondary/5"
                  >
                    <Github className="h-4 w-4 shrink-0" />
                    GitHub Link
                  </a>
                )}
                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors p-2 rounded-xl border border-border/40 bg-secondary/5"
                  >
                    <Linkedin className="h-4 w-4 shrink-0" />
                    LinkedIn Link
                  </a>
                )}
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors p-2 rounded-xl border border-border/40 bg-secondary/5"
                  >
                    <Mail className="h-4 w-4 shrink-0" />
                    {profile.email}
                  </a>
                )}
                {profile.scheduleCallUrl && (
                  <a
                    href={profile.scheduleCallUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors p-2 rounded-xl border border-indigo-500/20 bg-indigo-500/5"
                  >
                    <Calendar className="h-4 w-4 shrink-0" />
                    Schedule Call
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Details: Bio, Work, Education */}
        <div className="lg:col-span-2 space-y-8">
          {/* Bio block */}
          <div className="space-y-3">
            <h3 className="text-base font-bold uppercase tracking-widest text-muted-foreground">Biography</h3>
            <p className="text-base text-foreground/80 leading-relaxed bg-background/30 p-5 border border-border/60 rounded-2xl">
              {profile.bio}
            </p>
          </div>

          <Separator className="bg-border/60" />

          {/* Work experiences block */}
          <div className="space-y-4">
            <h3 className="text-base font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-indigo-400" />
              Work History
            </h3>

            {!profile.workExperiences || profile.workExperiences.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">No work history records provided.</p>
            ) : (
              <div className="space-y-6 pl-2 border-l border-border/60">
                {profile.workExperiences.map((exp, index) => (
                  <div key={index} className="relative pl-6 space-y-2">
                    {/* Ring timeline marker */}
                    <span className="absolute -left-[29px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-indigo-500 bg-background" />

                    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1">
                      <h4 className="text-lg font-bold text-foreground">{exp.company}</h4>
                      <span className="text-xs font-semibold text-muted-foreground bg-secondary/60 px-2 py-0.5 rounded-md border border-border/50">
                        {exp.date}
                      </span>
                    </div>

                    <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{exp.role}</p>

                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="space-y-2 pt-1">
                        {exp.bullets.map((bullet, bulletIndex) => (
                          <li key={bulletIndex} className="flex items-start gap-2.5 text-sm text-foreground/80">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500/80" />
                            <span className="leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator className="bg-border/60" />

          {/* Education block */}
          <div className="space-y-4">
            <h3 className="text-base font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-indigo-400" />
              Studies & Education
            </h3>

            {!profile.studies || profile.studies.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">No educational records provided.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.studies.map((study, index) => (
                  <Card key={index} className="border-border/80 bg-background/30 rounded-2xl shadow-sm">
                    <CardContent className="p-4 space-y-2">
                      <h4 className="text-sm font-bold text-foreground leading-snug">{study.school}</h4>
                      <p className="text-xs text-indigo-400 font-semibold">{study.degree}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
