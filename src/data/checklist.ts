/**
 * Liste des objectifs à suivre, par catégorie.
 *
 * Contenu rempli le 20/11/2026 à partir des guides publiés après la sortie (PowerPyx, Timesaver,
 * Insider Gaming, Leonida Verse, GTADB). Noms en jeu conservés en anglais ; descriptions reformulées.
 * Ne jamais copier le texte d'un autre guide : seulement les faits (noms, nombre, lieux) reformulés.
 *
 * Chaque `id` doit rester stable : il sert à retrouver la progression enregistrée des joueurs.
 * Les ids sont construits à partir du nom (voir `slug`) : corriger l'ordre ne casse rien,
 * mais renommer un objectif change son id.
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

const slug = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** [nom, précision facultative] */
type Row = [string, string?];

const list = (prefix: string, rows: Row[], baseHint?: string): Item[] =>
  rows.map(([name, extra]) => ({
    id: `${prefix}-${slug(name)}`,
    name,
    hint: [baseHint, extra].filter(Boolean).join(" · ") || undefined,
  }));

// ─── Histoire principale (ordre PowerPyx) ────────────────────────────────────────────────
const CH = (n: number, rows: Row[]) => list(`h${n}`, rows, n === 0 ? "Prologue" : `Chapitre ${n}`);
const CARTEL = "Braquage du cartel";
const VCIA = "Braquage de l'aéroport (VCIA)";

const HISTOIRE: Item[] = [
  ...CH(0, [["Prologue"]]),
  ...CH(1, [
    ["Gone Fishing"], ["Gear Up"], ["Lab Fees"], ["Just a Scratch"], ["Unwanted Attention"], ["Pipework"],
    ["Hey Arnold!"], ["Island Dreams"], ["Feng Shui"], ["Coming Home"], ["Clean Up After Donnie"], ["Buck Me"],
    ["Down to Earth"], ["Deposit Cash Into BuckMe"], ["Save for the Future"], ["Day Release"], ["Clear Skies"],
    ["Building a Life"], ["Swamped"], ["Don Gone"], ["Donnie's Lost Drugs"], ["Recalibration"], ["Tourist Trap"],
    ["Home Sweet Home"], ["Discharge Time"],
  ]),
  ...CH(2, [
    ["What's in the Bag?"], ["Take Care of Jason"], ["Overnight Charges"], ["Just Moved In"], ["Girl's Trip"],
    ["Moses"], ["New Look"], ["How Do I Look?"], ["Painkiller Supplier"], ["Ambulance Chaser"],
    ["Behind on Payments"], ["Slam Dunk"], ["Daily Driver"], ["Breakfast Run"], ["Coffee Break"],
    ["Prepare for Vice City"], ["Afternoon Delight"], ["Checking Out"],
  ]),
  ...CH(3, [
    ["Welcome to Vice City"], ["Dealer's Choice", "Jason"], ["Dubious Provenance"], ["Mami Knows Best", "Lucia"],
    ["Here, Kitty Kitty", "Jason"], ["Send Money to Lorena"], ["Encrypted Hard Drive"], ["Boobie Time", "Jason"],
    ["Meet the Heders"], ["Yasmani's Jewelry Jobs", "3 bijouteries à braquer"], ["Car Service", "Lucia"],
    ["Send More Money to Lorena"], ["Top Billing"], ["First Impressions"], ["Crosstown Traffic"],
    ["Credit Check"], ["Clonin' Keys, Makin' GS"], ["Ride Or Die", "Jason"], ["Raul's Next Job"],
    ["Sinfrontera National Bank", CARTEL], ["Security Expert", CARTEL], ["Caught Slipping"],
    ["Heist Planning", CARTEL], ["Company Property", CARTEL], ["Safe Word", CARTEL],
    ["The Missing Link", `${CARTEL} · Lucia`], ["Cooties"], ["Hidden Charges", CARTEL], ["Bricked Up"],
    ["South Leonida Real Estate", "Lucia"], ["The Cartel Heist", CARTEL],
  ]),
  ...CH(4, [
    ["Ocean Beach"], ["Another Life"], ["Pool Day"], ["Company Cars"], ["Lawyer Up"], ["Heavy Lifting"],
    ["Party Hard"], ["Pay Abe's Fee"], ["Photo/Shoot"], ["Making Gainz", `${VCIA} · Lucia`],
    ["Blood Sweat and Gear", `${VCIA} · Lucia`], ["Too Much Baggage", `${VCIA} · Jason`], ["Watch It", "Jason"],
    ["Amateur Hour", `${VCIA} · Lucia`], ["Call Nate", `${VCIA} · Lucia`], ["Cash Injections", `${VCIA} · Lucia`],
    ["Dirty Work", VCIA], ["Nate Will Be in Touch", VCIA], ["Adventures in Babysitting", "Jason"],
    ["Rafa's Kidnapping", "Jason"], ["Fresh Evidence", "Jason"], ["Child's Play"], ["Power Play", `${VCIA} · Lucia`],
    ["Close Surveillance", `${VCIA} · Jason`], ["Delivery Method", `${VCIA} · Jason`],
    ["Team Building", `${VCIA} · Lucia`], ["Fully Catered", VCIA], ["Heist Plans in Place", VCIA], ["Headliners"],
    ["VCIA Takedown", VCIA], ["Tie Up Loose Ends"], ["Call Valentina Back"], ["Sunset"], ["Starting From Zero"],
  ]),
  ...CH(5, [
    ["Bird in the Hand"], ["Taking Liberties"], ["Doggie Bag"], ["VC Baby"], ["Operation Savage Glory"],
    ["Honest Abe"], ["Unfinished Business"], ["Pay Abe's Fee"], ["Protective Custody"], ["The End of the Road"],
  ]),
];

