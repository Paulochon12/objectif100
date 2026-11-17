import type { Metadata } from "next";
import { Footer, Header } from "@/components/site";

export const metadata: Metadata = { title: "Mentions légales" };

export default function MentionsLegales() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 sm:px-6">
        <h1 className="font-display text-2xl">Mentions légales</h1>
        <section>
          <h2 className="font-semibold">Éditeur</h2>
          <p className="mt-2 text-dim">
            Paul Lesage, entrepreneur individuel (micro-entreprise)
            <br />28 rue Salvador Allende, 92000 Nanterre
            <br />SIRET : [en cours d&apos;attribution]
            <br />Contact : [À COMPLÉTER]
          </p>
        </section>
        <section>
          <h2 className="font-semibold">Hébergeur</h2>
          <p className="mt-2 text-dim">Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
        </section>
        <section>
          <h2 className="font-semibold">Données personnelles et cookies</h2>
          <p className="mt-2 text-dim">
            Le site ne demande aucun compte et ne collecte aucune donnée personnelle. Votre progression est
            enregistrée uniquement dans votre navigateur (stockage local) et n&apos;est jamais envoyée sur nos
            serveurs. Aucun cookie publicitaire ni de mesure d&apos;audience n&apos;est utilisé.
          </p>
        </section>
        <section>
          <h2 className="font-semibold">Marques</h2>
          <p className="mt-2 text-dim">
            Site de fans non officiel, sans lien avec Rockstar Games ou Take-Two Interactive. Grand Theft Auto et
            GTA sont des marques de Take-Two Interactive Software, Inc., citées uniquement pour indiquer le jeu
            concerné. Aucun contenu officiel (logo, image, texte) n&apos;est reproduit.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
