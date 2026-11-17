import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/data/checklist";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    ...CATEGORIES.map((c) => ({
      url: `${SITE_URL}/suivi/${c.id}`,
      changeFrequency: "daily" as const,
      priority: c.id === "perso" ? 0.4 : 0.8,
    })),
    { url: `${SITE_URL}/mentions-legales`, changeFrequency: "yearly", priority: 0.1 },
  ];
}