// ─── Missions secondaires (Strangers & Freaks + missions facultatives) ─────────────────────
const SF = "compte pour le trophée Strangers & Freaks";
const RATABLE = "⚠️ ratable";

const SECONDAIRES: Item[] = [
  ...list("s-shirley", [["Get Shirley's Rum", RATABLE], ["Steal the Scooter", RATABLE]], "Shirley · Ch. 1"),
  ...list("s-cal", [["Catch a Bigger Fish"]], "Cal · Ch. 1"),
  ...list(
    "s-kirk",
    [["Search for the Skunk Ape", "de nuit"], ["Search for Tree Effigies"], ["Help Kirk Find Mr. Mangrove", "Lucia, de nuit"]],
    `Kirk · Ch. 1-2 · ${SF}`,
  ),
  ...list("s-kyle", [["Check Out McKittrick Farm"], ["Collect Chemicals for Kyle"], ["Buddy?", "Ch. 3"]], `Kyle · Ch. 2 · ${SF}`),
  ...list("s-moses", [["Steal Vehicles for Moses"], ["Collect Moses' Gift"]], "Moses · Ch. 2"),
  ...list("s-bret", [["Veteran Hunted", "Jason"], ["Bret's Hunting Decks", "15 cibles"]], "Bret Vogel · Ch. 2"),
  ...list(
    "s-billy",
    [["Thrillbillies"], ["Twist Wrist, Smash, Grab"], ["Mall Rats", "Ch. 3, en solo"], ["The Impaler"], ["Hometown Heroes"]],
    "Billy · Ch. 2",
  ),
  ...list(
    "s-yago",
    [["Join a Street Race"], ["Bumper to Bumper", "Jason"], ["Race Against Yago", `${RATABLE} (temps limité)`], ["Brother to Brother", "Jason"]],
    `Yago · Ch. 3 · ${SF}`,
  ),
  ...list(
    "s-andy",
    [
      ["Climbing the Cellerichain, partie 1"], ["Climbing the Cellerichain, partie 2"], ["Climbing the Cellerichain, partie 3"],
      ["Pay the Cellerica Fee"], ["Peach!"], ["Read the Label"], ["Puff Puff Pass"],
    ],
    "Andy · Ch. 3 · Lucia",
  ),
  ...list(
    "s-yasmani",
    [["Yasmani's ATM Jobs"], ["Yasmani's Payday Loans Jobs"], ["Tail the Security Van"]],
    "Yasmani · Ch. 3",
  ),
  ...list("s-randy", [["Randy's Wish List"]], "Randy · Ch. 3"),
  ...list("s-tyrone", [["Take Out Kitty Litter"], ["Spin On This"]], "Tyrone · Ch. 3"),
  ...list("s-dunk", [["Dunk's Robbery Tips"]], "Dunk · Ch. 3"),
  ...list("s-eddie", [["Attend Eddie Acosta's Party", "en solo"]], "Eddie Acosta · Ch. 4"),
  ...list(
    "s-pete",
    [
      ["The Last Mile: Passing the Torch"], ["The Last Mile: Backseat Pilot"],
      ["Pete's Deliveries: Southpoint Airfield"], ["Pete's Deliveries: Avery Allen & Co."],
    ],
    `Pilot Pete · Ch. 4 · Jason · ${SF}`,
  ),
  ...list(
    "s-opt",
    [
      ["Buy Lucia a Necklace", "Ch. 1"], ["Get Lucia's Clothes", "Ch. 1"], ["Hit Avery Pawn", "Ch. 2"],
      ["Hit Kingpin Bowling", "Ch. 2"], ["Impounded Vehicle", "Ch. 2"], ["Get Your Wheels", "Ch. 3"],
      ["It's A Date!", "Ch. 4"], ["Bad Driver!", "Ch. 4"],
      ["This is a Free Call From...", `Ch. 4 · Lucia · ${RATABLE} (temps limité)`],
      ["That's Where The Money Is...", "Ch. 4"],
    ],
    "Facultative",
  ),
];

