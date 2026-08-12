"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, AlertCircle, Phone, Calendar, MessageSquare, ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/components/ui/LanguageContext";
import { treatmentsData } from "@/lib/data/treatmentsData";

export default function TreatmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { language, t } = useLanguage();
  const slug = params.slug as string;

  const treatments = treatmentsData[language] || [];
  const treatment = treatments.find((item) => item.slug === slug);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  if (!treatment) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-background">
        <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
        <h1 className="text-2xl font-bold text-foreground">Treatment Not Found</h1>
        <p className="text-text-secondary mt-2 max-w-sm">
          The requested orthopedic treatment page does not exist or has been modified.
        </p>
        <Link
          href="/treatments"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Treatments</span>
        </Link>
      </div>
    );
  }

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="w-full pt-28 pb-12 sm:pt-32 bg-white dark:bg-background smooth-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link & Breadcrumbs */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/treatments"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary dark:text-primary-accent hover:underline group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>All Treatments</span>
          </Link>
          <div className="text-xs text-text-secondary">
            <span>Treatments</span> &gt; <span className="font-semibold text-foreground">{treatment.title}</span>
          </div>
        </div>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Clinical Content */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Title & Introduction */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light dark:bg-primary-light/10 text-primary dark:text-primary-accent text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Diagnostic Category</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
                {treatment.title}
              </h1>
              <p className="text-base text-text-secondary leading-relaxed pt-2">
                {treatment.details.introduction}
              </p>
            </div>

            {/* Symptoms list */}
            <div className="space-y-4 border-t border-border-color pt-8">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-primary" />
                <span>Common Indicators & Symptoms</span>
              </h2>
              <ul className="space-y-2.5">
                {treatment.details.symptoms.map((symptom, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-text-secondary leading-relaxed">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Treatment Options */}
            <div className="space-y-4 border-t border-border-color pt-8">
              <h2 className="text-xl font-bold text-foreground">
                Treatment & Management Pathways
              </h2>
              <ul className="space-y-2.5">
                {treatment.details.treatmentInfo.map((info, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-text-secondary leading-relaxed">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    <span>{info}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* When to consult */}
            <div className="p-6 bg-primary-light/35 dark:bg-primary-light/5 border border-primary/20 rounded-xl space-y-3">
              <h3 className="text-md font-bold text-primary-dark dark:text-primary-accent">
                When to Consult the Doctor?
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {treatment.details.whenToConsult}
              </p>
            </div>

            {/* Treatment FAQs */}
            {treatment.details.faqs && treatment.details.faqs.length > 0 && (
              <div className="space-y-4 border-t border-border-color pt-8">
                <h2 className="text-xl font-bold text-foreground">
                  Treatment FAQ
                </h2>
                <div className="space-y-3">
                  {treatment.details.faqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className="border border-border-color rounded-lg overflow-hidden bg-bg-secondary dark:bg-card-bg/20 smooth-transition"
                      >
                        <button
                          onClick={() => toggleFaq(idx)}
                          className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm sm:text-base text-foreground"
                        >
                          <span>{faq.question}</span>
                          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 text-sm text-text-secondary leading-relaxed border-t border-border-color/40 pt-3 bg-white dark:bg-card-bg">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Sidebar Actions */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            
            {/* Appointment Widget Card */}
            <div className="bg-bg-secondary dark:bg-card-bg p-6 rounded-xl border border-border-color shadow-sm space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-foreground">
                  Consultation
                </h3>
                <p className="text-xs text-text-secondary">
                  Discuss treatment pathways for {treatment.title} directly with Dr. V.D.N. Madhivanan.
                </p>
              </div>

              <div className="space-y-3">
                <Link
                  href="/appointment"
                  className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark dark:bg-primary-accent dark:hover:bg-primary text-white text-sm font-bold py-3 rounded-lg text-center transition-colors shadow-sm"
                >
                  <Calendar className="w-4.5 h-4.5" />
                  <span>Book Appointment</span>
                </Link>

                <a
                  href="tel:0000000000"
                  className="w-full inline-flex items-center justify-center gap-2 border border-border-color bg-white dark:bg-background hover:bg-bg-secondary text-foreground text-sm font-bold py-3 rounded-lg text-center transition-colors"
                >
                  <Phone className="w-4.5 h-4.5 text-primary" />
                  <span>Call Niral Ortho Care</span>
                </a>

                <a
                  href="https://wa.me/0000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 border border-border-color bg-white dark:bg-background hover:bg-bg-secondary text-[#25D366] text-sm font-bold py-3 rounded-lg text-center transition-colors"
                >
                  <MessageSquare className="w-4.5 h-4.5 text-[#25D366]" />
                  <span>WhatsApp Enquiry</span>
                </a>
              </div>
            </div>

            {/* Timings Widget Card */}
            <div className="bg-bg-secondary dark:bg-card-bg p-5 rounded-xl border border-border-color/70 space-y-3">
              <h4 className="text-sm font-bold text-foreground">
                {t.contact.hours}
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                {t.placeholders.timings}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
