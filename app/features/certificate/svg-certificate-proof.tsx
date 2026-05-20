"use client";

import React from "react";
import { Award, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Certificate } from "@/app/lib/certificate-data";

interface SvgCertificateProofProps {
  certificate: Certificate;
  className?: string;
}

export function SvgCertificateProof({ certificate, className = "" }: SvgCertificateProofProps) {
  const isMeta = certificate.id.includes("meta");
  const isAngular = certificate.id.includes("angular");
  const isSupabase = certificate.id.includes("supabase");

  // Custom logo colors & shapes
  let badgeColor = "text-indigo-400";
  let ringColor = "border-indigo-500/30";
  let techLogo = null;

  if (isMeta) {
    badgeColor = "text-blue-400";
    ringColor = "border-blue-500/30";
    techLogo = (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.988 12.016c0 1.258-1.258 2.277-2.825 2.277h-3.328v2.308h3.328c2.825 0 5.127-2.05 5.127-4.585s-2.302-4.585-5.127-4.585h-3.328v2.308h3.328c1.567 0 2.825 1.019 2.825 2.277zM4.012 12.016c0-1.258 1.258-2.277 2.825-2.277h3.328V7.431H6.837c-2.825 0-5.127 2.05-5.127 4.585s2.302 4.585 5.127 4.585h3.328v-2.308H6.837c-1.567 0-2.825-1.019-2.825-2.277zM9.5 9.5h5v5h-5z" />
      </svg>
    );
  } else if (isAngular) {
    badgeColor = "text-rose-400";
    ringColor = "border-rose-500/30";
    techLogo = (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 5.5l1.5 13L12 22l8.5-3.5 1.5-13z" opacity="0.15" />
        <path d="M12 2.5L3.5 5.5l1.3 11.5L12 21l7.2-4 1.3-11.5z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 5L5.5 16.5h2.8l1.3-3.3h4.8l1.3 3.3h2.8zm2 6.5H10L12 7.5z" />
      </svg>
    );
  } else if (isSupabase) {
    badgeColor = "text-emerald-400";
    ringColor = "border-emerald-500/30";
    techLogo = (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L3 9v8l9 5 9-5V9z" opacity="0.1" />
        <path d="M21.36 9.8a1.2 1.2 0 00-1.1-1H13.5l1.8-6.1a1 1 0 00-1.7-1L3.54 13.2a1.2 1.2 0 001.1 2H10.5l-1.8 6.1a1 1 0 001.7 1z" />
      </svg>
    );
  }

  return (
    <div className={`relative aspect-[1.414/1] w-full overflow-hidden rounded-2xl border border-border/40 bg-zinc-950 text-white shadow-2xl ${className}`}>
      {/* Background Decorative Mesh Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px] opacity-60" />

      {/* Ambient Gradient Background Blobs */}
      <div className={`absolute -top-24 -left-24 w-80 h-80 rounded-full bg-gradient-to-br ${certificate.gradient} opacity-25 blur-3xl`} />
      <div className={`absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-gradient-to-br ${certificate.gradient} opacity-20 blur-3xl`} />

      {/* Elegant Vector Lines & Borders */}
      <div className="absolute inset-4 rounded-xl border border-white/5 pointer-events-none" />
      <div className="absolute inset-6 rounded-lg border border-white/[0.02] pointer-events-none" />

      {/* Certificate Frame Accents */}
      <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-white/10" />
      <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-white/10" />
      <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-white/10" />
      <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-white/10" />

      {/* Main Content Layout */}
      <div className="absolute inset-0 p-12 flex flex-col justify-between items-center text-center">

        {/* Top Header: Issuer Logo & Verification Badge */}
        <div className="w-full flex justify-between items-start">
          <div className="flex items-center gap-3 text-left">
            <div className={`p-2 rounded-xl bg-white/5 border ${ringColor} ${badgeColor} shadow-md`}>
              {techLogo || <Award className="w-7 h-7" />}
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground/80">Verified Credential</p>
              <h4 className="text-sm font-bold tracking-tight text-white">{certificate.issuer} Academy</h4>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold tracking-wide uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Authenticated</span>
          </div>
        </div>

        {/* Center: Recipient & Award Title */}
        <div className="flex flex-col items-center my-auto">
          <p className="text-xs uppercase tracking-widest font-semibold text-cyan-400/80 mb-2">
            This is to certify that
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-heading px-4 bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            Karl Nestor Buensalida
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent my-4" />
          <p className="text-xs text-zinc-400 max-w-lg leading-relaxed mb-1">
            has successfully completed all coursework, evaluations, and projects for
          </p>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug px-6">
            {certificate.title}
          </h3>
        </div>

        {/* Bottom Metadata & Signatures */}
        <div className="w-full grid grid-cols-3 gap-4 items-end pt-4 border-t border-white/[0.05]">
          {/* Left: Issue Date */}
          <div className="text-left">
            <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-semibold mb-0.5">Date of Issue</p>
            <p className="text-xs text-zinc-300 font-medium">{certificate.issueDate}</p>
          </div>

          {/* Center: Decorative Hologram Badge */}
          <div className="flex flex-col items-center">
            <div className="relative group cursor-help">
              {/* Outer glowing rings */}
              <div className={`absolute -inset-1.5 rounded-full bg-gradient-to-r ${certificate.gradient} opacity-20 group-hover:opacity-40 blur transition-all duration-500`} />
              <div className="relative w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-cyan-400/90 shadow-lg">
                <CheckCircle2 className="w-6 h-6 stroke-[1.5]" />
              </div>
            </div>
          </div>

          {/* Right: Credential Details */}
          <div className="text-right">
            <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-semibold mb-0.5">Credential ID</p>
            <p className="text-[11px] text-zinc-300 font-mono tracking-tight font-medium">{certificate.credentialId}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
