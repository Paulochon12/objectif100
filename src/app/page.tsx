import Link from "next/link";
import { Footer, Header } from "@/components/site";

const FEATURES = [
  { icon: "✅", title: "Cochez au fil du jeu", text: "Missions, objets à collectionner, activités, trophées : tout au même endroit, rangé par catégorie." },
  { icon: "📊", title: "Votre % en temps réel", text: "Voyez d'un coup d'œil ce qui reste à faire pour atteindre le 100 %." },
  { icon: "📱", title: "Sans inscription", text: "Votre progression s'enregistre toute seule. Transférez-la sur votre téléphone avec un simple code." },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-4 pb-16 pt-12 text-center sm:px-6 sm:pt-20">
          <p className="inline-block rounded-full border border-edge bg-panel px-3 py-1 text-xs text-dim">
            Gratuit · Pour PS5 et Xbox Series
          </p>
          <h1 className="mt-6 font-display text-3xl leading-tight sm:text-5xl">
            Visez le <span className="glow-text">100 %</span> dans GTA 6
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-dim">
            La checklist pour suivre votre progression : missions, objets à collectionner, activités et trophées.
            Ne passez plus à côté de rien.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/suivi" className="btn-primary px-6 py-3 text-base">Commencer ma checklist</Link>
          </div>
          <p className="mt-4 text-sm text-dim">Sortie du jeu le 19 novembre 2026 · listes mises à jour au fil des découvertes</p>
        </section>

        <section className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-3 sm:px-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="panel p-6">
              <p className="text-3xl">{f.icon}</p>
              <h2 className="mt-3 font-semibold">{f.title}</h2>
              <p className="mt-2 text-sm text-dim">{f.text}</p>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
