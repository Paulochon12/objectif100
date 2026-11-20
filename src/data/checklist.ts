/**
 * Liste des objectifs à suivre, par catégorie, en français et en anglais.
 *
 * Contenu rempli le 20/11/2026 à partir des guides publiés après la sortie (PowerPyx, Timesaver,
 * Insider Gaming, Leonida Verse, GTADB ; noms français des trophées : Gamewave, GeeksLands).
 * Les noms des missions restent en anglais : c'est ainsi qu'ils apparaissent dans la version française du jeu.
 * Ne jamais copier le texte d'un autre guide : seulement les faits (noms, nombre, lieux) reformulés.
 *
 * Chaque `id` doit rester stable : il sert à retrouver la progression enregistrée des joueurs.
 * Il est construit à partir du nom d'origine (voir `list`, paramètre `idLang`) : renommer un objectif
 * change son id, sauf si l'on garde le même texte source.
 */
import type { Lang } from "@/lib/i18n";

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

/** Texte identique dans les deux langues, ou traduit. */
type L = string | { fr: string; en: string };
const b = (fr: string, en: string): L => ({ fr, en });
const tr = (l: L, lang: Lang) => (typeof l === "string" ? l : l[lang]);

type LItem = { id: string; name: L; hint: L[] };
/** [nom, morceaux de précision…] */
type Row = [L, ...L[]];

const slug = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function list(prefix: string, rows: Row[], base: L[] = [], idLang: Lang = "fr"): LItem[] {
  return rows.map(([name, ...extra]) => ({
    id: `${prefix}-${slug(tr(name, idLang))}`,
    name,
    hint: [...base, ...extra],
  }));
}

// Morceaux de texte réutilisés
const REQ = b("requis pour le 100 %", "required for 100%");
const LUCIA = "Lucia";
const JASON = "Jason";
const NIGHT = b("de nuit", "at night");
const SOLO = b("en solo", "solo only");
const MISSABLE = b("⚠️ ratable", "⚠️ missable");
const TIMED = b("temps limité", "time-limited");

// ─── Histoire principale (ordre PowerPyx) ────────────────────────────────────────────────
const CH = (n: number, rows: Row[]) => list(`h${n}`, rows, [n === 0 ? "Prologue" : b(`Chapitre ${n}`, `Chapter ${n}`)]);
const CARTEL = b("Braquage du cartel", "Cartel heist");
const VCIA = b("Braquage de l'aéroport (VCIA)", "Airport heist (VCIA)");

const HISTOIRE: LItem[] = [
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
    ["Welcome to Vice City"], ["Dealer's Choice", JASON], ["Dubious Provenance"], ["Mami Knows Best", LUCIA],
    ["Here, Kitty Kitty", JASON], ["Send Money to Lorena"], ["Encrypted Hard Drive"], ["Boobie Time", JASON],
    ["Meet the Heders"], ["Yasmani's Jewelry Jobs", b("3 bijouteries à braquer", "3 jewelry stores to rob")],
    ["Car Service", LUCIA], ["Send More Money to Lorena"], ["Top Billing"], ["First Impressions"],
    ["Crosstown Traffic"], ["Credit Check"], ["Clonin' Keys, Makin' GS"], ["Ride Or Die", JASON],
    ["Raul's Next Job"], ["Sinfrontera National Bank", CARTEL], ["Security Expert", CARTEL], ["Caught Slipping"],
    ["Heist Planning", CARTEL], ["Company Property", CARTEL], ["Safe Word", CARTEL],
    ["The Missing Link", CARTEL, LUCIA], ["Cooties"], ["Hidden Charges", CARTEL], ["Bricked Up"],
    ["South Leonida Real Estate", LUCIA], ["The Cartel Heist", CARTEL],
  ]),
  ...CH(4, [
    ["Ocean Beach"], ["Another Life"], ["Pool Day"], ["Company Cars"], ["Lawyer Up"], ["Heavy Lifting"],
    ["Party Hard"], ["Pay Abe's Fee"], ["Photo/Shoot"], ["Making Gainz", VCIA, LUCIA],
    ["Blood Sweat and Gear", VCIA, LUCIA], ["Too Much Baggage", VCIA, JASON], ["Watch It", JASON],
    ["Amateur Hour", VCIA, LUCIA], ["Call Nate", VCIA, LUCIA], ["Cash Injections", VCIA, LUCIA],
    ["Dirty Work", VCIA], ["Nate Will Be in Touch", VCIA], ["Adventures in Babysitting", JASON],
    ["Rafa's Kidnapping", JASON], ["Fresh Evidence", JASON], ["Child's Play"], ["Power Play", VCIA, LUCIA],
    ["Close Surveillance", VCIA, JASON], ["Delivery Method", VCIA, JASON], ["Team Building", VCIA, LUCIA],
    ["Fully Catered", VCIA], ["Heist Plans in Place", VCIA], ["Headliners"], ["VCIA Takedown", VCIA],
    ["Tie Up Loose Ends"], ["Call Valentina Back"], ["Sunset"], ["Starting From Zero"],
  ]),
  ...CH(5, [
    ["Bird in the Hand"], ["Taking Liberties"], ["Doggie Bag"], ["VC Baby"], ["Operation Savage Glory"],
    ["Honest Abe"], ["Unfinished Business"], ["Pay Abe's Fee"], ["Protective Custody"], ["The End of the Road"],
  ]),
];

