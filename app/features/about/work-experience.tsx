export function WorkExperience() {
    const experiences = [
        {
            company: "Quanby Solution Inc",
            date: "Jan 1 - May 31, 2025",
            role: "Intern",
            bullets: [
                "As a Software Developer, Develop a Supply Management System",
                "Part of System Maintenance in CRIS (Civil Registry Information System)"
            ]
        },
        {
            company: "Quanby Solution Inc",
            date: "July 11 - Sept 27, 2024",
            role: "On the job training (OJT)",
            bullets: [
                "As a Software Developer, UI/UX, Quality Assurance (QA), Wordpress Developer",
                "Develop a Demo System called Document Management System, In-field QA testing PCIC Application, UI/UX of QBYFI Website, Develop a Wordpress website called Albay Chamber of Commerce and Industry"
            ]
        },
        {
            company: "DCTV Cable Company",
            date: "Apr 2021 - Dec 2021",
            role: "Work Immersion",
            bullets: [
                "Work with the lineman",
                "Assisting the Lineman and troubleshooting of Internet Connection",
                "Checking up of Servers"
            ]
        }
    ];

    return (
        <section id="work-experience" className="scroll-mt-32">
            <h2 className="mb-10 text-3xl font-bold tracking-tight md:text-4xl">Work Experience</h2>
            
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
        </section>
    );
}
