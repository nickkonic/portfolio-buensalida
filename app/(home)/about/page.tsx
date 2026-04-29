import { Header } from "@/app/features/home/components/header";

export default function AboutPage() {
    return (
        <main className="relative flex min-h-screen flex-col items-center justify-start pt-20 md:pt-40 pb-32 overflow-hidden bg-background text-foreground transition-colors duration-300">
            {/* Ambient glow blobs */}
            <div
                aria-hidden
                className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-violet-600/15 blur-[100px]"
            />

            <div>Hi ABout</div>

            {/* Header Navigation */}
            <Header />
        </main>
    );
}
