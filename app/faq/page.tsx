"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, PhoneCall } from "lucide-react";
import { useLanguage } from "@/components/ui/LanguageContext";
import Link from "next/link";

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqPage() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      question: "How can I book an appointment with Dr. V.D.N. Madhivanan?",
      answer: `You can easily request a consultation by clicking the "Book Appointment" button on the navigation bar, filling out the online request form, or calling the hospital clinic line directly at ${t.placeholders.phone}. Our clinical staff will call you to confirm your date and slot.`
    },
    {
      question: "What are the consultation timings?",
      answer: `The general outpatient clinic hours for consultations are currently set to ${t.placeholders.timings}. We recommend requesting an appointment in advance to reduce wait times.`
    },
    {
      question: "What conditions are treated at Niral Ortho Care?",
      answer: "We specialize in a broad range of orthopedic care, including Knee Care (arthritis, ligament wear), Joint Care, Fracture Alignment Care (splints/fixations), Sports Injuries (ACL tears, sprains), Spine Care (back pain, sciatica), and post-operative Physical Rehabilitation."
    },
    {
      question: "How can I contact the hospital directly?",
      answer: `You can reach us through our verified clinical phone line at ${t.placeholders.phone}, email us at ${t.placeholders.email}, or visit our clinic at ${t.placeholders.address}. Dynamic map locations and directions are available on our Contact page.`
    },
    {
      question: "Does the clinic offer emergency fracture services?",
      answer: `Emergency orthopedic fixations are subject to surgeon availability. Please contact us directly at ${t.placeholders.phone} to check emergency trauma triage status before arrival.`
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full py-16 bg-white dark:bg-background smooth-transition">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-primary dark:text-primary-accent">
            Support Center
          </span>
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight sm:text-5xl">
            {t.faq.title}
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed">
            {t.faq.subtitle}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-border-color rounded-xl overflow-hidden bg-bg-secondary dark:bg-card-bg/20 smooth-transition"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-foreground hover:bg-primary-light/20 dark:hover:bg-primary-light/5 smooth-transition gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-primary dark:text-primary-accent shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-text-secondary" />}
                </button>
                
                {isOpen && (
                  <div className="px-5 pb-5 text-sm sm:text-base text-text-secondary leading-relaxed border-t border-border-color/30 pt-4 bg-white dark:bg-card-bg">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-16 bg-primary-light/30 dark:bg-primary-light/5 border border-primary/20 rounded-xl p-8 text-center space-y-4">
          <h3 className="text-lg font-bold text-foreground">Still have questions regarding treatments?</h3>
          <p className="text-sm text-text-secondary max-w-lg mx-auto">
            If you need clarification about a specific orthopedic condition or treatment cost, please contact our desk directly.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-all text-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact Clinic</span>
            </Link>
            <Link
              href="/appointment"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-border-color bg-white dark:bg-card-bg text-foreground font-bold rounded-lg hover:bg-bg-secondary transition-all text-sm"
            >
              <span>Book Appointment</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