// ─── Missions secondaires (inconnus + missions facultatives) ───────────────────────────────
const SF = b("compte pour le trophée Inconnus et détraqués", "counts toward Strangers & Freaks");

const SECONDAIRES: LItem[] = [
  ...list("s-shirley", [["Get Shirley's Rum", MISSABLE], ["Steal the Scooter", MISSABLE]], ["Shirley · Ch. 1"]),
  ...list("s-cal", [["Catch a Bigger Fish"]], ["Cal · Ch. 1"]),
  ...list(
    "s-kirk",
    [["Search for the Skunk Ape", NIGHT], ["Search for Tree Effigies"], ["Help Kirk Find Mr. Mangrove", LUCIA, NIGHT]],
    ["Kirk · Ch. 1-2", SF],
  ),
  ...list("s-kyle", [["Check Out McKittrick Farm"], ["Collect Chemicals for Kyle"], ["Buddy?", "Ch. 3"]], ["Kyle · Ch. 2", SF]),
  ...list("s-moses", [["Steal Vehicles for Moses"], ["Collect Moses' Gift"]], ["Moses · Ch. 2"]),
  ...list("s-bret", [["Veteran Hunted", JASON], ["Bret's Hunting Decks", b("15 cibles", "15 targets")]], ["Bret Vogel · Ch. 2"]),
  ...list(
    "s-billy",
    [["Thrillbillies"], ["Twist Wrist, Smash, Grab"], ["Mall Rats", "Ch. 3", SOLO], ["The Impaler"], ["Hometown Heroes"]],
    ["Billy · Ch. 2"],
  ),
  ...list(
    "s-yago",
    [["Join a Street Race"], ["Bumper to Bumper", JASON], ["Race Against Yago", MISSABLE, TIMED], ["Brother to Brother", JASON]],
    ["Yago · Ch. 3", SF],
  ),
  ...list(
    "s-andy",
    [
      [b("Climbing the Cellerichain, partie 1", "Climbing the Cellerichain, Part 1")],
      [b("Climbing the Cellerichain, partie 2", "Climbing the Cellerichain, Part 2")],
      [b("Climbing the Cellerichain, partie 3", "Climbing the Cellerichain, Part 3")],
      ["Pay the Cellerica Fee"], ["Peach!"], ["Read the Label"], ["Puff Puff Pass"],
    ],
    ["Andy · Ch. 3", LUCIA],
  ),
  ...list("s-yasmani", [["Yasmani's ATM Jobs"], ["Yasmani's Payday Loans Jobs"], ["Tail the Security Van"]], ["Yasmani · Ch. 3"]),
  ...list("s-randy", [["Randy's Wish List"]], ["Randy · Ch. 3"]),
  ...list("s-tyrone", [["Take Out Kitty Litter"], ["Spin On This"]], ["Tyrone · Ch. 3"]),
  ...list("s-dunk", [["Dunk's Robbery Tips"]], ["Dunk · Ch. 3"]),
  ...list("s-eddie", [["Attend Eddie Acosta's Party", SOLO]], ["Eddie Acosta · Ch. 4"]),
  ...list(
    "s-pete",
    [
      ["The Last Mile: Passing the Torch"], ["The Last Mile: Backseat Pilot"],
      ["Pete's Deliveries: Southpoint Airfield"], ["Pete's Deliveries: Avery Allen & Co."],
    ],
    ["Pilot Pete · Ch. 4", JASON, SF],
  ),
  ...list(
    "s-opt",
    [
      ["Buy Lucia a Necklace", "Ch. 1"], ["Get Lucia's Clothes", "Ch. 1"], ["Hit Avery Pawn", "Ch. 2"],
      ["Hit Kingpin Bowling", "Ch. 2"], ["Impounded Vehicle", "Ch. 2"], ["Get Your Wheels", "Ch. 3"],
      ["It's A Date!", "Ch. 4"], ["Bad Driver!", "Ch. 4"],
      ["This is a Free Call From...", "Ch. 4", LUCIA, MISSABLE, TIMED],
      ["That's Where The Money Is...", "Ch. 4"],
    ],
    [b("Facultative", "Optional")],
  ),
];

