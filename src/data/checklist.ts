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
  items: Item[];
};

export const CATEGORIES: Category[] = [
  {
    id: "histoire",
    name: "Histoire principale",
    icon: "🎬",
    description: "Les missions de l'histoire, dans l'ordre.",
    items: [],
  },
  {
    id: "secondaires",
    name: "Missions secondaires",
    icon: "🗺️",
    description: "Rencontres, contrats et missions annexes.",
    items: [],
  },
  {
    id: "collection",
    name: "Objets à collectionner",
    icon: "💎",
    description: "Tout ce qui se ramasse et se compte.",
    items: [],
  },
  {
    id: "activites",
    name: "Activités & défis",
    icon: "🏁",
    description: "Courses, loisirs, défis et activités du monde ouvert.",
    items: [],
  },
  {
    id: "trophees",
    name: "Trophées & succès",
    icon: "🏆",
    description: "Trophées PlayStation et succès Xbox.",
    items: [],
  },
  {
    id: "perso",
    name: "Mes objectifs",
    icon: "✍️",
    description: "Votre liste personnelle : ajoutez ce que vous voulez.",
    items: [
      { id: "perso-histoire", name: "Terminer l'histoire principale" },
      { id: "perso-carte", name: "Explorer toute la carte" },
      { id: "perso-100", name: "Atteindre 100 % de complétion" },
    ],
  },
];

/** Date de mise à jour des listes, affichée aux joueurs. */
export const LAST_DATA_UPDATE = "17 novembre 2026";
