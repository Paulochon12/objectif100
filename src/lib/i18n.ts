/**
 * Deux versions du site : français (adresses sans préfixe, historiques) et anglais (sous /en).
 * La progression enregistrée est commune aux deux langues (mêmes identifiants d'objectifs).
 */
export type Lang = "fr" | "en";
export const LANGS: Lang[] = ["fr", "en"];

/** Chemin d'une page dans une langue : "/suivi/trophees" → "/en/suivi/trophees". */
export function localePath(lang: Lang, path: string) {
  if (lang === "fr") return path;
  return path === "/" ? "/en" : `/en${path}`;
}

/** Les mentions légales ont un nom d'adresse propre à chaque langue. */
export const LEGAL_PATH: Record<Lang, string> = { fr: "/mentions-legales", en: "/en/legal" };

/** Adresse équivalente dans l'autre langue (pour le bouton FR | EN). */
export function switchPath(pathname: string, to: Lang) {
  if (pathname === LEGAL_PATH.fr || pathname === LEGAL_PATH.en) return LEGAL_PATH[to];
  const base = pathname === "/en" ? "/" : pathname.startsWith("/en/") ? pathname.slice(3) : pathname;
  return localePath(to, base);
}

export const DICT = {
  fr: {
    htmlLang: "fr",
    ogLocale: "fr_FR",
    metaTitle: "Objectif 100 % : suivez votre progression dans GTA 6",
    metaDescription:
      "Checklist gratuite pour suivre votre progression à 100 % dans GTA 6 : missions, objets à collectionner, activités et trophées. Sans inscription.",
    myProgress: "Ma progression",
    langLabel: "Langue",
    disclaimer:
      "Site de fans non officiel. Objectif 100 % n'est ni affilié, ni approuvé, ni sponsorisé par Rockstar Games ou Take-Two Interactive. Grand Theft Auto et GTA sont des marques de Take-Two Interactive Software, Inc.",
    legal: "Mentions légales",
    // Accueil
    badge: "Gratuit · Pour PS5 et Xbox Series",
    heroBefore: "Visez le",
    hundred: "100 %",
    heroAfter: "dans GTA 6",
    heroText:
      "La checklist pour suivre votre progression : missions, objets à collectionner, activités et trophées. Ne passez plus à côté de rien.",
    cta: "Commencer ma checklist",
    heroNote: "Sorti le 19 novembre 2026 · listes mises à jour au fil des découvertes",
    features: [
      { icon: "✅", title: "Cochez au fil du jeu", text: "Missions, objets à collectionner, activités, trophées : tout au même endroit, rangé par catégorie." },
      { icon: "📊", title: "Votre % en temps réel", text: "Voyez d'un coup d'œil ce qui reste à faire pour atteindre le 100 %." },
      { icon: "📱", title: "Sans inscription", text: "Votre progression s'enregistre toute seule. Transférez-la sur votre téléphone avec un simple code." },
    ],
    faqTitle: "Questions fréquentes",
    faq: [
      {
        q: "Quand est sorti GTA 6 ?",
        a: "GTA 6 est sorti le jeudi 19 novembre 2026 sur PlayStation 5 et Xbox Series X|S. La version PC n'a pas encore de date.",
      },
      {
        q: "La checklist est-elle gratuite ?",
        a: "Oui, entièrement gratuite et sans inscription. Votre progression est enregistrée dans votre navigateur.",
      },
      {
        q: "Comment retrouver ma progression sur mon téléphone ?",
        a: "Dans « Ma progression », ouvrez « Sauvegarder ou transférer », copiez votre code et collez-le sur votre autre appareil.",
      },
      {
        q: "Pourquoi les noms des missions sont-ils en anglais ?",
        a: "Ce sont les noms affichés dans le jeu, y compris dans sa version française. Les trophées, eux, portent leur nom français.",
      },
      {
        q: "Les listes sont-elles complètes ?",
        a: "Les 55 trophées, les missions de l'histoire et des inconnus, les objets à collectionner et les activités du 100 % sont en ligne. Les listes sont corrigées au fil des découvertes des joueurs.",
      },
    ],
    // Suivi
    overall: "Progression globale",
    goals: "objectifs",
    soon: "bientôt",
    emptyList:
      "La liste complète arrive bientôt, mise à jour au fil des découvertes. En attendant, ajoutez vos propres objectifs ci-dessous : votre progression sera conservée.",
    search: "Rechercher…",
    searchLabel: "Rechercher un objectif",
    filters: { tous: "Tous", "a-faire": "À faire", faits: "Faits" },
    check: "Cocher",
    uncheck: "Décocher",
    remove: "Supprimer",
    noResult: "Aucun résultat.",
    addPlaceholder: "Ajouter un objectif personnel…",
    addLabel: "Nouvel objectif",
    add: "Ajouter",
    updated: "Listes mises à jour le",
    save: {
      title: "💾 Sauvegarder ou transférer ma progression",
      text: "Votre progression est enregistrée automatiquement dans ce navigateur, sans compte. Pour la retrouver sur un autre appareil (téléphone, ordinateur), copiez votre code puis collez-le là-bas.",
      copy: "Copier mon code",
      import: "Importer ce code",
      reset: "Tout effacer",
      confirmReset: "Effacer toute votre progression ? Cette action est définitive.",
      copied: "Code copié ! Collez-le sur votre autre appareil.",
      copyBelow: "Copiez le code ci-dessous.",
      imported: "Progression importée ✓",
      invalid: "Ce code n'est pas valide.",
      placeholder: "Collez ici un code de sauvegarde…",
      label: "Code de sauvegarde",
    },
  },
  en: {
    htmlLang: "en",
    ogLocale: "en_US",
    metaTitle: "Objectif 100%: track your GTA 6 completion",
    metaDescription:
      "Free checklist to track your 100% completion in GTA 6: missions, collectibles, activities and trophies. No sign-up needed.",
    myProgress: "My progress",
    langLabel: "Language",
    disclaimer:
      "Unofficial fan site. Objectif 100% is not affiliated with, endorsed or sponsored by Rockstar Games or Take-Two Interactive. Grand Theft Auto and GTA are trademarks of Take-Two Interactive Software, Inc.",
    legal: "Legal notice",
    badge: "Free · For PS5 and Xbox Series",
    heroBefore: "Go for",
    hundred: "100%",
    heroAfter: "in GTA 6",
    heroText: "The checklist to track your progress: missions, collectibles, activities and trophies. Never miss a thing again.",
    cta: "Start my checklist",
    heroNote: "Released November 19, 2026 · lists updated as players discover more",
    features: [
      { icon: "✅", title: "Tick as you play", text: "Missions, collectibles, activities, trophies: all in one place, sorted by category." },
      { icon: "📊", title: "Your % in real time", text: "See at a glance what's left to reach 100%." },
      { icon: "📱", title: "No sign-up", text: "Your progress saves itself. Move it to your phone with a simple code." },
    ],
    faqTitle: "FAQ",
    faq: [
      {
        q: "When did GTA 6 come out?",
        a: "GTA 6 came out on Thursday, November 19, 2026 on PlayStation 5 and Xbox Series X|S. The PC version has no date yet.",
      },
      {
        q: "Is the checklist free?",
        a: "Yes, completely free and with no sign-up. Your progress is saved in your browser.",
      },
      {
        q: "How do I get my progress on my phone?",
        a: "In “My progress”, open “Save or transfer”, copy your code and paste it on your other device.",
      },
      {
        q: "Are the lists complete?",
        a: "All 55 trophies, the story and stranger missions, the collectibles and the 100% activities are online. The lists are corrected as players discover more.",
      },
    ],
    overall: "Overall progress",
    goals: "goals",
    soon: "soon",
    emptyList: "The full list is coming soon. In the meantime, add your own goals below: your progress will be kept.",
    search: "Search…",
    searchLabel: "Search a goal",
    filters: { tous: "All", "a-faire": "To do", faits: "Done" },
    check: "Check",
    uncheck: "Uncheck",
    remove: "Remove",
    noResult: "No results.",
    addPlaceholder: "Add a personal goal…",
    addLabel: "New goal",
    add: "Add",
    updated: "Lists updated on",
    save: {
      title: "💾 Save or transfer my progress",
      text: "Your progress is saved automatically in this browser, with no account. To get it on another device (phone, computer), copy your code and paste it there.",
      copy: "Copy my code",
      import: "Import this code",
      reset: "Erase everything",
      confirmReset: "Erase all your progress? This can't be undone.",
      copied: "Code copied! Paste it on your other device.",
      copyBelow: "Copy the code below.",
      imported: "Progress imported ✓",
      invalid: "This code isn't valid.",
      placeholder: "Paste a save code here…",
      label: "Save code",
    },
  },
} as const;

export type Dict = (typeof DICT)[Lang];
