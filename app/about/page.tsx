"use client";

import React from "react";
import { Award, GraduationCap, ClipboardList, ShieldAlert, HeartPulse, User } from "lucide-react";
import { useLanguage } from "@/components/ui/LanguageContext";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="w-full py-16 bg-white dark:bg-background smooth-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-primary dark:text-primary-accent">
            Clinic Leadership
          </span>
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight sm:text-5xl">
            {t.doctor.title}
          </h1>
          <p className="text-sm text-text-secondary">
            Learn more about our lead surgeon, medical foundations, and commitment to orthopedic care.
          </p>
        </div>

        {/* Doctor Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Doctor Image */}
          <div className="lg:col-span-5 relative">
            <div className="max-w-sm mx-auto lg:max-w-none">
              <div className="absolute -inset-4 bg-primary/10 rounded-2xl -rotate-2 pointer-events-none" />
              <ImagePlaceholder 
                text="Dr. V.D.N. Madhivanan Portrait - M.B.B.S., M.S. (Ortho)"
                aspectRatio="aspect-[3/4]"
                iconType="doctor"
                className="shadow-md border border-border-color"
              />
            </div>
          </div>

          {/* Doctor Bio and Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
                {t.doctor.doctorName}
              </h2>
              <p className="text-lg font-semibold text-primary dark:text-primary-accent mt-1">
                {t.doctor.degree}
              </p>
              <p className="text-md text-text-secondary font-medium">
                {t.doctor.role}
              </p>
            </div>

            <div className="border-t border-border-color pt-6">
              <p className="text-base text-text-secondary leading-relaxed mb-4">
                {t.doctor.bio}
              </p>
              <p className="text-base text-text-secondary leading-relaxed">
                Our practice is centered on providing personalized orthopedics. We focus on conservative, non-surgical management when possible, resorting to precise surgical interventions only when they offer the most effective path to recovery.
              </p>
            </div>

            {/* Timings / Location Disclaimer Card */}
            <div className="bg-bg-secondary dark:bg-card-bg/40 p-5 rounded-xl border border-border-color/85 space-y-2">
              <h4 className="text-sm font-bold text-primary dark:text-primary-accent flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" />
                <span>Verification Warning</span>
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Specific clinical details such as clinical hours, registration records, patient consult limits, and affiliations require verified documentation from Niral Ortho Care before final publication. Current data uses verified placeholders.
              </p>
            </div>
          </div>
        </div>

        {/* Qualifications and Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-border-color">
          
          {/* Box 1: Qualifications */}
          <div className="bg-bg-secondary dark:bg-card-bg p-6 rounded-xl border border-border-color flex flex-col">
            <div className="p-3 bg-primary-light dark:bg-primary-light/10 text-primary dark:text-primary-accent rounded-lg w-fit mb-5">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-3">
              Qualifications & Credentials
            </h3>
            <ul className="space-y-2 text-sm text-text-secondary leading-relaxed flex-1">
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                <span>M.B.B.S. (Bachelor of Medicine, Bachelor of Surgery)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                <span>M.S. (Ortho) (Master of Surgery in Orthopedics)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                <span>{t.placeholders.experience}</span>
              </li>
            </ul>
          </div>

          {/* Box 2: Specialties */}
          <div className="bg-bg-secondary dark:bg-card-bg p-6 rounded-xl border border-border-color flex flex-col">
            <div className="p-3 bg-primary-light dark:bg-primary-light/10 text-primary dark:text-primary-accent rounded-lg w-fit mb-5">
              <ClipboardList className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-3">
              Key Medical Focus
            </h3>
            <ul className="space-y-2 text-sm text-text-secondary leading-relaxed flex-1">
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Trauma and Fracture Alignment Fixation</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Degenerative Arthritis Management</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Ligament Repairs & Sports Injury Rehab</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Non-surgical Joint Preservation Techniques</span>
              </li>
            </ul>
          </div>

          {/* Box 3: Values */}
          <div className="bg-bg-secondary dark:bg-card-bg p-6 rounded-xl border border-border-color flex flex-col">
            <div className="p-3 bg-primary-light dark:bg-primary-light/10 text-primary dark:text-primary-accent rounded-lg w-fit mb-5">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-3">
              Clinical Care Ethics
            </h3>
            <ul className="space-y-2 text-sm text-text-secondary leading-relaxed flex-1">
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Clear patient education during diagnosis</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Conservative treatment pathways preferred</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Rigorous post-surgical monitoring & rehab</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Comfortable, modern clinical environment</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
