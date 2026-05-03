export function TechnicalSkills() {
    return (
        <section id="technical-skills" className="scroll-mt-32">
            <h2 className="mb-10 text-3xl font-bold tracking-tight md:text-4xl">Technical skills</h2>
            
            <div className="flex flex-col gap-12">
                {/* Programming Languages */}
                <div>
                    <h3 className="mb-2 text-xl font-bold">Programming Languages</h3>
                    <p className="mb-6 text-sm text-muted-foreground">Proficient in Python, JavaScript, TypeScript, and PHP</p>
                    <div className="flex flex-wrap gap-4">
                        <SkillIcon name="Python" url="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" />
                        <SkillIcon name="JavaScript" url="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />
                        <SkillIcon name="TypeScript" url="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
                        <SkillIcon name="PHP" url="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" />
                    </div>
                </div>

                {/* Backend Development */}
                <div>
                    <h3 className="mb-2 text-xl font-bold">Backend Development</h3>
                    <p className="mb-6 text-sm text-muted-foreground">Proficient in Node.js, Express, and Prisma</p>
                    <div className="flex flex-wrap gap-4">
                        <SkillIcon name="Node.js" url="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" />
                        <SkillIcon name="Express" url="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" className="filter invert dark:invert-0" />
                        <SkillIcon name="Prisma" url="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg" className="filter invert dark:invert-0" />
                    </div>
                </div>

                {/* Frontend Development */}
                <div>
                    <h3 className="mb-2 text-xl font-bold">Frontend Development</h3>
                    <p className="mb-6 text-sm text-muted-foreground">Proficient in Angular, React, Next.js, HTML, CSS, and Tailwind</p>
                    <div className="flex flex-wrap gap-4">
                        <SkillIcon name="Angular" url="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg" />
                        <SkillIcon name="React" url="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
                        <SkillIcon name="Next.js" url="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" className="filter invert dark:invert-0" />
                        <SkillIcon name="HTML" url="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" />
                        <SkillIcon name="CSS" url="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" />
                        <SkillIcon name="Tailwind" url="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" />
                    </div>
                </div>

                {/* Databases & Dev Tools */}
                <div>
                    <h3 className="mb-2 text-xl font-bold">Databases & Dev Tools</h3>
                    <p className="mb-6 text-sm text-muted-foreground">Proficient in MySQL, PostgreSQL, and Supabase</p>
                    <div className="flex flex-wrap gap-4">
                        <SkillIcon name="MySQL" url="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" />
                        <SkillIcon name="PostgreSQL" url="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" />
                        <SkillIcon name="Supabase" url="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" />
                    </div>
                </div>

                {/* DevOps & Tools */}
                <div>
                    <h3 className="mb-2 text-xl font-bold">DevOps & Tools</h3>
                    <p className="mb-6 text-sm text-muted-foreground">Proficient in Git, Figma, and WordPress</p>
                    <div className="flex flex-wrap gap-4">
                        <SkillIcon name="Git" url="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" />
                        <SkillIcon name="Figma" url="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" />
                        <SkillIcon name="WordPress" url="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg" className="filter invert dark:invert-0" />
                    </div>
                </div>
            </div>
        </section>
    );
}

function SkillIcon({ name, url, className = "" }: { name: string, url: string, className?: string }) {
    return (
        <div 
            className="group relative flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/30 p-3 shadow-sm transition-all hover:-translate-y-1 hover:bg-secondary/50"
            title={name}
        >
            <img 
                src={url} 
                alt={name} 
                className={`h-full w-full object-contain ${className}`}
                loading="lazy"
            />
            {/* Tooltip */}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 scale-0 rounded bg-foreground px-2 py-1 text-[10px] text-background opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100 whitespace-nowrap z-10">
                {name}
            </span>
        </div>
    );
}
