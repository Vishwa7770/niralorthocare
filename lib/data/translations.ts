export interface TranslationSchema {
  nav: {
    home: string;
    about: string;
    treatments: string;
    faq: string;
    contact: string;
    book: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trust1: string;
    trust2: string;
    trust3: string;
  };
  doctor: {
    sectionTitle: string;
    title: string;
    doctorName: string;
    degree: string;
    role: string;
    bio: string;
    qualificationsTitle: string;
    expertiseTitle: string;
    learnMore: string;
  };
  whyChoose: {
    title: string;
    subtitle: string;
    point1Title: string;
    point1Desc: string;
    point2Title: string;
    point2Desc: string;
    point3Title: string;
    point3Desc: string;
    point4Title: string;
    point4Desc: string;
  };
  appointment: {
    title: string;
    subtitle: string;
    name: string;
    phone: string;
    email: string;
    date: string;
    time: string;
    reason: string;
    reasonPlaceholder: string;
    cta: string;
    loading: string;
    success: string;
    successDesc: string;
    error: string;
    errorDesc: string;
  };
  faq: {
    title: string;
    subtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    phone: string;
    email: string;
    address: string;
    hours: string;
    callNow: string;
    whatsapp: string;
    directions: string;
  };
  footer: {
    desc: string;
    quickLinks: string;
    treatments: string;
    contactInfo: string;
    rights: string;
  };
  placeholders: {
    address: string;
    phone: string;
    email: string;
    timings: string;
    experience: string;
    testimonials: string;
  };
}

