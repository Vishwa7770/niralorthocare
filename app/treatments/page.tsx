"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Activity, Sparkles, ShieldAlert, Flame, HeartPulse, GitMerge, Shuffle, TrendingUp, Search, ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/ui/LanguageContext";
import { treatmentsData, Treatment } from "@/lib/data/treatmentsData";

const getIconComponent = (name: string) => {
  const icons: Record<string, React.ComponentType<any>> = {
    Activity,
    Sparkles,
    ShieldAlert,
    Flame,
    HeartPulse,
    GitMerge,
    Shuffle,
    TrendingUp
  };
  return icons[name] || Activity;
};

export default function TreatmentsPage() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const allTreatments = treatmentsData[language] || [];
  
  const filteredTreatments = allTreatments.filter((treatment) => 
    treatment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    treatment.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full pt-32 pb-16 sm:pt-36 bg-white dark:bg-background smooth-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-primary dark:text-primary-accent">
            Medical Services
          </span>
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight sm:text-5xl">
            Orthopedic Treatments & Care
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed">
            We provide customized treatments for bone, joint, ligament, and muscle disorders. Explore our specialized care areas.
          </p>

          {/* Search bar */}
          <div className="pt-6 max-w-md mx-auto">
            <div className="relative rounded-lg shadow-sm border border-border-color bg-white dark:bg-card-bg flex items-center px-3 py-1.5 focus-within:ring-2 focus-within:ring-primary smooth-transition">
              <Search className="w-4 h-4 text-text-secondary shrink-0" />
              <input
                type="text"
                placeholder="Search treatments (e.g., knee, fracture)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ml-2 w-full bg-transparent border-0 p-1 text-sm outline-none text-foreground"
              />
            </div>
          </div>
        </div>

        {/* Treatments Grid */}
        {filteredTreatments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTreatments.map((treatment) => {
              const TreatmentIcon = getIconComponent(treatment.iconName);
              return (
                <div
                  key={treatment.slug}
                  className="bg-bg-secondary dark:bg-card-bg/40 p-6 rounded-xl border border-border-color shadow-sm hover:shadow-md smooth-transition group flex flex-col justify-between"
                >
                  <div>
                    <div className="p-3 bg-primary-light dark:bg-primary-light/10 text-primary dark:text-primary-accent rounded-lg w-fit mb-5">
                      <TreatmentIcon className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary dark:group-hover:text-primary-accent smooth-transition">
                      {treatment.title}
                    </h2>
                    <p className="text-sm text-text-secondary leading-relaxed mb-6">
                      {treatment.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-border-color/60 pt-4 mt-2">
                    <span className="text-[10px] font-bold text-primary/70 dark:text-primary-accent/70 tracking-widest uppercase">
                      Clinic Verified
                    </span>
                    <Link
                      href={`/treatments/${treatment.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary dark:text-primary-accent group-hover:translate-x-1 smooth-transition"
                    >
                      <span>Read Treatment Plan</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-md text-text-secondary">No treatments matches your search keyword.</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-sm font-bold text-primary dark:text-primary-accent hover:underline"
            >
              Clear Search Query
            </button>
          </div>
        )}

        {/* Dynamic Warning Footer */}
        <div className="mt-16 p-6 bg-primary-light/20 dark:bg-primary-light/5 rounded-xl border border-dashed border-primary/20 max-w-3xl mx-auto space-y-2">
          <p className="text-xs text-text-secondary leading-relaxed text-center">
            * Medical content and clinical symptoms listed require official medical review by Dr. V.D.N. Madhivanan before publishing online. If you are experiencing acute pain or deformity, please request an appointment or visit the nearest clinical emergency center.
          </p>
        </div>

      </div>
    </div>
  );
}