// ─── Objets à collectionner ────────────────────────────────────────────────────────────────
const CARTES: Row[] = [
  ["Vice City Flamingos", "24 cartes"], ["Vice City Narcos", "24 cartes"], ["Vice City Manatees", "24 cartes"],
  ["Vice City Club De Futbol", "30 cartes"], ["Liberty City Swingers", "24 cartes"],
  ["Liberty City Penetrators", "24 cartes"], ["Liberty City Wrath", "24 cartes"], ["Los Santos Corkers", "24 cartes"],
  ["Los Santos Panic", "24 cartes"], ["Los Santos Pounders", "24 cartes"], ["Backyard Wrestling", "12 cartes"],
  ["America's Next Top Hooker", "24 cartes"], ["Delights Dancers", "18 cartes"], ["Jack of Hearts Dancers", "36 cartes"],
  ["Nine1Nine Dancers", "36 cartes"], ["The Legends of Ratface", "36 cartes"], ["Right Wing: America's Hero", "36 cartes"],
  ["Ed Comics Universe", "36 cartes"],
];

const COLLECTION: Item[] = [
  ...list("c", [
    ["Cartes à collectionner : 15 séries complètes sur 18", "480 cartes au total · requis pour le 100 %"],
    ["Scans WAiNK : 100", "Monuments, curiosités, sculptures, tags… · requis pour le 100 %"],
    ["Découvertes sous-marines : 33 sur 33", "Épaves de Kenton · requis pour le 100 %"],
    ["Trésors de Kenton : 5 séries sur 7", "requis pour le 100 %"],
    ["Magazines, livres et BD : 30 sur 34", "27 magazines + 7 échanges de livres · requis pour le 100 %"],
    ["Lieux de méditation : 15 sur 18", "requis pour le 100 %"],
    ["Flamants roses de cocaïne : 100 sur 125", "requis pour le 100 %"],
    ["Playlists uniques : 2 sur 2", "requis pour le 100 %"],
    ["Styles : 70 sur 79", "Tenues des magazines, tatouages, 34 montres de luxe · requis pour le 100 %"],
    ["Véhicules scannés : 200 sur 277 modèles de base", "requis pour le 100 %"],
    ["Armes : 50 sur 66 armes standard", "53 armes à feu, 9 de mêlée, 4 explosifs · requis pour le 100 %"],
    ["Animaux étudiés : 100 sur 255", "requis pour le 100 %"],
  ]),
  ...list("carte", CARTES, "Série de cartes"),
];

