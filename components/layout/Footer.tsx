"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/components/ui/LanguageContext";
import { treatmentsData } from "@/lib/data/treatmentsData";

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  // Use localized treatments list for the footer quick access
  const footerTreatments = treatmentsData[language] || [];

  return (
    <footer className="bg-[#0A1F7A] text-white pt-16 pb-24 md:pb-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Intro */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white shrink-0 shadow-sm">
                <Image src="/images/hospital-logo.png" alt="Niral Ortho Care logo" fill sizes="40px" className="object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-md font-bold tracking-tight text-white leading-none">NIRAL</span>
                <span className="text-[10px] font-bold text-zinc-300 tracking-widest uppercase mt-0.5 leading-none">ORTHO CARE</span>
              </div>
            </Link>
            <p className="text-sm text-zinc-300 leading-relaxed font-medium">
              {t.footer.desc}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg smooth-transition" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg smooth-transition" aria-label="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg smooth-transition" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg smooth-transition" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.668.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-[#3454D1] uppercase tracking-wider mb-4">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-sm text-zinc-300 hover:text-white transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-zinc-300 hover:text-white transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-zinc-300 hover:text-white transition-colors">
                  {t.nav.faq}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-zinc-300 hover:text-white transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Treatments Links */}
          <div>
            <h3 className="text-sm font-bold text-[#3454D1] uppercase tracking-wider mb-4">
              {t.footer.treatments}
            </h3>
            <ul className="space-y-2.5">
              {footerTreatments.slice(0, 5).map((treatment) => (
                <li key={treatment.slug}>
                  <Link href={`/treatments/${treatment.slug}`} className="text-sm text-zinc-300 hover:text-white transition-colors">
                    {treatment.title}
                  </Link>
                </li>
              ))}
              {footerTreatments.length > 5 && (
                <li>
                  <Link href="/treatments" className="text-sm text-[#3454D1] font-semibold hover:underline">
                    View All Treatments
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Contact Placeholders */}
          <div>
            <h3 className="text-sm font-bold text-[#3454D1] uppercase tracking-wider mb-4">
              {t.footer.contactInfo}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-zinc-300">
                <MapPin className="w-4.5 h-4.5 text-white shrink-0 mt-0.5" />
                <span>{t.placeholders.address}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-zinc-300">
                <Phone className="w-4.5 h-4.5 text-white shrink-0" />
                <span>{t.placeholders.phone}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-zinc-300">
                <Mail className="w-4.5 h-4.5 text-white shrink-0" />
                <span>{t.placeholders.email}</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-zinc-300">
                <Clock className="w-4.5 h-4.5 text-white shrink-0 mt-0.5" />
                <span>{t.placeholders.timings}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-300">
            © {currentYear} NIRAL ORTHO CARE. {t.footer.rights}
          </p>
          <div className="flex gap-4 text-xs text-zinc-300">
            <Link href="/faq" className="hover:text-white">Privacy Policy</Link>
            <Link href="/faq" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
