import { Header } from "@/app/features/home/components/header";
import { Footer } from "@/app/features/home/components/footer";
import Image from "next/image";
import { Introduction } from "@/app/features/about/introduction";
import { WorkExperience } from "@/app/features/about/work-experience";
import { Studies } from "@/app/features/about/studies";
import { TechnicalSkills } from "@/app/features/about/technical-skills";
import { query } from "@/app/lib/db";

export const dynamic = "force-dynamic";

async function getActiveProfile() {
    try {
        let profiles = await query<{
            id: string;
            name: string;
            title: string;
            avatar_url: string | null;
            timezone: string;
            schedule_call_url: string | null;
            github_url: string | null;
            linkedin_url: string | null;
            email: string | null;
            bio: string;
            is_active: boolean;
        }>(
            `SELECT id, name, title, avatar_url, timezone, schedule_call_url, github_url, linkedin_url, email, bio, is_active
             FROM about_profiles
             WHERE is_active = true
             LIMIT 1`
        );

        if (profiles.length === 0) {
            profiles = await query<{
                id: string;
                name: string;
                title: string;
                avatar_url: string | null;
                timezone: string;
                schedule_call_url: string | null;
                github_url: string | null;
                linkedin_url: string | null;
                email: string | null;
                bio: string;
                is_active: boolean;
            }>(
                `SELECT id, name, title, avatar_url, timezone, schedule_call_url, github_url, linkedin_url, email, bio, is_active
                 FROM about_profiles
                 ORDER BY created_at DESC
                 LIMIT 1`
            );
        }

        const profile = profiles[0];
        if (!profile) return null;

        const workExperiences = await query<{
            company: string;
            role: string;
            date: string;
            bullets: string[];
            order: number;
        }>(
            `SELECT company, role, date, bullets, "order"
             FROM about_work_experiences
             WHERE about_id = $1
             ORDER BY "order" ASC`,
            [profile.id]
        );

        const studies = await query<{
            school: string;
            degree: string;
            order: number;
        }>(
            `SELECT school, degree, "order"
             FROM about_studies
             WHERE about_id = $1
             ORDER BY "order" ASC`,
            [profile.id]
        );

        const technicalSkills = await query<{
            id: string;
            name: string;
            url: string;
            link: string | null;
            category: string;
            order: number;
        }>(
            `SELECT id, name, url, link, category, "order"
             FROM about_technical_skills
             WHERE about_id = $1
             ORDER BY "order" ASC`,
            [profile.id]
        );

        return {
            name: profile.name,
            title: profile.title,
            avatarUrl: profile.avatar_url,
            timezone: profile.timezone,
            githubUrl: profile.github_url,
            linkedinUrl: profile.linkedin_url,
            email: profile.email,
            bio: profile.bio,
            workExperiences,
            studies,
            technicalSkills
        };
    } catch (error) {
        console.error("Failed to query active profile:", error);
        return null;
    }
}

export default async function AboutPage() {
    const profile = await getActiveProfile();

    if (!profile) {
        return (
            <main className="relative flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
                <Header />
                <div className="mx-auto w-full max-w-3xl px-6 py-24 text-center">
                    <h1 className="text-3xl font-bold tracking-tight">About Profile Not Available</h1>
                    <p className="mt-3 text-muted-foreground">No published profile has been set yet.</p>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="relative flex min-h-screen flex-col items-center justify-start bg-background text-foreground transition-colors duration-300">
            {/* Ambient glow blobs */}
            <div
                aria-hidden
                className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[120px]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[100px]"
            />

            <div className="container relative z-10 mx-auto max-w-6xl px-6 pt-16 pb-24 md:px-12 lg:pt-24">
                {/* Fixed Left Navigation */}
                <nav className="fixed left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 z-50">
                    <SectionNavLink href="#introduction" label="Introduction" />
                    <SectionNavLink href="#work-experience" label="Work Experience" />
                    <SectionNavLink href="#studies" label="Studies" />
                    <SectionNavLink href="#technical-skills" label="Technical skills" />
                </nav>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-[320px_1fr] lg:gap-12">
                    {/* Left Sidebar (Sticky) */}
                    <aside className="relative">
                        <div className="lg:sticky lg:top-24 flex flex-col items-center lg:items-start">
                            {/* Profile Section */}
                            <div className="mb-8 flex flex-col items-center lg:items-start">
                                <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-background shadow-2xl">
                                    {profile.avatarUrl ? (
                                        <Image
                                            src={profile.avatarUrl}
                                            alt={profile.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-secondary text-6xl font-bold text-muted-foreground">
                                            {profile.name.trim().charAt(0).toUpperCase() || "?"}
                                        </div>
                                    )}
                                </div>
                                
                                <div className="mt-4 flex items-center gap-2 text-base font-medium text-foreground/80">
                                    <div className="h-5 w-5 rounded-full bg-[#f472b6] shadow-[0_0_10px_rgba(244,114,182,0.5)]" />
                                    <span>{profile.timezone}</span>
                                </div>

                                <div className="mt-4 flex gap-2">
                                    <button className="rounded-full border border-border bg-foreground/10 px-4 py-1.5 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/20">English</button>
                                    <button className="rounded-full border border-border bg-transparent px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground">Tagalog</button>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Right Content Area */}
                    <div className="flex flex-col gap-16 md:gap-24">
                        <Introduction
                            name={profile.name}
                            title={profile.title}
                            bio={profile.bio}
                            githubUrl={profile.githubUrl ?? undefined}
                            linkedinUrl={profile.linkedinUrl ?? undefined}
                            email={profile.email ?? undefined}
                        />
                        <WorkExperience experiences={profile.workExperiences} />
                        <Studies studies={profile.studies} />
                        <TechnicalSkills skills={profile.technicalSkills} />
                    </div>
                </div>
            </div>

            {/* Header Navigation */}
            <Header />
            {/* Footer */}
            <Footer />
        </main>
    );
}

function SectionNavLink({ href, label }: { href: string; label: string }) {
    return (
        <a 
            href={href} 
            className="group flex items-center gap-3 text-[13px] font-medium text-muted-foreground transition-all hover:text-foreground"
        >
            <span className="h-px w-3 bg-muted-foreground/40 transition-all group-hover:w-6 group-hover:bg-foreground"></span>
            {label}
        </a>
    );
}
