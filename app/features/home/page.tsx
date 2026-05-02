import Link from "next/link";
import Image from "next/image";

export function HomeFeature() {
    return (
        <section className="relative z-10 w-full max-w-5xl flex flex-col items-start text-left">
            {/* Recent project badge */}
            <div className="mb-4 inline-flex items-center rounded-full border border-border/50 bg-white/5 px-3 py-1.5 text-xs font-medium text-foreground/70 backdrop-blur-sm transition-colors hover:bg-white/10">
                Recent project: <span className="ml-1 font-semibold text-foreground">AMS Supply</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-heading mb-4 text-5xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-6xl lg:text-[5.5rem]">
                Hi! I'm Karl Nestor
                <br />
                Buensalida
            </h1>

            {/* Subtitle */}
            <p className="mb-8 text-xl text-muted-foreground md:text-2xl font-medium tracking-wide">
                A passionate Full-Stack Developer from the Philippines{" "}
                <span className="text-base text-muted-foreground/70">PH</span>
            </p>

            {/* About Button */}
            <Link
                href="/about"
                className="inline-flex items-center gap-3 rounded-full border border-border/50 bg-background/50 pr-5 pl-1.5 py-1.5 backdrop-blur-md transition-colors hover:bg-foreground/10"
            >
                <div className="relative h-8 w-8 overflow-hidden rounded-full border border-border/50">
                    <Image
                        src="https://github.com/shadcn.png" // Placeholder avatar, replace with real image later
                        alt="Karl Nestor Buensalida"
                        fill
                        className="object-cover"
                    />
                </div>
                <span className="text-sm font-semibold text-foreground">
                    About — Karl Nestor Buensalida
                </span>
            </Link>
        </section>
    );
}

export default HomeFeature;
