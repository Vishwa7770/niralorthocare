"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/ui/LanguageContext";

export default function FacilitiesPage() {
  const { t, language } = useLanguage();

  const facilitiesList = [
    {
      title: language === "en" ? "Orthopedic Consultation Room" : "எலும்பியல் ஆலோசனை அறை",
      description: language === "en" 
        ? "A private and comfortable setting where patients receive personalized diagnostics and clinical consultations with Dr. V.D.N. Madhivanan."
        : "நோயாளிகள் தனிப்பயனாக்கப்பட்ட கண்டறிதல் மற்றும் டாக்டர் V.D.N. மதிவாணனுடன் மருத்துவ ஆலோசனைகளைப் பெறும் ஒரு தனிப்பட்ட மற்றும் வசதியான சூழல்.",
      imagePath: "/images/facility_consultation.jpg"
    },
    {
      title: language === "en" ? "Patient Examination Room" : "நோயாளி பரிசோதனை அறை",
      description: language === "en"
        ? "Equipped with sterile examination tables and professional clinical tools for physical checkups, joint assessments, and minor medical procedures."
        : "உடல் பரிசோதனைகள், மூட்டு மதிப்பீடுகள் மற்றும் சிறு மருத்துவ நடைமுறைகளுக்கான மலட்டு பரிசோதனை அட்டவணைகள் மற்றும் தொழில்முறை மருத்துவக் கருவிகளுடன் கூடிய வசதி.",
      imagePath: "/images/facility_examination.jpg"
    },
    {
      title: language === "en" ? "Physiotherapy & Rehabilitation" : "இயல்முறை மற்றும் மறுவாழ்வு சிகிச்சை",
      description: language === "en"
        ? "A dedicated space equipped with exercise and stretching gear for post-operative recovery, strength restoration, and specialized gait training."
        : "அறுவை சிகிச்சைக்குப் பிந்தைய மீட்பு, வலிமை மீட்டெடுப்பு மற்றும் சிறப்பு நடைப் பயிற்சிக்கான உடற்பயிற்சி மற்றும் நீட்சி உபகரணங்களுடன் கூடிய பிரத்யேக இடம்.",
      imagePath: "/images/facility_physiotherapy.jpg"
    },
    {
      title: language === "en" ? "Modern Operation Theatre" : "நவீன அறுவை சிகிச்சை அரங்கு",
      description: language === "en"
        ? "A highly sterile operating suite equipped with advanced surgical lamps, vital monitors, and modern equipment for minor orthopedic interventions."
        : "அதிநவீன அறுவைசிகிச்சை விளக்குகள், முக்கிய மானிட்டர்கள் மற்றும் சிறிய எலும்பியல் தலையீடுகளுக்கான நவீன உபகரணங்களுடன் கூடிய மிகவும் மலட்டுத்தன்மையுள்ள அறுவைசிகிச்சை அரங்கு.",
      imagePath: "/images/facility_operation_theatre.jpg"
    },
    {
      title: language === "en" ? "Hospital Reception & Lounge" : "வரவேற்பு மற்றும் காத்திருப்பு கூடம்",
      description: language === "en"
        ? "A warm, patient-friendly reception and waiting area designed with comfortable seating, clear guidance, and a welcoming medical atmosphere."
        : "வசதியான தங்குமிடம், தெளிவான வழிகாட்டுதல் மற்றும் வரவேற்கத்தக்க மருத்துவ சூழலுடன் வடிவமைக்கப்பட்ட ஒரு அன்பான, நோயாளிக்கு ஏற்ற வரவேற்பு மற்றும் காத்திருப்பு பகுதி.",
      imagePath: "/images/facility_reception.jpg"
    },
    {
      title: language === "en" ? "Diagnostic & Digital Imaging" : "கண்டறிதல் மற்றும் டிஜிட்டல் இமேஜிங்",
      description: language === "en"
        ? "Equipped with digital imaging stations and viewing facilities to quickly inspect bone alignment, joint wear, and fracture status."
        : "எலும்பு சீரமைப்பு, மூட்டு தேய்மானம் மற்றும் எலும்பு முறிவு நிலை ஆகியவற்றை விரைவாக ஆய்வு செய்ய டிஜிட்டல் இமேஜிங் நிலையங்கள் மற்றும் பார்க்கும் வசதிகளுடன் கூடிய பகுதி.",
      imagePath: "/images/facility_diagnostics.jpg"
    },
    {
      title: language === "en" ? "Patient Care & Recovery Area" : "நோயாளி பராமரிப்பு மற்றும் மீட்பு பகுதி",
      description: language === "en"
        ? "Clean, quiet, and comfortable recovery spaces where patients can rest under supervision following outpatient orthopedic care."
        : "வெளிநோயாளி எலும்பியல் சிகிச்சையைத் தொடர்ந்து நோயாளிகள் மருத்துவ கண்காணிப்பில் ஓய்வெடுக்கக்கூடிய சுத்தமான, அமைதியான மற்றும் வசதியான மீட்பு இடங்கள்.",
      imagePath: "/images/facility_patient_care.jpg"
    }
  ];

  return (
    <div className="w-full py-20 bg-white dark:bg-background smooth-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-primary dark:text-primary-accent block">
            Clinic Tour
          </span>
          <h1 className="text-4xl font-extrabold text-[#0F1E36] dark:text-white tracking-tight sm:text-5xl">
            {language === "en" ? "Our Clinical Facilities" : "எங்கள் மருத்துவ வசதிகள்"}
          </h1>
          <p className="text-base text-text-secondary leading-relaxed font-medium">
            {language === "en" 
              ? "Niral Ortho Care offers a clean, modern, and professional healthcare environment designed for comprehensive orthopedic consultation and recovery."
              : "நிரல் எலும்பியல் மையம் விரிவான எலும்பியல் ஆலோசனை மற்றும் மீட்பிற்காக வடிவமைக்கப்பட்ட சுத்தமான, நவீன மற்றும் தொழில்முறை சுகாதார சூழலை வழங்குகிறது."}
          </p>
        </div>

        {/* Clinical Transparency Statement */}
        <div className="max-w-4xl mx-auto mb-16 p-6 bg-primary-light/30 dark:bg-primary-light/10 border border-primary/10 dark:border-primary-accent/10 rounded-2xl flex gap-4 items-start shadow-sm shadow-primary/5">
          <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#0F1E36] dark:text-white">
              {language === "en" ? "Caring for our Community" : "எங்கள் சமூகத்தை கவனித்தல்"}
            </h4>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-semibold">
              {language === "en" 
                ? "Our newly built healthcare center in Ramanathapuram features modern diagnostic and rehabilitative amenities. The images below represent our actual clinical facilities and patient care environments."
                : "இராமநாதபுரத்தில் புதிதாக கட்டப்பட்டுள்ள எங்கள் சுகாதார மையம் நவீன கண்டறிதல் மற்றும் மறுவாழ்வு வசதிகளைக் கொண்டுள்ளது. கீழே உள்ள படங்கள் எங்களின் உண்மையான மருத்துவ வசதிகள் மற்றும் நோயாளி பராமரிப்பு சூழல்களைக் குறிக்கின்றன."}
            </p>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {facilitiesList.map((facility, index) => (
            <div
              key={index}
              className="bg-bg-secondary dark:bg-card-bg/20 border border-border-color rounded-2xl overflow-hidden shadow-sm hover:shadow-md smooth-transition flex flex-col justify-between group hover:border-primary/30"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-100">
                <Image
                  src={facility.imagePath}
                  alt={facility.title}
                  fill
                  className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <h3 className="text-base sm:text-lg font-bold text-[#0F1E36] dark:text-white leading-tight">{facility.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-semibold">
                    {facility.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Footer */}
        <div className="mt-20 text-center space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-[#0F1E36] dark:text-white">
            {language === "en" ? "Want to visit our clinic in person?" : "எங்கள் கிளினிக்கிற்கு நேரில் வர விரும்புகிறீர்களா?"}
          </h3>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-full transition-all shadow-md"
          >
            <span>{language === "en" ? "Get Directions & Contact" : "திசைகள் மற்றும் தொடர்பைப் பெறுக"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
