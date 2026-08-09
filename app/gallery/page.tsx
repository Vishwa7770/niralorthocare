"use client";

import React, { useState } from "react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { X, ChevronLeft, ChevronRight, Eye, Grid } from "lucide-react";

interface GalleryItem {
  id: number;
  category: "clinic" | "equipment" | "staff";
  title: string;
  description: string;
  placeholderText: string;
}

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "clinic" | "equipment" | "staff">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      category: "clinic",
      title: "Clinic Reception",
      description: "Niral Ortho Care patient reception and check-in lobby.",
      placeholderText: "Reception Desk with Premium Lighting and Clinic Wordmark Logo"
    },
    {
      id: 2,
      category: "clinic",
      title: "Consultation Room",
      description: "Dr. V.D.N. Madhivanan's primary consultation workspace.",
      placeholderText: "Clean Consultation Room with Doctor Desk & Patient Chair"
    },
    {
      id: 3,
      category: "equipment",
      title: "Diagnostic Display",
      description: "High-resolution bone X-ray and diagnostic display monitors.",
      placeholderText: "Dual Screen Diagnostic Monitors displaying Joint X-Ray reports"
    },
    {
      id: 4,
      category: "equipment",
      title: "Therapy Equipment",
      description: "Muscle stimulation and skeletal rehabilitation tools.",
      placeholderText: "Clinical Electrotherapy and Ultrasound machines"
    },
    {
      id: 5,
      category: "staff",
      title: "Lead Surgeon Profile",
      description: "Professional profile visual for Dr. V.D.N. Madhivanan.",
      placeholderText: "Dr. V.D.N. Madhivanan Clinical Consultation Pose Portrait"
    },
    {
      id: 6,
      category: "staff",
      title: "Clinical Staff Team",
      description: "Our dedicated care and nursing staff coordinator team.",
      placeholderText: "Medical Staff Assistants and Clinic Manager Portrait"
    }
  ];

  const filteredItems = activeFilter === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  const openLightbox = (id: number) => {
    const index = galleryItems.findIndex(item => item.id === id);
    if (index !== -1) {
      setLightboxIndex(index);
    }
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (lightboxIndex === null) return;
    let nextIndex = direction === "next" ? lightboxIndex + 1 : lightboxIndex - 1;
    
    if (nextIndex >= galleryItems.length) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = galleryItems.length - 1;
    }
    setLightboxIndex(nextIndex);
  };

  return (
    <div className="w-full py-16 bg-white dark:bg-background smooth-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-primary dark:text-primary-accent">
            Media Library
          </span>
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight sm:text-5xl">
            Clinic Gallery
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed">
            Take a visual tour of Niral Ortho Care, including our consulting spaces, orthopedic equipment, and professional staff.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 border-b border-border-color pb-6">
          {(["all", "clinic", "equipment", "staff"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all border ${
                activeFilter === filter
                  ? "bg-primary text-white border-primary dark:bg-primary-accent dark:text-background dark:border-primary-accent"
                  : "bg-bg-secondary text-text-secondary border-border-color hover:text-foreground"
              }`}
            >
              {filter === "all" ? "Show All" : filter}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item.id)}
              className="bg-bg-secondary dark:bg-card-bg/25 border border-border-color rounded-xl overflow-hidden shadow-sm hover:shadow-md smooth-transition group cursor-pointer relative"
            >
              <div className="relative overflow-hidden aspect-video">
                <ImagePlaceholder
                  text={item.placeholderText}
                  aspectRatio="aspect-video"
                  iconType={item.category === "staff" ? "doctor" : "facility"}
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 smooth-transition flex items-center justify-center backdrop-blur-xs">
                  <div className="p-3 bg-white dark:bg-background rounded-full shadow-lg">
                    <Eye className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-1">
                <div className="text-[10px] font-bold text-primary dark:text-primary-accent tracking-widest uppercase">
                  {item.category}
                </div>
                <h3 className="text-md font-bold text-foreground">{item.title}</h3>
                <p className="text-xs text-text-secondary">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 md:p-8 select-none">
            
            {/* Header / Actions */}
            <div className="flex items-center justify-between text-white pb-4 border-b border-white/10">
              <div>
                <h3 className="text-md font-bold leading-none">{galleryItems[lightboxIndex].title}</h3>
                <p className="text-xs text-zinc-400 mt-1">{galleryItems[lightboxIndex].description}</p>
              </div>
              <button
                onClick={closeLightbox}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Content Area */}
            <div className="flex-1 flex items-center justify-between gap-4 max-h-[70vh]">
              {/* Prev Button */}
              <button
                onClick={() => navigateLightbox("prev")}
                className="p-3 bg-white/5 hover:bg-white/15 rounded-full text-white transition-colors"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Main Image Container */}
              <div className="flex-1 max-w-4xl mx-auto h-full flex items-center justify-center p-4">
                <div className="w-full max-h-full aspect-video bg-zinc-900 border border-white/10 rounded-xl overflow-hidden flex items-center justify-center p-6 text-center">
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-full w-fit mx-auto">
                      <Grid className="w-10 h-10 text-primary" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      {galleryItems[lightboxIndex].category} image
                    </span>
                    <p className="text-sm font-medium text-zinc-300 max-w-md">
                      {galleryItems[lightboxIndex].placeholderText}
                    </p>
                  </div>
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={() => navigateLightbox("next")}
                className="p-3 bg-white/5 hover:bg-white/15 rounded-full text-white transition-colors"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Footer Pagination */}
            <div className="text-center text-xs text-zinc-500 pt-4 border-t border-white/10">
              Image {lightboxIndex + 1} of {galleryItems.length}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
