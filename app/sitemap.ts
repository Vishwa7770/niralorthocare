import { MetadataRoute } from "next";
import { treatmentsData } from "@/lib/data/treatmentsData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.niralorthocare.com";
  
  // Base static routes
  const staticRoutes = [
    "",
    "/about",
    "/treatments",
    "/faq",
    "/contact",
    "/appointment"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic treatment pages (using English dataset as standard slugs)
  const treatmentSlugs = treatmentsData.en.map((treatment) => treatment.slug);
  const treatmentRoutes = treatmentSlugs.map((slug) => ({
    url: `${baseUrl}/treatments/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...treatmentRoutes];
}
