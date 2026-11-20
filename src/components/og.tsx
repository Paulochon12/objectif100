import { ImageResponse } from "next/og";
import type { Lang } from "@/lib/i18n";

export const OG_SIZE = { width: 1200, height: 630 };

const TEXT = {
  fr: { alt: "Objectif 100 % : la checklist pour finir GTA 6 à 100 %", l1: "Visez le", hundred: "100 %", l2: "dans GTA 6", sub: "Missions · Objets à collectionner · Activités · Trophées" },
  en: { alt: "Objectif 100%: the checklist to finish GTA 6 at 100%", l1: "Go for", hundred: "100%", l2: "in GTA 6", sub: "Missions · Collectibles · Activities · Trophies" },
};

export const ogAlt = (lang: Lang) => TEXT[lang].alt;

/** Image d'aperçu (Discord, X, WhatsApp) dans une langue. */
export function ogImage(lang: Lang) {
  const t = TEXT[lang];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #0d0b14 0%, #241431 60%, #3a1630 100%)",
          color: "#f3eefc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 36, color: "#a39cb5" }}>Objectif 100 %</div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 800, marginTop: 24, lineHeight: 1.05 }}>
          {t.l1}&nbsp;
          <span style={{ color: "#ff6f6a" }}>{t.hundred}</span>
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 1.05 }}>{t.l2}</div>
        <div style={{ display: "flex", fontSize: 34, color: "#a39cb5", marginTop: 32 }}>{t.sub}</div>
        <div style={{ display: "flex", marginTop: 48, height: 18, width: 900, borderRadius: 9, background: "#17131f" }}>
          <div style={{ display: "flex", width: 610, borderRadius: 9, background: "linear-gradient(90deg, #ff8a3d, #ff4f8b)" }} />
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