export const translations: Record<'en' | 'ta', TranslationSchema> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      treatments: "Treatments",
      faq: "FAQ",
      contact: "Contact",
      book: "Book Appointment"
    },
    hero: {
      badge: "Premium Orthopedic Center",
      title: "Expert Orthopedic Care, Designed Around You.",
      subtitle: "Experience clinical excellence and a compassionate, patient-first approach to joint, bone, and muscular health.",
      ctaPrimary: "Book an Appointment",
      ctaSecondary: "Contact Us",
      trust1: "Expert Orthopedic Care",
      trust2: "Personalized Patient Approach",
      trust3: "Modern Care Environment"
    },
    doctor: {
      sectionTitle: "Meet Our Chief Surgeon",
      title: "About the Doctor",
      doctorName: "Dr. V.D.N. Madhivanan",
      degree: "M.B.B.S., M.S. (Ortho)",
      role: "Orthopedic Surgeon",
      bio: "Dr. V.D.N. Madhivanan is a highly trained orthopedic surgeon dedicated to restoring mobility and enhancing the quality of life for his patients. Providing specialized care tailored to individual conditions.",
      qualificationsTitle: "Qualifications",
      expertiseTitle: "Areas of Expertise",
      learnMore: "Learn More About the Doctor"
    },
    whyChoose: {
      title: "Why Choose Niral Ortho Care",
      subtitle: "We combine orthopedic clinical expertise with comfortable, compassionate patient care.",
      point1Title: "Patient-Centered Care",
      point1Desc: "Every treatment path is fully tailored to the patient's individual lifestyle, needs, and recovery goals.",
      point2Title: "Personalized Consultation",
      point2Desc: "We take the time to explain diagnoses, outline recovery paths, and address all patient concerns directly.",
      point3Title: "Orthopedic Expertise",
      point3Desc: "Advanced diagnostics and surgical knowledge in handling complex joint reconstruction, fractures, and sports injuries.",
      point4Title: "Comfortable Environment",
      point4Desc: "A warm, modern, and professional atmosphere designed to put patients at ease during consultations and treatments."
    },
    appointment: {
      title: "Schedule a Consultation",
      subtitle: "Request an appointment. Our team will contact you to verify details and confirm timings.",
      name: "Full Name",
      phone: "Phone Number",
      email: "Email Address",
      date: "Preferred Date",
      time: "Preferred Time Slot",
      reason: "Reason for Visit",
      reasonPlaceholder: "Describe your symptoms or condition briefly...",
      cta: "Request an Appointment",
      loading: "Submitting Request...",
      success: "Request Submitted Successfully",
      successDesc: "Thank you! We have received your request. Our staff will call you shortly to confirm the exact timings.",
      error: "Submission Error",
      errorDesc: "Something went wrong while processing your request. Please try calling the hospital directly."
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Common answers to help you prepare for your visit at Niral Ortho Care."
    },
    contact: {
      title: "Contact & Location",
      subtitle: "Find us, call us, or send a message directly to our clinic staff.",
      phone: "Phone",
      email: "Email",
      address: "Clinic Address",
      hours: "Consultation Hours",
      callNow: "Call Now",
      whatsapp: "WhatsApp",
      directions: "Get Directions"
    },
    footer: {
      desc: "Providing premium, trustworthy orthopedic care focused on patient recovery, mobility, and lifelong health.",
      quickLinks: "Quick Links",
      treatments: "Treatments",
      contactInfo: "Contact Details",
      rights: "All Rights Reserved."
    },
    placeholders: {
      address: "[Hospital Address - Content Pending Client Verification]",
      phone: "[Phone Number - Content Pending Client Verification]",
      email: "[Email Address - Content Pending Client Verification]",
      timings: "[Consultation Timings - Content Pending Client Verification]",
      experience: "[Doctor Experience - Content Pending Client Verification]",
      testimonials: "[Verified patient testimonial - Content Pending Client Verification]"
    }
  },
  ta: {
    nav: {
      home: "முகப்பு",
      about: "எங்களைப் பற்றி",
      treatments: "சிகிச்சைகள்",
      faq: "கேள்வி-பதில்",
      contact: "தொடர்புக்கு",
      book: "முன்பதிவு செய்ய"
    },
    hero: {
      badge: "பிரீமியம் எலும்பியல் மையம்",
      title: "உங்களுக்காக வடிவமைக்கப்பட்ட, நிபுணத்துவ எலும்பியல் சிகிச்சை.",
      subtitle: "மூட்டு, எலும்பு மற்றும் தசை ஆரோக்கியத்திற்கான மேம்பட்ட மருத்துவ சிகிச்சை மற்றும் தனிப்பயனாக்கப்பட்ட கவனிப்பை அனுபவியுங்கள்.",
      ctaPrimary: "முன்பதிவு செய்ய",
      ctaSecondary: "தொடர்பு கொள்ள",
      trust1: "நிபுணத்துவ எலும்பியல் கவனிப்பு",
      trust2: "தனிப்பயனாக்கப்பட்ட அணுகுமுறை",
      trust3: "நவீன சிகிச்சை சூழல்"
    },
    doctor: {
      sectionTitle: "எங்கள் தலைமை அறுவை சிகிச்சை நிபுணர்",
      title: "மருத்துவர் பற்றி",
      doctorName: "Dr. V.D.N. மதிவாணன்",
      degree: "M.B.B.S., M.S. (Ortho)",
      role: "எலும்பியல் அறுவை சிகிச்சை நிபுணர்",
      bio: "டாக்டர் V.D.N. மதிவாணன் அவர்கள் நோயாளிகளின் இயக்கம் மற்றும் வாழ்க்கைத் தரத்தை மேம்படுத்துவதற்காக அர்ப்பணிக்கப்பட்ட ஒரு சிறந்த எலும்பியல் அறுவை சிகிச்சை நிபுணர் ஆவார். ஒவ்வொரு நோயாளியின் தேவைக்கேற்ப சிகிச்சை வழங்குகிறார்.",
      qualificationsTitle: "தகுதிகள்",
      expertiseTitle: "சிறப்புத் துறைகள்",
      learnMore: "மருத்துவர் பற்றி மேலும் அறிய"
    },
    whyChoose: {
      title: "ஏன் நிரல் எலும்பியல் கவனிப்பை தேர்வு செய்ய வேண்டும்?",
      subtitle: "நாங்கள் சிறந்த எலும்பியல் நிபுணத்துவத்தை அன்பான நோயாளி கவனிப்புடன் இணைக்கிறோம்.",
      point1Title: "நோயாளி மைய கவனிப்பு",
      point1Desc: "ஒவ்வொரு சிகிச்சையும் நோயாளியின் தனிப்பட்ட வாழ்க்கை முறை மற்றும் மீட்பு இலக்குகளுக்கு ஏற்ப வடிவமைக்கப்பட்டுள்ளது.",
      point2Title: "தனிப்பயனாக்கப்பட்ட ஆலோசனை",
      point2Desc: "நோயறிதல்கள் மற்றும் சிகிச்சை முறைகளை விரிவாக விளக்கி, சந்தேகங்களை நேரடியாக தீர்த்து வைக்கிறோம்.",
      point3Title: "எலும்பியல் நிபுணத்துவம்",
      point3Desc: "சிக்கலான மூட்டு மாற்று அறுவை சிகிச்சைகள், எலும்பு முறிவுகள் மற்றும் விளையாட்டு காயங்களை கையாள்வதில் மேம்பட்ட நிபுணத்துவம்.",
      point4Title: "வசதியான சூழல்",
      point4Desc: "நோயாளிகள் ஆலோசனைகளின் போது மன அமைதியுடன் இருக்க வடிவமைக்கப்பட்ட ஒரு நவீன மற்றும் நிதானமான சூழல்."
    },
    appointment: {
      title: "ஆலோசனையை திட்டமிடுங்கள்",
      subtitle: "சிகிச்சைக்கு முன்பதிவு செய்ய கோரிக்கை விடுங்கள். எங்கள் குழு உங்களைத் தொடர்புகொண்டு நேரத்தை உறுதி செய்யும்.",
      name: "முழு பெயர்",
      phone: "தொலைபேசி எண்",
      email: "மின்னஞ்சல் முகவரி",
      date: "விருப்பமான தேதி",
      time: "விருப்பமான நேரம்",
      reason: "சிகிச்சைக்கான காரணம்",
      reasonPlaceholder: "உங்கள் பிரச்சனைகள் அல்லது அறிகுறிகளை சுருக்கமாக விவரிக்கவும்...",
      cta: "முன்பதிவு கோரிக்கை அனுப்பவும்",
      loading: "சமர்ப்பிக்கப்படுகிறது...",
      success: "கோரிக்கை வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது",
      successDesc: "நன்றி! உங்கள் கோரிக்கை பெறப்பட்டது. எங்கள் ஊழியர்கள் உங்களை அழைத்து நேரத்தை உறுதி செய்வார்கள்.",
      error: "சமர்ப்பிப்பதில் பிழை",
      errorDesc: "உங்கள் கோரிக்கையை செயலாக்குவதில் ஏதோ தவறு நிகழ்ந்துள்ளது. தயவுசெய்து மருத்துவமனையை நேரடியாக தொடர்பு கொள்ளவும்.",
    },
    faq: {
      title: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
      subtitle: "நிரல் எலும்பியல் மையத்திற்கு உங்கள் வருகை குறித்து பொதுவாக கேட்கப்படும் கேள்விகளுக்கான பதில்கள்."
    },
    contact: {
      title: "தொடர்பு மற்றும் இருப்பிடம்",
      subtitle: "எங்களைக் கண்டறிய, அழைக்க அல்லது எங்கள் மருத்துவமனை ஊழியர்களுக்கு நேரடியாக செய்தி அனுப்பவும்.",
      phone: "தொலைபேசி",
      email: "மின்னஞ்சல்",
      address: "முகவரி",
      hours: "ஆலோசனை நேரம்",
      callNow: "அழைக்க",
      whatsapp: "வாட்ஸ்அப்",
      directions: "வழிகாட்டுதல்"
    },
    footer: {
      desc: "நோயாளிகளின் நலம், எலும்பு வலிமை மற்றும் வாழ்நாள் ஆரோக்கியத்தில் கவனம் செலுத்தும் நம்பகமான எலும்பியல் கவனிப்பு.",
      quickLinks: "விரைவான இணைப்புகள்",
      treatments: "சிகிச்சைகள்",
      contactInfo: "தொடர்பு விபரங்கள்",
      rights: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை."
    },
    placeholders: {
      address: "[மருத்துவமனை முகவரி - கிளையன்ட் சரிபார்ப்பு நிலுவையில் உள்ளது]",
      phone: "[தொலைபேசி எண் - கிளையன்ட் சரிபார்ப்பு நிலுவையில் உள்ளது]",
      email: "[மின்னஞ்சல் முகவரி - கிளையன்ட் சரிபார்ப்பு நிலுவையில் உள்ளது]",
      timings: "[ஆலோசனை நேரங்கள் - கிளையன்ட் சரிபார்ப்பு நிலுவையில் உள்ளது]",
      experience: "[மருத்துவர் அனுபவம் - கிளையன்ட் சரிபார்ப்பு நிலுவையில் உள்ளது]",
      testimonials: "[சரிபார்க்கப்பட்ட நோயாளியின் கருத்து - கிளையன்ட் சரிபார்ப்பு நிலுவையில் உள்ளது]"
    }
  }
};
