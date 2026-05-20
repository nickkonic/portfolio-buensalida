"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Calendar, 
  Tag, 
  ExternalLink, 
  Award, 
  CheckCircle,
  Copy,
  Check,
  Maximize2,
  X
} from "lucide-react";
import { certificates } from "@/app/lib/certificate-data";
import { SvgCertificateProof } from "../svg-certificate-proof";

interface ReadCertProps {
  id: string;
}

export function ReadCert({ id }: ReadCertProps) {
  const cert = certificates.find((c) => c.id === id);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showLightbox, setShowLightbox] = useState<boolean>(false);

  if (!cert) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-6">
        <h2 className="text-2xl font-bold mb-4">Credential Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          The credential you are trying to view does not exist or has been removed.
        </p>
        <Link
          href="/certificate"
          className="inline-flex h-10 items-center justify-center rounded-full bg-foreground px-6 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
        >
          Return to Certificates
        </Link>
      </div>
    );
  }

  const handleCopyId = (licenseId: string) => {
    navigator.clipboard.writeText(licenseId);
    setCopiedId(licenseId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Safe and clean custom markdown parser for credential curriculums
  const renderMarkdown = (text: string) => {
    const lines = text.split("\n");
    let inList = false;
    let listItems: string[] = [];
    const elements: React.ReactNode[] = [];

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      // Lists
      if (trimmed.startsWith("- ")) {
        if (!inList) {
          inList = true;
          listItems = [];
        }
        listItems.push(trimmed.slice(2));
        return;
      } else if (inList && (trimmed === "" || !trimmed.startsWith("- "))) {
        inList = false;
        elements.push(
          <ul key={`list-${idx}`} className="my-6 ml-6 list-disc space-y-3 text-muted-foreground/90 leading-relaxed text-[15px]">
            {listItems.map((item, lIdx) => (
              <li key={lIdx} className="pl-1">
                {parseInlineMarkdown(item)}
              </li>
            ))}
          </ul>
        );
        listItems = [];
      }

      if (inList) return; // Skip if already inside a list item processing block

      // Headings
      if (trimmed.startsWith("### ")) {
        elements.push(
          <h3 key={`h3-${idx}`} className="text-xl font-bold tracking-tight text-foreground mt-10 mb-4 first:mt-0 font-heading">
            {parseInlineMarkdown(trimmed.slice(4))}
          </h3>
        );
      } else if (trimmed.startsWith("#### ")) {
        elements.push(
          <h4 key={`h4-${idx}`} className="text-base font-bold tracking-tight text-foreground/90 mt-8 mb-3 font-heading">
            {parseInlineMarkdown(trimmed.slice(5))}
          </h4>
        );
      } else if (trimmed === "---") {
        elements.push(
          <hr key={`hr-${idx}`} className="my-10 border-border/30" />
        );
      } else if (trimmed !== "") {
        // Paragraph
        elements.push(
          <p key={`p-${idx}`} className="my-5 text-[15px] leading-relaxed text-muted-foreground/90 font-normal">
            {parseInlineMarkdown(trimmed)}
          </p>
        );
      }
    });

    // Flush trailing lists
    if (inList) {
      elements.push(
        <ul key={`list-end`} className="my-6 ml-6 list-disc space-y-3 text-muted-foreground/90 leading-relaxed text-[15px]">
          {listItems.map((item, lIdx) => (
            <li key={lIdx} className="pl-1">
              {parseInlineMarkdown(item)}
            </li>
          ))}
        </ul>
      );
    }

    return elements;
  };

  // Basic bold format parsing
  const parseInlineMarkdown = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    let currentText = text;
    let keyIdx = 0;

    while (currentText) {
      const boldMatch = currentText.match(/\*\*(.*?)\*\*/);

      if (!boldMatch) {
        parts.push(<React.Fragment key={keyIdx++}>{currentText}</React.Fragment>);
        break;
      }

      const index = boldMatch.index ?? Infinity;
      const matchText = boldMatch[0];
      const innerText = boldMatch[1];

      if (index > 0) {
        parts.push(
          <React.Fragment key={keyIdx++}>
            {currentText.slice(0, index)}
          </React.Fragment>
        );
      }

      parts.push(
        <strong key={keyIdx++} className="font-bold text-foreground">
          {innerText}
        </strong>
      );

      currentText = currentText.slice(index + matchText.length);
    }

    return parts;
  };

  return (
    <div className="w-full max-w-5xl px-6 md:px-8 relative z-10 flex flex-col items-start select-text">
      {/* Back Button */}
      <Link
        href="/certificate"
        className="inline-flex items-center gap-2 mb-10 text-sm text-muted-foreground/80 hover:text-foreground transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to credentials</span>
      </Link>

      {/* Grid Content: Left for Certificate Image, Right/Bottom for Text */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        
        {/* Left Column: Premium SVG Certificate Proof (Span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div 
            className="relative group cursor-zoom-in rounded-2xl overflow-hidden shadow-2xl border border-border/40"
            onClick={() => setShowLightbox(true)}
          >
            <SvgCertificateProof certificate={cert} className="w-full" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 bg-black/60 text-white text-xs font-semibold backdrop-blur-md shadow-lg">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Zoom Credential Proof</span>
              </span>
            </div>
          </div>

          {/* Technical Curriculum details */}
          <div className="p-6 md:p-8 rounded-3xl border border-border/40 bg-card/25 backdrop-blur-sm shadow-md mt-4">
            <h2 className="text-xl font-bold tracking-tight text-foreground font-heading mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-400" />
              <span>Curriculum & Program Syllabus</span>
            </h2>
            
            <div className="text-left text-zinc-300">
              {renderMarkdown(cert.curriculum)}
            </div>
          </div>
        </div>

        {/* Right Column: Meta Info & Skill Competencies (Span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-28">
          {/* Metadata Card */}
          <div className="p-6 md:p-8 rounded-3xl border border-border/40 bg-card/25 backdrop-blur-sm shadow-md">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-cyan-400 mb-4 uppercase tracking-wider">
              <Tag className="h-3.5 w-3.5 stroke-[2]" />
              {cert.category}
            </div>

            <h1 className="text-xl sm:text-2xl font-bold leading-snug tracking-tight text-foreground mb-4 font-heading">
              {cert.title}
            </h1>

            <p className="text-xs text-muted-foreground/90 leading-relaxed mb-6">
              {cert.description}
            </p>

            <hr className="border-border/30 my-6" />

            {/* Structured detail list */}
            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Issuing Authority</span>
                <span className="font-semibold text-foreground">{cert.issuer} Academy</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Date of Completion</span>
                <span className="font-semibold text-foreground">{cert.issueDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Verification Authority</span>
                <span className="font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Authenticated</span>
                </span>
              </div>
            </div>

            <hr className="border-border/30 my-6" />

            {/* License ID Box */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-foreground/5 mb-6">
              <div>
                <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-bold mb-0.5">License ID</p>
                <p className="text-xs text-foreground font-mono font-semibold">{cert.credentialId}</p>
              </div>
              <button
                onClick={() => handleCopyId(cert.credentialId)}
                className="p-2 rounded-lg border border-border bg-card hover:bg-foreground/5 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                title="Copy to clipboard"
              >
                {copiedId === cert.credentialId ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Action Verify online */}
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex h-11 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-xs font-semibold text-background transition-colors hover:bg-foreground/90"
            >
              <span>Verify Official Credential</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Skill badging cloud */}
          <div className="p-6 md:p-8 rounded-3xl border border-border/40 bg-card/25 backdrop-blur-sm shadow-md">
            <h3 className="text-xs uppercase tracking-widest font-semibold text-foreground mb-4">Competency Badges</h3>
            <div className="flex flex-wrap gap-2">
              {cert.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-1.5 rounded-full border border-border/50 bg-background/50 text-xs text-muted-foreground hover:text-foreground hover:border-indigo-500/30 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* HIGH-RES LIGHTBOX VIEW (FULLSCREEN ACCENT VIEW) */}
      {/* ========================================================================= */}
      {showLightbox && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-6 md:p-12 cursor-zoom-out animate-fade-in"
          onClick={() => setShowLightbox(false)}
        >
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-6 right-6 p-2.5 rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/15 transition-all cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <div 
            className="w-full max-w-4xl shadow-3xl border border-white/10 rounded-2xl overflow-hidden scale-in-lightbox"
            onClick={(e) => e.stopPropagation()}
          >
            <SvgCertificateProof certificate={cert} className="w-full" />
          </div>

          <div className="mt-6 text-center">
            <h3 className="text-white font-bold text-lg">{cert.title}</h3>
            <p className="text-zinc-400 text-xs mt-1">Official Credential Verification Sheet — Click anywhere to exit</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReadCert;
