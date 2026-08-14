"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  ArrowRight, 
  Activity, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight, 
  MessageSquare, 
  Star, 
  Phone, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  Calendar,
  Stethoscope,
  Building2,
  MapPin,
  Play,
  Video
} from "lucide-react";
import { useLanguage } from "@/components/ui/LanguageContext";
import { treatmentsData } from "@/lib/data/treatmentsData";
import { VideoWelcomeScreen } from "@/components/ui/VideoWelcomeScreen";
import dynamic from "next/dynamic";

const HeroBackground3D = dynamic(
  () => import("@/components/ui/HeroBackground3D"),
  {
    ssr: false,
    loading: () => (
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0 opacity-30"
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
    ShieldCheck,
  };
  return icons[name] || Activity;
};

export default function Home() {
  const { t, language } = useLanguage();
  
  // Parallax / Welcome states
  const [scrollY, setScrollY] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  // Video showcase state
  const [isPlayingIntroVideo, setIsPlayingIntroVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mouse hover Parallax tracking
  const heroRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Motion values to update styling without triggering React state updates / re-renders
  const mouseX = useMotionValue(0); // Normalized range [-1, 1]
  const mouseY = useMotionValue(0); // Normalized range [-1, 1]

  // Spring animations for clean inertia and smooth lag
  const springConfig = { stiffness: 120, damping: 25, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Transform spring values to 3D rotation and translation visual parameters
  const rotateX = useTransform(springY, [-1, 1], [6, -6]);  // rotates X from 6deg to -6deg
  const rotateY = useTransform(springX, [-1, 1], [-8, 8]);  // rotates Y from -8deg to 8deg
  const translateX = useTransform(springX, [-1, 1], [-8, 8]); // translates X from -8px to 8px
  const translateY = useTransform(springY, [-1, 1], [-8, 8]); // translates Y from -8px to 8px

  // Foreground Layer 3 badge translates with a stronger multiplier for layered depth
  const badgeTranslateX = useTransform(springX, [-1, 1], [-14, 14]);
  const badgeTranslateY = useTransform(springY, [-1, 1], [-14, 14]);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    motionQuery.addEventListener("change", handleMotionChange);
    return () => motionQuery.removeEventListener("change", handleMotionChange);
  }, []);

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    // Disable on mobile/touch screens or reduced motion
    if (window.matchMedia("(max-width: 1024px)").matches || reducedMotion) {
      return;
    }
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    // Normalized position relative to center: ranges from -1 to 1
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleHeroMouseLeave = () => {
    // Smoothly spring return to default center position
    mouseX.set(0);
    mouseY.set(0);
  };

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
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handlePlayIntroVideo = () => {
    setIsPlayingIntroVideo(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 150);
  };

  // Extract top treatments to show on homepage
  const homeTreatments = (treatmentsData[language] || []).slice(0, 6);

  // Snapshot of the most common questions, mirrored from the full FAQ page
  const homeFaqs = [
    {
      question: language === "en" 
        ? "How can I book an appointment with Dr. V.D.N. Madhivanan?" 
        : "டாக்டர் V.D.N. மதிவாணனுடன் ஆலோசனையை எவ்வாறு முன்பதிவு செய்வது?",
      answer: language === "en"
        ? 'You can easily request a consultation by clicking the "Book Appointment" button on the navigation bar, filling out the online request form, or calling the hospital clinic line directly. Our clinical staff will call you to confirm your date and slot.'
        : "வழிசெலுத்தல் பட்டியில் உள்ள 'முன்பதிவு செய்ய' பொத்தானைக் கிளிக் செய்வதன் மூலமாகவோ, ஆன்லைன் கோரிக்கை படிவத்தை பூர்த்தி செய்வதன் மூலமாகவோ அல்லது மருத்துவமனை ஆலோசனைக் கிளினிக்கை நேரடியாக அழைப்பதன் மூலமாகவோ நீங்கள் எளிதாக ஆலோசனையைக் கோரலாம். எங்கள் மருத்துவப் பணியாளர்கள் உங்களை அழைத்து ஆலோசனைக் காலத்தை உறுதி செய்வார்கள்."
    },
    {
      question: language === "en"
        ? "What conditions are treated at Niral Ortho Care?"
        : "நிரல் எலும்பியல் மையத்தில் என்னென்ன நோய்களுக்கு சிகிச்சை அளிக்கப்படுகிறது?",
      answer: language === "en"
        ? "We specialize in a broad range of orthopedic care, including Knee Care (arthritis, ligament wear), Joint Care, Fracture Alignment Care (splints/fixations), Sports Injuries (ACL tears, sprains), Spine Care (back pain, sciatica), and post-operative Physical Rehabilitation."
        : "முழங்கால் பராமரிப்பு (கீல்வாதம், தசைநார் தேய்மானம்), மூட்டு பராமரிப்பு, எலும்பு முறிவு சீரமைப்பு (ஸ்பிளிண்ட்ஸ்/பிக்சேஷன்ஸ்), விளையாட்டு காயங்கள் (ஏசிஎல் கண்ணீர், சுளுக்கு), முதுகுத்தண்டு பராமரிப்பு (முதுகு வலி, சியாட்டிகா) மற்றும் அறுவை சிகிச்சைக்குப் பிந்தைய உடற்பயிற்சி மறுவாழ்வு உள்ளிட்ட பரந்த அளவிலான எலும்பியல் கவனிப்பில் நாங்கள் நிபுணத்துவம் பெற்றுள்ளோம்."
    },
    {
      question: language === "en"
        ? "Does the clinic offer emergency fracture services?"
        : "கிளினிக் அவசர எலும்பு முறிவு சேவைகளை வழங்குகிறதா?",
      answer: language === "en"
        ? "Emergency orthopedic fixations are subject to surgeon availability. Please contact us directly to check emergency trauma triage status before arrival."
        : "அவசர எலும்பியல் திருத்தங்கள் அறுவை சிகிச்சை நிபுணரின் கிடைக்கும் தன்மைக்கு உட்பட்டது. வருவதற்கு முன் அவசர சிகிச்சை நிலையை சரிபார்க்க எங்களை நேரடியாக தொடர்பு கொள்ளவும்."
    }
  ];

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
      <section 
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative min-h-[92vh] flex items-center justify-center bg-gradient-to-b from-[#F0F4FF] via-[#F8FAFC] to-[#FFFFFF] dark:from-background dark:via-background/95 dark:to-background text-foreground overflow-hidden pt-36 pb-16"
      >
        {/* Layer 1: Background image with 3D liquid wave displacement texture rendering */}
        <HeroBackground3D />

        {/* Soft brand-blue accents to keep the light hero feeling premium */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(14,0,149,0.03)_0%,transparent_55%)] pointer-events-none z-1" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_80%,rgba(14,0,149,0.015)_0%,transparent_55%)] pointer-events-none z-1" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content: Stacked in rounded white card container */}
            <motion.div 
              className="lg:col-span-7 bg-white/95 dark:bg-card-bg/95 backdrop-blur-md rounded-[32px] p-8 sm:p-12 md:p-14 shadow-xl shadow-primary/5 border border-white/60 dark:border-white/5 space-y-6 max-w-2xl text-left z-20"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-[46px] font-extrabold tracking-tight leading-[1.18] text-[#1A2836] dark:text-foreground"
                variants={fadeInUp}
              >
                {language === "en" ? (
                  <>
                    Niral Ortho Care – <br />
                    <span className="text-primary">Trusted Orthopedic Care</span>
                  </>
                ) : (
                  <>
                    நிரல் எலும்பியல் மையம் – <br />
                    <span className="text-primary">நம்பகமான எலும்பியல் சிகிச்சை</span>
                  </>
                )}
              </motion.h1>

              <motion.p 
                className="text-[#4A5568] dark:text-zinc-300 text-sm sm:text-base leading-relaxed font-medium"
                variants={fadeInUp}
              >
                {language === "en" ? (
                  "At Niral Ortho Care, we blend experience with empathy to offer dependable healthcare services for every stage of life. Our team of specialists delivers personalized treatment using the latest medical advancements — without the need to travel far from home."
                ) : (
                  "நிரல் எலும்பியல் மையத்தில், வாழ்க்கையின் ஒவ்வொரு கட்டத்திற்கும் நம்பகமான எலும்பியல் சுகாதார சேவைகளை வழங்க அனுபவத்தையும் அனுதாபத்தையும் கலக்கிறோம். எங்கள் நிபுணர்கள் குழு சமீபத்திய மருத்துவ முன்னேற்றங்களைப் பயன்படுத்தி தனிப்பயனாக்கப்பட்ட சிகிச்சையை வழங்குகிறது — நீங்கள் எங்கோ தூரம் செல்லத் தேவையில்லை."
                )}
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row items-center gap-4 pt-2"
                variants={fadeInUp}
              >
                <Link
                  href="/appointment"
                  className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-primary-dark text-white text-base font-bold rounded-full shadow-sm hover:shadow-md transition-all text-center flex items-center justify-center gap-2 group"
                >
                  <span>{t.nav.book}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-3.5 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 bg-transparent text-[#0F1E36] dark:text-foreground text-base font-bold rounded-full transition-all text-center flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  <span>{language === "en" ? "Contact Us" : "தொடர்பு கொள்ள"}</span>
                </Link>
              </motion.div>

              {/* Dynamic Ratings / Social Proof inside the card wrapper */}
              <motion.div 
                className="flex flex-wrap items-center gap-4 pt-5 border-t border-zinc-100 dark:border-zinc-800/80"
                variants={fadeInUp}
              >
                <div className="flex -space-x-2.5">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900 overflow-hidden bg-zinc-100 flex items-center justify-center text-[9px] font-bold text-zinc-600 select-none shadow-sm">
                      P{i}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900 bg-primary flex items-center justify-center text-[10px] font-bold text-white z-10 select-none shadow-sm">
                    +98
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400">
                    {language === "en" ? "Trusted by 100+ Patients" : "100+ நோயாளிகளால் நம்பப்பட்டது"}
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Right Content: Male doctor holding tablet portrait */}
            <motion.div 
              className="lg:col-span-5 relative w-full flex flex-col items-center justify-center pt-8 lg:pt-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" as const } }}
              style={{ transformStyle: "preserve-3d", perspective: 1200 }}
            >
              {/* High-quality Doctor portrait with 3D tilt */}
              <motion.div 
                className="relative w-full aspect-[4/3] sm:aspect-[1.1] lg:aspect-[0.9] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/90 dark:border-zinc-800/90 shadow-primary/5 bg-zinc-100 z-10"
                style={{
                  rotateX: reducedMotion ? 0 : rotateX,
                  rotateY: reducedMotion ? 0 : rotateY,
                  x: reducedMotion ? 0 : translateX,
                  y: reducedMotion ? 0 : translateY,
                  transformStyle: "preserve-3d",
                }}
              >
                <Image
                  src="/images/hero-doctor.jpg"
                  alt="Dr. V.D.N. Madhivanan | Niral Ortho Care"
                  fill
                  className="object-cover object-center"
                  sizes="(max-w-1024px) 100vw, 50vw"
                  priority
                />
              </motion.div>

              {/* Floating Layer 3 decorative badge for depth parallax */}
              <motion.div
                className="absolute bottom-6 -left-6 bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 p-4 rounded-2xl shadow-xl z-20 hidden sm:flex items-center gap-3 select-none"
                style={{
                  x: reducedMotion ? 0 : badgeTranslateX,
                  y: reducedMotion ? 0 : badgeTranslateY,
                  transformStyle: "preserve-3d",
                  translateZ: 60, // pushes badge forward in 3D space
                }}
              >
                <div className="w-10 h-10 rounded-full bg-primary-light dark:bg-primary-light/10 flex items-center justify-center text-primary dark:text-primary-accent shrink-0">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-extrabold text-[#0F1E36] dark:text-white leading-none">
                    {language === "en" ? "Joint Care Specialist" : "மூட்டு சிகிச்சை நிபுணர்"}
                  </span>
                  <span className="text-[10px] font-bold text-text-secondary mt-1">
                    {language === "en" ? "20+ Years Experience" : "20+ ஆண்டுகள் அனுபவம்"}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE QUICK ACTIONS BAR (BAR SECTION) */}
      <section className="relative z-30 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-card-bg rounded-2xl border border-border-color shadow-[0_15px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_15px_50px_rgba(0,0,0,0.3)] overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-border-color">
            
            {/* Action 1: Appointment */}
            <Link 
              href="/appointment" 
              className="group flex items-center gap-5 p-6 hover:bg-primary-light/35 dark:hover:bg-primary-light/5 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-0 h-0 border-t-[4px] border-t-primary dark:border-t-primary-accent border-r-[4px] border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-14 h-14 rounded-full bg-primary-light dark:bg-primary-light/10 text-primary dark:text-primary-accent flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-primary-accent dark:group-hover:text-background transition-all duration-300 shadow-sm">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-wider text-text-secondary group-hover:text-primary dark:group-hover:text-primary-accent transition-colors">
                  {t.quickActions.appointment}
                </span>
                <span className="text-sm font-semibold text-foreground/80 mt-0.5">
                  {language === "en" ? "Schedule Online" : "ஆன்லைனில் முன்பதிவு"}
                </span>
              </div>
            </Link>

            {/* Action 2: Treatments */}
            <Link 
              href="/treatments" 
              className="group flex items-center gap-5 p-6 hover:bg-primary-light/35 dark:hover:bg-primary-light/5 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-0 h-0 border-t-[4px] border-t-primary dark:border-t-primary-accent border-r-[4px] border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-14 h-14 rounded-full bg-primary-light dark:bg-primary-light/10 text-primary dark:text-primary-accent flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-primary-accent dark:group-hover:text-background transition-all duration-300 shadow-sm">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-wider text-text-secondary group-hover:text-primary dark:group-hover:text-primary-accent transition-colors">
                  {t.quickActions.treatments}
                </span>
                <span className="text-sm font-semibold text-foreground/80 mt-0.5">
                  {language === "en" ? "View Specialties" : "சிறப்பு சிகிச்சைகள்"}
                </span>
              </div>
            </Link>

            {/* Action 3: Clinic Tour */}
            <Link 
              href="/facilities" 
              className="group flex items-center gap-5 p-6 hover:bg-primary-light/35 dark:hover:bg-primary-light/5 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-0 h-0 border-t-[4px] border-t-primary dark:border-t-primary-accent border-r-[4px] border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-14 h-14 rounded-full bg-primary-light dark:bg-primary-light/10 text-primary dark:text-primary-accent flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-primary-accent dark:group-hover:text-background transition-all duration-300 shadow-sm">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-wider text-text-secondary group-hover:text-primary dark:group-hover:text-primary-accent transition-colors">
                  {t.quickActions.facilities}
                </span>
                <span className="text-sm font-semibold text-foreground/80 mt-0.5">
                  {language === "en" ? "Modern Infrastructure" : "நவீன வசதிகள்"}
                </span>
              </div>
            </Link>

            {/* Action 4: Get Directions */}
            <Link 
              href="/contact" 
              className="group flex items-center gap-5 p-6 hover:bg-primary-light/35 dark:hover:bg-primary-light/5 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-0 h-0 border-t-[4px] border-t-primary dark:border-t-primary-accent border-r-[4px] border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-14 h-14 rounded-full bg-primary-light dark:bg-primary-light/10 text-primary dark:text-primary-accent flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-primary-accent dark:group-hover:text-background transition-all duration-300 shadow-sm">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-wider text-text-secondary group-hover:text-primary dark:group-hover:text-primary-accent transition-colors">
                  {t.quickActions.directions}
                </span>
                <span className="text-sm font-semibold text-foreground/80 mt-0.5">
                  {language === "en" ? "Find Clinic Location" : "கிளினிக் இருப்பிடம்"}
                </span>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* 3. CHIEF SURGEON'S MESSAGE (CHAIRMAN SECTION) */}
      <section className="py-24 bg-white dark:bg-background smooth-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Doctor Image Column */}
            <div className="w-full lg:w-[38%] shrink-0">
              <div className="relative max-w-sm mx-auto lg:max-w-none">
                {/* Dynamic backing accents */}
                <div className="absolute -inset-4 bg-primary/10 dark:bg-primary/5 rounded-3xl rotate-3 pointer-events-none animate-pulse" />
                <div className="absolute -inset-4 border border-border-color rounded-3xl -rotate-2 pointer-events-none" />
                
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-border-color/65 z-10">
                  <Image
                    src="/images/doctor-portrait-v4.jpg"
                    alt="Dr. V.D.N. Madhivanan"
                    fill
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Message Content Column */}
            <div className="flex-1 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold tracking-widest uppercase text-primary dark:text-primary-accent block">
                  {t.doctorMessage.subtitle}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                  {t.doctorMessage.welcome}
                </h2>
                <h5 className="text-lg font-bold text-primary dark:text-primary-accent">
                  {t.doctor.doctorName} <span className="text-sm font-medium text-text-secondary">({t.doctor.degree})</span>
                </h5>
              </div>

              {/* Stylized Quote Box */}
              <div className="relative bg-bg-secondary dark:bg-card-bg/30 p-8 border-l-4 border-primary dark:border-primary-accent rounded-r-xl shadow-sm overflow-hidden group">
                {/* Huge quotation mark icon */}
                <span className="absolute top-2 left-4 text-7xl text-primary/10 dark:text-primary-accent/10 select-none font-serif leading-none pointer-events-none">
                  ❝
                </span>
                <p className="relative z-10 text-base sm:text-lg text-foreground/85 font-medium italic leading-relaxed pl-4">
                  {t.doctorMessage.quote}
                </p>
              </div>

              {/* Professional Qualifications Checklist */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                  {t.doctor.qualificationsTitle} & Expertise
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary dark:text-primary-accent shrink-0" />
                    <span className="text-sm font-semibold text-foreground/90">M.B.B.S. Graduate Surgeon</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary dark:text-primary-accent shrink-0" />
                    <span className="text-sm font-semibold text-foreground/90">M.S. (Orthopedics) Specialist</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary dark:text-primary-accent shrink-0" />
                    <span className="text-sm font-semibold text-foreground/90">Joint Reconstruction Expert</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary dark:text-primary-accent shrink-0" />
                    <span className="text-sm font-semibold text-text-secondary italic">{t.placeholders.experience}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-6">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-full transition-colors shadow-sm"
                >
                  <span>{t.doctor.learnMore}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                
                {/* Signature Block */}
                <div className="flex flex-col pl-4 border-l border-border-color">
                  <span className="font-bold text-foreground leading-none">{t.doctor.doctorName}</span>
                  <span className="text-xs text-text-secondary mt-1 font-semibold">{t.doctorMessage.founderTitle}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3.5 ABOUT US & HOSPITAL QUICK INFO SECTION */}
      <section className="py-24 bg-white dark:bg-background smooth-transition border-t border-zinc-100 dark:border-zinc-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Row: About Us Narrative & Stacked Happiness Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-8 space-y-5 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                {language === "en" ? "About Us" : "எங்களைப் பற்றி"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1E36] dark:text-foreground tracking-tight">
                {language === "en" ? "Niral Ortho Care" : "நிரல் எலும்பியல் மையம்"}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed font-medium">
                {language === "en" ? (
                  "Founded in 2021 in the heart of Ramanathapuram, Niral Ortho Care has quickly emerged as a trusted name in compassionate orthopedic healthcare. Our state-of-the-art facility, expert medical staff, and patient-first approach make us a beacon of hope for thousands."
                ) : (
                  "இராமநாதபுரத்தின் மையப்பகுதியில் 2021 இல் நிறுவப்பட்ட நிரல் எலும்பியல் மையம், விரைவாக முழங்கால் மற்றும் எலும்பு பராமரிப்பில் ஒரு நம்பகமான பெயராக உருவெடுத்துள்ளது. எங்களின் அதிநவீன வசதி, நிபுணத்துவம் வாய்ந்த மருத்துவக் குழுவினர் மற்றும் நோயாளிக்கு முதலிடம் வழங்கும் அணுகுமுறை ஆகியவை ஆயிரக்கணக்கானோருக்கு நம்பிக்கையின் ஒளியாக அமைகின்றன."
                )}
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-full shadow-sm hover:shadow-md transition-colors"
                >
                  {language === "en" ? "For More" : "மேலும் அறிய"}
                </Link>
              </div>
            </div>

            {/* Right: Stacked Patient Happiness Badge */}
            <div className="lg:col-span-4 flex justify-end">
              <div className="bg-primary-light/40 dark:bg-primary-light/10 rounded-[32px] p-10 flex flex-col items-center justify-center text-center space-y-3 w-full max-w-xs border border-primary/10 dark:border-primary-accent/10 shadow-sm shadow-primary/5">
                <div className="flex -space-x-3 mb-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-11 h-11 rounded-full border-2 border-white dark:border-zinc-900 overflow-hidden bg-zinc-100 flex items-center justify-center text-[10px] font-bold text-zinc-500 select-none shadow-sm">
                      P{i}
                    </div>
                  ))}
                </div>
                <div className="space-y-0.5">
                  <span className="block text-3xl font-extrabold text-[#0F1E36] dark:text-white tracking-tight">1.5K+</span>
                  <span className="block text-xs sm:text-sm font-bold text-zinc-500 dark:text-zinc-400">
                    {language === "en" ? "Patients Happiness" : "மகிழ்ச்சியான நோயாளிகள்"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Emergency, Timetable & Opening Hours Card */}
          <div className="bg-primary-light/20 dark:bg-primary-light/5 rounded-3xl p-8 md:p-10 border border-primary/5 dark:border-primary-accent/5 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-primary/10 dark:divide-primary-accent/10 text-left">
            {/* Column 1: Emergency */}
            <div className="flex items-start gap-4 pb-6 lg:pb-0 lg:pr-6">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-md">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold text-[#0F1E36] dark:text-white">
                  {language === "en" ? "Emergency Cases" : "அவசர வழக்குகள்"}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-semibold">
                  {language === "en" ? (
                    "In case of urgent health concerns, don't hesitate to call our emergency hotline. Our doctors and support staff are trained to respond swiftly and effectively."
                  ) : (
                    "அவசர சுகாதாரப் பிரச்சனைகள் ஏற்பட்டால், எங்களின் அவசர உதவி எண்ணை அழைக்க தயங்க வேண்டாம். எங்கள் மருத்துவர்கள் மற்றும் ஊழியர்கள் விரைவாக பதிலளிக்க பயிற்சி பெற்றுள்ளனர்."
                  )}
                </p>
              </div>
            </div>

            {/* Column 2: Doctors Timetable */}
            <div className="flex items-start gap-4 py-6 lg:py-0 lg:px-8">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-md">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold text-[#0F1E36] dark:text-white">
                  {language === "en" ? "Doctors Timetable" : "மருத்துவர்கள் அட்டவணை"}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-semibold">
                  {language === "en" ? (
                    "Our doctors are available on a rotational basis. For up-to-date availability, kindly reach out to our reception or Book the Appointment."
                  ) : (
                    "எங்கள் மருத்துவர்கள் சுழற்சி அடிப்படையில் கிடைக்கிறார்கள். தற்போதைய நேரங்களுக்கு, தயவுசெய்து எங்கள் வரவேற்பறையைத் தொடர்பு கொள்ளவும் அல்லது முன்பதிவு செய்யவும்."
                  )}
                </p>
              </div>
            </div>

            {/* Column 3: Opening Hours */}
            <div className="flex items-start gap-4 pt-6 lg:pt-0 lg:pl-8">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-md">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="space-y-1.5 w-full">
                <h3 className="text-base sm:text-lg font-bold text-[#0F1E36] dark:text-white">
                  {language === "en" ? "Opening Hours" : "திறந்திருக்கும் நேரம்"}
                </h3>
                <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-bold space-y-0.5">
                  <p>Mon - Sun (OP Hours)</p>
                  <p className="text-primary text-sm font-extrabold">8:00 AM - 8:00 PM</p>
                  <p className="font-semibold text-zinc-500 dark:text-zinc-500 text-[11px] uppercase tracking-wide">Emergency 24/7 Hours</p>
                </div>
                <div className="pt-1.5">
                  <Link
                    href="/appointment"
                    className="text-xs sm:text-sm font-extrabold text-primary hover:text-primary-dark hover:underline flex items-center gap-1 group"
                  >
                    <span>{language === "en" ? "Book an Appointment" : "ஆலோசனையை முன்பதிவு செய்"}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. WHY NIRAL ORTHO CARE / HOSPITAL INFO SECTION */}
      <section className="py-24 bg-white dark:bg-zinc-950 smooth-transition border-y border-zinc-100 dark:border-zinc-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Text & Bullet Specialties */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <h2 className="text-[#0F1E36] dark:text-foreground text-3xl sm:text-4xl font-extrabold tracking-tight">
                {language === "en" ? "Why Niral Ortho Care" : "ஏன் நிரல் எலும்பியல் மையம்"}
              </h2>
              
              <div className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed space-y-4 font-medium">
                <p>
                  {language === "en" ? (
                    "Niral Ortho Care, newly built in the heart of Ramanathapuram, offers high-class facilities with advanced technology to provide exceptional healthcare. Our experienced team ensures personalized care, focusing on patient comfort and safety. We are dedicated to offering the highest standards of medical services, making us the trusted choice for your healthcare needs."
                  ) : (
                    "இராமநாதபுரத்தின் மையப்பகுதியில் புதிதாக கட்டப்பட்டுள்ள நிரல் எலும்பியல் மையம், சிறந்த சுகாதார சேவைகளை வழங்க மேம்பட்ட தொழில்நுட்பத்துடன் கூடிய உயர்தர வசதிகளை வழங்குகிறது. எங்களின் அனுபவம் வாய்ந்த குழு நோயாளிகளின் வசதி மற்றும் பாதுகாப்பில் கவனம் செலுத்தி, தனிப்பயனாக்கப்பட்ட கவனிப்பை உறுதி செய்கிறது. உங்களின் சுகாதாரத் தேவைகளுக்கான நம்பகமான தேர்வாக எங்களை உருவாக்குவதில் நாங்கள் அர்ப்பணிப்புடன் இருக்கிறோம்."
                  )}
                </p>
                <p>
                  {language === "en" ? (
                    "Our specialties focus on critical care, personalized treatments, comprehensive diagnostic services, surgical interventions, and holistic recovery and rehabilitation programs."
                  ) : (
                    "எங்கள் மருத்துவ சேவைகள் அவசர சிகிச்சை, தனிப்பயனாக்கப்பட்ட சிகிச்சைகள், விரிவான கண்டறியும் சேவைகள், அறுவை சிகிச்சை தலையீடுகள் மற்றும் முழுமையான மீட்பு மற்றும் மறுவாழ்வு திட்டங்களில் கவனம் செலுத்துகின்றன."
                  )}
                </p>
              </div>

              {/* Grid of Specialties */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
                {/* Column 1 */}
                <ul className="space-y-3">
                  {[
                    { en: "Pediatrics", ta: "குழந்தை மருத்துவம்" },
                    { en: "Gastroenterology", ta: "இரைப்பை குடல் மருத்துவம்" },
                    { en: "Emergency & Critical Care", ta: "அவசர மற்றும் தீவிர சிகிச்சை" },
                    { en: "Orthopaedics", ta: "எலும்பியல்" },
                    { en: "Infertility & Gynaecology", ta: "மகளிர் மற்றும் மலட்டுத்தன்மை" },
                    { en: "ENT", ta: "காது, மூக்கு, தொண்டை" },
                    { en: "Dentistry", ta: "பல் மருத்துவம்" }
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center text-sm font-semibold text-[#0F1E36] dark:text-zinc-200 hover:text-primary transition-colors">
                      <span className="text-primary mr-2.5 font-bold text-lg leading-none">•</span>
                      <span>{language === "en" ? item.en : item.ta}</span>
                    </li>
                  ))}
                </ul>

                {/* Column 2 */}
                <ul className="space-y-3">
                  {[
                    { en: "Nephrology & Urology", ta: "சிறுநீரகவியல்" },
                    { en: "Physiotherapy", ta: "இயல்முறை சிகிச்சை" },
                    { en: "Diabetology", ta: "நீரிழிவு நோய்" },
                    { en: "Cardiology", ta: "இருதயவியல்" },
                    { en: "Ophthalmology", ta: "கண் மருத்துவம்" },
                    { en: "Dermatology", ta: "தோல் மருத்துவம்" },
                    { en: "Oncology", ta: "புற்றுநோயியல்" }
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center text-sm font-semibold text-[#0F1E36] dark:text-zinc-200 hover:text-primary transition-colors">
                      <span className="text-primary mr-2.5 font-bold text-lg leading-none">•</span>
                      <span>{language === "en" ? item.en : item.ta}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Hospital Building Image Frame */}
            <div className="lg:col-span-5 relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 dark:border-zinc-800/90 shadow-blue-900/5 bg-zinc-50 z-10">
              <Image
                src="/images/hospital-building.jpg"
                alt="Niral Ortho Care Hospital Building Facade"
                fill
                className="object-cover object-center"
                sizes="(max-w-1024px) 100vw, 50vw"
              />
            </div>
            
          </div>
        </div>
      </section>

      {/* 4.5 COMPASSIONATE CARE SECTION */}
      <section className="py-24 bg-white dark:bg-zinc-950 smooth-transition border-b border-zinc-100 dark:border-zinc-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Image with Floating Experience Badge */}
            <div className="lg:col-span-6 relative flex justify-center z-10">
              <div className="relative w-full max-w-md lg:max-w-none">
                {/* Soft green background backing */}
                <div className="absolute inset-0 bg-[#F0FDF4] dark:bg-[#0B2B28]/20 rounded-[36px] -rotate-3 transform z-0" />
                
                {/* Main image */}
                <div className="relative aspect-[4/3] rounded-[36px] overflow-hidden shadow-xl border-4 border-white dark:border-zinc-800 z-10">
                  <Image
                    src="/images/caring-doctors.jpg"
                    alt="Compassionate doctors caring for patient at Niral Ortho Care"
                    fill
                    className="object-cover object-center"
                    sizes="(max-w-1024px) 100vw, 40vw"
                  />
                </div>

                {/* Floating experience circle */}
                <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-primary text-white flex flex-col items-center justify-center text-center shadow-lg border-4 border-white dark:border-zinc-900 z-20 animate-pulse">
                  <span className="text-2xl font-black leading-none">10+</span>
                  <span className="text-[10px] font-bold tracking-tight uppercase mt-0.5 leading-tight">
                    {language === "en" ? "Years of" : "ஆண்டுகள்"} <br />
                    {language === "en" ? "Experience" : "அனுபவம்"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative details & Bullet Points */}
            <div className="lg:col-span-6 space-y-8 text-left">
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1E36] dark:text-foreground tracking-tight">
                  {language === "en" ? "Compassionate Care for You and Your Loved Ones" : "உங்களுக்கும் உங்கள் அன்புக்குரியவர்களுக்கும் கனிவான கவனிப்பு"}
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base leading-relaxed font-semibold">
                  {language === "en" ? (
                    "Our team of dedicated professionals is here to support your health journey with expert care and kindness."
                  ) : (
                    "எங்கள் அர்ப்பணிப்புள்ள நிபுணர்கள் குழு உங்களின் ஆரோக்கியப் பயணத்திற்கு நிபுணர் கவனிப்பு மற்றும் அன்பான ஆதரவை வழங்க இங்கே உள்ளது."
                  )}
                </p>
              </div>

              {/* Bullet List */}
              <div className="space-y-6">
                {[
                  {
                    enTitle: "Emergency Help",
                    taTitle: "அவசர உதவி",
                    enDesc: "Fast, 24/7 emergency response with expert medical teams ready to assist you in critical situations.",
                    taDesc: "அவசர சூழ்நிலைகளில் உங்களுக்கு உதவ தயாராக இருக்கும் நிபுணர் மருத்துவக் குழுக்களுடன் விரைவான, 24/7 அவசர உதவி.",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )
                  },
                  {
                    enTitle: "Enriched Pharmacy",
                    taTitle: "சிறந்த மருந்தகம்",
                    enDesc: "Well-stocked in-house pharmacy offering quality medications and expert guidance for your prescriptions.",
                    taDesc: "தரமான மருந்துகள் மற்றும் உங்கள் மருந்துச்சீட்டுகளுக்கான நிபுணர் வழிகாட்டுதலை வழங்கும் சிறந்த உள்நோயாளிகள் மருந்தகம்.",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    )
                  },
                  {
                    enTitle: "Patient-Centered Care",
                    taTitle: "நோயாளி மைய கவனிப்பு",
                    enDesc: "Tailored treatments focused on comfort, recovery, and well-being.",
                    taDesc: "வசதி, மீட்பு மற்றும் நல்வாழ்வில் கவனம் செலுத்தும் தனிப்பயனாக்கப்பட்ட சிகிச்சைகள்.",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    )
                  }
                ].map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    {/* Dark blue icon background block */}
                    <div className="w-12 h-12 rounded-2xl bg-[#0F1E36] dark:bg-zinc-800 text-white flex items-center justify-center shrink-0 shadow-md">
                      {bullet.icon}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base sm:text-lg font-bold text-[#0F1E36] dark:text-foreground leading-tight">
                        {language === "en" ? bullet.enTitle : bullet.taTitle}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-semibold">
                        {language === "en" ? bullet.enDesc : bullet.taDesc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. TREATMENTS TEASER SECTION */}
      <section className="py-20 bg-white dark:bg-background smooth-transition">
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

      {/* 6. HOW IT WORKS / GUIDE SECTION */}
      <section className="py-24 bg-gradient-to-b from-[#F0FDF4] to-[#FFFFFF] dark:from-[#0B2B28]/10 dark:to-background smooth-transition border-t border-zinc-100 dark:border-zinc-900/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          
          {/* Section Title Badge */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="flex -space-x-1">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <div className="w-3 h-3 rounded-full bg-[#0F1E36] dark:bg-zinc-600 opacity-80" />
            </div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary ml-1">
              {language === "en" ? "How It Works" : "செயல்முறை விளக்கம்"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1E36] dark:text-foreground tracking-tight mb-20">
            {language === "en" ? "A Simple Guide to Niral Ortho Care" : "நிரல் எலும்பியல் மையத்திற்கான எளிய வழிகாட்டி"}
          </h2>

          {/* Wavy lines connecting steps (positioned behind circles on desktop) */}
          <div className="absolute inset-0 z-0 pointer-events-none hidden lg:block">
            {/* Wave 1 */}
            <div className="absolute top-[35%] left-[20%] w-[16%] text-primary/15">
              <svg viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6,6">
                <path d="M0,10 C30,30 70,-10 100,20" />
                <path d="M92,20 L100,20 L98,12" strokeWidth="2.5" />
              </svg>
            </div>
            {/* Wave 2 */}
            <div className="absolute top-[30%] left-[45%] w-[16%] text-primary/15">
              <svg viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6,6">
                <path d="M0,20 C30,-10 70,30 100,10" />
                <path d="M92,12 L100,10 L94,5" strokeWidth="2.5" />
              </svg>
            </div>
            {/* Wave 3 */}
            <div className="absolute top-[35%] left-[70%] w-[16%] text-primary/15">
              <svg viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6,6">
                <path d="M0,10 C30,30 70,-10 100,20" />
                <path d="M92,20 L100,20 L98,12" strokeWidth="2.5" />
              </svg>
            </div>
          </div>

          {/* Steps columns with staggered vertical offset */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {[
              {
                number: "1",
                enTitle: "Enter your Details",
                taTitle: "விவரங்களை உள்ளிடவும்",
                enDesc: "Provide your personal information and contact details.",
                taDesc: "உங்கள் தனிப்பட்ட தகவல் மற்றும் தொடர்பு விவரங்களை வழங்கவும்.",
                offset: "lg:-translate-y-4",
                icon: (
                  <svg className="w-12 h-12 text-[#0F1E36] dark:text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                  </svg>
                )
              },
              {
                number: "2",
                enTitle: "Select Your Service",
                taTitle: "சேவையைத் தேர்ந்தெடுக்கவும்",
                enDesc: "Choose the type of consultation you need based on your concerns.",
                taDesc: "உங்கள் தேவைகளின் அடிப்படையில் உங்களுக்குத் தேவையான ஆலோசனையைத் தேர்ந்தெடுக்கவும்.",
                offset: "lg:translate-y-4",
                icon: (
                  <svg className="w-12 h-12 text-[#0F1E36] dark:text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192A48.5 48.5 0 0013.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75" />
                  </svg>
                )
              },
              {
                number: "3",
                enTitle: "Choose Date & Time",
                taTitle: "தேதி & நேரத்தைத் தேர்வு செய்க",
                enDesc: "View available slots and book a time that works best for you.",
                taDesc: "கிடைக்கும் இடங்களைப் பார்த்து உங்கள் நேரத்திற்கு ஏற்றவாறு முன்பதிவு செய்யவும்.",
                offset: "lg:-translate-y-4",
                icon: (
                  <svg className="w-12 h-12 text-[#0F1E36] dark:text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75" />
                  </svg>
                )
              },
              {
                number: "4",
                enTitle: "Confirm & Attend",
                taTitle: "உறுதி செய்து வரவும்",
                enDesc: "Complete the booking & join your appointment with instant confirmation.",
                taDesc: "முன்பதிவை பூர்த்தி செய்து உடனடி உறுதிப்படுத்தலுடன் உங்கள் ஆலோசனையில் இணையுங்கள்.",
                offset: "lg:translate-y-4",
                icon: (
                  <svg className="w-12 h-12 text-[#0F1E36] dark:text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              }
            ].map((step, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col items-center space-y-4 transition-transform duration-300 ${step.offset}`}
              >
                {/* Circular Icon Container */}
                <div className="w-32 h-32 rounded-full border-4 border-[#0F1E36] dark:border-zinc-800 bg-white dark:bg-card-bg flex items-center justify-center relative shadow-md">
                  {/* Step Number Circle */}
                  <div className="absolute -top-1 -left-1 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md">
                    {step.number}
                  </div>
                  {step.icon}
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-[#0F1E36] dark:text-foreground">
                    {language === "en" ? step.enTitle : step.taTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-[280px] mx-auto leading-relaxed font-semibold">
                    {language === "en" ? step.enDesc : step.taDesc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION */}
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

          {/* Testimonial Cards */}
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

      {/* 8. FAQ TEASER SECTION */}
      <section className="py-20 bg-bg-secondary dark:bg-bg-secondary/40 border-y border-border-color smooth-transition">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-primary dark:text-primary-accent">
              Support Center
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-text-secondary">
              Quick answers about appointments, timings, and the conditions we treat.
            </p>
          </div>

          <div className="space-y-4">
            {homeFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-border-color rounded-xl overflow-hidden bg-white dark:bg-card-bg/20 smooth-transition"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-foreground hover:bg-primary-light/20 dark:hover:bg-primary-light/5 smooth-transition gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-primary dark:text-primary-accent shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-primary shrink-0" /> : <ChevronDown className="w-5 h-5 text-text-secondary shrink-0" />}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-text-secondary leading-relaxed border-t border-border-color/30 pt-4 bg-bg-secondary/50 dark:bg-card-bg">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border-color hover:bg-white dark:hover:bg-card-bg text-sm font-bold rounded-lg transition-all"
            >
              <span>View All FAQs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. CALL-TO-ACTION AREA */}
      <section className="py-20 bg-primary dark:bg-[#0B2B28] smooth-transition">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Ready to Restore Your Mobility?
          </h2>
          <p className="text-base text-white/90 max-w-xl mx-auto font-medium">
            Schedule a dedicated, personal consultation with Dr. V.D.N. Madhivanan to assess your orthopedic concerns.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/appointment"
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-primary hover:bg-zinc-100 hover:text-primary-dark font-bold rounded-full transition-all text-center shadow-lg hover:shadow-xl"
            >
              Book Consultation
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3.5 border border-white/30 hover:border-white text-white font-bold rounded-full transition-all text-center hover:bg-white/10"
            >
              Get Location Details
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
