import { Header } from "@/app/features/home/components/header";
import { Footer } from "@/app/features/home/components/footer";
import Image from "next/image";
import { Introduction } from "@/app/features/about/introduction";
import { WorkExperience } from "@/app/features/about/work-experience";
import { Studies } from "@/app/features/about/studies";
import { TechnicalSkills } from "@/app/features/about/technical-skills";

export default function AboutPage() {
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
                                    <Image
                                        src="https://github.com/shadcn.png" // Placeholder avatar
                                        alt="Karl Nestor Buensalida"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                
                                <div className="mt-4 flex items-center gap-2 text-base font-medium text-foreground/80">
                                    <div className="h-5 w-5 rounded-full bg-[#f472b6] shadow-[0_0_10px_rgba(244,114,182,0.5)]" />
                                    <span>Asia/Manila</span>
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
                        <Introduction />
                        <WorkExperience />
                        <Studies />
                        <TechnicalSkills />
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