// ─── Activités & défis ─────────────────────────────────────────────────────────────────────
const ACTIVITES: Item[] = list("a", [
  ["Tâches facultatives : 100", "requis pour le 100 %"],
  ["Opérations de gangs : 39 sur 39", "9 gangs · requis pour le 100 %"],
  ["Braquages de banques : 22 sur 22", "14 petites + 8 grandes · requis pour le 100 %"],
  ["Coffres-forts : 8 sur 8", "Grandes banques · requis pour le 100 %"],
  ["Prêts sur salaire (Payday Loans) : 7 sur 7", "requis pour le 100 %"],
  ["Casse-vitrines (Smash 'n' Grab) : 34 sur 35", "requis pour le 100 %"],
  ["Braquages de commerces : 50 sur 91", "requis pour le 100 %"],
  ["Receler 100 000 $ de drogue", "requis pour le 100 %"],
  ["Receler 100 000 $ de bijoux", "requis pour le 100 %"],
  ["Receler 250 000 $ de billets marqués", "requis pour le 100 %"],
  ["Receler 200 000 $ de véhicules", "requis pour le 100 %"],
  ["Courses uniques : 30 sur 40", "requis pour le 100 %"],
  ["Défis de course (médaille d'or) : 10 sur 13", "requis pour le 100 %"],
  ["Stand de tir : 42 médailles d'or sur 42", "Griffin Shooting Range et Rodgers Ranch · requis pour le 100 %"],
  ["Courses de drones : 42 chronos sur 42", "14 lieux · requis pour le 100 %"],
  ["Cascades : 300 sur 397", "Sauts, passages sous les ponts, vols en lame de couteau, BASE jump · requis pour le 100 %"],
  ["Défis : 70 sur 80", "8 familles de 10 · requis pour le 100 %"],
  ["Cibles de chasse de Bret : 15 sur 15", "requis pour le 100 %"],
  ["Jeux vidéo (arcade et TV) : 4 sur 4", "requis pour le 100 %"],
  ["Adversaires au billard : 5 sur 7", "requis pour le 100 %"],
  ["Mini-golf : 2 parcours sur 3", "requis pour le 100 %"],
  ["Paniers de basket : 90 sur 100", "un panier différent à chaque fois · requis pour le 100 %"],
  ["Battre Cal à un défi de pêche"],
  ["Finir l'histoire principale", "requis pour le 100 % (la liste du 100 % s'affiche dans Progression > Stats)"],
]);

// ─── Trophées & succès ─────────────────────────────────────────────────────────────────────
const T = (tier: string, g: number) => `${tier} · ${g}G`;
const CACHE = "Caché (spoiler)";

