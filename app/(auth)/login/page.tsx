import { LoginForm } from "@/components/login-form"

export const metadata = {
  title: "Admin Login — Karl Buensalida",
  description: "Secure admin login portal.",
};

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background text-foreground transition-colors duration-300 px-4">
      {/* Ambient glow blobs — same as home */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-150 w-150 -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-100 w-100 rounded-full bg-violet-600/15 blur-[100px]"
      />

      <div className="relative z-10 w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </main>
  )
}
