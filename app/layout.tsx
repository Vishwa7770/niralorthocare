import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Tamil } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeContext";
import { LanguageProvider } from "@/components/ui/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoTamil = Noto_Sans_Tamil({
  variable: "--font-noto-tamil",
  subsets: ["tamil", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Niral Ortho Care | Dr. V.D.N. Madhivanan | Orthopedic Surgeon",
  description: "Premium and professional orthopedic healthcare clinic led by Dr. V.D.N. Madhivanan, M.B.B.S., M.S. (Ortho). Specialized in Knee, Joint, Fracture, and Sports Injury care.",
  keywords: "Niral Ortho Care, Orthopedic Surgeon, Dr. V.D.N. Madhivanan, Knee Care, Joint Replacement, Fracture Care, Sports Injury Clinic",
  robots: "index, follow",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${notoTamil.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('niral-theme') || 'light';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground smooth-transition">
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            <div className="flex-1 flex flex-col">
              {children}
            </div>
            <Footer />
            <MobileActionBar />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

