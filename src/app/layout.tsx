import type { Metadata } from "next";
import { Geist, Rubik_Mono_One } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const display = Rubik_Mono_One({ variable: "--font-display-face", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: {
    default: "Objectif 100 % : suivez votre progression dans GTA 6",
    template: "%s · Objectif 100 %",
  },
  description:
    "Checklist gratuite pour suivre votre progression à 100 % dans GTA 6 : missions, objets à collectionner, activités et trophées. Sans inscription.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${geist.variable} ${display.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
