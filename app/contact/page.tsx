"use client";

import React from "react";
import { Phone, Mail, MapPin, Clock, MessageSquare, Compass, Calendar, HeartPulse } from "lucide-react";
import { useLanguage } from "@/components/ui/LanguageContext";
import Link from "next/link";

export default function ContactPage() {
  const { t } = useLanguage();

  // Placeholder actions (to be verified by the client)
  const phoneTel = "tel:0000000000";
  const whatsappUrl = "https://wa.me/0000000000";
  const directionsUrl = "https://maps.google.com";

  return (
    <div className="w-full py-16 bg-white dark:bg-background smooth-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-primary dark:text-primary-accent">
            Reach Us
          </span>
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight sm:text-5xl">
            {t.contact.title}
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Contact Info and Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Logo Header */}
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <HeartPulse className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">NIRAL ORTHO CARE</h3>
                <p className="text-[10px] text-text-secondary uppercase tracking-wider font-bold">Orthopedic Specialty Center</p>
              </div>
            </div>

            {/* Address Card */}
            <div className="p-5 rounded-xl border border-border-color bg-bg-secondary dark:bg-card-bg/25 flex gap-4">
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-foreground">{t.contact.address}</h4>
                <p className="text-sm text-text-secondary leading-relaxed">{t.placeholders.address}</p>
              </div>
            </div>

            {/* Direct Numbers Card */}
            <div className="p-5 rounded-xl border border-border-color bg-bg-secondary dark:bg-card-bg/25 flex gap-4">
              <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-foreground">{t.contact.phone}</h4>
                <p className="text-sm text-text-secondary leading-relaxed">{t.placeholders.phone}</p>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-5 rounded-xl border border-border-color bg-bg-secondary dark:bg-card-bg/25 flex gap-4">
              <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-foreground">{t.contact.email}</h4>
                <p className="text-sm text-text-secondary leading-relaxed">{t.placeholders.email}</p>
              </div>
            </div>

            {/* Timings Card */}
            <div className="p-5 rounded-xl border border-border-color bg-bg-secondary dark:bg-card-bg/25 flex gap-4">
              <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-foreground">{t.contact.hours}</h4>
                <p className="text-sm text-text-secondary leading-relaxed">{t.placeholders.timings}</p>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Action Buttons & Maps Placeholder */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Interactive Quick Links */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <a
                href={phoneTel}
                className="flex flex-col items-center justify-center p-4 bg-primary text-white hover:bg-primary-dark rounded-xl text-center shadow-sm smooth-transition gap-2"
              >
                <Phone className="w-5 h-5" />
                <span className="text-xs font-bold">{t.contact.callNow}</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-4 bg-[#25D366] text-white hover:bg-[#20ba59] rounded-xl text-center shadow-sm smooth-transition gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                <span className="text-xs font-bold">{t.contact.whatsapp}</span>
              </a>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-4 border border-border-color bg-bg-secondary hover:bg-white dark:bg-card-bg dark:hover:bg-background text-foreground rounded-xl text-center shadow-sm smooth-transition gap-2"
              >
                <Compass className="w-5 h-5 text-primary" />
                <span className="text-xs font-bold">{t.contact.directions}</span>
              </a>

              <Link
                href="/appointment"
                className="flex flex-col items-center justify-center p-4 border border-border-color bg-bg-secondary hover:bg-white dark:bg-card-bg dark:hover:bg-background text-foreground rounded-xl text-center shadow-sm smooth-transition gap-2"
              >
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-xs font-bold">Book Slot</span>
              </Link>
            </div>

            {/* Google Map Mockup */}
            <div className="border border-border-color rounded-xl overflow-hidden shadow-md bg-bg-secondary dark:bg-card-bg/25">
              <div className="p-4 bg-white dark:bg-card-bg border-b border-border-color flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-primary-accent">
                  Interactive Map Integration
                </span>
                <span className="text-[10px] text-text-secondary font-bold">
                  [Google Maps - Pending Client Embed Code]
                </span>
              </div>
              
              <div className="relative w-full aspect-video bg-gradient-to-br from-primary-light to-bg-secondary dark:from-primary-light/10 dark:to-bg-secondary/20 flex flex-col items-center justify-center p-6 text-center select-none">
                <div className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-[radial-gradient(#0F8A5F_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <div className="relative z-10 space-y-4">
                  <div className="p-3 bg-white dark:bg-background rounded-full shadow-md w-fit mx-auto border border-border-color">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-md font-bold text-foreground">Location Pin Placeholder</h4>
                  <p className="text-xs text-text-secondary max-w-sm leading-relaxed">
                    Once the clinic provides their official Google Business Map coordinates, an interactive map iframe will load here.
                  </p>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary dark:text-primary-accent hover:underline"
                  >
                    <span>Open in Google Maps Application</span>
                    <Compass className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
