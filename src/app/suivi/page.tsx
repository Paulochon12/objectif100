import type { Metadata } from "next";
import { Footer, Header } from "@/components/site";
import { Tracker } from "@/components/tracker";

export const metadata: Metadata = {
  title: "Ma progression",
  description: "Cochez vos missions, objets à collectionner, activités et trophées de GTA 6. Sauvegarde automatique.",
};

export default function SuiviPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6">
        <h1 className="mb-6 font-display text-2xl sm:text-3xl">Ma progression</h1>
        <Tracker />
      </main>
      <Footer />
    </>
  );
}
