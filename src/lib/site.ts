/**
 * Adresse publique du site. On ne se fie pas à VERCEL_PROJECT_PRODUCTION_URL :
 * Vercel y met le domaine le plus court, ici objectif100.vercel.app.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "production" ? "https://objectif100.wise-studio.fr" : "http://localhost:3000");

export const SITE_NAME = "Objectif 100 %";
