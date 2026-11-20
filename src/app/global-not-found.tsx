import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Page introuvable · Page not found",
  robots: { index: false },
};

/** Page 404 pour les adresses inconnues (le site a deux mises en page racine, une par langue). */
export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center font-sans">
        <p className="text-5xl">🧭</p>
        <h1 className="text-2xl font-semibold">Page introuvable · Page not found</h1>
        <p className="text-dim">
          <Link href="/" className="underline">Retour à l&apos;accueil</Link> · <Link href="/en" className="underline">Back to home</Link>
        </p>
      </body>
    </html>
  );
}
