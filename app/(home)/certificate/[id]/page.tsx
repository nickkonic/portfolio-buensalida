import { Header } from "@/app/features/home/components/header";
import { Footer } from "@/app/features/home/components/footer";
import { ReadCert } from "@/app/features/certificate/[id]/read-cert";
import { certificates } from "@/app/lib/certificate-data";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const cert = certificates.find((c) => c.id === id);
  if (!cert) {
    return {
      title: "Credential Not Found — Karl Nestor Buensalida",
    };
  }
  return {
    title: `${cert.title} — Karl Nestor`,
    description: cert.description,
  };
}

export async function generateStaticParams() {
  return certificates.map((cert) => ({
    id: cert.id,
  }));
}

export default async function CertificateDetailPage({ params }: PageProps) {
  const { id } = await params;
  const certExists = certificates.some((c) => c.id === id);

  if (!certExists) {
    notFound();
  }

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
      <div className="relative z-10 w-full flex flex-col items-center justify-start mb-16">
        <ReadCert id={id} />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
