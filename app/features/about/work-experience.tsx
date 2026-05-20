interface ExperienceItem {
    company: string;
    date: string;
    role: string;
    bullets: string[];
}

export function WorkExperience({ experiences }: { experiences: ExperienceItem[] }) {
    return (
        <section id="work-experience" className="scroll-mt-32">
            <h2 className="mb-10 text-3xl font-bold tracking-tight md:text-4xl">Work Experience</h2>
            
            {experiences.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">No work experience records listed.</p>
            ) : (
                <div className="flex flex-col gap-12">
                    {experiences.map((exp, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <div className="flex flex-col justify-between sm:flex-row sm:items-baseline">
                                <h3 className="text-xl font-bold">{exp.company}</h3>
                                <span className="text-sm text-muted-foreground">{exp.date}</span>
                            </div>
                            <p className="text-blue-400 font-medium text-sm mb-2">{exp.role}</p>
                            <ul className="flex flex-col gap-3">
                                {exp.bullets.map((bullet, i) => (
                                    <li key={i} className="flex items-start gap-3 text-foreground/80 text-sm">
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                                        <span className="leading-relaxed">{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