const TROPHEES: Item[] = list("t", [
  ["Vice Got a Price!", "Platine · Obtenir tous les autres trophées"],
  ["A Long Road", `${T("Or", 100)} · Atteindre 100 % de complétion`],
  ["Cunning Stunts", `${T("Argent", 40)} · Réussir 250 cascades`],
  ["Master of None", `${T("Bronze", 20)} · Essayer chaque type d'activité une fois`],
  ["The Shootist", `${T("Argent", 40)} · Médaille d'or à tous les défis de stand de tir (42)`],
  ["Top Fun", `${T("Bronze", 15)} · Gagner une course de drones Top Fun sur chaque site`],
  ["Earn Cash, Not Kudos", `${T("Bronze", 20)} · Gagner 20 courses différentes`],
  ["Baited My Tackle", `${T("Bronze", 10)} · Battre Cal à un défi de pêche`],
  ["Stick Fiddler", `${T("Bronze", 10)} · Finir un jeu d'arcade`],
  ["Strangers & Freaks", `${T("Argent", 30)} · Terminer 8 séries de missions d'inconnus`],
  ["Positive Mental Attitude", `${T("Bronze", 10)} · Méditer à chaque lieu de Leonida (18) · ⚠️ peut-être ratable (balcon de Lucia, ch. 1)`],
  ["Don't Touch My Deck", `${T("Argent", 30)} · Compléter 3 séries de cartes`],
  ["You WAiNKer!", `${T("Argent", 30)} · Faire 100 scans WAiNK`],
  ["One Last Thing", `${T("Bronze", 5)} · Terminer 50 défis`],
  ["Hot Together", `${T("Bronze", 20)} · Semer 4 étoiles de recherche avec son partenaire`],
  ["Retail Therapy", `${T("Bronze", 20)} · Braquer 3 commerces d'affilée avec son partenaire sans perdre son avis de recherche`],
  ["Whip It Good", `${T("Bronze", 20)} · Découvrir 100 véhicules`],
  ["Gunslinger", `${T("Bronze", 10)} · Abattre 5 ennemis en un seul Combat Focus`],
  ["Sneakthief", `${T("Bronze", 10)} · Braquer une bijouterie sans être repéré`],
  ["Maximum Withdrawal", `${T("Argent", 40)} · Vider 5 coffres de banque et s'enfuir`],
  ["A Classic Blitz Play", `${T("Bronze", 10)} · Braquer un fourgon blindé et s'enfuir`],
  ["The Goodtime State", `${T("Bronze", 20)} · Explorer tout Leonida`],
  ["Pest Control", `${T("Bronze", 20)} · Braquer une opération illégale de chaque gang`],
  ["Dime on the Dollar", `${T("Bronze", 20)} · Blanchir 250 000 $ de billets marqués via les contacts`],
  ["Treat Yo Self", `${T("Bronze", 15)} · Dépenser 100 000 $ dans les magasins`],
  ["Little Boxes", `${T("Bronze", 15)} · Acheter tous les garages`],
  ["On the Spot", `${T("Bronze", 15)} · Enregistrer 10 véhicules dans l'appli Scooter Bros`],
  ["Just Like Paradise", `${T("Bronze", 5)} · ${CACHE} · Terminer Gone Fishing`],
  ["Paradise Lost", `${T("Bronze", 20)} · ${CACHE} · Terminer le chapitre 1`],
  ["T**s Ass Drug Money", `${T("Bronze", 20)} · ${CACHE} · Terminer le chapitre 2`],
  ["Vice City, Baby!", `${T("Bronze", 20)} · ${CACHE} · Terminer le chapitre 3`],
  ["Top Of The World, Ma", `${T("Bronze", 20)} · ${CACHE} · Terminer le chapitre 4`],
  ["You Gotta Know When to Get Off", `${T("Or", 50)} · ${CACHE} · Terminer l'histoire`],
  ["Trust", `${T("Bronze", 10)} · ${CACHE} · Terminer Breakfast Run`],
  ["Break the Bank", `${T("Bronze", 25)} · ${CACHE} · Terminer The Cartel Heist`],
  ["Family Matters", `${T("Bronze", 15)} · ${CACHE} · Terminer Child's Play`],
  ["DWNFALL", `${T("Bronze", 15)} · ${CACHE} · Terminer Headliners`],
  ["Hi-Jacked", `${T("Bronze", 25)} · ${CACHE} · Terminer VCIA Takedown`],
  ["Snow Storm", `${T("Bronze", 25)} · ${CACHE} · Terminer Operation Savage Glory`],
  ["Road to Rehabilitation", `${T("Bronze", 15)} · ${CACHE} · Dernière mission d'Andy (Lucia)`],
  ["This Was No Boat Accident", `${T("Bronze", 15)} · ${CACHE} · Dernière mission de Kenton`],
  ["The Lone Rider", `${T("Bronze", 15)} · ${CACHE} · Dernière mission de Billy`],
  ["Supply & Demand", `${T("Bronze", 20)} · ${CACHE} · Dernière mission de Randy`],
  ["Spin On This!", `${T("Bronze", 15)} · ${CACHE} · Dernière mission de Tyrone (Jason)`],
  ["Fair Game", `${T("Bronze", 15)} · ${CACHE} · Chasser un animal unique pour Bret (Jason)`],
  ["Catch Me If You Can", `${T("Bronze", 10)} · ${CACHE} · Partir de l'aéroport VCIA sans billet (voler un avion de ligne)`],
  ["Challenging Tank", `${T("Bronze", 10)} · ${CACHE} · Lié à un tank Rhino (Mile Zero Air Station)`],
  ["Let's Go Bowling", `${T("Bronze", 5)} · ${CACHE} · Au bowling de Kolt & Associates`],
  ["Personal Best", `${T("Bronze", 5)} · ${CACHE} · Probablement : Force au maximum pour les deux héros`],
  ["Actions Speak Louder", `${T("Bronze", 5)} · ${CACHE} · Probablement : 500 actions qui modifient le profil criminel`],
  ["In The Beginning…", `${T("Bronze", 5)} · ${CACHE} · Boire un cocktail avec vue à Ocean Beach`],
  ["Capital Offense", `${T("Bronze", 5)} · ${CACHE} · Sortir d'une concession auto en traversant la vitrine`],
  ["Bad Luck, I Guess", `${T("Bronze", 5)} · ${CACHE} · Condition encore inconnue`],
  ["The Truth Is Out There", `${T("Bronze", 5)} · ${CACHE} · Condition encore inconnue`],
  ["Ten Pin", `${T("Bronze", 5)} · ${CACHE} · Renverser des quilles avec un drive-by au corps à corps`],
]);