// ─── Objets à collectionner ────────────────────────────────────────────────────────────────
const cards = (n: number) => b(`${n} cartes`, `${n} cards`);
const CARTES: Row[] = [
  ["Vice City Flamingos", cards(24)], ["Vice City Narcos", cards(24)], ["Vice City Manatees", cards(24)],
  ["Vice City Club De Futbol", cards(30)], ["Liberty City Swingers", cards(24)],
  ["Liberty City Penetrators", cards(24)], ["Liberty City Wrath", cards(24)], ["Los Santos Corkers", cards(24)],
  ["Los Santos Panic", cards(24)], ["Los Santos Pounders", cards(24)], ["Backyard Wrestling", cards(12)],
  ["America's Next Top Hooker", cards(24)], ["Delights Dancers", cards(18)], ["Jack of Hearts Dancers", cards(36)],
  ["Nine1Nine Dancers", cards(36)], ["The Legends of Ratface", cards(36)], ["Right Wing: America's Hero", cards(36)],
  ["Ed Comics Universe", cards(36)],
];

const COLLECTION: LItem[] = [
  ...list("c", [
    [b("Cartes à collectionner : 15 séries complètes sur 18", "Collectible cards: 15 of 18 sets complete"), b("480 cartes au total", "480 cards in total"), REQ],
    [b("Scans WAiNK : 100", "WAiNK scans: 100"), b("Monuments, curiosités, sculptures, tags…", "Landmarks, curiosities, sculptures, tags…"), REQ],
    [b("Découvertes sous-marines : 33 sur 33", "Underwater discoveries: 33 of 33"), b("Épaves de Kenton", "Kenton's shipwrecks"), REQ],
    [b("Trésors de Kenton : 5 séries sur 7", "Kenton's treasures: 5 of 7 sets"), REQ],
    [b("Magazines, livres et BD : 30 sur 34", "Magazines, books & comics: 30 of 34"), b("27 magazines + 7 échanges de livres", "27 magazines + 7 book swaps"), REQ],
    [b("Lieux de méditation : 15 sur 18", "Meditation spots: 15 of 18"), REQ],
    [b("Flamants roses de cocaïne : 100 sur 125", "Cocaine flamingos: 100 of 125"), REQ],
    [b("Playlists uniques : 2 sur 2", "Unique playlists: 2 of 2"), REQ],
    [b("Styles : 70 sur 79", "Styles: 70 of 79"), b("Tenues des magazines, tatouages, 34 montres de luxe", "Magazine outfits, tattoos, 34 luxury watches"), REQ],
    [b("Véhicules scannés : 200 sur 277 modèles de base", "Vehicles scanned: 200 of 277 base models"), REQ],
    [b("Armes : 50 sur 66 armes standard", "Weapons: 50 of 66 standard weapons"), b("53 armes à feu, 9 de mêlée, 4 explosifs", "53 guns, 9 melee, 4 explosives"), REQ],
    [b("Animaux étudiés : 100 sur 255", "Animals studied: 100 of 255"), REQ],
  ]),
  ...list("carte", CARTES, [b("Série de cartes", "Card set")]),
];

