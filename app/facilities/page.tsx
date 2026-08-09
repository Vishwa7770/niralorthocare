"use client";

import React from "react";
import { ShieldCheck, HeartPulse, CheckSquare } from "lucide-react";
import { useLanguage } from "@/components/ui/LanguageContext";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export default function FacilitiesPage() {
  const { t } = useLanguage();

  const facilitiesList = [
    {
      title: "Consultation Area",
      description: "A private and comfortable setting where patients receive personalized diagnostics and clinical consultations with Dr. V.D.N. Madhivanan.",
      imgPlaceholder: "Consultation Room with Diagnostic Screens & Anatomical Joint Models"
    },
    {
      title: "Treatment Area",
      description: "Equipped with sterile treatment tables and basic clinical tools for handling immediate splinting, wound dressings, and joint injections.",
      imgPlaceholder: "Treatment Bay with Medical Cart & Examination Lights"
    },
    {
      title: "Waiting Area",
      description: "A calm, comfortable, and spacious waiting lounge designed with patient comfort and physical spacing in mind.",
      imgPlaceholder: "Waiting Lounge with Comfortable Seating & Informational Orthopedic Leaflets"
    },
    {
      title: "Diagnostic Facilities",
      description: "Diagnostic tools and imaging arrangements to quickly evaluate bone structures, fractures, and joint misalignments.",
      imgPlaceholder: "X-Ray / Diagnostic Viewing Station & Patient Shielding Gears"
    },
    {
      title: "Rehabilitation Area",
      description: "A dedicated physical therapy space equipped with stretching, resistance, and balance tools for post-surgical gait retraining.",
      imgPlaceholder: "Physiotherapy Room with Exercise Mats, Balance Balls & Resistance Bands"
    }
  ];

  return (
    <div className="w-full py-16 bg-white dark:bg-background smooth-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-primary dark:text-primary-accent">
            Clinic Tour
          </span>
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight sm:text-5xl">
            Our Clinical Facilities
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed">
            Niral Ortho Care offers a clean, modern, and professional healthcare environment tailored for orthopedic consultations and physical recovery.
          </p>
        </div>

        {/* Client Disclaimer Alert */}
        <div className="max-w-4xl mx-auto mb-12 p-5 bg-primary-light/35 dark:bg-primary-light/5 border border-primary/20 rounded-xl flex gap-3 items-start">
          <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-foreground">Content Pending Client Verification</h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              {t.placeholders.facilities}. Below is the planned architectural structure. The placeholder images will be replaced with actual high-resolution photographs of Niral Ortho Care once the clinic is ready for photography.
            </p>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {facilitiesList.map((facility, index) => (
            <div
              key={index}
              className="bg-bg-secondary dark:bg-card-bg/25 border border-border-color rounded-xl overflow-hidden shadow-sm hover:shadow-md smooth-transition flex flex-col justify-between"
            >
              <ImagePlaceholder
                text={facility.imgPlaceholder}
                aspectRatio="aspect-video"
                iconType="facility"
              />
              <div className="p-6 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <h3 className="text-lg font-bold text-foreground">{facility.title}</h3>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {facility.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
