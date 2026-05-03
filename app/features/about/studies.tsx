export function Studies() {
    const studies = [
        {
            school: "Southern Luzon Technological College Foundation, Inc. (SLTCFI)",
            degree: "Bachelor of Science in Computer Science"
        },
        {
            school: "Divine Word College of Legazpi",
            degree: "Bachelor of Science in Information Technology"
        }
    ];

    return (
        <section id="studies" className="scroll-mt-32">
            <h2 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">Studies</h2>
            
            <div className="flex flex-col gap-8">
                {studies.map((study, index) => (
                    <div key={index} className="flex flex-col gap-1">
                        <h3 className="text-lg font-bold md:text-xl">{study.school}</h3>
                        <p className="text-sm text-muted-foreground">{study.degree}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