// ─── Activités & défis ─────────────────────────────────────────────────────────────────────
const ACTIVITES: LItem[] = list("a", [
  [b("Tâches facultatives : 100", "Optional tasks: 100"), REQ],
  [b("Opérations de gangs : 39 sur 39", "Gang operations: 39 of 39"), b("9 gangs", "9 gangs"), REQ],
  [b("Braquages de banques : 22 sur 22", "Bank jobs: 22 of 22"), b("14 petites + 8 grandes", "14 small + 8 large"), REQ],
  [b("Coffres-forts : 8 sur 8", "Vaults: 8 of 8"), b("Grandes banques", "Large banks"), REQ],
  [b("Prêts sur salaire (Payday Loans) : 7 sur 7", "Payday Loans: 7 of 7"), REQ],
  [b("Casse-vitrines (Smash 'n' Grab) : 34 sur 35", "Smash 'n' Grabs: 34 of 35"), REQ],
  [b("Braquages de commerces : 50 sur 91", "Stick-ups: 50 of 91"), REQ],
  [b("Receler 100 000 $ de drogue", "Fence $100,000 of narcotics"), REQ],
  [b("Receler 100 000 $ de bijoux", "Fence $100,000 of jewelry"), REQ],
  [b("Receler 250 000 $ de billets marqués", "Fence $250,000 of marked bills"), REQ],
  [b("Receler 200 000 $ de véhicules", "Fence $200,000 of vehicles"), REQ],
  [b("Courses uniques : 30 sur 40", "Unique races: 30 of 40"), REQ],
  [b("Défis de course (médaille d'or) : 10 sur 13", "Race challenges (gold medal): 10 of 13"), REQ],
  [b("Stand de tir : 42 médailles d'or sur 42", "Shooting range: 42 of 42 gold medals"), "Griffin Shooting Range · Rodgers Ranch", REQ],
  [b("Courses de drones : 42 chronos sur 42", "Drone races: 42 of 42 time trials"), b("14 lieux", "14 locations"), REQ],
  [b("Cascades : 300 sur 397", "Stunts: 300 of 397"), b("Sauts, passages sous les ponts, vols en lame de couteau, BASE jump", "Jumps, under-the-bridge flights, knife flights, BASE jumps"), REQ],
  [b("Défis : 70 sur 80", "Challenges: 70 of 80"), b("8 familles de 10", "8 families of 10"), REQ],
  [b("Cibles de chasse de Bret : 15 sur 15", "Bret's hunting targets: 15 of 15"), REQ],
  [b("Jeux vidéo (arcade et TV) : 4 sur 4", "Video games (arcade & TV): 4 of 4"), REQ],
  [b("Adversaires au billard : 5 sur 7", "Pool opponents: 5 of 7"), REQ],
  [b("Mini-golf : 2 parcours sur 3", "Mini golf: 2 of 3 courses"), REQ],
  [b("Paniers de basket : 90 sur 100", "Basketball hoops: 90 of 100"), b("un panier différent à chaque fois", "a different hoop each time"), REQ],
  [b("Battre Cal à un défi de pêche", "Beat Cal in a fishing challenge")],
  [b("Finir l'histoire principale", "Finish the main story"), REQ, b("la liste du 100 % s'affiche ensuite dans Progression > Stats", "the 100% list then appears under Progress > Stats")],
]);