export const CATEGORIES: Category[] = [
  {
    id: "histoire",
    name: "Histoire principale",
    icon: "🎬",
    description: "Les missions de l'histoire, du prologue au chapitre 5, dans l'ordre (noms anglais du jeu).",
    seoTitle: "Liste des missions de l'histoire de GTA 6 (checklist)",
    seoDescription: "Toutes les missions de l'histoire principale de GTA 6 dans l'ordre. Cochez celles que vous avez terminées et suivez votre progression.",
    items: HISTOIRE,
  },
  {
    id: "secondaires",
    name: "Missions secondaires",
    icon: "🗺️",
    description: "Inconnus (Strangers & Freaks) et missions facultatives, avec le chapitre où elles apparaissent.",
    seoTitle: "Missions secondaires de GTA 6 : liste et checklist",
    seoDescription: "Liste des missions secondaires de GTA 6 à cocher : ne ratez aucune mission annexe sur la route du 100 %.",
    items: SECONDAIRES,
  },
  {
    id: "collection",
    name: "Objets à collectionner",
    icon: "💎",
    description: "Les objectifs de collection du 100 %, puis les 18 séries de cartes.",
    seoTitle: "Objets à collectionner dans GTA 6 : checklist complète",
    seoDescription: "Tous les objets à collectionner de GTA 6 à cocher un par un. Suivez combien il vous en reste pour atteindre le 100 %.",
    items: COLLECTION,
  },
  {
    id: "activites",
    name: "Activités & défis",
    icon: "🏁",
    description: "Braquages, courses, loisirs et défis : tout ce que demande le 100 %.",
    seoTitle: "Activités et défis de GTA 6 : liste à cocher",
    seoDescription: "Courses, loisirs et défis de GTA 6 : la liste des activités à cocher pour compléter le jeu à 100 %.",
    items: ACTIVITES,
  },
  {
    id: "trophees",
    name: "Trophées & succès",
    icon: "🏆",
    description: "Les 55 trophées PlayStation et succès Xbox (1 000 G). Les trophées cachés contiennent des spoilers.",
    seoTitle: "Liste des trophées et succès de GTA 6 (PS5 et Xbox)",
    seoDescription: "Les 55 trophées PS5 et succès Xbox de GTA 6 à cocher, avec leurs conditions. Suivez votre progression vers le platine.",
    items: TROPHEES,
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
export const LAST_DATA_UPDATE = "20 novembre 2026";
