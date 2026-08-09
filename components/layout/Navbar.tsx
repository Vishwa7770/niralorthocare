"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, Globe, HeartPulse, Phone, Calendar } from "lucide-react";
import { useTheme } from "@/components/ui/ThemeContext";
import { useLanguage } from "@/components/ui/LanguageContext";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Scroll check should apply immediately in case page is refreshed while scrolled
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on path change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: t.nav.home, path: "/" },
    { name: t.nav.about, path: "/about" },
    { name: t.nav.treatments, path: "/treatments" },
    { name: t.nav.facilities, path: "/facilities" },
    { name: t.nav.gallery, path: "/gallery" },
    { name: t.nav.faq, path: "/faq" },
    { name: t.nav.contact, path: "/contact" }
  ];

  const isHome = pathname === "/";
  const isTopHome = isHome && !isScrolled;
  const navbarBg = isScrolled 
    ? "bg-white/95 dark:bg-background/95 shadow-md border-b border-border-color backdrop-blur-md py-3" 
    : isHome 
      ? "bg-transparent py-5 border-b border-transparent" 
      : "bg-white dark:bg-background border-b border-border-color py-4";

  const textColor = isScrolled || !isHome
    ? "text-foreground"
    : "text-white"; // or text-white depending on hero contrast, but let's make it adapt

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbarBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-primary/10 dark:bg-primary-accent/10 rounded-lg group-hover:bg-primary/20 dark:group-hover:bg-primary-accent/20 smooth-transition">
                <HeartPulse className="w-6 h-6 text-primary dark:text-primary-accent" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-primary dark:text-primary-accent leading-none">
                  NIRAL
                </span>
                <span className={`text-xs font-semibold tracking-widest uppercase mt-0.5 leading-none transition-colors ${
                  isTopHome ? "text-zinc-400" : "text-text-secondary"
                }`}>
                  ORTHO CARE
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`relative text-sm font-medium transition-colors py-2 ${
                      isActive 
                        ? "text-primary dark:text-primary-accent" 
                        : isTopHome
                          ? "text-zinc-300 hover:text-white"
                          : "text-text-secondary hover:text-primary dark:hover:text-primary-accent"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary dark:bg-primary-accent rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Actions: Theme, Lang, Appointment */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Language Selector */}
              <button
                onClick={() => setLanguage(language === "en" ? "ta" : "en")}
                className={`p-2 rounded-lg smooth-transition flex items-center gap-1.5 text-xs font-semibold ${
                  isTopHome
                    ? "text-zinc-300 hover:text-white hover:bg-white/10"
                    : "text-text-secondary hover:text-primary dark:hover:text-primary-accent hover:bg-bg-secondary dark:hover:bg-primary-light/10"
                }`}
                aria-label="Toggle language"
              >
                <Globe className="w-4 h-4" />
                <span>{language === "en" ? "தமிழ்" : "English"}</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg smooth-transition ${
                  isTopHome
                    ? "text-zinc-300 hover:text-white hover:bg-white/10"
                    : "text-text-secondary hover:text-primary dark:hover:text-primary-accent hover:bg-bg-secondary dark:hover:bg-primary-light/10"
                }`}
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
              </button>

              {/* Phone Link (Mockup) */}
              <a
                href="tel:+911234567890"
                className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-lg border transition-colors ${
                  isTopHome
                    ? "border-white/20 text-white hover:bg-white/10 hover:border-white"
                    : "border-border-color text-foreground hover:bg-bg-secondary dark:hover:bg-card-bg"
                }`}
              >
                <Phone className="w-3.5 h-3.5 text-[#19A974]" />
                <span>+91 12345 67890</span>
              </a>

              {/* CTA */}
              <Link
                href="/appointment"
                className="bg-primary hover:bg-[#076B4A] text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-colors flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.nav.book}</span>
              </Link>
            </div>

            {/* Mobile Actions and Burger */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Quick switches for Mobile */}
              <button
                onClick={() => setLanguage(language === "en" ? "ta" : "en")}
                className={`p-1.5 rounded-lg text-xs font-bold ${
                  isTopHome ? "text-zinc-300 hover:text-white" : "text-text-secondary"
                }`}
              >
                {language === "en" ? "தமிழ்" : "EN"}
              </button>

              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${
                  isTopHome ? "text-zinc-300 hover:text-white" : "text-text-secondary"
                }`}
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-lg ${
                  isTopHome
                    ? "text-white hover:bg-white/10"
                    : "text-text-secondary hover:bg-bg-secondary dark:hover:bg-primary-light/10"
                }`}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 max-w-sm bg-white dark:bg-background shadow-2xl p-6 lg:hidden transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-6 h-6 text-primary" />
            <span className="font-bold text-primary dark:text-primary-accent">NIRAL ORTHO</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-text-secondary rounded-lg hover:bg-bg-secondary dark:hover:bg-primary-light/10"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`text-base font-semibold py-2 px-3 rounded-lg hover:bg-bg-secondary dark:hover:bg-primary-light/10 transition-colors ${
                  isActive 
                    ? "text-primary dark:text-primary-accent bg-primary-light dark:bg-primary-light/15" 
                    : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          
          <div className="border-t border-border-color my-4 pt-4">
            <Link
              href="/appointment"
              className="w-full inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg text-center transition-colors shadow-sm"
            >
              {t.nav.book}
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};
