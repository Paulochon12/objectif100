import type { MetadataRoute } from "next";
import { CATEGORY_IDS } from "@/data/checklist";
import { LEGAL_PATH, localePath } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

/** Chaque page existe en français et en anglais : on déclare les deux versions l'une à l'autre. */
function pair(path: string, legal = false): { fr: string; en: string } {
  return legal
    ? { fr: `${SITE_URL}${LEGAL_PATH.fr}`, en: `${SITE_URL}${LEGAL_PATH.en}` }
    : { fr: `${SITE_URL}${path === "/" ? "" : path}`, en: `${SITE_URL}${localePath("en", path)}` };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; changeFrequency: "daily" | "yearly"; legal?: boolean }[] = [
    { path: "/", priority: 1, changeFrequency: "daily" },
    ...CATEGORY_IDS.map((id) => ({
      path: `/suivi/${id}`,
      priority: id === "perso" ? 0.4 : 0.8,
      changeFrequency: "daily" as const,
    })),
    { path: "/mentions-legales", priority: 0.1, changeFrequency: "yearly", legal: true },
  ];
  return pages.flatMap((p) => {
    const urls = pair(p.path, p.legal);
    const alternates = { languages: { fr: urls.fr, en: urls.en } };
    return [
      { url: urls.fr, changeFrequency: p.changeFrequency, priority: p.priority, alternates },
      { url: urls.en, changeFrequency: p.changeFrequency, priority: p.priority, alternates },
    ];
  });
}
