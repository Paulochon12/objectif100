/**
 * Liste des objectifs à suivre, par catégorie.
 *
 * ⚠️ Les listes officielles (missions, objets, trophées…) seront complétées après la sortie du jeu,
 * à partir d'informations vérifiées. Ne jamais copier le texte d'un autre guide : seulement les faits
 * (noms, nombre, lieux) reformulés.
 *
 * Chaque `id` doit rester stable : il sert à retrouver la progression enregistrée des joueurs.
 */
export type Item = { id: string; name: string; hint?: string };
export type Category = {
  id: string;
  name: string;
  icon: string;
  description: string;
  /** Titre de la page pour Google (≈ 60 caractères max). */
  seoTitle: string;
  /** Description pour Google (≈ 155 caractères max). */
  seoDescription: string;
  items: Item[];
};

export const CATEGORIES: Category[] = [
  {
    id: "histoire",
    name: "Histoire principale",
    icon: "🎬",
    description: "Les missions de l'histoire, dans l'ordre.",
    seoTitle: "Liste des missions de l'histoire de GTA 6 (checklist)",
    seoDescription: "Toutes les missions de l'histoire principale de GTA 6 dans l'ordre. Cochez celles que vous avez terminées et suivez votre progression.",
    items: [],
  },
  {
    id: "secondaires",
    name: "Missions secondaires",
    icon: "🗺️",
    description: "Rencontres, contrats et missions annexes.",
    seoTitle: "Missions secondaires de GTA 6 : liste et checklist",
    seoDescription: "Liste des missions secondaires de GTA 6 à cocher : ne ratez aucune mission annexe sur la route du 100 %.",
    items: [],
  },
  {
    id: "collection",
    name: "Objets à collectionner",
    icon: "💎",
    description: "Tout ce qui se ramasse et se compte.",
    seoTitle: "Objets à collectionner dans GTA 6 : checklist complète",
    seoDescription: "Tous les objets à collectionner de GTA 6 à cocher un par un. Suivez combien il vous en reste pour atteindre le 100 %.",
    items: [],
  },
  {
    id: "activites",
    name: "Activités & défis",
    icon: "🏁",
    description: "Courses, loisirs, défis et activités du monde ouvert.",
    seoTitle: "Activités et défis de GTA 6 : liste à cocher",
    seoDescription: "Courses, loisirs et défis de GTA 6 : la liste des activités à cocher pour compléter le jeu à 100 %.",
    items: [],
  },
  {
    id: "trophees",
    name: "Trophées & succès",
    icon: "🏆",
    description: "Trophées PlayStation et succès Xbox.",
    seoTitle: "Liste des trophées et succès de GTA 6 (PS5 et Xbox)",
    seoDescription: "Tous les trophées PS5 et succès Xbox de GTA 6 à cocher. Suivez votre progression vers le platine.",
    items: [],
  },
  {
    id: "perso",
    name: "Mes objectifs",
    icon: "✍️",
    description: "Votre liste personnelle : ajoutez ce que vous voulez.",
    seoTitle: "Ma checklist personnelle GTA 6",
    seoDescription: "Créez votre propre liste d'objectifs pour GTA 6 et suivez votre progression, sans inscription.",
    items: [
      { id: "perso-histoire", name: "Terminer l'histoire principale" },
      { id: "perso-carte", name: "Explorer toute la carte" },
      { id: "perso-100", name: "Atteindre 100 % de complétion" },
    ],
  },
];

/** Date de mise à jour des listes, affichée aux joueurs. */
export const LAST_DATA_UPDATE = "17 novembre 2026";
