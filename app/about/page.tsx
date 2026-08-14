"use client";

import React from "react";
import Image from "next/image";
import { GraduationCap, ClipboardList, HeartPulse, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/components/ui/LanguageContext";

export default function AboutPage() {
  const { t, language } = useLanguage();

  return (
    <div className="w-full pt-32 pb-16 sm:pt-36 bg-white dark:bg-background smooth-transition">
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
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md border border-border-color">
                <Image
                  src="/images/doctor-portrait-v4.jpg"
                  alt="Dr. V.D.N. Madhivanan - M.B.B.S., M.S. (Ortho)"
                  fill
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-cover"
                  priority
                />
              </div>
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

            <div className="border-t border-border-color pt-6 space-y-4">
              <p className="text-base text-text-secondary leading-relaxed">
                {t.doctor.bio}
              </p>
              <p className="text-base text-text-secondary leading-relaxed">
                Our practice is centered on providing personalized orthopedics. We focus on conservative, non-surgical management when possible, resorting to precise surgical interventions only when they offer the most effective path to recovery.
              </p>
              
              {/* Doctor's Motto Quote Card */}
              <div className="bg-primary-light/40 dark:bg-primary-light/5 border-l-4 border-primary p-5 rounded-r-xl mt-6">
                <p className="text-sm font-semibold text-text-secondary dark:text-zinc-300 italic leading-relaxed">
                  {language === "en" 
                    ? "Our dedication is to provide world-class orthopedics with a compassionate, human touch. Every patient's journey to recovery is unique, and we customize our treatments to help them reclaim their active lives."
                    : "எங்கள் அர்ப்பணிப்பு என்னவென்றால், அதிநவீன எலும்பியல் சிகிச்சையை மனித நேயத்துடன் வழங்குவதாகும். குணமடைவதை நோக்கிய ஒவ்வொரு நோயாளியின் பயணமும் தனித்துவமானது, தங்களின் சுறுசுறுப்பான வாழ்க்கையை மீண்டும் பெற எங்கள் சிகிச்சைகளை நாங்கள் தனிப்பயனாக்குகிறோம்."}
                </p>
                <span className="block text-xs font-bold uppercase tracking-wider text-primary dark:text-primary-accent mt-3">
                  — Dr. V.D.N. Madhivanan
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Qualifications and Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-border-color">
          
          {/* Box 1: Qualifications */}
          <div className="bg-bg-secondary dark:bg-card-bg p-7 rounded-2xl border border-border-color flex flex-col hover:-translate-y-1 hover:shadow-lg hover:border-primary/20 hover:bg-white dark:hover:bg-zinc-900/40 transition-all duration-300">
            <div className="p-3.5 bg-primary-light dark:bg-primary-light/10 text-primary dark:text-primary-accent rounded-xl w-fit mb-5">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-4">
              Qualifications & Credentials
            </h3>
            <ul className="space-y-3.5 text-sm text-text-secondary leading-relaxed flex-1">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>M.B.B.S. (Bachelor of Medicine, Bachelor of Surgery)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>M.S. (Ortho) (Master of Surgery in Orthopedics)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{t.placeholders.experience}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{t.doctor.tmcRegister}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{t.doctor.ioaMember}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{t.doctor.tnoaMember}</span>
              </li>
            </ul>
          </div>

          {/* Box 2: Specialties */}
          <div className="bg-bg-secondary dark:bg-card-bg p-7 rounded-2xl border border-border-color flex flex-col hover:-translate-y-1 hover:shadow-lg hover:border-primary/20 hover:bg-white dark:hover:bg-zinc-900/40 transition-all duration-300">
            <div className="p-3.5 bg-primary-light dark:bg-primary-light/10 text-primary dark:text-primary-accent rounded-xl w-fit mb-5">
              <ClipboardList className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-4">
              Key Medical Focus
            </h3>
            <ul className="space-y-3.5 text-sm text-text-secondary leading-relaxed flex-1">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Trauma and Fracture Alignment Fixation</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Degenerative Arthritis Management</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Ligament Repairs & Sports Injury Rehab</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Non-surgical Joint Preservation Techniques</span>
              </li>
            </ul>
          </div>

          {/* Box 3: Values */}
          <div className="bg-bg-secondary dark:bg-card-bg p-7 rounded-2xl border border-border-color flex flex-col hover:-translate-y-1 hover:shadow-lg hover:border-primary/20 hover:bg-white dark:hover:bg-zinc-900/40 transition-all duration-300">
            <div className="p-3.5 bg-primary-light dark:bg-primary-light/10 text-primary dark:text-primary-accent rounded-xl w-fit mb-5">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-4">
              Clinical Care Ethics
            </h3>
            <ul className="space-y-3.5 text-sm text-text-secondary leading-relaxed flex-1">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Clear patient education during diagnosis</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Conservative treatment pathways preferred</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Rigorous post-surgical monitoring & rehab</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Comfortable, modern clinical environment</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Community Engagement Photo */}
        <div className="pt-16 mt-16 border-t border-border-color">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-primary dark:text-primary-accent">
              Community Presence
            </span>
            <h3 className="text-2xl font-extrabold text-foreground tracking-tight">
              Actively Engaged With Our Community
            </h3>
          </div>
          <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden shadow-md border border-border-color">
            <Image
              src="/images/doctor-event.jpg"
              alt="Dr. V.D.N. Madhivanan being honored at a community event"
              fill
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
