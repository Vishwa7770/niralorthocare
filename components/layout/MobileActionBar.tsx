"use client";

import React from "react";
import Link from "next/link";
import { Phone, MessageSquare, Calendar } from "lucide-react";
import { useLanguage } from "@/components/ui/LanguageContext";

export const MobileActionBar: React.FC = () => {
  const { t } = useLanguage();

  // Placeholder actions (to be verified by the client)
  const phoneTel = "tel:0000000000"; // Placeholder telephone number
  const whatsappUrl = "https://wa.me/0000000000"; // Placeholder WhatsApp linkage

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-background/95 border-t border-border-color shadow-[0_-4px_12px_rgba(0,0,0,0.05)] md:hidden backdrop-blur-md transition-all duration-300">
      <div className="grid grid-cols-3 h-16 divide-x divide-border-color">
        {/* Call Action */}
        <a
          href={phoneTel}
          className="flex flex-col items-center justify-center text-text-secondary hover:text-primary dark:hover:text-primary-accent smooth-transition active:bg-bg-secondary"
        >
          <Phone className="w-5 h-5 text-primary" />
          <span className="text-[10px] font-semibold mt-1">
            {t.contact.callNow}
          </span>
        </a>

        {/* WhatsApp Action */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center text-text-secondary hover:text-[#25D366] smooth-transition active:bg-bg-secondary"
        >
          <MessageSquare className="w-5 h-5 text-[#25D366]" />
          <span className="text-[10px] font-semibold mt-1">
            {t.contact.whatsapp}
          </span>
        </a>

        {/* Appointment Link */}
        <Link
          href="/appointment"
          className="flex flex-col items-center justify-center bg-primary dark:bg-primary-accent text-white hover:bg-primary-dark smooth-transition"
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1">
            {t.nav.book}
          </span>
        </Link>
      </div>
    </div>
  );
};
