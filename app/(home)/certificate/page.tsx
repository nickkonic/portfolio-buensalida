import { Header } from "@/app/features/home/components/header";
import { Footer } from "@/app/features/home/components/footer";
import { CertificateCards } from "@/app/features/certificate/certificate-cards";

export const metadata = {
  title: "Certificates — Karl Nestor Buensalida",
  description: "Browse verified professional developer credentials, technical specializations, and curriculum accomplishments.",
};

export default function CertificatePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-start pt-28 md:pt-36 pb-36 overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* Ambient glow blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-violet-600/15 blur-[100px]"
      />

      {/* Header Navigation */}
      <Header />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl px-8 md:px-12 flex flex-col items-start text-left mb-16">
        <h1 className="font-heading mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Certificate
        </h1>
        <p className="mb-12 text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
          Explore my academic specializations, professional course completions, and certified technical achievements. Click on any certificate to view high-resolution visual proof and credentials verification keys.
        </p>

        <CertificateCards />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
