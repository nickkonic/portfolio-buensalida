"use client";

import React, { useState } from "react";
import { X, Eye, Calendar, MapPin, Maximize2 } from "lucide-react";
import { galleryItems, GalleryItem } from "@/app/lib/gallery-data";

export function GalleryCards() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  return (
    <div className="w-full flex flex-col items-center">
      {/* 2-Column Responsive Grid matching screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group relative flex flex-col w-full overflow-hidden rounded-3xl border border-border/40 bg-card/20 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-indigo-500/30 cursor-pointer aspect-[4/3] animate-fade-in"
          >
            {/* Gallery Image */}
            <div className="relative w-full h-full overflow-hidden select-none">
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>

            {/* Immersive Glassmorphic Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 select-none">
              {/* Eye Indicator */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex h-11 items-center justify-center gap-2 rounded-full bg-white text-zinc-950 px-5 text-xs font-semibold shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Eye className="w-4 h-4" />
                  <span>View Fullscreen</span>
                </div>
              </div>

              {/* Text Meta Info */}
              <div className="relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {item.event}
                </p>
                <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* IMMERSIVE GLASSMORPHIC LIGHTBOX OVERLAY */}
      {/* ========================================================================= */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-6 md:p-12 cursor-zoom-out animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-6 right-6 p-2.5 rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/15 transition-all duration-300 cursor-pointer z-50"
            title="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Lightbox Container */}
          <div
            className="relative w-full max-w-4xl shadow-3xl border border-white/10 rounded-2xl overflow-hidden bg-zinc-950 scale-in-lightbox"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedItem.imageUrl}
              alt={selectedItem.title}
              className="w-full h-auto max-h-[75vh] object-contain"
            />
          </div>

          {/* Lightbox Info Footer */}
          <div
            className="mt-6 text-center select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-xs font-semibold text-indigo-400 mb-2">
              {selectedItem.event}
            </span>
            <h3 className="text-white font-bold text-lg tracking-tight sm:text-xl">
              {selectedItem.title}
            </h3>
            <p className="text-zinc-400 text-xs mt-1.5 flex items-center justify-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {selectedItem.date} — Click anywhere to exit
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default GalleryCards;