// ─── Trophées & succès (noms français : version française du jeu, relevés par la presse) ───
const PLAT = b("Platine", "Platinum");
const GOLD = b("Or", "Gold");
const SILVER = b("Argent", "Silver");
const BRONZE = "Bronze";
const HIDDEN = b("Caché (spoiler)", "Hidden (spoiler)");
const g = (n: number) => `${n}G`;
/** [nom FR, nom EN, rang, Gamerscore, condition FR, condition EN, caché ?] */
type Trophy = [string, string, L, number, string, string, boolean?];

const TROPHY_ROWS: Trophy[] = [
  ["C'est le prix de Vice City !", "Vice Got a Price!", PLAT, 0, "Obtenir tous les autres trophées", "Earn every other trophy"],
  ["Une longue route", "A Long Road", GOLD, 100, "Atteindre 100 % de complétion", "Reach 100% completion"],
  ["Casse-cou jusqu'au bout", "Cunning Stunts", SILVER, 40, "Réussir 250 cascades", "Complete 250 stunts"],
  ["Touche-à-tout", "Master of None", BRONZE, 20, "Essayer chaque type d'activité une fois", "Try every type of activity once"],
  ["Le Flingueur", "The Shootist", SILVER, 40, "Médaille d'or à tous les défis de stand de tir (42)", "Gold medal in every shooting range challenge (42)"],
  ["Top Fun", "Top Fun", BRONZE, 15, "Gagner une course de drones Top Fun sur chaque site", "Win a Top Fun drone race at every location"],
  ["L'argent, pas la reconnaissance", "Earn Cash, Not Kudos", BRONZE, 20, "Gagner 20 courses différentes", "Win 20 different races"],
  ["Joli coup de canne", "Baited My Tackle", BRONZE, 10, "Battre Cal à un défi de pêche", "Beat Cal in a fishing challenge"],
  ["As du manche", "Stick Fiddler", BRONZE, 10, "Finir un jeu d'arcade", "Finish an arcade game"],
  ["Inconnus et détraqués", "Strangers & Freaks", SILVER, 30, "Terminer 8 séries de missions d'inconnus", "Complete 8 stranger mission strands"],
  ["Faut rester positifs", "Positive Mental Attitude", BRONZE, 10, "Méditer à chaque lieu de Leonida (18) · ⚠️ peut-être ratable (balcon de Lucia, ch. 1)", "Meditate at every spot in Leonida (18) · ⚠️ possibly missable (Lucia's balcony, ch. 1)"],
  ["Cartes sur table", "Don't Touch My Deck", SILVER, 30, "Compléter 3 séries de cartes", "Complete 3 card sets"],
  ["Coup de WAiNKeur", "You WAiNKer!", SILVER, 30, "Faire 100 scans WAiNK", "Make 100 WAiNK scans"],
  ["Une dernière chose", "One Last Thing", BRONZE, 5, "Terminer 50 défis", "Complete 50 challenges"],
  ["Des étoiles plein les yeux", "Hot Together", BRONZE, 20, "Semer 4 étoiles de recherche avec son partenaire", "Lose a 4-star wanted level with your partner"],
  ["Shopping thérapeutique", "Retail Therapy", BRONZE, 20, "Braquer 3 commerces d'affilée avec son partenaire sans perdre son avis de recherche", "Rob 3 stores in a row with your partner while staying wanted"],
  ["Ça roule", "Whip It Good", BRONZE, 20, "Découvrir 100 véhicules", "Discover 100 vehicles"],
  ["Pro de la gâchette", "Gunslinger", BRONZE, 10, "Abattre 5 ennemis en une seule concentration au combat", "Take down 5 enemies in a single Combat Focus"],
  ["Vol furtif", "Sneakthief", BRONZE, 10, "Braquer une bijouterie sans être repéré", "Rob a jewelry store without being spotted"],
  ["Plafond de retrait", "Maximum Withdrawal", SILVER, 40, "Vider 5 coffres de banque et s'enfuir", "Rob 5 bank vaults and get away"],
  ["Coup classique de l'attaque éclair", "A Classic Blitz Play", BRONZE, 10, "Braquer un fourgon blindé et s'enfuir", "Rob an armored truck and get away"],
  ["L'État du Bonheur", "The Goodtime State", BRONZE, 20, "Explorer tout Leonida", "Explore all of Leonida"],
  ["Lutte contre les nuisibles", "Pest Control", BRONZE, 20, "Braquer une opération illégale de chaque gang", "Rob one illegal operation from every gang"],
  ["Pas de petit profit", "Dime on the Dollar", BRONZE, 20, "Blanchir 250 000 $ de billets marqués via les contacts", "Launder $250,000 of marked bills through contacts"],
  ["Faites-vous plaisir", "Treat Yo Self", BRONZE, 15, "Dépenser 100 000 $ dans les magasins", "Spend $100,000 in shops"],
  ["Petits boxes", "Little Boxes", BRONZE, 15, "Acheter tous les garages", "Buy every garage"],
  ["De service", "On the Spot", BRONZE, 15, "Enregistrer 10 véhicules dans l'appli Scooter Bros", "Register 10 vehicles in the Scooter Bros app"],
  ["Un goût de paradis", "Just Like Paradise", BRONZE, 5, "Terminer Gone Fishing", "Complete Gone Fishing", true],
  ["Paradis perdu", "Paradise Lost", BRONZE, 20, "Terminer le chapitre 1", "Complete chapter 1", true],
  ["N****s, cul et argent sale", "T**s Ass Drug Money", BRONZE, 20, "Terminer le chapitre 2", "Complete chapter 2", true],
  ["Vice City, baby !", "Vice City, Baby!", BRONZE, 20, "Terminer le chapitre 3", "Complete chapter 3", true],
  ["Le top du top, Ma", "Top Of The World, Ma", BRONZE, 20, "Terminer le chapitre 4", "Complete chapter 4", true],
  ["Faut que tu saches quand descendre", "You Gotta Know When to Get Off", GOLD, 50, "Terminer l'histoire", "Finish the story", true],
  ["Tu me fais confiance ?", "Trust", BRONZE, 10, "Terminer Breakfast Run", "Complete Breakfast Run", true],
  ["Faire sauter la banque", "Break the Bank", BRONZE, 25, "Terminer The Cartel Heist", "Complete The Cartel Heist", true],
  ["La vie de famille", "Family Matters", BRONZE, 15, "Terminer Child's Play", "Complete Child's Play", true],
  ["La chute de DWNPLY", "DWNFALL", BRONZE, 15, "Terminer Headliners", "Complete Headliners", true],
  ["Détournement", "Hi-Jacked", BRONZE, 25, "Terminer VCIA Takedown", "Complete VCIA Takedown", true],
  ["Tempête de neige", "Snow Storm", BRONZE, 25, "Terminer Operation Savage Glory", "Complete Operation Savage Glory", true],
  ["La route vers le rétablissement", "Road to Rehabilitation", BRONZE, 15, "Dernière mission d'Andy (Lucia)", "Andy's final mission (Lucia)", true],
  ["C'était pas un accident de bateau", "This Was No Boat Accident", BRONZE, 15, "Dernière mission de Kenton", "Kenton's final mission", true],
  ["Cavalier seul", "The Lone Rider", BRONZE, 15, "Dernière mission de Billy", "Billy's final mission", true],
  ["L'offre et la demande", "Supply & Demand", BRONZE, 20, "Dernière mission de Randy", "Randy's final mission", true],
  ["Spin On This !", "Spin On This!", BRONZE, 15, "Dernière mission de Tyrone (Jason)", "Tyrone's final mission (Jason)", true],
  ["Go élan", "Fair Game", BRONZE, 15, "Chasser un animal unique pour Bret (Jason)", "Hunt a unique animal for Bret (Jason)", true],
  ["Arrête-moi si tu peux", "Catch Me If You Can", BRONZE, 10, "Partir de l'aéroport VCIA sans billet (voler un avion de ligne)", "Leave VCIA airport without a ticket (steal an airliner)", true],
  ["Arrête ton char", "Challenging Tank", BRONZE, 10, "Lié à un tank Rhino (Mile Zero Air Station)", "Involves a Rhino tank (Mile Zero Air Station)", true],
  ["On va au bowling", "Let's Go Bowling", BRONZE, 5, "Au bowling de Kolt & Associates", "At the Kolt & Associates bowling alley", true],
  ["Record personnel", "Personal Best", BRONZE, 5, "Probablement : Force au maximum pour les deux héros", "Probably: max Strength for both characters", true],
  ["Les actes sont plus forts", "Actions Speak Louder", BRONZE, 5, "Probablement : 500 actions qui modifient le profil criminel", "Probably: 500 actions that change your Criminal Profile", true],
  ["Au début…", "In The Beginning…", BRONZE, 5, "Boire un cocktail avec vue à Ocean Beach", "Enjoy a cocktail with a view in Ocean Beach", true],
  ["Capital mal acquis", "Capital Offense", BRONZE, 5, "Sortir d'une concession auto en traversant la vitrine", "Drive out of a car showroom through the window", true],
  ["Pas de bol, j'imagine", "Bad Luck, I Guess", BRONZE, 5, "Condition encore inconnue", "Condition not known yet", true],
  ["La vérité est ailleurs", "The Truth Is Out There", BRONZE, 5, "Condition encore inconnue", "Condition not known yet", true],
  ["Décatombe", "Ten Pin", BRONZE, 5, "Renverser des quilles avec un drive-by au corps à corps", "Bowl people over with a melee drive-by", true],
];

