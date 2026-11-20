import type { Metadata } from "next";
import { Geist, Rubik_Mono_One } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { DICT, localePath, type Lang } from "@/lib/i18n";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const display = Rubik_Mono_One({ variable: "--font-display-face", subsets: ["latin"], weight: "400" });

/** Métadonnées communes à toutes les pages d'une langue. */
export function rootMetadata(lang: Lang): Metadata {
  const t = DICT[lang];
  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    alternates: { canonical: localePath(lang, "/"), languages: { fr: "/", en: "/en", "x-default": "/" } },
    openGraph: { type: "website", locale: t.ogLocale, siteName: SITE_NAME },
    twitter: { card: "summary_large_image" },
    title: { default: t.metaTitle, template: "%s · Objectif 100 %" },
    description: t.metaDescription,
  };
}

/** Balises <html> et <body> : chaque langue a sa propre mise en page racine (attribut lang correct). */
export function Root({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={DICT[lang].htmlLang} className={`${geist.variable} ${display.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
