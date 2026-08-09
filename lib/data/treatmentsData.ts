export interface TreatmentDetail {
  introduction: string;
  symptoms: string[];
  treatmentInfo: string[];
  whenToConsult: string;
  faqs: { question: string; answer: string }[];
}

export interface Treatment {
  slug: string;
  title: string;
  iconName: string;
  description: string;
  verificationRequired: boolean;
  details: TreatmentDetail;
}

export interface LocalizedTreatments {
  en: Treatment[];
  ta: Treatment[];
}

export const treatmentsData: LocalizedTreatments = {
  en: [
    {
      slug: "knee-care",
      title: "Knee Care",
      iconName: "Activity",
      description: "Comprehensive care for acute and chronic knee pain, ligament injuries, and joint wear.",
      verificationRequired: true,
      details: {
        introduction: "[Knee Care Introduction - Pending client verification] Detailed medical guidelines regarding patellar health, osteoarthritis of the knee, and ligament repairs will be populated here.",
        symptoms: [
          "[Symptom 1 - Pending verification]",
          "[Symptom 2 - Pending verification]",
          "[Symptom 3 - Pending verification]"
        ],
        treatmentInfo: [
          "[Treatment Option 1 - Pending verification]",
          "[Treatment Option 2 - Pending verification]"
        ],
        whenToConsult: "[When to Consult Criteria - Pending verification]",
        faqs: [
          {
            question: "When should I consider knee replacement surgery?",
            answer: "[FAQ Answer - Pending doctor validation]"
          }
        ]
      }
    },
    {
      slug: "joint-care",
      title: "Joint Care",
      iconName: "Sparkles",
      description: "Expert diagnostic evaluation and therapeutic options for major joints including hip, elbow, and ankle.",
      verificationRequired: true,
      details: {
        introduction: "[Joint Care Introduction - Pending client verification] Details regarding degenerative joint disease and joint preservation therapies.",
        symptoms: [
          "[Joint stiffness - Pending verification]",
          "[Swelling and tenderness - Pending verification]"
        ],
        treatmentInfo: [
          "[Non-surgical joint management - Pending verification]",
          "[Minimally invasive joint surgery - Pending verification]"
        ],
        whenToConsult: "[When to Consult Criteria - Pending verification]",
        faqs: [
          {
            question: "What is joint preservation?",
            answer: "[FAQ Answer - Pending doctor validation]"
          }
        ]
      }
    },
    {
      slug: "fracture-care",
      title: "Fracture Care",
      iconName: "ShieldAlert",
      description: "Advanced trauma care, alignment, and healing management for simple, compound, and complex fractures.",
      verificationRequired: true,
      details: {
        introduction: "[Fracture Care Introduction - Pending client verification] Details of fracture immobilization, casting, and surgical fixation.",
        symptoms: [
          "[Severe pain and inability to bear weight - Pending verification]",
          "[Deformity or swelling over the bone - Pending verification]"
        ],
        treatmentInfo: [
          "[Cast immobilization and splinting - Pending verification]",
          "[Surgical internal fixation (ORIF) - Pending verification]"
        ],
        whenToConsult: "[When to Consult Criteria - Pending verification]",
        faqs: [
          {
            question: "How long does a typical bone fracture take to heal?",
            answer: "[FAQ Answer - Pending doctor validation]"
          }
        ]
      }
    },
    {
      slug: "sports-injuries",
      title: "Sports Injuries",
      iconName: "Flame",
      description: "Targeted recovery and arthroscopic treatments for ligament tears, muscle sprains, and sports-related trauma.",
      verificationRequired: true,
      details: {
        introduction: "[Sports Injuries Introduction - Pending client verification] Information regarding ACL/MCL tears, meniscus injuries, and shoulder instability.",
        symptoms: [
          "[Sudden popping sound or sensation - Pending verification]",
          "[Instability or joint giving way - Pending verification]"
        ],
        treatmentInfo: [
          "[Arthroscopic ligament reconstruction - Pending verification]",
          "[Targeted physical therapy regimens - Pending verification]"
        ],
        whenToConsult: "[When to Consult Criteria - Pending verification]",
        faqs: [
          {
            question: "How soon can I return to sports after an ACL reconstruction?",
            answer: "[FAQ Answer - Pending doctor validation]"
          }
        ]
      }
    },
    {
      slug: "arthritis-care",
      title: "Arthritis Care",
      iconName: "HeartPulse",
      description: "Specialized pain relief and long-term management strategies for Rheumatoid, Osteo, and Gouty arthritis.",
      verificationRequired: true,
      details: {
        introduction: "[Arthritis Care Introduction - Pending client verification] Details on medical management, lifestyle modifications, and biological therapies.",
        symptoms: [
          "[Chronic joint pain worsens after inactivity - Pending verification]",
          "[Reduced range of motion in affected joints - Pending verification]"
        ],
        treatmentInfo: [
          "[Pharmacological pain management - Pending verification]",
          "[Intra-articular injections - Pending verification]"
        ],
        whenToConsult: "[When to Consult Criteria - Pending verification]",
        faqs: [
          {
            question: "Is arthritis curable or only manageable?",
            answer: "[FAQ Answer - Pending doctor validation]"
          }
        ]
      }
    },
    {
      slug: "spine-care",
      title: "Spine & Back Care",
      iconName: "GitMerge",
      description: "Non-surgical and surgical evaluations for chronic back pain, slip disc, and sciatica issues.",
      verificationRequired: true,
      details: {
        introduction: "[Spine Care Introduction - Pending client verification] Guidance on lumbar and cervical spine problems, disc herniations, and spinal stenosis.",
        symptoms: [
          "[Radiating pain down the leg (sciatica) - Pending verification]",
          "[Numbness or tingling in the lower limbs - Pending verification]"
        ],
        treatmentInfo: [
          "[Postural retraining and core strengthening - Pending verification]",
          "[Epidural steroid injections - Pending verification]"
        ],
        whenToConsult: "[When to Consult Criteria - Pending verification]",
        faqs: [
          {
            question: "When is surgery necessary for a herniated disc?",
            answer: "[FAQ Answer - Pending doctor validation]"
          }
        ]
      }
    },
    {
      slug: "shoulder-care",
      title: "Shoulder Care",
      iconName: "Shuffle",
      description: "Therapeutic solutions for frozen shoulder, rotator cuff injuries, and shoulder dislocations.",
      verificationRequired: true,
      details: {
        introduction: "[Shoulder Care Introduction - Pending client verification] Outline of therapies for subacromial impingement, rotator cuff tears, and adhesive capsulitis.",
        symptoms: [
          "[Inability to raise the arm above head height - Pending verification]",
          "[Dull ache deep inside the shoulder joint - Pending verification]"
        ],
        treatmentInfo: [
          "[Shoulder manipulation and physiotherapy - Pending verification]",
          "[Arthroscopic rotator cuff repair - Pending verification]"
        ],
        whenToConsult: "[When to Consult Criteria - Pending verification]",
        faqs: [
          {
            question: "What is frozen shoulder and how long does it last?",
            answer: "[FAQ Answer - Pending doctor validation]"
          }
        ]
      }
    },
    {
      slug: "rehabilitation",
      title: "Rehabilitation",
      iconName: "TrendingUp",
      description: "Post-surgical physical therapy and recovery programs designed to restore muscle strength and joint range.",
      verificationRequired: true,
      details: {
        introduction: "[Rehabilitation Introduction - Pending client verification] Structured programs for post-fracture stiffness and post-replacement gait training.",
        symptoms: [
          "[Reduced muscle strength after immobilization - Pending verification]",
          "[Persistent joint stiffness post-surgery - Pending verification]"
        ],
        treatmentInfo: [
          "[Gait training and balance exercises - Pending verification]",
          "[Manual therapy and joint mobilization - Pending verification]"
        ],
        whenToConsult: "[When to Consult Criteria - Pending verification]",
        faqs: [
          {
            question: "Why is physiotherapy crucial after joint surgery?",
            answer: "[FAQ Answer - Pending doctor validation]"
          }
        ]
      }
    }
  ],
  ta: [
    {
      slug: "knee-care",
      title: "முழங்கால் கவனிப்பு (Knee Care)",
      iconName: "Activity",
      description: "முழங்கால் வலி, தசைநார் காயங்கள் மற்றும் மூட்டு தேய்மானம் ஆகியவற்றிற்கான விரிவான சிகிச்சை.",
      verificationRequired: true,
      details: {
        introduction: "[முழங்கால் கவனிப்பு - கிளையன்ட் சரிபார்ப்பு நிலுவையில் உள்ளது]",
        symptoms: ["[அறிகுறி 1 - சரிபார்ப்பு நிலுவையில் உள்ளது]"],
        treatmentInfo: ["[சிகிச்சை முறை 1 - சரிபார்ப்பு நிலுவையில் உள்ளது]"],
        whenToConsult: "[மருத்துவரை எப்போது அணுக வேண்டும் - சரிபார்ப்பு நிலுவையில் உள்ளது]",
        faqs: [
          {
            question: "முழங்கால் மாற்று அறுவை சிகிச்சையை எப்போது பரிசீலிக்க வேண்டும்?",
            answer: "[பதில் - சரிபார்ப்பு நிலுவையில் உள்ளது]"
          }
        ]
      }
    },
    {
      slug: "joint-care",
      title: "மூட்டு கவனிப்பு (Joint Care)",
      iconName: "Sparkles",
      description: "இடுப்பு, முழங்கை மற்றும் கணுக்கால் உள்ளிட்ட முக்கிய மூட்டுகளுக்கான நிபுணத்துவ சிகிச்சை.",
      verificationRequired: true,
      details: {
        introduction: "[மூட்டு கவனிப்பு - கிளையன்ட் சரிபார்ப்பு நிலுவையில் உள்ளது]",
        symptoms: ["[அறிகுறி 1]"],
        treatmentInfo: ["[சிகிச்சை 1]"],
        whenToConsult: "[விபரம் நிலுவையில் உள்ளது]",
        faqs: []
      }
    },
    {
      slug: "fracture-care",
      title: "எலும்பு முறிவு சிகிச்சை (Fracture Care)",
      iconName: "ShieldAlert",
      description: "எளிமையான மற்றும் சிக்கலான எலும்பு முறிவுகளுக்கான மேம்பட்ட சிகிச்சை.",
      verificationRequired: true,
      details: {
        introduction: "[எலும்பு முறிவு சிகிச்சை - கிளையன்ட் சரிபார்ப்பு நிலுவையில் உள்ளது]",
        symptoms: ["[அறிகுறி 1]"],
        treatmentInfo: ["[சிகிச்சை 1]"],
        whenToConsult: "[விபரம் நிலுவையில் உள்ளது]",
        faqs: []
      }
    },
    {
      slug: "sports-injuries",
      title: "விளையாட்டு காயங்கள் (Sports Injuries)",
      iconName: "Flame",
      description: "விளையாட்டுகளின் போது ஏற்படும் தசைநார் கிழிவுகள் மற்றும் தசை பிடிப்புகளுக்கான மீட்பு சிகிச்சைகள்.",
      verificationRequired: true,
      details: {
        introduction: "[விளையாட்டு காயங்கள் - கிளையன்ட் சரிபார்ப்பு நிலுவையில் உள்ளது]",
        symptoms: ["[அறிகுறி 1]"],
        treatmentInfo: ["[சிகிச்சை 1]"],
        whenToConsult: "[விபரம் நிலுவையில் உள்ளது]",
        faqs: []
      }
    },
    {
      slug: "arthritis-care",
      title: "வாத நோய் கவனிப்பு (Arthritis Care)",
      iconName: "HeartPulse",
      description: "ருமட்டாய்டு மற்றும் மூட்டு வாத நோய்களுக்கான நீண்டகால மேலாண்மை உத்திகள்.",
      verificationRequired: true,
      details: {
        introduction: "[வாத நோய் கவனிப்பு - கிளையன்ட் சரிபார்ப்பு நிலுவையில் உள்ளது]",
        symptoms: ["[அறிகுறி 1]"],
        treatmentInfo: ["[சிகிச்சை 1]"],
        whenToConsult: "[விபரம் நிலுவையில் உள்ளது]",
        faqs: []
      }
    },
    {
      slug: "spine-care",
      title: "தண்டுவடம் மற்றும் முதுகு கவனிப்பு (Spine Care)",
      iconName: "GitMerge",
      description: "முதுகு வலி, தண்டுவடம் நழுவுதல் மற்றும் சியாட்டிகா பிரச்சனைகளுக்கான சிகிச்சைகள்.",
      verificationRequired: true,
      details: {
        introduction: "[தண்டுவடம் கவனிப்பு - கிளையன்ட் சரிபார்ப்பு நிலுவையில் உள்ளது]",
        symptoms: ["[அறிகுறி 1]"],
        treatmentInfo: ["[சிகிச்சை 1]"],
        whenToConsult: "[விபரம் நிலுவையில் உள்ளது]",
        faqs: []
      }
    },
    {
      slug: "shoulder-care",
      title: "தோள்பட்டை கவனிப்பு (Shoulder Care)",
      iconName: "Shuffle",
      description: "உறைந்த தோள்பட்டை மற்றும் தோள்பட்டை பிறழ்வுகளுக்கான தீர்வுகள்.",
      verificationRequired: true,
      details: {
        introduction: "[தோள்பட்டை கவனிப்பு - கிளையன்ட் சரிபார்ப்பு நிலுவையில் உள்ளது]",
        symptoms: ["[அறிகுறி 1]"],
        treatmentInfo: ["[சிகிச்சை 1]"],
        whenToConsult: "[விபரம் நிலுவையில் உள்ளது]",
        faqs: []
      }
    },
    {
      slug: "rehabilitation",
      title: "மறுவாழ்வு சிகிச்சை (Rehabilitation)",
      iconName: "TrendingUp",
      description: "அறுவை சிகிச்சைக்குப் பின் தசை வலிமை மற்றும் மூட்டு இயக்கத்தை மீட்டெடுப்பதற்கான உடற்பயிற்சிகள்.",
      verificationRequired: true,
      details: {
        introduction: "[மறுவாழ்வு சிகிச்சை - கிளையன்ட் சரிபார்ப்பு நிலுவையில் உள்ளது]",
        symptoms: ["[அறிகுறி 1]"],
        treatmentInfo: ["[சிகிச்சை 1]"],
        whenToConsult: "[விபரம் நிலுவையில் உள்ளது]",
        faqs: []
      }
    }
  ]
};
