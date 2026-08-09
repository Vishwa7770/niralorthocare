"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Activity, Sparkles, ShieldAlert, Flame, HeartPulse, GitMerge, Shuffle, TrendingUp, ShieldCheck, CheckCircle2, ChevronRight, MessageSquare, Star, Phone } from "lucide-react";
import { useLanguage } from "@/components/ui/LanguageContext";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { treatmentsData } from "@/lib/data/treatmentsData";
import { VideoWelcomeScreen } from "@/components/ui/VideoWelcomeScreen";

const HeroBackground3D = dynamic(
  () => import("@/components/ui/HeroBackground3D"),
  {
    ssr: false,
    loading: () => (
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')"
        }}
      />
    )
  }
);

// Helper to resolve Lucide Icons dynamically
const getIconComponent = (name: string) => {
  const icons: Record<string, React.ComponentType<any>> = {
    Activity,
    Sparkles,
    ShieldAlert,
    Flame,
    HeartPulse,
    GitMerge,
    Shuffle,
    TrendingUp
  };
  return icons[name] || Activity;
};

export default function Home() {
  const { t, language } = useLanguage();
  
  // Parallax states for cinematic hero section
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showIntro, setShowIntro] = useState(true);

  // Disable scroll while welcome intro is playing
  useEffect(() => {
    // Check if welcome was already visited in this session
    const visited = typeof window !== "undefined" ? sessionStorage.getItem("niralOrthoIntroShown") : null;
    if (visited === "true") {
      setShowIntro(false);
      return;
    }
    
    if (showIntro) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showIntro]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Extract top treatments to show on homepage
  const homeTreatments = (treatmentsData[language] || []).slice(0, 6);

  // Framer Motion Animation Variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {showIntro && (
          <VideoWelcomeScreen onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center bg-[#06110D] text-white overflow-hidden py-24">
        {/* Layer 1: Background image with 3D liquid wave displacement texture rendering */}
        <HeroBackground3D />

        {/* Layer 2: Sophisticated dark gradient & green glows */}
        <div className="absolute inset-0 bg-black/65 lg:bg-gradient-to-r lg:from-[#06110D]/95 lg:via-[#06110D]/50 lg:to-transparent z-1 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(25,169,116,0.15)_0%,transparent_60%)] z-1 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <motion.div 
              className="lg:col-span-7 space-y-6 text-left relative z-20"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div 
                className="text-xs font-bold text-[#19A974] flex items-center gap-1.5"
                variants={fadeInUp}
              >
                <span>—</span>
                <span>Move Better. Live Stronger.</span>
              </motion.div>

              <motion.h1 
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white"
                variants={fadeInUp}
              >
                Expert <br />
                <span className="text-[#19A974]">Orthopedic Care</span> <br />
                Designed Around You.
              </motion.h1>

              <motion.p 
                className="text-base sm:text-lg text-zinc-300 max-w-xl leading-relaxed font-medium"
                variants={fadeInUp}
              >
                Personalized treatment. Advanced care. <br />
                Compassionate approach for a healthier tomorrow.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row items-center gap-4 pt-2"
                variants={fadeInUp}
              >
                <Link
                  href="/appointment"
                  className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-[#076B4A] text-white text-base font-bold rounded-lg shadow-sm hover:shadow-md transition-all text-center flex items-center justify-center gap-2 group"
                >
                  <span>Book an Appointment</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-3.5 border border-white/20 hover:border-white hover:bg-white/10 bg-transparent text-white text-base font-bold rounded-lg transition-all text-center flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-white" />
                  <span>Contact Us</span>
                </Link>
              </motion.div>

              {/* Social Proof ( mock ratings ) */}
              <motion.div 
                className="flex flex-wrap items-center gap-4 pt-6"
                variants={fadeInUp}
              >
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#06110D] overflow-hidden bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-400 select-none">
                      P{i}
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-[#06110D] bg-[#0F8A5F] flex items-center justify-center text-xs font-bold text-white z-10 select-none">
                    +98
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-[#19A974] text-[#19A974]" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-zinc-400">Trusted by 100+ Patients</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Right: Stacked Glass List Cards */}
            <motion.div 
              className="lg:col-span-5 relative w-full flex flex-col gap-4 pt-8 lg:pt-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" as const } }}
            >
              <div className="space-y-4 w-full max-w-md lg:max-w-none ml-auto relative z-20">
                {/* Card 1 */}
                <div className="bg-black/35 backdrop-blur-md border border-white/10 rounded-xl p-5 flex items-start gap-4 hover:border-white/20 transition-colors">
                  <div className="p-3 bg-[#E8F7F0]/10 text-[#19A974] rounded-lg shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base leading-tight">Expert Care</h4>
                    <p className="text-zinc-400 text-xs mt-1 font-medium">Experienced orthopedic specialist</p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-black/35 backdrop-blur-md border border-white/10 rounded-xl p-5 flex items-start gap-4 hover:border-white/20 transition-colors">
                  <div className="p-3 bg-[#E8F7F0]/10 text-[#19A974] rounded-lg shrink-0">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base leading-tight">Personalized Care</h4>
                    <p className="text-zinc-400 text-xs mt-1 font-medium">Treatment tailored to your unique needs</p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-black/35 backdrop-blur-md border border-white/10 rounded-xl p-5 flex items-start gap-4 hover:border-white/20 transition-colors">
                  <div className="p-3 bg-[#E8F7F0]/10 text-[#19A974] rounded-lg shrink-0">
                    <HeartPulse className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base leading-tight">Advanced Facilities</h4>
                    <p className="text-zinc-400 text-xs mt-1 font-medium">Modern technology for better outcomes</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 opacity-80 pointer-events-none">
          <div className="w-5 h-8 border-2 border-zinc-500 rounded-full flex justify-center p-1">
            <motion.div 
              className="w-1 h-2 bg-primary-accent rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span className="text-[9px] font-bold tracking-widest uppercase text-zinc-400">Scroll Down</span>
        </div>
      </section>


      {/* 2. WHY CHOOSE NIRAL SECTION */}
      <section className="py-20 bg-bg-secondary dark:bg-bg-secondary/40 border-y border-border-color smooth-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary dark:text-primary-accent">
              Core Principles
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-primary-dark dark:text-foreground tracking-tight">
              {t.whyChoose.title}
            </p>
            <p className="text-base text-text-secondary">
              {t.whyChoose.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: t.whyChoose.point1Title, desc: t.whyChoose.point1Desc, icon: HeartPulse },
              { title: t.whyChoose.point2Title, desc: t.whyChoose.point2Desc, icon: MessageSquare },
              { title: t.whyChoose.point3Title, desc: t.whyChoose.point3Desc, icon: ShieldCheck },
              { title: t.whyChoose.point4Title, desc: t.whyChoose.point4Desc, icon: Sparkles }
            ].map((point, index) => {
              const PointIcon = point.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-card-bg p-6 rounded-xl border border-border-color shadow-sm hover:shadow-md smooth-transition group flex flex-col h-full"
                  whileHover={{ y: -5 }}
                >
                  <div className="p-3 bg-primary-light dark:bg-primary-light/10 text-primary dark:text-primary-accent rounded-lg w-fit mb-5 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-primary-accent dark:group-hover:text-background smooth-transition">
                    <PointIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {point.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed flex-1">
                    {point.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. ABOUT DOCTOR TEASER */}
      <section className="py-20 bg-white dark:bg-background smooth-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Doctor Photo */}
            <div className="lg:col-span-5">
              <div className="relative max-w-sm mx-auto lg:max-w-none">
                <div className="absolute -inset-4 bg-primary/10 rounded-2xl rotate-3 pointer-events-none" />
                <ImagePlaceholder 
                  text="Dr. V.D.N. Madhivanan Clinical Consultation Pose"
                  aspectRatio="aspect-[4/5]"
                  iconType="doctor"
                  className="shadow-md border border-border-color"
                />
              </div>
            </div>

            {/* Doctor Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-primary dark:text-primary-accent">
                  {t.doctor.sectionTitle}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                  {t.doctor.doctorName}
                </h2>
                <p className="text-lg font-semibold text-primary dark:text-primary-accent">
                  {t.doctor.degree} • {t.doctor.role}
                </p>
              </div>

              <p className="text-base text-text-secondary leading-relaxed">
                {t.doctor.bio}
              </p>

              {/* Minimal verified qualifications list */}
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
                  {t.doctor.qualificationsTitle}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0" />
                    <span className="text-sm font-semibold text-foreground/90">M.B.B.S. Graduate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0" />
                    <span className="text-sm font-semibold text-foreground/90">M.S. (Orthopedics) Specialization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0" />
                    <span className="text-sm font-semibold text-foreground/90">Licensed Orthopedic Surgeon</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0" />
                    <span className="text-sm font-semibold text-text-secondary italic">{t.placeholders.experience}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary dark:text-primary-accent hover:text-primary-dark hover:underline group"
                >
                  <span>{t.doctor.learnMore}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TREATMENTS TEASER SECTION */}
      <section className="py-20 bg-bg-secondary dark:bg-bg-secondary/40 border-y border-border-color smooth-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
            <div className="space-y-3 max-w-2xl">
              <h2 className="text-xs font-bold uppercase tracking-widest text-primary dark:text-primary-accent">
                Our Services
              </h2>
              <p className="text-3xl sm:text-4xl font-extrabold text-primary-dark dark:text-foreground tracking-tight">
                Specialized Orthopedic Treatments
              </p>
              <p className="text-sm text-text-secondary">
                Clinical pathways designed for joint restoration, fracture recovery, and mobility enhancement.
              </p>
            </div>
            <Link
              href="/treatments"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border-color hover:bg-white dark:hover:bg-card-bg text-sm font-bold rounded-lg transition-all"
            >
              <span>View All Treatments</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeTreatments.map((treatment) => {
              const TreatmentIcon = getIconComponent(treatment.iconName);
              return (
                <div
                  key={treatment.slug}
                  className="bg-white dark:bg-card-bg p-6 rounded-xl border border-border-color shadow-sm hover:shadow-md smooth-transition group flex flex-col justify-between"
                >
                  <div>
                    <div className="p-3 bg-primary-light dark:bg-primary-light/10 text-primary dark:text-primary-accent rounded-lg w-fit mb-5">
                      <TreatmentIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary dark:group-hover:text-primary-accent smooth-transition">
                      {treatment.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-6">
                      {treatment.description}
                    </p>
                  </div>
                  <Link
                    href={`/treatments/${treatment.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary dark:text-primary-accent group-hover:translate-x-1 smooth-transition"
                  >
                    <span>Learn More</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION */}
      <section className="py-20 bg-white dark:bg-background smooth-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-primary dark:text-primary-accent">
              Patient Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Verified Patient Testimonials
            </h2>
            <p className="text-sm text-text-secondary">
              Read authentic feedback from patients who have completed their rehabilitation and treatment programs.
            </p>
          </div>

          {/* Testimonial Placeholder Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((val) => (
              <div key={val} className="p-6 rounded-xl border border-border-color bg-bg-secondary dark:bg-card-bg/30 relative flex flex-col justify-between">
                <div className="absolute top-6 right-6 text-primary/10">
                  <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-primary text-primary shrink-0" />
                    ))}
                  </div>
                  <p className="text-sm font-medium text-text-secondary leading-relaxed italic">
                    {t.placeholders.testimonials}
                  </p>
                </div>
                <div className="pt-6 border-t border-border-color/60 mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                    P{val}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Verified Patient</h4>
                    <p className="text-xs text-text-secondary">Consultation Patient</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL-TO-ACTION AREA */}
      <section className="py-16 bg-primary dark:bg-bg-secondary border-t border-primary-dark/10 smooth-transition">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Ready to Restore Your Mobility?
          </h2>
          <p className="text-base text-primary-light/90 dark:text-text-secondary max-w-xl mx-auto">
            Schedule a dedicated, personal consultation with Dr. V.D.N. Madhivanan to assess your orthopedic concerns.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/appointment"
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-primary dark:bg-primary-accent dark:text-background hover:bg-primary-light dark:hover:bg-primary-accent/80 font-bold rounded-lg transition-colors text-center shadow-md"
            >
              Book Consultation
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3.5 border border-white/20 hover:border-white text-white font-bold rounded-lg transition-colors text-center"
            >
              Get Location Details
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
