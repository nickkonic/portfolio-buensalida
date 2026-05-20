"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Award, 
  ExternalLink, 
  Eye, 
  X, 
  Calendar, 
  Tag, 
  FileText, 
  Check, 
  Copy,
  Maximize2
} from "lucide-react";
import { certificates, Certificate } from "@/app/lib/certificate-data";
import { SvgCertificateProof } from "./svg-certificate-proof";

export function CertificateCards() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showLightbox, setShowLightbox] = useState<boolean>(false);

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {certificates.map((cert) => (
          <div 
            key={cert.id} 
            onClick={() => setSelectedCert(cert)}
            className="group flex flex-col items-start w-full rounded-3xl border border-border/40 bg-card/30 p-6 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-indigo-500/30 cursor-pointer text-left animate-fade-in"
          >
            {/* Card Abstract Gradient Banner with Vector Preview */}
            <div className="relative mb-5 w-full overflow-hidden rounded-2xl border border-border/40 aspect-[16/10] shadow-sm transition-all duration-500">
              {/* Inner preview utilizing scaled down SVG proof */}
              <div className="absolute inset-0 select-none scale-[1.02] origin-center transition-all duration-700 ease-out group-hover:scale-105">
                <SvgCertificateProof certificate={cert} className="w-full h-full border-none rounded-none" />
              </div>
              
              {/* Interactive Hover Overlay with Eye Trigger */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                <div className="flex h-11 items-center justify-center gap-2 rounded-full bg-white text-zinc-950 px-5 text-xs font-semibold shadow-xl transition-transform duration-300 hover:scale-105">
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-indigo-400 transition-colors line-clamp-2 pr-4">
              {cert.title}
            </h3>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* IMMERSIVE GLASSMORPHIC MODAL DRAWER OVERLAY */}
      {/* ========================================================================= */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-fade-in">
          {/* Main Modal Body */}
          <div className="relative w-full max-w-5xl rounded-3xl border border-white/10 bg-zinc-950/95 p-6 md:p-10 shadow-2xl flex flex-col lg:flex-row gap-8 overflow-y-auto max-h-[92vh] animate-scale-up">
            
            {/* Close Button */}
            <button
              onClick={() => {
                setSelectedCert(null);
                setShowLightbox(false);
              }}
              className="absolute top-6 right-6 p-2 rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/15 transition-all duration-300 cursor-pointer z-10"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Visual Svg Certificate Proof & Actions */}
            <div className="flex-1 flex flex-col justify-start gap-5">
              <p className="text-xs uppercase tracking-wider font-semibold text-cyan-400/90 mb-1">Visual Credential Proof</p>
              
              {/* SVG interactive card with hover effects */}
              <div 
                className="relative group cursor-zoom-in rounded-2xl overflow-hidden shadow-xl border border-white/5"
                onClick={() => setShowLightbox(true)}
              >
                <SvgCertificateProof certificate={selectedCert} className="w-full" />
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 bg-black/60 text-white text-xs font-semibold backdrop-blur-md shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Expand Credential</span>
                  </span>
                </div>
              </div>

              {/* Direct Link Options */}
              <div className="flex flex-wrap gap-3 mt-2">
                <Link
                  href={`/certificate/${selectedCert.id}`}
                  onClick={() => setSelectedCert(null)}
                  className="flex-1 min-w-[140px] inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 text-xs font-semibold text-white transition-all duration-300 hover:bg-white/10"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Direct Page</span>
                </Link>

                <a
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] inline-flex h-11 items-center justify-center gap-2 rounded-full bg-cyan-500 text-black px-5 text-xs font-semibold transition-colors duration-300 hover:bg-cyan-400"
                >
                  <span>Verify Online</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Column: Complete Details, Bio, & Skills */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mb-2 leading-tight pr-10">
                  {selectedCert.title}
                </h2>
                
                {/* Issuer */}
                <div className="flex items-center gap-4 text-xs font-semibold text-cyan-400/90 mb-6 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    {selectedCert.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <Calendar className="w-3.5 h-3.5" />
                    Issued: {selectedCert.issueDate}
                  </span>
                </div>

                {/* Subdescription box */}
                <div className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 text-zinc-300/90 italic leading-relaxed text-xs mb-6">
                  {selectedCert.description}
                </div>

                {/* Secure Credential Verification Box */}
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-white/[0.02] mb-6">
                  <div className="text-left">
                    <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold mb-0.5">Verified License Key</p>
                    <p className="text-xs text-zinc-300 font-mono font-medium">{selectedCert.credentialId}</p>
                  </div>
                  <button
                    onClick={() => handleCopyId(selectedCert.credentialId)}
                    className="p-2 rounded-lg border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/15 transition-all cursor-pointer"
                    title="Copy to clipboard"
                  >
                    {copiedId === selectedCert.credentialId ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Skills Earned */}
                <h4 className="text-xs uppercase tracking-widest font-semibold text-white mb-3">Skills Competencies</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedCert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* bottom signature */}
              <div className="pt-4 border-t border-white/5 flex justify-between items-center text-xs text-zinc-500">
                <span>Karl Nestor Buensalida — Portfolio</span>
                <span className="font-semibold text-zinc-400">Authenticated Record</span>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* HIGH-RES LIGHTBOX VIEW (FULLSCREEN ACCENT VIEW) */}
          {/* ========================================================================= */}
          {showLightbox && (
            <div 
              className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-black/95 p-6 md:p-12 cursor-zoom-out animate-fade-in"
              onClick={() => setShowLightbox(false)}
            >
              {/* Close button for lightbox */}
              <button
                onClick={() => setShowLightbox(false)}
                className="absolute top-6 right-6 p-2.5 rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/15 transition-all cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div 
                className="w-full max-w-4xl shadow-3xl border border-white/10 rounded-2xl overflow-hidden scale-in-lightbox"
                onClick={(e) => e.stopPropagation()} // Prevent clicking certificate closing the lightbox
              >
                <SvgCertificateProof certificate={selectedCert} className="w-full" />
              </div>

              <div className="mt-6 text-center">
                <h3 className="text-white font-bold text-lg">{selectedCert.title}</h3>
                <p className="text-zinc-400 text-xs mt-1">Verified Credential Issued by {selectedCert.issuer} — Click anywhere to exit</p>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

export default CertificateCards;
