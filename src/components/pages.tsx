import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header } from "@/components/site";
import { Tracker } from "@/components/tracker";
import { getCategories } from "@/data/checklist";
import { DICT, LEGAL_PATH, localePath, type Lang } from "@/lib/i18n";

const ogImage = (lang: Lang) => localePath(lang, "/opengraph-image");

// ─── Accueil ────────────────────────────────────────────────────────────────────────────────
export function HomePage({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  return (
    <>
      <Header lang={lang} />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-4 pb-16 pt-12 text-center sm:px-6 sm:pt-20">
          <p className="inline-block rounded-full border border-edge bg-panel px-3 py-1 text-xs text-dim">{t.badge}</p>
          <h1 className="mt-6 font-display text-3xl leading-tight sm:text-5xl">
            {t.heroBefore} <span className="glow-text">{t.hundred}</span> {t.heroAfter}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-dim">{t.heroText}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={localePath(lang, "/suivi/histoire")} className="btn-primary px-6 py-3 text-base">{t.cta}</Link>
          </div>
          <p className="mt-4 text-sm text-dim">{t.heroNote}</p>
        </section>

        <section className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-3 sm:px-6">
          {t.features.map((f) => (
            <div key={f.title} className="panel p-6">
              <p className="text-3xl">{f.icon}</p>
              <h2 className="mt-3 font-semibold">{f.title}</h2>
              <p className="mt-2 text-sm text-dim">{f.text}</p>
            </div>
          ))}
        </section>

        <section className="mx-auto mt-16 max-w-3xl px-4 sm:px-6">
          <h2 className="text-center font-display text-xl sm:text-2xl">{t.faqTitle}</h2>
          <div className="mt-6 space-y-3">
            {t.faq.map((f) => (
              <details key={f.q} className="panel p-5">
                <summary className="cursor-pointer font-semibold">{f.q}</summary>
                <p className="mt-3 text-sm text-dim">{f.a}</p>
              </details>
            ))}
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                inLanguage: lang,
                mainEntity: t.faq.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }),
            }}
          />
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}

// ─── Page d'une catégorie ───────────────────────────────────────────────────────────────────
export function categoryMetadata(lang: Lang, id: string): Metadata {
  const c = getCategories(lang).find((x) => x.id === id);
  if (!c) return {};
  const path = `/suivi/${c.id}`;
  return {
    title: { absolute: c.seoTitle },
    description: c.seoDescription,
    alternates: {
      canonical: localePath(lang, path),
      languages: { fr: path, en: localePath("en", path), "x-default": path },
    },
    openGraph: { title: c.seoTitle, description: c.seoDescription, url: localePath(lang, path), images: [ogImage(lang)] },
    twitter: { card: "summary_large_image", images: [ogImage(lang)] },
  };
}

export function CategoryPage({ lang, id }: { lang: Lang; id: string }) {
  const c = getCategories(lang).find((x) => x.id === id);
  if (!c) notFound();
  return (
    <>
      <Header lang={lang} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6">
        <h1 className="font-display text-xl sm:text-2xl">{c.seoTitle.replace(/ ?\(.*\)$/, "").replace(/ ?:.*$/, "")}</h1>
        <p className="mb-6 mt-2 max-w-2xl text-sm text-dim">{c.seoDescription}</p>
        <Tracker lang={lang} active={c.id} />
      </main>
      <Footer lang={lang} />
    </>
  );
}

// ─── Mentions légales ───────────────────────────────────────────────────────────────────────
const LEGAL = {
  fr: {
    title: "Mentions légales",
    sections: [
      {
        h: "Éditeur",
        p: ["Paul Lesage, entrepreneur individuel (micro-entreprise)", "28 rue Salvador Allende, 92000 Nanterre", "SIRET : [en cours d'attribution]", "Contact : [À COMPLÉTER]"],
      },
      { h: "Hébergeur", p: ["Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis"] },
      {
        h: "Données personnelles et cookies",
        p: [
          "Le site ne demande aucun compte et ne collecte aucune donnée personnelle. Votre progression est enregistrée uniquement dans votre navigateur (stockage local) et n'est jamais envoyée sur nos serveurs. La fréquentation est mesurée avec Vercel Web Analytics, sans cookie et de façon anonyme (aucune donnée ne permet de vous identifier). Aucun cookie publicitaire n'est utilisé.",
        ],
      },
      {
        h: "Marques",
        p: [
          "Site de fans non officiel, sans lien avec Rockstar Games ou Take-Two Interactive. Grand Theft Auto et GTA sont des marques de Take-Two Interactive Software, Inc., citées uniquement pour indiquer le jeu concerné. Aucun contenu officiel (logo, image, texte) n'est reproduit.",
        ],
      },
    ],
  },
  en: {
    title: "Legal notice",
    sections: [
      {
        h: "Publisher",
        p: ["Paul Lesage, sole trader (micro-entreprise, France)", "28 rue Salvador Allende, 92000 Nanterre, France", "SIRET: [pending]", "Contact: [TO BE COMPLETED]"],
      },
      { h: "Host", p: ["Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA"] },
      {
        h: "Personal data and cookies",
        p: [
          "The site requires no account and collects no personal data. Your progress is stored only in your browser (local storage) and is never sent to our servers. Traffic is measured with Vercel Web Analytics, without cookies and anonymously (no data can identify you). No advertising cookies are used.",
        ],
      },
      {
        h: "Trademarks",
        p: [
          "Unofficial fan site, not affiliated with Rockstar Games or Take-Two Interactive. Grand Theft Auto and GTA are trademarks of Take-Two Interactive Software, Inc., mentioned only to identify the game. No official content (logo, image, text) is reproduced.",
        ],
      },
    ],
  },
} as const;

export function legalMetadata(lang: Lang): Metadata {
  return {
    title: LEGAL[lang].title,
    alternates: { canonical: LEGAL_PATH[lang], languages: { fr: LEGAL_PATH.fr, en: LEGAL_PATH.en } },
  };
}

export function LegalPage({ lang }: { lang: Lang }) {
  const l = LEGAL[lang];
  return (
    <>
      <Header lang={lang} />
      <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 sm:px-6">
        <h1 className="font-display text-2xl">{l.title}</h1>
        {l.sections.map((s) => (
          <section key={s.h}>
            <h2 className="font-semibold">{s.h}</h2>
            <p className="mt-2 text-dim">
              {s.p.map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
          </section>
        ))}
      </main>
      <Footer lang={lang} />
    </>
  );
}