const TROPHEES: LItem[] = list(
  "t",
  TROPHY_ROWS.map(([fr, en, tier, gs, reqFr, reqEn, hidden]): Row => {
    const parts: L[] = [tier];
    if (gs) parts.push(g(gs));
    if (hidden) parts.push(HIDDEN);
    parts.push(b(reqFr, reqEn));
    return [b(fr, en), ...parts];
  }),
  [],
  "en",
);

type LCategory = Omit<Category, "name" | "description" | "seoTitle" | "seoDescription" | "items"> & {
  name: L;
  description: L;
  seoTitle: L;
  seoDescription: L;
  items: LItem[];
};

const CATS: LCategory[] = [
  {
    id: "histoire",
    name: b("Histoire principale", "Main story"),
    icon: "🎬",
    description: b(
      "Les missions de l'histoire, du prologue au chapitre 5, dans l'ordre. Noms tels qu'affichés dans le jeu.",
      "Story missions from the prologue to chapter 5, in order.",
    ),
    seoTitle: b("Liste des missions de l'histoire de GTA 6 (checklist)", "GTA 6 story missions list (checklist)"),
    seoDescription: b(
      "Toutes les missions de l'histoire principale de GTA 6 dans l'ordre. Cochez celles que vous avez terminées et suivez votre progression.",
      "Every GTA 6 main story mission in order. Tick the ones you've finished and track your progress.",
    ),
    items: HISTOIRE,
  },
  {
    id: "secondaires",
    name: b("Missions secondaires", "Side missions"),
    icon: "🗺️",
    description: b(
      "Missions des inconnus et missions facultatives, avec le chapitre où elles apparaissent.",
      "Strangers & Freaks and optional missions, with the chapter they unlock in.",
    ),
    seoTitle: b("Missions secondaires de GTA 6 : liste et checklist", "GTA 6 side missions: list and checklist"),
    seoDescription: b(
      "Liste des missions secondaires de GTA 6 à cocher : ne ratez aucune mission annexe sur la route du 100 %.",
      "GTA 6 side missions to tick off: don't miss a single one on the road to 100%.",
    ),
    items: SECONDAIRES,
  },
  {
    id: "collection",
    name: b("Objets à collectionner", "Collectibles"),
    icon: "💎",
    description: b("Les objectifs de collection du 100 %, puis les 18 séries de cartes.", "The collection goals for 100%, then the 18 card sets."),
    seoTitle: b("Objets à collectionner dans GTA 6 : checklist complète", "GTA 6 collectibles: complete checklist"),
    seoDescription: b(
      "Tous les objets à collectionner de GTA 6 à cocher un par un. Suivez combien il vous en reste pour atteindre le 100 %.",
      "Every GTA 6 collectible to tick off one by one. See how many you have left to reach 100%.",
    ),
    items: COLLECTION,
  },
  {
    id: "activites",
    name: b("Activités & défis", "Activities & challenges"),
    icon: "🏁",
    description: b("Braquages, courses, loisirs et défis : tout ce que demande le 100 %.", "Robberies, races, hobbies and challenges: everything 100% requires."),
    seoTitle: b("Activités et défis de GTA 6 : liste à cocher", "GTA 6 activities and challenges: checklist"),
    seoDescription: b(
      "Courses, loisirs et défis de GTA 6 : la liste des activités à cocher pour compléter le jeu à 100 %.",
      "GTA 6 races, hobbies and challenges: the activity checklist to complete the game at 100%.",
    ),
    items: ACTIVITES,
  },
  {
    id: "trophees",
    name: b("Trophées & succès", "Trophies & achievements"),
    icon: "🏆",
    description: b(
      "Les 55 trophées PlayStation et succès Xbox (1 000 G). Les trophées cachés contiennent des spoilers.",
      "All 55 PlayStation trophies and Xbox achievements (1,000 G). Hidden trophies contain spoilers.",
    ),
    seoTitle: b("Liste des trophées et succès de GTA 6 (PS5 et Xbox)", "GTA 6 trophy and achievement list (PS5 & Xbox)"),
    seoDescription: b(
      "Les 55 trophées PS5 et succès Xbox de GTA 6 à cocher, avec leurs conditions. Suivez votre progression vers le platine.",
      "All 55 GTA 6 PS5 trophies and Xbox achievements to tick off, with how to unlock them. Track your way to the platinum.",
    ),
    items: TROPHEES,
  },
  {
    id: "perso",
    name: b("Mes objectifs", "My goals"),
    icon: "✍️",
    description: b("Votre liste personnelle : ajoutez ce que vous voulez.", "Your personal list: add whatever you like."),
    seoTitle: b("Ma checklist personnelle GTA 6", "My personal GTA 6 checklist"),
    seoDescription: b(
      "Créez votre propre liste d'objectifs pour GTA 6 et suivez votre progression, sans inscription.",
      "Build your own list of GTA 6 goals and track your progress, no sign-up needed.",
    ),
    items: [
      { id: "perso-histoire", name: b("Terminer l'histoire principale", "Finish the main story"), hint: [] },
      { id: "perso-carte", name: b("Explorer toute la carte", "Explore the whole map"), hint: [] },
      { id: "perso-100", name: b("Atteindre 100 % de complétion", "Reach 100% completion"), hint: [] },
    ],
  },
];

/** Les catégories dans la langue demandée. */
export function getCategories(lang: Lang): Category[] {
  return CATS.map((c) => ({
    id: c.id,
    icon: c.icon,
    name: tr(c.name, lang),
    description: tr(c.description, lang),
    seoTitle: tr(c.seoTitle, lang),
    seoDescription: tr(c.seoDescription, lang),
    items: c.items.map((i) => ({
      id: i.id,
      name: tr(i.name, lang),
      hint: i.hint.length ? i.hint.map((h) => tr(h, lang)).join(" · ") : undefined,
    })),
  }));
}

export const CATEGORY_IDS = CATS.map((c) => c.id);

/** Date de mise à jour des listes, affichée aux joueurs. */
export const LAST_DATA_UPDATE: Record<Lang, string> = { fr: "20 novembre 2026", en: "November 20, 2026" };
